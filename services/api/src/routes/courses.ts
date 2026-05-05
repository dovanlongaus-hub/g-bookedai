import { Router } from 'express';
import { authenticate, requireRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { logger } from '../lib/logger.js';
import { z } from 'zod';
import { query } from '@bookedai/db';

export const coursesRouter = Router();

// --- Schemas ---

const generateCurriculumSchema = z.object({
  topic: z.string().min(1).max(500),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  numModules: z.number().int().min(1).max(20).default(5),
});

const generateQuizSchema = z.object({
  topic: z.string().min(1).max(500),
  content: z.string().max(50000).default(''),
  numQuestions: z.number().int().min(1).max(50).default(10),
});

// --- Routes ---

// POST /courses/generate-curriculum — Admin only, AI generates a full curriculum
coursesRouter.post(
  '/generate-curriculum',
  authenticate,
  requireRole('admin', 'superadmin'),
  validate(generateCurriculumSchema),
  async (req, res, next) => {
    try {
      const { topic, level, numModules } = req.body;

      const { generateCurriculum } = await import('@bookedai/learning-agent/curriculum');

      const curriculum = await generateCurriculum(topic, level, numModules);

      // Store in database
      const result = await query(
        `INSERT INTO courses (tenant_id, title, description, modules, created_by)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, title, description, modules, created_at`,
        [
          req.auth!.tenantId,
          curriculum.title,
          curriculum.description,
          JSON.stringify(curriculum.modules),
          req.auth!.userId,
        ],
      );

      logger.info({ courseId: result.rows[0].id, topic, level }, 'Curriculum generated');

      res.json({
        success: true,
        data: {
          course: result.rows[0],
          curriculum,
        },
      });
    } catch (err) {
      next(err);
    }
  },
);

// POST /courses/generate-quiz — Authenticated users, AI generates quiz
coursesRouter.post(
  '/generate-quiz',
  authenticate,
  validate(generateQuizSchema),
  async (req, res, next) => {
    try {
      const { topic, content, numQuestions } = req.body;

      const { generateQuiz } = await import('@bookedai/learning-agent/quiz');

      const quiz = await generateQuiz(topic, content, numQuestions);

      logger.info({ topic, numQuestions: quiz.questions.length, userId: req.auth!.userId }, 'Quiz generated');

      res.json({
        success: true,
        data: quiz,
      });
    } catch (err) {
      next(err);
    }
  },
);

// POST /courses/:courseId/submit-quiz — Submit quiz answers and record attempt
coursesRouter.post(
  '/:courseId/submit-quiz',
  authenticate,
  async (req, res, next) => {
    try {
      const { courseId } = req.params;
      const { answers } = req.body;

      if (!Array.isArray(answers)) {
        res.status(400).json({ success: false, error: { code: 'INVALID_BODY', message: 'answers must be an array' } });
        return;
      }

      // Verify course exists
      const courseResult = await query('SELECT id FROM courses WHERE id = $1', [courseId]);
      if (courseResult.rows.length === 0) {
        res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Course not found' } });
        return;
      }

      // Calculate score (answers should include { questionIndex, selectedIndex, correctIndex })
      let correct = 0;
      for (const a of answers) {
        if (a.selectedIndex === a.correctIndex) correct++;
      }
      const score = answers.length > 0 ? Math.round((correct / answers.length) * 100) : 0;

      const result = await query(
        `INSERT INTO quiz_attempts (user_id, course_id, score, answers)
         VALUES ($1, $2, $3, $4)
         RETURNING id, score, created_at`,
        [req.auth!.userId, courseId, score, JSON.stringify(answers)],
      );

      // Update enrollment progress if enrolled
      await query(
        `UPDATE course_enrollments
         SET progress_pct = GREATEST(progress_pct, $1),
             status = CASE WHEN $1 >= 100 THEN 'completed' ELSE 'in_progress' END,
             completed_at = CASE WHEN $1 >= 100 THEN now() ELSE completed_at END
         WHERE user_id = $2 AND course_id = $3`,
        [score, req.auth!.userId, courseId],
      );

      logger.info({ courseId, userId: req.auth!.userId, score }, 'Quiz submitted');

      res.json({
        success: true,
        data: {
          attemptId: result.rows[0].id,
          score,
          correct,
          total: answers.length,
          passed: score >= 70,
        },
      });
    } catch (err) {
      next(err);
    }
  },
);

// GET /courses/certificate/:id — Get SVG certificate
coursesRouter.get(
  '/certificate/:id',
  authenticate,
  async (req, res, next) => {
    try {
      const { id } = req.params;

      // Look up certificate
      const certResult = await query(
        `SELECT c.*, u.display_name, u.email, co.title as course_title
         FROM certificates c
         JOIN users u ON c.user_id = u.id
         JOIN courses co ON c.course_id = co.id
         WHERE c.id = $1`,
        [id],
      );

      if (certResult.rows.length === 0) {
        res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Certificate not found' } });
        return;
      }

      const cert = certResult.rows[0];

      // Only allow the certificate owner or admins to view
      if (cert.user_id !== req.auth!.userId && !['admin', 'superadmin'].includes(req.auth!.role)) {
        res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Not authorized to view this certificate' } });
        return;
      }

      const { generateCertificate } = await import('@bookedai/learning-agent/certificate');

      const svg = generateCertificate({
        userName: cert.display_name || cert.email,
        courseName: cert.course_title,
        completionDate: new Date(cert.issued_at).toLocaleDateString('en-AU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        certificateId: cert.certificate_number,
      });

      res.setHeader('Content-Type', 'image/svg+xml');
      res.send(svg);
    } catch (err) {
      next(err);
    }
  },
);

// GET /courses — List available courses
coursesRouter.get(
  '/',
  authenticate,
  async (req, res, next) => {
    try {
      const result = await query(
        `SELECT c.id, c.title, c.description, c.created_at,
                COUNT(ce.id) as enrollment_count
         FROM courses c
         LEFT JOIN course_enrollments ce ON c.id = ce.course_id
         WHERE c.tenant_id = $1
         GROUP BY c.id
         ORDER BY c.created_at DESC`,
        [req.auth!.tenantId],
      );

      res.json({ success: true, data: result.rows });
    } catch (err) {
      next(err);
    }
  },
);

// POST /courses/:courseId/enroll — Enroll in a course
coursesRouter.post(
  '/:courseId/enroll',
  authenticate,
  async (req, res, next) => {
    try {
      const { courseId } = req.params;

      // Verify course exists
      const courseResult = await query('SELECT id FROM courses WHERE id = $1', [courseId]);
      if (courseResult.rows.length === 0) {
        res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Course not found' } });
        return;
      }

      const result = await query(
        `INSERT INTO course_enrollments (user_id, course_id)
         VALUES ($1, $2)
         ON CONFLICT (user_id, course_id) DO NOTHING
         RETURNING id, status, enrolled_at`,
        [req.auth!.userId, courseId],
      );

      if (result.rows.length === 0) {
        res.json({ success: true, data: { message: 'Already enrolled' } });
        return;
      }

      logger.info({ courseId, userId: req.auth!.userId }, 'User enrolled in course');

      res.json({ success: true, data: result.rows[0] });
    } catch (err) {
      next(err);
    }
  },
);

// POST /courses/:courseId/issue-certificate — Issue certificate after course completion
coursesRouter.post(
  '/:courseId/issue-certificate',
  authenticate,
  async (req, res, next) => {
    try {
      const { courseId } = req.params;

      // Check enrollment is completed or quiz score >= 70
      const enrollResult = await query(
        `SELECT * FROM course_enrollments WHERE user_id = $1 AND course_id = $2`,
        [req.auth!.userId, courseId],
      );

      if (enrollResult.rows.length === 0) {
        res.status(400).json({ success: false, error: { code: 'NOT_ENROLLED', message: 'Not enrolled in this course' } });
        return;
      }

      // Check for passing quiz attempt
      const quizResult = await query(
        `SELECT MAX(score) as best_score FROM quiz_attempts WHERE user_id = $1 AND course_id = $2`,
        [req.auth!.userId, courseId],
      );

      const bestScore = quizResult.rows[0]?.best_score || 0;
      if (bestScore < 70) {
        res.status(400).json({
          success: false,
          error: { code: 'NOT_PASSED', message: `Best quiz score is ${bestScore}%. Need at least 70% to earn a certificate.` },
        });
        return;
      }

      // Check if certificate already issued
      const existingCert = await query(
        `SELECT id, certificate_number FROM certificates WHERE user_id = $1 AND course_id = $2`,
        [req.auth!.userId, courseId],
      );

      if (existingCert.rows.length > 0) {
        res.json({
          success: true,
          data: { certificateId: existingCert.rows[0].id, certificateNumber: existingCert.rows[0].certificate_number },
        });
        return;
      }

      // Generate unique certificate number
      const { randomUUID } = await import('crypto');
      const certNumber = `BAI-${Date.now().toString(36).toUpperCase()}-${randomUUID().slice(0, 8).toUpperCase()}`;

      const result = await query(
        `INSERT INTO certificates (user_id, course_id, certificate_number)
         VALUES ($1, $2, $3)
         RETURNING id, certificate_number, issued_at`,
        [req.auth!.userId, courseId, certNumber],
      );

      // Mark enrollment as completed
      await query(
        `UPDATE course_enrollments SET status = 'completed', completed_at = now(), progress_pct = 100
         WHERE user_id = $1 AND course_id = $2`,
        [req.auth!.userId, courseId],
      );

      logger.info({ courseId, userId: req.auth!.userId, certNumber }, 'Certificate issued');

      res.json({
        success: true,
        data: {
          certificateId: result.rows[0].id,
          certificateNumber: result.rows[0].certificate_number,
          issuedAt: result.rows[0].issued_at,
        },
      });
    } catch (err) {
      next(err);
    }
  },
);
