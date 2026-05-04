import { GoogleGenerativeAI } from '@google/generative-ai';

const LEARNING_PROMPT = `You are Longcare AU's Learning Agent. After each mentoring session, analyze the transcript and create a structured JSON response with these fields:

{
  "summary": "2-3 paragraph summary of the session",
  "keyIdeas": ["idea1", "idea2", ...],
  "qaItems": [{"question": "...", "answer": "..."}],
  "improvementAreas": [{"area": "...", "suggestion": "...", "priority": "high|medium|low"}],
  "nextRecommendedLesson": "Name of recommended next lesson/session",
  "nextCta": "Compelling CTA text to encourage booking the next session"
}

Rules:
- Extract EVERY question asked during the session
- Identify concrete improvement areas, not vague advice
- The CTA should reference the specific next step relevant to this learner
- Always suggest a specific next session type from: 30-min Starter, 1-hour Mentor, 5-Session Package
- Output ONLY valid JSON, no markdown`;

export async function generateSessionSummary(transcript: string, language: string = 'en') {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const languageInstruction = language !== 'en'
    ? `\n\nIMPORTANT: Generate the response in ${language === 'vi' ? 'Vietnamese' : language === 'zh' ? 'Chinese Simplified' : 'English'}.`
    : '';

  const result = await model.generateContent({
    contents: [
      { role: 'user', parts: [{ text: LEARNING_PROMPT + languageInstruction }] },
      { role: 'model', parts: [{ text: '{"ready": true}' }] },
      { role: 'user', parts: [{ text: `Session transcript:\n\n${transcript}` }] },
    ],
  });

  const responseText = result.response.text();
  // Extract JSON from response (handle possible markdown code blocks)
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to parse Gemini response as JSON');
  }

  return JSON.parse(jsonMatch[0]);
}

export async function recommendNextCourse(params: {
  completedSessions: { serviceName: string; summary: string }[];
  userGoals?: string;
}) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY not configured');

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `Based on the user's completed sessions and goals, recommend the best next learning path.

Available services:
- 30-min AI Starter Session ($29) - for beginners
- 1-hour AI Mentor ($99) - deep-dive on specific topic
- 5-Session Package ($450) - structured learning path
- 10-Session Package ($850) - comprehensive mastery
- AI Business Transformation Program ($1,500+) - for SMEs

Completed sessions:
${params.completedSessions.map((s) => `- ${s.serviceName}: ${s.summary}`).join('\n')}

${params.userGoals ? `User goals: ${params.userGoals}` : ''}

Respond with JSON: {"recommendation": "service name", "reason": "why", "ctaText": "compelling CTA"}`;

  const result = await model.generateContent(prompt);
  const jsonMatch = result.response.text().match(/\{[\s\S]*\}/);
  return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
}
