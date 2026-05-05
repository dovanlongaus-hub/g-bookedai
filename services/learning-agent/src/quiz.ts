import { GoogleGenerativeAI } from '@google/generative-ai';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  questions: QuizQuestion[];
}

const QUIZ_PROMPT = `You are a quiz generator for bookedai.au, an Australian AI mentoring platform.
Generate multiple-choice quiz questions in JSON format.

Rules:
- Each question must have exactly 4 options (A, B, C, D)
- correctIndex is 0-based (0 = first option, 3 = last option)
- Provide a brief explanation for the correct answer
- Questions should test understanding, not just recall
- Mix difficulty levels within the quiz

You MUST output ONLY valid JSON matching this exact structure (no markdown, no extra text):
{
  "questions": [
    {
      "question": "The question text?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "Brief explanation of why this is correct."
    }
  ]
}`;

export async function generateQuiz(
  topic: string,
  content: string,
  numQuestions: number,
): Promise<Quiz> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY not configured');

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const userPrompt = `Generate exactly ${numQuestions} multiple-choice questions about "${topic}".

${content ? `Use this content as the basis for the questions:\n\n${content}` : 'Generate questions based on general knowledge of the topic.'}`;

  const result = await model.generateContent({
    contents: [
      { role: 'user', parts: [{ text: QUIZ_PROMPT }] },
      { role: 'model', parts: [{ text: '{"ready": true}' }] },
      { role: 'user', parts: [{ text: userPrompt }] },
    ],
  });

  const responseText = result.response.text();
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to parse quiz response as JSON');
  }

  const quiz: Quiz = JSON.parse(jsonMatch[0]);

  // Validate structure
  if (!quiz.questions || !Array.isArray(quiz.questions)) {
    throw new Error('Invalid quiz structure returned from Gemini');
  }

  for (const q of quiz.questions) {
    if (!q.options || q.options.length !== 4 || typeof q.correctIndex !== 'number') {
      throw new Error('Invalid question format: each question must have 4 options and a correctIndex');
    }
  }

  return quiz;
}
