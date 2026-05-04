import { TranslationServiceClient } from '@google-cloud/translate';

let _client: TranslationServiceClient | null = null;

function getClient(): TranslationServiceClient {
  if (!_client) {
    _client = new TranslationServiceClient();
  }
  return _client;
}

const PROJECT = process.env.GOOGLE_CLOUD_PROJECT || '';
const LOCATION = 'global';

export const translationService = {
  async translate(text: string, targetLanguage: string, sourceLanguage?: string): Promise<string> {
    const client = getClient();
    const parent = `projects/${PROJECT}/locations/${LOCATION}`;

    const [response] = await client.translateText({
      parent,
      contents: [text],
      targetLanguageCode: targetLanguage,
      sourceLanguageCode: sourceLanguage,
      mimeType: 'text/plain',
    });

    return response.translations?.[0]?.translatedText || text;
  },

  async translateHtml(html: string, targetLanguage: string): Promise<string> {
    const client = getClient();
    const parent = `projects/${PROJECT}/locations/${LOCATION}`;

    const [response] = await client.translateText({
      parent,
      contents: [html],
      targetLanguageCode: targetLanguage,
      mimeType: 'text/html',
    });

    return response.translations?.[0]?.translatedText || html;
  },

  async translateSessionNotes(notes: { summary: string; qa: { q: string; a: string }[]; nextCta: string }, targetLang: string) {
    const [summary, nextCta] = await Promise.all([
      this.translate(notes.summary, targetLang),
      this.translate(notes.nextCta, targetLang),
    ]);

    const qa = await Promise.all(
      notes.qa.map(async (item) => ({
        q: await this.translate(item.q, targetLang),
        a: await this.translate(item.a, targetLang),
      })),
    );

    return { summary, qa, nextCta };
  },
};
