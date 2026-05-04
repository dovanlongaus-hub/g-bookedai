import { Router } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const componentRouter = Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

/**
 * POST /component/generate
 * AI generates a React component with proper design system tokens
 */
componentRouter.post('/generate', async (req, res) => {
  const { name, type, description, variants, accessibility } = req.body;

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `You are a senior React/Next.js UI engineer.
Generate a production-ready React component using our design system.

Design System:
- Framework: Next.js 15 + React 19
- Styling: Tailwind CSS with CSS custom properties
- Font: Outfit (300-700)
- Theme: Dark-first (--bg-color: #050510, --primary: #6366f1, --accent: #22d3ee)
- Pattern: Glass-morphism, subtle gradients, smooth animations
- Accessibility: WCAG 2.2 AA

Component Requirements:
- Name: ${name}
- Type: ${type} (button|card|input|modal|badge|table|nav|hero|pricing|testimonial)
- Description: ${description}
- Variants: ${JSON.stringify(variants || ['default', 'primary', 'ghost'])}
- Accessibility: ${accessibility || 'Full ARIA support, keyboard navigation, focus management'}

Generate:
{
  "component": {
    "code": "// Full TypeScript React component with proper types, variants, and accessibility",
    "styles": "// Any additional CSS if needed",
    "usage": "// Example usage with all variants",
    "props": [{ "name": "", "type": "", "default": "", "description": "" }],
    "a11y": { "role": "", "ariaLabels": [], "keyboardNav": "" }
  },
  "storybook": "// Storybook story for all variants"
}

Important: Use 'use client' directive, TypeScript interfaces, forwardRef when applicable, and CSS variables for theming.`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const component = jsonMatch ? JSON.parse(jsonMatch[0]) : { raw: text };

    res.json({ success: true, data: component });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Component generation failed' });
  }
});

/**
 * POST /component/audit
 * Audit existing components for consistency, accessibility, performance
 */
componentRouter.post('/audit', async (req, res) => {
  const { code, designSystem } = req.body;

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `Audit this React component for design system compliance and quality:

Component Code:
\`\`\`tsx
${code}
\`\`\`

Design System Rules:
- Use CSS variables (--primary, --accent, --surface, etc.)
- WCAG 2.2 AA accessibility
- Keyboard navigable
- Responsive (mobile-first)
- Dark theme by default
- Smooth transitions (200-300ms)
- No hardcoded colors/sizes

Return JSON:
{
  "score": 1-10,
  "issues": [{ "severity": "critical|warning|info", "line": 0, "issue": "", "fix": "" }],
  "accessibility": { "score": 1-10, "missing": [] },
  "designSystemCompliance": { "score": 1-10, "violations": [] },
  "performance": { "score": 1-10, "suggestions": [] },
  "improvedCode": "// Corrected version of the component"
}`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const audit = jsonMatch ? JSON.parse(jsonMatch[0]) : { raw: text };

    res.json({ success: true, data: audit });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Component audit failed' });
  }
});

/**
 * POST /component/page-layout
 * Generate complete page layout with multiple components
 */
componentRouter.post('/page-layout', async (req, res) => {
  const { pageType, sections, data } = req.body;

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `Generate a complete Next.js page layout for:

Page Type: ${pageType}
Sections: ${JSON.stringify(sections || ['hero', 'features', 'pricing', 'testimonials', 'cta'])}
Data: ${JSON.stringify(data || {})}

Design System: Dark theme, glass-morphism, Outfit font, indigo primary, cyan accent.
Framework: Next.js 15 App Router, TypeScript, Tailwind CSS.

Return JSON:
{
  "page": {
    "metadata": { "title": "", "description": "" },
    "code": "// Complete page.tsx code",
    "sections": [{ "name": "", "component": "", "animation": "" }]
  },
  "components": [
    { "name": "", "code": "// Component code" }
  ]
}`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const layout = jsonMatch ? JSON.parse(jsonMatch[0]) : { raw: text };

    res.json({ success: true, data: layout });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Page layout generation failed' });
  }
});
