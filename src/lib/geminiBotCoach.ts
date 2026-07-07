import { supabase } from './supabase';

export type BotCoachAdvice = {
  attackBias: number;
  defenseBias: number;
  specialBias: number;
  aggression: number;
  preferredRangeShift: number;
  lowAttackBias: number;
  antiAirBias: number;
  projectileBias: number;
  updatedAt: number;
};

export type BotCoachSnapshot = {
  difficulty: string;
  stageId: string;
  playerId: string;
  opponentId: string;
  playerHealth: number;
  opponentHealth: number;
  distance: number;
  playerY: number;
  opponentY: number;
  playerStatus: string;
  opponentStatus: string;
  playerAttack: string;
  opponentAttack: string;
  playerBlocking: boolean;
  playerCrouching: boolean;
  playerSpecial: string;
  opponentSpecial: string;
  playerHabits: Record<string, number>;
  aiOutcomes: Record<string, { success: number; fail: number }>;
};

export const DEFAULT_BOT_COACH_ADVICE: BotCoachAdvice = {
  attackBias: 1,
  defenseBias: 1,
  specialBias: 1,
  aggression: 1,
  preferredRangeShift: 0,
  lowAttackBias: 0,
  antiAirBias: 0,
  projectileBias: 0,
  updatedAt: 0,
};

function clampNumber(value: unknown, min: number, max: number, fallback: number) {
  return typeof value === 'number' && Number.isFinite(value)
    ? Math.min(max, Math.max(min, value))
    : fallback;
}

function normalizeAdvice(value: unknown): BotCoachAdvice | null {
  if (!value || typeof value !== 'object') return null;

  const raw = value as Partial<BotCoachAdvice>;
  return {
    attackBias: clampNumber(raw.attackBias, 0.75, 1.35, 1),
    defenseBias: clampNumber(raw.defenseBias, 0.75, 1.35, 1),
    specialBias: clampNumber(raw.specialBias, 0.75, 1.35, 1),
    aggression: clampNumber(raw.aggression, 0.75, 1.35, 1),
    preferredRangeShift: clampNumber(raw.preferredRangeShift, -8, 10, 0),
    lowAttackBias: clampNumber(raw.lowAttackBias, 0, 0.35, 0),
    antiAirBias: clampNumber(raw.antiAirBias, 0, 0.35, 0),
    projectileBias: clampNumber(raw.projectileBias, 0, 0.35, 0),
    updatedAt: Date.now(),
  };
}

export async function requestGeminiBotAdvice(snapshot: BotCoachSnapshot) {
  const { data, error } = await supabase.functions.invoke('ai', {
    body: {
      mode: 'bot-coach',
      snapshot,
    },
  });

  if (error) return null;
  return normalizeAdvice(data?.advice);
}
