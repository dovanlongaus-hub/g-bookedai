import { Router } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const brandRouter = Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

/**
 * POST /brand/generate-identity
 * Generate complete brand identity guidelines
 */
brandRouter.post('/generate-identity', async (req, res) => {
  const { companyName, tagline, values, targetMarket, competitors } = req.body;

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `You are a senior brand strategist and identity designer.
Create a comprehensive brand identity system for:

Company: ${companyName || 'BookedAI'}
Tagline: ${tagline || 'Turn customer intent into revenue — automatically'}
Values: ${JSON.stringify(values || ['Innovation', 'Trust', 'Simplicity', 'Intelligence'])}
Target Market: ${targetMarket || 'Australian SMEs, professionals, educators, 25-55 years old'}
Competitors: ${JSON.stringify(competitors || ['Calendly', 'Acuity', 'Square Appointments'])}

Generate a complete brand identity in JSON:
{
  "brand": {
    "name": "",
    "tagline": "",
    "missionStatement": "",
    "voiceTone": { "adjectives": [], "doSay": [], "dontSay": [], "examples": [] },
    "personality": { "archetype": "", "traits": [] }
  },
  "visual": {
    "logoDescription": {
      "concept": "",
      "symbolism": "",
      "primaryMark": "",
      "wordmark": "",
      "iconMark": "",
      "clearSpace": "",
      "minimumSize": ""
    },
    "colorPalette": {
      "primary": { "hex": "", "rgb": "", "usage": "" },
      "secondary": { "hex": "", "rgb": "", "usage": "" },
      "accent": { "hex": "", "rgb": "", "usage": "" },
      "neutral": { "light": "", "mid": "", "dark": "" },
      "gradients": [{ "name": "", "css": "", "usage": "" }]
    },
    "typography": {
      "headingFont": { "name": "", "weights": [], "usage": "" },
      "bodyFont": { "name": "", "weights": [], "usage": "" },
      "monoFont": { "name": "", "usage": "" },
      "scale": { "h1": "", "h2": "", "h3": "", "body": "", "small": "", "caption": "" }
    },
    "spacing": { "unit": "", "scale": [] },
    "borderRadius": { "sm": "", "md": "", "lg": "", "full": "" },
    "shadows": { "sm": "", "md": "", "lg": "", "glow": "" },
    "iconStyle": { "style": "", "strokeWidth": "", "library": "" }
  },
  "photography": {
    "style": "",
    "subjects": [],
    "colorTreatment": "",
    "dontUse": []
  },
  "patterns": {
    "backgrounds": [],
    "illustrations": "",
    "dataVisualization": ""
  },
  "applications": {
    "website": { "heroStyle": "", "ctaStyle": "", "cardStyle": "" },
    "email": { "headerStyle": "", "footerStyle": "" },
    "social": { "profileImage": "", "coverStyle": "", "postStyle": "" },
    "presentations": { "slideStyle": "", "chartStyle": "" }
  }
}`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const identity = jsonMatch ? JSON.parse(jsonMatch[0]) : { raw: text };

    res.json({ success: true, data: identity });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Brand identity generation failed' });
  }
});

/**
 * POST /brand/generate-logo-brief
 * Generate detailed logo design brief for a designer/AI
 */
brandRouter.post('/generate-logo-brief', async (req, res) => {
  const { companyName, industry, style, colors } = req.body;

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `Create a detailed logo design brief for:

Company: ${companyName || 'BookedAI'}
Industry: ${industry || 'AI SaaS Platform, Booking, Education Technology'}
Style: ${style || 'Modern, minimal, tech-forward, trustworthy'}
Colors: ${JSON.stringify(colors || { primary: '#6366f1', accent: '#22d3ee' })}

Generate:
{
  "brief": {
    "concept": "",
    "keywords": [],
    "moodboard": [],
    "symbolOptions": [
      { "name": "", "description": "", "symbolism": "", "svgDescription": "" }
    ],
    "wordmarkOptions": [
      { "font": "", "treatment": "", "description": "" }
    ],
    "combinations": [
      { "name": "", "layout": "", "description": "" }
    ],
    "doNot": [],
    "fileFormats": ["SVG", "PNG (transparent)", "PNG (dark bg)", "PNG (light bg)", "ICO", "Apple Touch Icon"],
    "sizes": { "favicon": "32x32", "appIcon": "512x512", "social": "1200x630", "emailHeader": "600x100" }
  },
  "svgConcepts": [
    {
      "name": "",
      "description": "",
      "svgCode": ""
    }
  ]
}

For svgConcepts, generate 2-3 actual SVG logo concepts (simple, geometric, professional).`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const brief = jsonMatch ? JSON.parse(jsonMatch[0]) : { raw: text };

    res.json({ success: true, data: brief });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Logo brief generation failed' });
  }
});

/**
 * POST /brand/style-guide
 * Generate CSS/Tailwind design tokens from brand identity
 */
brandRouter.post('/style-guide', async (req, res) => {
  const { brandIdentity } = req.body;

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `Convert this brand identity into production-ready CSS custom properties and Tailwind config:

Brand: ${JSON.stringify(brandIdentity || {
    primary: '#6366f1',
    secondary: '#0891b2',
    accent: '#22d3ee',
    font: 'Outfit',
    style: 'dark, modern, glass-morphism'
  })}

Generate:
{
  "cssVariables": "/* Complete :root CSS variables */",
  "tailwindConfig": "/* tailwind.config.ts theme.extend content */",
  "globalStyles": "/* Base global styles */",
  "componentTokens": {
    "button": { "primary": {}, "secondary": {}, "ghost": {} },
    "card": { "default": {}, "elevated": {}, "interactive": {} },
    "input": { "default": {}, "focus": {}, "error": {} },
    "badge": { "success": {}, "warning": {}, "error": {}, "info": {} }
  },
  "animationTokens": {
    "fadeIn": "",
    "slideUp": "",
    "scaleIn": "",
    "shimmer": ""
  }
}`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const guide = jsonMatch ? JSON.parse(jsonMatch[0]) : { raw: text };

    res.json({ success: true, data: guide });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Style guide generation failed' });
  }
});
