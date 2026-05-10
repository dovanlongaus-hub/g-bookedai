'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Check, BookOpen, FileText, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface LearningStep {
  label: string;
  completed: boolean;
}

interface RecentNote {
  title: string;
  link: string;
}

interface LearningProgressProps {
  trackTitle: string;
  completionPercent: number;
  steps: LearningStep[];
  recentNotes: RecentNote[];
  recommendedTitle: string;
  recommendedDesc: string;
  onBookRecommended?: () => void;
}

const stepCircleVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: { delay: i * 0.1, duration: 0.3, ease: 'easeOut' as const },
  }),
};

export function LearningProgress({
  trackTitle,
  completionPercent,
  steps,
  recentNotes,
  recommendedTitle,
  recommendedDesc,
  onBookRecommended,
}: LearningProgressProps) {
  return (
    <div className="section">
      <h2 className="flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-[#6366f1]" />
        Learning Progress
      </h2>

      {/* Track header */}
      <Card className="learning-card-upgraded mt-4">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center flex-wrap gap-3">
            <CardTitle className="text-base font-semibold text-[var(--text-main)]">
              {trackTitle}
            </CardTitle>
            <Badge
              variant="outline"
              className="bg-[rgba(34,197,94,0.15)] text-[#22c55e] border-[rgba(34,197,94,0.3)] text-[0.8rem]"
            >
              <Check className="mr-1 h-3 w-3" />
              {completionPercent}% Complete
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Step circles */}
          <div className="step-circles">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className={`step-circle ${step.completed ? 'done' : 'upcoming'}`}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stepCircleVariants}
                title={step.label}
              >
                {step.completed ? (
                  <Check className="h-4 w-4" />
                ) : (
                  i + 1
                )}
              </motion.div>
            ))}
          </div>

          {/* Progress bar */}
          <Progress
            value={completionPercent}
            className="h-2 bg-[rgba(255,255,255,0.06)]"
          />
        </CardContent>
      </Card>

      {/* Recent AI Notes */}
      {recentNotes.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <div className="flex items-center gap-1.5 mb-2">
            <FileText className="h-4 w-4 text-[var(--text-muted)]" />
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Recent AI Notes
            </span>
          </div>
          {recentNotes.map((note, i) => (
            <a
              key={i}
              href={note.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              style={{
                padding: '10px 14px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 10,
                marginBottom: 6,
                fontSize: '0.85rem',
                color: '#2dd4bf',
                transition: 'background 0.15s',
                textDecoration: 'none',
              }}
            >
              <FileText className="inline h-3.5 w-3.5 mr-1.5 opacity-60" />
              {note.title}
              <ArrowRight className="inline h-3 w-3 ml-1 opacity-60" />
            </a>
          ))}
        </div>
      )}

      {/* Recommended Next */}
      <div className="recommended-card mt-4">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Sparkles className="h-3.5 w-3.5 text-[#2dd4bf]" />
          <span style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: '#2dd4bf' }}>
            Recommended Next
          </span>
        </div>
        <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: 4, color: 'var(--text-main)' }}>{recommendedTitle}</div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 12 }}>{recommendedDesc}</div>
        <Button
          variant="outline"
          size="sm"
          onClick={onBookRecommended}
          className="border-[#2dd4bf] text-[#2dd4bf] hover:bg-[rgba(20,184,166,0.1)]"
        >
          <BookOpen className="mr-1.5 h-3.5 w-3.5" />
          Book This Session
          <ArrowRight className="ml-1.5 h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
