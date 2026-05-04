import { Router } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const designRouter = Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

/**
 * POST /design/ui-review
 * AI reviews a screenshot/description and suggests UI/UX improvements
 */
designRouter.post('/ui-review', async (req, res) => {
  const { pageUrl, description, screenshot } = req.body;

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `You are a senior UI/UX designer specializing in SaaS platforms and booking systems.
Review this page and provide actionable improvement suggestions.

Page: ${pageUrl || 'Not specified'}
Description: ${description || 'General review'}

Provide your analysis in this JSON format:
{
  "overallScore": 1-10,
  "accessibility": { "score": 1-10, "issues": [], "fixes": [] },
  "visualHierarchy": { "score": 1-10, "issues": [], "fixes": [] },
  "usability": { "score": 1-10, "issues": [], "fixes": [] },
  "consistency": { "score": 1-10, "issues": [], "fixes": [] },
  "conversion": { "score": 1-10, "issues": [], "fixes": [] },
  "prioritizedActions": [{ "priority": "high|medium|low", "action": "", "impact": "" }]
}`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const review = jsonMatch ? JSON.parse(jsonMatch[0]) : { raw: text };

    res.json({ success: true, data: review });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Design review failed' });
  }
});

/**
 * POST /design/generate-layout
 * AI generates layout suggestions for a given page type
 */
designRouter.post('/generate-layout', async (req, res) => {
  const { pageType, requirements, targetAudience, brand } = req.body;

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `You are a senior product designer. Generate a detailed layout specification for:

Page Type: ${pageType} (e.g., landing, booking, dashboard, pricing)
Requirements: ${JSON.stringify(requirements)}
Target Audience: ${targetAudience || 'Australian professionals, 25-55'}
Brand: ${JSON.stringify(brand || { style: 'modern, dark, professional', primary: '#6366f1' })}

Provide the layout as JSON:
{
  "layout": {
    "type": "single-column|two-column|grid|dashboard",
    "sections": [
      {
        "name": "",
        "purpose": "",
        "position": "hero|above-fold|content|cta|footer",
        "components": [{ "type": "", "props": {}, "content": "" }],
        "spacing": { "paddingY": "", "gap": "" }
      }
    ]
  },
  "colorUsage": { "primary": "", "secondary": "", "accent": "" },
  "typography": { "headings": "", "body": "", "accent": "" },
  "animations": [{ "element": "", "type": "", "trigger": "" }],
  "responsiveNotes": "",
  "conversionOptimizations": []
}`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const layout = jsonMatch ? JSON.parse(jsonMatch[0]) : { raw: text };

    res.json({ success: true, data: layout });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Layout generation failed' });
  }
});

/**
 * POST /design/color-palette
 * Generate harmonious color palettes based on brand requirements
 */
designRouter.post('/color-palette', async (req, res) => {
  const { baseColor, mood, industry, accessibility } = req.body;

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `Generate a professional color palette for a SaaS platform.

Base Color: ${baseColor || '#6366f1'}
Mood: ${mood || 'professional, trustworthy, innovative'}
Industry: ${industry || 'AI/Technology, Education, Booking'}
Accessibility: ${accessibility || 'WCAG 2.2 AA minimum'}

Return JSON:
{
  "palette": {
    "primary": { "50": "", "100": "", "200": "", "300": "", "400": "", "500": "", "600": "", "700": "", "800": "", "900": "", "950": "" },
    "secondary": { ... same scale },
    "accent": { ... same scale },
    "neutral": { ... same scale },
    "semantic": { "success": "", "warning": "", "error": "", "info": "" }
  },
  "darkMode": { "bg": "", "surface": "", "text": "", "muted": "", "border": "" },
  "lightMode": { "bg": "", "surface": "", "text": "", "muted": "", "border": "" },
  "gradients": [{ "name": "", "css": "" }],
  "contrastRatios": { "textOnBg": "", "textOnSurface": "" },
  "cssVariables": ""
}`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const palette = jsonMatch ? JSON.parse(jsonMatch[0]) : { raw: text };

    res.json({ success: true, data: palette });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Palette generation failed' });
  }
});
