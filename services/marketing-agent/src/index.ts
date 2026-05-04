import { GoogleGenerativeAI } from '@google/generative-ai';

const MARKETING_PROMPT = `You are the Longcare AU Marketing Agent. Generate campaign content for multiple channels.

For each channel, create content following these rules:
- Always include UTM parameters (source, medium, campaign, content)
- Always include a clear booking CTA
- Match tone to channel (professional for LinkedIn, casual for Instagram)
- Keep YouTube Shorts scripts under 60 seconds
- Email newsletters should be scannable with clear sections

Channels to generate for:
1. google_ads - short headline (30 chars) + description (90 chars)
2. youtube_shorts - 60-second video script
3. linkedin - professional post (150-300 words)
4. facebook - engaging post (100-200 words) with emoji
5. instagram - visual caption (100-150 words) with hashtags
6. email_newsletter - full email with subject, preview, sections
7. google_business_profile - update post (100-200 words)
8. seo_blog - SEO-optimized article outline (title, meta description, headings, key points)

Output as JSON array with structure:
[{
  "channel": "channel_name",
  "headline": "...",
  "body": "...",
  "ctaText": "...",
  "ctaUrl": "https://book.longcare.au?utm_source=...&utm_medium=...&utm_campaign=...",
  "hashtags": ["..."],
  "mediaPrompt": "Description for image/video generation"
}]

Require CEO approval before any content is published.`;

export async function generateCampaign(brief: string, campaignName: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY not configured');

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const utmCampaign = campaignName.toLowerCase().replace(/\s+/g, '-');

  const result = await model.generateContent({
    contents: [
      { role: 'user', parts: [{ text: MARKETING_PROMPT }] },
      { role: 'model', parts: [{ text: '[{"ready": true}]' }] },
      { role: 'user', parts: [{ text: `Campaign brief: ${brief}\nUTM campaign name: ${utmCampaign}` }] },
    ],
  });

  const responseText = result.response.text();
  const jsonMatch = responseText.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error('Failed to parse campaign content');

  return JSON.parse(jsonMatch[0]);
}

export async function generateWeeklyContentPlan(weekNumber: number, focus: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY not configured');

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `Generate a weekly content plan for Longcare AU, Week ${weekNumber}.
Focus area: ${focus}

Required weekly output:
- 3 short video scripts (YouTube Shorts / Instagram Reels)
- 2 LinkedIn posts
- 2 Facebook/Instagram posts
- 1 SEO blog article
- 1 email newsletter
- 1 Google Business Profile update

Each item should include UTM tracking and booking CTA.
Output as JSON with the structure matching the channel format above.`;

  const result = await model.generateContent(prompt);
  const jsonMatch = result.response.text().match(/\[[\s\S]*\]/);
  return jsonMatch ? JSON.parse(jsonMatch[0]) : [];
}
