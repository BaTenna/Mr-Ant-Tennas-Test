const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
const MODEL = 'gemini-2.0-flash';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const BOT_COACH_DEFAULT = {
  attackBias: 1,
  defenseBias: 1,
  specialBias: 1,
  aggression: 1,
  preferredRangeShift: 0,
  lowAttackBias: 0,
  antiAirBias: 0,
  projectileBias: 0,
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, 'Content-Type': 'application/json' },
  });
}

function clampNumber(value: unknown, min: number, max: number, fallback: number) {
  return typeof value === 'number' && Number.isFinite(value)
    ? Math.min(max, Math.max(min, value))
    : fallback;
}

function normalizeBotAdvice(value: unknown) {
  if (!value || typeof value !== 'object') return BOT_COACH_DEFAULT;

  const raw = value as Record<string, unknown>;
  return {
    attackBias: clampNumber(raw.attackBias, 0.75, 1.35, 1),
    defenseBias: clampNumber(raw.defenseBias, 0.75, 1.35, 1),
    specialBias: clampNumber(raw.specialBias, 0.75, 1.35, 1),
    aggression: clampNumber(raw.aggression, 0.75, 1.35, 1),
    preferredRangeShift: clampNumber(raw.preferredRangeShift, -8, 10, 0),
    lowAttackBias: clampNumber(raw.lowAttackBias, 0, 0.35, 0),
    antiAirBias: clampNumber(raw.antiAirBias, 0, 0.35, 0),
    projectileBias: clampNumber(raw.projectileBias, 0, 0.35, 0),
  };
}

function extractJson(text: string) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1];
  const source = fenced ?? text;
  const start = source.indexOf('{');
  const end = source.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) return null;

  try {
    return JSON.parse(source.slice(start, end + 1));
  } catch {
    return null;
  }
}

async function askGemini(prompt: string, system?: string) {
  if (!GEMINI_API_KEY) {
    throw new Error('Missing GEMINI_API_KEY secret.');
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: system ? { parts: [{ text: system }] } : undefined,
        contents: [{ parts: [{ text: prompt }] }],
      }),
    },
  );

  if (!res.ok) {
    throw new Error(`Gemini request failed: ${res.status}`);
  }

  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
}

function buildBotCoachPrompt(snapshot: unknown) {
  return [
    'You are a tactical coach for a 2D fighting game CPU opponent.',
    'Analyze the compact fight snapshot and return only JSON with numeric tuning values.',
    'The CPU already has local learning; your job is to gently bias its next decisions.',
    'Never return text outside JSON.',
    '',
    'Schema and bounds:',
    '{"attackBias":0.75-1.35,"defenseBias":0.75-1.35,"specialBias":0.75-1.35,"aggression":0.75-1.35,"preferredRangeShift":-8..10,"lowAttackBias":0..0.35,"antiAirBias":0..0.35,"projectileBias":0..0.35}',
    '',
    'Guidelines:',
    '- If the player blocks or turtles, raise lowAttackBias, specialBias, and aggression.',
    '- If the player jumps or stays airborne, raise antiAirBias and attackBias.',
    '- If the player keeps distance or uses projectiles, raise defenseBias, projectileBias, and preferredRangeShift.',
    '- If the CPU is losing health, prefer defense and range control.',
    '- Keep changes moderate so the bot stays fair.',
    '',
    `Snapshot: ${JSON.stringify(snapshot)}`,
  ].join('\n');
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });

  try {
    const body = await req.json();

    if (body?.mode === 'bot-coach') {
      try {
        const text = await askGemini(
          buildBotCoachPrompt(body.snapshot),
          'Return strict JSON only. No markdown, no explanation.',
        );
        return jsonResponse({ advice: normalizeBotAdvice(extractJson(text)), source: 'gemini' });
      } catch {
        return jsonResponse({ advice: BOT_COACH_DEFAULT, source: 'fallback' });
      }
    }

    const { prompt, system } = body;
    if (!prompt) throw new Error('Missing prompt.');

    const text = await askGemini(prompt, system);
    return jsonResponse({ text });
  } catch (e) {
    return jsonResponse({ error: String(e) }, 500);
  }
});
