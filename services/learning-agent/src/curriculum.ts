import { GoogleGenerativeAI } from '@google/generative-ai';

export interface Lesson {
  title: string;
  objectives: string[];
  duration: string;
}

export interface Module {
  title: string;
  lessons: Lesson[];
}

export interface Curriculum {
  title: string;
  description: string;
  modules: Module[];
}

const CURRICULUM_PROMPT = `You are an expert curriculum designer for bookedai.au, an Australian AI mentoring platform.
Generate a structured course curriculum in JSON format.

Context:
- Target audience: Australian professionals and small business owners learning AI
- Practical, hands-on approach with real-world applications
- Each lesson should be achievable in the specified duration
- Include clear learning objectives for each lesson

You MUST output ONLY valid JSON matching this exact structure (no markdown, no extra text):
{
  "title": "Course title",
  "description": "2-3 sentence course description",
  "modules": [
    {
      "title": "Module title",
      "lessons": [
        {
          "title": "Lesson title",
          "objectives": ["objective 1", "objective 2"],
          "duration": "30 min"
        }
      ]
    }
  ]
}`;

export async function generateCurriculum(
  topic: string,
  level: 'beginner' | 'intermediate' | 'advanced',
  numModules: number,
): Promise<Curriculum> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY not configured');

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const userPrompt = `Create a ${level}-level course curriculum on "${topic}" with exactly ${numModules} modules. Each module should have 3-5 lessons. Lessons should be 20-60 minutes each.`;

  const result = await model.generateContent({
    contents: [
      { role: 'user', parts: [{ text: CURRICULUM_PROMPT }] },
      { role: 'model', parts: [{ text: '{"ready": true}' }] },
      { role: 'user', parts: [{ text: userPrompt }] },
    ],
  });

  const responseText = result.response.text();
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to parse curriculum response as JSON');
  }

  const curriculum: Curriculum = JSON.parse(jsonMatch[0]);

  // Validate structure
  if (!curriculum.title || !curriculum.modules || !Array.isArray(curriculum.modules)) {
    throw new Error('Invalid curriculum structure returned from Gemini');
  }

  return curriculum;
}
