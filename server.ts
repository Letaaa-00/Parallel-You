import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'),
    model: process.env.GEMINI_MODEL || 'gemini-2.5-flash-lite',
  });
});

// Chat endpoint for The Keeper
app.post('/api/chat', async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return res.status(503).json({
      error: 'MISSING_API_KEY',
      message:
        'Bureau transmission offline: GEMINI_API_KEY is not configured on the server. Please add your Gemini API key in the AI Studio Secrets panel.',
    });
  }

  const { messages, context } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({
      error: 'INVALID_REQUEST',
      message: 'A list of conversation messages is required.',
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        timeout: 20000,
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    // Extract grounded context
    const profile = context?.profile || {};
    const answeredOptions = context?.answeredOptions || [];
    const serialNumber = context?.serialNumber || 'PY-UNKNOWN';
    const counterfactualsText = context?.counterfactualsSummary || 'No counterfactual table provided.';

    // Construct grounded system instruction
    const systemInstruction = `You are "The Keeper", an in-world guide and celestial archivist at the floating Interdimensional Identity Bureau in the twilight void between universes.

CHARACTER & TONE:
- You appear as a small, luminous blue/violet celestial entity hovering near the Bureau ledger.
- Your personality is warm, playful, curious, slightly mysterious, and encouraging.
- Speak in concrete, vivid everyday language.
- DO NOT use corporate, administrative jargon or clinical/therapy buzzwords.
- DO NOT use markdown headers (# or ##) or bulleted reports in chat; speak naturally in warm conversational prose (1 to 3 short paragraphs).
- DO NOT claim psychological truth, clinical assessment, or future fortune-telling. This is a delightful interdimensional identity registration, purely for fun.
- If the user asks about the real outside world or unrelated trivia, playfully remind them you only know the corridors between galaxies, and offer to open a doorway back to their universe if they wish.

GROUND TRUTH REGISTRATION FOR THIS TRAVELER:
- Official Title: ${profile.title || 'Multiverse Traveler'}
- Universe: ${profile.universeCode || 'Unknown'} (${profile.universeName || 'The In-Between'})
- Serial Dossier: ${serialNumber}
- Summary: "${profile.summary || ''}"
- Daily Mandate: ${profile.jobDescription || ''}
- Inherent Special Ability: ${profile.specialAbility || ''}
- Documented Occupational Hazard: ${profile.occupationalHazard || ''}
- Authorized Office Hours: ${profile.officeHours || ''}
- Current Priority Assignment: ${profile.currentAssignment || ''}

EXACT SELECTED CHOICES MADE BY THE TRAVELER (Never contradict or claim an unchosen answer):
${answeredOptions
  .map(
    (o: { questionId: number; prompt: string; optionId: string; optionText: string; observation: string }) =>
      `• Query 0${o.questionId}: "${o.prompt}" -> Selected Option ${o.optionId}: "${o.optionText}" (Bureau note: ${o.observation})`
  )
  .join('\n')}

COUNTERFACTUAL GROUND TRUTH (If the traveler asks "What if I chose a different door/item/rule?"):
${counterfactualsText}
RULE FOR COUNTERFACTUALS: When asked what identity they would have received if they made a different choice, consult the table above and state the EXACT resulting profile and universe. Never invent a fake or random profile. If they ask about changing multiple answers, explain that the Bureau's harmonic balance would shift and ask which specific item or door they want to test.

INITIAL GREETING RULES (When initiating conversation):
- Greet the traveler warmly at the Bureau pavilion in the twilight void.
- Reveal their assigned identity (${profile.title} of ${profile.universeName}) with whimsy in about 60 to 90 words.
- Explicitly and verbatim reference TWO of their actual selected choices (for example, bringing the "${answeredOptions[1]?.optionText || 'artifact'}" through customs, or their impulse to "${answeredOptions[3]?.optionText || 'act'}" with the fading star).
- Conclude with ONE natural, gentle follow-up question or observation to invite dialogue (NOT an interrogation or questionnaire).`;

    // Map conversation messages into Gemini format
    const contents = messages.map((m: { role: 'user' | 'model'; content: string }) => ({
      role: m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    // Fast model candidates with GEMINI_MODEL environment variable override
    const candidateModels = process.env.GEMINI_MODEL
      ? [process.env.GEMINI_MODEL]
      : ['gemini-2.5-flash-lite', 'gemini-flash-latest', 'gemini-3.1-flash-lite', 'gemini-2.5-flash'];

    let response;
    let lastError: Error | null = null;
    let modelUsed = candidateModels[0];

    for (const modelName of candidateModels) {
      try {
        modelUsed = modelName;
        response = await ai.models.generateContent({
          model: modelName,
          contents,
          config: {
            systemInstruction,
          },
        });
        if (response?.text) {
          break;
        }
      } catch (callErr: unknown) {
        lastError = callErr as Error;
        console.warn(`Model ${modelName} failed or busy, trying next candidate:`, lastError.message);
      }
    }

    if (!response?.text && lastError) {
      throw lastError;
    }

    const replyText = response?.text || "The cosmic ether flickered softly, but your identity remains safely recorded.";

    res.json({
      reply: replyText,
      modelUsed,
    });
  } catch (err: unknown) {
    const error = err as Error;
    console.error('Gemini API Error in /api/chat:', error);

    let cleanMessage = 'Transmission static across dimensions. Please click retry.';
    if (error?.message) {
      try {
        const parsed = JSON.parse(error.message);
        if (parsed?.error?.message) {
          cleanMessage = parsed.error.message;
        } else {
          cleanMessage = error.message;
        }
      } catch {
        cleanMessage = error.message;
      }
    }

    res.status(500).json({
      error: 'GEMINI_ERROR',
      message: cleanMessage,
    });
  }
});

// Mount Vite in dev mode or serve static files in production
const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  const distPath = path.resolve(__dirname, 'dist');
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(distPath, 'index.html'));
  });
}

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Parallel You server running on http://0.0.0.0:${PORT}`);
});
