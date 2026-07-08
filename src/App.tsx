import { type CSSProperties, type KeyboardEvent as ReactKeyboardEvent, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  DEFAULT_BOT_COACH_ADVICE,
  type BotCoachAdvice,
  type BotCoachSnapshot,
  requestGeminiBotAdvice,
} from './lib/geminiBotCoach';
import { supabase } from './lib/supabase';
import type { RealtimeChannel } from '@supabase/supabase-js';
import campaignHeartPlayerSprite from './assets/campaign-heart-player.png';
import campaignBossPlaceholderSprite from './assets/campaign-boss-placeholder.png';
import campaignNpcOneAIdleSprite from './assets/campaign-npc-1a-idle.png';
import campaignNpcOneATalkSprite from './assets/campaign-npc-1a-talk.png';
import campaignNpcOneBIdleSprite from './assets/campaign-npc-1b-idle.png';
import campaignNpcOneBTalkSprite from './assets/campaign-npc-1b-talk.png';
import campaignNpcOneCIdleSprite from './assets/campaign-npc-1c-idle.png';
import campaignNpcOneCTalkSprite from './assets/campaign-npc-1c-talk.png';
import campaignNpcOneDIdleSprite from './assets/campaign-npc-1d-idle.png';
import campaignNpcOneDTalkSprite from './assets/campaign-npc-1d-talk.png';
import campaignNpcSideBagIdleSprite from './assets/campaign-npc-side-bag-idle.png';
import campaignNpcSideBagRunPrepSprite from './assets/campaign-npc-side-bag-run-prep.png';
import campaignNpcSideBagShootSprite from './assets/campaign-npc-side-bag-shoot.png';
import campaignNpcSideBagTalkSprite from './assets/campaign-npc-side-bag-talk.png';
import campaignNpcSideBagVictorySprite from './assets/campaign-npc-side-bag-victory.png';
import gersonBoomBattleSprite from './assets/gerson-boom-battle-strip.png';
import gersonAirCounterIcon from './assets/gerson-air-counter-icon.png';
import gersonBoomBackScarfSprite from './assets/gerson-boom-back-scarf-strip.png';
import gersonBoomDefeatSprite from './assets/gerson-boom-defeat-strip.png';
import gersonBoomJumpBounceSprite from './assets/gerson-boom-jump-bounce-strip.png';
import gersonBoomLeapBoostSprite from './assets/gerson-boom-leap-boost-strip.png';
import gersonBoomLeapPrepSprite from './assets/gerson-boom-leap-prep.png';
import gersonBoomJumpSprite from './assets/gerson-boom-jump-strip.png';
import gersonBoomJumpSlowSprite from './assets/gerson-boom-jump-slow-strip.png';
import gersonBoomKnockdownSprite from './assets/gerson-boom-knockdown.png';
import gersonBoomPortraitSprite from './assets/gerson-boom-portrait.png';
import gersonBoomRightAttackSprite from './assets/gerson-boom-right-attack-strip.png';
import gersonBoomSpinSprite from './assets/gerson-boom-spin-strip.png';
import gersonBoomVictorySprite from './assets/gerson-boom-victory.gif';
import gersonLaughSound from './assets/gerson-laugh.mp3';
import jevilBattleSprite from './assets/jevil-battle-strip.png';
import jevilBlockSprite from './assets/jevil-block-strip.png';
import jevilChaosSpecialSprite from './assets/jevil-chaos-special-strip.png';
import jevilKickSprite from './assets/jevil-kick-strip.png';
import jevilPlatformSprite from './assets/jevil-platform-strip.png';
import jevilPlatformSpecialSprite from './assets/jevil-platform-special-strip.png';
import jevilPortraitSprite from './assets/jevil-portrait.png';
import jevilChaosProjectileOneSprite from './assets/jevil-chaos-projectile-1.png';
import jevilChaosProjectileTwoSprite from './assets/jevil-chaos-projectile-2.png';
import jevilChaosProjectileThreeSprite from './assets/jevil-chaos-projectile-3.png';
import jevilChaosProjectileFourSprite from './assets/jevil-chaos-projectile-4.png';
import jevilHeadProjectileSprite from './assets/jevil-head-projectile-strip.png';
import jevilHeadlessAbsorbPoseSprite from './assets/jevil-headless-absorb-pose.png';
import jevilKnockdownDefeatSprite from './assets/jevil-knockdown-defeat.png';
import jevilScytheProjectileSprite from './assets/jevil-scythe-projectile.png';
import jevilTeleportFreezeSprite from './assets/jevil-teleport-freeze.png';
import jevilTeleportShootSprite from './assets/jevil-teleport-shoot.png';
import jevilTeleportSpecialSprite from './assets/jevil-teleport-special-strip.png';
import misterAntTennaSprite from './assets/mister-ant-tenna.png';
import misterAntTennaBattleSprite from './assets/tenna-battle-strip.png';
import misterAntTennaCrouchSprite from './assets/tenna-crouch.png';
import misterAntTennaPunchSprite from './assets/tenna-punch.png';
import misterAntTennaKickSprite from './assets/tenna-kick-strip.png';
import misterAntTennaJumpSprite from './assets/tenna-jump-strip.png';
import misterAntTennaCrouchUppercutSprite from './assets/tenna-crouch-uppercut-strip.png';
import misterAntTennaCrouchSweepSprite from './assets/tenna-crouch-sweep.png';
import misterAntTennaKnockdownSprite from './assets/tenna-knockdown.png';
import misterAntTennaProjectileSprite from './assets/tenna-star-projectile.png';
import misterAntTennaShootSprite from './assets/tenna-shoot.png';
import misterAntTennaDefeatSprite from './assets/tenna-defeat-strip.png';
import misterAntTennaAirSpecialSprite from './assets/tenna-air-special.png';
import misterAntTennaVictoryOneSprite from './assets/tenna-victory-1.gif';
import misterAntTennaVictoryTwoSprite from './assets/tenna-victory-2.gif';
import misterAntTennaVictoryThreeSprite from './assets/tenna-victory-3.gif';
import misterAntTennaVictoryFourSprite from './assets/tenna-victory-4.gif';
import queenSprite from './assets/queen.png';
import queenBattleSprite from './assets/queen-battle.png';
import queenWalkSprite from './assets/queen-walk-strip.png';
import queenCrouchSprite from './assets/queen-crouch.png';
import queenUppercutSprite from './assets/queen-uppercut-strip.png';
import queenPunchSprite from './assets/queen-punch-strip.png';
import queenSweepSprite from './assets/queen-sweep.png';
import queenKickSprite from './assets/queen-kick-strip.png';
import queenJumpSprite from './assets/queen-jump-strip.png';
import queenSpecialSprite from './assets/queen-special-strip.png';
import queenProjectileSprite from './assets/queen-projectile.png';
import queenKnockdownSprite from './assets/queen-knockdown.png';
import queenKnockdownPoseSprite from './assets/queen-knockdown-pose.png';
import queenHealSprite from './assets/queen-heal.png';
import queenVictorySprite from './assets/queen-victory-strip.png';
import queenVictoryBackdropSprite from './assets/queen-victory-backdrop-strip.png';
import queenUniqueVictoryPoseSprite from './assets/queen-unique-victory-pose.png';
import roaringKnightPortraitSprite from './assets/roaring-knight-portrait.png';
import roaringKnightSprite from './assets/roaring-knight.png';
import roaringKnightChargeHoldSprite from './assets/roaring-knight-charge-hold.png';
import roaringKnightChargeReleaseSprite from './assets/roaring-knight-charge-release.gif';
import roaringKnightBlockSprite from './assets/roaring-knight-block-strip.png';
import roaringKnightImpactSprite from './assets/roaring-knight-impact-strip.png';
import roaringKnightVanishSprite from './assets/roaring-knight-vanish-strip.png';
import roaringKnightSphereSprite from './assets/roaring-knight-sphere-strip.png';
import roaringKnightBirdSprite from './assets/roaring-knight-bird-strip.png';
import roaringKnightBirdDashSprite from './assets/roaring-knight-bird-dash-strip.png';
import roaringKnightDarkWaveSprite from './assets/roaring-knight-dark-wave-strip.png';
import knightDarkWaveExplosionSprite from './assets/knight-dark-wave-explosion.gif';
import roaringKnightSwordShotSprite from './assets/roaring-knight-sword-shot-strip.png';
import roaringKnightSwordProjectileSprite from './assets/roaring-knight-sword-projectile.png';
import roaringKnightDefeatSprite from './assets/roaring-knight-defeat-strip.png';
import roaringKnightVictorySprite from './assets/roaring-knight-victory-strip.png';
import roaringKnightChargeReleaseFrame0 from './assets/knight-charge-release-frames/frame-00.png';
import roaringKnightChargeReleaseFrame1 from './assets/knight-charge-release-frames/frame-01.png';
import roaringKnightChargeReleaseFrame2 from './assets/knight-charge-release-frames/frame-02.png';
import roaringKnightChargeReleaseFrame3 from './assets/knight-charge-release-frames/frame-03.png';
import roaringKnightChargeReleaseFrame4 from './assets/knight-charge-release-frames/frame-04.png';
import healPlusFiveSprite from './assets/heal-plus-five.png';
import selectSound from './assets/snd_select.wav';
import fightStartSound from './assets/snd_boost.wav';
import queenVictorySound from './assets/queen-intro.ogg';
import tennaAirWaveSound from './assets/snd_scytheburst.wav';
import queenHealSound from './assets/snd_power.wav';
import queenCupThrowSound from './assets/snd_b.wav';
import projectileHitSound from './assets/snd_bomb.wav';
import knightSwordProjectileSound from './assets/snd_shadowpendant.wav';
import knightSwordSlashSound from './assets/roaring-knight-swoon-deltarune.mp3';
import roaringKnightRoarSound from './assets/roaring-knight-roar.mp3';
import knightSphereTransformSound from './assets/snd_weaponpull.wav';
import knightBirdDriveSound from './assets/snd_cardrive.wav';
import attackUppercutSound from './assets/snd_criticalswing.wav';
import attackSweepSound from './assets/snd_grab.wav';
import attackKickSound from './assets/snd_heavyswing.wav';
import attackPunchSound from './assets/snd_impact.wav';
import queenPunchSound from './assets/snd_laz_c.wav';
import queenKickSound from './assets/snd_rudebuster_hit.wav';
import gersonJumpHitSound from './assets/snd_rudebuster_hit.wav';
import gersonBounceSound from './assets/snd_jump.wav';
import tennaVictoryThreeSound from './assets/crowd-laughter-deltarune.mp3';
import tennaStarSpecialSound from './assets/snd_tensionhorn.wav';
import jevilVoiceAnythingSound from './assets/snd_joker_anything.wav';
import jevilVoiceAnythingJaSound from './assets/snd_joker_anything_ja.wav';
import jevilVoiceByeByeSound from './assets/snd_joker_byebye.wav';
import jevilVoiceChaosSound from './assets/snd_joker_chaos.wav';
import jevilVoiceHaZeroSound from './assets/snd_joker_ha0.wav';
import jevilVoiceHaOneSound from './assets/snd_joker_ha1.wav';
import jevilVoiceLaughZeroSound from './assets/snd_joker_laugh0.wav';
import jevilVoiceLaughOneSound from './assets/snd_joker_laugh1.wav';
import jevilVoiceMetamorphosisSound from './assets/snd_joker_metamorphosis.wav';
import jevilVoiceMetamorphosisJaSound from './assets/snd_joker_metamorphosis_ja.wav';
import jevilVoiceNeoChaosSound from './assets/snd_joker_neochaos.wav';
import jevilVoiceNeoChaosJaSound from './assets/snd_joker_neochaos_ja.wav';
import jevilVoiceOhSound from './assets/snd_joker_oh.wav';
import doorHoverSound from './assets/snd_spearappear.wav';
import doorClickSound from './assets/audio_appearance.wav';
import announcerBeginsOneSound from './assets/announcer-begins-1sec.wav';
import announcerBeginsTwoSound from './assets/announcer-begins-2sec.wav';
import announcerBeginsThreeSound from './assets/announcer-begins-3sec.wav';
import couchCliffsMusic from './assets/battle.ogg';
import darkSanctuariesMusic from './assets/ch4_battle.ogg';
import coldPlaceMusic from './assets/knight.ogg';
import queenMansionMusic from './assets/queen_boss.ogg';
import tennaStageMusic from './assets/tenna_battle_old.ogg';
import deltafightTitleBg from './assets/deltafight-title-bg.png';
import settingsIcon from './assets/settings-icon.png';
import stageTennaArena from './assets/arena-tenna-stage.png';
import stageCouchCliffs from './assets/stage-couch-cliffs.webp';
import stageColdPlace from './assets/stage-cold-place.png';
import stageDarkSanctuaries from './assets/stage-dark-sanctuaries.png';
import stageQueensMansion from './assets/stage-queens-mansion.webp';

const knightChargeReleaseFrameSprites = [
  roaringKnightChargeReleaseFrame0,
  roaringKnightChargeReleaseFrame1,
  roaringKnightChargeReleaseFrame2,
  roaringKnightChargeReleaseFrame3,
  roaringKnightChargeReleaseFrame4,
];

const jevilChaosProjectileSprites = [
  jevilChaosProjectileOneSprite,
  jevilChaosProjectileTwoSprite,
  jevilChaosProjectileThreeSprite,
  jevilChaosProjectileFourSprite,
];

const KNIGHT_CHARGE_RELEASE_FRAME_MS = [500, 120, 120, 120, 500];

function getKnightChargeReleaseFrameIndex(elapsedMs: number) {
  let frameEndMs = 0;

  for (let index = 0; index < KNIGHT_CHARGE_RELEASE_FRAME_MS.length; index += 1) {
    frameEndMs += KNIGHT_CHARGE_RELEASE_FRAME_MS[index];

    if (elapsedMs < frameEndMs) {
      return index;
    }
  }

  return KNIGHT_CHARGE_RELEASE_FRAME_MS.length - 1;
}

function getLoopingSpriteFrameIndex(elapsedMs: number, durationMs: number, frameCount: number) {
  if (frameCount <= 1) return 0;

  const frameMs = durationMs / frameCount;
  return Math.min(frameCount - 1, Math.floor((elapsedMs % durationMs) / frameMs));
}

function getOneShotSpriteFrameIndex(elapsedMs: number, durationMs: number, frameCount: number, isReversed = false) {
  if (frameCount <= 1) return 0;

  const frameMs = durationMs / frameCount;
  const frameIndex = Math.min(frameCount - 1, Math.floor(clamp(elapsedMs, 0, durationMs - 1) / frameMs));
  return isReversed ? frameCount - 1 - frameIndex : frameIndex;
}

function getSpriteFramePosition(frameIndex: number, frameCount: number) {
  if (frameCount <= 1) return '0 0';

  return `${(frameIndex / (frameCount - 1)) * 100}% 0`;
}

type Fighter = {
  id: string;
  name: string;
  title: string;
  realm: string;
  color: string;
  shadow: string;
  sprite?: string;
  battleSprite?: string;
  crouchSprite?: string;
  punchSprite?: string;
  kickSprite?: string;
  jumpSprite?: string;
  walkSprite?: string;
  crouchPunchSprite?: string;
  crouchKickSprite?: string;
  knockdownSprite?: string;
  launchedSprite?: string;
  specialSprite?: string;
  airSpecialSprite?: string;
  healSprite?: string;
  blockSprite?: string;
  defeatSprite?: string;
  victorySprites?: string[];
  chargeHoldSprite?: string;
  chargeReleaseSprite?: string;
};

type Screen =
  | 'title'
  | 'menu'
  | 'campaign-saves'
  | 'campaign'
  | 'bag-battle'
  | 'rooms'
  | 'select'
  | 'stage'
  | 'arena'
  | 'victory';
type Attack = 'idle' | 'punch' | 'kick';
type HitLevel = 'high' | 'mid' | 'low';
type HitEffect = 'none' | 'sweep' | 'uppercut';
type GersonLandingBounce = {
  sideDirection: -1 | 1;
  airHitCount: number;
  sideKnockbackMultiplier?: number;
};
type KnightExplosion = {
  id: number;
  side: FighterSide;
  position: Position;
};
type GersonLeapEffect = {
  id: number;
  side: FighterSide;
  x: number;
  direction: -1 | 1;
};
type ArenaMode = 'fight' | 'sandbox' | 'online';
type OnlineRole = 'host' | 'guest';
type OnlineRoomStatus = 'idle' | 'connecting' | 'waiting' | 'ready' | 'playing' | 'error';
type FighterSide = 'left' | 'right';
type Facing = 'left' | 'right';
type Position = { x: number; y: number };
type BagBattleActor = {
  x: number;
  y: number;
  vy: number;
  health: number;
};
type BagBattleProjectile = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  owner: 'player' | 'boss';
  lane?: 'high' | 'mid' | 'low';
};
type BagBattleAttack = 'idle' | 'punch' | 'kick' | 'uppercut' | 'sweep';
type BagBattleBossPattern = 'shooting' | 'run-prep' | 'running' | 'returning';
type CampaignRoomId = 'room1' | 'room2' | 'room2a' | 'side-room';
type CampaignRect = { x: number; y: number; width: number; height: number };
type CampaignTransition = {
  rect: CampaignRect;
  target: CampaignRoomId;
  position: Position;
};
type CampaignNpc = {
  id: string;
  label: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  hitbox?: {
    offsetX: number;
    offsetY: number;
    width: number;
    height: number;
  };
  text: string;
  idleSprite?: string;
  talkSprite?: string;
  talkOffsetY?: number;
  encounter?: 'bag-battle';
};
type CampaignSign = {
  id: string;
  label: string;
  x: number;
  y: number;
  text: string;
};
type CampaignRoom = {
  id: CampaignRoomId;
  title: string;
  allowed: CampaignRect[];
  transitions: CampaignTransition[];
  npcs?: CampaignNpc[];
  signs?: CampaignSign[];
};
type CampaignSaveData = {
  slot: number;
  roomId: CampaignRoomId;
  position: Position;
  isBagDefeated: boolean;
  isBagCollected: boolean;
  updatedAt: number | null;
};
type CampaignBossCutscenePhase = 'talking' | 'leaving';
type GameInput = 'w' | 'a' | 's' | 'd' | 'arrowleft' | 'arrowright' | 'arrowdown' | 'arrowup' | 'block';
type OnlineInputMessage = {
  playerId: string;
  key: string;
  isDown: boolean;
  sequence: number;
  sentAt: number;
};
type OnlineSnapshotMessage = {
  playerId: string;
  sequence: number;
  playerPosition: Position;
  opponentPosition: Position;
  playerHealth: number;
  opponentHealth: number;
  attack: Attack;
  opponentAttack: Attack;
  playerStatus: OpponentStatus;
  opponentStatus: OpponentStatus;
  isCrouching: boolean;
  opponentCrouching: boolean;
  playerBlocking: boolean;
  opponentBlocking: boolean;
  playerSpecialShooting: boolean;
  opponentSpecialShooting: boolean;
  playerSpecialSpriteOverride: string | null;
  opponentSpecialSpriteOverride: string | null;
  playerAirSpecialWave: boolean;
  opponentAirSpecialWave: boolean;
  playerChargeAttackState: ChargeAttackState;
  opponentChargeAttackState: ChargeAttackState;
  playerChargeAuraActive: boolean;
  opponentChargeAuraActive: boolean;
  playerKnightSpherePhase: KnightSpherePhase;
  opponentKnightSpherePhase: KnightSpherePhase;
  playerKnightDarkWaveState: KnightDarkWaveState;
  opponentKnightDarkWaveState: KnightDarkWaveState;
  playerKnightDarkWaveDirection: -1 | 1;
  playerKnightDarkWaveOverheated: boolean;
  opponentKnightDarkWaveOverheated: boolean;
  playerJevilAbsorbing: boolean;
  opponentJevilAbsorbing: boolean;
  playerJevilHeadlessPose: boolean;
  opponentJevilHeadlessPose: boolean;
  jevilPlatforms: JevilPlatform[];
  roundTimeLeft: number;
  roundCountdown: number;
  projectiles: Projectile[];
};
type ProjectileLane = 'low' | 'high';
type ProjectileKind =
  | 'tenna-star'
  | 'queen-wave'
  | 'queen-heal-wave'
  | 'knight-dark-wave'
  | 'knight-sword'
  | 'jevil-chaos-shot'
  | 'jevil-head'
  | 'jevil-scythe';
type RoundCurtainPhase = 'idle' | 'closing' | 'opening';
type ChargeAttackState = 'idle' | 'charging' | 'releasing';
type KnightDarkWaveState = 'idle' | 'holding';
type Projectile = {
  id: number;
  x: number;
  startX?: number;
  direction: -1 | 1;
  owner: FighterSide;
  lane: ProjectileLane;
  kind: ProjectileKind;
  damage?: number;
  knockback?: number;
  maxTravel?: number;
  speed?: number;
  createdAt?: number;
  durationMs?: number;
  bottomPx?: number;
  bottomVelocity?: number;
  projectileSprite?: string;
  returning?: boolean;
  hasHit?: boolean;
  lastHitAt?: number;
};
type HealPopup = {
  id: number;
  side: FighterSide;
  x: number;
  y: number;
};
type JevilPlatform = {
  id: number;
  x: number;
  y: number;
  createdAt: number;
};
type KnightAfterimage = {
  id: number;
  side: FighterSide;
  x: number;
  y: number;
  visualLift: number;
  facing: Facing;
  variant: 'fighter' | 'sphere';
  chargeAttackState: ChargeAttackState;
  chargeReleaseFrameIndex?: number;
  sprite: string;
  renderMode: 'image' | 'strip';
  width?: number;
  height?: number;
  backgroundSize?: string;
  backgroundPosition?: string;
  heightPx?: number;
  mirrorsBaseSprite?: boolean;
};
type OpponentStatus = 'idle' | 'knockdown' | 'launched' | 'healing';
type SelectTarget = 'player' | 'opponent';
type Difficulty = 'easy' | 'normal' | 'hard';
type BlockOutcome = 'none' | 'normal' | 'perfect';
type PlayerSpecialMove =
  | 'tenna-ground'
  | 'tenna-air'
  | 'queen-ground'
  | 'queen-heal'
  | 'gerson-leap'
  | 'jevil-absorb'
  | 'jevil-chaos'
  | 'jevil-platforms';
type KnightSpherePhase = 'idle' | 'entering' | 'active' | 'exiting' | 'bird-transform' | 'bird';
type OpponentKnightSpherePlan = 'none' | 'bird' | 'air-charge' | 'air-dark-wave';
type AiAction =
  | 'melee'
  | 'low'
  | 'antiHigh'
  | 'block'
  | 'crouch'
  | 'jump'
  | 'special'
  | 'heal'
  | 'sphere'
  | 'charge'
  | 'projectile'
  | 'airSpecial'
  | 'bird';
type AiLearningMemory = {
  player: {
    total: number;
    high: number;
    low: number;
    mid: number;
    projectile: number;
    special: number;
    jump: number;
    crouch: number;
    block: number;
    air: number;
    close: number;
    far: number;
  };
  outcomes: Record<AiAction, { success: number; fail: number }>;
};
type AttackSoundId =
  | 'attackPunch'
  | 'attackKick'
  | 'attackUppercut'
  | 'attackSweep'
  | 'queenPunch'
  | 'queenKick';
type JevilVoiceSoundId =
  | 'jevilVoiceAnything'
  | 'jevilVoiceAnythingJa'
  | 'jevilVoiceByeBye'
  | 'jevilVoiceChaos'
  | 'jevilVoiceHaZero'
  | 'jevilVoiceHaOne'
  | 'jevilVoiceLaughZero'
  | 'jevilVoiceLaughOne'
  | 'jevilVoiceMetamorphosis'
  | 'jevilVoiceMetamorphosisJa'
  | 'jevilVoiceNeoChaos'
  | 'jevilVoiceNeoChaosJa'
  | 'jevilVoiceOh';
type BufferedSoundId =
  | 'select'
  | 'fightStart'
  | 'tennaAirWave'
  | 'queenHeal'
  | 'queenCupThrow'
  | 'projectileHit'
  | 'knightSwordProjectile'
  | 'knightSwordSlash'
  | 'knightSphereTransform'
  | 'knightBirdHit'
  | 'gersonJumpHit'
  | 'gersonBounce'
  | 'tennaStarSpecial'
  | 'doorHover'
  | 'doorClick'
  | 'countdown1'
  | 'countdown2'
  | 'countdown3'
  | JevilVoiceSoundId
  | AttackSoundId;

const JEVIL_VOICE_SOUND_IDS: JevilVoiceSoundId[] = [
  'jevilVoiceAnything',
  'jevilVoiceAnythingJa',
  'jevilVoiceByeBye',
  'jevilVoiceChaos',
  'jevilVoiceHaZero',
  'jevilVoiceHaOne',
  'jevilVoiceLaughZero',
  'jevilVoiceLaughOne',
  'jevilVoiceMetamorphosis',
  'jevilVoiceMetamorphosisJa',
  'jevilVoiceNeoChaos',
  'jevilVoiceNeoChaosJa',
  'jevilVoiceOh',
];

function createEmptyJevilVoiceSoundRefs(): Record<JevilVoiceSoundId, HTMLAudioElement | null> {
  return {
    jevilVoiceAnything: null,
    jevilVoiceAnythingJa: null,
    jevilVoiceByeBye: null,
    jevilVoiceChaos: null,
    jevilVoiceHaZero: null,
    jevilVoiceHaOne: null,
    jevilVoiceLaughZero: null,
    jevilVoiceLaughOne: null,
    jevilVoiceMetamorphosis: null,
    jevilVoiceMetamorphosisJa: null,
    jevilVoiceNeoChaos: null,
    jevilVoiceNeoChaosJa: null,
    jevilVoiceOh: null,
  };
}

type FighterOrbStyle = CSSProperties & {
  '--fighter-color': string;
  '--fighter-shadow': string;
};

type ArenaFighterStyle = FighterOrbStyle & {
  left: string;
  bottom: string;
};

type Stage = {
  id: string;
  name: string;
  image: string;
  position: string;
  size: string;
  fighterLift?: number;
  arenaHeight?: number;
};

const fighters: Fighter[] = [
  {
    id: 'mister-ant-tenna',
    name: 'Mr Ant Tenna',
    title: 'Antenna Champion',
    realm: 'Signal Arena',
    color: '#d22d68',
    shadow: '#6f174b',
    sprite: misterAntTennaSprite,
    battleSprite: misterAntTennaBattleSprite,
    crouchSprite: misterAntTennaCrouchSprite,
    punchSprite: misterAntTennaPunchSprite,
    kickSprite: misterAntTennaKickSprite,
    jumpSprite: misterAntTennaJumpSprite,
    crouchPunchSprite: misterAntTennaCrouchUppercutSprite,
    crouchKickSprite: misterAntTennaCrouchSweepSprite,
    knockdownSprite: misterAntTennaKnockdownSprite,
    specialSprite: misterAntTennaShootSprite,
    airSpecialSprite: misterAntTennaAirSpecialSprite,
    defeatSprite: misterAntTennaDefeatSprite,
    victorySprites: [
      misterAntTennaVictoryOneSprite,
      misterAntTennaVictoryTwoSprite,
      misterAntTennaVictoryThreeSprite,
      misterAntTennaVictoryFourSprite,
    ],
  },
  {
    id: 'jevil',
    name: 'Jevil',
    title: 'Chaos Jester',
    realm: 'Card Castle',
    color: '#8b5cff',
    shadow: '#28164f',
    sprite: jevilPortraitSprite,
    battleSprite: jevilBattleSprite,
    blockSprite: jevilBlockSprite,
    kickSprite: jevilKickSprite,
    specialSprite: jevilPlatformSpecialSprite,
    knockdownSprite: jevilKnockdownDefeatSprite,
    defeatSprite: jevilKnockdownDefeatSprite,
  },
  {
    id: 'moss',
    name: 'Moss',
    title: 'Iron Grappler',
    realm: 'Green Pit',
    color: '#37a66b',
    shadow: '#155a34',
  },
  {
    id: 'wave',
    name: 'Wave',
    title: 'Tide Sentinel',
    realm: 'Blue Gate',
    color: '#3f8dd8',
    shadow: '#183f78',
  },
  {
    id: 'shade',
    name: 'Shade',
    title: 'Silent Counter',
    realm: 'Moon Arena',
    color: '#7b5bd6',
    shadow: '#38217a',
  },
  {
    id: 'gerson-boom',
    name: 'Gerson Boom',
    title: 'Old Rainmaker',
    realm: 'History Shelter',
    color: '#49b642',
    shadow: '#244232',
    sprite: gersonBoomPortraitSprite,
    battleSprite: gersonBoomBattleSprite,
    punchSprite: gersonBoomSpinSprite,
    kickSprite: gersonBoomRightAttackSprite,
    jumpSprite: gersonBoomJumpSprite,
    knockdownSprite: gersonBoomKnockdownSprite,
    defeatSprite: gersonBoomDefeatSprite,
    victorySprites: [gersonBoomVictorySprite],
  },
  {
    id: 'queen',
    name: 'Queen',
    title: 'Cyber Monarch',
    realm: 'Cyber City',
    color: '#6fd2ff',
    shadow: '#3d238f',
    sprite: queenSprite,
    battleSprite: queenBattleSprite,
    walkSprite: queenWalkSprite,
    crouchSprite: queenCrouchSprite,
    crouchPunchSprite: queenUppercutSprite,
    punchSprite: queenPunchSprite,
    kickSprite: queenKickSprite,
    jumpSprite: queenJumpSprite,
    crouchKickSprite: queenSweepSprite,
    specialSprite: queenSpecialSprite,
    knockdownSprite: queenKnockdownPoseSprite,
    healSprite: queenHealSprite,
    defeatSprite: queenKnockdownSprite,
    victorySprites: [queenVictorySprite, queenVictoryBackdropSprite],
  },
  {
    id: 'roaring-knight',
    name: 'Roaring Knight',
    title: 'Dark Fountain',
    realm: 'The Roaring',
    color: '#f8f8ff',
    shadow: '#121218',
    sprite: roaringKnightPortraitSprite,
    battleSprite: roaringKnightSprite,
    kickSprite: roaringKnightSwordShotSprite,
    chargeHoldSprite: roaringKnightChargeHoldSprite,
    chargeReleaseSprite: roaringKnightChargeReleaseSprite,
    blockSprite: roaringKnightBlockSprite,
    knockdownSprite: roaringKnightImpactSprite,
    launchedSprite: roaringKnightImpactSprite,
    defeatSprite: roaringKnightDefeatSprite,
    victorySprites: [roaringKnightVictorySprite],
  },
];

const stages: Stage[] = [
  {
    id: 'tenna-stage',
    name: 'Tenna Stage',
    image: stageTennaArena,
    position: 'center calc(100% + 18px)',
    size: '132% 112%',
    fighterLift: 0,
  },
  {
    id: 'couch-cliffs',
    name: 'Couch Cliffs',
    image: stageCouchCliffs,
    position: 'center calc(50% + 34px)',
    size: '118% auto',
    fighterLift: 55,
  },
  {
    id: 'cold-place',
    name: 'Cold Place',
    image: stageColdPlace,
    position: 'center center',
    size: '118% auto',
    fighterLift: 0,
  },
  {
    id: 'dark-sanctuaries',
    name: 'Dark Sanctuaries',
    image: stageDarkSanctuaries,
    position: 'center center',
    size: '118% auto',
    fighterLift: 0,
  },
  {
    id: 'queens-mansion',
    name: "Queen's Mansion",
    image: stageQueensMansion,
    position: 'center calc(50% + 96px)',
    size: '118% auto',
    fighterLift: 35,
    arenaHeight: 920,
  },
];

const attackSoundVolumes: Record<AttackSoundId, number> = {
  attackPunch: 0.78,
  attackKick: 0.82,
  attackUppercut: 0.9,
  attackSweep: 0.82,
  queenPunch: 0.82,
  queenKick: 0.88,
};

const stageMusic: Partial<Record<string, string>> = {
  'tenna-stage': tennaStageMusic,
  'couch-cliffs': couchCliffsMusic,
  'cold-place': coldPlaceMusic,
  'dark-sanctuaries': darkSanctuariesMusic,
  'queens-mansion': queenMansionMusic,
};

function getStandingPunchHitLevel(fighter: Fighter): HitLevel {
  return fighter.id === 'queen' ? 'mid' : 'high';
}

function getStandingKickHitLevel(fighter: Fighter): HitLevel {
  return fighter.id === 'queen' ? 'high' : 'mid';
}

function canMeleeAttackReachVertical(
  attackerY: number,
  targetY: number,
  effect: HitEffect,
  hitLevel: HitLevel,
) {
  if (targetY <= MELEE_AIRBORNE_GRACE_HEIGHT) return true;
  if (hitLevel === 'low') return false;

  const verticalDistance = Math.abs(targetY - attackerY);
  const verticalReach =
    effect === 'uppercut'
      ? MELEE_UPPERCUT_VERTICAL_REACH
      : hitLevel === 'high'
        ? MELEE_HIGH_VERTICAL_REACH
        : MELEE_MID_VERTICAL_REACH;

  return verticalDistance <= verticalReach;
}

function getProjectileVerticalBounds(projectile: Projectile) {
  const bottom =
    typeof projectile.bottomPx === 'number'
      ? projectile.bottomPx
      : projectile.kind === 'jevil-scythe'
      ? JEVIL_SCYTHE_BOTTOM_PX
      : projectile.kind === 'jevil-chaos-shot'
        ? JEVIL_CHAOS_SHOT_BOTTOM_PX
      : projectile.kind === 'knight-sword'
      ? KNIGHT_SWORD_PROJECTILE_HIGH_BOTTOM_PX
      : projectile.kind === 'queen-wave' && projectile.lane === 'high'
        ? QUEEN_PROJECTILE_HIGH_BOTTOM_PX
        : projectile.lane === 'high'
          ? PROJECTILE_HIGH_BOTTOM_PX
          : PROJECTILE_BASE_BOTTOM_PX;
  const hitbox = PROJECTILE_HITBOX[projectile.kind];

  return {
    bottom,
    top: bottom + hitbox.height,
  };
}

function getFighterProjectileHitboxHeight(fighter: Fighter, isLowProfile: boolean) {
  if (isLowProfile) return FIGHTER_PROJECTILE_HITBOX.crouchHeight;
  if (fighter.id === 'queen') return 190;
  if (fighter.id === 'roaring-knight') return 220;

  return FIGHTER_PROJECTILE_HITBOX.height;
}

function isProjectileTouchingFighter(
  projectile: Projectile,
  target: Position,
  fighter: Fighter,
  isLowProfile: boolean,
  extraHalfWidth = 0,
  visualLift = 0,
) {
  const projectileHitbox = PROJECTILE_HITBOX[projectile.kind];
  const projectileVertical = getProjectileVerticalBounds(projectile);
  const fighterHalfWidth = FIGHTER_PROJECTILE_HITBOX.width / 2 + extraHalfWidth;
  const fighterBottom = FIGHTER_BASE_BOTTOM_PX + target.y + visualLift;
  const fighterTop = fighterBottom + getFighterProjectileHitboxHeight(fighter, isLowProfile);

  if (
    projectile.kind === 'queen-wave' &&
    projectile.lane === 'high' &&
    isLowProfile &&
    target.y <= MELEE_AIRBORNE_GRACE_HEIGHT
  ) {
    return false;
  }

  return (
    Math.abs(projectile.x - target.x) <= projectileHitbox.halfWidth + fighterHalfWidth &&
    projectileVertical.top >= fighterBottom &&
    projectileVertical.bottom <= fighterTop
  );
}

function getKnightSwordProjectileBottom(position: Position, visualLift = 0) {
  return KNIGHT_SWORD_PROJECTILE_HIGH_BOTTOM_PX + position.y + visualLift;
}

function getFighterGravity(
  fighter: Fighter,
  verticalVelocity: number,
  fallbackGravity: number,
  launchedFallStartedAt = 0,
) {
  if (fighter.id !== 'roaring-knight') return fallbackGravity;

  if (verticalVelocity >= 0) return KNIGHT_JUMP_GRAVITY;

  const launchedFallElapsed = launchedFallStartedAt > 0
    ? window.performance.now() - launchedFallStartedAt
    : 0;
  const launchedFallDecay = clamp(
    launchedFallElapsed / KNIGHT_UPPERCUT_SLOW_FALL_DECAY_MS,
    0,
    1,
  );
  const fallGravityMultiplier = launchedFallStartedAt > 0
    ? KNIGHT_FALL_GRAVITY_MULTIPLIER +
      (1 - KNIGHT_FALL_GRAVITY_MULTIPLIER) * launchedFallDecay
    : KNIGHT_FALL_GRAVITY_MULTIPLIER;

  return KNIGHT_JUMP_GRAVITY * fallGravityMultiplier;
}

function getKnightSphereMaxY(stage: Stage) {
  const viewportArenaHeight =
    typeof window === 'undefined'
      ? 0
      : window.innerHeight;
  const arenaHeight = Math.max(stage.arenaHeight ?? 760, viewportArenaHeight);
  const floorLift = stage.fighterLift ?? 0;

  return Math.max(
    0,
    arenaHeight -
      (94 + floorLift + KNIGHT_SPHERE_BOTTOM_OFFSET_PX + KNIGHT_SPHERE_SIZE_PX + KNIGHT_SPHERE_TOP_PADDING_PX),
  );
}

function getArenaPixelHeight(stage: Stage) {
  const viewportArenaHeight =
    typeof window === 'undefined'
      ? 0
      : window.innerHeight;

  return Math.max(stage.arenaHeight ?? 760, viewportArenaHeight);
}

function getFighterMaxY(stage: Stage, fighter: Fighter, visualLift = 0) {
  const arenaHeight = getArenaPixelHeight(stage);
  const floorLift = stage.fighterLift ?? 0;
  const fighterCeilingHeight = (FIGHTER_CEILING_HEIGHT[fighter.id] ?? 320) * FIGHTER_CEILING_SCALE;

  return Math.max(
    0,
    arenaHeight -
      (FIGHTER_BASE_BOTTOM_PX + floorLift + visualLift + fighterCeilingHeight + FIGHTER_CEILING_PADDING_PX),
  );
}

function clampFighterPosition(position: Position, stage: Stage, fighter: Fighter, visualLift = 0): Position {
  return {
    x: clamp(position.x, ARENA_LEFT_LIMIT, ARENA_RIGHT_LIMIT),
    y: clamp(position.y, 0, getFighterMaxY(stage, fighter, visualLift)),
  };
}

function canFighterCrouch(fighter: Fighter) {
  return fighter.id !== 'roaring-knight' && fighter.id !== 'jevil';
}

function isAlwaysCrouchingFighter(fighter: Fighter) {
  return fighter.id === 'gerson-boom';
}

function getFighterJumpPower(fighter: Fighter, fallback = DEFAULT_JUMP_POWER) {
  if (fighter.id === 'roaring-knight') return KNIGHT_JUMP_POWER;
  if (fighter.id === 'jevil') return JEVIL_JUMP_POWER;
  return fallback;
}

function getFighterWalkSpeed(fighter: Fighter, fallback = WALK_SPEED) {
  if (fighter.id === 'jevil') return JEVIL_WALK_SPEED;
  return fallback;
}

function getFighterAttackDuration(fighter: Fighter, attack: Exclude<Attack, 'idle'>) {
  if (fighter.id === 'jevil' && attack === 'kick') return JEVIL_KICK_DURATION_MS;
  return ATTACK_DURATION_MS[attack];
}

function getFighterAttackCooldown(fighter: Fighter, attack: Exclude<Attack, 'idle'>, isCpu = false) {
  if (fighter.id === 'jevil' && attack === 'kick') {
    return isCpu ? CPU_JEVIL_KICK_COOLDOWN_MS : JEVIL_KICK_COOLDOWN_MS;
  }

  return isCpu ? CPU_ATTACK_COOLDOWN_MS : ATTACK_COOLDOWN_MS;
}

function getAttackKnockbackStrength(fighter: Fighter, attack: Exclude<Attack, 'idle'>) {
  if (fighter.id === 'jevil' && attack === 'kick') {
    return (
      JEVIL_KICK_KNOCKBACK_MIN +
      Math.random() * (JEVIL_KICK_KNOCKBACK_MAX - JEVIL_KICK_KNOCKBACK_MIN)
    );
  }

  return ATTACK_KNOCKBACK_VELOCITY;
}

function rollBlockOutcome(fighter: Fighter, isBlocked: boolean): BlockOutcome {
  if (!isBlocked) return 'none';
  if (fighter.id !== 'jevil') return 'normal';

  const roll = Math.random();
  if (roll < 0.3) return 'perfect';
  if (roll < 0.9) return 'normal';
  return 'none';
}

function canBlockLowWithoutCrouch(fighter: Fighter) {
  return fighter.id === 'jevil';
}

function isPointInCampaignRect(position: Position, rect: CampaignRect) {
  return (
    position.x >= rect.x &&
    position.x <= rect.x + rect.width &&
    position.y >= rect.y &&
    position.y <= rect.y + rect.height
  );
}

function getCampaignNpcSize(npc: CampaignNpc) {
  return {
    width: npc.width ?? CAMPAIGN_NPC_DEFAULT_WIDTH,
    height: npc.height ?? CAMPAIGN_NPC_DEFAULT_HEIGHT,
  };
}

function getCampaignNpcHitbox(npc: CampaignNpc) {
  const npcSize = getCampaignNpcSize(npc);
  const npcHitbox = npc.hitbox ?? {
    offsetX: 0,
    offsetY: 0,
    width: npcSize.width,
    height: npcSize.height,
  };
  const centerX = npc.x + npcHitbox.offsetX;
  const centerY = npc.y + npcHitbox.offsetY;

  return {
    left: centerX - npcHitbox.width / 2,
    right: centerX + npcHitbox.width / 2,
    top: centerY - npcHitbox.height / 2,
    bottom: centerY + npcHitbox.height / 2,
  };
}

function doCampaignRectsOverlap(
  first: { left: number; right: number; top: number; bottom: number },
  second: { left: number; right: number; top: number; bottom: number },
) {
  return first.left < second.right && first.right > second.left && first.top < second.bottom && first.bottom > second.top;
}

function isCampaignPlayerTouchingNpcSprite(npc: CampaignNpc, position: Position) {
  return doCampaignRectsOverlap(
    {
      left: position.x - CAMPAIGN_PLAYER_HALF_WIDTH,
      right: position.x + CAMPAIGN_PLAYER_HALF_WIDTH,
      top: position.y - CAMPAIGN_PLAYER_HALF_HEIGHT,
      bottom: position.y + CAMPAIGN_PLAYER_HALF_HEIGHT,
    },
    getCampaignNpcHitbox(npc),
  );
}

function isCampaignPositionAllowed(room: CampaignRoom, position: Position) {
  const playerFootprint = [
    { x: position.x - CAMPAIGN_PLAYER_HALF_WIDTH, y: position.y - CAMPAIGN_PLAYER_HALF_HEIGHT },
    { x: position.x + CAMPAIGN_PLAYER_HALF_WIDTH, y: position.y - CAMPAIGN_PLAYER_HALF_HEIGHT },
    { x: position.x - CAMPAIGN_PLAYER_HALF_WIDTH, y: position.y + CAMPAIGN_PLAYER_HALF_HEIGHT },
    { x: position.x + CAMPAIGN_PLAYER_HALF_WIDTH, y: position.y + CAMPAIGN_PLAYER_HALF_HEIGHT },
    position,
  ];

  const isInsideWalkableArea = playerFootprint.every((point) => room.allowed.some((rect) => isPointInCampaignRect(point, rect)));
  if (!isInsideWalkableArea) return false;

  const isTouchingNpc = (room.npcs ?? []).some((npc) => isCampaignPlayerTouchingNpcSprite(npc, position));

  return !isTouchingNpc;
}

function getCampaignTransition(room: CampaignRoom, position: Position) {
  return room.transitions.find((transition) => isPointInCampaignRect(position, transition.rect));
}

function getCampaignInteraction(room: CampaignRoom, position: Position) {
  const npcInteraction = (room.npcs ?? []).find((npc) => {
    const hitbox = getCampaignNpcHitbox(npc);
    const closestX = clamp(position.x, hitbox.left, hitbox.right);
    const closestY = clamp(position.y, hitbox.top, hitbox.bottom);

    return Math.hypot(closestX - position.x, closestY - position.y) <= CAMPAIGN_INTERACTION_RANGE;
  });
  if (npcInteraction) return npcInteraction;

  return (room.signs ?? []).find((item) => Math.hypot(item.x - position.x, item.y - position.y) <= CAMPAIGN_INTERACTION_RANGE);
}

function getFacingToward(fromX: number, targetX: number): Facing {
  return fromX <= targetX ? 'right' : 'left';
}

const START_POSITION: Position = { x: 12, y: 0 };
const OPPONENT_POSITION: Position = { x: 88, y: 0 };
const ARENA_LEFT_LIMIT = -18;
const ARENA_RIGHT_LIMIT = 118;
const ARENA_VISIBLE_LEFT = 6;
const ARENA_VISIBLE_RIGHT = 94;
const FIGHTER_COLLISION_GAP = 9;
const AIRBORNE_CROSS_LANDING_SPACE = FIGHTER_COLLISION_GAP * 2;
const MAX_HEALTH = 100;
const ATTACK_COOLDOWN_MS = 780;
const CPU_ATTACK_COOLDOWN_MS = 860;
const SPECIAL_COOLDOWN_MS = 900;
const JEVIL_PLATFORM_SPECIAL_COOLDOWN_MS = 2500;
const JEVIL_CHAOS_SPECIAL_COOLDOWN_MS = 1600;
const JEVIL_CHAOS_SPECIAL_MS = 520;
const JEVIL_ABSORB_SPECIAL_COOLDOWN_MS = 2600;
const JEVIL_ABSORB_DURATION_MS = 10000;
const JEVIL_ABSORB_DAMAGE_RETURN_RATIO = 0.8;
const JEVIL_ABSORB_HEAD_MIN_DAMAGE = 15;
const JEVIL_ABSORB_FINALE_LOCK_MS = 1000;
const JEVIL_ABSORB_POST_HEAD_LOCK_MS = 1000;
const JEVIL_HEAD_PROJECTILE_SPEED = 0.72;
const JEVIL_HEAD_PROJECTILE_BOTTOM_OFFSET = 74;
const JEVIL_TELEPORT_SPECIAL_COOLDOWN_MS = 1900;
const JEVIL_TELEPORT_VANISH_MS = 210;
const JEVIL_TELEPORT_FREEZE_MS = 620;
const JEVIL_TELEPORT_SHOOT_POSE_MS = 220;
const JEVIL_TELEPORT_MIN_AIR_Y = 250;
const JEVIL_CHAOS_SHOT_DAMAGE = 6;
const JEVIL_CHAOS_SHOT_KNOCKBACK = 0.65;
const JEVIL_CHAOS_SHOT_SPEED = 0.48;
const JEVIL_CHAOS_SHOT_BOTTOM_PX = 178;
const JEVIL_CHAOS_SHOT_SPAWN_OFFSET_Y = 64;
const JEVIL_SCYTHE_DAMAGE = 7;
const JEVIL_SCYTHE_MAX_TRAVEL = 86;
const JEVIL_SCYTHE_HIT_TICK_MS = 260;
const JEVIL_SCYTHE_SPEED = 0.78;
const JEVIL_SCYTHE_SPAWN_OFFSET = 0;
const JEVIL_SCYTHE_BOTTOM_PX = 128;
const JEVIL_PLATFORM_DURATION_MS = 10000;
const JEVIL_PLATFORM_SPAWN_Y = 226;
const JEVIL_PLATFORM_X_OFFSET = 22;
const JEVIL_PLATFORM_HALF_WIDTH = 20;
const QUEEN_SPECIAL_COOLDOWN_MS = 3000;
const QUEEN_HEAL_COOLDOWN_MS = 6800;
const QUEEN_HEAL_DURATION_MS = 4200;
const QUEEN_HEAL_TICK_MS = 1000;
const QUEEN_HEAL_PER_TICK = 5;
const QUEEN_HEAL_WAVE_DAMAGE = 4;
const QUEEN_HEAL_WAVE_KNOCKBACK = 0.85;
const HEAL_POPUP_MS = 520;
const TENNA_AIR_SPECIAL_COOLDOWN_MS = 2600;
const SPECIAL_INPUT_WINDOW_MS = 420;
const SPECIAL_INPUT_TOTAL_MS = 1600;
const KNIGHT_SPHERE_INPUT_WINDOW_MS = 420;
const KNIGHT_SPHERE_INPUT_TOTAL_MS = 1400;
const KNIGHT_SPHERE_TRANSFORM_MS = 720;
const KNIGHT_SPHERE_SPEED = 0.42;
const KNIGHT_SPHERE_SIZE_PX = 124;
const KNIGHT_SPHERE_BOTTOM_OFFSET_PX = 52;
const KNIGHT_SPHERE_TOP_PADDING_PX = 128;
const KNIGHT_SPHERE_HORIZONTAL_MARGIN = 5;
const KNIGHT_SPHERE_HEALTH_DRAIN = 1;
const KNIGHT_SPHERE_HEALTH_DRAIN_MS = 2000;
const KNIGHT_BIRD_TRANSFORM_MS = 520;
const KNIGHT_BIRD_DASH_SPEED = 1.05;
const KNIGHT_BIRD_DASH_DAMAGE = 8;
const KNIGHT_BIRD_DASH_HIT_RANGE = 22;
const KNIGHT_BIRD_DASH_VERTICAL_RANGE = 70;
const KNIGHT_SWORD_PROJECTILE_COOLDOWN_MS = 720;
const KNIGHT_SWORD_PROJECTILE_SHOOT_MS = 145;
const KNIGHT_SWORD_PROJECTILE_DAMAGE = 5;
const KNIGHT_SWORD_PROJECTILE_KNOCKBACK = 0.85;
const KNIGHT_SWORD_PROJECTILE_SPAWN_OFFSET = 8;
const KNIGHT_DARK_WAVE_INPUT_WINDOW_MS = 360;
const KNIGHT_DARK_WAVE_INPUT_TOTAL_MS = 1200;
const KNIGHT_DARK_WAVE_DAMAGE_PER_SECOND = 1.5;
const KNIGHT_DARK_WAVE_TICK_MS = 100;
const KNIGHT_DARK_WAVE_DAMAGE_RAMP_DELAY_MS = 7000;
const KNIGHT_DARK_WAVE_DAMAGE_RAMP_STEP_MS = 1000;
const KNIGHT_DARK_WAVE_DAMAGE_RAMP_PER_STEP = 1;
const KNIGHT_DARK_WAVE_KNOCKBACK = 0.3;
const KNIGHT_DARK_WAVE_COUNTERWALK_KNOCKBACK_MULTIPLIER = 0.22;
const KNIGHT_DARK_WAVE_COUNTERWALK_MAX_DRIFT = 0.1;
const KNIGHT_DARK_WAVE_RING_INTERVAL_MS = 500;
const KNIGHT_DARK_WAVE_RING_DURATION_MS = 3000;
const KNIGHT_DARK_WAVE_RING_MAX_RANGE = 72;
const KNIGHT_DARK_WAVE_COOLDOWN_MS = 900;
const KNIGHT_DARK_WAVE_OVERHEAT_WARNING_MS = 15000;
const KNIGHT_DARK_WAVE_EXPLODE_MS = 20000;
const KNIGHT_DARK_WAVE_SELF_DAMAGE = 20;
const KNIGHT_DARK_WAVE_EXPLOSION_MS = 1100;
const KNIGHT_SPECIAL_HURTBOX_BONUS = 12;
const KNIGHT_SPECIAL_PROJECTILE_HURTBOX_BONUS = 8;
const SPECIAL_SHOOT_MS = 500;
const TENNA_AIR_SPECIAL_HOLD_MS = 1000;
const TENNA_AIR_SPECIAL_WAVE_MS = 360;
const TENNA_AIR_SPECIAL_DAMAGE = 6;
const TENNA_AIR_SPECIAL_RANGE = 46;
const TENNA_AIR_SPECIAL_VERTICAL_RANGE = 190;
const TENNA_AIR_SPECIAL_KNOCKBACK = 3.25;
const FATALITY_WINDOW_MS = 3500;
const ROUND_CURTAIN_DROP_DELAY_MS = 3000;
const ROUND_CURTAIN_CLOSED_MS = 2000;
const ROUND_CURTAIN_OPEN_MS = 900;
const ROUND_COUNTDOWN_STEP_MS = 1000;
const ROUND_TIME_LIMIT_SECONDS = 60;
const PROJECTILE_DAMAGE = 8;
const QUEEN_PROJECTILE_DAMAGE = 13;
const PROJECTILE_KNOCKBACK_VELOCITY = 1.25;
const QUEEN_PROJECTILE_KNOCKBACK_VELOCITY = 2.15;
const PROJECTILE_KNOCKBACK_FRICTION = 0.9;
const TARGET_FRAME_MS = 1000 / 144;
const MAX_FRAME_DELTA_MS = 50;
const ONLINE_SNAPSHOT_INTERVAL_MS = 1000 / 60;
const ONLINE_RECONCILE_LERP = 0.28;
const ONLINE_RECONCILE_SNAP_DISTANCE = 82;
const CAMPAIGN_MOVE_SPEED = 24;
const CAMPAIGN_INTERACTION_RANGE = 9;
const CAMPAIGN_DIALOGUE_TYPE_INTERVAL_MS = 28;
const CAMPAIGN_PLAYER_HALF_WIDTH = 3.1;
const CAMPAIGN_PLAYER_HALF_HEIGHT = 4.5;
const CAMPAIGN_NPC_DEFAULT_WIDTH = 12;
const CAMPAIGN_NPC_DEFAULT_HEIGHT = 22;
const CAMPAIGN_ROOM_2A_NPC_WALL_Y = 17;
const CAMPAIGN_ROOM_2A_NPC_FLOWER_WALL_Y = 18.1;
const CAMPAIGN_ROOM_2A_NPC_BODY_HITBOX = { offsetX: 0, offsetY: 5.7, width: 14.2, height: 15.6 };
const CAMPAIGN_ROOM_2A_NPC_FLOWER_BODY_HITBOX = { offsetX: 0, offsetY: 7.6, width: 14, height: 13.6 };
const CAMPAIGN_ROOM_2A_NPC_BAG_HITBOX = { offsetX: 0, offsetY: 2.8, width: 15.6, height: 10.8 };
const BAG_BATTLE_PLAYER_START: BagBattleActor = { x: 82, y: 0, vy: 0, health: 100 };
const BAG_BATTLE_BOSS_START: BagBattleActor = { x: 18, y: 0, vy: 0, health: 160 };
const BAG_BATTLE_PLAYER_SPEED = 0.42;
const BAG_BATTLE_JUMP_POWER = 1.45;
const BAG_BATTLE_MAX_JUMPS = 2;
const BAG_BATTLE_GRAVITY = 0.068;
const BAG_BATTLE_BOSS_DAMAGE = 7;
const BAG_BATTLE_ATTACK_COOLDOWN_MS = 340;
const BAG_BATTLE_ATTACK_DURATION_MS = 180;
const BAG_BATTLE_BOSS_SHOT_INTERVAL_MS = 820;
const BAG_BATTLE_BOSS_VULNERABLE_MS = 1050;
const BAG_BATTLE_BOSS_BURST_SHOTS = 5;
const BAG_BATTLE_BOSS_BURST_REST_MS = 4000;
const BAG_BATTLE_BOSS_REST_DAMAGE_CAP = BAG_BATTLE_BOSS_START.health * 0.25;
const BAG_BATTLE_BOSS_RUN_PREP_MS = 3000;
const BAG_BATTLE_BOSS_RUN_SPEED = 0.82;
const BAG_BATTLE_BOSS_RUN_DAMAGE = 18;
const BAG_BATTLE_BOSS_AFTER_RUN_REST_MS = 1200;
const BAG_BATTLE_BOSS_RETURN_START_X = -10;
const BAG_BATTLE_INTRO_MS = 1800;
const CAMPAIGN_BOSS_CUTSCENE_LINES = [
  'Ты уничтожил моего питомца.',
  'Этот мешок был мне дороже, чем тебе кажется. Теперь я должен стереть тебя с дороги.',
  'Но... сделаем иначе. Ты соберешь для меня артефакты боссов.',
  'Принесешь их мне, и я оставлю тебя в живых. Пока что.',
];
const CAMPAIGN_SAVE_STORAGE_KEY = 'deltafight-campaign-saves-v1';
const CAMPAIGN_SAVE_SLOTS = [1, 2, 3] as const;
const CAMPAIGN_START_POSITION: Position = { x: 50, y: 70 };
const CAMPAIGN_ROOMS: Record<CampaignRoomId, CampaignRoom> = {
  room1: {
    id: 'room1',
    title: 'Комната 1',
    allowed: [
      { x: 20, y: 43, width: 58, height: 39 },
      { x: 43, y: 0, width: 15, height: 43 },
    ],
    transitions: [
      { rect: { x: 43, y: 0, width: 15, height: 5 }, target: 'room2', position: { x: 47, y: 94 } },
    ],
  },
  room2: {
    id: 'room2',
    title: 'Комната 2',
    allowed: [
      { x: 14, y: 18, width: 58, height: 62 },
      { x: 36, y: 0, width: 16, height: 18 },
      { x: 39, y: 80, width: 16, height: 20 },
      { x: 0, y: 42, width: 14, height: 14 },
    ],
    transitions: [
      { rect: { x: 36, y: 0, width: 16, height: 5 }, target: 'room2a', position: { x: 43, y: 92 } },
      { rect: { x: 39, y: 95, width: 16, height: 5 }, target: 'room1', position: { x: 50, y: 8 } },
      { rect: { x: 0, y: 42, width: 5, height: 14 }, target: 'side-room', position: { x: 92, y: 49 } },
    ],
  },
  room2a: {
    id: 'room2a',
    title: 'Комната 2A',
    allowed: [
      { x: 4, y: 6, width: 92, height: 74 },
      { x: 28, y: 80, width: 30, height: 20 },
    ],
    transitions: [
      { rect: { x: 28, y: 95, width: 30, height: 5 }, target: 'room2', position: { x: 44, y: 8 } },
    ],
    npcs: [
      {
        id: 'npc-1a',
        label: '1A',
        x: 13,
        y: CAMPAIGN_ROOM_2A_NPC_WALL_Y,
        hitbox: CAMPAIGN_ROOM_2A_NPC_BODY_HITBOX,
        text: '1A: В бою важна дистанция. Подойди ближе для обычных ударов, но не стой вплотную слишком долго: противник может подсечь, ударить сверху или поймать спецприемом.',
        idleSprite: campaignNpcOneAIdleSprite,
        talkSprite: campaignNpcOneATalkSprite,
      },
      {
        id: 'npc-1b',
        label: '1B',
        x: 38,
        y: CAMPAIGN_ROOM_2A_NPC_FLOWER_WALL_Y,
        hitbox: CAMPAIGN_ROOM_2A_NPC_FLOWER_BODY_HITBOX,
        text: '1B: Блок спасает от многих атак, но не от всего. Высокий блок держит удары сверху, а против низких атак лучше вовремя приседать или отходить.',
        idleSprite: campaignNpcOneBIdleSprite,
        talkSprite: campaignNpcOneBTalkSprite,
      },
      {
        id: 'npc-1c',
        label: '1C',
        x: 62,
        y: CAMPAIGN_ROOM_2A_NPC_WALL_Y,
        hitbox: CAMPAIGN_ROOM_2A_NPC_BODY_HITBOX,
        text: '1C: В бою у каждого персонажа есть сильные и слабые стороны. Смотри, как противник двигается, и меняй тактику: иногда лучше атаковать, иногда отступить и переждать.',
        idleSprite: campaignNpcOneCIdleSprite,
        talkSprite: campaignNpcOneCTalkSprite,
      },
      {
        id: 'npc-1d',
        label: '1D',
        x: 84,
        y: CAMPAIGN_ROOM_2A_NPC_WALL_Y,
        hitbox: CAMPAIGN_ROOM_2A_NPC_BODY_HITBOX,
        text: '1D: Спецприемы часто требуют комбинаций кнопок. Если прием не выходит, нажимай команды по порядку и не отпускай нужное направление раньше времени.',
        idleSprite: campaignNpcOneDIdleSprite,
        talkSprite: campaignNpcOneDTalkSprite,
      },
    ],
    signs: [
      { id: 'sign-1', label: '1', x: 44, y: 50, text: 'Табличка 1: пока это тестовая надпись. Здесь можно написать подсказку или сюжет.' },
    ],
  },
  'side-room': {
    id: 'side-room',
    title: 'Боковой проход',
    allowed: [
      { x: 0, y: 40, width: 100, height: 18 },
    ],
    transitions: [
      { rect: { x: 95, y: 40, width: 5, height: 18 }, target: 'room2', position: { x: 8, y: 49 } },
    ],
    npcs: [
      {
        id: 'npc-e1',
        label: 'E1',
        x: 32,
        y: 43,
        width: 15,
        height: 13,
        hitbox: CAMPAIGN_ROOM_2A_NPC_BAG_HITBOX,
        text: '',
        idleSprite: campaignNpcSideBagIdleSprite,
        talkSprite: campaignNpcSideBagTalkSprite,
        talkOffsetY: -18,
        encounter: 'bag-battle',
      },
    ],
  },
};

function getCampaignRoomWithProgress(roomId: CampaignRoomId, isBagDefeated: boolean): CampaignRoom {
  const room = CAMPAIGN_ROOMS[roomId];
  if (!isBagDefeated || roomId !== 'side-room') return room;

  return {
    ...room,
    npcs: room.npcs?.filter((npc) => npc.id !== 'npc-e1'),
  };
}

function createEmptyCampaignSave(slot: number): CampaignSaveData {
  return {
    slot,
    roomId: 'room1',
    position: CAMPAIGN_START_POSITION,
    isBagDefeated: false,
    isBagCollected: false,
    updatedAt: null,
  };
}

function createDefaultCampaignSaves() {
  return CAMPAIGN_SAVE_SLOTS.map((slot) => createEmptyCampaignSave(slot));
}

function readCampaignSaves(): CampaignSaveData[] {
  try {
    const rawSaves = window.localStorage.getItem(CAMPAIGN_SAVE_STORAGE_KEY);
    if (!rawSaves) return createDefaultCampaignSaves();
    const parsed = JSON.parse(rawSaves) as Partial<CampaignSaveData>[];

    return CAMPAIGN_SAVE_SLOTS.map((slot) => {
      const savedSlot = parsed.find((save) => save.slot === slot);
      if (!savedSlot || !savedSlot.updatedAt) return createEmptyCampaignSave(slot);

      return {
        slot,
        roomId: savedSlot.roomId && CAMPAIGN_ROOMS[savedSlot.roomId] ? savedSlot.roomId : 'room1',
        position:
          typeof savedSlot.position?.x === 'number' && typeof savedSlot.position?.y === 'number'
            ? savedSlot.position
            : CAMPAIGN_START_POSITION,
        isBagDefeated: Boolean(savedSlot.isBagDefeated),
        isBagCollected: Boolean(savedSlot.isBagCollected),
        updatedAt: savedSlot.updatedAt,
      };
    });
  } catch {
    return createDefaultCampaignSaves();
  }
}

function writeCampaignSaves(saves: CampaignSaveData[]) {
  try {
    window.localStorage.setItem(CAMPAIGN_SAVE_STORAGE_KEY, JSON.stringify(saves));
  } catch {
    // If storage is blocked, the game still works for the current session.
  }
}

function getCampaignSaveLabel(save: CampaignSaveData) {
  if (!save.updatedAt) return 'Пустое сохранение';
  if (save.isBagCollected) return 'Сделка с боссом';
  if (save.isBagDefeated) return 'Мешок побежден';
  if (save.roomId === 'side-room') return 'Боковой проход';
  if (save.roomId === 'room2a') return 'Комната с подсказками';
  if (save.roomId === 'room2') return 'Комната 2';
  return 'Начало кампании';
}
const PROJECTILE_SPEED = 0.72;
const PROJECTILE_BASE_BOTTOM_PX = 76;
const PROJECTILE_HIGH_BOTTOM_PX = 188;
const QUEEN_PROJECTILE_HIGH_BOTTOM_PX = 160;
const KNIGHT_SWORD_PROJECTILE_HIGH_BOTTOM_PX = 252;
const FIGHTER_BASE_BOTTOM_PX = 94;
const FIGHTER_CEILING_PADDING_PX = 10;
const FIGHTER_CEILING_SCALE = 0.7;
const FIGHTER_CEILING_HEIGHT: Record<Fighter['id'], number> = {
  'mister-ant-tenna': 320,
  queen: 270,
  'roaring-knight': 330,
  'gerson-boom': 395,
  jevil: 260,
  shade: 320,
};
const ATTACK_KNOCKBACK_VELOCITY = 0.92;
const KNIGHT_CHARGE_ATTACK_KNOCKBACK = 2.35;
const ATTACK_HIT_FRAME_RATIO = 0.82;
const CROUCH_HIT_FRAME_RATIO = 0.18;
const MELEE_AIRBORNE_GRACE_HEIGHT = 12;
const MELEE_MID_VERTICAL_REACH = 30;
const MELEE_HIGH_VERTICAL_REACH = 38;
const MELEE_UPPERCUT_VERTICAL_REACH = 88;
const FIGHTER_PROJECTILE_HITBOX = {
  width: 12,
  height: 210,
  crouchHeight: 118,
};
const PROJECTILE_HITBOX: Record<ProjectileKind, { halfWidth: number; height: number }> = {
  'tenna-star': { halfWidth: 4.5, height: 54 },
  'queen-wave': { halfWidth: 6.5, height: 170 },
  'queen-heal-wave': { halfWidth: 7, height: 28 },
  'knight-dark-wave': { halfWidth: 8, height: 120 },
  'knight-sword': { halfWidth: 10.5, height: 42 },
  'jevil-chaos-shot': { halfWidth: 6, height: 54 },
  'jevil-head': { halfWidth: 7, height: 86 },
  'jevil-scythe': { halfWidth: 14, height: 154 },
};
const ATTACK_DURATION_MS: Record<Exclude<Attack, 'idle'>, number> = {
  punch: 240,
  kick: 520,
};
const JEVIL_KICK_DURATION_MS = 320;
const JEVIL_KICK_COOLDOWN_MS = 430;
const CPU_JEVIL_KICK_COOLDOWN_MS = 520;
const JEVIL_KICK_KNOCKBACK_MIN = 0.9;
const JEVIL_KICK_KNOCKBACK_MAX = 1.65;
const CROUCH_UPPERCUT_DURATION_MS = 420;
const CROUCH_UPPERCUT_RECOVERY_MS = 1000;
const UPPERCUT_KNOCKBACK = 2.25;
const SWEEP_KNOCKDOWN_MS = 2000;
const UPPERCUT_LANDING_KNOCKDOWN_MS = 1000;
const KNOCKDOWN_RECOVERY_MS = 360;
const WALK_SPEED = 0.2;
const JEVIL_WALK_SPEED = 0.29;
const DEFAULT_JUMP_POWER = 10.2;
const DEFAULT_JUMP_GRAVITY = 0.28;
const JEVIL_JUMP_POWER = 12.2;
const GERSON_LANDING_HIT_RANGE = 26;
const GERSON_LANDING_DIRECT_HIT_RANGE = 10;
const GERSON_LANDING_VERTICAL_HIT_RANGE = 120;
const GERSON_LANDING_DAMAGE = 3;
const GERSON_LANDING_DIRECT_DAMAGE = 5;
const GERSON_LEAP_DIRECT_DAMAGE_MULTIPLIER = 2;
const GERSON_LANDING_IMMUNITY_MS = 420;
const GERSON_AIR_COUNTER_HIDE_DELAY_MS = 3000;
const GERSON_LANDING_BOUNCE_POWER = 12.2;
const GERSON_LANDING_BOUNCE_START_Y = 24;
const GERSON_SIDE_BOUNCE_AFTER_AIR_HITS = 4;
const GERSON_RANDOM_SIDE_BOUNCE_AFTER_AIR_HITS = 5;
const GERSON_SIDE_BOUNCE_VELOCITY = 1.15;
const GERSON_SIDE_BOUNCE_START_X = 2.5;
const GERSON_BLOCKED_BOUNCE_KNOCKBACK_MULTIPLIER = 2.2;
const GERSON_CHAIN_SIDE_BOUNCE_RAMP_AFTER_HITS = 10;
const GERSON_CHAIN_SIDE_BOUNCE_RAMP_INTERVAL_HITS = 3;
const GERSON_CHAIN_SIDE_BOUNCE_RAMP_PER_HIT = 0.25;
const GERSON_CPU_STOMP_JUMP_RANGE = 42;
const GERSON_CPU_STOMP_JUMP_CHANCE = 0.82;
const GERSON_PARRY_HIT_FRAME_RATIO = 0.38;
const GERSON_PARRY_PROJECTILE_RANGE = 52;
const GERSON_PARRY_MELEE_RANGE = 24;
const GERSON_PARRY_MELEE_DAMAGE = 4;
const GERSON_PARRY_DURATION_MS = 760;
const CPU_GERSON_PARRY_PROJECTILE_HIT_MS = 90;
const GERSON_SPIN_MAX_HOLD_MS = 5000;
const GERSON_SPIN_DAMAGE_INTERVAL_MS = 260;
const GERSON_SPIN_DAMAGE = 1;
const GERSON_SPIN_RANGE = 29;
const GERSON_LEAP_JUMP_POWER = DEFAULT_JUMP_POWER * 2;
const GERSON_LEAP_DASH_VELOCITY = 4.6;
const GERSON_LEAP_DASH_START_X = 9;
const GERSON_LEAP_PREP_MS = 1000;
const KNIGHT_JUMP_POWER = 8.4;
const KNIGHT_JUMP_GRAVITY = 0.17;
const KNIGHT_FALL_GRAVITY_MULTIPLIER = 1 / 30;
const KNIGHT_UPPERCUT_SLOW_FALL_DECAY_MS = 1800;
const KNIGHT_CHARGE_BASE_DAMAGE = 5;
const KNIGHT_CHARGE_DAMAGE_PER_SECOND = 5;
const KNIGHT_CHARGE_MAX_DAMAGE = 35;
const KNIGHT_CHARGE_RELEASE_MS = 1360;
const KNIGHT_CHARGE_AURA_DELAY_MS = 4000;
const KNIGHT_CHARGE_RANGE = 32;
const KNIGHT_BLOCK_STARTUP_MS = 360;
const CONTROL_BINDINGS_STORAGE_KEY = 'deltafight-control-bindings';
const DEFAULT_CONTROL_BINDINGS: Record<GameInput, string> = {
  w: 'KeyW',
  a: 'KeyA',
  s: 'KeyS',
  d: 'KeyD',
  arrowleft: 'ArrowLeft',
  arrowright: 'ArrowRight',
  arrowdown: 'ArrowDown',
  arrowup: 'ArrowUp',
  block: 'ShiftRight',
};
const CONTROL_BINDING_LABELS: Array<{ action: GameInput; label: string }> = [
  { action: 'w', label: 'Прыжок / вверх' },
  { action: 'a', label: 'Идти влево' },
  { action: 's', label: 'Присесть / вниз' },
  { action: 'd', label: 'Идти вправо' },
  { action: 'arrowleft', label: 'Удар1' },
  { action: 'arrowright', label: 'Удар2' },
  { action: 'arrowdown', label: 'Комбо вниз' },
  { action: 'arrowup', label: 'Комбо вверх' },
  { action: 'block', label: 'Блок' },
];
const AI_CONFIG: Record<
  Difficulty,
  {
    label: string;
    moveSpeed: number;
    thinkMs: number;
    attackChance: number;
    blockChance: number;
    jumpChance: number;
    crouchChance: number;
    specialChance: number;
    preferredRange: number;
  }
> = {
  easy: {
    label: 'Easy',
    moveSpeed: WALK_SPEED,
    thinkMs: 900,
    attackChance: 0.38,
    blockChance: 0.18,
    jumpChance: 0.08,
    crouchChance: 0.12,
    specialChance: 0.18,
    preferredRange: 22,
  },
  normal: {
    label: 'Normal',
    moveSpeed: WALK_SPEED,
    thinkMs: 650,
    attackChance: 0.58,
    blockChance: 0.36,
    jumpChance: 0.12,
    crouchChance: 0.22,
    specialChance: 0.3,
    preferredRange: 19,
  },
  hard: {
    label: 'Hard',
    moveSpeed: WALK_SPEED,
    thinkMs: 430,
    attackChance: 0.78,
    blockChance: 0.58,
    jumpChance: 0.16,
    crouchChance: 0.32,
    specialChance: 0.42,
    preferredRange: 17,
  },
};

function createAiLearningMemory(): AiLearningMemory {
  return {
    player: {
      total: 0,
      high: 0,
      low: 0,
      mid: 0,
      projectile: 0,
      special: 0,
      jump: 0,
      crouch: 0,
      block: 0,
      air: 0,
      close: 0,
      far: 0,
    },
    outcomes: {
      melee: { success: 1, fail: 1 },
      low: { success: 1, fail: 1 },
      antiHigh: { success: 1, fail: 1 },
      block: { success: 1, fail: 1 },
      crouch: { success: 1, fail: 1 },
      jump: { success: 1, fail: 1 },
      special: { success: 1, fail: 1 },
      heal: { success: 1, fail: 1 },
      sphere: { success: 1, fail: 1 },
      charge: { success: 1, fail: 1 },
      projectile: { success: 1, fail: 1 },
      airSpecial: { success: 1, fail: 1 },
      bird: { success: 1, fail: 1 },
    },
  };
}

function loadControlBindings(): Record<GameInput, string> {
  if (typeof window === 'undefined') return DEFAULT_CONTROL_BINDINGS;

  try {
    const saved = window.localStorage.getItem(CONTROL_BINDINGS_STORAGE_KEY);
    if (!saved) return DEFAULT_CONTROL_BINDINGS;

    const parsed = JSON.parse(saved) as Partial<Record<GameInput, string>>;
    return {
      ...DEFAULT_CONTROL_BINDINGS,
      ...Object.fromEntries(
        (Object.keys(DEFAULT_CONTROL_BINDINGS) as GameInput[])
          .map((action) => [action, parsed[action]])
          .filter((entry): entry is [GameInput, string] => typeof entry[1] === 'string' && entry[1].length > 0),
      ),
    };
  } catch {
    return DEFAULT_CONTROL_BINDINGS;
  }
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('title');
  const [showTitleInfo, setShowTitleInfo] = useState(false);
  const [doorTransitionMode, setDoorTransitionMode] = useState<ArenaMode | null>(null);
  const [isScreenRevealing, setIsScreenRevealing] = useState(false);
  const [selectedFighterId, setSelectedFighterId] = useState(fighters[0].id);
  const [selectedOpponentId, setSelectedOpponentId] = useState(fighters[4].id);
  const [selectTarget, setSelectTarget] = useState<SelectTarget>('player');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('normal');
  const [selectedStageId, setSelectedStageId] = useState(stages[0].id);
  const [arenaMode, setArenaMode] = useState<ArenaMode>('fight');
  const [campaignRoomId, setCampaignRoomId] = useState<CampaignRoomId>('room1');
  const [campaignPosition, setCampaignPosition] = useState<Position>(CAMPAIGN_START_POSITION);
  const [campaignDialogue, setCampaignDialogue] = useState<string | null>(null);
  const [campaignDialogueVisibleChars, setCampaignDialogueVisibleChars] = useState(0);
  const [campaignActiveNpcId, setCampaignActiveNpcId] = useState<string | null>(null);
  const [isCampaignMenuOpen, setIsCampaignMenuOpen] = useState(false);
  const [isCampaignBagDefeated, setIsCampaignBagDefeated] = useState(false);
  const [isCampaignBagCollected, setIsCampaignBagCollected] = useState(false);
  const [campaignBossCutsceneStep, setCampaignBossCutsceneStep] = useState<number | null>(null);
  const [campaignBossCutscenePhase, setCampaignBossCutscenePhase] =
    useState<CampaignBossCutscenePhase>('talking');
  const [campaignSaves, setCampaignSaves] = useState<CampaignSaveData[]>(readCampaignSaves);
  const [selectedCampaignSaveSlot, setSelectedCampaignSaveSlot] = useState<number | null>(null);
  const [bagBattlePlayer, setBagBattlePlayer] = useState<BagBattleActor>(BAG_BATTLE_PLAYER_START);
  const [bagBattleBoss, setBagBattleBoss] = useState<BagBattleActor>(BAG_BATTLE_BOSS_START);
  const [bagBattleProjectiles, setBagBattleProjectiles] = useState<BagBattleProjectile[]>([]);
  const [bagBattleResult, setBagBattleResult] = useState<'playing' | 'won' | 'lost'>('playing');
  const [bagBattleAttack, setBagBattleAttack] = useState<BagBattleAttack>('idle');
  const [isBagBattleCrouching, setIsBagBattleCrouching] = useState(false);
  const [isBagBattleBlocking, setIsBagBattleBlocking] = useState(false);
  const [isBagBattleBossVulnerable, setIsBagBattleBossVulnerable] = useState(false);
  const [isBagBattleBossShooting, setIsBagBattleBossShooting] = useState(false);
  const [bagBattleBossShotLane, setBagBattleBossShotLane] = useState<BagBattleProjectile['lane']>('mid');
  const [bagBattleBossPattern, setBagBattleBossPattern] = useState<BagBattleBossPattern>('shooting');
  const [isBagBattleIntro, setIsBagBattleIntro] = useState(false);
  const [roomCode, setRoomCode] = useState('');
  const [joinRoomCode, setJoinRoomCode] = useState('');
  const [onlineRole, setOnlineRole] = useState<OnlineRole | null>(null);
  const [onlineRoomStatus, setOnlineRoomStatus] = useState<OnlineRoomStatus>('idle');
  const [onlineRoomMessage, setOnlineRoomMessage] = useState('Создай комнату или введи код друга.');
  const [onlinePeerReady, setOnlinePeerReady] = useState(false);
  const [lockedFighter, setLockedFighter] = useState<Fighter | null>(null);
  const [lockedOpponent, setLockedOpponent] = useState<Fighter | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [controlBindings, setControlBindings] = useState<Record<GameInput, string>>(() => loadControlBindings());
  const [rebindingAction, setRebindingAction] = useState<GameInput | null>(null);
  const [controlsSettingsOpen, setControlsSettingsOpen] = useState(false);
  const [effectsVolume, setEffectsVolume] = useState(0.85);
  const [musicVolume, setMusicVolume] = useState(0.55);
  const isArenaPaused = screen === 'arena' && settingsOpen;
  const [playerPosition, setPlayerPosition] = useState(START_POSITION);
  const [opponentPosition, setOpponentPosition] = useState(OPPONENT_POSITION);
  const [playerStatus, setPlayerStatus] = useState<OpponentStatus>('idle');
  const [opponentStatus, setOpponentStatus] = useState<OpponentStatus>('idle');
  const [playerRecovering, setPlayerRecovering] = useState(false);
  const [opponentRecovering, setOpponentRecovering] = useState(false);
  const [attack, setAttack] = useState<Attack>('idle');
  const [opponentAttack, setOpponentAttack] = useState<Attack>('idle');
  const [opponentBlocking, setOpponentBlocking] = useState(false);
  const [opponentCrouching, setOpponentCrouching] = useState(false);
  const [playerSpecialShooting, setPlayerSpecialShooting] = useState(false);
  const [opponentSpecialShooting, setOpponentSpecialShooting] = useState(false);
  const [playerSpecialSpriteOverride, setPlayerSpecialSpriteOverride] = useState<string | null>(null);
  const [opponentSpecialSpriteOverride, setOpponentSpecialSpriteOverride] = useState<string | null>(null);
  const [playerJevilAbsorbing, setPlayerJevilAbsorbing] = useState(false);
  const [opponentJevilAbsorbing, setOpponentJevilAbsorbing] = useState(false);
  const [playerJevilHeadlessPose, setPlayerJevilHeadlessPose] = useState(false);
  const [opponentJevilHeadlessPose, setOpponentJevilHeadlessPose] = useState(false);
  const [playerAirSpecialWave, setPlayerAirSpecialWave] = useState(false);
  const [opponentAirSpecialWave, setOpponentAirSpecialWave] = useState(false);
  const [isCrouching, setIsCrouching] = useState(false);
  const [isCrouchAttackLocked, setIsCrouchAttackLocked] = useState(false);
  const [isBlocking, setIsBlocking] = useState(false);
  const [playerHealth, setPlayerHealth] = useState(MAX_HEALTH);
  const [opponentHealth, setOpponentHealth] = useState(MAX_HEALTH);
  const [playerGersonAirLandingHits, setPlayerGersonAirLandingHits] = useState(0);
  const [opponentGersonAirLandingHits, setOpponentGersonAirLandingHits] = useState(0);
  const [playerGersonLeapActive, setPlayerGersonLeapActive] = useState(false);
  const [playerGersonLeapPreparing, setPlayerGersonLeapPreparing] = useState(false);
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  const [healPopups, setHealPopups] = useState<HealPopup[]>([]);
  const [jevilPlatforms, setJevilPlatforms] = useState<JevilPlatform[]>([]);
  const [knightAfterimages, setKnightAfterimages] = useState<KnightAfterimage[]>([]);
  const [knightVisualLift, setKnightVisualLift] = useState(0);
  const [winnerSide, setWinnerSide] = useState<FighterSide>('left');
  const [playerDamageFlash, setPlayerDamageFlash] = useState(false);
  const [opponentDamageFlash, setOpponentDamageFlash] = useState(false);
  const [roundNumber, setRoundNumber] = useState(1);
  const [playerRoundWins, setPlayerRoundWins] = useState(0);
  const [opponentRoundWins, setOpponentRoundWins] = useState(0);
  const [roundWinnerPoseSprite, setRoundWinnerPoseSprite] = useState<string | null>(null);
  const [roundCurtainPhase, setRoundCurtainPhase] = useState<RoundCurtainPhase>('idle');
  const [roundCountdown, setRoundCountdown] = useState(3);
  const [roundTimeLeft, setRoundTimeLeft] = useState(ROUND_TIME_LIMIT_SECONDS);
  const [playerChargeAttackState, setPlayerChargeAttackState] = useState<ChargeAttackState>('idle');
  const [playerChargeAuraActive, setPlayerChargeAuraActive] = useState(false);
  const [opponentChargeAttackState, setOpponentChargeAttackState] = useState<ChargeAttackState>('idle');
  const [opponentChargeAuraActive, setOpponentChargeAuraActive] = useState(false);
  const [playerKnightSpherePhase, setPlayerKnightSpherePhase] = useState<KnightSpherePhase>('idle');
  const [playerKnightDarkWaveState, setPlayerKnightDarkWaveState] = useState<KnightDarkWaveState>('idle');
  const [playerKnightDarkWaveDirection, setPlayerKnightDarkWaveDirection] = useState<-1 | 1>(1);
  const [playerKnightDarkWaveOverheated, setPlayerKnightDarkWaveOverheated] = useState(false);
  const [opponentKnightSpherePhase, setOpponentKnightSpherePhase] = useState<KnightSpherePhase>('idle');
  const [opponentKnightDarkWaveState, setOpponentKnightDarkWaveState] = useState<KnightDarkWaveState>('idle');
  const [opponentKnightDarkWaveOverheated, setOpponentKnightDarkWaveOverheated] = useState(false);
  const [knightExplosions, setKnightExplosions] = useState<KnightExplosion[]>([]);
  const [gersonLeapEffects, setGersonLeapEffects] = useState<GersonLeapEffect[]>([]);

  const playerSpecialShootingRef = useRef(false);
  const opponentSpecialShootingRef = useRef(false);
  const playerSpecialSpriteOverrideRef = useRef<string | null>(null);
  const opponentSpecialSpriteOverrideRef = useRef<string | null>(null);
  const playerAirSpecialWaveRef = useRef(false);
  const opponentAirSpecialWaveRef = useRef(false);
  const playerChargeAuraActiveRef = useRef(false);
  const opponentChargeAuraActiveRef = useRef(false);
  const playerKnightDarkWaveOverheatedRef = useRef(false);
  const opponentKnightDarkWaveOverheatedRef = useRef(false);
  const playerJevilAbsorbingRef = useRef(false);
  const opponentJevilAbsorbingRef = useRef(false);
  const playerJevilHeadlessPoseRef = useRef(false);
  const opponentJevilHeadlessPoseRef = useRef(false);

  const attackTimer = useRef<number | null>(null);
  const attackHitTimer = useRef<number | null>(null);
  const opponentAttackTimer = useRef<number | null>(null);
  const opponentAttackHitTimer = useRef<number | null>(null);
  const opponentAttackInterval = useRef<number | null>(null);
  const opponentStatusTimer = useRef<number | null>(null);
  const playerStatusTimer = useRef<number | null>(null);
  const playerDamageFlashTimer = useRef<number | null>(null);
  const opponentDamageFlashTimer = useRef<number | null>(null);
  const playerGersonSpinDamageTimer = useRef<number | null>(null);
  const playerGersonSpinMaxTimer = useRef<number | null>(null);
  const playerRecoveryTimer = useRef<number | null>(null);
  const opponentRecoveryTimer = useRef<number | null>(null);
  const opponentCrouchTimer = useRef<number | null>(null);
  const victoryTimer = useRef<number | null>(null);
  const roundTransitionTimer = useRef<number | null>(null);
  const roundCurtainTimer = useRef<number | null>(null);
  const countdownTimer = useRef<number | null>(null);
  const roundClockTimer = useRef<number | null>(null);
  const doorTransitionTimer = useRef<number | null>(null);
  const screenRevealTimer = useRef<number | null>(null);
  const knightAfterimageTimer = useRef<number | null>(null);
  const attackReadyAt = useRef(0);
  const opponentAttackReadyAt = useRef(0);
  const specialReadyAt = useRef(0);
  const specialInputStep = useRef(0);
  const specialInputBuffer = useRef<string[]>([]);
  const specialInputExpiresAt = useRef(0);
  const specialInputStartedAt = useRef(0);
  const specialInputMove = useRef<PlayerSpecialMove | null>(null);
  const knightSphereInputStep = useRef(0);
  const knightSphereInputExpiresAt = useRef(0);
  const knightSphereInputStartedAt = useRef(0);
  const knightDarkWaveInputStep = useRef(0);
  const knightDarkWaveInputExpiresAt = useRef(0);
  const knightDarkWaveInputStartedAt = useRef(0);
  const knightSpherePhaseRef = useRef<KnightSpherePhase>('idle');
  const opponentKnightSpherePhaseRef = useRef<KnightSpherePhase>('idle');
  const opponentSpecialReadyAt = useRef(0);
  const attackRef = useRef<Attack>('idle');
  const playerSpecialLockRef = useRef(false);
  const opponentSpecialLockRef = useRef(false);
  const playerSpecialTimer = useRef<number | null>(null);
  const playerChargeAttackStartedAt = useRef(0);
  const playerChargeReleaseStartedAt = useRef(0);
  const playerChargeAttackStateRef = useRef<ChargeAttackState>('idle');
  const playerChargeAttackTimer = useRef<number | null>(null);
  const playerChargeDamageTimer = useRef<number | null>(null);
  const playerChargeAuraTimer = useRef<number | null>(null);
  const playerKnightDarkWaveStateRef = useRef<KnightDarkWaveState>('idle');
  const playerKnightDarkWaveStartedAt = useRef(0);
  const playerKnightDarkWaveDirectionRef = useRef<-1 | 1>(1);
  const playerKnightDarkWaveTimer = useRef<number | null>(null);
  const opponentInsidePlayerKnightDarkWaveStartedAt = useRef(0);
  const playerJevilAbsorbActiveRef = useRef(false);
  const playerJevilAbsorbDamageRef = useRef(0);
  const playerJevilAbsorbEndsAtRef = useRef(0);
  const playerJevilAbsorbFinaleStartedRef = useRef(false);
  const playerJevilAbsorbRecoverUntilRef = useRef(0);
  const opponentChargeAttackStartedAt = useRef(0);
  const opponentChargeReleaseStartedAt = useRef(0);
  const opponentChargeAttackStateRef = useRef<ChargeAttackState>('idle');
  const opponentChargeAttackTimer = useRef<number | null>(null);
  const opponentChargeDamageTimer = useRef<number | null>(null);
  const opponentChargeAuraTimer = useRef<number | null>(null);
  const opponentKnightDarkWaveStateRef = useRef<KnightDarkWaveState>('idle');
  const opponentKnightDarkWaveStartedAt = useRef(0);
  const opponentKnightDarkWaveDirectionRef = useRef<-1 | 1>(-1);
  const opponentKnightDarkWaveTimer = useRef<number | null>(null);
  const playerInsideOpponentKnightDarkWaveStartedAt = useRef(0);
  const opponentJevilAbsorbActiveRef = useRef(false);
  const opponentJevilAbsorbDamageRef = useRef(0);
  const opponentJevilAbsorbEndsAtRef = useRef(0);
  const opponentJevilAbsorbFinaleStartedRef = useRef(false);
  const opponentJevilAbsorbRecoverUntilRef = useRef(0);
  const playerKnightSphereTimer = useRef<number | null>(null);
  const playerKnightSphereDrainInterval = useRef<number | null>(null);
  const playerKnightBirdDashDirection = useRef<-1 | 1>(1);
  const playerKnightBirdDashHitRef = useRef(false);
  const playerKnightSpherePhaseStartedAt = useRef(0);
  const opponentKnightSphereTimer = useRef<number | null>(null);
  const opponentKnightSphereDrainInterval = useRef<number | null>(null);
  const opponentKnightBirdDashDirection = useRef<-1 | 1>(-1);
  const opponentKnightBirdDashHitRef = useRef(false);
  const opponentKnightSpherePhaseStartedAt = useRef(0);
  const opponentKnightSpherePlanRef = useRef<OpponentKnightSpherePlan>('none');
  const opponentKnightSphereExitFollowupRef = useRef<Exclude<OpponentKnightSpherePlan, 'none' | 'bird'> | null>(null);
  const knightExplosionIdRef = useRef(1);
  const knightExplosionTimers = useRef<number[]>([]);
  const playerAttackStartedAt = useRef(0);
  const opponentAttackStartedAt = useRef(0);
  const playerAttackFacingRef = useRef<Facing | null>(null);
  const opponentAttackFacingRef = useRef<Facing | null>(null);
  const playerStatusStartedAt = useRef(0);
  const opponentStatusStartedAt = useRef(0);
  const playerLaunchedFallStartedAt = useRef(0);
  const opponentLaunchedFallStartedAt = useRef(0);
  const opponentSpecialTimer = useRef<number | null>(null);
  const playerSpecialSpawnTimer = useRef<number | null>(null);
  const opponentSpecialSpawnTimer = useRef<number | null>(null);
  const playerAirSpecialWaveTimer = useRef<number | null>(null);
  const opponentAirSpecialWaveTimer = useRef<number | null>(null);
  const playerHealTimer = useRef<number | null>(null);
  const playerHealInterval = useRef<number | null>(null);
  const opponentHealTimer = useRef<number | null>(null);
  const opponentHealInterval = useRef<number | null>(null);
  const opponentAttackRef = useRef<Attack>('idle');
  const opponentBlockingRef = useRef(false);
  const opponentCrouchingRef = useRef(false);
  const opponentBlockTimer = useRef<number | null>(null);
  const aiLearningRef = useRef<AiLearningMemory>(createAiLearningMemory());
  const pendingOpponentActionRef = useRef<AiAction | null>(null);
  const botCoachAdviceRef = useRef<BotCoachAdvice>(DEFAULT_BOT_COACH_ADVICE);
  const botCoachRequestInFlightRef = useRef(false);
  const playerBlockHeldRef = useRef(false);
  const playerBlockStartupRef = useRef(false);
  const playerBlockStartupTimer = useRef<number | null>(null);
  const playerBlockStartedAt = useRef(0);
  const opponentBlockStartedAt = useRef(0);
  const playerHealthRef = useRef(MAX_HEALTH);
  const opponentHealthRef = useRef(MAX_HEALTH);
  const playerGersonLandingImmuneUntilRef = useRef(0);
  const opponentGersonLandingImmuneUntilRef = useRef(0);
  const playerGersonAirLandingHitsRef = useRef(0);
  const opponentGersonAirLandingHitsRef = useRef(0);
  const playerGersonLeapDirectBoostReadyRef = useRef(false);
  const opponentGersonAirStompChainRef = useRef(false);
  const playerGersonAirCounterHideTimer = useRef<number | null>(null);
  const opponentGersonAirCounterHideTimer = useRef<number | null>(null);
  const playerGersonLeapPrepTimer = useRef<number | null>(null);
  const gersonLeapEffectIdRef = useRef(1);
  const opponentPositionRef = useRef(OPPONENT_POSITION);
  const playerStatusRef = useRef<OpponentStatus>('idle');
  const opponentStatusRef = useRef<OpponentStatus>('idle');
  const opponentJumpVelocity = useRef(0);
  const isBlockingRef = useRef(false);
  const pressedKeys = useRef(new Set<string>());
  const campaignPressedKeys = useRef(new Set<string>());
  const campaignPositionRef = useRef<Position>(CAMPAIGN_START_POSITION);
  const bagBattlePressedKeys = useRef(new Set<string>());
  const bagBattlePlayerRef = useRef<BagBattleActor>(BAG_BATTLE_PLAYER_START);
  const bagBattleBossRef = useRef<BagBattleActor>(BAG_BATTLE_BOSS_START);
  const bagBattleProjectilesRef = useRef<BagBattleProjectile[]>([]);
  const bagBattleProjectileIdRef = useRef(0);
  const bagBattleAttackReadyAtRef = useRef(0);
  const bagBattleAttackTimer = useRef<number | null>(null);
  const bagBattleLastBossShotRef = useRef(0);
  const bagBattleBossVulnerableUntilRef = useRef(0);
  const bagBattleBossShootingTimer = useRef<number | null>(null);
  const bagBattleBossBurstShotsRef = useRef(0);
  const bagBattleBossRestUntilRef = useRef(0);
  const bagBattleBossRestDamageRef = useRef(0);
  const bagBattleBossPatternRef = useRef<BagBattleBossPattern>('shooting');
  const bagBattleBossRunPrepUntilRef = useRef(0);
  const bagBattleBossRunHitRef = useRef(false);
  const bagBattleBossNextPatternRef = useRef<BagBattleBossPattern>('shooting');
  const bagBattleJumpsRemainingRef = useRef(BAG_BATTLE_MAX_JUMPS);
  const bagBattleIntroUntilRef = useRef(0);
  const remotePressedKeys = useRef(new Set<string>());
  const onlineChannelRef = useRef<RealtimeChannel | null>(null);
  const onlinePlayerIdRef = useRef(`p-${Math.random().toString(36).slice(2, 10)}`);
  const onlineRoleRef = useRef<OnlineRole | null>(null);
  const onlineRoomStatusRef = useRef<OnlineRoomStatus>('idle');
  const lastOnlineSnapshotAt = useRef(0);
  const onlineInputSequenceRef = useRef(0);
  const onlineSnapshotSequenceRef = useRef(0);
  const lastRemoteInputSequenceRef = useRef(0);
  const lastAppliedOnlineSnapshotRef = useRef(0);
  const jumpVelocity = useRef(0);
  const playerAirSpecialActiveRef = useRef(false);
  const playerAirSpecialYRef = useRef(0);
  const opponentAirSpecialActiveRef = useRef(false);
  const opponentAirSpecialYRef = useRef(0);
  const playerKnockbackVelocity = useRef(0);
  const opponentKnockbackVelocity = useRef(0);
  const positionRef = useRef(START_POSITION);
  const knightVisualLiftRef = useRef(0);
  const projectilesRef = useRef<Projectile[]>([]);
  const projectileIdRef = useRef(1);
  const jevilPlatformsRef = useRef<JevilPlatform[]>([]);
  const jevilPlatformOwnerRef = useRef<FighterSide | null>(null);
  const jevilPlatformIdRef = useRef(1);
  const healPopupIdRef = useRef(1);
  const knightAfterimageIdRef = useRef(1);
  const lastKnightAfterimagePositionRef = useRef<Record<FighterSide, Position | null>>({
    left: null,
    right: null,
  });
  const roundResolvedRef = useRef(false);
  const roundCountdownRef = useRef(3);
  const roundTimeLeftRef = useRef(ROUND_TIME_LIMIT_SECONDS);
  const isArenaPausedRef = useRef(false);
  const arenaPauseStartedAtRef = useRef(0);
  const animationFrame = useRef<number | null>(null);
  const lastFrameTimeRef = useRef(0);
  const selectSoundRef = useRef<HTMLAudioElement | null>(null);
  const fightStartSoundRef = useRef<HTMLAudioElement | null>(null);
  const tennaAirWaveSoundRef = useRef<HTMLAudioElement | null>(null);
  const queenHealSoundRef = useRef<HTMLAudioElement | null>(null);
  const queenCupThrowSoundRef = useRef<HTMLAudioElement | null>(null);
  const projectileHitSoundRef = useRef<HTMLAudioElement | null>(null);
  const knightSwordProjectileSoundRef = useRef<HTMLAudioElement | null>(null);
  const knightSwordSlashSoundRef = useRef<HTMLAudioElement | null>(null);
  const roaringKnightRoarSoundRef = useRef<HTMLAudioElement | null>(null);
  const knightSphereTransformSoundRef = useRef<HTMLAudioElement | null>(null);
  const knightBirdDriveSoundRef = useRef<HTMLAudioElement | null>(null);
  const knightBirdHitSoundRef = useRef<HTMLAudioElement | null>(null);
  const gersonJumpHitSoundRef = useRef<HTMLAudioElement | null>(null);
  const gersonBounceSoundRef = useRef<HTMLAudioElement | null>(null);
  const tennaStarSpecialSoundRef = useRef<HTMLAudioElement | null>(null);
  const doorHoverSoundRef = useRef<HTMLAudioElement | null>(null);
  const doorClickSoundRef = useRef<HTMLAudioElement | null>(null);
  const stageMusicRef = useRef<HTMLAudioElement | null>(null);
  const attackSoundRefs = useRef<Record<AttackSoundId, HTMLAudioElement | null>>({
    attackPunch: null,
    attackKick: null,
    attackUppercut: null,
    attackSweep: null,
    queenPunch: null,
    queenKick: null,
  });
  const jevilVoiceSoundRefs = useRef<Record<JevilVoiceSoundId, HTMLAudioElement | null>>(
    createEmptyJevilVoiceSoundRefs(),
  );
  const lastJevilVoiceSoundIdRef = useRef<JevilVoiceSoundId | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const soundBuffersRef = useRef<Partial<Record<BufferedSoundId, AudioBuffer>>>({});
  const countdownSoundRefs = useRef<Record<1 | 2 | 3, HTMLAudioElement | null>>({
    1: null,
    2: null,
    3: null,
  });

  useEffect(() => {
    window.localStorage.setItem(CONTROL_BINDINGS_STORAGE_KEY, JSON.stringify(controlBindings));
  }, [controlBindings]);

  useEffect(() => {
    if (!settingsOpen) {
      setRebindingAction(null);
      setControlsSettingsOpen(false);
    }
  }, [settingsOpen]);

  useEffect(() => {
    let isMounted = true;
    const createFallbackAudio = (src: string, volume: number) => {
      const audio = new Audio(src);
      audio.volume = volume;
      audio.preload = 'auto';
      audio.load();
      return audio;
    };

    selectSoundRef.current = createFallbackAudio(selectSound, 0.75);
    fightStartSoundRef.current = createFallbackAudio(fightStartSound, 0.8);
    tennaAirWaveSoundRef.current = createFallbackAudio(tennaAirWaveSound, 0.9);
    queenHealSoundRef.current = createFallbackAudio(queenHealSound, 0.85);
    queenCupThrowSoundRef.current = createFallbackAudio(queenCupThrowSound, 0.85);
    projectileHitSoundRef.current = createFallbackAudio(projectileHitSound, 0.85);
    knightSwordProjectileSoundRef.current = createFallbackAudio(knightSwordProjectileSound, 0.9);
    knightSwordSlashSoundRef.current = createFallbackAudio(knightSwordSlashSound, 0.9);
    roaringKnightRoarSoundRef.current = createFallbackAudio(roaringKnightRoarSound, 0.85);
    knightSphereTransformSoundRef.current = createFallbackAudio(knightSphereTransformSound, 0.85);
    knightBirdDriveSoundRef.current = createFallbackAudio(knightBirdDriveSound, 0.75);
    knightBirdHitSoundRef.current = createFallbackAudio(attackPunchSound, 0.9);
    gersonJumpHitSoundRef.current = createFallbackAudio(gersonJumpHitSound, 0.9);
    gersonBounceSoundRef.current = createFallbackAudio(gersonBounceSound, 0.85);
    tennaStarSpecialSoundRef.current = createFallbackAudio(tennaStarSpecialSound, 0.9);
    doorHoverSoundRef.current = createFallbackAudio(doorHoverSound, 0.75);
    doorClickSoundRef.current = createFallbackAudio(doorClickSound, 0.85);
    attackSoundRefs.current = {
      attackPunch: createFallbackAudio(attackPunchSound, attackSoundVolumes.attackPunch),
      attackKick: createFallbackAudio(attackKickSound, attackSoundVolumes.attackKick),
      attackUppercut: createFallbackAudio(attackUppercutSound, attackSoundVolumes.attackUppercut),
      attackSweep: createFallbackAudio(attackSweepSound, attackSoundVolumes.attackSweep),
      queenPunch: createFallbackAudio(queenPunchSound, attackSoundVolumes.queenPunch),
      queenKick: createFallbackAudio(queenKickSound, attackSoundVolumes.queenKick),
    };
    countdownSoundRefs.current = {
      1: createFallbackAudio(announcerBeginsOneSound, 0.9),
      2: createFallbackAudio(announcerBeginsTwoSound, 0.9),
      3: createFallbackAudio(announcerBeginsThreeSound, 0.9),
    };
    jevilVoiceSoundRefs.current = {
      jevilVoiceAnything: createFallbackAudio(jevilVoiceAnythingSound, 0.9),
      jevilVoiceAnythingJa: createFallbackAudio(jevilVoiceAnythingJaSound, 0.9),
      jevilVoiceByeBye: createFallbackAudio(jevilVoiceByeByeSound, 0.9),
      jevilVoiceChaos: createFallbackAudio(jevilVoiceChaosSound, 0.9),
      jevilVoiceHaZero: createFallbackAudio(jevilVoiceHaZeroSound, 0.9),
      jevilVoiceHaOne: createFallbackAudio(jevilVoiceHaOneSound, 0.9),
      jevilVoiceLaughZero: createFallbackAudio(jevilVoiceLaughZeroSound, 0.9),
      jevilVoiceLaughOne: createFallbackAudio(jevilVoiceLaughOneSound, 0.9),
      jevilVoiceMetamorphosis: createFallbackAudio(jevilVoiceMetamorphosisSound, 0.9),
      jevilVoiceMetamorphosisJa: createFallbackAudio(jevilVoiceMetamorphosisJaSound, 0.9),
      jevilVoiceNeoChaos: createFallbackAudio(jevilVoiceNeoChaosSound, 0.9),
      jevilVoiceNeoChaosJa: createFallbackAudio(jevilVoiceNeoChaosJaSound, 0.9),
      jevilVoiceOh: createFallbackAudio(jevilVoiceOhSound, 0.9),
    };
    const AudioContextConstructor =
      window.AudioContext ??
      (window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (AudioContextConstructor) {
      const audioContext = new AudioContextConstructor();
      audioContextRef.current = audioContext;
      const soundUrls: Record<BufferedSoundId, string> = {
        select: selectSound,
        fightStart: fightStartSound,
        tennaAirWave: tennaAirWaveSound,
        queenHeal: queenHealSound,
        queenCupThrow: queenCupThrowSound,
        projectileHit: projectileHitSound,
        knightSwordProjectile: knightSwordProjectileSound,
        knightSwordSlash: knightSwordSlashSound,
        knightSphereTransform: knightSphereTransformSound,
        knightBirdHit: attackPunchSound,
        gersonJumpHit: gersonJumpHitSound,
        gersonBounce: gersonBounceSound,
        tennaStarSpecial: tennaStarSpecialSound,
        doorHover: doorHoverSound,
        doorClick: doorClickSound,
        countdown1: announcerBeginsOneSound,
        countdown2: announcerBeginsTwoSound,
        countdown3: announcerBeginsThreeSound,
        attackPunch: attackPunchSound,
        attackKick: attackKickSound,
        attackUppercut: attackUppercutSound,
        attackSweep: attackSweepSound,
        queenPunch: queenPunchSound,
        queenKick: queenKickSound,
        jevilVoiceAnything: jevilVoiceAnythingSound,
        jevilVoiceAnythingJa: jevilVoiceAnythingJaSound,
        jevilVoiceByeBye: jevilVoiceByeByeSound,
        jevilVoiceChaos: jevilVoiceChaosSound,
        jevilVoiceHaZero: jevilVoiceHaZeroSound,
        jevilVoiceHaOne: jevilVoiceHaOneSound,
        jevilVoiceLaughZero: jevilVoiceLaughZeroSound,
        jevilVoiceLaughOne: jevilVoiceLaughOneSound,
        jevilVoiceMetamorphosis: jevilVoiceMetamorphosisSound,
        jevilVoiceMetamorphosisJa: jevilVoiceMetamorphosisJaSound,
        jevilVoiceNeoChaos: jevilVoiceNeoChaosSound,
        jevilVoiceNeoChaosJa: jevilVoiceNeoChaosJaSound,
        jevilVoiceOh: jevilVoiceOhSound,
      };

      Object.entries(soundUrls).forEach(([id, url]) => {
        void fetch(url)
          .then((response) => response.arrayBuffer())
          .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
          .then((buffer) => {
            if (isMounted) {
              soundBuffersRef.current[id as BufferedSoundId] = buffer;
            }
          })
          .catch(() => {
            // Fallback HTMLAudioElement will still play if decoding fails.
          });
      });
    }

    const playSelectSound = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const button = target.closest('button');

      if (!button || button.disabled || button.classList.contains('mode-door')) {
        return;
      }

      playBufferedSound('select', selectSoundRef.current, 0.75);
    };

    document.addEventListener('click', playSelectSound, true);

    return () => {
      isMounted = false;
      document.removeEventListener('click', playSelectSound, true);
      selectSoundRef.current = null;
      fightStartSoundRef.current = null;
      tennaAirWaveSoundRef.current = null;
      queenHealSoundRef.current = null;
      queenCupThrowSoundRef.current = null;
      projectileHitSoundRef.current = null;
      knightSwordProjectileSoundRef.current = null;
      knightSwordSlashSoundRef.current = null;
      roaringKnightRoarSoundRef.current = null;
      knightSphereTransformSoundRef.current = null;
      knightBirdDriveSoundRef.current = null;
      knightBirdHitSoundRef.current = null;
      gersonJumpHitSoundRef.current = null;
      gersonBounceSoundRef.current = null;
      tennaStarSpecialSoundRef.current = null;
      doorHoverSoundRef.current = null;
      doorClickSoundRef.current = null;
      attackSoundRefs.current = {
        attackPunch: null,
        attackKick: null,
        attackUppercut: null,
        attackSweep: null,
        queenPunch: null,
        queenKick: null,
      };
      jevilVoiceSoundRefs.current = createEmptyJevilVoiceSoundRefs();
      soundBuffersRef.current = {};
      void audioContextRef.current?.close().catch(() => {});
      audioContextRef.current = null;
      countdownSoundRefs.current = { 1: null, 2: null, 3: null };
    };
  }, []);

  function playBufferedSound(
    id: BufferedSoundId,
    fallback: HTMLAudioElement | null,
    volume: number,
    playbackRate = 1,
    maxDurationMs?: number,
  ) {
    const pauseAllowedSounds: BufferedSoundId[] = ['select', 'doorHover', 'doorClick'];
    if (isArenaPausedRef.current && screen === 'arena' && !pauseAllowedSounds.includes(id)) {
      return;
    }

    const audioContext = audioContextRef.current;
    const buffer = soundBuffersRef.current[id];
    const outputVolume = volume * effectsVolume;

    if (audioContext && buffer) {
      if (audioContext.state === 'suspended') {
        void audioContext.resume().catch(() => {});
      }

      const source = audioContext.createBufferSource();
      const gain = audioContext.createGain();
      source.buffer = buffer;
      source.playbackRate.value = playbackRate;
      gain.gain.value = outputVolume;
      source.connect(gain);
      gain.connect(audioContext.destination);
      source.start(0);
      if (typeof maxDurationMs === 'number') {
        source.stop(audioContext.currentTime + maxDurationMs / 1000);
      }
      return;
    }

    if (!fallback) {
      return;
    }

    fallback.currentTime = 0;
    fallback.playbackRate = playbackRate;
    fallback.volume = outputVolume;
    void fallback.play().catch(() => {
      // Browsers can still block audio until a user gesture unlocks playback.
    });
    if (typeof maxDurationMs === 'number') {
      window.setTimeout(() => {
        fallback.pause();
        fallback.currentTime = 0;
      }, maxDurationMs);
    }
  }

  function getGameplayEffectAudios() {
    return [
      fightStartSoundRef.current,
      tennaAirWaveSoundRef.current,
      queenHealSoundRef.current,
      queenCupThrowSoundRef.current,
      projectileHitSoundRef.current,
      knightSwordProjectileSoundRef.current,
      knightSwordSlashSoundRef.current,
      roaringKnightRoarSoundRef.current,
      knightSphereTransformSoundRef.current,
      knightBirdDriveSoundRef.current,
      knightBirdHitSoundRef.current,
      gersonJumpHitSoundRef.current,
      gersonBounceSoundRef.current,
      tennaStarSpecialSoundRef.current,
      ...Object.values(attackSoundRefs.current),
      ...Object.values(countdownSoundRefs.current),
      ...Object.values(jevilVoiceSoundRefs.current),
    ].filter((audio): audio is HTMLAudioElement => Boolean(audio));
  }

  function pauseGameplayEffectsAudio() {
    getGameplayEffectAudios().forEach((audio) => {
      audio.pause();
    });
    if (audioContextRef.current?.state === 'running') {
      void audioContextRef.current.suspend().catch(() => {});
    }
  }

  function shiftArenaClockAfterPause(pausedMs: number, pausedAt: number) {
    const shiftStartedAtRefs = [
      specialInputStartedAt,
      knightSphereInputStartedAt,
      knightDarkWaveInputStartedAt,
      playerChargeAttackStartedAt,
      playerChargeReleaseStartedAt,
      playerKnightDarkWaveStartedAt,
      opponentInsidePlayerKnightDarkWaveStartedAt,
      opponentChargeAttackStartedAt,
      opponentChargeReleaseStartedAt,
      opponentKnightDarkWaveStartedAt,
      playerInsideOpponentKnightDarkWaveStartedAt,
      playerKnightSpherePhaseStartedAt,
      opponentKnightSpherePhaseStartedAt,
      playerAttackStartedAt,
      opponentAttackStartedAt,
      playerStatusStartedAt,
      opponentStatusStartedAt,
      playerLaunchedFallStartedAt,
      opponentLaunchedFallStartedAt,
      playerBlockStartedAt,
      opponentBlockStartedAt,
    ];

    shiftStartedAtRefs.forEach((ref) => {
      if (ref.current > 0) ref.current += pausedMs;
    });

    const shiftDeadlineRefs = [
      attackReadyAt,
      opponentAttackReadyAt,
      specialReadyAt,
      specialInputExpiresAt,
      knightSphereInputExpiresAt,
      knightDarkWaveInputExpiresAt,
      opponentSpecialReadyAt,
      playerGersonLandingImmuneUntilRef,
      opponentGersonLandingImmuneUntilRef,
      playerJevilAbsorbEndsAtRef,
      opponentJevilAbsorbEndsAtRef,
      playerJevilAbsorbRecoverUntilRef,
      opponentJevilAbsorbRecoverUntilRef,
    ];

    shiftDeadlineRefs.forEach((ref) => {
      if (ref.current > pausedAt) ref.current += pausedMs;
    });

    if (jevilPlatformsRef.current.length > 0) {
      setJevilPlatformsAndRef(
        jevilPlatformsRef.current.map((platform) => ({
          ...platform,
          createdAt: platform.createdAt + pausedMs,
        })),
      );
    }
  }

  function runAfterArenaPause(callback: () => void): number {
    if (!isArenaPausedRef.current) {
      callback();
      return 0;
    }

    const timer = window.setInterval(() => {
      if (isArenaPausedRef.current) return;
      window.clearInterval(timer);
      callback();
    }, 50);

    return timer;
  }

  function playFightStartSound() {
    playBufferedSound('fightStart', fightStartSoundRef.current, 0.8);
  }

  function playTennaAirWaveSound() {
    playBufferedSound('tennaAirWave', tennaAirWaveSoundRef.current, 0.9);
  }

  function playQueenHealSound() {
    playBufferedSound('queenHeal', queenHealSoundRef.current, 0.85);
  }

  function playQueenCupThrowSound() {
    playBufferedSound('queenCupThrow', queenCupThrowSoundRef.current, 0.85);
  }

  function playProjectileHitSound() {
    playBufferedSound('projectileHit', projectileHitSoundRef.current, 0.85);
  }

  function playKnightSwordProjectileSound() {
    playBufferedSound('knightSwordProjectile', knightSwordProjectileSoundRef.current, 0.9);
  }

  function playKnightSwordSlashSound() {
    playBufferedSound('knightSwordSlash', knightSwordSlashSoundRef.current, 0.9, 1, 1000);
  }

  function playKnightSphereTransformSound() {
    playBufferedSound('knightSphereTransform', knightSphereTransformSoundRef.current, 0.85);
  }

  function playKnightBirdHitSound() {
    playBufferedSound('knightBirdHit', knightBirdHitSoundRef.current, 0.9);
  }

  function playGersonJumpHitSound() {
    playBufferedSound('gersonJumpHit', gersonJumpHitSoundRef.current, 0.9);
  }

  function playGersonBounceSound() {
    playBufferedSound('gersonBounce', gersonBounceSoundRef.current, 0.85);
  }

  function playTennaStarSpecialSound() {
    playBufferedSound('tennaStarSpecial', tennaStarSpecialSoundRef.current, 0.9);
  }

  function playRandomJevilVoiceSound(volume = 0.9) {
    const availableSoundIds =
      JEVIL_VOICE_SOUND_IDS.length > 1
        ? JEVIL_VOICE_SOUND_IDS.filter((soundId) => soundId !== lastJevilVoiceSoundIdRef.current)
        : JEVIL_VOICE_SOUND_IDS;
    const soundId = availableSoundIds[Math.floor(Math.random() * availableSoundIds.length)];
    lastJevilVoiceSoundIdRef.current = soundId;
    playBufferedSound(soundId, jevilVoiceSoundRefs.current[soundId], volume);
  }

  function playProjectileImpactSound(projectile: Projectile) {
    if (
      projectile.kind === 'jevil-scythe' ||
      projectile.kind === 'jevil-chaos-shot' ||
      projectile.kind === 'jevil-head'
    ) {
      playRandomJevilVoiceSound();
      return;
    }

    playProjectileHitSound();
  }

  function getAttackSoundId(fighter: Fighter, nextAttack: Exclude<Attack, 'idle'>, isCrouchAttack: boolean) {
    if (fighter.id === 'mister-ant-tenna' && isCrouchAttack && nextAttack === 'kick') return 'attackKick';
    if (fighter.id === 'mister-ant-tenna' && !isCrouchAttack && nextAttack === 'kick') return 'attackSweep';
    if (isCrouchAttack && nextAttack === 'punch') return 'attackUppercut';
    if (isCrouchAttack && nextAttack === 'kick') return 'attackSweep';
    if (fighter.id === 'queen' && nextAttack === 'punch') return 'queenPunch';
    if (fighter.id === 'queen' && nextAttack === 'kick') return 'queenKick';

    return nextAttack === 'punch' ? 'attackPunch' : 'attackKick';
  }

  function playAttackSound(
    fighter: Fighter,
    nextAttack: Exclude<Attack, 'idle'>,
    isCrouchAttack: boolean,
  ) {
    const soundId = getAttackSoundId(fighter, nextAttack, isCrouchAttack);
    playBufferedSound(soundId, attackSoundRefs.current[soundId], attackSoundVolumes[soundId]);
  }

  function playDoorHoverSound() {
    playBufferedSound('doorHover', doorHoverSoundRef.current, 0.75);
  }

  function openModeDoor(mode: ArenaMode) {
    if (doorTransitionMode || doorTransitionTimer.current) return;

    playBufferedSound('doorClick', doorClickSoundRef.current, 0.85);
    setDoorTransitionMode(mode);
    doorTransitionTimer.current = window.setTimeout(() => {
      setDoorTransitionMode(null);
      doorTransitionTimer.current = null;
      openCharacterSelect(mode);
      setIsScreenRevealing(true);
      screenRevealTimer.current = window.setTimeout(() => {
        setIsScreenRevealing(false);
        screenRevealTimer.current = null;
      }, 560);
    }, 560);
  }

  const selectedFighter =
    fighters.find((fighter) => fighter.id === selectedFighterId) ?? fighters[0];
  const selectedOpponent =
    fighters.find((fighter) => fighter.id === selectedOpponentId) ?? fighters[4];
  const selectedStage = stages.find((stage) => stage.id === selectedStageId) ?? stages[0];
  const player = lockedFighter ?? selectedFighter;
  const opponent = lockedOpponent ?? selectedOpponent;

  useEffect(() => {
    return () => {
      if (playerChargeAuraTimer.current) {
        window.clearTimeout(playerChargeAuraTimer.current);
        playerChargeAuraTimer.current = null;
      }

      if (playerChargeAttackTimer.current) {
        window.clearTimeout(playerChargeAttackTimer.current);
        playerChargeAttackTimer.current = null;
      }

      if (playerChargeDamageTimer.current) {
        window.clearTimeout(playerChargeDamageTimer.current);
        playerChargeDamageTimer.current = null;
      }

      if (playerKnightDarkWaveTimer.current) {
        window.clearInterval(playerKnightDarkWaveTimer.current);
        playerKnightDarkWaveTimer.current = null;
      }

      if (playerBlockStartupTimer.current) {
        window.clearTimeout(playerBlockStartupTimer.current);
        playerBlockStartupTimer.current = null;
      }

      if (playerKnightSphereTimer.current) {
        window.clearTimeout(playerKnightSphereTimer.current);
        playerKnightSphereTimer.current = null;
      }

      if (playerKnightSphereDrainInterval.current) {
        window.clearInterval(playerKnightSphereDrainInterval.current);
        playerKnightSphereDrainInterval.current = null;
      }

      if (opponentKnightSphereTimer.current) {
        window.clearTimeout(opponentKnightSphereTimer.current);
        opponentKnightSphereTimer.current = null;
      }

      if (opponentKnightSphereDrainInterval.current) {
        window.clearInterval(opponentKnightSphereDrainInterval.current);
        opponentKnightSphereDrainInterval.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (stageMusicRef.current) {
      stageMusicRef.current.pause();
      stageMusicRef.current.currentTime = 0;
      stageMusicRef.current = null;
    }

    const musicSrc = screen === 'arena' ? stageMusic[selectedStage.id] : null;

    if (!musicSrc) return undefined;

    const music = new Audio(musicSrc);
    music.loop = true;
    music.volume = 0.28 * musicVolume;
    music.preload = 'auto';
    stageMusicRef.current = music;

    void music.play().catch(() => {
      // Background music can be blocked until the browser accepts user audio.
    });

    return () => {
      music.pause();
      music.currentTime = 0;
      if (stageMusicRef.current === music) {
        stageMusicRef.current = null;
      }
    };
  }, [screen, selectedStage.id]);

  useEffect(() => {
    if (stageMusicRef.current) {
      stageMusicRef.current.volume = 0.28 * musicVolume;
    }
  }, [musicVolume]);

  useEffect(() => {
    positionRef.current = playerPosition;
  }, [playerPosition]);

  useEffect(() => {
    let frameId: number | null = null;
    const hasKnight = player.id === 'roaring-knight' || opponent.id === 'roaring-knight';

    if (screen !== 'arena' || !hasKnight) {
      knightVisualLiftRef.current = 0;
      setKnightVisualLift(0);
      return undefined;
    }

    const startedAt = performance.now();
    const tick = (now: number) => {
      if (isArenaPausedRef.current) {
        frameId = window.requestAnimationFrame(tick);
        return;
      }

      const progress = ((now - startedAt) % 2200) / 2200;
      const lift = Math.round(Math.sin(progress * Math.PI * 2) * -17 + 17);

      knightVisualLiftRef.current = lift;
      setKnightVisualLift(lift);
      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [opponent.id, player.id, screen]);

  useEffect(() => {
    if (knightAfterimageTimer.current) {
      window.clearInterval(knightAfterimageTimer.current);
      knightAfterimageTimer.current = null;
    }

    setKnightAfterimages([]);
    lastKnightAfterimagePositionRef.current = { left: null, right: null };

    const hasKnight = player.id === 'roaring-knight' || opponent.id === 'roaring-knight';

    if (screen !== 'arena' || !hasKnight) return undefined;

    function getStripAfterimageSnapshot(
      sprite: string,
      width: number,
      height: number,
      frameCount: number,
      frameIndex: number,
      mirrorsBaseSprite = false,
    ) {
      return {
        sprite,
        renderMode: 'strip' as const,
        width,
        height,
        backgroundSize: `${frameCount * 100}% 100%`,
        backgroundPosition: getSpriteFramePosition(frameIndex, frameCount),
        mirrorsBaseSprite,
      };
    }

    function getKnightDefeatAfterimageSnapshot() {
      return getStripAfterimageSnapshot(
        roaringKnightDefeatSprite,
        225,
        245,
        7,
        6,
      );
    }

    function getKnightSwordShotAfterimageSnapshot(startedAt: number) {
      return getStripAfterimageSnapshot(
        roaringKnightSwordShotSprite,
        375,
        289,
        3,
        getOneShotSpriteFrameIndex(
          window.performance.now() - startedAt,
          360,
          3,
        ),
      );
    }

    function getPlayerKnightAfterimageSnapshot(): Pick<
      KnightAfterimage,
      'sprite' | 'renderMode' | 'width' | 'height' | 'backgroundSize' | 'backgroundPosition' | 'heightPx'
      | 'mirrorsBaseSprite'
    > {
      const now = window.performance.now();
      const sphereElapsedMs = now - playerKnightSpherePhaseStartedAt.current;

      if (playerHealthRef.current <= 0) {
        return getKnightDefeatAfterimageSnapshot();
      }

      if (knightSpherePhaseRef.current === 'active') {
        return getStripAfterimageSnapshot(
          roaringKnightSphereSprite,
          124,
          124,
          3,
          getLoopingSpriteFrameIndex(sphereElapsedMs, 360, 3),
        );
      }

      if (knightSpherePhaseRef.current === 'entering' || knightSpherePhaseRef.current === 'exiting') {
        return getStripAfterimageSnapshot(
          roaringKnightVanishSprite,
          300,
          257,
          8,
          getOneShotSpriteFrameIndex(
            sphereElapsedMs,
            KNIGHT_SPHERE_TRANSFORM_MS,
            8,
            knightSpherePhaseRef.current === 'exiting',
          ),
        );
      }

      if (knightSpherePhaseRef.current === 'bird-transform') {
        return getStripAfterimageSnapshot(
          roaringKnightBirdSprite,
          280,
          212,
          8,
          getOneShotSpriteFrameIndex(sphereElapsedMs, KNIGHT_BIRD_TRANSFORM_MS, 8),
          true,
        );
      }

      if (knightSpherePhaseRef.current === 'bird') {
        return getStripAfterimageSnapshot(
          roaringKnightBirdDashSprite,
          315,
          144,
          4,
          getLoopingSpriteFrameIndex(sphereElapsedMs, 360, 4),
          true,
        );
      }

      if (playerKnightDarkWaveStateRef.current === 'holding') {
        return getStripAfterimageSnapshot(
          roaringKnightDarkWaveSprite,
          300,
          300,
          3,
          getOneShotSpriteFrameIndex(now - playerKnightDarkWaveStartedAt.current, 420, 3),
        );
      }

      if (playerStatusRef.current === 'launched' || playerStatusRef.current === 'knockdown') {
        return getStripAfterimageSnapshot(
          roaringKnightImpactSprite,
          210,
          205,
          4,
          getLoopingSpriteFrameIndex(now - playerStatusStartedAt.current, 520, 4),
        );
      }

      if (isBlockingRef.current || playerBlockStartupRef.current) {
        return getStripAfterimageSnapshot(
          roaringKnightBlockSprite,
          316,
          330,
          10,
          getLoopingSpriteFrameIndex(now - playerBlockStartedAt.current, 780, 10),
        );
      }

      if (playerChargeAttackStateRef.current === 'releasing') {
        return {
          sprite: knightChargeReleaseFrameSprites[
            getKnightChargeReleaseFrameIndex(now - playerChargeReleaseStartedAt.current)
          ],
          renderMode: 'image' as const,
          heightPx: 430,
        };
      }

      if (playerChargeAttackStateRef.current === 'charging') {
        return {
          sprite: roaringKnightChargeHoldSprite,
          renderMode: 'image' as const,
          heightPx: 330,
        };
      }

      if (attackRef.current === 'kick') {
        return getKnightSwordShotAfterimageSnapshot(playerAttackStartedAt.current);
      }

      return {
        sprite: roaringKnightSprite,
        renderMode: 'image' as const,
        heightPx: 300,
      };
    }

    function getOpponentKnightAfterimageSnapshot(): Pick<
      KnightAfterimage,
      'sprite' | 'renderMode' | 'width' | 'height' | 'backgroundSize' | 'backgroundPosition' | 'heightPx'
      | 'mirrorsBaseSprite'
      > {
      const now = window.performance.now();
      const sphereElapsedMs = now - opponentKnightSpherePhaseStartedAt.current;

      if (opponentHealthRef.current <= 0) {
        return getKnightDefeatAfterimageSnapshot();
      }

      if (opponentKnightSpherePhaseRef.current === 'active') {
        return getStripAfterimageSnapshot(
          roaringKnightSphereSprite,
          124,
          124,
          3,
          getLoopingSpriteFrameIndex(sphereElapsedMs, 360, 3),
        );
      }

      if (opponentKnightSpherePhaseRef.current === 'entering' || opponentKnightSpherePhaseRef.current === 'exiting') {
        return getStripAfterimageSnapshot(
          roaringKnightVanishSprite,
          300,
          257,
          8,
          getOneShotSpriteFrameIndex(
            sphereElapsedMs,
            KNIGHT_SPHERE_TRANSFORM_MS,
            8,
            opponentKnightSpherePhaseRef.current === 'exiting',
          ),
        );
      }

      if (opponentKnightSpherePhaseRef.current === 'bird-transform') {
        return getStripAfterimageSnapshot(
          roaringKnightBirdSprite,
          280,
          212,
          8,
          getOneShotSpriteFrameIndex(sphereElapsedMs, KNIGHT_BIRD_TRANSFORM_MS, 8),
          true,
        );
      }

      if (opponentKnightSpherePhaseRef.current === 'bird') {
        return getStripAfterimageSnapshot(
          roaringKnightBirdDashSprite,
          315,
          144,
          4,
          getLoopingSpriteFrameIndex(sphereElapsedMs, 360, 4),
          true,
        );
      }

      if (opponentKnightDarkWaveStateRef.current === 'holding') {
        return getStripAfterimageSnapshot(
          roaringKnightDarkWaveSprite,
          300,
          300,
          3,
          getOneShotSpriteFrameIndex(now - opponentKnightDarkWaveStartedAt.current, 420, 3),
        );
      }

      if (opponentStatusRef.current === 'launched' || opponentStatusRef.current === 'knockdown') {
        return getStripAfterimageSnapshot(
          roaringKnightImpactSprite,
          210,
          205,
          4,
          getLoopingSpriteFrameIndex(now - opponentStatusStartedAt.current, 520, 4),
        );
      }

      if (opponentBlockingRef.current) {
        return getStripAfterimageSnapshot(
          roaringKnightBlockSprite,
          316,
          330,
          10,
          getLoopingSpriteFrameIndex(now - opponentBlockStartedAt.current, 780, 10),
        );
      }

      if (opponentChargeAttackStateRef.current === 'releasing') {
        return {
          sprite: knightChargeReleaseFrameSprites[
            getKnightChargeReleaseFrameIndex(now - opponentChargeReleaseStartedAt.current)
          ],
          renderMode: 'image' as const,
          heightPx: 430,
        };
      }

      if (opponentChargeAttackStateRef.current === 'charging') {
        return {
          sprite: roaringKnightChargeHoldSprite,
          renderMode: 'image' as const,
          heightPx: 330,
        };
      }

      if (opponentAttackRef.current === 'kick') {
        return getKnightSwordShotAfterimageSnapshot(opponentAttackStartedAt.current);
      }

      return {
        sprite: roaringKnightSprite,
        renderMode: 'image' as const,
        heightPx: 300,
      };
    }

    function spawnKnightAfterimage(
      side: FighterSide,
      position: Position,
      facing: Facing,
      chargeAttackState: ChargeAttackState = 'idle',
      variant: KnightAfterimage['variant'] = 'fighter',
      snapshot = side === 'left' ? getPlayerKnightAfterimageSnapshot() : getOpponentKnightAfterimageSnapshot(),
    ) {
      const id = knightAfterimageIdRef.current;
      knightAfterimageIdRef.current += 1;
      const chargeReleaseFrameIndex =
        variant === 'fighter' && chargeAttackState === 'releasing'
          ? getKnightChargeReleaseFrameIndex(
              window.performance.now() -
                (side === 'left'
                  ? playerChargeReleaseStartedAt.current
                  : opponentChargeReleaseStartedAt.current),
            )
          : undefined;

      setKnightAfterimages((current) => [
        ...current.slice(-7),
        {
          id,
          side,
          x: position.x,
          y: position.y,
          visualLift: knightVisualLiftRef.current,
          facing,
          variant:
            side === 'left'
              ? knightSpherePhaseRef.current === 'active'
                ? 'sphere'
                : variant
              : opponentKnightSpherePhaseRef.current === 'active'
                ? 'sphere'
                : variant,
          chargeAttackState,
          chargeReleaseFrameIndex,
          ...snapshot,
        },
      ]);

      window.setTimeout(() => {
        setKnightAfterimages((current) => current.filter((afterimage) => afterimage.id !== id));
      }, 2000);
    }

    knightAfterimageTimer.current = window.setInterval(() => {
      if (isArenaPausedRef.current) return;

      if (player.id === 'roaring-knight') {
        const currentPosition = positionRef.current;
        const playerAfterimageVariant =
          knightSpherePhaseRef.current === 'active' ? 'sphere' : 'fighter';

        spawnKnightAfterimage(
          'left',
          currentPosition,
          currentPosition.x <= opponentPositionRef.current.x ? 'right' : 'left',
          playerAfterimageVariant === 'sphere' ? 'idle' : playerChargeAttackStateRef.current,
          playerAfterimageVariant,
          getPlayerKnightAfterimageSnapshot(),
        );

        lastKnightAfterimagePositionRef.current.left = { ...currentPosition };
      }

      if (opponent.id === 'roaring-knight') {
        const currentPosition = opponentPositionRef.current;
        spawnKnightAfterimage(
          'right',
          currentPosition,
          currentPosition.x <= positionRef.current.x ? 'right' : 'left',
          opponentChargeAttackStateRef.current,
          'fighter',
          getOpponentKnightAfterimageSnapshot(),
        );

        lastKnightAfterimagePositionRef.current.right = { ...currentPosition };
      }
    }, 250);

    return () => {
      if (knightAfterimageTimer.current) {
        window.clearInterval(knightAfterimageTimer.current);
        knightAfterimageTimer.current = null;
      }
    };
  }, [opponent.id, player.id, screen]);

  useEffect(() => {
    opponentHealthRef.current = opponentHealth;
  }, [opponentHealth]);

  useEffect(() => {
    playerHealthRef.current = playerHealth;
  }, [playerHealth]);

  useEffect(() => {
    opponentPositionRef.current = opponentPosition;
  }, [opponentPosition]);

  useEffect(() => {
    roundCountdownRef.current = roundCountdown;
  }, [roundCountdown]);

  useEffect(() => {
    roundTimeLeftRef.current = roundTimeLeft;
  }, [roundTimeLeft]);

  useEffect(() => {
    playerSpecialShootingRef.current = playerSpecialShooting;
    opponentSpecialShootingRef.current = opponentSpecialShooting;
    playerSpecialSpriteOverrideRef.current = playerSpecialSpriteOverride;
    opponentSpecialSpriteOverrideRef.current = opponentSpecialSpriteOverride;
    playerAirSpecialWaveRef.current = playerAirSpecialWave;
    opponentAirSpecialWaveRef.current = opponentAirSpecialWave;
    playerChargeAuraActiveRef.current = playerChargeAuraActive;
    opponentChargeAuraActiveRef.current = opponentChargeAuraActive;
    playerKnightDarkWaveOverheatedRef.current = playerKnightDarkWaveOverheated;
    opponentKnightDarkWaveOverheatedRef.current = opponentKnightDarkWaveOverheated;
    playerJevilAbsorbingRef.current = playerJevilAbsorbing;
    opponentJevilAbsorbingRef.current = opponentJevilAbsorbing;
    playerJevilHeadlessPoseRef.current = playerJevilHeadlessPose;
    opponentJevilHeadlessPoseRef.current = opponentJevilHeadlessPose;
  }, [
    opponentAirSpecialWave,
    opponentChargeAuraActive,
    opponentJevilAbsorbing,
    opponentJevilHeadlessPose,
    opponentKnightDarkWaveOverheated,
    opponentSpecialShooting,
    opponentSpecialSpriteOverride,
    playerAirSpecialWave,
    playerChargeAuraActive,
    playerJevilAbsorbing,
    playerJevilHeadlessPose,
    playerKnightDarkWaveOverheated,
    playerSpecialShooting,
    playerSpecialSpriteOverride,
  ]);

  useEffect(() => {
    onlineRoleRef.current = onlineRole;
  }, [onlineRole]);

  useEffect(() => {
    onlineRoomStatusRef.current = onlineRoomStatus;
  }, [onlineRoomStatus]);

  useEffect(() => {
    campaignPositionRef.current = campaignPosition;
  }, [campaignPosition]);

  useEffect(() => {
    if (selectedCampaignSaveSlot === null || screen !== 'campaign') return;

    setCampaignSaves((currentSaves) => {
      const nextSaves = currentSaves.map((save) =>
        save.slot === selectedCampaignSaveSlot
          ? {
              slot: selectedCampaignSaveSlot,
              roomId: campaignRoomId,
              position: campaignPosition,
              isBagDefeated: isCampaignBagDefeated,
              isBagCollected: isCampaignBagCollected,
              updatedAt: Date.now(),
            }
          : save,
      );
      writeCampaignSaves(nextSaves);

      return nextSaves;
    });
  }, [
    campaignPosition,
    campaignRoomId,
    isCampaignBagCollected,
    isCampaignBagDefeated,
    screen,
    selectedCampaignSaveSlot,
  ]);

  useEffect(() => {
    bagBattlePlayerRef.current = bagBattlePlayer;
  }, [bagBattlePlayer]);

  useEffect(() => {
    bagBattleBossRef.current = bagBattleBoss;
  }, [bagBattleBoss]);

  useEffect(() => {
    bagBattleProjectilesRef.current = bagBattleProjectiles;
  }, [bagBattleProjectiles]);

  function startCampaignBossLeaving() {
    if (campaignBossCutscenePhase === 'leaving') return;
    setCampaignBossCutscenePhase('leaving');
    campaignPressedKeys.current.clear();
    window.setTimeout(() => {
      setCampaignBossCutsceneStep(null);
      setCampaignBossCutscenePhase('talking');
      setIsCampaignBagCollected(true);
    }, 1850);
  }

  function advanceCampaignBossCutscene() {
    setCampaignBossCutsceneStep((step) => {
      if (step === null) return step;
      if (step >= CAMPAIGN_BOSS_CUTSCENE_LINES.length - 1) {
        startCampaignBossLeaving();
        return step;
      }

      return step + 1;
    });
  }

  function startBagBattle() {
    campaignPressedKeys.current.clear();
    bagBattlePressedKeys.current.clear();
    bagBattlePlayerRef.current = BAG_BATTLE_PLAYER_START;
    bagBattleBossRef.current = BAG_BATTLE_BOSS_START;
    bagBattleProjectilesRef.current = [];
    bagBattleProjectileIdRef.current = 0;
    bagBattleAttackReadyAtRef.current = 0;
    if (bagBattleAttackTimer.current) {
      window.clearTimeout(bagBattleAttackTimer.current);
      bagBattleAttackTimer.current = null;
    }
    if (bagBattleBossShootingTimer.current) {
      window.clearTimeout(bagBattleBossShootingTimer.current);
      bagBattleBossShootingTimer.current = null;
    }
    bagBattleLastBossShotRef.current = 0;
    bagBattleBossVulnerableUntilRef.current = 0;
    bagBattleBossBurstShotsRef.current = 0;
    bagBattleBossRestUntilRef.current = 0;
    bagBattleBossRestDamageRef.current = 0;
    bagBattleBossPatternRef.current = 'shooting';
    bagBattleBossRunPrepUntilRef.current = 0;
    bagBattleBossRunHitRef.current = false;
    bagBattleBossNextPatternRef.current = 'shooting';
    bagBattleJumpsRemainingRef.current = BAG_BATTLE_MAX_JUMPS;
    bagBattleIntroUntilRef.current = window.performance.now() + BAG_BATTLE_INTRO_MS;
    setBagBattlePlayer(BAG_BATTLE_PLAYER_START);
    setBagBattleBoss(BAG_BATTLE_BOSS_START);
    setBagBattleProjectiles([]);
    setBagBattleResult('playing');
    setBagBattleAttack('idle');
    setIsBagBattleCrouching(false);
    setIsBagBattleBlocking(false);
    setIsBagBattleBossVulnerable(false);
    setIsBagBattleBossShooting(false);
    setBagBattleBossShotLane('mid');
    setBagBattleBossPattern('shooting');
    setIsBagBattleIntro(true);
    setCampaignDialogue(null);
    setCampaignActiveNpcId(null);
    setIsCampaignMenuOpen(false);
    setScreen('bag-battle');
  }

  useEffect(() => {
    if (screen !== 'campaign' || !campaignDialogue) {
      setCampaignDialogueVisibleChars(0);
      return undefined;
    }

    setCampaignDialogueVisibleChars(0);
    const intervalId = window.setInterval(() => {
      setCampaignDialogueVisibleChars((visibleChars) => {
        if (visibleChars >= campaignDialogue.length) {
          window.clearInterval(intervalId);
          return visibleChars;
        }

        return visibleChars + 1;
      });
    }, CAMPAIGN_DIALOGUE_TYPE_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [campaignDialogue, screen]);

  useEffect(() => {
    if (screen !== 'campaign') {
      campaignPressedKeys.current.clear();
      return undefined;
    }

    const campaignRoom = getCampaignRoomWithProgress(campaignRoomId, isCampaignBagDefeated);
    let animationFrameId = 0;
    let lastFrame = window.performance.now();

    const getCampaignInputKey = (event: KeyboardEvent): 'w' | 'a' | 's' | 'd' | null => {
      const gameKey = getGameKey(event, controlBindings);
      if (gameKey === 'w' || gameKey === 'a' || gameKey === 's' || gameKey === 'd') return gameKey;

      if (event.key === 'ArrowUp') return 'w';
      if (event.key === 'ArrowLeft') return 'a';
      if (event.key === 'ArrowDown') return 's';
      if (event.key === 'ArrowRight') return 'd';

      return null;
    };

    const handleCampaignKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        campaignPressedKeys.current.clear();
        setIsCampaignMenuOpen((isOpen) => !isOpen);
        return;
      }

      if (isCampaignMenuOpen) return;

      if (campaignBossCutsceneStep !== null) {
        if (event.key === 'Enter' || event.key === ' ' || event.key.toLowerCase() === 'e') {
          event.preventDefault();
          advanceCampaignBossCutscene();
        }
        return;
      }

      if (event.key === 'Enter' || event.key === ' ' || event.key.toLowerCase() === 'e') {
        event.preventDefault();

        if (campaignDialogue) {
          if (campaignDialogueVisibleChars < campaignDialogue.length) {
            setCampaignDialogueVisibleChars(campaignDialogue.length);
            return;
          }

          setCampaignDialogue(null);
          setCampaignActiveNpcId(null);
          return;
        }

        const interaction = getCampaignInteraction(campaignRoom, campaignPositionRef.current);
        if (interaction) {
          campaignPressedKeys.current.clear();
          setCampaignActiveNpcId('idleSprite' in interaction ? interaction.id : null);
          if ('encounter' in interaction && interaction.encounter === 'bag-battle') {
            window.setTimeout(startBagBattle, 180);
            return;
          }
          if (interaction.text.trim()) {
            setCampaignDialogue(interaction.text);
          } else if ('idleSprite' in interaction) {
            window.setTimeout(() => {
              setCampaignActiveNpcId((activeNpcId) => (activeNpcId === interaction.id ? null : activeNpcId));
            }, 900);
          }
        }
        return;
      }

      if (campaignDialogue || campaignBossCutsceneStep !== null) return;

      const key = getCampaignInputKey(event);
      if (!key) return;
      event.preventDefault();
      campaignPressedKeys.current.add(key);
    };

    const handleCampaignKeyUp = (event: KeyboardEvent) => {
      const key = getCampaignInputKey(event);
      if (!key) return;
      event.preventDefault();
      campaignPressedKeys.current.delete(key);
    };

    const moveCampaignPlayer = (frameTime: number) => {
      const deltaScale = clamp(frameTime - lastFrame, 0, MAX_FRAME_DELTA_MS) / TARGET_FRAME_MS;
      lastFrame = frameTime;

      setCampaignPosition((position) => {
        if (campaignDialogue || isCampaignMenuOpen || campaignBossCutsceneStep !== null) return position;

        let dx = 0;
        let dy = 0;

        if (campaignPressedKeys.current.has('a')) dx -= 1;
        if (campaignPressedKeys.current.has('d')) dx += 1;
        if (campaignPressedKeys.current.has('w')) dy -= 1;
        if (campaignPressedKeys.current.has('s')) dy += 1;

        if (dx === 0 && dy === 0) return position;

        const diagonal = dx !== 0 && dy !== 0 ? Math.SQRT1_2 : 1;

        const intendedPosition = {
          x: clamp(position.x + dx * CAMPAIGN_MOVE_SPEED * diagonal * deltaScale * 0.01, 0, 100),
          y: clamp(position.y + dy * CAMPAIGN_MOVE_SPEED * diagonal * deltaScale * 0.01, 0, 100),
        };

        const transition = getCampaignTransition(campaignRoom, intendedPosition);
        if (transition) {
          campaignPositionRef.current = transition.position;
          setCampaignRoomId(transition.target);
          setCampaignDialogue(null);
          setCampaignActiveNpcId(null);
          return transition.position;
        }

        if (isCampaignPositionAllowed(campaignRoom, intendedPosition)) {
          campaignPositionRef.current = intendedPosition;
          return intendedPosition;
        }

        const xOnlyPosition = { ...position, x: intendedPosition.x };
        if (isCampaignPositionAllowed(campaignRoom, xOnlyPosition)) {
          campaignPositionRef.current = xOnlyPosition;
          return xOnlyPosition;
        }

        const yOnlyPosition = { ...position, y: intendedPosition.y };
        if (isCampaignPositionAllowed(campaignRoom, yOnlyPosition)) {
          campaignPositionRef.current = yOnlyPosition;
          return yOnlyPosition;
        }

        return position;
      });

      animationFrameId = window.requestAnimationFrame(moveCampaignPlayer);
    };

    window.addEventListener('keydown', handleCampaignKeyDown);
    window.addEventListener('keyup', handleCampaignKeyUp);
    animationFrameId = window.requestAnimationFrame(moveCampaignPlayer);

    return () => {
      window.removeEventListener('keydown', handleCampaignKeyDown);
      window.removeEventListener('keyup', handleCampaignKeyUp);
      window.cancelAnimationFrame(animationFrameId);
      campaignPressedKeys.current.clear();
    };
  }, [
    campaignBossCutscenePhase,
    campaignBossCutsceneStep,
    campaignDialogue,
    campaignDialogueVisibleChars,
    campaignRoomId,
    controlBindings,
    isCampaignBagDefeated,
    isCampaignMenuOpen,
    screen,
  ]);

  useEffect(() => {
    if (screen !== 'bag-battle') {
      bagBattlePressedKeys.current.clear();
      return undefined;
    }

    let animationFrameId = 0;
    let lastFrame = window.performance.now();

    const getBagBattleInputKey = (event: KeyboardEvent) => {
      const gameKey = getGameKey(event, controlBindings);
      if (
        gameKey === 'a' ||
        gameKey === 'd' ||
        gameKey === 'w' ||
        gameKey === 's' ||
        gameKey === 'arrowleft' ||
        gameKey === 'arrowright' ||
        gameKey === 'arrowdown' ||
        gameKey === 'block'
      ) {
        return gameKey;
      }

      if (event.key === 'ArrowLeft') return 'a';
      if (event.key === 'ArrowRight') return 'd';
      if (event.key === 'ArrowUp') return 'w';
      if (event.key === 'ArrowDown') return 's';
      if (event.key.toLowerCase() === ' ') return 'arrowright';

      return null;
    };

    const leaveBagBattle = () => {
      bagBattlePressedKeys.current.clear();
      if (bagBattleResult === 'won') {
        const returnPosition = { x: 68, y: 49 };
        setIsCampaignBagDefeated(true);
        setIsCampaignBagCollected(false);
        setCampaignRoomId('side-room');
        setCampaignPosition(returnPosition);
        campaignPositionRef.current = returnPosition;
        setCampaignDialogue(null);
        setCampaignActiveNpcId(null);
        setCampaignBossCutscenePhase('talking');
        setCampaignBossCutsceneStep(0);
      }
      setScreen('campaign');
    };

    const triggerBagBattleAttack = (button: 'punch' | 'kick') => {
      const now = window.performance.now();
      if (now < bagBattleAttackReadyAtRef.current || bagBattleAttackTimer.current) return;

      const isCrouchAttack =
        bagBattlePlayerRef.current.y <= 0.01 &&
        (bagBattlePressedKeys.current.has('s') || bagBattlePressedKeys.current.has('arrowdown'));
      const nextAttack: BagBattleAttack =
        isCrouchAttack && button === 'punch'
          ? 'uppercut'
          : isCrouchAttack && button === 'kick'
            ? 'sweep'
            : button;
      const damage =
        nextAttack === 'uppercut' ? 13 : nextAttack === 'sweep' ? 6 : nextAttack === 'kick' ? 8 : 5;
      const range = nextAttack === 'kick' || nextAttack === 'sweep' ? 16 : 12;
      const hitY =
        nextAttack === 'uppercut'
          ? bagBattlePlayerRef.current.y + 21
          : nextAttack === 'sweep'
            ? bagBattlePlayerRef.current.y + 5
            : bagBattlePlayerRef.current.y + 13;
      const bossY = 14;

      bagBattleAttackReadyAtRef.current = now + BAG_BATTLE_ATTACK_COOLDOWN_MS;
      setBagBattleAttack(nextAttack);
      setIsBagBattleBlocking(false);

      if (
        bagBattleBossVulnerableUntilRef.current > now &&
        Math.abs(bagBattleBossRef.current.x - bagBattlePlayerRef.current.x) <= range &&
        Math.abs(hitY - bossY) <= (nextAttack === 'uppercut' ? 22 : 15)
      ) {
        const isBossInBurstRest = now < bagBattleBossRestUntilRef.current;
        const availableRestDamage = isBossInBurstRest
          ? Math.max(0, BAG_BATTLE_BOSS_REST_DAMAGE_CAP - bagBattleBossRestDamageRef.current)
          : damage;
        const appliedDamage = Math.min(damage, availableRestDamage);
        if (appliedDamage > 0) {
          if (isBossInBurstRest) {
            bagBattleBossRestDamageRef.current += appliedDamage;
          }
          const nextBoss = {
            ...bagBattleBossRef.current,
            health: Math.max(0, bagBattleBossRef.current.health - appliedDamage),
            x: clamp(bagBattleBossRef.current.x - 1.3, 14, 22),
          };
          bagBattleBossRef.current = nextBoss;
          setBagBattleBoss(nextBoss);
        }
      }

      bagBattleAttackTimer.current = window.setTimeout(() => {
        bagBattleAttackTimer.current = null;
        setBagBattleAttack('idle');
      }, BAG_BATTLE_ATTACK_DURATION_MS);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        leaveBagBattle();
        return;
      }

      if (bagBattleResult !== 'playing') {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          leaveBagBattle();
        }
        return;
      }

      const key = getBagBattleInputKey(event);
      if (!key) return;
      event.preventDefault();
      if (window.performance.now() < bagBattleIntroUntilRef.current) return;
      bagBattlePressedKeys.current.add(key);

      const isCrouchingNow =
        bagBattlePlayerRef.current.y <= 0.01 &&
        (bagBattlePressedKeys.current.has('s') || bagBattlePressedKeys.current.has('arrowdown'));
      setIsBagBattleCrouching(isCrouchingNow);
      if (key === 'block') {
        setIsBagBattleBlocking(true);
        return;
      }

      if (key === 'w' && !event.repeat && bagBattleJumpsRemainingRef.current > 0) {
        const nextPlayer = { ...bagBattlePlayerRef.current, vy: BAG_BATTLE_JUMP_POWER };
        bagBattleJumpsRemainingRef.current -= 1;
        bagBattlePlayerRef.current = nextPlayer;
        setBagBattlePlayer(nextPlayer);
      }

      if (key === 'arrowleft' || key === 'arrowright') {
        triggerBagBattleAttack(key === 'arrowleft' ? 'punch' : 'kick');
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = getBagBattleInputKey(event);
      if (!key) return;
      event.preventDefault();
      bagBattlePressedKeys.current.delete(key);
      if (key === 's' || key === 'arrowdown') {
        setIsBagBattleCrouching(
          bagBattlePlayerRef.current.y <= 0.01 &&
            (bagBattlePressedKeys.current.has('s') || bagBattlePressedKeys.current.has('arrowdown')),
        );
      }
      if (key === 'block') setIsBagBattleBlocking(false);
    };

    const tickBagBattle = (frameTime: number) => {
      const deltaMs = clamp(frameTime - lastFrame, 0, MAX_FRAME_DELTA_MS);
      const deltaScale = deltaMs / TARGET_FRAME_MS;
      lastFrame = frameTime;

      if (bagBattleResult !== 'playing') {
        animationFrameId = window.requestAnimationFrame(tickBagBattle);
        return;
      }

      if (frameTime < bagBattleIntroUntilRef.current) {
        animationFrameId = window.requestAnimationFrame(tickBagBattle);
        return;
      }
      if (isBagBattleIntro) setIsBagBattleIntro(false);

      let nextPlayer = bagBattlePlayerRef.current;
      let nextBoss = bagBattleBossRef.current;
      let nextProjectiles = bagBattleProjectilesRef.current;
      let playerWasHit = false;

      let horizontal = 0;
      const isBlockingNow = bagBattlePressedKeys.current.has('block');
      const isCrouchingInput =
        bagBattlePressedKeys.current.has('s') || bagBattlePressedKeys.current.has('arrowdown');
      if (!isBlockingNow && !(nextPlayer.y <= 0.01 && isCrouchingInput)) {
        if (bagBattlePressedKeys.current.has('a')) horizontal -= 1;
        if (bagBattlePressedKeys.current.has('d')) horizontal += 1;
      }

      nextPlayer = {
        ...nextPlayer,
        x: clamp(nextPlayer.x + horizontal * BAG_BATTLE_PLAYER_SPEED * deltaScale, 26, 94),
        y: Math.max(0, nextPlayer.y + nextPlayer.vy * deltaScale),
        vy: nextPlayer.vy - BAG_BATTLE_GRAVITY * deltaScale,
      };
      if (nextPlayer.y <= 0 && nextPlayer.vy < 0) {
        nextPlayer = { ...nextPlayer, y: 0, vy: 0 };
        bagBattleJumpsRemainingRef.current = BAG_BATTLE_MAX_JUMPS;
      }
      setIsBagBattleCrouching(
        nextPlayer.y <= 0.01 && isCrouchingInput,
      );

      if (
        bagBattleBossPatternRef.current === 'shooting' &&
        bagBattleBossNextPatternRef.current === 'running' &&
        frameTime >= bagBattleBossRestUntilRef.current
      ) {
        bagBattleBossPatternRef.current = 'run-prep';
        bagBattleBossRunPrepUntilRef.current = frameTime + BAG_BATTLE_BOSS_RUN_PREP_MS;
        bagBattleBossRunHitRef.current = false;
        bagBattleBossVulnerableUntilRef.current = 0;
        setBagBattleBossPattern('run-prep');
        setIsBagBattleBossVulnerable(false);
        setIsBagBattleBossShooting(false);
        nextProjectiles = [];
      }

      if (bagBattleBossPatternRef.current === 'run-prep' && frameTime >= bagBattleBossRunPrepUntilRef.current) {
        bagBattleBossPatternRef.current = 'running';
        bagBattleBossRunHitRef.current = false;
        setBagBattleBossPattern('running');
      }

      if (bagBattleBossPatternRef.current === 'running') {
        nextBoss = {
          ...nextBoss,
          x: nextBoss.x + BAG_BATTLE_BOSS_RUN_SPEED * deltaScale,
        };

        const didCollideWithRun =
          !bagBattleBossRunHitRef.current &&
          Math.abs(nextBoss.x - nextPlayer.x) < 8.5 &&
          nextPlayer.y < 12;

        if (didCollideWithRun) {
          bagBattleBossRunHitRef.current = true;
          nextPlayer = {
            ...nextPlayer,
            health: Math.max(0, nextPlayer.health - BAG_BATTLE_BOSS_RUN_DAMAGE),
            x: clamp(nextPlayer.x + 4.2, 26, 94),
            vy: Math.max(nextPlayer.vy, 0.42),
          };
          playerWasHit = true;
        }

        if (nextBoss.x >= 110) {
          nextBoss = { ...nextBoss, x: BAG_BATTLE_BOSS_RETURN_START_X };
          bagBattleBossPatternRef.current = 'returning';
          bagBattleBossRunHitRef.current = false;
          setBagBattleBossPattern('returning');
        }
      }

      if (bagBattleBossPatternRef.current === 'returning') {
        nextBoss = {
          ...nextBoss,
          x: nextBoss.x + BAG_BATTLE_BOSS_RUN_SPEED * deltaScale,
        };

        if (nextBoss.x >= BAG_BATTLE_BOSS_START.x) {
          nextBoss = { ...nextBoss, x: BAG_BATTLE_BOSS_START.x };
          bagBattleBossPatternRef.current = 'shooting';
          bagBattleBossNextPatternRef.current = 'shooting';
          bagBattleBossRestUntilRef.current = frameTime + BAG_BATTLE_BOSS_AFTER_RUN_REST_MS;
          bagBattleLastBossShotRef.current = frameTime;
          setBagBattleBossPattern('shooting');
        }
      }

      if (
        bagBattleBossPatternRef.current === 'shooting' &&
        bagBattleBossNextPatternRef.current === 'shooting' &&
        frameTime >= bagBattleBossRestUntilRef.current &&
        frameTime - bagBattleLastBossShotRef.current >= BAG_BATTLE_BOSS_SHOT_INTERVAL_MS
      ) {
        bagBattleLastBossShotRef.current = frameTime;
        bagBattleBossBurstShotsRef.current += 1;
        if (bagBattleBossBurstShotsRef.current >= BAG_BATTLE_BOSS_BURST_SHOTS) {
          bagBattleBossBurstShotsRef.current = 0;
          bagBattleBossRestUntilRef.current = frameTime + BAG_BATTLE_BOSS_BURST_REST_MS;
          bagBattleBossRestDamageRef.current = 0;
          bagBattleBossNextPatternRef.current = 'running';
        }
        bagBattleBossVulnerableUntilRef.current = Math.max(
          frameTime + BAG_BATTLE_BOSS_VULNERABLE_MS,
          bagBattleBossRestUntilRef.current,
        );
        setIsBagBattleBossVulnerable(true);
        setIsBagBattleBossShooting(true);
        if (bagBattleBossShootingTimer.current) window.clearTimeout(bagBattleBossShootingTimer.current);
        bagBattleBossShootingTimer.current = window.setTimeout(() => {
          bagBattleBossShootingTimer.current = null;
          setIsBagBattleBossShooting(false);
          setBagBattleBossShotLane('mid');
        }, 360);
        const projectileLane = (['high', 'mid', 'low'] as const)[Math.floor(Math.random() * 3)];
        setBagBattleBossShotLane(projectileLane);
        const projectileY = projectileLane === 'high' ? 32 : projectileLane === 'mid' ? 18 : 5;
        nextProjectiles = [
          ...nextProjectiles,
          {
            id: ++bagBattleProjectileIdRef.current,
            x: nextBoss.x + 5.5,
            y: projectileY,
            vx: 0.31 + Math.random() * 0.1,
            vy: 0,
            owner: 'boss',
            lane: projectileLane,
          },
        ];
      }
      if (frameTime >= bagBattleBossVulnerableUntilRef.current) {
        setIsBagBattleBossVulnerable(false);
      }

      const keptProjectiles: BagBattleProjectile[] = [];

      for (const projectile of nextProjectiles) {
        const movedProjectile = {
          ...projectile,
          x: projectile.x + projectile.vx * deltaScale,
          y: projectile.y + projectile.vy * deltaScale,
        };

        if (movedProjectile.x < -6 || movedProjectile.x > 106 || movedProjectile.y < -8 || movedProjectile.y > 76) {
          continue;
        }

        const playerIsCrouching =
          nextPlayer.y <= 0.01 &&
          (bagBattlePressedKeys.current.has('s') || bagBattlePressedKeys.current.has('arrowdown'));
        const bossProjectileLane = movedProjectile.lane ?? 'mid';
        const isPlayerInLane =
          bossProjectileLane === 'high'
            ? nextPlayer.y >= 8
            : bossProjectileLane === 'mid'
              ? !playerIsCrouching && nextPlayer.y < 14
              : nextPlayer.y < 9;

        if (movedProjectile.owner === 'boss' && Math.abs(movedProjectile.x - nextPlayer.x) < 4.2 && isPlayerInLane) {
          if (isBlockingNow) {
            nextPlayer = { ...nextPlayer, health: Math.max(0, nextPlayer.health - 1) };
          } else {
            nextPlayer = { ...nextPlayer, health: Math.max(0, nextPlayer.health - BAG_BATTLE_BOSS_DAMAGE) };
            playerWasHit = true;
          }
          continue;
        }

        keptProjectiles.push(movedProjectile);
      }

      if (playerWasHit) {
        nextPlayer = { ...nextPlayer, x: clamp(nextPlayer.x + 2.6, 26, 94), vy: Math.max(nextPlayer.vy, 0.28) };
      }
      if (bagBattleBossPatternRef.current === 'shooting') {
        nextBoss = { ...nextBoss, x: BAG_BATTLE_BOSS_START.x + Math.sin(frameTime / 700) * 1.6 };
      }

      bagBattlePlayerRef.current = nextPlayer;
      bagBattleBossRef.current = nextBoss;
      bagBattleProjectilesRef.current = keptProjectiles;
      setBagBattlePlayer(nextPlayer);
      setBagBattleBoss(nextBoss);
      setBagBattleProjectiles(keptProjectiles);

      if (nextBoss.health <= 0) {
        setBagBattleResult('won');
        bagBattlePressedKeys.current.clear();
      } else if (nextPlayer.health <= 0) {
        setBagBattleResult('lost');
        bagBattlePressedKeys.current.clear();
      }

      animationFrameId = window.requestAnimationFrame(tickBagBattle);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    animationFrameId = window.requestAnimationFrame(tickBagBattle);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.cancelAnimationFrame(animationFrameId);
      bagBattlePressedKeys.current.clear();
    };
  }, [bagBattleResult, controlBindings, isBagBattleIntro, screen]);

  useEffect(() => {
    const wasPaused = isArenaPausedRef.current;
    const now = window.performance.now();

    if (isArenaPaused && !wasPaused) {
      arenaPauseStartedAtRef.current = now;
      pressedKeys.current.clear();
      pauseGameplayEffectsAudio();
    } else if (!isArenaPaused && wasPaused) {
      const pausedAt = arenaPauseStartedAtRef.current;
      if (pausedAt > 0) {
        shiftArenaClockAfterPause(now - pausedAt, pausedAt);
        arenaPauseStartedAtRef.current = 0;
      }
    }

    isArenaPausedRef.current = isArenaPaused;
  }, [isArenaPaused]);

  useEffect(() => {
    const audio = roaringKnightRoarSoundRef.current;

    if (!audio) return undefined;

    const shouldPlay =
      screen === 'arena' &&
      !isArenaPaused &&
      (playerKnightDarkWaveState === 'holding' || opponentKnightDarkWaveState === 'holding');

    const loopFirstThreeSeconds = () => {
      if (audio.currentTime >= 3) {
        audio.currentTime = 1;
      }
    };

    audio.volume = 0.85 * effectsVolume;
    audio.addEventListener('timeupdate', loopFirstThreeSeconds);

    if (shouldPlay) {
      if (audio.paused) {
        audio.currentTime = 0;
      }
      void audio.play().catch(() => {
        // Browsers can block audio until a user gesture unlocks playback.
      });
    } else {
      audio.pause();
      audio.currentTime = 0;
    }

    return () => {
      audio.removeEventListener('timeupdate', loopFirstThreeSeconds);
    };
  }, [effectsVolume, isArenaPaused, opponentKnightDarkWaveState, playerKnightDarkWaveState, screen]);

  useEffect(() => {
    const audio = knightBirdDriveSoundRef.current;

    if (!audio) return undefined;

    const shouldPlay =
      screen === 'arena' &&
      !isArenaPaused &&
      (playerKnightSpherePhase === 'bird' || opponentKnightSpherePhase === 'bird');

    audio.volume = 0.75 * effectsVolume;
    audio.loop = true;

    if (shouldPlay) {
      if (audio.paused) {
        audio.currentTime = 0;
      }
      void audio.play().catch(() => {
        // Browsers can block audio until a user gesture unlocks playback.
      });
    } else {
      audio.pause();
      audio.currentTime = 0;
    }

    return undefined;
  }, [effectsVolume, isArenaPaused, opponentKnightSpherePhase, playerKnightSpherePhase, screen]);

  useEffect(() => {
    if (countdownTimer.current) {
      window.clearTimeout(countdownTimer.current);
      countdownTimer.current = null;
    }

    if (
      screen !== 'arena' ||
      isArenaPaused ||
      roundCurtainPhase !== 'idle' ||
      roundCountdown <= 0 ||
      playerHealth <= 0 ||
      opponentHealth <= 0
    ) {
      return undefined;
    }

    playBufferedSound(
      `countdown${roundCountdown}` as BufferedSoundId,
      countdownSoundRefs.current[roundCountdown as 1 | 2 | 3],
      0.9,
    );

    countdownTimer.current = window.setTimeout(() => {
      setRoundCountdown((countdown) => Math.max(0, countdown - 1));
    }, ROUND_COUNTDOWN_STEP_MS);

    return () => {
      if (countdownTimer.current) {
        window.clearTimeout(countdownTimer.current);
        countdownTimer.current = null;
      }
    };
  }, [isArenaPaused, opponentHealth, playerHealth, roundCountdown, roundCurtainPhase, screen]);

  useEffect(() => {
    if (roundClockTimer.current) {
      window.clearInterval(roundClockTimer.current);
      roundClockTimer.current = null;
    }

    if (
      screen !== 'arena' ||
      arenaMode === 'sandbox' ||
      isArenaPaused ||
      roundCurtainPhase !== 'idle' ||
      roundCountdown > 0 ||
      roundResolvedRef.current ||
      playerHealth <= 0 ||
      opponentHealth <= 0 ||
      roundTimeLeft <= 0
    ) {
      return undefined;
    }

    roundClockTimer.current = window.setInterval(() => {
      setRoundTimeLeft((timeLeft) => Math.max(0, timeLeft - 1));
    }, 1000);

    return () => {
      if (roundClockTimer.current) {
        window.clearInterval(roundClockTimer.current);
        roundClockTimer.current = null;
      }
    };
  }, [
    arenaMode,
    isArenaPaused,
    opponentHealth,
    playerHealth,
    roundCountdown,
    roundCurtainPhase,
    roundTimeLeft,
    screen,
  ]);

  function flashDamage(target: FighterSide) {
    if (target === 'left') {
      setPlayerDamageFlash(false);
      if (playerDamageFlashTimer.current) window.clearTimeout(playerDamageFlashTimer.current);

      window.requestAnimationFrame(() => {
        setPlayerDamageFlash(true);
        playerDamageFlashTimer.current = window.setTimeout(() => {
          setPlayerDamageFlash(false);
        }, 250);
      });
      return;
    }

    setOpponentDamageFlash(false);
    if (opponentDamageFlashTimer.current) window.clearTimeout(opponentDamageFlashTimer.current);

    window.requestAnimationFrame(() => {
      setOpponentDamageFlash(true);
      opponentDamageFlashTimer.current = window.setTimeout(() => {
        setOpponentDamageFlash(false);
      }, 250);
    });
  }

  function spawnHealPopup(target: FighterSide) {
    const position = target === 'left' ? positionRef.current : opponentPositionRef.current;
    const nextPopup: HealPopup = {
      id: healPopupIdRef.current,
      side: target,
      x: position.x,
      y: position.y,
    };

    healPopupIdRef.current += 1;
    playQueenHealSound();
    setHealPopups((popups) => [...popups, nextPopup]);
    window.setTimeout(() => {
      setHealPopups((popups) => popups.filter((popup) => popup.id !== nextPopup.id));
    }, HEAL_POPUP_MS);
  }

  function healFighter(target: FighterSide) {
    if (isArenaPausedRef.current) return;

    if (target === 'left') {
      setPlayerHealth((health) => {
        const nextHealth = clamp(health + QUEEN_HEAL_PER_TICK, 0, MAX_HEALTH);
        playerHealthRef.current = nextHealth;
        return nextHealth;
      });
      spawnHealPopup('left');
      spawnProjectile(
        'left',
        positionRef.current.x,
        opponentPositionRef.current.x >= positionRef.current.x ? 1 : -1,
        'low',
        'queen-heal-wave',
      );
      return;
    }

    if (arenaMode === 'sandbox') return;

    setOpponentHealth((health) => {
      const nextHealth = clamp(health + QUEEN_HEAL_PER_TICK, 0, MAX_HEALTH);
      rememberAiOutcome('heal', nextHealth > health, nextHealth > health ? 0.8 : 0.35);
      opponentHealthRef.current = nextHealth;
      return nextHealth;
    });
    spawnHealPopup('right');
    spawnProjectile(
      'right',
      opponentPositionRef.current.x,
      positionRef.current.x >= opponentPositionRef.current.x ? 1 : -1,
      'low',
      'queen-heal-wave',
    );
  }

  function stopQueenHeal(target: FighterSide) {
    if (target === 'left') {
      if (playerHealTimer.current) window.clearTimeout(playerHealTimer.current);
      if (playerHealInterval.current) window.clearInterval(playerHealInterval.current);
      playerHealTimer.current = null;
      playerHealInterval.current = null;
      playerSpecialLockRef.current = false;
      if (playerStatusRef.current === 'healing') updatePlayerStatus('idle');
      return;
    }

    if (opponentHealTimer.current) window.clearTimeout(opponentHealTimer.current);
    if (opponentHealInterval.current) window.clearInterval(opponentHealInterval.current);
    opponentHealTimer.current = null;
    opponentHealInterval.current = null;
    opponentSpecialLockRef.current = false;
    if (opponentStatusRef.current === 'healing') updateOpponentStatus('idle');
  }

  function startQueenHeal(target: FighterSide) {
    stopQueenHeal(target);

    if (target === 'left') {
      playerSpecialLockRef.current = true;
      updatePlayerStatus('healing');
      playerHealInterval.current = window.setInterval(() => healFighter('left'), QUEEN_HEAL_TICK_MS);
      playerHealTimer.current = window.setTimeout(() => stopQueenHeal('left'), QUEEN_HEAL_DURATION_MS);
      return;
    }

    opponentSpecialLockRef.current = true;
    updateOpponentBlock(false);
    updateOpponentCrouch(false);
    updateOpponentStatus('healing');
    opponentHealInterval.current = window.setInterval(() => healFighter('right'), QUEEN_HEAL_TICK_MS);
    opponentHealTimer.current = window.setTimeout(() => stopQueenHeal('right'), QUEEN_HEAL_DURATION_MS);
  }

  function isPlayerLowProfile() {
    return (
      (isAlwaysCrouchingFighter(player) && positionRef.current.y === 0 && playerStatusRef.current === 'idle') ||
      (canFighterCrouch(player) && pressedKeys.current.has('s') && positionRef.current.y === 0) ||
      (player.id === 'queen' && playerStatusRef.current === 'healing')
    );
  }

  function isOpponentLowProfile() {
    return (
      (isAlwaysCrouchingFighter(opponent) && opponentPositionRef.current.y === 0 && opponentStatusRef.current === 'idle') ||
      opponentCrouchingRef.current ||
      (opponent.id === 'queen' && opponentStatusRef.current === 'healing')
    );
  }

  function setPlayerChargeState(nextState: ChargeAttackState) {
    playerChargeAttackStateRef.current = nextState;
    setPlayerChargeAttackState(nextState);
  }

  function setOpponentChargeState(nextState: ChargeAttackState) {
    opponentChargeAttackStateRef.current = nextState;
    setOpponentChargeAttackState(nextState);
  }

  function updatePlayerKnightDarkWaveState(nextState: KnightDarkWaveState) {
    playerKnightDarkWaveStateRef.current = nextState;
    setPlayerKnightDarkWaveState(nextState);
  }

  function updateOpponentKnightDarkWaveState(nextState: KnightDarkWaveState) {
    opponentKnightDarkWaveStateRef.current = nextState;
    setOpponentKnightDarkWaveState(nextState);
  }

  function resetKnightDarkWaveInput() {
    knightDarkWaveInputStep.current = 0;
    knightDarkWaveInputExpiresAt.current = 0;
    knightDarkWaveInputStartedAt.current = 0;
  }

  function clearKnightExplosionTimers() {
    knightExplosionTimers.current.forEach((timer) => window.clearTimeout(timer));
    knightExplosionTimers.current = [];
  }

  function spawnKnightExplosion(side: FighterSide, position: Position) {
    const id = knightExplosionIdRef.current;
    knightExplosionIdRef.current += 1;
    setKnightExplosions((explosions) => [...explosions, { id, side, position }]);

    const timer = window.setTimeout(() => {
      setKnightExplosions((explosions) => explosions.filter((explosion) => explosion.id !== id));
      knightExplosionTimers.current = knightExplosionTimers.current.filter(
        (storedTimer) => storedTimer !== timer,
      );
    }, KNIGHT_DARK_WAVE_EXPLOSION_MS);
    knightExplosionTimers.current.push(timer);
  }

  function applyPlayerHealthDamage(damage: number) {
    if (player.id === 'jevil' && playerJevilAbsorbActiveRef.current && damage > 0) {
      playerJevilAbsorbDamageRef.current += damage;
    }

    setPlayerHealth((health) => {
      const nextHealth = clamp(health - damage, 0, MAX_HEALTH);
      const restoredHealth = arenaMode === 'sandbox' && nextHealth <= 0 ? MAX_HEALTH : nextHealth;
      playerHealthRef.current = restoredHealth;
      return restoredHealth;
    });
  }

  function damagePlayerDirect(damage: number) {
    flashDamage('left');
    applyPlayerHealthDamage(damage);
  }

  function explodeKnightDarkWave(side: FighterSide) {
    const isPlayerExplosion = side === 'left';
    const explosionPosition = isPlayerExplosion ? positionRef.current : opponentPositionRef.current;

    spawnKnightExplosion(side, explosionPosition);

    if (isPlayerExplosion) {
      cancelPlayerKnightDarkWave();
      damagePlayerDirect(KNIGHT_DARK_WAVE_SELF_DAMAGE);
    } else {
      cancelOpponentKnightDarkWave();
      flashDamage('right');
      applyOpponentHealthDamage(KNIGHT_DARK_WAVE_SELF_DAMAGE);
    }
  }

  function tickKnightDarkWaveOverheat(side: FighterSide) {
    const isPlayerWave = side === 'left';
    const stateRef = isPlayerWave ? playerKnightDarkWaveStateRef : opponentKnightDarkWaveStateRef;
    const startedAt = isPlayerWave
      ? playerKnightDarkWaveStartedAt.current
      : opponentKnightDarkWaveStartedAt.current;

    if (stateRef.current !== 'holding' || startedAt <= 0) return false;

    const elapsedMs = window.performance.now() - startedAt;
    if (elapsedMs >= KNIGHT_DARK_WAVE_OVERHEAT_WARNING_MS) {
      if (isPlayerWave) {
        setPlayerKnightDarkWaveOverheated(true);
      } else {
        setOpponentKnightDarkWaveOverheated(true);
      }
    }

    if (elapsedMs < KNIGHT_DARK_WAVE_EXPLODE_MS) return false;

    explodeKnightDarkWave(side);
    return true;
  }

  function cancelPlayerKnightDarkWave() {
    if (playerKnightDarkWaveTimer.current) {
      window.clearInterval(playerKnightDarkWaveTimer.current);
      playerKnightDarkWaveTimer.current = null;
    }

    resetKnightDarkWaveInput();
    playerKnightDarkWaveStartedAt.current = 0;
    opponentInsidePlayerKnightDarkWaveStartedAt.current = 0;
    playerSpecialLockRef.current = false;
    setPlayerKnightDarkWaveOverheated(false);
    updatePlayerKnightDarkWaveState('idle');
  }

  function cancelOpponentKnightDarkWave() {
    if (opponentKnightDarkWaveTimer.current) {
      window.clearInterval(opponentKnightDarkWaveTimer.current);
      opponentKnightDarkWaveTimer.current = null;
    }

    opponentKnightDarkWaveStartedAt.current = 0;
    playerInsideOpponentKnightDarkWaveStartedAt.current = 0;
    opponentSpecialLockRef.current = false;
    setOpponentKnightDarkWaveOverheated(false);
    updateOpponentKnightDarkWaveState('idle');
  }

  function getKnightDarkWaveTickDamage(contactStartedAt: number) {
    const contactMs = Math.max(0, window.performance.now() - contactStartedAt);
    const rampMs = Math.max(0, contactMs - KNIGHT_DARK_WAVE_DAMAGE_RAMP_DELAY_MS);
    const rampSteps = Math.floor(rampMs / KNIGHT_DARK_WAVE_DAMAGE_RAMP_STEP_MS);
    const damagePerSecond = KNIGHT_DARK_WAVE_DAMAGE_PER_SECOND + rampSteps * KNIGHT_DARK_WAVE_DAMAGE_RAMP_PER_STEP;

    return damagePerSecond / (1000 / KNIGHT_DARK_WAVE_TICK_MS);
  }

  function getKnightDarkWaveReach(ageMs: number) {
    const progress = clamp(ageMs / KNIGHT_DARK_WAVE_RING_DURATION_MS, 0, 1);

    if (progress < 0.06) return KNIGHT_DARK_WAVE_RING_MAX_RANGE * 0.18 * (progress / 0.06);
    if (progress < 0.34) {
      const localProgress = (progress - 0.06) / 0.28;
      return KNIGHT_DARK_WAVE_RING_MAX_RANGE * (0.18 + (0.34 - 0.18) * localProgress);
    }
    if (progress < 0.72) {
      const localProgress = (progress - 0.34) / 0.38;
      return KNIGHT_DARK_WAVE_RING_MAX_RANGE * (0.34 + (0.72 - 0.34) * localProgress);
    }

    const localProgress = (progress - 0.72) / 0.28;
    return KNIGHT_DARK_WAVE_RING_MAX_RANGE * (0.72 + (1 - 0.72) * localProgress);
  }

  function isOpponentInsideActiveKnightDarkWave() {
    if (playerKnightDarkWaveStateRef.current !== 'holding') return false;

    const elapsedMs = window.performance.now() - playerKnightDarkWaveStartedAt.current;
    const horizontalDistance = Math.abs(opponentPositionRef.current.x - positionRef.current.x);
    const verticalDistance = Math.abs(opponentPositionRef.current.y - positionRef.current.y);
    const distanceToOpponent = Math.hypot(horizontalDistance, verticalDistance * 0.35);
    const visibleRingCount = Math.ceil(KNIGHT_DARK_WAVE_RING_DURATION_MS / KNIGHT_DARK_WAVE_RING_INTERVAL_MS);

    for (let index = 0; index < visibleRingCount; index += 1) {
      const ringDelayMs = index * KNIGHT_DARK_WAVE_RING_INTERVAL_MS;
      if (elapsedMs < ringDelayMs) continue;

      const ringAgeMs = (elapsedMs - ringDelayMs) % KNIGHT_DARK_WAVE_RING_DURATION_MS;
      if (distanceToOpponent <= getKnightDarkWaveReach(ringAgeMs)) return true;
    }

    return false;
  }

  function isPlayerInsideActiveOpponentKnightDarkWave() {
    if (opponentKnightDarkWaveStateRef.current !== 'holding') return false;

    const elapsedMs = window.performance.now() - opponentKnightDarkWaveStartedAt.current;
    const horizontalDistance = Math.abs(positionRef.current.x - opponentPositionRef.current.x);
    const verticalDistance = Math.abs(positionRef.current.y - opponentPositionRef.current.y);
    const distanceToPlayer = Math.hypot(horizontalDistance, verticalDistance * 0.35);
    const visibleRingCount = Math.ceil(KNIGHT_DARK_WAVE_RING_DURATION_MS / KNIGHT_DARK_WAVE_RING_INTERVAL_MS);

    for (let index = 0; index < visibleRingCount; index += 1) {
      const ringDelayMs = index * KNIGHT_DARK_WAVE_RING_INTERVAL_MS;
      if (elapsedMs < ringDelayMs) continue;

      const ringAgeMs = (elapsedMs - ringDelayMs) % KNIGHT_DARK_WAVE_RING_DURATION_MS;
      if (distanceToPlayer <= getKnightDarkWaveReach(ringAgeMs)) return true;
    }

    return false;
  }

  function applyOpponentHealthDamage(damage: number) {
    if (opponent.id === 'jevil' && opponentJevilAbsorbActiveRef.current && damage > 0) {
      opponentJevilAbsorbDamageRef.current += damage;
    }

    setOpponentHealth((health) => {
      const nextHealth = clamp(health - damage, 0, MAX_HEALTH);
      const restoredHealth = arenaMode === 'sandbox' && nextHealth <= 0 ? MAX_HEALTH : nextHealth;
      opponentHealthRef.current = restoredHealth;
      return restoredHealth;
    });
  }

  function damageOpponentFromKnightDarkWave() {
    if (isArenaPausedRef.current || roundResolvedRef.current || roundCountdownRef.current > 0) return;
    if (opponentHealthRef.current <= 0 || opponentStatusRef.current === 'knockdown') return;

    if (!isOpponentInsideActiveKnightDarkWave()) {
      opponentInsidePlayerKnightDarkWaveStartedAt.current = 0;
      return;
    }

    if (opponentInsidePlayerKnightDarkWaveStartedAt.current === 0) {
      opponentInsidePlayerKnightDarkWaveStartedAt.current = window.performance.now();
    }

    const tickDamage = getKnightDarkWaveTickDamage(opponentInsidePlayerKnightDarkWaveStartedAt.current);

    applyOpponentHealthDamage(tickDamage);

    if (opponentKnightDarkWaveStateRef.current === 'holding') {
      cancelOpponentKnightDarkWave();
    }

    const knockbackDirection = opponentPositionRef.current.x >= positionRef.current.x ? 1 : -1;
    opponentKnockbackVelocity.current += knockbackDirection * KNIGHT_DARK_WAVE_KNOCKBACK;
  }

  function damagePlayerFromOpponentKnightDarkWave() {
    if (isArenaPausedRef.current || roundResolvedRef.current || roundCountdownRef.current > 0) return;
    if (playerHealthRef.current <= 0 || playerStatusRef.current === 'knockdown') return;
    if (!isPlayerInsideActiveOpponentKnightDarkWave()) {
      playerInsideOpponentKnightDarkWaveStartedAt.current = 0;
      return;
    }

    if (playerInsideOpponentKnightDarkWaveStartedAt.current === 0) {
      playerInsideOpponentKnightDarkWaveStartedAt.current = window.performance.now();
    }

    const tickDamage = getKnightDarkWaveTickDamage(playerInsideOpponentKnightDarkWaveStartedAt.current);

    flashDamage('left');
    applyPlayerHealthDamage(tickDamage);

    if (playerKnightDarkWaveStateRef.current === 'holding') {
      cancelPlayerKnightDarkWave();
    }

    const knockbackDirection = positionRef.current.x >= opponentPositionRef.current.x ? 1 : -1;
    playerKnockbackVelocity.current += knockbackDirection * KNIGHT_DARK_WAVE_KNOCKBACK;
  }

  function startPlayerKnightDarkWaveHold(direction: -1 | 1) {
    if (
      player.id !== 'roaring-knight' ||
      window.performance.now() < specialReadyAt.current ||
      playerKnightDarkWaveStateRef.current !== 'idle' ||
      playerSpecialLockRef.current ||
      playerBlockHeldRef.current ||
      attackRef.current !== 'idle' ||
      playerStatusRef.current !== 'idle' ||
      knightSpherePhaseRef.current !== 'idle' ||
      opponentHealthRef.current <= 0 ||
      roundCountdownRef.current > 0 ||
      roundResolvedRef.current
    ) return false;

    cancelPlayerChargeAttack();
    stopPlayerBlock();
    pressedKeys.current.clear();
    playerKnockbackVelocity.current = 0;
    playerSpecialLockRef.current = true;
    playerKnightDarkWaveStartedAt.current = window.performance.now();
    opponentInsidePlayerKnightDarkWaveStartedAt.current = 0;
    playerKnightDarkWaveDirectionRef.current = direction;
    setPlayerKnightDarkWaveOverheated(false);
    setPlayerKnightDarkWaveDirection(direction);
    updatePlayerKnightDarkWaveState('holding');

    if (playerKnightDarkWaveTimer.current) window.clearInterval(playerKnightDarkWaveTimer.current);
    playerKnightDarkWaveTimer.current = window.setInterval(() => {
      if (tickKnightDarkWaveOverheat('left')) return;
      damageOpponentFromKnightDarkWave();
    }, KNIGHT_DARK_WAVE_TICK_MS);

    return true;
  }

  function releasePlayerKnightDarkWave() {
    if (playerKnightDarkWaveStateRef.current !== 'holding') return false;

    if (playerKnightDarkWaveTimer.current) {
      window.clearInterval(playerKnightDarkWaveTimer.current);
      playerKnightDarkWaveTimer.current = null;
    }

    playerKnightDarkWaveStartedAt.current = 0;
    opponentInsidePlayerKnightDarkWaveStartedAt.current = 0;
    playerSpecialLockRef.current = false;
    setPlayerKnightDarkWaveOverheated(false);
    specialReadyAt.current = window.performance.now() + KNIGHT_DARK_WAVE_COOLDOWN_MS;
    updatePlayerKnightDarkWaveState('idle');
    return true;
  }

  function startOpponentKnightDarkWaveHold(options: { ignoreCooldown?: boolean } = {}) {
    if (
      opponent.id !== 'roaring-knight' ||
      (!options.ignoreCooldown && window.performance.now() < opponentSpecialReadyAt.current) ||
      opponentKnightDarkWaveStateRef.current !== 'idle' ||
      opponentSpecialLockRef.current ||
      opponentAttackRef.current !== 'idle' ||
      opponentStatusRef.current !== 'idle' ||
      playerHealthRef.current <= 0 ||
      roundCountdownRef.current > 0 ||
      roundResolvedRef.current
    ) return false;

    resetOpponentAttackAnimation();
    opponentJumpVelocity.current = 0;
    opponentKnockbackVelocity.current = 0;
    opponentSpecialLockRef.current = true;
    opponentKnightDarkWaveStartedAt.current = window.performance.now();
    playerInsideOpponentKnightDarkWaveStartedAt.current = 0;
    opponentKnightDarkWaveDirectionRef.current = positionRef.current.x >= opponentPositionRef.current.x ? 1 : -1;
    setOpponentKnightDarkWaveOverheated(false);
    updateOpponentKnightDarkWaveState('holding');

    if (opponentKnightDarkWaveTimer.current) window.clearInterval(opponentKnightDarkWaveTimer.current);
    opponentKnightDarkWaveTimer.current = window.setInterval(() => {
      if (tickKnightDarkWaveOverheat('right')) return;
      damagePlayerFromOpponentKnightDarkWave();
    }, KNIGHT_DARK_WAVE_TICK_MS);

    return true;
  }

  function stopKnightSphereHealthDrain(target: FighterSide = 'left') {
    if (target === 'right') {
      if (!opponentKnightSphereDrainInterval.current) return;

      window.clearInterval(opponentKnightSphereDrainInterval.current);
      opponentKnightSphereDrainInterval.current = null;
      return;
    }

    if (!playerKnightSphereDrainInterval.current) return;

    window.clearInterval(playerKnightSphereDrainInterval.current);
    playerKnightSphereDrainInterval.current = null;
  }

  function startKnightSphereHealthDrain(target: FighterSide = 'left') {
    if (target === 'right') {
      if (opponentKnightSphereDrainInterval.current) return;

      opponentKnightSphereDrainInterval.current = window.setInterval(() => {
        if (isArenaPausedRef.current) return;

        if (
          opponent.id !== 'roaring-knight' ||
          opponentKnightSpherePhaseRef.current !== 'active' ||
          roundResolvedRef.current ||
          roundCountdownRef.current > 0
        ) {
          stopKnightSphereHealthDrain('right');
          return;
        }

        setOpponentHealth((health) => {
          const nextHealth = clamp(health - KNIGHT_SPHERE_HEALTH_DRAIN, 0, MAX_HEALTH);
          opponentHealthRef.current = nextHealth;

          if (nextHealth <= 0) {
            stopKnightSphereHealthDrain('right');
          }

          return nextHealth;
        });
      }, KNIGHT_SPHERE_HEALTH_DRAIN_MS);
      return;
    }

    if (playerKnightSphereDrainInterval.current) return;

    playerKnightSphereDrainInterval.current = window.setInterval(() => {
      if (isArenaPausedRef.current) return;

      if (
        player.id !== 'roaring-knight' ||
        knightSpherePhaseRef.current !== 'active' ||
        roundResolvedRef.current ||
        roundCountdownRef.current > 0
      ) {
        stopKnightSphereHealthDrain();
        return;
      }

      setPlayerHealth((health) => {
        const nextHealth = clamp(health - KNIGHT_SPHERE_HEALTH_DRAIN, 0, MAX_HEALTH);
        const restoredHealth = arenaMode === 'sandbox' && nextHealth <= 0 ? MAX_HEALTH : nextHealth;
        playerHealthRef.current = restoredHealth;

        if (nextHealth <= 0) {
          stopKnightSphereHealthDrain();
        }

        return restoredHealth;
      });
    }, KNIGHT_SPHERE_HEALTH_DRAIN_MS);
  }

  function setKnightSpherePhase(nextPhase: KnightSpherePhase, target: FighterSide = 'left') {
    if (target === 'right') {
      opponentKnightSpherePhaseRef.current = nextPhase;
      opponentKnightSpherePhaseStartedAt.current = window.performance.now();
      setOpponentKnightSpherePhase(nextPhase);

      if (nextPhase === 'active') {
        startKnightSphereHealthDrain('right');
      } else {
        stopKnightSphereHealthDrain('right');
      }
      return;
    }

    knightSpherePhaseRef.current = nextPhase;
    playerKnightSpherePhaseStartedAt.current = window.performance.now();
    setPlayerKnightSpherePhase(nextPhase);

    if (nextPhase === 'active') {
      startKnightSphereHealthDrain();
    } else {
      stopKnightSphereHealthDrain();
    }
  }

  function isPlayerKnightSphereActive() {
    return player.id === 'roaring-knight' && knightSpherePhaseRef.current === 'active';
  }

  function isOpponentKnightSphereActive() {
    return opponent.id === 'roaring-knight' && opponentKnightSpherePhaseRef.current === 'active';
  }

  function isPlayerKnightDarkWaveHolding() {
    return player.id === 'roaring-knight' && playerKnightDarkWaveStateRef.current === 'holding';
  }

  function isPlayerKnightLowAttackImmune() {
    return (
      player.id === 'roaring-knight' &&
      (
        playerKnightDarkWaveStateRef.current === 'holding' ||
        playerChargeAttackStateRef.current !== 'idle' ||
        knightSpherePhaseRef.current !== 'idle'
      )
    );
  }

  function isOpponentKnightLowAttackImmune() {
    return (
      opponent.id === 'roaring-knight' &&
      (
        opponentKnightDarkWaveStateRef.current === 'holding' ||
        opponentChargeAttackStateRef.current !== 'idle' ||
        opponentKnightSpherePhaseRef.current !== 'idle'
      )
    );
  }

  function isPlayerKnightSpecialHurtboxExpanded() {
    return (
      player.id === 'roaring-knight' &&
      (
        playerKnightDarkWaveStateRef.current === 'holding' ||
        playerChargeAttackStateRef.current !== 'idle' ||
        knightSpherePhaseRef.current !== 'idle'
      )
    );
  }

  function isOpponentKnightSpecialHurtboxExpanded() {
    return (
      opponent.id === 'roaring-knight' &&
      (
        opponentKnightDarkWaveStateRef.current === 'holding' ||
        opponentChargeAttackStateRef.current !== 'idle' ||
        opponentKnightSpherePhaseRef.current !== 'idle'
      )
    );
  }

  function isOpponentCounterwalkingKnightDarkWave() {
    if (!isPlayerKnightDarkWaveHolding() || arenaMode !== 'fight') return false;
    if (!isOpponentInsideActiveKnightDarkWave()) return false;
    if (
      opponentStatusRef.current !== 'idle' ||
      opponentAttackRef.current !== 'idle' ||
      opponentSpecialLockRef.current ||
      opponentBlockingRef.current ||
      opponentCrouchingRef.current ||
      opponentPositionRef.current.y > 0
    ) return false;

    const distanceToPlayer = positionRef.current.x - opponentPositionRef.current.x;
    const directionToPlayer = Math.sign(distanceToPlayer);
    const knockbackDirection = opponentPositionRef.current.x >= positionRef.current.x ? 1 : -1;
    const ai = AI_CONFIG[selectedDifficulty];

    return (
      Math.abs(distanceToPlayer) > ai.preferredRange &&
      directionToPlayer === -knockbackDirection
    );
  }

  function isPlayerCounterwalkingOpponentKnightDarkWave() {
    if (opponentKnightDarkWaveStateRef.current !== 'holding' || arenaMode !== 'fight') return false;
    if (!isPlayerInsideActiveOpponentKnightDarkWave()) return false;
    if (
      playerStatusRef.current !== 'idle' ||
      attackRef.current !== 'idle' ||
      playerSpecialLockRef.current ||
      playerBlockHeldRef.current ||
      positionRef.current.y > 0
    ) return false;

    const distanceToOpponent = opponentPositionRef.current.x - positionRef.current.x;
    const directionToOpponent = Math.sign(distanceToOpponent);
    const knockbackDirection = positionRef.current.x >= opponentPositionRef.current.x ? 1 : -1;
    const isWalkingTowardOpponent =
      (directionToOpponent < 0 && pressedKeys.current.has('a')) ||
      (directionToOpponent > 0 && pressedKeys.current.has('d'));

    return isWalkingTowardOpponent && directionToOpponent === -knockbackDirection;
  }

  function resetKnightSphereInput() {
    knightSphereInputStep.current = 0;
    knightSphereInputExpiresAt.current = 0;
    knightSphereInputStartedAt.current = 0;
  }

  function resetPlayerKnightSphere() {
    if (playerKnightSphereTimer.current) {
      window.clearTimeout(playerKnightSphereTimer.current);
      playerKnightSphereTimer.current = null;
    }

    resetKnightSphereInput();
    playerKnightBirdDashHitRef.current = false;
    setKnightSpherePhase('idle');
    playerSpecialLockRef.current = false;
  }

  function resetOpponentKnightSphere() {
    if (opponentKnightSphereTimer.current) {
      window.clearTimeout(opponentKnightSphereTimer.current);
      opponentKnightSphereTimer.current = null;
    }

    opponentKnightBirdDashHitRef.current = false;
    opponentKnightSpherePlanRef.current = 'none';
    opponentKnightSphereExitFollowupRef.current = null;
    setKnightSpherePhase('idle', 'right');
    opponentSpecialLockRef.current = false;
  }

  function startPlayerKnightSphere() {
    if (
      player.id !== 'roaring-knight' ||
      knightSpherePhaseRef.current !== 'idle' ||
      playerSpecialLockRef.current ||
      playerBlockHeldRef.current ||
      attackRef.current !== 'idle' ||
      playerStatusRef.current !== 'idle' ||
      roundCountdownRef.current > 0 ||
      roundResolvedRef.current
    ) return false;

    cancelPlayerChargeAttack();
    stopPlayerBlock();
    jumpVelocity.current = 0;
    playerSpecialLockRef.current = true;
    setKnightSpherePhase('entering');
    playKnightSphereTransformSound();

    if (playerKnightSphereTimer.current) window.clearTimeout(playerKnightSphereTimer.current);
    playerKnightSphereTimer.current = window.setTimeout(() => {
      playerKnightSphereTimer.current = null;
      playerSpecialLockRef.current = false;
      setKnightSpherePhase('active');
    }, KNIGHT_SPHERE_TRANSFORM_MS);

    return true;
  }

  function stopPlayerKnightSphere() {
    if (knightSpherePhaseRef.current !== 'active') return false;

    playerSpecialLockRef.current = true;
    setKnightSpherePhase('exiting');
    playKnightSphereTransformSound();

    if (playerKnightSphereTimer.current) window.clearTimeout(playerKnightSphereTimer.current);
    playerKnightSphereTimer.current = window.setTimeout(() => {
      playerKnightSphereTimer.current = null;
      playerSpecialLockRef.current = false;
      setKnightSpherePhase('idle');
    }, KNIGHT_SPHERE_TRANSFORM_MS);

    return true;
  }

  function stopOpponentKnightSphere(
    followup: Exclude<OpponentKnightSpherePlan, 'none' | 'bird'> | null = null,
  ) {
    if (opponentKnightSpherePhaseRef.current !== 'active') return false;

    opponentSpecialLockRef.current = true;
    opponentKnightSpherePlanRef.current = 'none';
    opponentKnightSphereExitFollowupRef.current = followup;
    setKnightSpherePhase('exiting', 'right');
    playKnightSphereTransformSound();

    if (opponentKnightSphereTimer.current) window.clearTimeout(opponentKnightSphereTimer.current);
    opponentKnightSphereTimer.current = window.setTimeout(() => {
      const queuedFollowup = opponentKnightSphereExitFollowupRef.current;
      opponentKnightSphereTimer.current = null;
      opponentSpecialLockRef.current = false;
      setKnightSpherePhase('idle', 'right');
      opponentKnightSphereExitFollowupRef.current = null;

      if (queuedFollowup) {
        opponentJumpVelocity.current = Math.min(opponentJumpVelocity.current, -0.18);

        if (queuedFollowup === 'air-charge') {
          startOpponentChargeAttack(selectedDifficulty === 'hard' ? 1850 : 1200, {
            allowAir: true,
            ignoreCooldown: true,
          });
          return;
        }

        startOpponentKnightDarkWaveHold({ ignoreCooldown: true });
        return;
      }

      opponentSpecialReadyAt.current = window.performance.now() + SPECIAL_COOLDOWN_MS;
    }, KNIGHT_SPHERE_TRANSFORM_MS);

    return true;
  }

  function startOpponentKnightSphere(plan: OpponentKnightSpherePlan = 'none') {
    if (
      opponent.id !== 'roaring-knight' ||
      opponentKnightSpherePhaseRef.current !== 'idle' ||
      opponentSpecialLockRef.current ||
      opponentAttackRef.current !== 'idle' ||
      opponentStatusRef.current !== 'idle' ||
      roundCountdownRef.current > 0 ||
      roundResolvedRef.current
    ) return false;

    resetOpponentAttackAnimation();
    opponentJumpVelocity.current = 0;
    opponentKnockbackVelocity.current = 0;
    opponentSpecialLockRef.current = true;
    opponentKnightSpherePlanRef.current = plan;
    setKnightSpherePhase('entering', 'right');
    playKnightSphereTransformSound();

    if (opponentKnightSphereTimer.current) window.clearTimeout(opponentKnightSphereTimer.current);
    opponentKnightSphereTimer.current = window.setTimeout(() => {
      opponentKnightSphereTimer.current = null;
      opponentSpecialLockRef.current = false;
      setKnightSpherePhase('active', 'right');
    }, KNIGHT_SPHERE_TRANSFORM_MS);

    return true;
  }

  function startPlayerKnightBirdDash(direction: -1 | 1) {
    if (
      player.id !== 'roaring-knight' ||
      knightSpherePhaseRef.current !== 'active' ||
      playerStatusRef.current !== 'idle' ||
      opponentHealthRef.current <= 0 ||
      roundCountdownRef.current > 0 ||
      roundResolvedRef.current
    ) return false;

    pressedKeys.current.clear();
    jumpVelocity.current = 0;
    playerKnockbackVelocity.current = 0;
    playerKnightBirdDashDirection.current = direction;
    playerKnightBirdDashHitRef.current = false;
    playerSpecialLockRef.current = true;
    setKnightSpherePhase('bird-transform');

    if (playerKnightSphereTimer.current) window.clearTimeout(playerKnightSphereTimer.current);
    playerKnightSphereTimer.current = window.setTimeout(() => {
      playerKnightSphereTimer.current = null;

      if (
        player.id === 'roaring-knight' &&
        knightSpherePhaseRef.current === 'bird-transform' &&
        !roundResolvedRef.current &&
        roundCountdownRef.current <= 0
      ) {
        setKnightSpherePhase('bird');
      }
    }, KNIGHT_BIRD_TRANSFORM_MS);

    return true;
  }

  function startOpponentKnightBirdDash(direction: -1 | 1) {
    if (
      opponent.id !== 'roaring-knight' ||
      opponentKnightSpherePhaseRef.current !== 'active' ||
      opponentStatusRef.current !== 'idle' ||
      playerHealthRef.current <= 0 ||
      roundCountdownRef.current > 0 ||
      roundResolvedRef.current
    ) return false;

    opponentJumpVelocity.current = 0;
    opponentKnockbackVelocity.current = 0;
    opponentKnightBirdDashDirection.current = direction;
    opponentKnightBirdDashHitRef.current = false;
    opponentSpecialLockRef.current = true;
    setKnightSpherePhase('bird-transform', 'right');

    if (opponentKnightSphereTimer.current) window.clearTimeout(opponentKnightSphereTimer.current);
    opponentKnightSphereTimer.current = window.setTimeout(() => {
      opponentKnightSphereTimer.current = null;

      if (
        opponent.id === 'roaring-knight' &&
        opponentKnightSpherePhaseRef.current === 'bird-transform' &&
        !roundResolvedRef.current &&
        roundCountdownRef.current <= 0
      ) {
        setKnightSpherePhase('bird', 'right');
      }
    }, KNIGHT_BIRD_TRANSFORM_MS);

    return true;
  }

  function cancelPlayerChargeAttack() {
    if (playerChargeAttackStateRef.current === 'idle') return;

    if (playerChargeAttackTimer.current) {
      window.clearTimeout(playerChargeAttackTimer.current);
      playerChargeAttackTimer.current = null;
    }

    if (playerChargeDamageTimer.current) {
      window.clearTimeout(playerChargeDamageTimer.current);
      playerChargeDamageTimer.current = null;
    }

    if (playerChargeAuraTimer.current) {
      window.clearTimeout(playerChargeAuraTimer.current);
      playerChargeAuraTimer.current = null;
    }

    playerChargeAttackStartedAt.current = 0;
    playerChargeReleaseStartedAt.current = 0;
    setPlayerChargeAuraActive(false);
    playerSpecialLockRef.current = false;
    setPlayerChargeState('idle');
  }

  function cancelOpponentChargeAttack() {
    if (opponentChargeAttackStateRef.current === 'idle') return;

    if (opponentChargeAttackTimer.current) {
      window.clearTimeout(opponentChargeAttackTimer.current);
      opponentChargeAttackTimer.current = null;
    }

    if (opponentChargeDamageTimer.current) {
      window.clearTimeout(opponentChargeDamageTimer.current);
      opponentChargeDamageTimer.current = null;
    }

    if (opponentChargeAuraTimer.current) {
      window.clearTimeout(opponentChargeAuraTimer.current);
      opponentChargeAuraTimer.current = null;
    }

    opponentChargeAttackStartedAt.current = 0;
    opponentChargeReleaseStartedAt.current = 0;
    setOpponentChargeAuraActive(false);
    opponentSpecialLockRef.current = false;
    setOpponentChargeState('idle');
  }

  function resetPlayerAttackAnimation() {
    if (attackTimer.current) {
      window.clearTimeout(attackTimer.current);
      attackTimer.current = null;
    }

    if (attackHitTimer.current) {
      window.clearTimeout(attackHitTimer.current);
      attackHitTimer.current = null;
    }

    cancelPlayerChargeAttack();
    cancelPlayerKnightDarkWave();
    attackRef.current = 'idle';
    playerAttackFacingRef.current = null;
    playerSpecialLockRef.current = false;
    setIsCrouchAttackLocked(false);
    setAttack('idle');
  }

  function resetOpponentAttackAnimation() {
    if (opponentAttackTimer.current) {
      window.clearTimeout(opponentAttackTimer.current);
      opponentAttackTimer.current = null;
    }

    if (opponentAttackHitTimer.current) {
      window.clearTimeout(opponentAttackHitTimer.current);
      opponentAttackHitTimer.current = null;
    }

    opponentSpecialLockRef.current = false;
    cancelOpponentChargeAttack();
    cancelOpponentKnightDarkWave();
    updateOpponentAttack('idle');
    updateOpponentCrouch(false);
  }

  function getKnightChargeDamage(heldMs: number) {
    return Math.min(
      KNIGHT_CHARGE_MAX_DAMAGE,
      KNIGHT_CHARGE_BASE_DAMAGE +
        Math.floor(Math.max(0, heldMs) / 1000) * KNIGHT_CHARGE_DAMAGE_PER_SECOND,
    );
  }

  function startPlayerChargeAttack() {
    if (
      player.id !== 'roaring-knight' ||
      playerChargeAttackStateRef.current !== 'idle' ||
      playerSpecialLockRef.current ||
      playerBlockHeldRef.current ||
      attackRef.current !== 'idle' ||
      playerStatusRef.current !== 'idle' ||
      roundCountdownRef.current > 0 ||
      roundResolvedRef.current
    ) return;

    playerChargeAttackStartedAt.current = window.performance.now();
    playerSpecialLockRef.current = true;
    setPlayerChargeState('charging');
    setPlayerChargeAuraActive(false);
    if (playerChargeAuraTimer.current) window.clearTimeout(playerChargeAuraTimer.current);
    playerChargeAuraTimer.current = window.setTimeout(() => {
      playerChargeAuraTimer.current = null;

      if (playerChargeAttackStateRef.current === 'charging') {
        setPlayerChargeAuraActive(true);
      }
    }, KNIGHT_CHARGE_AURA_DELAY_MS);
  }

  function startOpponentChargeAttack(
    holdMs: number,
    options: { allowAir?: boolean; ignoreCooldown?: boolean } = {},
  ) {
    if (
      opponent.id !== 'roaring-knight' ||
      opponentChargeAttackStateRef.current !== 'idle' ||
      opponentSpecialLockRef.current ||
      opponentAttackRef.current !== 'idle' ||
      opponentStatusRef.current !== 'idle' ||
      (!options.allowAir && opponentPositionRef.current.y > 0) ||
      (!options.ignoreCooldown && window.performance.now() < opponentAttackReadyAt.current) ||
      playerHealthRef.current <= 0 ||
      roundCountdownRef.current > 0 ||
      roundResolvedRef.current
    ) return false;

    opponentChargeAttackStartedAt.current = window.performance.now();
    opponentSpecialLockRef.current = true;
    updateOpponentBlock(false);
    updateOpponentCrouch(false);
    setOpponentChargeState('charging');
    setOpponentChargeAuraActive(false);

    if (opponentChargeAuraTimer.current) window.clearTimeout(opponentChargeAuraTimer.current);
    opponentChargeAuraTimer.current = window.setTimeout(() => {
      opponentChargeAuraTimer.current = null;

      if (opponentChargeAttackStateRef.current === 'charging') {
        setOpponentChargeAuraActive(true);
      }
    }, KNIGHT_CHARGE_AURA_DELAY_MS);

    if (opponentChargeAttackTimer.current) window.clearTimeout(opponentChargeAttackTimer.current);
    opponentChargeAttackTimer.current = window.setTimeout(() => {
      opponentChargeAttackTimer.current = null;
      releaseOpponentChargeAttack();
    }, holdMs);

    return true;
  }

  function releasePlayerChargeAttack() {
    if (playerChargeAttackStateRef.current !== 'charging') return;

    const heldMs = window.performance.now() - playerChargeAttackStartedAt.current;
    const damage = getKnightChargeDamage(heldMs);

    setPlayerChargeState('releasing');
    playerChargeReleaseStartedAt.current = window.performance.now();
    playKnightSwordSlashSound();
    if (playerChargeAuraTimer.current) {
      window.clearTimeout(playerChargeAuraTimer.current);
      playerChargeAuraTimer.current = null;
    }
    setPlayerChargeAuraActive(false);

    if (playerChargeDamageTimer.current) window.clearTimeout(playerChargeDamageTimer.current);
    playerChargeDamageTimer.current = window.setTimeout(() => {
      playerChargeDamageTimer.current = null;

      if (isArenaPausedRef.current) return;
      if (playerChargeAttackStateRef.current !== 'releasing') return;

      const hitDistance = Math.abs(opponentPositionRef.current.x - positionRef.current.x);

      if (hitDistance <= KNIGHT_CHARGE_RANGE) {
        const didDamageThroughBlock = damageOpponentHealth(damage, 'mid');

        if (didDamageThroughBlock && !isOpponentKnightSphereActive()) {
          applyProjectileKnockback(
            'right',
            opponentPositionRef.current.x >= positionRef.current.x ? 1 : -1,
            KNIGHT_CHARGE_ATTACK_KNOCKBACK,
          );
        }
      }
    }, Math.max(0, Math.floor(KNIGHT_CHARGE_RELEASE_MS * ATTACK_HIT_FRAME_RATIO)));

    if (playerChargeAttackTimer.current) window.clearTimeout(playerChargeAttackTimer.current);
    playerChargeAttackTimer.current = window.setTimeout(() => {
      playerChargeAttackTimer.current = null;
      if (isArenaPausedRef.current) return;
      playerSpecialLockRef.current = false;
      playerChargeAttackStartedAt.current = 0;
      playerChargeReleaseStartedAt.current = 0;
      setPlayerChargeAuraActive(false);
      setPlayerChargeState('idle');
    }, KNIGHT_CHARGE_RELEASE_MS);
  }

  function releaseOpponentChargeAttack() {
    if (opponentChargeAttackStateRef.current !== 'charging') return;

    const heldMs = window.performance.now() - opponentChargeAttackStartedAt.current;
    const damage = getKnightChargeDamage(heldMs);

    setOpponentChargeState('releasing');
    opponentChargeReleaseStartedAt.current = window.performance.now();
    playKnightSwordSlashSound();
    if (opponentChargeAuraTimer.current) {
      window.clearTimeout(opponentChargeAuraTimer.current);
      opponentChargeAuraTimer.current = null;
    }
    setOpponentChargeAuraActive(false);

    if (opponentChargeDamageTimer.current) window.clearTimeout(opponentChargeDamageTimer.current);
    opponentChargeDamageTimer.current = window.setTimeout(() => {
      opponentChargeDamageTimer.current = null;

      if (isArenaPausedRef.current) return;
      if (opponentChargeAttackStateRef.current !== 'releasing') return;

      const hitDistance = Math.abs(positionRef.current.x - opponentPositionRef.current.x);

      if (hitDistance <= KNIGHT_CHARGE_RANGE) {
        const didDamageThroughBlock = damagePlayer(damage, 'none', 'mid');
        consumeOpponentPlan(didDamageThroughBlock, 'charge');

        if (didDamageThroughBlock && !isPlayerKnightSphereActive() && !isPlayerKnightDarkWaveHolding()) {
          applyProjectileKnockback(
            'left',
            positionRef.current.x >= opponentPositionRef.current.x ? 1 : -1,
            KNIGHT_CHARGE_ATTACK_KNOCKBACK,
          );
        }
      } else {
        consumeOpponentPlan(false, 'charge');
      }
    }, Math.max(0, Math.floor(KNIGHT_CHARGE_RELEASE_MS * ATTACK_HIT_FRAME_RATIO)));

    if (opponentChargeAttackTimer.current) window.clearTimeout(opponentChargeAttackTimer.current);
    opponentChargeAttackTimer.current = window.setTimeout(() => {
      opponentChargeAttackTimer.current = null;
      if (isArenaPausedRef.current) return;
      opponentSpecialLockRef.current = false;
      opponentChargeAttackStartedAt.current = 0;
      opponentChargeReleaseStartedAt.current = 0;
      setOpponentChargeAuraActive(false);
      setOpponentChargeState('idle');
    }, KNIGHT_CHARGE_RELEASE_MS);
  }

  function rememberPlayerAction(
    kind: keyof AiLearningMemory['player'],
    weight = 1,
    options: { includeTotal?: boolean } = {},
  ) {
    if (arenaMode !== 'fight') return;

    const memory = aiLearningRef.current.player;
    memory[kind] += weight;
    if (kind !== 'total' && options.includeTotal !== false) {
      memory.total += weight;
    }

    if (memory.total > 140) {
      (Object.keys(memory) as Array<keyof AiLearningMemory['player']>).forEach((key) => {
        memory[key] *= 0.72;
      });
    }
  }

  function rememberAiOutcome(action: AiAction | null, didSucceed: boolean, weight = 1) {
    if (!action || arenaMode !== 'fight') return;

    const outcome = aiLearningRef.current.outcomes[action];
    if (didSucceed) {
      outcome.success += weight;
    } else {
      outcome.fail += weight;
    }

    if (outcome.success + outcome.fail > 80) {
      outcome.success *= 0.72;
      outcome.fail *= 0.72;
    }
  }

  function markOpponentPlan(action: AiAction) {
    pendingOpponentActionRef.current = action;
  }

  function consumeOpponentPlan(didSucceed: boolean, fallbackAction: AiAction | null = null) {
    const action = pendingOpponentActionRef.current ?? fallbackAction;
    rememberAiOutcome(action, didSucceed);
    pendingOpponentActionRef.current = null;
  }

  function getPlayerHabit(kind: keyof AiLearningMemory['player']) {
    const memory = aiLearningRef.current.player;
    return memory.total <= 0 ? 0 : clamp(memory[kind] / memory.total, 0, 1);
  }

  function getAiConfidence(action: AiAction) {
    const outcome = aiLearningRef.current.outcomes[action];
    const rate = outcome.success / Math.max(1, outcome.success + outcome.fail);
    return clamp(0.66 + rate * 0.88, 0.72, 1.42);
  }

  function getActiveBotCoachAdvice() {
    const advice = botCoachAdviceRef.current;
    return Date.now() - advice.updatedAt <= 45_000 ? advice : DEFAULT_BOT_COACH_ADVICE;
  }

  function buildBotCoachSnapshot(): BotCoachSnapshot {
    const memory = aiLearningRef.current;

    return {
      difficulty: selectedDifficulty,
      stageId: selectedStage.id,
      playerId: player.id,
      opponentId: opponent.id,
      playerHealth: Math.round(playerHealthRef.current),
      opponentHealth: Math.round(opponentHealthRef.current),
      distance: Math.round(Math.abs(positionRef.current.x - opponentPositionRef.current.x)),
      playerY: Math.round(positionRef.current.y),
      opponentY: Math.round(opponentPositionRef.current.y),
      playerStatus: playerStatusRef.current,
      opponentStatus: opponentStatusRef.current,
      playerAttack: attackRef.current,
      opponentAttack: opponentAttackRef.current,
      playerBlocking: isBlockingRef.current,
      playerCrouching: isPlayerLowProfile(),
      playerSpecial: playerKnightDarkWaveStateRef.current,
      opponentSpecial: opponentKnightDarkWaveStateRef.current,
      playerHabits: { ...memory.player },
      aiOutcomes: { ...memory.outcomes },
    };
  }

  function getAdaptiveAiConfig(baseAi: (typeof AI_CONFIG)[Difficulty]) {
    const projectileHabit = getPlayerHabit('projectile');
    const specialHabit = getPlayerHabit('special');
    const jumpHabit = getPlayerHabit('jump') + getPlayerHabit('air') * 0.55;
    const crouchHabit = getPlayerHabit('crouch') + getPlayerHabit('low') * 0.55;
    const blockHabit = getPlayerHabit('block');
    const closeHabit = getPlayerHabit('close');
    const farHabit = getPlayerHabit('far');
    const coach = getActiveBotCoachAdvice();
    const fighterSpeedScale = getFighterWalkSpeed(opponent) / WALK_SPEED;

    return {
      moveSpeed:
        baseAi.moveSpeed *
        fighterSpeedScale *
        clamp((1 + closeHabit * 0.18 + farHabit * 0.08) * coach.aggression, 0.88, 1.32),
      preferredRange: clamp(
        baseAi.preferredRange +
          (projectileHabit + specialHabit) * 10 -
          closeHabit * 5 -
          blockHabit * 3 +
          coach.preferredRangeShift,
        12,
        34,
      ),
      attackChance: clamp(
        baseAi.attackChance *
          (1 + blockHabit * 0.32 + closeHabit * 0.18) *
          coach.attackBias *
          coach.aggression *
          getAiConfidence('melee'),
        0.12,
        0.95,
      ),
      blockChance: clamp(
        baseAi.blockChance *
          (1 + getPlayerHabit('high') * 0.75 + specialHabit * 0.28) *
          coach.defenseBias *
          getAiConfidence('block'),
        0.08,
        0.96,
      ),
      crouchChance: clamp(
        baseAi.crouchChance *
          (1 + getPlayerHabit('high') * 0.85 + projectileHabit * 0.4) *
          coach.defenseBias *
          getAiConfidence('crouch'),
        0.05,
        0.9,
      ),
      jumpChance: clamp(
        baseAi.jumpChance *
          (1 + crouchHabit * 0.55 + projectileHabit * 0.3) *
          coach.defenseBias *
          getAiConfidence('jump'),
        0.03,
        0.72,
      ),
      specialChance: clamp(
        baseAi.specialChance *
          (1 + blockHabit * 0.35 + farHabit * 0.24 + jumpHabit * 0.2) *
          coach.specialBias *
          Math.max(getAiConfidence('special'), getAiConfidence('projectile') * 0.92),
        0.08,
        0.88,
      ),
      lowAttackBias: clamp(
        0.35 + blockHabit * 0.55 + getAiConfidence('low') * 0.18 + coach.lowAttackBias,
        0.18,
        0.92,
      ),
      antiAirBias: clamp(
        jumpHabit * 0.7 + getAiConfidence('antiHigh') * 0.18 + coach.antiAirBias,
        0.08,
        0.92,
      ),
      projectilePressure: clamp(projectileHabit + specialHabit * 0.6 + coach.projectileBias, 0, 1.15),
    };
  }

  useEffect(() => {
    if (screen !== 'arena' || arenaMode !== 'fight') return undefined;

    const requestAdvice = () => {
      if (
        botCoachRequestInFlightRef.current ||
        isArenaPausedRef.current ||
        roundCountdownRef.current > 0 ||
        roundResolvedRef.current ||
        playerHealthRef.current <= 0 ||
        opponentHealthRef.current <= 0
      ) {
        return;
      }

      botCoachRequestInFlightRef.current = true;
      void requestGeminiBotAdvice(buildBotCoachSnapshot())
        .then((advice) => {
          if (advice) botCoachAdviceRef.current = advice;
        })
        .finally(() => {
          botCoachRequestInFlightRef.current = false;
        });
    };

    const timer = window.setInterval(requestAdvice, 9000);
    requestAdvice();

    return () => {
      window.clearInterval(timer);
      botCoachRequestInFlightRef.current = false;
    };
  }, [arenaMode, opponent.id, player.id, screen, selectedDifficulty, selectedStage.id]);

  function damagePlayer(
    baseDamage: number,
    effect: HitEffect = 'none',
    hitLevel: HitLevel = 'mid',
    options: { ignoreHitLevelDodge?: boolean } = {},
  ) {
    if (playerStatusRef.current === 'knockdown') return false;

    const playerIsCrouching = isPlayerLowProfile();
    const playerIsAirborne = positionRef.current.y > 0;
    const isBlocking = isBlockingRef.current && playerStatusRef.current === 'idle';
    const isDodged =
      !options.ignoreHitLevelDodge &&
      ((hitLevel === 'high' && playerIsCrouching && !isBlocking) ||
        (hitLevel === 'low' && (playerIsAirborne || isPlayerKnightLowAttackImmune())));
    const isBlocked =
      hitLevel === 'low'
        ? isBlocking && (playerIsCrouching || canBlockLowWithoutCrouch(player))
        : isBlocking;
    const blockOutcome = rollBlockOutcome(player, isBlocked);

    if (isDodged) return false;

    const finalDamage = blockOutcome === 'perfect'
      ? 0
      : blockOutcome === 'normal'
      ? Math.ceil(baseDamage * (player.id === 'roaring-knight' ? 0.1 : 0.25))
      : baseDamage;
    if (playerStatusRef.current === 'healing') stopQueenHeal('left');
    flashDamage('left');
    applyPlayerHealthDamage(finalDamage);

    if (player.id === 'jevil' && playerJevilAbsorbActiveRef.current) {
      return blockOutcome === 'none';
    }

    if (playerKnightDarkWaveStateRef.current === 'holding') {
      cancelPlayerKnightDarkWave();
    }

    if (blockOutcome !== 'none' || effect === 'none') return blockOutcome === 'none';
    if (isPlayerKnightSphereActive()) return true;

    if (playerStatusTimer.current) window.clearTimeout(playerStatusTimer.current);

    if (effect === 'sweep') {
      if (player.id === 'roaring-knight') resetPlayerAttackAnimation();
      jumpVelocity.current = 0;
      updatePlayerStatus('knockdown');
      playerStatusTimer.current = window.setTimeout(() => {
        recoverFromKnockdown('left');
      }, SWEEP_KNOCKDOWN_MS);
      return true;
    }

    if (player.id === 'roaring-knight') {
      cancelPlayerKnightDarkWave();
      resetPlayerAttackAnimation();
    }
      jumpVelocity.current = 13.2;
    applyProjectileKnockback(
      'left',
      positionRef.current.x <= opponentPositionRef.current.x ? -1 : 1,
      UPPERCUT_KNOCKBACK,
    );
    updatePlayerStatus('launched');
    return true;
  }

  function updatePlayerStatus(nextStatus: OpponentStatus) {
    if (nextStatus !== 'idle') {
      if (playerGersonLeapPrepTimer.current) {
        window.clearTimeout(playerGersonLeapPrepTimer.current);
        playerGersonLeapPrepTimer.current = null;
        playerSpecialLockRef.current = false;
      }
      setPlayerGersonLeapPreparing(false);
      stopPlayerGersonSpin();
      setPlayerGersonLeapActive(false);
      playerGersonLeapDirectBoostReadyRef.current = false;
    }

    playerLaunchedFallStartedAt.current = 0;
    playerStatusRef.current = nextStatus;
    playerStatusStartedAt.current = window.performance.now();
    setPlayerStatus(nextStatus);
    if (nextStatus !== 'idle') setPlayerRecovering(false);
  }

  function updateOpponentAttack(nextAttack: Attack) {
    opponentAttackFacingRef.current =
      nextAttack === 'idle'
        ? null
        : getFacingToward(opponentPositionRef.current.x, positionRef.current.x);
    opponentAttackRef.current = nextAttack;
    opponentAttackStartedAt.current = window.performance.now();
    setOpponentAttack(nextAttack);
  }

  function updateOpponentBlock(isActive: boolean) {
    if (isActive && !opponentBlockingRef.current) {
      opponentBlockStartedAt.current = window.performance.now();
    } else if (!isActive) {
      opponentBlockStartedAt.current = 0;
    }

    opponentBlockingRef.current = isActive;
    setOpponentBlocking(isActive);
  }

  function stopPlayerBlock() {
    playerBlockHeldRef.current = false;
    playerBlockStartupRef.current = false;

    if (playerBlockStartupTimer.current) {
      window.clearTimeout(playerBlockStartupTimer.current);
      playerBlockStartupTimer.current = null;
    }

    isBlockingRef.current = false;
    playerBlockStartedAt.current = 0;
    setIsBlocking(false);
  }

  function startPlayerBlock() {
    playerBlockHeldRef.current = true;
    playerBlockStartedAt.current = window.performance.now();
    setIsBlocking(true);

    if (player.id !== 'roaring-knight') {
      isBlockingRef.current = true;
      return;
    }

    isBlockingRef.current = false;
    playerBlockStartupRef.current = true;

    if (playerBlockStartupTimer.current) {
      window.clearTimeout(playerBlockStartupTimer.current);
    }

    playerBlockStartupTimer.current = window.setTimeout(() => {
      playerBlockStartupTimer.current = null;

      if (
        playerBlockHeldRef.current &&
        playerStatusRef.current === 'idle' &&
        attackRef.current === 'idle' &&
        positionRef.current.y === 0
      ) {
        isBlockingRef.current = true;
      }

      playerBlockStartupRef.current = false;
    }, KNIGHT_BLOCK_STARTUP_MS);
  }

  function updateOpponentCrouch(isActive: boolean) {
    opponentCrouchingRef.current = isActive;
    setOpponentCrouching(isActive);
  }

  function triggerOnlineOpponentAttack(nextAttack: Exclude<Attack, 'idle'>) {
    const now = window.performance.now();
    const opponentOnGround = opponentPositionRef.current.y === 0 || isOnJevilPlatform(opponent, opponentPositionRef.current);
    const isCrouchAttack = canFighterCrouch(opponent) && remotePressedKeys.current.has('s') && opponentOnGround;
    const isOpponentKnightSwordShot = opponent.id === 'roaring-knight' && nextAttack === 'kick';
    const isOpponentGersonParry = opponent.id === 'gerson-boom' && nextAttack === 'kick';

    if (
      now < opponentAttackReadyAt.current ||
      opponentAttackRef.current !== 'idle' ||
      opponentBlockingRef.current ||
      opponentSpecialLockRef.current ||
      opponentStatusRef.current !== 'idle' ||
      (!opponentOnGround && !isOpponentKnightSwordShot) ||
      playerHealthRef.current <= 0
    ) {
      return;
    }

    opponentAttackReadyAt.current =
      now + (isOpponentKnightSwordShot ? KNIGHT_SWORD_PROJECTILE_COOLDOWN_MS : getFighterAttackCooldown(opponent, nextAttack, true));

    const attackEffect: HitEffect =
      isCrouchAttack && nextAttack === 'kick'
        ? 'sweep'
        : isCrouchAttack && nextAttack === 'punch'
          ? 'uppercut'
          : 'none';
    const hitLevel: HitLevel =
      attackEffect === 'sweep'
        ? 'low'
        : attackEffect === 'uppercut'
          ? 'mid'
          : nextAttack === 'punch'
            ? getStandingPunchHitLevel(opponent)
            : getStandingKickHitLevel(opponent);
    const attackDamage =
      attackEffect === 'sweep'
        ? 2
        : attackEffect === 'uppercut'
          ? 12
          : nextAttack === 'punch'
            ? 4
            : 6;
    const attackDuration =
      isOpponentKnightSwordShot
        ? KNIGHT_SWORD_PROJECTILE_COOLDOWN_MS
        : isOpponentGersonParry
          ? GERSON_PARRY_DURATION_MS
          : attackEffect === 'uppercut'
            ? CROUCH_UPPERCUT_DURATION_MS + CROUCH_UPPERCUT_RECOVERY_MS
            : nextAttack === 'kick' && attackEffect === 'sweep'
              ? 420
              : getFighterAttackDuration(opponent, nextAttack);
    const hitFrameRatio = isOpponentGersonParry
      ? GERSON_PARRY_HIT_FRAME_RATIO
      : attackEffect === 'none'
        ? ATTACK_HIT_FRAME_RATIO
        : CROUCH_HIT_FRAME_RATIO;
    const hitDelay = isOpponentKnightSwordShot
      ? KNIGHT_SWORD_PROJECTILE_SHOOT_MS
      : Math.max(0, Math.floor(attackDuration * hitFrameRatio));

    updateOpponentCrouch(isCrouchAttack);
    updateOpponentAttack(nextAttack);
    if (!isOpponentKnightSwordShot) playAttackSound(opponent, nextAttack, isCrouchAttack);

    if (opponentAttackHitTimer.current) window.clearTimeout(opponentAttackHitTimer.current);
    opponentAttackHitTimer.current = window.setTimeout(() => {
      opponentAttackHitTimer.current = null;
      if (
        isArenaPausedRef.current ||
        opponentAttackRef.current !== nextAttack ||
        opponentStatusRef.current !== 'idle' ||
        playerHealthRef.current <= 0
      ) {
        return;
      }

      if (isOpponentKnightSwordShot) {
        const direction: -1 | 1 = positionRef.current.x >= opponentPositionRef.current.x ? 1 : -1;
        spawnProjectile('right', opponentPositionRef.current.x, direction, 'high', 'knight-sword', {
          bottomPx: getKnightSwordProjectileBottom(
            opponentPositionRef.current,
            opponent.id === 'roaring-knight' ? knightVisualLiftRef.current : 0,
          ),
        });
        return;
      }

      if (isOpponentGersonParry) {
        useGersonParry('right');
        return;
      }

      const range =
        (nextAttack === 'punch' ? 18 : 22) +
        (isPlayerKnightSpecialHurtboxExpanded() ? KNIGHT_SPECIAL_HURTBOX_BONUS : 0);
      if (Math.abs(positionRef.current.x - opponentPositionRef.current.x) > range) return;
      if (!canMeleeAttackReachVertical(opponentPositionRef.current.y, positionRef.current.y, attackEffect, hitLevel)) return;

      const didDamageThroughBlock = damagePlayer(attackDamage, attackEffect, hitLevel);
      if (
        didDamageThroughBlock &&
        attackEffect === 'none' &&
        !isPlayerKnightSphereActive() &&
        !isPlayerKnightDarkWaveHolding()
      ) {
        applyProjectileKnockback(
          'left',
          positionRef.current.x <= opponentPositionRef.current.x ? -1 : 1,
          getAttackKnockbackStrength(opponent, nextAttack),
        );
      }
    }, hitDelay);

    if (opponentAttackTimer.current) window.clearTimeout(opponentAttackTimer.current);
    opponentAttackTimer.current = window.setTimeout(() => {
      if (isArenaPausedRef.current) return;
      updateOpponentAttack('idle');
      updateOpponentCrouch(false);
    }, attackDuration);
  }

  function handleOnlineOpponentInput(key: string, isDown: boolean) {
    if (!['w', 'a', 's', 'd', 'arrowleft', 'arrowright', 'arrowdown', 'arrowup', 'block'].includes(key)) return;

    if (!isDown) {
      remotePressedKeys.current.delete(key);
      if (key === 'block') updateOpponentBlock(false);
      return;
    }

    if (remotePressedKeys.current.has(key)) return;
    remotePressedKeys.current.add(key);

    if (isArenaPausedRef.current || roundCountdownRef.current > 0 || roundResolvedRef.current) return;

    const opponentOnGround = opponentPositionRef.current.y === 0 || isOnJevilPlatform(opponent, opponentPositionRef.current);
    if (key === 'block') {
      if (
        opponentOnGround &&
        opponentAttackRef.current === 'idle' &&
        !opponentSpecialLockRef.current &&
        opponentStatusRef.current === 'idle'
      ) {
        updateOpponentBlock(true);
      }
      return;
    }

    if (key === 'w') {
      if (
        opponentOnGround &&
        opponentJumpVelocity.current === 0 &&
        opponentAttackRef.current === 'idle' &&
        !opponentSpecialLockRef.current &&
        !opponentBlockingRef.current &&
        opponentStatusRef.current === 'idle'
      ) {
        opponentJumpVelocity.current = getFighterJumpPower(opponent);
      }
      return;
    }

    if (key === 's') {
      if (canFighterCrouch(opponent) && opponentOnGround) updateOpponentCrouch(true);
      return;
    }

    if (key === 'arrowleft' || key === 'arrowright') {
      triggerOnlineOpponentAttack(key === 'arrowleft' ? 'punch' : 'kick');
    }
  }

  function updateOpponentStatus(nextStatus: OpponentStatus) {
    if (nextStatus !== 'idle') {
      opponentGersonAirStompChainRef.current = false;
    }

    opponentLaunchedFallStartedAt.current = 0;
    opponentStatusRef.current = nextStatus;
    opponentStatusStartedAt.current = window.performance.now();
    setOpponentStatus(nextStatus);
    if (nextStatus !== 'idle') setOpponentRecovering(false);
    if (nextStatus !== 'idle') updateOpponentCrouch(false);
  }

  function recoverFromKnockdown(target: FighterSide) {
    if (target === 'left') {
      updatePlayerStatus('idle');
      setPlayerRecovering(true);
      if (playerRecoveryTimer.current) window.clearTimeout(playerRecoveryTimer.current);
      playerRecoveryTimer.current = window.setTimeout(() => {
        setPlayerRecovering(false);
        playerRecoveryTimer.current = null;
      }, KNOCKDOWN_RECOVERY_MS);
      return;
    }

    updateOpponentStatus('idle');
    setOpponentRecovering(true);
    if (opponentRecoveryTimer.current) window.clearTimeout(opponentRecoveryTimer.current);
    opponentRecoveryTimer.current = window.setTimeout(() => {
      setOpponentRecovering(false);
      opponentRecoveryTimer.current = null;
    }, KNOCKDOWN_RECOVERY_MS);
  }

  function damageOpponentHealth(
    baseDamage: number,
    hitLevel: HitLevel = 'mid',
    options: { ignoreHitLevelDodge?: boolean } = {},
  ) {
    if (opponentStatusRef.current === 'knockdown') return false;

    const opponentIsCrouching = isOpponentLowProfile();
    const opponentIsAirborne = opponentPositionRef.current.y > 0;
    const isBlocking =
      opponentBlockingRef.current &&
      opponentStatusRef.current === 'idle' &&
      opponentAttackRef.current === 'idle';
    const isDodged =
      !options.ignoreHitLevelDodge &&
      ((hitLevel === 'high' && opponentIsCrouching && !isBlocking) ||
        (hitLevel === 'low' && (opponentIsAirborne || isOpponentKnightLowAttackImmune())));
    const isBlocked =
      hitLevel === 'low'
        ? isBlocking && (opponentIsCrouching || canBlockLowWithoutCrouch(opponent))
        : isBlocking;
    const blockOutcome = rollBlockOutcome(opponent, isBlocked);

    if (isDodged) return false;

    const damage = blockOutcome === 'perfect'
      ? 0
      : blockOutcome === 'normal'
      ? Math.ceil(baseDamage * (opponent.id === 'roaring-knight' ? 0.1 : 0.25))
      : baseDamage;

    if (arenaMode === 'sandbox' || arenaMode === 'online') {
      flashDamage('right');
      applyOpponentHealthDamage(damage);
      return blockOutcome === 'none';
    }

    if (opponentStatusRef.current === 'healing') stopQueenHeal('right');
    flashDamage('right');
    if (blockOutcome === 'none') {
      if (opponentBlockingRef.current) rememberAiOutcome('block', false, 0.6);
      if (opponentCrouchingRef.current) rememberAiOutcome('crouch', false, 0.6);
      if (opponentPositionRef.current.y > 0) rememberAiOutcome('jump', false, 0.6);
    }

    applyOpponentHealthDamage(damage);

    if (opponent.id === 'jevil' && opponentJevilAbsorbActiveRef.current) {
      return blockOutcome === 'none';
    }

    if (opponentKnightDarkWaveStateRef.current === 'holding') {
      cancelOpponentKnightDarkWave();
    }

    return blockOutcome === 'none';
  }

  function clearGersonAirCounterHideTimer(side: FighterSide) {
    const timerRef = side === 'left'
      ? playerGersonAirCounterHideTimer
      : opponentGersonAirCounterHideTimer;

    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  function setGersonAirCounter(side: FighterSide, value: number) {
    clearGersonAirCounterHideTimer(side);

    if (side === 'left') {
      setPlayerGersonAirLandingHits(value);
      return;
    }

    setOpponentGersonAirLandingHits(value);
  }

  function hideGersonAirCounterAfterLanding(side: FighterSide) {
    const timerRef = side === 'left'
      ? playerGersonAirCounterHideTimer
      : opponentGersonAirCounterHideTimer;
    const setValue = side === 'left'
      ? setPlayerGersonAirLandingHits
      : setOpponentGersonAirLandingHits;

    clearGersonAirCounterHideTimer(side);
    timerRef.current = window.setTimeout(() => {
      setValue(0);
      timerRef.current = null;
    }, GERSON_AIR_COUNTER_HIDE_DELAY_MS);
  }

  function tryGersonLandingHit(attackerSide: FighterSide, landingPosition: Position): GersonLandingBounce | null {
    if (roundResolvedRef.current) return null;

    const isPlayerLanding = attackerSide === 'left';
    const attacker = isPlayerLanding ? player : opponent;
    const targetPosition = isPlayerLanding ? opponentPositionRef.current : positionRef.current;
    const targetHealth = isPlayerLanding ? opponentHealthRef.current : playerHealthRef.current;
    const targetStatus = isPlayerLanding ? opponentStatusRef.current : playerStatusRef.current;
    const targetImmuneUntil = isPlayerLanding
      ? opponentGersonLandingImmuneUntilRef.current
      : playerGersonLandingImmuneUntilRef.current;
    const attackerAirHitCounter = isPlayerLanding
      ? playerGersonAirLandingHitsRef
      : opponentGersonAirLandingHitsRef;
    const now = window.performance.now();
    const targetIsHighBlocking = isPlayerLanding
      ? opponentBlockingRef.current &&
        opponentStatusRef.current === 'idle' &&
        opponentAttackRef.current === 'idle' &&
        !isOpponentLowProfile()
      : isBlockingRef.current &&
        playerStatusRef.current === 'idle' &&
        !isPlayerLowProfile();
    const targetIsAnimating = isPlayerLanding
      ? opponentAttackRef.current !== 'idle' ||
        opponentStatusRef.current !== 'idle' ||
        opponentSpecialLockRef.current
      : attackRef.current !== 'idle' ||
        playerStatusRef.current !== 'idle' ||
        playerSpecialLockRef.current;

    if (
      attacker.id !== 'gerson-boom' ||
      now < targetImmuneUntil ||
      targetHealth <= 0 ||
      targetStatus === 'knockdown'
    ) {
      return null;
    }

    const distance = Math.abs(landingPosition.x - targetPosition.x);
    const verticalDistance = Math.abs(landingPosition.y - targetPosition.y);
    if (distance > GERSON_LANDING_HIT_RANGE || verticalDistance > GERSON_LANDING_VERTICAL_HIT_RANGE) return null;
    const isDirectHit = distance <= GERSON_LANDING_DIRECT_HIT_RANGE;
    const hasLeapDirectBoost =
      isPlayerLanding && isDirectHit && playerGersonLeapDirectBoostReadyRef.current;
    const sideDirection: -1 | 1 =
      Math.abs(landingPosition.x - targetPosition.x) < 0.01
        ? isPlayerLanding
          ? -1
          : 1
        : landingPosition.x >= targetPosition.x
          ? 1
          : -1;
    const buildBounce = (
      forceSideDirection?: -1 | 1,
      sideKnockbackMultiplier = 1,
    ): GersonLandingBounce => {
      attackerAirHitCounter.current += 1;
      setGersonAirCounter(attackerSide, attackerAirHitCounter.current);
      const chainSideBounceMultiplier =
        sideKnockbackMultiplier === 1 &&
        attackerAirHitCounter.current > GERSON_CHAIN_SIDE_BOUNCE_RAMP_AFTER_HITS
          ? 1 +
            Math.ceil(
              (attackerAirHitCounter.current - GERSON_CHAIN_SIDE_BOUNCE_RAMP_AFTER_HITS) /
                GERSON_CHAIN_SIDE_BOUNCE_RAMP_INTERVAL_HITS,
            ) *
              GERSON_CHAIN_SIDE_BOUNCE_RAMP_PER_HIT
          : 1;
      const bounceSideDirection =
        forceSideDirection ??
        (attackerAirHitCounter.current >= GERSON_RANDOM_SIDE_BOUNCE_AFTER_AIR_HITS
          ? Math.random() < 0.5
            ? -1
            : 1
          : sideDirection);

      return {
        sideDirection: bounceSideDirection,
        airHitCount: attackerAirHitCounter.current,
        sideKnockbackMultiplier: sideKnockbackMultiplier * chainSideBounceMultiplier,
      };
    };

    if (targetIsHighBlocking) {
      if (hasLeapDirectBoost) {
        playerGersonLeapDirectBoostReadyRef.current = false;
      }

      if (isPlayerLanding) {
        rememberAiOutcome('block', true, 0.9);
      } else {
        consumeOpponentPlan(false, 'jump');
      }

      return isDirectHit
        ? buildBounce(sideDirection, GERSON_BLOCKED_BOUNCE_KNOCKBACK_MULTIPLIER)
        : null;
    }

    const damage =
      (isDirectHit ? GERSON_LANDING_DIRECT_DAMAGE : GERSON_LANDING_DAMAGE) *
      (hasLeapDirectBoost ? GERSON_LEAP_DIRECT_DAMAGE_MULTIPLIER : 1);
    const didDamage = isPlayerLanding
      ? damageOpponentHealth(damage, 'high', { ignoreHitLevelDodge: targetIsAnimating })
      : damagePlayer(damage, 'none', 'high', { ignoreHitLevelDodge: targetIsAnimating });

    if (hasLeapDirectBoost) {
      playerGersonLeapDirectBoostReadyRef.current = false;
    }

    if (didDamage) {
      playGersonJumpHitSound();

      if (isPlayerLanding) {
        opponentGersonLandingImmuneUntilRef.current = now + GERSON_LANDING_IMMUNITY_MS;
      } else {
        playerGersonLandingImmuneUntilRef.current = now + GERSON_LANDING_IMMUNITY_MS;
      }
    }

    if (!isPlayerLanding) {
      consumeOpponentPlan(didDamage, 'jump');
    }

    return didDamage && isDirectHit ? buildBounce() : null;
  }

  function reflectProjectileWithGerson(attackerSide: FighterSide) {
    const isPlayerParry = attackerSide === 'left';
    const attacker = isPlayerParry ? player : opponent;
    const attackerPosition = isPlayerParry ? positionRef.current : opponentPositionRef.current;
    const targetPosition = isPlayerParry ? opponentPositionRef.current : positionRef.current;
    const reflectedDirection: -1 | 1 = targetPosition.x >= attackerPosition.x ? 1 : -1;
    const incomingOwner: FighterSide = isPlayerParry ? 'right' : 'left';

    if (attacker.id !== 'gerson-boom') return false;

    const projectileIndex = projectilesRef.current.findIndex((projectile) => {
      if (projectile.owner !== incomingOwner) return false;

      const verticalBounds = getProjectileVerticalBounds(projectile);
      const fighterBottom = FIGHTER_BASE_BOTTOM_PX + attackerPosition.y;
      const fighterTop = fighterBottom + FIGHTER_PROJECTILE_HITBOX.height;

      return (
        Math.abs(projectile.x - attackerPosition.x) <= GERSON_PARRY_PROJECTILE_RANGE &&
        verticalBounds.bottom <= fighterTop &&
        verticalBounds.top >= fighterBottom
      );
    });

    if (projectileIndex < 0) return false;

    const nextProjectiles = projectilesRef.current.map((projectile, index) =>
      index === projectileIndex
        ? {
            ...projectile,
            owner: attackerSide,
            direction: reflectedDirection,
            startX: attackerPosition.x,
            x: clamp(
              attackerPosition.x + reflectedDirection * 6,
              ARENA_LEFT_LIMIT,
              ARENA_RIGHT_LIMIT,
            ),
          }
        : projectile,
    );

    projectilesRef.current = nextProjectiles;
    setProjectiles(nextProjectiles);
    playProjectileHitSound();
    return true;
  }

  function isProjectileNearGersonParry(attackerSide: FighterSide, projectile: Projectile) {
    const isPlayerParry = attackerSide === 'left';
    const attacker = isPlayerParry ? player : opponent;
    const attackerPosition = isPlayerParry ? positionRef.current : opponentPositionRef.current;
    const incomingOwner: FighterSide = isPlayerParry ? 'right' : 'left';

    if (attacker.id !== 'gerson-boom' || projectile.owner !== incomingOwner) return false;

    const verticalBounds = getProjectileVerticalBounds(projectile);
    const fighterBottom = FIGHTER_BASE_BOTTOM_PX + attackerPosition.y;
    const fighterTop = fighterBottom + FIGHTER_PROJECTILE_HITBOX.height;

    return (
      Math.abs(projectile.x - attackerPosition.x) <= GERSON_PARRY_PROJECTILE_RANGE &&
      verticalBounds.bottom <= fighterTop &&
      verticalBounds.top >= fighterBottom
    );
  }

  function getGersonReflectedProjectile(attackerSide: FighterSide, projectile: Projectile): Projectile {
    const isPlayerParry = attackerSide === 'left';
    const attackerPosition = isPlayerParry ? positionRef.current : opponentPositionRef.current;
    const targetPosition = isPlayerParry ? opponentPositionRef.current : positionRef.current;
    const reflectedDirection: -1 | 1 = targetPosition.x >= attackerPosition.x ? 1 : -1;

    return {
      ...projectile,
      owner: attackerSide,
      direction: reflectedDirection,
      startX: attackerPosition.x,
      x: clamp(attackerPosition.x + reflectedDirection * 6, ARENA_LEFT_LIMIT, ARENA_RIGHT_LIMIT),
    };
  }

  function knockDownFromGersonParry(attackerSide: FighterSide) {
    const isPlayerParry = attackerSide === 'left';
    const attacker = isPlayerParry ? player : opponent;
    const attackerPosition = isPlayerParry ? positionRef.current : opponentPositionRef.current;
    const target = isPlayerParry ? opponent : player;
    const targetPosition = isPlayerParry ? opponentPositionRef.current : positionRef.current;
    const targetStatus = isPlayerParry ? opponentStatusRef.current : playerStatusRef.current;

    if (attacker.id !== 'gerson-boom' || targetStatus === 'knockdown') return false;

    const distance = Math.abs(targetPosition.x - attackerPosition.x);
    if (
      distance > GERSON_PARRY_MELEE_RANGE ||
      !canMeleeAttackReachVertical(attackerPosition.y, targetPosition.y, 'sweep', 'mid')
    ) {
      return false;
    }

    const didDamage = isPlayerParry
      ? damageOpponentHealth(GERSON_PARRY_MELEE_DAMAGE, 'mid')
      : damagePlayer(GERSON_PARRY_MELEE_DAMAGE, 'sweep', 'mid');

    if (!didDamage || target.id === 'roaring-knight' && (isPlayerParry ? isOpponentKnightSphereActive() : isPlayerKnightSphereActive())) {
      return didDamage;
    }

    if (isPlayerParry) {
      if (opponent.id === 'roaring-knight') resetOpponentAttackAnimation();
      if (opponentStatusTimer.current) window.clearTimeout(opponentStatusTimer.current);
      opponentJumpVelocity.current = 0;
      updateOpponentStatus('knockdown');
      opponentStatusTimer.current = window.setTimeout(() => {
        recoverFromKnockdown('right');
      }, SWEEP_KNOCKDOWN_MS);
    } else {
      if (playerStatusTimer.current) window.clearTimeout(playerStatusTimer.current);
      jumpVelocity.current = 0;
      updatePlayerStatus('knockdown');
      playerStatusTimer.current = window.setTimeout(() => {
        recoverFromKnockdown('left');
      }, SWEEP_KNOCKDOWN_MS);
    }

    return true;
  }

  function useGersonParry(attackerSide: FighterSide) {
    if (reflectProjectileWithGerson(attackerSide)) return true;
    return knockDownFromGersonParry(attackerSide);
  }

  function damageWithPlayerGersonSpin() {
    if (
      player.id !== 'gerson-boom' ||
      attackRef.current !== 'punch' ||
      playerStatusRef.current !== 'idle' ||
      opponentHealthRef.current <= 0 ||
      opponentStatusRef.current === 'knockdown'
    ) {
      return;
    }

    const distance = Math.abs(opponentPositionRef.current.x - positionRef.current.x);
    if (
      distance > GERSON_SPIN_RANGE ||
      !canMeleeAttackReachVertical(positionRef.current.y, opponentPositionRef.current.y, 'none', 'mid')
    ) {
      return;
    }

    const didDamage = damageOpponentHealth(GERSON_SPIN_DAMAGE, 'mid');
    if (didDamage) {
      playAttackSound(player, 'punch', false);
    }

    if (didDamage && !isOpponentKnightSphereActive()) {
      applyProjectileKnockback(
        'right',
        opponentPositionRef.current.x >= positionRef.current.x ? 1 : -1,
        ATTACK_KNOCKBACK_VELOCITY * 0.35,
      );
    }
  }

  function stopPlayerGersonSpin() {
    if (playerGersonSpinDamageTimer.current) {
      window.clearInterval(playerGersonSpinDamageTimer.current);
      playerGersonSpinDamageTimer.current = null;
    }

    if (playerGersonSpinMaxTimer.current) {
      window.clearTimeout(playerGersonSpinMaxTimer.current);
      playerGersonSpinMaxTimer.current = null;
    }

    if (player.id === 'gerson-boom' && attackRef.current === 'punch') {
      attackRef.current = 'idle';
      playerAttackFacingRef.current = null;
      playerAttackStartedAt.current = 0;
      setAttack('idle');
    }
  }

  function startPlayerGersonSpin() {
    const now = window.performance.now();

    if (
      player.id !== 'gerson-boom' ||
      now < attackReadyAt.current ||
      attackRef.current !== 'idle' ||
      playerBlockHeldRef.current ||
      playerSpecialLockRef.current ||
      playerStatusRef.current !== 'idle' ||
      opponentHealthRef.current <= 0 ||
      roundCountdownRef.current > 0 ||
      roundResolvedRef.current
    ) {
      return false;
    }

    attackReadyAt.current = now + ATTACK_COOLDOWN_MS;
    rememberPlayerAction('mid', 0.9);
    rememberPlayerAction('close', 0.45, { includeTotal: false });
    playerAttackFacingRef.current = getFacingToward(positionRef.current.x, opponentPositionRef.current.x);
    attackRef.current = 'punch';
    playerAttackStartedAt.current = now;
    setAttack('punch');
    damageWithPlayerGersonSpin();

    if (playerGersonSpinDamageTimer.current) window.clearInterval(playerGersonSpinDamageTimer.current);
    playerGersonSpinDamageTimer.current = window.setInterval(() => {
      if (isArenaPausedRef.current) return;
      damageWithPlayerGersonSpin();
    }, GERSON_SPIN_DAMAGE_INTERVAL_MS);

    if (playerGersonSpinMaxTimer.current) window.clearTimeout(playerGersonSpinMaxTimer.current);
    playerGersonSpinMaxTimer.current = window.setTimeout(() => {
      stopPlayerGersonSpin();
    }, GERSON_SPIN_MAX_HOLD_MS);

    return true;
  }

  function spawnProjectile(
    owner: FighterSide,
    x: number,
    direction: -1 | 1,
    lane: ProjectileLane,
    kind: ProjectileKind,
    options: Pick<
      Projectile,
      | 'damage'
      | 'knockback'
      | 'maxTravel'
      | 'durationMs'
      | 'bottomPx'
      | 'bottomVelocity'
      | 'projectileSprite'
      | 'speed'
    > = {},
  ) {
    const spawnOffset =
      kind === 'knight-dark-wave'
        ? 0
        : kind === 'jevil-scythe'
          ? JEVIL_SCYTHE_SPAWN_OFFSET
        : kind === 'knight-sword'
          ? KNIGHT_SWORD_PROJECTILE_SPAWN_OFFSET
          : 7;
    const nextProjectile: Projectile = {
      id: projectileIdRef.current,
      x: clamp(x + direction * spawnOffset, ARENA_LEFT_LIMIT, ARENA_RIGHT_LIMIT),
      startX: x,
      createdAt: window.performance.now(),
      direction,
      owner,
      lane,
      kind,
      ...options,
    };

    projectileIdRef.current += 1;
    projectilesRef.current = [...projectilesRef.current, nextProjectile];
    setProjectiles(projectilesRef.current);
    if (kind === 'knight-sword') {
      playKnightSwordProjectileSound();
    }
  }

  function setJevilPlatformsAndRef(nextPlatforms: JevilPlatform[]) {
    jevilPlatformsRef.current = nextPlatforms;
    setJevilPlatforms(nextPlatforms);
  }

  function clearJevilPlatforms() {
    jevilPlatformOwnerRef.current = null;
    setJevilPlatformsAndRef([]);
  }

  function startJevilPlatformCooldown(owner: FighterSide | null, now = window.performance.now()) {
    if (owner === 'left') {
      specialReadyAt.current = Math.max(
        specialReadyAt.current,
        now + JEVIL_PLATFORM_SPECIAL_COOLDOWN_MS,
      );
      return;
    }

    if (owner === 'right') {
      opponentSpecialReadyAt.current = Math.max(
        opponentSpecialReadyAt.current,
        now + JEVIL_PLATFORM_SPECIAL_COOLDOWN_MS,
      );
    }
  }

  function removeExpiredJevilPlatforms(now = window.performance.now()) {
    const nextPlatforms = jevilPlatformsRef.current.filter(
      (platform) => now - platform.createdAt < JEVIL_PLATFORM_DURATION_MS,
    );

    if (nextPlatforms.length !== jevilPlatformsRef.current.length) {
      if (jevilPlatformsRef.current.length > 0 && nextPlatforms.length === 0) {
        startJevilPlatformCooldown(jevilPlatformOwnerRef.current, now);
        jevilPlatformOwnerRef.current = null;
      }
      setJevilPlatformsAndRef(nextPlatforms);
    }
  }

  function spawnJevilPlatforms(owner: FighterSide) {
    const now = window.performance.now();
    const ownerPosition = owner === 'left' ? positionRef.current : opponentPositionRef.current;
    const leftX = clamp(ownerPosition.x - JEVIL_PLATFORM_X_OFFSET, ARENA_VISIBLE_LEFT, ARENA_VISIBLE_RIGHT);
    const rightX = clamp(ownerPosition.x + JEVIL_PLATFORM_X_OFFSET, ARENA_VISIBLE_LEFT, ARENA_VISIBLE_RIGHT);
    const platformY = JEVIL_PLATFORM_SPAWN_Y;

    jevilPlatformOwnerRef.current = owner;
    setJevilPlatformsAndRef([
      {
        id: jevilPlatformIdRef.current++,
        x: leftX,
        y: platformY,
        createdAt: now,
      },
      {
        id: jevilPlatformIdRef.current++,
        x: rightX,
        y: platformY,
        createdAt: now,
      },
    ]);
  }

  function spawnJevilScythe(owner: FighterSide) {
    const ownerPosition = owner === 'left' ? positionRef.current : opponentPositionRef.current;
    const targetPosition = owner === 'left' ? opponentPositionRef.current : positionRef.current;
    const direction: -1 | 1 = targetPosition.x >= ownerPosition.x ? 1 : -1;

    spawnProjectile(owner, ownerPosition.x, direction, 'high', 'jevil-scythe', {
      bottomPx: JEVIL_SCYTHE_BOTTOM_PX + ownerPosition.y,
      maxTravel: JEVIL_SCYTHE_MAX_TRAVEL,
      knockback: 0,
    });
  }

  function getRandomJevilTeleportPosition(owner: FighterSide) {
    const otherPosition = owner === 'left' ? opponentPositionRef.current : positionRef.current;
    const jevilFighter = owner === 'left' ? player : opponent;
    const maxY = Math.max(0, getFighterMaxY(selectedStage, jevilFighter) - 18);
    const minY = Math.min(JEVIL_TELEPORT_MIN_AIR_Y, maxY);

    for (let attempt = 0; attempt < 10; attempt += 1) {
      const x = clamp(
        ARENA_VISIBLE_LEFT + Math.random() * (ARENA_VISIBLE_RIGHT - ARENA_VISIBLE_LEFT),
        ARENA_LEFT_LIMIT,
        ARENA_RIGHT_LIMIT,
      );
      const y = minY + Math.random() * Math.max(0, maxY - minY);
      if (Math.abs(x - otherPosition.x) >= 16) {
        return { x, y };
      }
    }

    const fallbackX =
      otherPosition.x < (ARENA_VISIBLE_LEFT + ARENA_VISIBLE_RIGHT) / 2
        ? ARENA_VISIBLE_RIGHT - 8
        : ARENA_VISIBLE_LEFT + 8;

    return {
      x: clamp(fallbackX, ARENA_LEFT_LIMIT, ARENA_RIGHT_LIMIT),
      y: minY + Math.random() * Math.max(0, maxY - minY),
    };
  }

  function shootJevilChaosShot(owner: FighterSide) {
    const ownerPosition = owner === 'left' ? positionRef.current : opponentPositionRef.current;
    const targetPosition = owner === 'left' ? opponentPositionRef.current : positionRef.current;
    const targetFighter = owner === 'left' ? opponent : player;
    const targetIsLowProfile = owner === 'left' ? isOpponentLowProfile() : isPlayerLowProfile();
    const targetVisualLift = targetFighter.id === 'roaring-knight' ? knightVisualLiftRef.current : 0;
    const targetBottom = FIGHTER_BASE_BOTTOM_PX + targetPosition.y + targetVisualLift;
    const aimOffset = targetIsLowProfile ? 18 : 50;
    const direction: -1 | 1 = targetPosition.x >= ownerPosition.x ? 1 : -1;
    const spawnBottom = FIGHTER_BASE_BOTTOM_PX + ownerPosition.y + JEVIL_CHAOS_SHOT_SPAWN_OFFSET_Y;
    const travelFrames = Math.max(1, Math.abs(targetPosition.x - ownerPosition.x) / JEVIL_CHAOS_SHOT_SPEED);
    const projectileSprite =
      jevilChaosProjectileSprites[Math.floor(Math.random() * jevilChaosProjectileSprites.length)];

    spawnProjectile(owner, ownerPosition.x, direction, 'high', 'jevil-chaos-shot', {
      bottomPx: spawnBottom,
      bottomVelocity: (targetBottom + aimOffset - spawnBottom) / travelFrames,
      projectileSprite,
      speed: JEVIL_CHAOS_SHOT_SPEED,
    });
  }

  function clearJevilAbsorbState(owner: FighterSide) {
    if (owner === 'left') {
      playerJevilAbsorbActiveRef.current = false;
      playerJevilAbsorbDamageRef.current = 0;
      playerJevilAbsorbEndsAtRef.current = 0;
      playerJevilAbsorbFinaleStartedRef.current = false;
      setPlayerJevilAbsorbing(false);
      setPlayerJevilHeadlessPose(false);
      return;
    }

    opponentJevilAbsorbActiveRef.current = false;
    opponentJevilAbsorbDamageRef.current = 0;
    opponentJevilAbsorbEndsAtRef.current = 0;
    opponentJevilAbsorbFinaleStartedRef.current = false;
    setOpponentJevilAbsorbing(false);
    setOpponentJevilHeadlessPose(false);
  }

  function spawnJevilHeadProjectile(owner: FighterSide, absorbedDamage: number) {
    const damage = Math.max(
      JEVIL_ABSORB_HEAD_MIN_DAMAGE,
      Math.floor(absorbedDamage * JEVIL_ABSORB_DAMAGE_RETURN_RATIO),
    );

    const ownerPosition = owner === 'left' ? positionRef.current : opponentPositionRef.current;
    const targetPosition = owner === 'left' ? opponentPositionRef.current : positionRef.current;
    const direction: -1 | 1 = targetPosition.x >= ownerPosition.x ? 1 : -1;

    spawnProjectile(owner, ownerPosition.x, direction, 'high', 'jevil-head', {
      bottomPx: FIGHTER_BASE_BOTTOM_PX + ownerPosition.y + JEVIL_HEAD_PROJECTILE_BOTTOM_OFFSET,
      damage,
      knockback: 0,
      speed: JEVIL_HEAD_PROJECTILE_SPEED,
    });
  }

  function finishJevilAbsorb(owner: FighterSide) {
    const now = window.performance.now();
    const absorbedDamage =
      owner === 'left' ? playerJevilAbsorbDamageRef.current : opponentJevilAbsorbDamageRef.current;

    if (owner === 'left') {
      playerSpecialLockRef.current = true;
      playerKnockbackVelocity.current = 0;
      specialReadyAt.current = now + JEVIL_ABSORB_SPECIAL_COOLDOWN_MS;
      playerJevilAbsorbRecoverUntilRef.current = now + JEVIL_ABSORB_POST_HEAD_LOCK_MS;
      setPlayerJevilHeadlessPose(true);
    } else {
      opponentSpecialLockRef.current = true;
      opponentKnockbackVelocity.current = 0;
      opponentSpecialReadyAt.current = now + JEVIL_ABSORB_SPECIAL_COOLDOWN_MS;
      opponentJevilAbsorbRecoverUntilRef.current = now + JEVIL_ABSORB_POST_HEAD_LOCK_MS;
      setOpponentJevilHeadlessPose(true);
    }

    spawnJevilHeadProjectile(owner, absorbedDamage);
    clearJevilAbsorbState(owner);

    if (owner === 'left') {
      setPlayerJevilHeadlessPose(true);
    } else {
      setOpponentJevilHeadlessPose(true);
    }
  }

  function startJevilAbsorbFinale(owner: FighterSide) {
    if (owner === 'left') {
      if (playerJevilAbsorbFinaleStartedRef.current) return;
      playerJevilAbsorbFinaleStartedRef.current = true;
      resetPlayerAttackAnimation();
      stopPlayerBlock();
      pressedKeys.current.clear();
      playerKnockbackVelocity.current = 0;
      jumpVelocity.current = 0;
      playerSpecialLockRef.current = true;
      setPlayerSpecialShooting(false);
      setPlayerSpecialSpriteOverride(null);
      return;
    }

    if (opponentJevilAbsorbFinaleStartedRef.current) return;
    opponentJevilAbsorbFinaleStartedRef.current = true;
    resetOpponentAttackAnimation();
    updateOpponentBlock(false);
    updateOpponentCrouch(false);
    opponentKnockbackVelocity.current = 0;
    opponentJumpVelocity.current = 0;
    opponentSpecialLockRef.current = true;
    setOpponentSpecialShooting(false);
    setOpponentSpecialSpriteOverride(null);
  }

  function updateJevilAbsorbRecovery(now = window.performance.now()) {
    if (playerJevilAbsorbRecoverUntilRef.current > 0 && now >= playerJevilAbsorbRecoverUntilRef.current) {
      playerJevilAbsorbRecoverUntilRef.current = 0;
      playerSpecialLockRef.current = false;
      setPlayerJevilHeadlessPose(false);
    }

    if (opponentJevilAbsorbRecoverUntilRef.current > 0 && now >= opponentJevilAbsorbRecoverUntilRef.current) {
      opponentJevilAbsorbRecoverUntilRef.current = 0;
      opponentSpecialLockRef.current = false;
      setOpponentJevilHeadlessPose(false);
    }
  }

  function updateJevilAbsorbTimers(now = window.performance.now()) {
    updateJevilAbsorbRecovery(now);

    if (
      playerJevilAbsorbActiveRef.current &&
      now >= playerJevilAbsorbEndsAtRef.current - JEVIL_ABSORB_FINALE_LOCK_MS
    ) {
      startJevilAbsorbFinale('left');
    }

    if (
      opponentJevilAbsorbActiveRef.current &&
      now >= opponentJevilAbsorbEndsAtRef.current - JEVIL_ABSORB_FINALE_LOCK_MS
    ) {
      startJevilAbsorbFinale('right');
    }

    if (playerJevilAbsorbActiveRef.current && now >= playerJevilAbsorbEndsAtRef.current) {
      finishJevilAbsorb('left');
    }

    if (opponentJevilAbsorbActiveRef.current && now >= opponentJevilAbsorbEndsAtRef.current) {
      finishJevilAbsorb('right');
    }
  }

  function startJevilAbsorb(owner: FighterSide) {
    const now = window.performance.now();
    playRandomJevilVoiceSound();

    if (owner === 'left') {
      playerJevilAbsorbActiveRef.current = true;
      playerJevilAbsorbDamageRef.current = 0;
      playerJevilAbsorbEndsAtRef.current = now + JEVIL_ABSORB_DURATION_MS;
      playerJevilAbsorbFinaleStartedRef.current = false;
      playerJevilAbsorbRecoverUntilRef.current = 0;
      setPlayerJevilAbsorbing(true);
      return;
    }

    opponentJevilAbsorbActiveRef.current = true;
    opponentJevilAbsorbDamageRef.current = 0;
    opponentJevilAbsorbEndsAtRef.current = now + JEVIL_ABSORB_DURATION_MS;
    opponentJevilAbsorbFinaleStartedRef.current = false;
    opponentJevilAbsorbRecoverUntilRef.current = 0;
    setOpponentJevilAbsorbing(true);
  }

  function startJevilTeleportShot(owner: FighterSide) {
    const isPlayerSide = owner === 'left';
    playRandomJevilVoiceSound();

    if (isPlayerSide) {
      specialReadyAt.current = window.performance.now() + JEVIL_TELEPORT_SPECIAL_COOLDOWN_MS;
      setPlayerSpecialSpriteOverride(jevilTeleportSpecialSprite);
    } else {
      opponentSpecialReadyAt.current = window.performance.now() + JEVIL_TELEPORT_SPECIAL_COOLDOWN_MS;
      setOpponentSpecialSpriteOverride(jevilTeleportSpecialSprite);
    }

    lockSpecialShooter(
      owner,
      JEVIL_TELEPORT_VANISH_MS + JEVIL_TELEPORT_FREEZE_MS + JEVIL_TELEPORT_SHOOT_POSE_MS,
    );

    const teleportTimer = isPlayerSide ? playerSpecialSpawnTimer : opponentSpecialSpawnTimer;
    if (teleportTimer.current) window.clearTimeout(teleportTimer.current);
    teleportTimer.current = window.setTimeout(() => {
      teleportTimer.current = null;

      if (isArenaPausedRef.current) {
        teleportTimer.current = runAfterArenaPause(() => {
          startJevilTeleportShot(owner);
        });
        return;
      }

      const nextPosition = clampFighterPosition(
        getRandomJevilTeleportPosition(owner),
        selectedStage,
        isPlayerSide ? player : opponent,
      );

      if (isPlayerSide) {
        setPlayerSpecialSpriteOverride(jevilTeleportFreezeSprite);
        positionRef.current = nextPosition;
        jumpVelocity.current = 0;
        playerKnockbackVelocity.current = 0;
        playerAirSpecialActiveRef.current = true;
        playerAirSpecialYRef.current = nextPosition.y;
        setPlayerPosition(nextPosition);
      } else {
        setOpponentSpecialSpriteOverride(jevilTeleportFreezeSprite);
        opponentPositionRef.current = nextPosition;
        opponentJumpVelocity.current = 0;
        opponentKnockbackVelocity.current = 0;
        opponentAirSpecialActiveRef.current = true;
        opponentAirSpecialYRef.current = nextPosition.y;
        setOpponentPosition(nextPosition);
      }

      teleportTimer.current = window.setTimeout(() => {
        teleportTimer.current = null;

        if (isArenaPausedRef.current) {
          teleportTimer.current = runAfterArenaPause(() => {
            if (isPlayerSide) {
              setPlayerSpecialSpriteOverride(jevilTeleportShootSprite);
              playerAirSpecialActiveRef.current = false;
              jumpVelocity.current = -0.08;
            } else {
              setOpponentSpecialSpriteOverride(jevilTeleportShootSprite);
              opponentAirSpecialActiveRef.current = false;
              opponentJumpVelocity.current = -0.08;
            }
            shootJevilChaosShot(owner);
          });
          return;
        }

        if (isPlayerSide) {
          setPlayerSpecialSpriteOverride(jevilTeleportShootSprite);
          playerAirSpecialActiveRef.current = false;
          jumpVelocity.current = -0.08;
        } else {
          setOpponentSpecialSpriteOverride(jevilTeleportShootSprite);
          opponentAirSpecialActiveRef.current = false;
          opponentJumpVelocity.current = -0.08;
        }

        shootJevilChaosShot(owner);
      }, JEVIL_TELEPORT_FREEZE_MS);
    }, JEVIL_TELEPORT_VANISH_MS);
  }

  function isOnJevilPlatform(fighter: Fighter, position: Position) {
    if (fighter.id !== 'jevil') return false;

    return jevilPlatformsRef.current.some(
      (platform) =>
        Math.abs(position.y - platform.y) <= 1 &&
        Math.abs(position.x - platform.x) <= JEVIL_PLATFORM_HALF_WIDTH,
    );
  }

  function getJevilPlatformLanding(
    fighter: Fighter,
    fromPosition: Position,
    toPosition: Position,
    verticalVelocity: number,
  ) {
    if (fighter.id !== 'jevil' || verticalVelocity >= 0) return null;

    return (
      jevilPlatformsRef.current.find(
        (platform) =>
          fromPosition.y >= platform.y &&
          toPosition.y <= platform.y &&
          Math.abs(toPosition.x - platform.x) <= JEVIL_PLATFORM_HALF_WIDTH,
      ) ?? null
    );
  }

  function lockSpecialShooter(owner: FighterSide, durationMs = SPECIAL_SHOOT_MS) {
    if (owner === 'left') {
      playerSpecialLockRef.current = true;
      setPlayerSpecialShooting(true);

      if (playerSpecialTimer.current) window.clearTimeout(playerSpecialTimer.current);
      playerSpecialTimer.current = window.setTimeout(() => {
        playerSpecialLockRef.current = false;
        setPlayerSpecialShooting(false);
        setPlayerSpecialSpriteOverride(null);
      }, durationMs);
      return;
    }

    opponentSpecialLockRef.current = true;
    setOpponentSpecialShooting(true);

    if (opponentSpecialTimer.current) window.clearTimeout(opponentSpecialTimer.current);
    opponentSpecialTimer.current = window.setTimeout(() => {
      opponentSpecialLockRef.current = false;
      setOpponentSpecialShooting(false);
      setOpponentSpecialSpriteOverride(null);
    }, durationMs);
  }

  function getProjectileDamage(projectile: Projectile) {
    if (typeof projectile.damage === 'number') return projectile.damage;

    const kind = projectile.kind;
    return kind === 'queen-heal-wave'
      ? QUEEN_HEAL_WAVE_DAMAGE
      : kind === 'queen-wave'
        ? QUEEN_PROJECTILE_DAMAGE
        : kind === 'knight-sword'
          ? KNIGHT_SWORD_PROJECTILE_DAMAGE
          : kind === 'jevil-chaos-shot'
            ? JEVIL_CHAOS_SHOT_DAMAGE
          : kind === 'jevil-head'
            ? 0
          : kind === 'jevil-scythe'
            ? JEVIL_SCYTHE_DAMAGE
        : PROJECTILE_DAMAGE;
  }

  function getProjectileKnockback(projectile: Projectile) {
    if (typeof projectile.knockback === 'number') return projectile.knockback;

    const kind = projectile.kind;
    return kind === 'queen-heal-wave'
      ? QUEEN_HEAL_WAVE_KNOCKBACK
      : kind === 'knight-sword'
        ? KNIGHT_SWORD_PROJECTILE_KNOCKBACK
      : kind === 'jevil-chaos-shot'
        ? JEVIL_CHAOS_SHOT_KNOCKBACK
      : kind === 'jevil-head'
        ? 0
      : kind === 'jevil-scythe'
        ? 0
      : kind === 'queen-wave'
        ? QUEEN_PROJECTILE_KNOCKBACK_VELOCITY
        : PROJECTILE_KNOCKBACK_VELOCITY;
  }

  function getProjectileSprite(projectile: Projectile) {
    if (projectile.kind === 'queen-wave') return queenProjectileSprite;
    if (projectile.kind === 'knight-sword') return roaringKnightSwordProjectileSprite;
    if (projectile.kind === 'jevil-scythe') return jevilScytheProjectileSprite;
    if (projectile.kind === 'jevil-head') return jevilHeadProjectileSprite;
    if (projectile.kind === 'jevil-chaos-shot') {
      return projectile.projectileSprite ?? jevilChaosProjectileOneSprite;
    }

    return misterAntTennaProjectileSprite;
  }

  function applyProjectileKnockback(target: FighterSide, direction: -1 | 1, strength = PROJECTILE_KNOCKBACK_VELOCITY) {
    if (target === 'left') {
      playerKnockbackVelocity.current = direction * strength;
      return;
    }

    opponentKnockbackVelocity.current = direction * strength;
  }

  function triggerOpponentAirSpecial() {
    const direction: -1 | 1 = positionRef.current.x <= opponentPositionRef.current.x ? -1 : 1;

    opponentSpecialReadyAt.current = window.performance.now() + TENNA_AIR_SPECIAL_COOLDOWN_MS;
    opponentJumpVelocity.current = 0;
    opponentAirSpecialActiveRef.current = true;
    opponentAirSpecialYRef.current = clamp(
      Math.max(opponentPositionRef.current.y, 42),
      0,
      getFighterMaxY(selectedStage, opponent),
    );
    opponentPositionRef.current = clampFighterPosition(
      {
        ...opponentPositionRef.current,
        y: opponentAirSpecialYRef.current,
      },
      selectedStage,
      opponent,
    );
    setOpponentPosition(opponentPositionRef.current);
    setOpponentAirSpecialWave(true);
    lockSpecialShooter('right');

    if (opponentSpecialTimer.current) window.clearTimeout(opponentSpecialTimer.current);
    opponentSpecialTimer.current = window.setTimeout(() => {
      opponentAirSpecialActiveRef.current = false;
      opponentSpecialLockRef.current = false;
      setOpponentSpecialShooting(false);
    }, TENNA_AIR_SPECIAL_HOLD_MS);

    if (opponentAirSpecialWaveTimer.current) window.clearTimeout(opponentAirSpecialWaveTimer.current);
    opponentAirSpecialWaveTimer.current = window.setTimeout(() => {
      setOpponentAirSpecialWave(false);
    }, TENNA_AIR_SPECIAL_WAVE_MS);

    const distance = Math.abs(positionRef.current.x - opponentPositionRef.current.x);
    const verticalDistance = Math.abs(positionRef.current.y - opponentPositionRef.current.y);

    if (
      distance <= TENNA_AIR_SPECIAL_RANGE &&
      verticalDistance <= TENNA_AIR_SPECIAL_VERTICAL_RANGE &&
      playerStatusRef.current !== 'knockdown'
    ) {
      const canApplyKnockback = damagePlayer(TENNA_AIR_SPECIAL_DAMAGE, 'none', 'mid');
      consumeOpponentPlan(canApplyKnockback, 'airSpecial');
      if (canApplyKnockback && !isPlayerKnightSphereActive() && !isPlayerKnightDarkWaveHolding()) {
        applyProjectileKnockback('left', direction, TENNA_AIR_SPECIAL_KNOCKBACK);
      }
    } else {
      consumeOpponentPlan(false, 'airSpecial');
    }
  }

  useEffect(() => {
    if (screen !== 'arena') return undefined;
    if (arenaMode === 'sandbox') return undefined;
    const timeExpired = roundTimeLeft <= 0;
    if (opponentHealth > 0 && playerHealth > 0 && !timeExpired) return undefined;
    if (roundResolvedRef.current) return undefined;

    const roundWinner: FighterSide =
      timeExpired && playerHealth > 0 && opponentHealth > 0
        ? playerHealth >= opponentHealth
          ? 'left'
          : 'right'
        : opponentHealth <= 0
          ? 'left'
          : 'right';
    const nextPlayerWins = playerRoundWins + (roundWinner === 'left' ? 1 : 0);
    const nextOpponentWins = opponentRoundWins + (roundWinner === 'right' ? 1 : 0);
    const roundWinnerFighter = roundWinner === 'left' ? player : opponent;
    const victorySprites = roundWinnerFighter.victorySprites ?? [];
    const availableVictorySprites =
      selectedStage.id === 'tenna-stage'
        ? victorySprites
        : victorySprites.filter((sprite) => sprite !== queenVictoryBackdropSprite);

    if (timeExpired && playerHealth > 0 && opponentHealth > 0) {
      if (roundWinner === 'left') {
        opponentHealthRef.current = 0;
        setOpponentHealth(0);
      } else {
        playerHealthRef.current = 0;
        setPlayerHealth(0);
      }
    }

    setWinnerSide(roundWinner);
    setRoundWinnerPoseSprite(
      availableVictorySprites.length > 0
        ? availableVictorySprites[Math.floor(Math.random() * availableVictorySprites.length)]
        : null,
    );
    if (roundWinnerFighter.id === 'jevil') {
      playRandomJevilVoiceSound();
    }
    roundResolvedRef.current = true;
    if (roundWinner === 'left') {
      setPlayerRoundWins(nextPlayerWins);
    } else {
      setOpponentRoundWins(nextOpponentWins);
    }

    if (victoryTimer.current) window.clearTimeout(victoryTimer.current);
    if (roundTransitionTimer.current) window.clearTimeout(roundTransitionTimer.current);
    if (roundCurtainTimer.current) window.clearTimeout(roundCurtainTimer.current);
    victoryTimer.current = window.setTimeout(() => {
      if (nextPlayerWins >= 2 || nextOpponentWins >= 2) {
        setScreen('victory');
        return;
      }

      setRoundCurtainPhase('closing');
      roundTransitionTimer.current = window.setTimeout(() => {
        resetRound();
        setRoundNumber((currentRound) => currentRound + 1);
        setRoundCurtainPhase('opening');

        roundCurtainTimer.current = window.setTimeout(() => {
          setRoundCurtainPhase('idle');
          roundCurtainTimer.current = null;
        }, ROUND_CURTAIN_OPEN_MS);
        roundTransitionTimer.current = null;
      }, ROUND_CURTAIN_CLOSED_MS);
    }, nextPlayerWins >= 2 || nextOpponentWins >= 2 ? FATALITY_WINDOW_MS : ROUND_CURTAIN_DROP_DELAY_MS);

    return undefined;
  }, [arenaMode, opponentHealth, opponentRoundWins, playerHealth, playerRoundWins, roundTimeLeft, screen]);

  useEffect(() => {
    if (screen !== 'arena') return undefined;

    function damageOpponent(nextAttack: Exclude<Attack, 'idle'>, isCrouchAttack: boolean) {
      if (player.id === 'gerson-boom' && nextAttack === 'kick') {
        useGersonParry('left');
        return;
      }
      if (opponentStatusRef.current === 'knockdown') return;

      const range =
        (nextAttack === 'punch' ? 18 : 22) +
        (isOpponentKnightSpecialHurtboxExpanded() ? KNIGHT_SPECIAL_HURTBOX_BONUS : 0);
      const baseDamage =
        isCrouchAttack && nextAttack === 'kick'
          ? 2
          : isCrouchAttack && nextAttack === 'punch'
            ? 12
            : nextAttack === 'punch'
              ? 4
              : 7;
      const hitLevel: HitLevel =
        isCrouchAttack && nextAttack === 'kick'
          ? 'low'
            : isCrouchAttack && nextAttack === 'punch'
              ? 'mid'
            : nextAttack === 'punch'
              ? getStandingPunchHitLevel(player)
              : getStandingKickHitLevel(player);
      const distance = Math.abs(opponentPositionRef.current.x - positionRef.current.x);

      if (
        distance <= range &&
        canMeleeAttackReachVertical(
          positionRef.current.y,
          opponentPositionRef.current.y,
          isCrouchAttack && nextAttack === 'punch' ? 'uppercut' : isCrouchAttack && nextAttack === 'kick' ? 'sweep' : 'none',
          hitLevel,
        )
      ) {
        const canApplyHitEffect = damageOpponentHealth(baseDamage, hitLevel);
        if (!canApplyHitEffect) {
          if (opponentBlockingRef.current) rememberAiOutcome('block', true, 0.9);
          if (opponentCrouchingRef.current && hitLevel === 'high') rememberAiOutcome('crouch', true, 0.9);
          if (opponentPositionRef.current.y > 0 && hitLevel === 'low') rememberAiOutcome('jump', true, 0.9);
          return;
        }
        if (player.id === 'jevil') {
          playRandomJevilVoiceSound();
        }
        if (opponentBlockingRef.current) rememberAiOutcome('block', false, 0.8);
        if (opponentCrouchingRef.current) rememberAiOutcome('crouch', false, 0.7);
        if (isOpponentKnightSphereActive()) return;

        if (isCrouchAttack && nextAttack === 'kick') {
          if (opponent.id === 'roaring-knight') resetOpponentAttackAnimation();
          if (opponentStatusTimer.current) window.clearTimeout(opponentStatusTimer.current);
          opponentJumpVelocity.current = 0;
          updateOpponentStatus('knockdown');
          opponentStatusTimer.current = window.setTimeout(() => {
            recoverFromKnockdown('right');
          }, SWEEP_KNOCKDOWN_MS);
          return;
        }

        if (isCrouchAttack && nextAttack === 'punch') {
          if (opponent.id === 'roaring-knight') resetOpponentAttackAnimation();
          if (opponentStatusTimer.current) window.clearTimeout(opponentStatusTimer.current);
          opponentJumpVelocity.current = 13.2;
          applyProjectileKnockback(
            'right',
            opponentPositionRef.current.x >= positionRef.current.x ? 1 : -1,
            UPPERCUT_KNOCKBACK,
          );
          updateOpponentStatus('launched');
          return;
        }

        applyProjectileKnockback(
          'right',
          opponentPositionRef.current.x >= positionRef.current.x ? 1 : -1,
          getAttackKnockbackStrength(player, nextAttack),
        );
      }
    }

    function triggerAttack(nextAttack: Exclude<Attack, 'idle'>) {
      const now = window.performance.now();
      const isKnightSwordShot = player.id === 'roaring-knight' && nextAttack === 'kick';
      const isGersonParry = player.id === 'gerson-boom' && nextAttack === 'kick';

      if (
        now < attackReadyAt.current ||
        attackRef.current !== 'idle' ||
        opponentHealthRef.current <= 0
      ) {
        return;
      }
      attackReadyAt.current =
        now + (isKnightSwordShot ? KNIGHT_SWORD_PROJECTILE_COOLDOWN_MS : getFighterAttackCooldown(player, nextAttack));

      const isCrouchAttack =
        canFighterCrouch(player) && pressedKeys.current.has('s') && positionRef.current.y === 0;
      const playerHitLevel: HitLevel =
        isCrouchAttack && nextAttack === 'kick'
          ? 'low'
          : isCrouchAttack && nextAttack === 'punch'
            ? 'mid'
            : nextAttack === 'punch'
              ? getStandingPunchHitLevel(player)
              : getStandingKickHitLevel(player);
      rememberPlayerAction(playerHitLevel);
      rememberPlayerAction(Math.abs(opponentPositionRef.current.x - positionRef.current.x) <= 24 ? 'close' : 'far', 0.45, {
        includeTotal: false,
      });
      if (isCrouchAttack) rememberPlayerAction('crouch', 0.7, { includeTotal: false });
      if (isKnightSwordShot) rememberPlayerAction('projectile', 1.15);
      playerAttackFacingRef.current = getFacingToward(positionRef.current.x, opponentPositionRef.current.x);
      attackRef.current = nextAttack;
      playerAttackStartedAt.current = now;
      setAttack(nextAttack);
      if (!isKnightSwordShot) {
        playAttackSound(player, nextAttack, isCrouchAttack);
      }

      if (attackHitTimer.current) window.clearTimeout(attackHitTimer.current);
      if (attackTimer.current) window.clearTimeout(attackTimer.current);
      const isCrouchUppercut = nextAttack === 'punch' && isCrouchAttack;
      const attackDuration =
        isKnightSwordShot
          ? KNIGHT_SWORD_PROJECTILE_COOLDOWN_MS
          : isGersonParry
            ? GERSON_PARRY_DURATION_MS
          : isCrouchUppercut
          ? CROUCH_UPPERCUT_DURATION_MS + CROUCH_UPPERCUT_RECOVERY_MS
          : getFighterAttackDuration(player, nextAttack);
      const hitFrameRatio = isCrouchAttack ? CROUCH_HIT_FRAME_RATIO : ATTACK_HIT_FRAME_RATIO;
      const attackHitFrameRatio = isGersonParry ? GERSON_PARRY_HIT_FRAME_RATIO : hitFrameRatio;
      const attackHitDelay = isGersonParry
        ? CPU_GERSON_PARRY_PROJECTILE_HIT_MS
        : isKnightSwordShot
          ? KNIGHT_SWORD_PROJECTILE_SHOOT_MS
          : Math.max(0, Math.floor(attackDuration * attackHitFrameRatio));
      let attackHitAt = now + attackHitDelay;
      let attackEndsAt = now + attackDuration;

      setIsCrouchAttackLocked(isCrouchAttack);
      const resolvePlayerAttackHit = () => {
        if (
          attackRef.current !== nextAttack ||
          playerStatusRef.current !== 'idle' ||
          opponentHealthRef.current <= 0
        ) {
          return;
        }

        if (isKnightSwordShot) {
          const direction: -1 | 1 = opponentPositionRef.current.x >= positionRef.current.x ? 1 : -1;
          spawnProjectile('left', positionRef.current.x, direction, 'high', 'knight-sword', {
            bottomPx: getKnightSwordProjectileBottom(
              positionRef.current,
              player.id === 'roaring-knight' ? knightVisualLiftRef.current : 0,
            ),
          });
          return;
        }

        damageOpponent(nextAttack, isCrouchAttack);
      };
      const finishPlayerAttack = () => {
        attackRef.current = 'idle';
        playerAttackFacingRef.current = null;
        playerAttackStartedAt.current = 0;
        setIsCrouchAttackLocked(false);
        setAttack('idle');
      };
      const handlePlayerAttackHitTimer = () => {
        attackHitTimer.current = null;

        if (isArenaPausedRef.current) {
          const pausedAt = arenaPauseStartedAtRef.current || window.performance.now();
          const remainingAfterPause = Math.max(0, attackHitAt - pausedAt);
          attackHitTimer.current = runAfterArenaPause(() => {
            attackHitAt += Math.max(0, window.performance.now() - pausedAt);
            attackHitTimer.current = window.setTimeout(handlePlayerAttackHitTimer, remainingAfterPause);
          });
          return;
        }
        resolvePlayerAttackHit();
      };
      attackHitTimer.current = window.setTimeout(handlePlayerAttackHitTimer, attackHitDelay);

      const handlePlayerAttackEndTimer = () => {
        attackTimer.current = null;

        if (isArenaPausedRef.current) {
          const pausedAt = arenaPauseStartedAtRef.current || window.performance.now();
          const remainingAfterPause = Math.max(0, attackEndsAt - pausedAt);
          attackTimer.current = runAfterArenaPause(() => {
            attackEndsAt += Math.max(0, window.performance.now() - pausedAt);
            attackTimer.current = window.setTimeout(handlePlayerAttackEndTimer, remainingAfterPause);
          });
          return;
        }
        finishPlayerAttack();
      };
      attackTimer.current = window.setTimeout(handlePlayerAttackEndTimer, attackDuration);
    }

    function spawnGersonLeapBoostEffect(side: FighterSide, x: number, direction: -1 | 1) {
      const leapEffectId = gersonLeapEffectIdRef.current++;

      setGersonLeapEffects((effects) => [
        ...effects,
        { id: leapEffectId, side, x, direction },
      ]);
      window.setTimeout(() => {
        setGersonLeapEffects((effects) => effects.filter((effect) => effect.id !== leapEffectId));
      }, 720);
    }

    function launchPlayerGersonLeap(direction: -1 | 1) {
      if (
        isArenaPausedRef.current ||
        roundResolvedRef.current ||
        roundCountdownRef.current > 0 ||
        player.id !== 'gerson-boom' ||
        playerStatusRef.current !== 'idle' ||
        positionRef.current.y > 0
      ) {
        playerSpecialLockRef.current = false;
        setPlayerGersonLeapPreparing(false);
        return;
      }

      const startX = positionRef.current.x;
      const nextX = clampAirbornePlayerX(
        startX + direction * GERSON_LEAP_DASH_START_X,
        startX,
        opponentPositionRef.current.x,
      );

      spawnGersonLeapBoostEffect('left', startX, direction);
      setPlayerGersonLeapPreparing(false);
      setPlayerGersonLeapActive(true);
      playerGersonLeapDirectBoostReadyRef.current = true;
      jumpVelocity.current = GERSON_LEAP_JUMP_POWER;
      playerKnockbackVelocity.current = direction * GERSON_LEAP_DASH_VELOCITY;
      positionRef.current = { ...positionRef.current, x: nextX };
      setPlayerPosition(positionRef.current);
      playerSpecialLockRef.current = false;
    }

    function triggerSpecial(specialMove: PlayerSpecialMove) {
      const now = window.performance.now();
      const direction: -1 | 1 = opponentPositionRef.current.x >= positionRef.current.x ? 1 : -1;
      const isTennaGroundSpecial = specialMove === 'tenna-ground';
      const isTennaAirSpecial = specialMove === 'tenna-air';
      const isQueenSpecial = specialMove === 'queen-ground';
      const isQueenHeal = specialMove === 'queen-heal';
      const isGersonLeap = specialMove === 'gerson-leap';
      const isJevilPlatforms = specialMove === 'jevil-platforms';
      const isJevilChaos = specialMove === 'jevil-chaos';
      const isJevilAbsorb = specialMove === 'jevil-absorb';
      const playerOnGroundOrJevilPlatform =
        positionRef.current.y === 0 || isOnJevilPlatform(player, positionRef.current);

      if (
        now < specialReadyAt.current ||
        attackRef.current !== 'idle' ||
        playerSpecialLockRef.current ||
        playerBlockHeldRef.current ||
        playerStatusRef.current !== 'idle' ||
        ((isTennaGroundSpecial || isQueenSpecial || isQueenHeal) && positionRef.current.y > 0) ||
        (isTennaAirSpecial && positionRef.current.y <= 0) ||
        ((isTennaGroundSpecial || isTennaAirSpecial) && player.id !== 'mister-ant-tenna') ||
        ((isQueenSpecial || isQueenHeal) && player.id !== 'queen') ||
        (isGersonLeap && (player.id !== 'gerson-boom' || positionRef.current.y > 0)) ||
        ((isJevilPlatforms || isJevilChaos || isJevilAbsorb) && player.id !== 'jevil') ||
        (isJevilAbsorb && !playerOnGroundOrJevilPlatform) ||
        (isJevilAbsorb && playerJevilAbsorbActiveRef.current) ||
        (isJevilPlatforms && jevilPlatformsRef.current.length > 0) ||
        opponentHealthRef.current <= 0
      ) {
        return false;
      }

      specialReadyAt.current =
        now +
        (isQueenHeal
          ? QUEEN_HEAL_COOLDOWN_MS
          : isQueenSpecial
          ? QUEEN_SPECIAL_COOLDOWN_MS
          : isGersonLeap
            ? SPECIAL_COOLDOWN_MS
          : isJevilChaos
            ? JEVIL_CHAOS_SPECIAL_COOLDOWN_MS
          : isJevilAbsorb
            ? 0
          : isJevilPlatforms
            ? 0
          : isTennaAirSpecial
            ? TENNA_AIR_SPECIAL_COOLDOWN_MS
            : SPECIAL_COOLDOWN_MS);

      if (isQueenHeal) {
        rememberPlayerAction('special', 0.85);
        startQueenHeal('left');
        return true;
      }

      if (isTennaGroundSpecial) {
        playTennaStarSpecialSound();
      }

      if (isGersonLeap) {
        rememberPlayerAction('special', 1.1);
        rememberPlayerAction('jump', 0.9, { includeTotal: false });
        rememberPlayerAction('air', 0.7, { includeTotal: false });
        stopPlayerGersonSpin();
        playerSpecialLockRef.current = true;
        setPlayerGersonLeapPreparing(true);
        if (playerGersonLeapPrepTimer.current) window.clearTimeout(playerGersonLeapPrepTimer.current);
        playerGersonLeapPrepTimer.current = window.setTimeout(() => {
          playerGersonLeapPrepTimer.current = null;
          launchPlayerGersonLeap(direction);
        }, GERSON_LEAP_PREP_MS);
        return true;
      }

      if (isJevilChaos) {
        playRandomJevilVoiceSound();
        setPlayerSpecialSpriteOverride(jevilChaosSpecialSprite);
        lockSpecialShooter('left', JEVIL_CHAOS_SPECIAL_MS);
        if (playerSpecialSpawnTimer.current) window.clearTimeout(playerSpecialSpawnTimer.current);
        playerSpecialSpawnTimer.current = window.setTimeout(() => {
          playerSpecialSpawnTimer.current = null;
          spawnJevilScythe('left');
        }, 160);
        rememberPlayerAction('special', 0.95);
        return true;
      }

      if (isJevilAbsorb) {
        startJevilAbsorb('left');
        rememberPlayerAction('special', 1.05);
        return true;
      }

      if (isJevilPlatforms) {
        playRandomJevilVoiceSound();
        setPlayerSpecialSpriteOverride(jevilPlatformSpecialSprite);
        lockSpecialShooter('left');
        spawnJevilPlatforms('left');
        rememberPlayerAction('special', 1.1);
        return true;
      }

      lockSpecialShooter('left');
      rememberPlayerAction('special', 1.1);

      if (isQueenSpecial) {
        rememberPlayerAction('projectile', 0.85);
        if (playerSpecialSpawnTimer.current) window.clearTimeout(playerSpecialSpawnTimer.current);
        playerSpecialSpawnTimer.current = window.setTimeout(() => {
          const delayedDirection: -1 | 1 =
            opponentPositionRef.current.x >= positionRef.current.x ? 1 : -1;

          spawnProjectile('left', positionRef.current.x, delayedDirection, 'high', 'queen-wave');
        }, SPECIAL_SHOOT_MS);
        return true;
      }

      if (isTennaAirSpecial) {
        rememberPlayerAction('air', 0.7, { includeTotal: false });
        jumpVelocity.current = 0;
        playerAirSpecialActiveRef.current = true;
        playerAirSpecialYRef.current = Math.max(positionRef.current.y, 28);
        setPlayerAirSpecialWave(true);

        if (playerSpecialTimer.current) window.clearTimeout(playerSpecialTimer.current);
        playerSpecialTimer.current = window.setTimeout(() => {
          playerAirSpecialActiveRef.current = false;
          playerSpecialLockRef.current = false;
          setPlayerSpecialShooting(false);
        }, TENNA_AIR_SPECIAL_HOLD_MS);

        if (playerAirSpecialWaveTimer.current) window.clearTimeout(playerAirSpecialWaveTimer.current);
        playerAirSpecialWaveTimer.current = window.setTimeout(() => {
          setPlayerAirSpecialWave(false);
        }, TENNA_AIR_SPECIAL_WAVE_MS);

        const distance = Math.abs(opponentPositionRef.current.x - positionRef.current.x);
        const verticalDistance = Math.abs(opponentPositionRef.current.y - positionRef.current.y);

        if (
          distance <= TENNA_AIR_SPECIAL_RANGE &&
          verticalDistance <= TENNA_AIR_SPECIAL_VERTICAL_RANGE &&
          opponentStatusRef.current !== 'knockdown'
        ) {
          const canApplyKnockback = damageOpponentHealth(TENNA_AIR_SPECIAL_DAMAGE, 'mid');
          if (canApplyKnockback) {
            applyProjectileKnockback('right', direction, TENNA_AIR_SPECIAL_KNOCKBACK);
          }
        }

        return true;
      }

      spawnProjectile('left', positionRef.current.x, direction, 'low', 'tenna-star');
      rememberPlayerAction('projectile', 0.85);
      return true;
    }

    function resetSpecialInput() {
      specialInputStep.current = 0;
      specialInputExpiresAt.current = 0;
      specialInputStartedAt.current = 0;
      specialInputMove.current = null;
      specialInputBuffer.current = [];
    }

    function getSpecialInputSequence(move: PlayerSpecialMove): string[] {
      const targetArrow = opponentPositionRef.current.x >= positionRef.current.x ? 'arrowright' : 'arrowleft';
      const gersonSideKey = opponentPositionRef.current.x >= positionRef.current.x ? 'd' : 'a';

      if (move === 'queen-ground') return ['a', 'd', targetArrow];
      if (move === 'queen-heal') return ['s', 's', 'arrowdown'];
      if (move === 'gerson-leap') return ['s', gersonSideKey, 'arrowup'];
      if (move === 'tenna-air') return ['a', 'd', targetArrow];
      if (move === 'jevil-platforms') return ['a', 'd', 's', 'arrowup'];
      if (move === 'jevil-absorb') return ['s', 'arrowdown', 'arrowdown', 'arrowup'];
      if (move === 'jevil-chaos') {
        return opponentPositionRef.current.x < positionRef.current.x
          ? ['a', 'd', 'arrowleft']
          : ['d', 'a', 'arrowleft'];
      }

      return ['s', 'd', targetArrow];
    }

    function getJevilSpecialSequences(): Array<{ move: PlayerSpecialMove; keys: string[] }> {
      return [
        { move: 'jevil-platforms', keys: getSpecialInputSequence('jevil-platforms') },
        { move: 'jevil-chaos', keys: getSpecialInputSequence('jevil-chaos') },
        { move: 'jevil-absorb', keys: getSpecialInputSequence('jevil-absorb') },
      ];
    }

    function getFirstSpecialMove(key: string): PlayerSpecialMove | null {
      if (player.id === 'queen' && positionRef.current.y === 0) {
        if (key === 's') return 'queen-heal';
        if (key === 'a') return 'queen-ground';
      }

      if (player.id === 'mister-ant-tenna') {
        return positionRef.current.y > 0 ? (key === 'a' ? 'tenna-air' : null) : key === 's' ? 'tenna-ground' : null;
      }

      if (player.id === 'gerson-boom' && positionRef.current.y === 0 && key === 's') {
        return 'gerson-leap';
      }

      if (player.id === 'jevil' && key === 'a') {
        return 'jevil-platforms';
      }

      return null;
    }

    function advanceSpecialInput(key: string): PlayerSpecialMove | null {
      const now = window.performance.now();

      if (
        now > specialInputExpiresAt.current ||
        (specialInputStartedAt.current > 0 &&
          now - specialInputStartedAt.current > SPECIAL_INPUT_TOTAL_MS)
      ) {
        resetSpecialInput();
      }

      if (player.id === 'jevil') {
        const nextBuffer = [...specialInputBuffer.current, key];
        const sequences = getJevilSpecialSequences();
        const matches = sequences.filter(({ keys }) =>
          nextBuffer.every((bufferKey, index) => keys[index] === bufferKey),
        );
        const completed = matches.find(({ keys }) => keys.length === nextBuffer.length);

        if (completed) {
          resetSpecialInput();
          return completed.move;
        }

        if (matches.length > 0) {
          specialInputBuffer.current = nextBuffer;
          specialInputStep.current = nextBuffer.length;
          specialInputMove.current = matches[0].move;
          specialInputStartedAt.current = specialInputStartedAt.current || now;
          specialInputExpiresAt.current = now + SPECIAL_INPUT_WINDOW_MS;
          return null;
        }

        resetSpecialInput();

        const restartMatches = sequences.filter(({ keys }) => keys[0] === key);
        if (restartMatches.length > 0) {
          specialInputBuffer.current = [key];
          specialInputStep.current = 1;
          specialInputMove.current = restartMatches[0].move;
          specialInputStartedAt.current = now;
          specialInputExpiresAt.current = now + SPECIAL_INPUT_WINDOW_MS;
        }

        return null;
      }

      if (specialInputMove.current && specialInputStep.current > 0) {
        const sequence = getSpecialInputSequence(specialInputMove.current);
        const expectedKey = sequence[specialInputStep.current];

        if (key === expectedKey) {
          specialInputStep.current += 1;
          specialInputExpiresAt.current = now + SPECIAL_INPUT_WINDOW_MS;

          if (specialInputStep.current >= sequence.length) {
            const completedMove = specialInputMove.current;
            resetSpecialInput();
            return completedMove;
          }

          return null;
        }

        resetSpecialInput();
      }

      const firstComboMove = getFirstSpecialMove(key);

      if (firstComboMove) {
        specialInputStep.current = 1;
        specialInputMove.current = firstComboMove;
        specialInputStartedAt.current = now;
        specialInputExpiresAt.current = now + SPECIAL_INPUT_WINDOW_MS;
        return null;
      }

      return null;
    }

    function advanceKnightDarkWaveInput(key: string): -1 | 1 | null {
      if (player.id !== 'roaring-knight' || knightSpherePhaseRef.current !== 'idle') {
        resetKnightDarkWaveInput();
        return null;
      }

      const now = window.performance.now();

      if (
        now > knightDarkWaveInputExpiresAt.current ||
        (knightDarkWaveInputStartedAt.current > 0 &&
          now - knightDarkWaveInputStartedAt.current > KNIGHT_DARK_WAVE_INPUT_TOTAL_MS)
      ) {
        resetKnightDarkWaveInput();
      }

      const sequence = ['s', 's', 'arrowdown'];

      if (knightDarkWaveInputStep.current >= sequence.length) {
        if (key === 'arrowleft' || key === 'arrowright') {
          resetKnightDarkWaveInput();
          return key === 'arrowright' ? 1 : -1;
        }

        resetKnightDarkWaveInput();
        if (key !== 's') return null;
      }

      const expectedKey = sequence[knightDarkWaveInputStep.current];

      if (key !== expectedKey) {
        resetKnightDarkWaveInput();

        if (key === 's') {
          knightDarkWaveInputStartedAt.current = now;
          knightDarkWaveInputStep.current = 1;
          knightDarkWaveInputExpiresAt.current = now + KNIGHT_DARK_WAVE_INPUT_WINDOW_MS;
        }

        return null;
      }

      if (knightDarkWaveInputStep.current === 0) {
        knightDarkWaveInputStartedAt.current = now;
      }

      knightDarkWaveInputStep.current += 1;
      knightDarkWaveInputExpiresAt.current = now + KNIGHT_DARK_WAVE_INPUT_WINDOW_MS;

      return null;
    }

    function advanceKnightSphereInput(key: string): 'enter' | 'exit' | 'bird' | null {
      if (player.id !== 'roaring-knight') return null;

      const phase = knightSpherePhaseRef.current;
      if (phase !== 'idle' && phase !== 'active') {
        resetKnightSphereInput();
        return null;
      }

      const now = window.performance.now();

      if (
        now > knightSphereInputExpiresAt.current ||
        (knightSphereInputStartedAt.current > 0 &&
          now - knightSphereInputStartedAt.current > KNIGHT_SPHERE_INPUT_TOTAL_MS)
      ) {
        resetKnightSphereInput();
      }

      if (phase === 'active') {
        const towardEnemyKey = opponentPositionRef.current.x >= positionRef.current.x ? 'arrowright' : 'arrowleft';
        const step = knightSphereInputStep.current;

        if (step === 0) {
          if (key !== 'a') return null;
          knightSphereInputStartedAt.current = now;
          knightSphereInputStep.current = 1;
          knightSphereInputExpiresAt.current = now + KNIGHT_SPHERE_INPUT_WINDOW_MS;
          return null;
        }

        if (step === 1) {
          if (key !== 'd') {
            resetKnightSphereInput();
            if (key === 'a') {
              knightSphereInputStartedAt.current = now;
              knightSphereInputStep.current = 1;
              knightSphereInputExpiresAt.current = now + KNIGHT_SPHERE_INPUT_WINDOW_MS;
            }
            return null;
          }

          knightSphereInputStep.current = 2;
          knightSphereInputExpiresAt.current = now + KNIGHT_SPHERE_INPUT_WINDOW_MS;
          return null;
        }

        if (step === 2) {
          if (key === towardEnemyKey) {
            resetKnightSphereInput();
            return 'bird';
          }

          if (key === 's') {
            knightSphereInputStep.current = 3;
            knightSphereInputExpiresAt.current = now + KNIGHT_SPHERE_INPUT_WINDOW_MS;
            return null;
          }

          resetKnightSphereInput();
          if (key === 'a') {
            knightSphereInputStartedAt.current = now;
            knightSphereInputStep.current = 1;
            knightSphereInputExpiresAt.current = now + KNIGHT_SPHERE_INPUT_WINDOW_MS;
          }
          return null;
        }

        if (step === 3) {
          const didExit = key === 'arrowdown';
          resetKnightSphereInput();
          return didExit ? 'exit' : null;
        }
      }

      const sequence = ['a', 'd', 'w', 'arrowup'];
      const expectedKey = sequence[knightSphereInputStep.current];

      if (key !== expectedKey) {
        resetKnightSphereInput();

        if (key !== sequence[0]) return null;
      }

      if (knightSphereInputStep.current === 0) {
        knightSphereInputStartedAt.current = now;
      }

      knightSphereInputStep.current += 1;
      knightSphereInputExpiresAt.current = now + KNIGHT_SPHERE_INPUT_WINDOW_MS;

      if (knightSphereInputStep.current < sequence.length) return null;

      resetKnightSphereInput();
      return 'enter';
    }

    function handleKeyDown(event: KeyboardEvent) {
      const key = getGameKey(event, controlBindings);

      if (key === 'escape') {
        event.preventDefault();
        if (!event.repeat) {
          setSettingsOpen((isOpen) => !isOpen);
        }
        return;
      }

      const handledKeys: string[] = ['w', 'a', 's', 'd', 'arrowleft', 'arrowright', 'arrowdown', 'arrowup', 'block'];

      if (!handledKeys.includes(key)) return;
      event.preventDefault();

      if (arenaMode === 'online' && onlineRoleRef.current === 'guest') {
        if (!isArenaPausedRef.current && !event.repeat) {
          pressedKeys.current.add(key);
          broadcastOnlineInput(key, true);
          if (key === 'w' && opponentJumpVelocity.current === 0) {
            opponentJumpVelocity.current = getFighterJumpPower(opponent);
          }
          if (key === 's' && canFighterCrouch(opponent)) {
            updateOpponentCrouch(true);
          }
          if (key === 'block') {
            updateOpponentBlock(true);
          }
          if (
            (key === 'arrowleft' || key === 'arrowright') &&
            opponentAttackRef.current === 'idle' &&
            opponentStatusRef.current === 'idle' &&
            !opponentSpecialLockRef.current
          ) {
            const predictedAttack = key === 'arrowleft' ? 'punch' : 'kick';
            updateOpponentAttack(predictedAttack);
            playAttackSound(opponent, predictedAttack, pressedKeys.current.has('s'));
            if (opponentAttackTimer.current) window.clearTimeout(opponentAttackTimer.current);
            opponentAttackTimer.current = window.setTimeout(() => {
              if (onlineRoleRef.current !== 'guest') return;
              updateOpponentAttack('idle');
            }, getFighterAttackDuration(opponent, predictedAttack));
          }
        }
        return;
      }

      if (isArenaPausedRef.current) return;
      if (roundCountdownRef.current > 0 || roundResolvedRef.current) return;
      if (event.repeat) return;

      const knightDarkWaveDirection = advanceKnightDarkWaveInput(key);
      if (knightDarkWaveDirection) {
        rememberPlayerAction('special', 1.25);
        rememberPlayerAction('far', 0.5, { includeTotal: false });
        startPlayerKnightDarkWaveHold(knightDarkWaveDirection);
        return;
      }
      if (
        player.id === 'roaring-knight' &&
        knightDarkWaveInputStep.current > 0 &&
        (key === 's' || key === 'arrowdown' || key === 'arrowleft' || key === 'arrowright')
      ) {
        return;
      }

      const knightSphereAction = advanceKnightSphereInput(key);
      if (knightSphereAction === 'enter') {
        rememberPlayerAction('special', 0.8);
        rememberPlayerAction('air', 0.45, { includeTotal: false });
        startPlayerKnightSphere();
        return;
      }
      if (knightSphereAction === 'exit') {
        stopPlayerKnightSphere();
        return;
      }
      if (knightSphereAction === 'bird') {
        rememberPlayerAction('special', 1);
        rememberPlayerAction('air', 0.7, { includeTotal: false });
        startPlayerKnightBirdDash(opponentPositionRef.current.x >= positionRef.current.x ? 1 : -1);
        return;
      }
      if (
        player.id === 'roaring-knight' &&
        knightSphereInputStep.current > 0 &&
        (key === 'w' || key === 's' || key === 'arrowup' || key === 'arrowdown' || key === 'arrowleft' || key === 'arrowright')
      ) {
        return;
      }
      if (knightSpherePhaseRef.current === 'active' && ['w', 'a', 's', 'd'].includes(key)) {
        pressedKeys.current.add(key);
        return;
      }
      if (player.id === 'roaring-knight' && knightSpherePhaseRef.current !== 'idle') {
        return;
      }

      const specialInput = advanceSpecialInput(key);
      if (specialInput) {
        triggerSpecial(specialInput);
        return;
      }

      if (key === 'arrowup') {
        if (playerStatusRef.current === 'healing') stopQueenHeal('left');
        return;
      }

      if (key === 'arrowleft' && player.id === 'roaring-knight') {
        rememberPlayerAction('high', 0.8);
        startPlayerChargeAttack();
        return;
      }

      if (key === 'arrowleft' && player.id === 'gerson-boom') {
        startPlayerGersonSpin();
        return;
      }

      if (key === 'arrowleft' && player.id === 'jevil') {
        const playerCanUseGroundedJevilMove =
          positionRef.current.y === 0 || isOnJevilPlatform(player, positionRef.current);

        if (
          !playerCanUseGroundedJevilMove ||
          attackRef.current !== 'idle' ||
          playerSpecialLockRef.current ||
          playerBlockHeldRef.current ||
          playerStatusRef.current !== 'idle' ||
          window.performance.now() < specialReadyAt.current
        ) {
          return;
        }

        rememberPlayerAction('special', 0.9);
        startJevilTeleportShot('left');
        return;
      }

      const isOnGround = positionRef.current.y === 0 || isOnJevilPlatform(player, positionRef.current);

      if (key === 'block') {
        if (
          !isOnGround ||
          attackRef.current !== 'idle' ||
          playerSpecialLockRef.current ||
          playerStatusRef.current !== 'idle'
        ) return;

        rememberPlayerAction('block', 0.9);
        startPlayerBlock();
        return;
      }

      if (key === 'arrowleft' || key === 'arrowright' || key === 'arrowdown') {
        if (key === 'arrowdown') return;

        const isKnightSwordShotInput = player.id === 'roaring-knight' && key === 'arrowright';

        if (
          (!isOnGround && !isKnightSwordShotInput) ||
          playerBlockHeldRef.current ||
          playerSpecialLockRef.current ||
          playerStatusRef.current !== 'idle'
        ) return;

        triggerAttack(key === 'arrowleft' ? 'punch' : 'kick');
        return;
      }

      if (key === 'w') {
      const canJump =
        isOnGround &&
        jumpVelocity.current === 0 &&
          (isAlwaysCrouchingFighter(player) || !(canFighterCrouch(player) && pressedKeys.current.has('s'))) &&
          !playerBlockHeldRef.current &&
          attackRef.current === 'idle' &&
          !playerSpecialLockRef.current &&
          playerStatusRef.current === 'idle';

        if (canJump) {
          rememberPlayerAction('jump', 0.95);
          rememberPlayerAction('air', 0.45, { includeTotal: false });
          jumpVelocity.current = getFighterJumpPower(player);
        }
        return;
      }

      if (key === 's') {
        rememberPlayerAction('crouch', 0.65);
      }

      pressedKeys.current.add(key);
    }

    function handleKeyUp(event: KeyboardEvent) {
      const key = getGameKey(event, controlBindings);

      if (arenaMode === 'online' && onlineRoleRef.current === 'guest') {
        pressedKeys.current.delete(key);
        broadcastOnlineInput(key, false);
        if (key === 's') updateOpponentCrouch(false);
        if (key === 'block') updateOpponentBlock(false);
        return;
      }

      if (isArenaPausedRef.current) {
        pressedKeys.current.delete(key);
        return;
      }

      if (
        playerKnightDarkWaveStateRef.current === 'holding' &&
        ((key === 'arrowleft' && playerKnightDarkWaveDirectionRef.current === -1) ||
          (key === 'arrowright' && playerKnightDarkWaveDirectionRef.current === 1))
      ) {
        releasePlayerKnightDarkWave();
        pressedKeys.current.delete(key);
        return;
      }

      if (key === 'block') {
        stopPlayerBlock();
        return;
      }

      if (key === 'arrowleft' && player.id === 'roaring-knight') {
        releasePlayerChargeAttack();
        return;
      }

      if (key === 'arrowleft' && player.id === 'gerson-boom') {
        stopPlayerGersonSpin();
        return;
      }

      pressedKeys.current.delete(key);
    }

    function movePlayer(frameTime = window.performance.now()) {
      if (isArenaPausedRef.current) {
        lastFrameTimeRef.current = frameTime;
        animationFrame.current = window.requestAnimationFrame(movePlayer);
        return;
      }

      const previousFrameTime = lastFrameTimeRef.current || frameTime - TARGET_FRAME_MS;
      const deltaMs = clamp(frameTime - previousFrameTime, 0, MAX_FRAME_DELTA_MS);
      const deltaScale = deltaMs / TARGET_FRAME_MS;
      lastFrameTimeRef.current = frameTime;

      removeExpiredJevilPlatforms();

      const keys = pressedKeys.current;
      const isOnGround = positionRef.current.y === 0 || isOnJevilPlatform(player, positionRef.current);
      const isRoundLocked = roundCountdownRef.current > 0 || roundResolvedRef.current;
      const playerIsSphereActive = !isRoundLocked && knightSpherePhaseRef.current === 'active';
      const playerIsBirdDashing = !isRoundLocked && knightSpherePhaseRef.current === 'bird';
      let nextIsCrouching = false;

      if (playerIsBirdDashing) {
        const direction = playerKnightBirdDashDirection.current;
        const minX = ARENA_LEFT_LIMIT + KNIGHT_SPHERE_HORIZONTAL_MARGIN;
        const maxX = ARENA_RIGHT_LIMIT - KNIGHT_SPHERE_HORIZONTAL_MARGIN;
        const nextPosition = {
          ...positionRef.current,
          x: positionRef.current.x + direction * KNIGHT_BIRD_DASH_SPEED * deltaScale,
        };
        const reachedWall = direction === 1 ? nextPosition.x >= maxX : nextPosition.x <= minX;

        nextPosition.x = clamp(nextPosition.x, minX, maxX);
        nextPosition.y = clamp(nextPosition.y, 0, getKnightSphereMaxY(selectedStage));
        jumpVelocity.current = 0;
        playerKnockbackVelocity.current = 0;
        positionRef.current = nextPosition;
        setPlayerPosition(nextPosition);

        if (!playerKnightBirdDashHitRef.current && opponentStatusRef.current !== 'knockdown') {
          const distance = Math.abs(opponentPositionRef.current.x - nextPosition.x);
          const verticalDistance = Math.abs(opponentPositionRef.current.y - nextPosition.y);

          if (distance <= KNIGHT_BIRD_DASH_HIT_RANGE && verticalDistance <= KNIGHT_BIRD_DASH_VERTICAL_RANGE) {
            playerKnightBirdDashHitRef.current = true;
            const didDamage = damageOpponentHealth(KNIGHT_BIRD_DASH_DAMAGE, 'mid');

            if (didDamage) {
              playKnightBirdHitSound();
            }

            if (didDamage && !isOpponentKnightSphereActive()) {
              if (opponentStatusTimer.current) window.clearTimeout(opponentStatusTimer.current);
              opponentJumpVelocity.current = 13.2;
              applyProjectileKnockback('right', direction, UPPERCUT_KNOCKBACK);
              updateOpponentStatus('launched');
            }
          }
        }

        if (reachedWall) {
          playerKnightBirdDashHitRef.current = false;
          playerSpecialLockRef.current = false;
          setKnightSpherePhase('idle');
        }
      }

      if (playerIsSphereActive) {
        const nextPosition = { ...positionRef.current };

        if (keys.has('a')) nextPosition.x -= KNIGHT_SPHERE_SPEED * deltaScale;
        if (keys.has('d')) nextPosition.x += KNIGHT_SPHERE_SPEED * deltaScale;
        if (keys.has('w')) nextPosition.y += KNIGHT_SPHERE_SPEED * 7 * deltaScale;
        if (keys.has('s')) nextPosition.y -= KNIGHT_SPHERE_SPEED * 7 * deltaScale;

        nextPosition.y = clamp(nextPosition.y, 0, getKnightSphereMaxY(selectedStage));
        nextPosition.x = clamp(
          nextPosition.x,
          ARENA_LEFT_LIMIT + KNIGHT_SPHERE_HORIZONTAL_MARGIN,
          ARENA_RIGHT_LIMIT - KNIGHT_SPHERE_HORIZONTAL_MARGIN,
        );
        jumpVelocity.current = 0;
        playerKnockbackVelocity.current = 0;

        if (
          nextPosition.x !== positionRef.current.x ||
          nextPosition.y !== positionRef.current.y
        ) {
          const boundedPosition = clampFighterPosition(nextPosition, selectedStage, player);
          positionRef.current = boundedPosition;
          setPlayerPosition(boundedPosition);
        }
      }

      if (!playerIsSphereActive && !playerIsBirdDashing) {
        nextIsCrouching =
          isOnGround &&
          playerStatusRef.current === 'idle' &&
          (isAlwaysCrouchingFighter(player) || (canFighterCrouch(player) && keys.has('s')));
        const movementLocked =
          isRoundLocked ||
          (nextIsCrouching && !isAlwaysCrouchingFighter(player)) ||
          playerBlockHeldRef.current ||
          playerSpecialLockRef.current ||
          attackRef.current !== 'idle' ||
          playerStatusRef.current !== 'idle';
        const speed = getFighterWalkSpeed(player);
        const nextPosition = { ...positionRef.current };

        if (!movementLocked) {
          if (keys.has('a')) nextPosition.x -= speed * deltaScale;
          if (keys.has('d')) nextPosition.x += speed * deltaScale;
        }

        if (Math.abs(playerKnockbackVelocity.current) > 0.03) {
          const isCounterwalkingDarkWave = isPlayerCounterwalkingOpponentKnightDarkWave();
          const counterwalkKnockback =
            playerKnockbackVelocity.current * KNIGHT_DARK_WAVE_COUNTERWALK_KNOCKBACK_MULTIPLIER;
          const effectivePlayerKnockback = isCounterwalkingDarkWave
            ? Math.sign(counterwalkKnockback) *
              Math.min(Math.abs(counterwalkKnockback), KNIGHT_DARK_WAVE_COUNTERWALK_MAX_DRIFT)
            : playerKnockbackVelocity.current;
          nextPosition.x += effectivePlayerKnockback * deltaScale;
          playerKnockbackVelocity.current *= Math.pow(PROJECTILE_KNOCKBACK_FRICTION, deltaScale);
        } else {
          playerKnockbackVelocity.current = 0;
        }

        nextPosition.x =
          nextPosition.y > 0 || opponentPositionRef.current.y > 0
            ? clampAirbornePlayerX(
                nextPosition.x,
                positionRef.current.x,
                opponentPositionRef.current.x,
              )
            : clampPlayerX(nextPosition.x, opponentPositionRef.current.x);

        if (playerAirSpecialActiveRef.current) {
          nextPosition.y = clamp(playerAirSpecialYRef.current, 0, getFighterMaxY(selectedStage, player));
          jumpVelocity.current = 0;
        } else if (jumpVelocity.current !== 0 || nextPosition.y > 0) {
          const previousPosition = positionRef.current;
          nextPosition.y = Math.max(0, nextPosition.y + jumpVelocity.current * deltaScale);
          const playerMaxY = getFighterMaxY(selectedStage, player);
          if (nextPosition.y >= playerMaxY) {
            nextPosition.y = playerMaxY;
            if (jumpVelocity.current > 0) jumpVelocity.current = 0;
          }
          if (
            player.id === 'roaring-knight' &&
            playerStatusRef.current === 'launched' &&
            jumpVelocity.current < 0 &&
            playerLaunchedFallStartedAt.current === 0
          ) {
            playerLaunchedFallStartedAt.current = window.performance.now();
          }
          jumpVelocity.current -=
            getFighterGravity(
              player,
              jumpVelocity.current,
              DEFAULT_JUMP_GRAVITY,
              playerStatusRef.current === 'launched' ? playerLaunchedFallStartedAt.current : 0,
            ) * deltaScale;

          const landedPlatform = getJevilPlatformLanding(
            player,
            previousPosition,
            nextPosition,
            jumpVelocity.current,
          );

          if (landedPlatform) {
            nextPosition.y = landedPlatform.y;
            jumpVelocity.current = 0;
            playerLaunchedFallStartedAt.current = 0;
          } else if (nextPosition.y === 0 && jumpVelocity.current < 0) {
            const landingBounce =
              playerStatusRef.current === 'idle' &&
              tryGersonLandingHit('left', nextPosition);

            if (landingBounce) {
              playGersonBounceSound();
              nextPosition.y = GERSON_LANDING_BOUNCE_START_Y;

              if (
                landingBounce.airHitCount >= GERSON_SIDE_BOUNCE_AFTER_AIR_HITS ||
                (landingBounce.sideKnockbackMultiplier ?? 1) > 1
              ) {
                nextPosition.x = clampAirbornePlayerX(
                  nextPosition.x +
                    landingBounce.sideDirection *
                      GERSON_SIDE_BOUNCE_START_X *
                      (landingBounce.sideKnockbackMultiplier ?? 1),
                  nextPosition.x,
                  opponentPositionRef.current.x,
                );
                playerKnockbackVelocity.current =
                  landingBounce.sideDirection *
                  GERSON_SIDE_BOUNCE_VELOCITY *
                  (landingBounce.sideKnockbackMultiplier ?? 1);
              }
            } else {
              setPlayerGersonLeapActive(false);
              playerGersonLeapDirectBoostReadyRef.current = false;
              playerGersonAirLandingHitsRef.current = 0;
              hideGersonAirCounterAfterLanding('left');
            }

            jumpVelocity.current = landingBounce ? GERSON_LANDING_BOUNCE_POWER : 0;
            playerLaunchedFallStartedAt.current = 0;

            if (playerStatusRef.current === 'launched') {
              updatePlayerStatus('knockdown');
              playerStatusTimer.current = window.setTimeout(() => {
                recoverFromKnockdown('left');
              }, UPPERCUT_LANDING_KNOCKDOWN_MS);
            }
          }
        }

        if (
          nextPosition.x !== positionRef.current.x ||
          nextPosition.y !== positionRef.current.y
        ) {
          const boundedPosition = clampFighterPosition(nextPosition, selectedStage, player);
          positionRef.current = boundedPosition;
          setPlayerPosition(boundedPosition);
        }
      }

      const opponentIsSphereActive = !isRoundLocked && opponentKnightSpherePhaseRef.current === 'active';
      const opponentIsBirdDashing = !isRoundLocked && opponentKnightSpherePhaseRef.current === 'bird';

      if (opponentIsBirdDashing) {
        const direction = opponentKnightBirdDashDirection.current;
        const minX = ARENA_LEFT_LIMIT + KNIGHT_SPHERE_HORIZONTAL_MARGIN;
        const maxX = ARENA_RIGHT_LIMIT - KNIGHT_SPHERE_HORIZONTAL_MARGIN;
        const nextOpponentPosition = {
          ...opponentPositionRef.current,
          x: opponentPositionRef.current.x + direction * KNIGHT_BIRD_DASH_SPEED * deltaScale,
        };
        const reachedWall = direction === 1 ? nextOpponentPosition.x >= maxX : nextOpponentPosition.x <= minX;

        nextOpponentPosition.x = clamp(nextOpponentPosition.x, minX, maxX);
        nextOpponentPosition.y = clamp(nextOpponentPosition.y, 0, getKnightSphereMaxY(selectedStage));
        opponentJumpVelocity.current = 0;
        opponentKnockbackVelocity.current = 0;
        opponentPositionRef.current = nextOpponentPosition;
        setOpponentPosition(nextOpponentPosition);

        if (!opponentKnightBirdDashHitRef.current && playerStatusRef.current !== 'knockdown') {
          const hitDistance = Math.abs(positionRef.current.x - nextOpponentPosition.x);
          const verticalDistance = Math.abs(positionRef.current.y - nextOpponentPosition.y);

          if (hitDistance <= KNIGHT_BIRD_DASH_HIT_RANGE && verticalDistance <= KNIGHT_BIRD_DASH_VERTICAL_RANGE) {
            opponentKnightBirdDashHitRef.current = true;
            const didDamage = damagePlayer(KNIGHT_BIRD_DASH_DAMAGE, 'none', 'mid');
            consumeOpponentPlan(didDamage, 'bird');

            if (didDamage) {
              playKnightBirdHitSound();
            }

            if (didDamage && !isPlayerKnightSphereActive()) {
              if (playerStatusTimer.current) window.clearTimeout(playerStatusTimer.current);
              jumpVelocity.current = 13.2;
              applyProjectileKnockback('left', direction, UPPERCUT_KNOCKBACK);
              updatePlayerStatus('launched');
            }
          }
        }

        if (reachedWall) {
          if (!opponentKnightBirdDashHitRef.current) {
            rememberAiOutcome('bird', false, 0.8);
          }
          opponentKnightBirdDashHitRef.current = false;
          opponentSpecialLockRef.current = false;
          setKnightSpherePhase('idle', 'right');
          opponentSpecialReadyAt.current = window.performance.now() + SPECIAL_COOLDOWN_MS;
        }
      }

      if (opponentIsSphereActive) {
        const nextOpponentPosition = { ...opponentPositionRef.current };
        const spherePlan = opponentKnightSpherePlanRef.current;
        const targetX = positionRef.current.x;
        const plannedAirSetup =
          spherePlan === 'air-charge' || spherePlan === 'air-dark-wave';
        const targetY = plannedAirSetup
          ? Math.min(getKnightSphereMaxY(selectedStage), Math.max(positionRef.current.y + 92, 92))
          : Math.max(positionRef.current.y + 18, 28);
        const dx = targetX - nextOpponentPosition.x;
        const dy = targetY - nextOpponentPosition.y;
        const distanceToTarget = Math.hypot(dx, dy);

        if (distanceToTarget > 0.1) {
          nextOpponentPosition.x += (dx / distanceToTarget) * KNIGHT_SPHERE_SPEED * deltaScale;
          nextOpponentPosition.y += (dy / distanceToTarget) * KNIGHT_SPHERE_SPEED * 7 * deltaScale;
        }

        nextOpponentPosition.y = clamp(nextOpponentPosition.y, 0, getKnightSphereMaxY(selectedStage));
        nextOpponentPosition.x = clamp(
          nextOpponentPosition.x,
          ARENA_LEFT_LIMIT + KNIGHT_SPHERE_HORIZONTAL_MARGIN,
          ARENA_RIGHT_LIMIT - KNIGHT_SPHERE_HORIZONTAL_MARGIN,
        );
        opponentJumpVelocity.current = 0;
        opponentKnockbackVelocity.current = 0;

        if (
          nextOpponentPosition.x !== opponentPositionRef.current.x ||
          nextOpponentPosition.y !== opponentPositionRef.current.y
        ) {
          opponentPositionRef.current = nextOpponentPosition;
          setOpponentPosition(nextOpponentPosition);
        }

        if (
          plannedAirSetup &&
          nextOpponentPosition.y >= targetY - 6 &&
          Math.abs(nextOpponentPosition.x - positionRef.current.x) <= 36
        ) {
          stopOpponentKnightSphere(spherePlan);
        }
      }

      if (!opponentIsSphereActive && !opponentIsBirdDashing && opponentAirSpecialActiveRef.current) {
        const nextOpponentPosition = {
          ...opponentPositionRef.current,
          y: clamp(opponentAirSpecialYRef.current, 0, getFighterMaxY(selectedStage, opponent)),
        };

        opponentJumpVelocity.current = 0;

        if (nextOpponentPosition.y !== opponentPositionRef.current.y) {
          const boundedOpponentPosition = clampFighterPosition(nextOpponentPosition, selectedStage, opponent);
          opponentPositionRef.current = boundedOpponentPosition;
          setOpponentPosition(boundedOpponentPosition);
        }
      } else if (!opponentIsSphereActive && !opponentIsBirdDashing && (opponentJumpVelocity.current !== 0 || opponentPositionRef.current.y > 0)) {
        const nextOpponentPosition = { ...opponentPositionRef.current };
        const previousOpponentPosition = opponentPositionRef.current;
        nextOpponentPosition.y = Math.max(0, nextOpponentPosition.y + opponentJumpVelocity.current * deltaScale);
        const opponentMaxY = getFighterMaxY(selectedStage, opponent);
        if (nextOpponentPosition.y >= opponentMaxY) {
          nextOpponentPosition.y = opponentMaxY;
          if (opponentJumpVelocity.current > 0) opponentJumpVelocity.current = 0;
        }

        if (
          arenaMode === 'fight' &&
          opponent.id === 'gerson-boom' &&
          opponentStatusRef.current === 'idle' &&
          playerHealthRef.current > 0 &&
          playerStatusRef.current !== 'knockdown' &&
          opponentGersonAirStompChainRef.current &&
          nextOpponentPosition.y > 0
        ) {
          const distanceToPlayer = positionRef.current.x - nextOpponentPosition.x;

          if (Math.abs(distanceToPlayer) > GERSON_LANDING_DIRECT_HIT_RANGE) {
            nextOpponentPosition.x = clampAirborneOpponentX(
              nextOpponentPosition.x + Math.sign(distanceToPlayer) * WALK_SPEED * deltaScale,
              opponentPositionRef.current.x,
              positionRef.current.x,
            );
          }
        }

        if (
          opponent.id === 'roaring-knight' &&
          opponentStatusRef.current === 'launched' &&
          opponentJumpVelocity.current < 0 &&
          opponentLaunchedFallStartedAt.current === 0
        ) {
          opponentLaunchedFallStartedAt.current = window.performance.now();
        }
        opponentJumpVelocity.current -=
          getFighterGravity(
            opponent,
            opponentJumpVelocity.current,
            0.34,
            opponentStatusRef.current === 'launched' ? opponentLaunchedFallStartedAt.current : 0,
          ) * deltaScale;

        const landedPlatform = getJevilPlatformLanding(
          opponent,
          previousOpponentPosition,
          nextOpponentPosition,
          opponentJumpVelocity.current,
        );

        if (landedPlatform) {
          nextOpponentPosition.y = landedPlatform.y;
          opponentJumpVelocity.current = 0;
          opponentLaunchedFallStartedAt.current = 0;
        } else if (nextOpponentPosition.y === 0 && opponentJumpVelocity.current < 0) {
          const landingBounce =
            opponentStatusRef.current === 'idle' &&
            tryGersonLandingHit('right', nextOpponentPosition);

          if (landingBounce) {
            playGersonBounceSound();
            opponentGersonAirStompChainRef.current = true;
            nextOpponentPosition.y = GERSON_LANDING_BOUNCE_START_Y;

            if (
              landingBounce.airHitCount >= GERSON_SIDE_BOUNCE_AFTER_AIR_HITS ||
              (landingBounce.sideKnockbackMultiplier ?? 1) > 1
            ) {
              nextOpponentPosition.x = clampAirborneOpponentX(
                nextOpponentPosition.x +
                  landingBounce.sideDirection *
                    GERSON_SIDE_BOUNCE_START_X *
                    (landingBounce.sideKnockbackMultiplier ?? 1),
                nextOpponentPosition.x,
                positionRef.current.x,
              );
              opponentKnockbackVelocity.current =
                landingBounce.sideDirection *
                GERSON_SIDE_BOUNCE_VELOCITY *
                (landingBounce.sideKnockbackMultiplier ?? 1);
            }
          } else {
            opponentGersonAirStompChainRef.current = false;
            opponentGersonAirLandingHitsRef.current = 0;
            hideGersonAirCounterAfterLanding('right');
          }

          opponentJumpVelocity.current = landingBounce ? GERSON_LANDING_BOUNCE_POWER : 0;
          opponentLaunchedFallStartedAt.current = 0;

          if (opponentStatusRef.current === 'launched') {
            updateOpponentStatus('knockdown');
            opponentStatusTimer.current = window.setTimeout(() => {
              recoverFromKnockdown('right');
            }, UPPERCUT_LANDING_KNOCKDOWN_MS);
          }
        }

        if (
          nextOpponentPosition.y !== opponentPositionRef.current.y ||
          nextOpponentPosition.x !== opponentPositionRef.current.x
        ) {
          const boundedOpponentPosition = clampFighterPosition(nextOpponentPosition, selectedStage, opponent);
          opponentPositionRef.current = boundedOpponentPosition;
          setOpponentPosition(boundedOpponentPosition);
        }
      }

      if (!opponentIsSphereActive && !opponentIsBirdDashing && Math.abs(opponentKnockbackVelocity.current) > 0.03) {
        const isCounterwalkingDarkWave = isOpponentCounterwalkingKnightDarkWave();
        const counterwalkKnockback =
          opponentKnockbackVelocity.current * KNIGHT_DARK_WAVE_COUNTERWALK_KNOCKBACK_MULTIPLIER;
        const effectiveOpponentKnockback = isCounterwalkingDarkWave
          ? Math.sign(counterwalkKnockback) *
            Math.min(Math.abs(counterwalkKnockback), KNIGHT_DARK_WAVE_COUNTERWALK_MAX_DRIFT)
          : opponentKnockbackVelocity.current;
        const nextOpponentPosition = {
          ...opponentPositionRef.current,
          x:
            opponentPositionRef.current.y > 0 || positionRef.current.y > 0
              ? clampAirborneOpponentX(
                  opponentPositionRef.current.x + effectiveOpponentKnockback * deltaScale,
                  opponentPositionRef.current.x,
                  positionRef.current.x,
                )
              : clampOpponentX(
                  opponentPositionRef.current.x + effectiveOpponentKnockback * deltaScale,
                  positionRef.current.x,
                ),
        };

        opponentKnockbackVelocity.current *= Math.pow(PROJECTILE_KNOCKBACK_FRICTION, deltaScale);
        const boundedOpponentPosition = clampFighterPosition(nextOpponentPosition, selectedStage, opponent);
        opponentPositionRef.current = boundedOpponentPosition;
        setOpponentPosition(boundedOpponentPosition);
      } else if (!opponentIsSphereActive && !opponentIsBirdDashing) {
        opponentKnockbackVelocity.current = 0;
      }

      updateJevilAbsorbTimers();

      if (
        !isRoundLocked &&
        arenaMode === 'online' &&
        onlineRoleRef.current === 'guest' &&
        opponentStatusRef.current === 'idle' &&
        opponentAttackRef.current === 'idle' &&
        !opponentSpecialLockRef.current &&
        !opponentBlockingRef.current &&
        !opponentIsSphereActive &&
        !opponentIsBirdDashing &&
        opponentHealthRef.current > 0
      ) {
        const nextOpponentPosition = { ...opponentPositionRef.current };
        const speed = getFighterWalkSpeed(opponent);

        if (pressedKeys.current.has('a')) nextOpponentPosition.x -= speed * deltaScale;
        if (pressedKeys.current.has('d')) nextOpponentPosition.x += speed * deltaScale;

        nextOpponentPosition.x =
          nextOpponentPosition.y > 0 || positionRef.current.y > 0
            ? clampAirborneOpponentX(
                nextOpponentPosition.x,
                opponentPositionRef.current.x,
                positionRef.current.x,
              )
            : clampOpponentX(nextOpponentPosition.x, positionRef.current.x);

        const shouldCrouch =
          pressedKeys.current.has('s') &&
          canFighterCrouch(opponent) &&
          nextOpponentPosition.y === 0;
        updateOpponentCrouch(shouldCrouch);

        if (nextOpponentPosition.x !== opponentPositionRef.current.x) {
          const boundedOpponentPosition = clampFighterPosition(nextOpponentPosition, selectedStage, opponent);
          opponentPositionRef.current = boundedOpponentPosition;
          setOpponentPosition(boundedOpponentPosition);
        }
      }

      if (
        !isRoundLocked &&
        arenaMode === 'online' &&
        onlineRoleRef.current === 'host' &&
        opponentStatusRef.current === 'idle' &&
        opponentAttackRef.current === 'idle' &&
        !opponentSpecialLockRef.current &&
        !opponentBlockingRef.current &&
        !opponentIsSphereActive &&
        !opponentIsBirdDashing &&
        opponentHealthRef.current > 0
      ) {
        const nextOpponentPosition = { ...opponentPositionRef.current };
        const speed = getFighterWalkSpeed(opponent);

        if (remotePressedKeys.current.has('a')) nextOpponentPosition.x -= speed * deltaScale;
        if (remotePressedKeys.current.has('d')) nextOpponentPosition.x += speed * deltaScale;

        nextOpponentPosition.x =
          nextOpponentPosition.y > 0 || positionRef.current.y > 0
            ? clampAirborneOpponentX(
                nextOpponentPosition.x,
                opponentPositionRef.current.x,
                positionRef.current.x,
              )
            : clampOpponentX(nextOpponentPosition.x, positionRef.current.x);

        const shouldCrouch =
          remotePressedKeys.current.has('s') &&
          canFighterCrouch(opponent) &&
          nextOpponentPosition.y === 0;
        updateOpponentCrouch(shouldCrouch);

        if (nextOpponentPosition.x !== opponentPositionRef.current.x) {
          const boundedOpponentPosition = clampFighterPosition(nextOpponentPosition, selectedStage, opponent);
          opponentPositionRef.current = boundedOpponentPosition;
          setOpponentPosition(boundedOpponentPosition);
        }
      }

      if (
        !isRoundLocked &&
        arenaMode === 'fight' &&
        opponentStatusRef.current === 'idle' &&
        opponentAttackRef.current === 'idle' &&
        !opponentSpecialLockRef.current &&
        !opponentBlockingRef.current &&
        !opponentCrouchingRef.current &&
        opponentPositionRef.current.y === 0 &&
        opponentHealthRef.current > 0
      ) {
        const ai = getAdaptiveAiConfig(AI_CONFIG[selectedDifficulty]);
        const nextOpponentPosition = { ...opponentPositionRef.current };
        const distanceToPlayer = positionRef.current.x - nextOpponentPosition.x;
        const absDistance = Math.abs(distanceToPlayer);
        const directionToPlayer = Math.sign(distanceToPlayer);

        if (absDistance > ai.preferredRange) {
          nextOpponentPosition.x += directionToPlayer * ai.moveSpeed * deltaScale;
        } else if (selectedDifficulty === 'hard' && absDistance < 12) {
          nextOpponentPosition.x -= directionToPlayer * ai.moveSpeed * 0.55 * deltaScale;
        }

        nextOpponentPosition.x =
          nextOpponentPosition.y > 0 || positionRef.current.y > 0
            ? clampAirborneOpponentX(
                nextOpponentPosition.x,
                opponentPositionRef.current.x,
                positionRef.current.x,
              )
            : clampOpponentX(nextOpponentPosition.x, positionRef.current.x);

        if (nextOpponentPosition.x !== opponentPositionRef.current.x) {
          const boundedOpponentPosition = clampFighterPosition(nextOpponentPosition, selectedStage, opponent);
          opponentPositionRef.current = boundedOpponentPosition;
          setOpponentPosition(boundedOpponentPosition);
        }
      }

      if (!isRoundLocked && projectilesRef.current.length > 0) {
        let didProjectileHit = false;
        const nextProjectiles = projectilesRef.current
          .map((projectile) => {
            if (projectile.kind === 'jevil-scythe') {
              const startX = projectile.startX ?? projectile.x;
              const shouldReturn =
                !projectile.returning &&
                Math.abs(projectile.x - startX) >= (projectile.maxTravel ?? JEVIL_SCYTHE_MAX_TRAVEL);
              const direction = shouldReturn ? ((-projectile.direction) as -1 | 1) : projectile.direction;

              return {
                ...projectile,
                direction,
                returning: projectile.returning || shouldReturn,
                x: projectile.x + direction * JEVIL_SCYTHE_SPEED * deltaScale,
              };
            }

            const movedProjectile = {
              ...projectile,
              x: projectile.x + projectile.direction * (projectile.speed ?? PROJECTILE_SPEED) * deltaScale,
              ...(typeof projectile.bottomPx === 'number' && typeof projectile.bottomVelocity === 'number'
                ? { bottomPx: projectile.bottomPx + projectile.bottomVelocity * deltaScale }
                : {}),
            };

            if (
              opponent.id === 'gerson-boom' &&
              opponentAttackRef.current === 'kick' &&
              isProjectileNearGersonParry('right', movedProjectile)
            ) {
              playProjectileHitSound();
              return getGersonReflectedProjectile('right', movedProjectile);
            }

            if (
              player.id === 'gerson-boom' &&
              attackRef.current === 'kick' &&
              isProjectileNearGersonParry('left', movedProjectile)
            ) {
              playProjectileHitSound();
              return getGersonReflectedProjectile('left', movedProjectile);
            }

            return movedProjectile;
          })
          .filter((projectile) => {
            const projectileScreenMargin = projectile.kind === 'jevil-scythe' ? 36 : 4;

            if (
              projectile.x < ARENA_LEFT_LIMIT - projectileScreenMargin ||
              projectile.x > ARENA_RIGHT_LIMIT + projectileScreenMargin
            ) {
              if (projectile.owner === 'right') {
                rememberAiOutcome(
                  projectile.kind === 'knight-sword'
                    ? 'projectile'
                    : projectile.kind === 'queen-wave' || projectile.kind === 'tenna-star'
                      ? 'special'
                      : 'projectile',
                  false,
                  0.75,
                );
              }
              return false;
            }

            if (
              projectile.kind !== 'jevil-scythe' &&
              typeof projectile.maxTravel === 'number' &&
              Math.abs(projectile.x - (projectile.startX ?? projectile.x)) > projectile.maxTravel
            ) {
              if (projectile.owner === 'right') {
                rememberAiOutcome(projectile.kind === 'knight-dark-wave' ? 'special' : 'projectile', false, 0.75);
              }
              return false;
            }

            if (
              projectile.kind === 'jevil-scythe' &&
              projectile.returning
            ) {
              const ownerPosition = projectile.owner === 'left' ? positionRef.current : opponentPositionRef.current;
              const ownerFighter = projectile.owner === 'left' ? player : opponent;
              const ownerIsLowProfile =
                projectile.owner === 'left' ? isPlayerLowProfile() : isOpponentLowProfile();
              const ownerVisualLift =
                ownerFighter.id === 'roaring-knight' ? knightVisualLiftRef.current : 0;

              if (
                isProjectileTouchingFighter(
                  projectile,
                  ownerPosition,
                  ownerFighter,
                  ownerIsLowProfile,
                  0,
                  ownerVisualLift,
                )
              ) {
                if (projectile.owner === 'left') {
                  specialReadyAt.current = 0;
                } else {
                  opponentSpecialReadyAt.current = 0;
                }
                return false;
              }
            }

            if (projectile.owner === 'left') {
              const isLowProjectile = projectile.lane === 'low';
              if (isLowProjectile && isOpponentKnightLowAttackImmune()) return true;

              const opponentCanBeHit =
                opponentStatusRef.current !== 'knockdown' &&
                isProjectileTouchingFighter(
                  projectile,
                  opponentPositionRef.current,
                  opponent,
                  isOpponentLowProfile(),
                  isOpponentKnightSpecialHurtboxExpanded() ? KNIGHT_SPECIAL_PROJECTILE_HURTBOX_BONUS : 0,
                  opponent.id === 'roaring-knight' ? knightVisualLiftRef.current : 0,
                );

              if (!opponentCanBeHit) return true;

              const now = window.performance.now();
              const canScytheDamageNow =
                projectile.kind !== 'jevil-scythe' ||
                !projectile.lastHitAt ||
                now - projectile.lastHitAt >= JEVIL_SCYTHE_HIT_TICK_MS;

              if (!canScytheDamageNow) return true;

              const didDamageThroughBlock = damageOpponentHealth(
                getProjectileDamage(projectile),
                projectile.lane === 'low' ? 'low' : 'high',
                { ignoreHitLevelDodge: true },
              );
              if (
                didDamageThroughBlock &&
                !isOpponentKnightSphereActive() &&
                getProjectileKnockback(projectile) > 0
              ) {
                applyProjectileKnockback(
                  'right',
                  projectile.direction,
                  getProjectileKnockback(projectile),
                );
              }
              playProjectileImpactSound(projectile);
              didProjectileHit = true;
              if (projectile.kind === 'jevil-scythe') {
                projectile.lastHitAt = now;
                return true;
              }
              return false;
            }

            const playerIsCrouchingNow = isPlayerLowProfile();
            const isLowProjectile = projectile.lane === 'low';
            if (isLowProjectile && isPlayerKnightLowAttackImmune()) return true;

            const playerCanBeHit =
              playerStatusRef.current !== 'knockdown' &&
              isProjectileTouchingFighter(
                projectile,
                positionRef.current,
                player,
                playerIsCrouchingNow,
                isPlayerKnightSpecialHurtboxExpanded() ? KNIGHT_SPECIAL_PROJECTILE_HURTBOX_BONUS : 0,
                player.id === 'roaring-knight' ? knightVisualLiftRef.current : 0,
              );

            if (!playerCanBeHit) return true;

            const now = window.performance.now();
            const canScytheDamageNow =
              projectile.kind !== 'jevil-scythe' ||
              !projectile.lastHitAt ||
              now - projectile.lastHitAt >= JEVIL_SCYTHE_HIT_TICK_MS;

            if (!canScytheDamageNow) return true;

            const didDamageThroughBlock = damagePlayer(
              getProjectileDamage(projectile),
              'none',
              projectile.lane === 'low' ? 'low' : 'high',
              { ignoreHitLevelDodge: true },
            );
            rememberAiOutcome(
              projectile.kind === 'knight-sword'
                ? 'projectile'
                : projectile.kind === 'queen-wave' || projectile.kind === 'tenna-star'
                  ? 'special'
                  : 'projectile',
              didDamageThroughBlock,
              didDamageThroughBlock ? 1.2 : 0.7,
            );
            if (
              didDamageThroughBlock &&
              !isPlayerKnightSphereActive() &&
              !isPlayerKnightDarkWaveHolding() &&
              getProjectileKnockback(projectile) > 0
            ) {
              applyProjectileKnockback(
                'left',
                projectile.direction,
                getProjectileKnockback(projectile),
              );
            }
            playProjectileImpactSound(projectile);
            didProjectileHit = true;
            if (projectile.kind === 'jevil-scythe') {
              projectile.lastHitAt = now;
              return true;
            }
            return false;
          });

        if (didProjectileHit || nextProjectiles.length !== projectilesRef.current.length) {
          projectilesRef.current = nextProjectiles;
          setProjectiles(nextProjectiles);
        } else {
          projectilesRef.current = nextProjectiles;
          setProjectiles(nextProjectiles);
        }
      }

      setIsCrouching(isRoundLocked ? false : nextIsCrouching);
      if (
        arenaMode === 'online' &&
        onlineRoleRef.current === 'host' &&
        onlineChannelRef.current &&
        frameTime - lastOnlineSnapshotAt.current >= ONLINE_SNAPSHOT_INTERVAL_MS
      ) {
        lastOnlineSnapshotAt.current = frameTime;
        void onlineChannelRef.current.send({
          type: 'broadcast',
          event: 'snapshot',
          payload: {
            playerId: onlinePlayerIdRef.current,
            sequence: ++onlineSnapshotSequenceRef.current,
            playerPosition: positionRef.current,
            opponentPosition: opponentPositionRef.current,
            playerHealth: playerHealthRef.current,
            opponentHealth: opponentHealthRef.current,
            attack: attackRef.current,
            opponentAttack: opponentAttackRef.current,
            playerStatus: playerStatusRef.current,
            opponentStatus: opponentStatusRef.current,
            isCrouching: nextIsCrouching,
            opponentCrouching: opponentCrouchingRef.current,
            playerBlocking: isBlockingRef.current,
            opponentBlocking: opponentBlockingRef.current,
            playerSpecialShooting: playerSpecialShootingRef.current,
            opponentSpecialShooting: opponentSpecialShootingRef.current,
            playerSpecialSpriteOverride: playerSpecialSpriteOverrideRef.current,
            opponentSpecialSpriteOverride: opponentSpecialSpriteOverrideRef.current,
            playerAirSpecialWave: playerAirSpecialWaveRef.current,
            opponentAirSpecialWave: opponentAirSpecialWaveRef.current,
            playerChargeAttackState: playerChargeAttackStateRef.current,
            opponentChargeAttackState: opponentChargeAttackStateRef.current,
            playerChargeAuraActive: playerChargeAuraActiveRef.current,
            opponentChargeAuraActive: opponentChargeAuraActiveRef.current,
            playerKnightSpherePhase: knightSpherePhaseRef.current,
            opponentKnightSpherePhase: opponentKnightSpherePhaseRef.current,
            playerKnightDarkWaveState: playerKnightDarkWaveStateRef.current,
            opponentKnightDarkWaveState: opponentKnightDarkWaveStateRef.current,
            playerKnightDarkWaveDirection: playerKnightDarkWaveDirectionRef.current,
            playerKnightDarkWaveOverheated: playerKnightDarkWaveOverheatedRef.current,
            opponentKnightDarkWaveOverheated: opponentKnightDarkWaveOverheatedRef.current,
            playerJevilAbsorbing: playerJevilAbsorbingRef.current,
            opponentJevilAbsorbing: opponentJevilAbsorbingRef.current,
            playerJevilHeadlessPose: playerJevilHeadlessPoseRef.current,
            opponentJevilHeadlessPose: opponentJevilHeadlessPoseRef.current,
            jevilPlatforms: jevilPlatformsRef.current,
            roundTimeLeft: roundTimeLeftRef.current,
            roundCountdown: roundCountdownRef.current,
            projectiles: projectilesRef.current,
          } satisfies OnlineSnapshotMessage,
        });
      }
      animationFrame.current = window.requestAnimationFrame(movePlayer);
    }

    function releaseHeldPlayerInputs() {
      if (playerKnightDarkWaveStateRef.current === 'holding') {
        releasePlayerKnightDarkWave();
      }
      pressedKeys.current.clear();
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', releaseHeldPlayerInputs);
    animationFrame.current = window.requestAnimationFrame(movePlayer);

    if (arenaMode === 'sandbox' || arenaMode === 'online') {
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
        window.removeEventListener('blur', releaseHeldPlayerInputs);
        pressedKeys.current.clear();
        jumpVelocity.current = 0;
        opponentJumpVelocity.current = 0;
        playerKnockbackVelocity.current = 0;
        opponentKnockbackVelocity.current = 0;
        attackRef.current = 'idle';
        playerAttackFacingRef.current = null;
        cancelPlayerChargeAttack();
        cancelPlayerKnightDarkWave();
        cancelOpponentChargeAttack();
        cancelOpponentKnightDarkWave();
        resetPlayerKnightSphere();
        resetOpponentKnightSphere();
        playerSpecialLockRef.current = false;
        playerAirSpecialActiveRef.current = false;
        playerAirSpecialYRef.current = 0;
        opponentSpecialLockRef.current = false;
        opponentAirSpecialActiveRef.current = false;
        opponentAirSpecialYRef.current = 0;
        updatePlayerStatus('idle');
        updateOpponentAttack('idle');
        updateOpponentStatus('idle');
        projectilesRef.current = [];
        clearJevilPlatforms();
        clearJevilAbsorbState('left');
        clearJevilAbsorbState('right');
        playerJevilAbsorbRecoverUntilRef.current = 0;
        opponentJevilAbsorbRecoverUntilRef.current = 0;
        setIsCrouchAttackLocked(false);
        setIsCrouching(false);
        stopPlayerBlock();
        setPlayerSpecialShooting(false);
        setPlayerSpecialSpriteOverride(null);
        setPlayerAirSpecialWave(false);
        setOpponentSpecialShooting(false);
        setOpponentSpecialSpriteOverride(null);
        setOpponentAirSpecialWave(false);
        updateOpponentBlock(false);
        updateOpponentCrouch(false);
        setProjectiles([]);
        setHealPopups([]);

        if (attackTimer.current) window.clearTimeout(attackTimer.current);
        if (attackHitTimer.current) window.clearTimeout(attackHitTimer.current);
        if (playerSpecialTimer.current) window.clearTimeout(playerSpecialTimer.current);
        if (opponentSpecialTimer.current) window.clearTimeout(opponentSpecialTimer.current);
        if (playerSpecialSpawnTimer.current) window.clearTimeout(playerSpecialSpawnTimer.current);
        if (opponentSpecialSpawnTimer.current) window.clearTimeout(opponentSpecialSpawnTimer.current);
        if (playerAirSpecialWaveTimer.current) window.clearTimeout(playerAirSpecialWaveTimer.current);
        if (opponentAirSpecialWaveTimer.current) window.clearTimeout(opponentAirSpecialWaveTimer.current);
        if (playerHealTimer.current) window.clearTimeout(playerHealTimer.current);
        if (playerHealInterval.current) window.clearInterval(playerHealInterval.current);
        if (opponentHealTimer.current) window.clearTimeout(opponentHealTimer.current);
        if (opponentHealInterval.current) window.clearInterval(opponentHealInterval.current);
        if (opponentAttackTimer.current) window.clearTimeout(opponentAttackTimer.current);
        if (opponentAttackHitTimer.current) window.clearTimeout(opponentAttackHitTimer.current);
        if (opponentBlockTimer.current) window.clearTimeout(opponentBlockTimer.current);
        if (opponentCrouchTimer.current) window.clearTimeout(opponentCrouchTimer.current);
        if (playerStatusTimer.current) window.clearTimeout(playerStatusTimer.current);
        if (opponentStatusTimer.current) window.clearTimeout(opponentStatusTimer.current);
        if (playerDamageFlashTimer.current) window.clearTimeout(playerDamageFlashTimer.current);
        if (opponentDamageFlashTimer.current) window.clearTimeout(opponentDamageFlashTimer.current);
        if (playerGersonSpinDamageTimer.current) window.clearInterval(playerGersonSpinDamageTimer.current);
        if (playerGersonSpinMaxTimer.current) window.clearTimeout(playerGersonSpinMaxTimer.current);
        if (playerRecoveryTimer.current) window.clearTimeout(playerRecoveryTimer.current);
        if (opponentRecoveryTimer.current) window.clearTimeout(opponentRecoveryTimer.current);
        setPlayerRecovering(false);
        setOpponentRecovering(false);
        setPlayerGersonLeapActive(false);
        playerGersonLeapDirectBoostReadyRef.current = false;
        if (animationFrame.current) window.cancelAnimationFrame(animationFrame.current);
      };
    }

    opponentAttackInterval.current = window.setInterval(() => {
      if (isArenaPausedRef.current) return;
      if (roundCountdownRef.current > 0 || roundResolvedRef.current) return;

      const distance = Math.abs(opponentPositionRef.current.x - positionRef.current.x);
      const ai = getAdaptiveAiConfig(AI_CONFIG[selectedDifficulty]);
      const opponentOnGround =
        opponentPositionRef.current.y === 0 || isOnJevilPlatform(opponent, opponentPositionRef.current);

      if (opponent.id === 'roaring-knight') {
        if (
          opponentKnightSpherePhaseRef.current === 'active' &&
          playerHealthRef.current > 0 &&
          opponentHealthRef.current > 0
        ) {
          const direction: -1 | 1 = positionRef.current.x >= opponentPositionRef.current.x ? 1 : -1;
          const verticalDistance = Math.abs(positionRef.current.y - opponentPositionRef.current.y);
          const spherePlan = opponentKnightSpherePlanRef.current;
          const plannedAirSetup =
            spherePlan === 'air-charge' || spherePlan === 'air-dark-wave';
          const canBirdDash =
            !plannedAirSetup &&
            distance <= 52 &&
            verticalDistance <= KNIGHT_BIRD_DASH_VERTICAL_RANGE &&
            (spherePlan === 'bird' || Math.random() < ai.specialChance * (selectedDifficulty === 'hard' ? 0.72 : 0.44));

          if (canBirdDash) {
            markOpponentPlan('bird');
            startOpponentKnightBirdDash(direction);
            return;
          }

          const shouldLeaveSphere =
            !plannedAirSetup &&
            (opponentHealthRef.current <= 24 ||
              Math.random() < ai.specialChance * (selectedDifficulty === 'hard' ? 0.08 : 0.14));

          if (shouldLeaveSphere) {
            stopOpponentKnightSphere();
          }

          return;
        }

        if (
          opponentKnightSpherePhaseRef.current === 'entering' ||
          opponentKnightSpherePhaseRef.current === 'exiting' ||
          opponentKnightSpherePhaseRef.current === 'bird-transform' ||
          opponentKnightSpherePhaseRef.current === 'bird'
        ) {
          return;
        }
      }

      if (
        opponent.id === 'roaring-knight' &&
        !opponentOnGround &&
        playerHealthRef.current > 0 &&
        opponentHealthRef.current > 0 &&
        playerStatusRef.current !== 'knockdown' &&
        opponentStatusRef.current === 'idle' &&
        opponentAttackRef.current === 'idle' &&
        !opponentSpecialLockRef.current &&
        !opponentBlockingRef.current &&
        distance > 24 &&
        distance <= 72 &&
        window.performance.now() >= opponentAttackReadyAt.current &&
        Math.random() < ai.attackChance * (0.45 + ai.antiAirBias)
      ) {
        const now = window.performance.now();
        const nextAttack: Exclude<Attack, 'idle'> = 'kick';

        opponentAttackReadyAt.current = now + KNIGHT_SWORD_PROJECTILE_COOLDOWN_MS;
        markOpponentPlan('projectile');
        updateOpponentAttack(nextAttack);

        if (opponentAttackHitTimer.current) window.clearTimeout(opponentAttackHitTimer.current);
        opponentAttackHitTimer.current = window.setTimeout(() => {
          opponentAttackHitTimer.current = null;

          if (
            isArenaPausedRef.current ||
            opponentAttackRef.current !== nextAttack ||
            opponentStatusRef.current !== 'idle' ||
            playerHealthRef.current <= 0
          ) {
            consumeOpponentPlan(false, 'projectile');
            return;
          }

          const direction: -1 | 1 = positionRef.current.x >= opponentPositionRef.current.x ? 1 : -1;
          spawnProjectile('right', opponentPositionRef.current.x, direction, 'high', 'knight-sword', {
            bottomPx: getKnightSwordProjectileBottom(
              opponentPositionRef.current,
              opponent.id === 'roaring-knight' ? knightVisualLiftRef.current : 0,
            ),
          });
        }, KNIGHT_SWORD_PROJECTILE_SHOOT_MS);

        if (opponentAttackTimer.current) window.clearTimeout(opponentAttackTimer.current);
        opponentAttackTimer.current = window.setTimeout(() => {
          if (isArenaPausedRef.current) return;
          updateOpponentAttack('idle');
        }, KNIGHT_SWORD_PROJECTILE_COOLDOWN_MS);
        return;
      }

      if (
        playerHealthRef.current <= 0 ||
        playerStatusRef.current === 'knockdown' ||
        opponentHealthRef.current <= 0 ||
        opponentStatusRef.current !== 'idle' ||
        opponentAttackRef.current !== 'idle' ||
        opponentSpecialLockRef.current ||
        opponentBlockingRef.current ||
        opponentCrouchingRef.current ||
        !opponentOnGround
      ) {
        return;
      }

      const playerIsAttacking = attackRef.current !== 'idle';
      const dodgeChance =
        selectedDifficulty === 'hard' ? 0.92 : selectedDifficulty === 'normal' ? 0.72 : 0.46;
      const incomingProjectile = projectilesRef.current.find((projectile) => {
        const distanceToCpu = Math.abs(opponentPositionRef.current.x - projectile.x);
        const isMovingTowardCpu =
          (projectile.direction === 1 && projectile.x < opponentPositionRef.current.x) ||
          (projectile.direction === -1 && projectile.x > opponentPositionRef.current.x);
        const reactionRange = opponent.id === 'gerson-boom' ? 44 : 24;

        return (
          projectile.owner === 'left' &&
          isMovingTowardCpu &&
          distanceToCpu < reactionRange
        );
      });

      if (
        incomingProjectile &&
        opponent.id === 'gerson-boom' &&
        window.performance.now() >= opponentAttackReadyAt.current
      ) {
        opponentAttackReadyAt.current = window.performance.now() + CPU_ATTACK_COOLDOWN_MS;
        markOpponentPlan('block');
        updateOpponentBlock(false);
        updateOpponentCrouch(false);
        updateOpponentAttack('kick');

        if (opponentAttackHitTimer.current) window.clearTimeout(opponentAttackHitTimer.current);
        opponentAttackHitTimer.current = window.setTimeout(() => {
          opponentAttackHitTimer.current = null;

          if (
            isArenaPausedRef.current ||
            opponentAttackRef.current !== 'kick' ||
            opponentStatusRef.current !== 'idle' ||
            playerHealthRef.current <= 0
          ) {
            consumeOpponentPlan(false, 'block');
            return;
          }

          const didParry = useGersonParry('right');
          consumeOpponentPlan(didParry, 'block');
        }, CPU_GERSON_PARRY_PROJECTILE_HIT_MS);

        if (opponentAttackTimer.current) window.clearTimeout(opponentAttackTimer.current);
        opponentAttackTimer.current = window.setTimeout(() => {
          if (isArenaPausedRef.current) return;
          updateOpponentAttack('idle');
        }, GERSON_PARRY_DURATION_MS);
        return;
      }

      if (incomingProjectile && Math.random() < dodgeChance) {
        if (incomingProjectile.lane === 'low') {
          markOpponentPlan('jump');
          opponentJumpVelocity.current = getFighterJumpPower(
            opponent,
            selectedDifficulty === 'hard' ? 10.6 : 9.8,
          );
          return;
        }

        if (!canFighterCrouch(opponent)) return;

        updateOpponentCrouch(true);
        markOpponentPlan('crouch');

        if (opponentCrouchTimer.current) window.clearTimeout(opponentCrouchTimer.current);
        opponentCrouchTimer.current = window.setTimeout(() => updateOpponentCrouch(false), 520);
        return;
      }

      const canUseCpuAirSpecial =
        opponent.id === 'mister-ant-tenna' &&
        window.performance.now() >= opponentSpecialReadyAt.current &&
        distance <= TENNA_AIR_SPECIAL_RANGE &&
        Math.random() < ai.specialChance * (selectedDifficulty === 'hard' ? 0.9 : 0.55);

      if (canUseCpuAirSpecial) {
        markOpponentPlan('airSpecial');
        triggerOpponentAirSpecial();
        return;
      }

      const canUseCpuHeal =
        opponent.id === 'queen' &&
        window.performance.now() >= opponentSpecialReadyAt.current &&
        opponentHealthRef.current <= 72 &&
        distance >= 22 &&
        Math.random() < ai.specialChance * (selectedDifficulty === 'hard' ? 0.55 : 0.32);

      if (canUseCpuHeal) {
        opponentSpecialReadyAt.current = window.performance.now() + QUEEN_HEAL_COOLDOWN_MS;
        markOpponentPlan('heal');
        startQueenHeal('right');
        return;
      }

      const canUseCpuKnightSphere =
        opponent.id === 'roaring-knight' &&
        opponentKnightSpherePhaseRef.current === 'idle' &&
        window.performance.now() >= opponentSpecialReadyAt.current &&
        distance >= 18 &&
        distance <= 64 &&
        Math.random() < ai.specialChance * (selectedDifficulty === 'hard' ? 0.36 : 0.2) * getAiConfidence('sphere');

      if (canUseCpuKnightSphere) {
        const roll = Math.random();
        const spherePlan: OpponentKnightSpherePlan =
          selectedDifficulty === 'hard'
            ? roll < 0.34
              ? 'air-charge'
              : roll < 0.62
                ? 'air-dark-wave'
                : 'bird'
            : selectedDifficulty === 'normal'
              ? roll < 0.24
                ? 'air-charge'
                : roll < 0.42
                  ? 'air-dark-wave'
                  : 'bird'
              : roll < 0.18
                ? 'air-charge'
                : roll < 0.28
                  ? 'air-dark-wave'
                  : 'bird';

        startOpponentKnightSphere(spherePlan);
        markOpponentPlan('sphere');
        return;
      }

      const canUseCpuKnightDarkWave =
        opponent.id === 'roaring-knight' &&
        window.performance.now() >= opponentSpecialReadyAt.current &&
        distance >= 22 &&
        distance <= 70 &&
        Math.random() < ai.specialChance * (selectedDifficulty === 'hard' ? 0.7 : 0.42) * (1 + ai.projectilePressure * 0.28);

      if (canUseCpuKnightDarkWave) {
        markOpponentPlan('special');
        startOpponentKnightDarkWaveHold();
        return;
      }

      const canUseCpuKnightCharge =
        opponent.id === 'roaring-knight' &&
        window.performance.now() >= opponentAttackReadyAt.current &&
        distance <= KNIGHT_CHARGE_RANGE + 12 &&
        Math.random() < ai.attackChance * (selectedDifficulty === 'hard' ? 0.72 : 0.48) * getAiConfidence('charge');

      if (canUseCpuKnightCharge) {
        opponentAttackReadyAt.current = window.performance.now() + CPU_ATTACK_COOLDOWN_MS + 900;
        markOpponentPlan('charge');
        startOpponentChargeAttack(selectedDifficulty === 'hard' ? 1700 : 950, { ignoreCooldown: true });
        return;
      }

      const canUseCpuJevilPlatforms =
        opponent.id === 'jevil' &&
        opponentOnGround &&
        jevilPlatformsRef.current.length === 0 &&
        window.performance.now() >= opponentSpecialReadyAt.current &&
        Math.random() < ai.specialChance * (selectedDifficulty === 'hard' ? 0.72 : 0.42);

      if (canUseCpuJevilPlatforms) {
        markOpponentPlan('special');
        playRandomJevilVoiceSound();
        setOpponentSpecialSpriteOverride(jevilPlatformSpecialSprite);
        lockSpecialShooter('right');
        spawnJevilPlatforms('right');
        return;
      }

      const canUseCpuJevilChaos =
        opponent.id === 'jevil' &&
        opponentOnGround &&
        window.performance.now() >= opponentSpecialReadyAt.current &&
        distance <= 46 &&
        Math.random() < ai.specialChance * (selectedDifficulty === 'hard' ? 0.6 : 0.34);

      if (canUseCpuJevilChaos) {
        opponentSpecialReadyAt.current = window.performance.now() + JEVIL_CHAOS_SPECIAL_COOLDOWN_MS;
        markOpponentPlan('special');
        playRandomJevilVoiceSound();
        setOpponentSpecialSpriteOverride(jevilChaosSpecialSprite);
        lockSpecialShooter('right', JEVIL_CHAOS_SPECIAL_MS);
        if (opponentSpecialSpawnTimer.current) window.clearTimeout(opponentSpecialSpawnTimer.current);
        opponentSpecialSpawnTimer.current = window.setTimeout(() => {
          opponentSpecialSpawnTimer.current = null;
          spawnJevilScythe('right');
        }, 160);
        return;
      }

      const canUseCpuJevilTeleport =
        opponent.id === 'jevil' &&
        opponentOnGround &&
        window.performance.now() >= opponentSpecialReadyAt.current &&
        Math.random() < ai.specialChance * (selectedDifficulty === 'hard' ? 0.5 : 0.28);

      if (canUseCpuJevilTeleport) {
        markOpponentPlan('special');
        startJevilTeleportShot('right');
        return;
      }

      const canUseCpuJevilAbsorb =
        opponent.id === 'jevil' &&
        opponentOnGround &&
        !opponentJevilAbsorbActiveRef.current &&
        window.performance.now() >= opponentSpecialReadyAt.current &&
        opponentHealthRef.current > 22 &&
        Math.random() < ai.specialChance * (selectedDifficulty === 'hard' ? 0.32 : 0.16);

      if (canUseCpuJevilAbsorb) {
        markOpponentPlan('special');
        startJevilAbsorb('right');
        return;
      }

      const canUseCpuSpecial =
        (opponent.id === 'mister-ant-tenna' || opponent.id === 'queen') &&
        window.performance.now() >= opponentSpecialReadyAt.current &&
        distance >= 20 &&
        distance <= 58 &&
        Math.random() < ai.specialChance * 0.7;

      if (canUseCpuSpecial) {
        opponentSpecialReadyAt.current =
          window.performance.now() + (opponent.id === 'queen' ? QUEEN_SPECIAL_COOLDOWN_MS : SPECIAL_COOLDOWN_MS);
        const direction: -1 | 1 = positionRef.current.x <= opponentPositionRef.current.x ? -1 : 1;
        const isQueenSpecial = opponent.id === 'queen';
        const lane: ProjectileLane = isQueenSpecial ? 'high' : 'low';
        markOpponentPlan('special');

        if (!isQueenSpecial) {
          playTennaStarSpecialSound();
        }

        lockSpecialShooter('right');

        if (isQueenSpecial) {
          if (opponentSpecialSpawnTimer.current) window.clearTimeout(opponentSpecialSpawnTimer.current);
          opponentSpecialSpawnTimer.current = window.setTimeout(() => {
            const delayedDirection: -1 | 1 =
              positionRef.current.x <= opponentPositionRef.current.x ? -1 : 1;

            spawnProjectile('right', opponentPositionRef.current.x, delayedDirection, lane, 'queen-wave');
          }, SPECIAL_SHOOT_MS);
        } else {
          spawnProjectile('right', opponentPositionRef.current.x, direction, lane, 'tenna-star');
        }

        updateOpponentCrouch(false);

        if (opponentCrouchTimer.current) window.clearTimeout(opponentCrouchTimer.current);
        opponentCrouchTimer.current = window.setTimeout(() => updateOpponentCrouch(false), 320);
        return;
      }

      const isGersonStompSetup = opponent.id === 'gerson-boom' && distance <= GERSON_CPU_STOMP_JUMP_RANGE;
      const jumpAttackChance = isGersonStompSetup
        ? Math.max(ai.jumpChance, GERSON_CPU_STOMP_JUMP_CHANCE)
        : ai.jumpChance;

      if (distance <= (isGersonStompSetup ? GERSON_CPU_STOMP_JUMP_RANGE : 30) && Math.random() < jumpAttackChance) {
        markOpponentPlan('jump');
        opponentGersonAirStompChainRef.current = opponent.id === 'gerson-boom';
        opponentJumpVelocity.current = getFighterJumpPower(
          opponent,
          opponent.id === 'gerson-boom'
            ? DEFAULT_JUMP_POWER
            : selectedDifficulty === 'hard'
              ? 10.4
              : 9.6,
        );
        return;
      }

      const playerIsUsingCrouchAttack =
        canFighterCrouch(player) && pressedKeys.current.has('s') && positionRef.current.y === 0;
      const playerAttackIsLow =
        playerIsAttacking && attackRef.current === 'kick' && playerIsUsingCrouchAttack;
      const playerAttackIsHigh =
        playerIsAttacking && attackRef.current === 'punch' && !playerIsUsingCrouchAttack;

      if (playerAttackIsHigh && Math.random() < dodgeChance * 0.55) {
        if (!canFighterCrouch(opponent)) return;

        updateOpponentCrouch(true);
        markOpponentPlan('crouch');

        if (opponentCrouchTimer.current) window.clearTimeout(opponentCrouchTimer.current);
        opponentCrouchTimer.current = window.setTimeout(() => updateOpponentCrouch(false), 380);
        return;
      }

      if (
        (playerIsAttacking && Math.random() < ai.blockChance) ||
        (!playerIsAttacking && Math.random() < ai.blockChance * 0.18)
      ) {
        updateOpponentCrouch(playerAttackIsLow && canFighterCrouch(opponent));
        updateOpponentBlock(true);
        markOpponentPlan('block');

        if (opponentBlockTimer.current) window.clearTimeout(opponentBlockTimer.current);
        opponentBlockTimer.current = window.setTimeout(
          () => {
            updateOpponentBlock(false);
            if (playerAttackIsLow && canFighterCrouch(opponent)) updateOpponentCrouch(false);
          },
          selectedDifficulty === 'hard' ? 540 : 420,
        );
        return;
      }

      if (distance > 24 && !(opponent.id === 'roaring-knight' && distance <= 58)) return;

      if (!playerIsAttacking && canFighterCrouch(opponent) && Math.random() < ai.crouchChance * 0.35) {
        updateOpponentCrouch(true);
        markOpponentPlan('crouch');

        if (opponentCrouchTimer.current) window.clearTimeout(opponentCrouchTimer.current);
        opponentCrouchTimer.current = window.setTimeout(() => updateOpponentCrouch(false), 360);
        return;
      }

      const now = window.performance.now();

      if (now < opponentAttackReadyAt.current || Math.random() > ai.attackChance) return;

      const isRangedKnightSwordShot = opponent.id === 'roaring-knight' && distance > 24;

      const shouldUseCrouchAttack =
        canFighterCrouch(opponent) &&
        distance <= 20 &&
        Math.random() < clamp(ai.specialChance * (0.65 + ai.lowAttackBias), 0.05, 0.92);
      const nextAttack: Exclude<Attack, 'idle'> = isRangedKnightSwordShot
        ? 'kick'
        : shouldUseCrouchAttack
          ? Math.random() < ai.lowAttackBias
            ? 'kick'
            : 'punch'
          : Math.random() < clamp(
              (selectedDifficulty === 'easy' ? 0.68 : 0.5) - ai.lowAttackBias * 0.12 + ai.antiAirBias * 0.1,
              0.25,
              0.78,
            )
            ? 'punch'
            : 'kick';
      const isOpponentKnightSwordShot = opponent.id === 'roaring-knight' && nextAttack === 'kick';
      const isOpponentGersonParry = opponent.id === 'gerson-boom' && nextAttack === 'kick';
      opponentAttackReadyAt.current =
        now +
        (isRangedKnightSwordShot
          ? KNIGHT_SWORD_PROJECTILE_COOLDOWN_MS
          : getFighterAttackCooldown(opponent, nextAttack, true));
      const attackEffect =
        shouldUseCrouchAttack && nextAttack === 'kick'
          ? 'sweep'
          : shouldUseCrouchAttack && nextAttack === 'punch'
            ? 'uppercut'
            : 'none';
      const hitLevel: HitLevel =
        attackEffect === 'sweep'
          ? 'low'
            : attackEffect === 'uppercut'
              ? 'mid'
            : nextAttack === 'punch'
              ? getStandingPunchHitLevel(opponent)
              : getStandingKickHitLevel(opponent);
      const attackDamage =
        attackEffect === 'sweep'
          ? 2
          : attackEffect === 'uppercut'
            ? 12
            : nextAttack === 'punch'
              ? selectedDifficulty === 'hard'
                ? 5
                : 4
              : selectedDifficulty === 'hard'
                ? 8
                : 6;
      const attackDuration =
        isOpponentKnightSwordShot
          ? KNIGHT_SWORD_PROJECTILE_COOLDOWN_MS
          : isOpponentGersonParry
            ? GERSON_PARRY_DURATION_MS
          : attackEffect === 'uppercut'
          ? CROUCH_UPPERCUT_DURATION_MS + CROUCH_UPPERCUT_RECOVERY_MS
          : nextAttack === 'kick' && attackEffect === 'sweep'
            ? 420
            : getFighterAttackDuration(opponent, nextAttack);
      const hitFrameRatio = attackEffect === 'none' ? ATTACK_HIT_FRAME_RATIO : CROUCH_HIT_FRAME_RATIO;
      const opponentHitFrameRatio = isOpponentGersonParry ? GERSON_PARRY_HIT_FRAME_RATIO : hitFrameRatio;
      const opponentAttackHitDelay = isOpponentKnightSwordShot
        ? KNIGHT_SWORD_PROJECTILE_SHOOT_MS
        : Math.max(0, Math.floor(attackDuration * opponentHitFrameRatio));
      let opponentAttackHitAt = now + opponentAttackHitDelay;
      let opponentAttackEndsAt = now + attackDuration;

      updateOpponentCrouch(shouldUseCrouchAttack);

      markOpponentPlan(
        isOpponentKnightSwordShot
          ? 'projectile'
          : attackEffect === 'sweep'
            ? 'low'
            : attackEffect === 'uppercut'
              ? 'antiHigh'
              : 'melee',
      );
      updateOpponentAttack(nextAttack);
      if (!isOpponentKnightSwordShot) {
        playAttackSound(opponent, nextAttack, shouldUseCrouchAttack);
      }

      if (opponentAttackHitTimer.current) window.clearTimeout(opponentAttackHitTimer.current);
      const resolveOpponentAttackHit = () => {
        if (
          opponentAttackRef.current !== nextAttack ||
          opponentStatusRef.current !== 'idle' ||
          playerHealthRef.current <= 0
        ) {
          consumeOpponentPlan(false);
          return;
        }

        if (isOpponentKnightSwordShot) {
          const direction: -1 | 1 = positionRef.current.x >= opponentPositionRef.current.x ? 1 : -1;
          spawnProjectile('right', opponentPositionRef.current.x, direction, 'high', 'knight-sword', {
            bottomPx: getKnightSwordProjectileBottom(
              opponentPositionRef.current,
              opponent.id === 'roaring-knight' ? knightVisualLiftRef.current : 0,
            ),
          });
          return;
        }

        if (isOpponentGersonParry) {
          const didParry = useGersonParry('right');
          consumeOpponentPlan(didParry);
          return;
        }

        const currentAttackRange =
          (nextAttack === 'punch' ? 18 : 22) +
          (isPlayerKnightSpecialHurtboxExpanded() ? KNIGHT_SPECIAL_HURTBOX_BONUS : 0);
        const currentDistance = Math.abs(positionRef.current.x - opponentPositionRef.current.x);

        if (currentDistance > currentAttackRange) {
          consumeOpponentPlan(false);
          return;
        }
        if (
          !canMeleeAttackReachVertical(
            opponentPositionRef.current.y,
            positionRef.current.y,
            attackEffect,
            hitLevel,
          )
        ) {
          consumeOpponentPlan(false);
          return;
        }

        const didDamageThroughBlock = damagePlayer(attackDamage, attackEffect, hitLevel);
        consumeOpponentPlan(didDamageThroughBlock);
        if (didDamageThroughBlock && opponent.id === 'jevil') {
          playRandomJevilVoiceSound();
        }

        if (
          didDamageThroughBlock &&
          attackEffect === 'none' &&
          !isPlayerKnightSphereActive() &&
          !isPlayerKnightDarkWaveHolding()
        ) {
          applyProjectileKnockback(
            'left',
            positionRef.current.x <= opponentPositionRef.current.x ? -1 : 1,
            getAttackKnockbackStrength(opponent, nextAttack),
          );
        }
      };
      const handleOpponentAttackHitTimer = () => {
        opponentAttackHitTimer.current = null;

        if (isArenaPausedRef.current) {
          const pausedAt = arenaPauseStartedAtRef.current || window.performance.now();
          const remainingAfterPause = Math.max(0, opponentAttackHitAt - pausedAt);
          opponentAttackHitTimer.current = runAfterArenaPause(() => {
            opponentAttackHitAt += Math.max(0, window.performance.now() - pausedAt);
            opponentAttackHitTimer.current = window.setTimeout(
              handleOpponentAttackHitTimer,
              remainingAfterPause,
            );
          });
          return;
        }
        resolveOpponentAttackHit();
      };
      opponentAttackHitTimer.current = window.setTimeout(handleOpponentAttackHitTimer, opponentAttackHitDelay);

      if (opponentAttackTimer.current) window.clearTimeout(opponentAttackTimer.current);
      const finishOpponentAttack = () => {
        updateOpponentAttack('idle');
        updateOpponentCrouch(false);
      };
      const handleOpponentAttackEndTimer = () => {
        opponentAttackTimer.current = null;

        if (isArenaPausedRef.current) {
          const pausedAt = arenaPauseStartedAtRef.current || window.performance.now();
          const remainingAfterPause = Math.max(0, opponentAttackEndsAt - pausedAt);
          opponentAttackTimer.current = runAfterArenaPause(() => {
            opponentAttackEndsAt += Math.max(0, window.performance.now() - pausedAt);
            opponentAttackTimer.current = window.setTimeout(
              handleOpponentAttackEndTimer,
              remainingAfterPause,
            );
          });
          return;
        }
        finishOpponentAttack();
      };
      opponentAttackTimer.current = window.setTimeout(
        handleOpponentAttackEndTimer,
        attackDuration,
      );
    }, AI_CONFIG[selectedDifficulty].thinkMs);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', releaseHeldPlayerInputs);
      pressedKeys.current.clear();
      jumpVelocity.current = 0;
      opponentJumpVelocity.current = 0;
      playerKnockbackVelocity.current = 0;
      opponentKnockbackVelocity.current = 0;
      attackRef.current = 'idle';
      playerAttackFacingRef.current = null;
      cancelPlayerChargeAttack();
      cancelPlayerKnightDarkWave();
      cancelOpponentChargeAttack();
      cancelOpponentKnightDarkWave();
      resetPlayerKnightSphere();
      resetOpponentKnightSphere();
      specialInputStep.current = 0;
      specialInputExpiresAt.current = 0;
      specialInputStartedAt.current = 0;
      resetKnightDarkWaveInput();
      playerSpecialLockRef.current = false;
      opponentSpecialLockRef.current = false;
      updatePlayerStatus('idle');
      updateOpponentAttack('idle');
      updateOpponentStatus('idle');
      projectilesRef.current = [];
      clearJevilPlatforms();
      setIsCrouchAttackLocked(false);
      setIsCrouching(false);
      stopPlayerBlock();
      setPlayerSpecialShooting(false);
      setPlayerSpecialSpriteOverride(null);
      setOpponentSpecialShooting(false);
      setOpponentSpecialSpriteOverride(null);
      updateOpponentBlock(false);
      updateOpponentCrouch(false);
      setProjectiles([]);
      setHealPopups([]);
      clearKnightExplosionTimers();
      setKnightExplosions([]);

      if (attackTimer.current) window.clearTimeout(attackTimer.current);
      if (attackHitTimer.current) window.clearTimeout(attackHitTimer.current);
      if (playerSpecialTimer.current) window.clearTimeout(playerSpecialTimer.current);
      if (opponentSpecialTimer.current) window.clearTimeout(opponentSpecialTimer.current);
      if (playerSpecialSpawnTimer.current) window.clearTimeout(playerSpecialSpawnTimer.current);
      if (opponentSpecialSpawnTimer.current) window.clearTimeout(opponentSpecialSpawnTimer.current);
      if (playerAirSpecialWaveTimer.current) window.clearTimeout(playerAirSpecialWaveTimer.current);
      if (opponentAirSpecialWaveTimer.current) window.clearTimeout(opponentAirSpecialWaveTimer.current);
      if (playerHealTimer.current) window.clearTimeout(playerHealTimer.current);
      if (playerHealInterval.current) window.clearInterval(playerHealInterval.current);
      if (opponentHealTimer.current) window.clearTimeout(opponentHealTimer.current);
      if (opponentHealInterval.current) window.clearInterval(opponentHealInterval.current);
      if (opponentAttackTimer.current) window.clearTimeout(opponentAttackTimer.current);
      if (opponentAttackHitTimer.current) window.clearTimeout(opponentAttackHitTimer.current);
      if (opponentAttackInterval.current) window.clearInterval(opponentAttackInterval.current);
      if (opponentBlockTimer.current) window.clearTimeout(opponentBlockTimer.current);
      if (opponentCrouchTimer.current) window.clearTimeout(opponentCrouchTimer.current);
      if (playerStatusTimer.current) window.clearTimeout(playerStatusTimer.current);
      if (opponentStatusTimer.current) window.clearTimeout(opponentStatusTimer.current);
      if (playerDamageFlashTimer.current) window.clearTimeout(playerDamageFlashTimer.current);
      if (opponentDamageFlashTimer.current) window.clearTimeout(opponentDamageFlashTimer.current);
      if (playerGersonSpinDamageTimer.current) window.clearInterval(playerGersonSpinDamageTimer.current);
      if (playerGersonSpinMaxTimer.current) window.clearTimeout(playerGersonSpinMaxTimer.current);
      if (playerRecoveryTimer.current) window.clearTimeout(playerRecoveryTimer.current);
      if (opponentRecoveryTimer.current) window.clearTimeout(opponentRecoveryTimer.current);
      clearGersonAirCounterHideTimer('left');
      clearGersonAirCounterHideTimer('right');
      setPlayerRecovering(false);
      setOpponentRecovering(false);
      if (playerGersonLeapPrepTimer.current) {
        window.clearTimeout(playerGersonLeapPrepTimer.current);
        playerGersonLeapPrepTimer.current = null;
      }
      setPlayerGersonLeapPreparing(false);
      setPlayerGersonLeapActive(false);
      playerGersonLeapDirectBoostReadyRef.current = false;
      opponentGersonAirStompChainRef.current = false;
      if (animationFrame.current) window.cancelAnimationFrame(animationFrame.current);
    };
  }, [arenaMode, controlBindings, screen, selectedDifficulty, selectedStage]);

  function resetRound({ clearOpponentLoop = false } = {}) {
    if (attackTimer.current) window.clearTimeout(attackTimer.current);
    if (attackHitTimer.current) window.clearTimeout(attackHitTimer.current);
    if (playerSpecialTimer.current) window.clearTimeout(playerSpecialTimer.current);
    if (opponentSpecialTimer.current) window.clearTimeout(opponentSpecialTimer.current);
    if (playerSpecialSpawnTimer.current) window.clearTimeout(playerSpecialSpawnTimer.current);
    if (opponentSpecialSpawnTimer.current) window.clearTimeout(opponentSpecialSpawnTimer.current);
    if (playerAirSpecialWaveTimer.current) window.clearTimeout(playerAirSpecialWaveTimer.current);
    if (opponentAirSpecialWaveTimer.current) window.clearTimeout(opponentAirSpecialWaveTimer.current);
    if (playerHealTimer.current) window.clearTimeout(playerHealTimer.current);
    if (playerHealInterval.current) window.clearInterval(playerHealInterval.current);
    if (opponentHealTimer.current) window.clearTimeout(opponentHealTimer.current);
    if (opponentHealInterval.current) window.clearInterval(opponentHealInterval.current);
    if (opponentAttackTimer.current) window.clearTimeout(opponentAttackTimer.current);
    if (opponentAttackHitTimer.current) window.clearTimeout(opponentAttackHitTimer.current);
    if (clearOpponentLoop && opponentAttackInterval.current) window.clearInterval(opponentAttackInterval.current);
    if (opponentBlockTimer.current) window.clearTimeout(opponentBlockTimer.current);
    if (opponentCrouchTimer.current) window.clearTimeout(opponentCrouchTimer.current);
    if (playerStatusTimer.current) window.clearTimeout(playerStatusTimer.current);
    if (opponentStatusTimer.current) window.clearTimeout(opponentStatusTimer.current);
    if (playerDamageFlashTimer.current) window.clearTimeout(playerDamageFlashTimer.current);
    if (opponentDamageFlashTimer.current) window.clearTimeout(opponentDamageFlashTimer.current);
    if (playerGersonSpinDamageTimer.current) window.clearInterval(playerGersonSpinDamageTimer.current);
    if (playerGersonSpinMaxTimer.current) window.clearTimeout(playerGersonSpinMaxTimer.current);
    if (playerGersonLeapPrepTimer.current) window.clearTimeout(playerGersonLeapPrepTimer.current);
    if (playerRecoveryTimer.current) window.clearTimeout(playerRecoveryTimer.current);
    if (opponentRecoveryTimer.current) window.clearTimeout(opponentRecoveryTimer.current);
    if (victoryTimer.current) window.clearTimeout(victoryTimer.current);
    if (roundTransitionTimer.current) window.clearTimeout(roundTransitionTimer.current);
    if (roundCurtainTimer.current) window.clearTimeout(roundCurtainTimer.current);
    if (countdownTimer.current) window.clearTimeout(countdownTimer.current);
    if (roundClockTimer.current) window.clearInterval(roundClockTimer.current);
    clearGersonAirCounterHideTimer('left');
    clearGersonAirCounterHideTimer('right');
    clearKnightExplosionTimers();

    setPlayerPosition(START_POSITION);
    setOpponentPosition(OPPONENT_POSITION);
    setPlayerHealth(MAX_HEALTH);
    setOpponentHealth(MAX_HEALTH);
    playerHealthRef.current = MAX_HEALTH;
    opponentHealthRef.current = MAX_HEALTH;
    playerGersonLandingImmuneUntilRef.current = 0;
    opponentGersonLandingImmuneUntilRef.current = 0;
    playerGersonSpinDamageTimer.current = null;
    playerGersonSpinMaxTimer.current = null;
    playerGersonLeapPrepTimer.current = null;
    playerGersonAirLandingHitsRef.current = 0;
    opponentGersonAirLandingHitsRef.current = 0;
    setPlayerGersonAirLandingHits(0);
    setOpponentGersonAirLandingHits(0);
    setPlayerGersonLeapPreparing(false);
    setPlayerGersonLeapActive(false);
    playerGersonLeapDirectBoostReadyRef.current = false;
    opponentGersonAirStompChainRef.current = false;
    setKnightExplosions([]);
    setGersonLeapEffects([]);
    clearJevilPlatforms();
    clearJevilAbsorbState('left');
    clearJevilAbsorbState('right');
    playerJevilAbsorbRecoverUntilRef.current = 0;
    opponentJevilAbsorbRecoverUntilRef.current = 0;
    roundResolvedRef.current = false;
    positionRef.current = START_POSITION;
    opponentPositionRef.current = OPPONENT_POSITION;
    jumpVelocity.current = 0;
    opponentJumpVelocity.current = 0;
    playerKnockbackVelocity.current = 0;
    opponentKnockbackVelocity.current = 0;
    attackReadyAt.current = 0;
    opponentAttackReadyAt.current = 0;
    specialReadyAt.current = 0;
    specialInputStep.current = 0;
    specialInputExpiresAt.current = 0;
    specialInputStartedAt.current = 0;
    specialInputMove.current = null;
    resetKnightDarkWaveInput();
    opponentSpecialReadyAt.current = 0;
    attackRef.current = 'idle';
    playerAttackFacingRef.current = null;
    cancelPlayerChargeAttack();
    cancelPlayerKnightDarkWave();
    cancelOpponentChargeAttack();
    cancelOpponentKnightDarkWave();
    resetPlayerKnightSphere();
    resetOpponentKnightSphere();
    playerSpecialLockRef.current = false;
    playerAirSpecialActiveRef.current = false;
    playerAirSpecialYRef.current = 0;
    opponentSpecialLockRef.current = false;
    opponentAirSpecialActiveRef.current = false;
    opponentAirSpecialYRef.current = 0;
    opponentAttackRef.current = 'idle';
    updatePlayerStatus('idle');
    updateOpponentStatus('idle');
    setPlayerRecovering(false);
    setOpponentRecovering(false);
    stopPlayerBlock();
    updateOpponentBlock(false);
    updateOpponentCrouch(false);
    pressedKeys.current.clear();
    setAttack('idle');
    updateOpponentAttack('idle');
    projectilesRef.current = [];
    setProjectiles([]);
    setHealPopups([]);
    setIsCrouchAttackLocked(false);
    setIsCrouching(false);
    setPlayerSpecialShooting(false);
    setPlayerSpecialSpriteOverride(null);
    setOpponentSpecialShooting(false);
    setOpponentSpecialSpriteOverride(null);
    setPlayerAirSpecialWave(false);
    setOpponentAirSpecialWave(false);
    setPlayerDamageFlash(false);
    setOpponentDamageFlash(false);
    setRoundWinnerPoseSprite(null);
    setRoundCurtainPhase('idle');
    setRoundCountdown(3);
    setRoundTimeLeft(ROUND_TIME_LIMIT_SECONDS);
    roundCountdownRef.current = 3;
    roundTimeLeftRef.current = ROUND_TIME_LIMIT_SECONDS;
  }

  function resetFight() {
    resetRound({ clearOpponentLoop: true });
    aiLearningRef.current = createAiLearningMemory();
    pendingOpponentActionRef.current = null;
    botCoachAdviceRef.current = DEFAULT_BOT_COACH_ADVICE;
    botCoachRequestInFlightRef.current = false;
    setRoundNumber(1);
    setPlayerRoundWins(0);
    setOpponentRoundWins(0);
    setWinnerSide('left');
  }

  function openCharacterSelect(mode: ArenaMode) {
    setArenaMode(mode);
    setScreen('select');
  }

  function makeRoomCode() {
    return Math.random().toString(36).slice(2, 6).toUpperCase();
  }

  function cleanupOnlineRoom() {
    if (onlineChannelRef.current) {
      void supabase.removeChannel(onlineChannelRef.current);
      onlineChannelRef.current = null;
    }
    remotePressedKeys.current.clear();
    onlineInputSequenceRef.current = 0;
    onlineSnapshotSequenceRef.current = 0;
    lastRemoteInputSequenceRef.current = 0;
    lastAppliedOnlineSnapshotRef.current = 0;
    lastOnlineSnapshotAt.current = 0;
    setOnlinePeerReady(false);
    setOnlineRole(null);
    setOnlineRoomStatus('idle');
    setOnlineRoomMessage('Создай комнату или введи код друга.');
  }

  function applyOnlineSnapshot(snapshot: OnlineSnapshotMessage) {
    if (snapshot.playerId === onlinePlayerIdRef.current || onlineRoleRef.current !== 'guest') return;
    if (snapshot.sequence <= lastAppliedOnlineSnapshotRef.current) return;
    lastAppliedOnlineSnapshotRef.current = snapshot.sequence;

    const reconcilePosition = (current: Position, target: Position) => {
      const distance = Math.hypot(target.x - current.x, target.y - current.y);
      if (distance >= ONLINE_RECONCILE_SNAP_DISTANCE) return target;
      return {
        x: current.x + (target.x - current.x) * ONLINE_RECONCILE_LERP,
        y: current.y + (target.y - current.y) * ONLINE_RECONCILE_LERP,
      };
    };
    const nextPlayerPosition = reconcilePosition(positionRef.current, snapshot.playerPosition);
    const nextOpponentPosition = reconcilePosition(opponentPositionRef.current, snapshot.opponentPosition);

    positionRef.current = nextPlayerPosition;
    opponentPositionRef.current = nextOpponentPosition;
    setPlayerPosition(nextPlayerPosition);
    setOpponentPosition(nextOpponentPosition);
    setPlayerHealth(snapshot.playerHealth);
    setOpponentHealth(snapshot.opponentHealth);
    attackRef.current = snapshot.attack;
    opponentAttackRef.current = snapshot.opponentAttack;
    setAttack(snapshot.attack);
    setOpponentAttack(snapshot.opponentAttack);
    playerStatusRef.current = snapshot.playerStatus;
    opponentStatusRef.current = snapshot.opponentStatus;
    setPlayerStatus(snapshot.playerStatus);
    setOpponentStatus(snapshot.opponentStatus);
    setIsCrouching(snapshot.isCrouching);
    opponentCrouchingRef.current = snapshot.opponentCrouching;
    setOpponentCrouching(snapshot.opponentCrouching);
    playerBlockHeldRef.current = snapshot.playerBlocking;
    setIsBlocking(snapshot.playerBlocking);
    opponentBlockingRef.current = snapshot.opponentBlocking;
    setOpponentBlocking(snapshot.opponentBlocking);
    setPlayerSpecialShooting(snapshot.playerSpecialShooting);
    setOpponentSpecialShooting(snapshot.opponentSpecialShooting);
    setPlayerSpecialSpriteOverride(snapshot.playerSpecialSpriteOverride);
    setOpponentSpecialSpriteOverride(snapshot.opponentSpecialSpriteOverride);
    setPlayerAirSpecialWave(snapshot.playerAirSpecialWave);
    setOpponentAirSpecialWave(snapshot.opponentAirSpecialWave);
    setPlayerChargeAuraActive(snapshot.playerChargeAuraActive);
    setOpponentChargeAuraActive(snapshot.opponentChargeAuraActive);
    if (playerChargeAttackStateRef.current !== snapshot.playerChargeAttackState) {
      playerChargeAttackStateRef.current = snapshot.playerChargeAttackState;
      if (snapshot.playerChargeAttackState === 'charging') playerChargeAttackStartedAt.current = window.performance.now();
      if (snapshot.playerChargeAttackState === 'releasing') playerChargeReleaseStartedAt.current = window.performance.now();
    }
    if (opponentChargeAttackStateRef.current !== snapshot.opponentChargeAttackState) {
      opponentChargeAttackStateRef.current = snapshot.opponentChargeAttackState;
      if (snapshot.opponentChargeAttackState === 'charging') opponentChargeAttackStartedAt.current = window.performance.now();
      if (snapshot.opponentChargeAttackState === 'releasing') opponentChargeReleaseStartedAt.current = window.performance.now();
    }
    setPlayerChargeAttackState(snapshot.playerChargeAttackState);
    setOpponentChargeAttackState(snapshot.opponentChargeAttackState);
    if (knightSpherePhaseRef.current !== snapshot.playerKnightSpherePhase) {
      knightSpherePhaseRef.current = snapshot.playerKnightSpherePhase;
      playerKnightSpherePhaseStartedAt.current = window.performance.now();
    }
    if (opponentKnightSpherePhaseRef.current !== snapshot.opponentKnightSpherePhase) {
      opponentKnightSpherePhaseRef.current = snapshot.opponentKnightSpherePhase;
      opponentKnightSpherePhaseStartedAt.current = window.performance.now();
    }
    setPlayerKnightSpherePhase(snapshot.playerKnightSpherePhase);
    setOpponentKnightSpherePhase(snapshot.opponentKnightSpherePhase);
    if (playerKnightDarkWaveStateRef.current !== snapshot.playerKnightDarkWaveState) {
      playerKnightDarkWaveStartedAt.current =
        snapshot.playerKnightDarkWaveState === 'holding' ? window.performance.now() : 0;
    }
    if (opponentKnightDarkWaveStateRef.current !== snapshot.opponentKnightDarkWaveState) {
      opponentKnightDarkWaveStartedAt.current =
        snapshot.opponentKnightDarkWaveState === 'holding' ? window.performance.now() : 0;
    }
    playerKnightDarkWaveStateRef.current = snapshot.playerKnightDarkWaveState;
    opponentKnightDarkWaveStateRef.current = snapshot.opponentKnightDarkWaveState;
    playerKnightDarkWaveDirectionRef.current = snapshot.playerKnightDarkWaveDirection;
    setPlayerKnightDarkWaveState(snapshot.playerKnightDarkWaveState);
    setOpponentKnightDarkWaveState(snapshot.opponentKnightDarkWaveState);
    setPlayerKnightDarkWaveDirection(snapshot.playerKnightDarkWaveDirection);
    setPlayerKnightDarkWaveOverheated(snapshot.playerKnightDarkWaveOverheated);
    setOpponentKnightDarkWaveOverheated(snapshot.opponentKnightDarkWaveOverheated);
    playerJevilAbsorbActiveRef.current = snapshot.playerJevilAbsorbing;
    opponentJevilAbsorbActiveRef.current = snapshot.opponentJevilAbsorbing;
    setPlayerJevilAbsorbing(snapshot.playerJevilAbsorbing);
    setOpponentJevilAbsorbing(snapshot.opponentJevilAbsorbing);
    setPlayerJevilHeadlessPose(snapshot.playerJevilHeadlessPose);
    setOpponentJevilHeadlessPose(snapshot.opponentJevilHeadlessPose);
    setJevilPlatformsAndRef(snapshot.jevilPlatforms);
    roundTimeLeftRef.current = snapshot.roundTimeLeft;
    setRoundTimeLeft(snapshot.roundTimeLeft);
    roundCountdownRef.current = snapshot.roundCountdown;
    setRoundCountdown(snapshot.roundCountdown);
    projectilesRef.current = snapshot.projectiles;
    setProjectiles(snapshot.projectiles);
  }

  function createOnlineChannel(code: string, role: OnlineRole) {
    cleanupOnlineRoom();
    setRoomCode(code);
    setOnlineRole(role);
    setOnlineRoomStatus('connecting');
    setOnlineRoomMessage('Подключаемся к комнате...');

    const channel = supabase.channel(`deltafight-room-${code}`, {
      config: { broadcast: { self: false } },
    });

    channel
      .on('broadcast', { event: 'peer-ready' }, ({ payload }) => {
        const message = payload as { playerId?: string };
        if (message.playerId === onlinePlayerIdRef.current) return;
        setOnlinePeerReady(true);
        setOnlineRoomStatus('ready');
        setOnlineRoomMessage(role === 'host' ? 'Игрок подключился. Можно начинать бой.' : 'Комната готова. Ждем старт от хоста.');
        if (role === 'host') {
          void channel.send({
            type: 'broadcast',
            event: 'host-ready',
            payload: { playerId: onlinePlayerIdRef.current },
          });
        }
      })
      .on('broadcast', { event: 'host-ready' }, ({ payload }) => {
        const message = payload as { playerId?: string };
        if (message.playerId === onlinePlayerIdRef.current) return;
        setOnlinePeerReady(true);
        setOnlineRoomStatus('ready');
        setOnlineRoomMessage('Комната готова. Ждем старт от хоста.');
      })
      .on('broadcast', { event: 'start' }, ({ payload }) => {
        const message = payload as { playerId?: string; stageId?: string; fighterId?: string; opponentId?: string };
        if (message.playerId === onlinePlayerIdRef.current) return;
        if (message.stageId) setSelectedStageId(message.stageId);
        if (message.fighterId) setSelectedFighterId(message.fighterId);
        if (message.opponentId) setSelectedOpponentId(message.opponentId);
        setArenaMode('online');
        setOnlineRoomStatus('playing');
        resetFight();
        playFightStartSound();
        setScreen('arena');
      })
      .on('broadcast', { event: 'input' }, ({ payload }) => {
        const message = payload as OnlineInputMessage;
        if (message.playerId === onlinePlayerIdRef.current || onlineRoleRef.current !== 'host') return;
        if (message.sequence <= lastRemoteInputSequenceRef.current) return;
        lastRemoteInputSequenceRef.current = message.sequence;
        handleOnlineOpponentInput(message.key, message.isDown);
      })
      .on('broadcast', { event: 'snapshot' }, ({ payload }) => {
        applyOnlineSnapshot(payload as OnlineSnapshotMessage);
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setOnlineRoomStatus(role === 'host' ? 'waiting' : 'waiting');
          setOnlineRoomMessage(role === 'host' ? `Комната ${code} создана. Ждем второго игрока.` : `Подключились к ${code}.`);
          void channel.send({
            type: 'broadcast',
            event: role === 'host' ? 'host-ready' : 'peer-ready',
            payload: { playerId: onlinePlayerIdRef.current },
          });
        } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
          setOnlineRoomStatus('error');
          setOnlineRoomMessage('Не получилось подключиться к комнате.');
        }
      });

    onlineChannelRef.current = channel;
  }

  function createOnlineRoom() {
    createOnlineChannel(makeRoomCode(), 'host');
  }

  function joinOnlineRoom() {
    const code = joinRoomCode.trim().toUpperCase();
    if (code.length < 3) {
      setOnlineRoomStatus('error');
      setOnlineRoomMessage('Введи код комнаты.');
      return;
    }
    createOnlineChannel(code, 'guest');
  }

  function startOnlineRoomMatch() {
    if (!onlineChannelRef.current || onlineRole !== 'host') return;
    setArenaMode('online');
    setOnlineRoomStatus('playing');
    setLockedFighter(selectedFighter);
    setLockedOpponent(selectedOpponent);
    void onlineChannelRef.current.send({
      type: 'broadcast',
      event: 'start',
      payload: {
        playerId: onlinePlayerIdRef.current,
        stageId: selectedStageId,
        fighterId: selectedFighter.id,
        opponentId: selectedOpponent.id,
      },
    });
    resetFight();
    playFightStartSound();
    setScreen('arena');
  }

  function broadcastOnlineInput(key: string, isDown: boolean) {
    if (arenaMode !== 'online' || onlineRoleRef.current !== 'guest' || !onlineChannelRef.current) return;
    void onlineChannelRef.current.send({
      type: 'broadcast',
      event: 'input',
      payload: {
        playerId: onlinePlayerIdRef.current,
        key,
        isDown,
        sequence: ++onlineInputSequenceRef.current,
        sentAt: window.performance.now(),
      } satisfies OnlineInputMessage,
    });
  }

  function openRoomsScreen() {
    setArenaMode('online');
    setScreen('rooms');
  }

  function openCampaignSaveSelect() {
    if (doorTransitionMode || doorTransitionTimer.current) return;
    playBufferedSound('doorClick', doorClickSoundRef.current, 0.85);
    campaignPressedKeys.current.clear();
    setCampaignSaves(readCampaignSaves());
    setScreen('campaign-saves');
  }

  function openCampaignMap(slot: number) {
    const campaignSave = campaignSaves.find((save) => save.slot === slot) ?? createEmptyCampaignSave(slot);
    campaignPressedKeys.current.clear();
    campaignPositionRef.current = campaignSave.position;
    setSelectedCampaignSaveSlot(slot);
    setCampaignRoomId(campaignSave.roomId);
    setCampaignPosition(campaignSave.position);
    setIsCampaignBagDefeated(campaignSave.isBagDefeated);
    setIsCampaignBagCollected(campaignSave.isBagCollected);
    setCampaignDialogue(null);
    setCampaignActiveNpcId(null);
    setIsCampaignMenuOpen(false);
    setCampaignBossCutsceneStep(null);
    setCampaignBossCutscenePhase('talking');
    setScreen('campaign');
  }

  function resetCampaignSave(slot: number) {
    const nextSaves = campaignSaves.map((save) => (save.slot === slot ? createEmptyCampaignSave(slot) : save));
    setCampaignSaves(nextSaves);
    writeCampaignSaves(nextSaves);

    if (selectedCampaignSaveSlot === slot) {
      setSelectedCampaignSaveSlot(null);
    }
  }

  function startFight() {
    setLockedFighter(selectedFighter);
    setLockedOpponent(selectedOpponent);
    setScreen('stage');
  }

  function startFightOnStage(stageId: string) {
    setSelectedStageId(stageId);
    resetFight();
    setSettingsOpen(false);
    playFightStartSound();
    setScreen('arena');
  }

  function rematch() {
    resetFight();
    setSettingsOpen(false);
    playFightStartSound();
    setScreen('arena');
  }

  function backToSelect() {
    if (arenaMode === 'online') cleanupOnlineRoom();
    setSettingsOpen(false);
    resetFight();
    setLockedFighter(null);
    setLockedOpponent(null);
    setScreen('select');
  }

  function backToMainMenu() {
    if (arenaMode === 'online') cleanupOnlineRoom();
    resetFight();
    setArenaMode('fight');
    setLockedFighter(null);
    setLockedOpponent(null);
    setScreen('menu');
  }

  function openModeMenu() {
    if (doorTransitionTimer.current) {
      window.clearTimeout(doorTransitionTimer.current);
      doorTransitionTimer.current = null;
    }
    if (screenRevealTimer.current) {
      window.clearTimeout(screenRevealTimer.current);
      screenRevealTimer.current = null;
    }
    setDoorTransitionMode(null);
    setIsScreenRevealing(false);
    setShowTitleInfo(false);
    setScreen('menu');
  }

  function resetControlBindings() {
    setControlBindings(DEFAULT_CONTROL_BINDINGS);
    setRebindingAction(null);
    pressedKeys.current.clear();
  }

  function formatControlKey(code: string) {
    const labels: Record<string, string> = {
      Space: 'Space',
      ShiftLeft: 'Shift L',
      ShiftRight: 'Shift R',
      ControlLeft: 'Ctrl L',
      ControlRight: 'Ctrl R',
      AltLeft: 'Alt L',
      AltRight: 'Alt R',
      ArrowLeft: '<',
      ArrowRight: '>',
      ArrowDown: 'v',
      ArrowUp: '^',
    };

    if (labels[code]) return labels[code];
    if (/^Key[A-Z]$/.test(code)) return code.slice(3);
    if (/^Digit[0-9]$/.test(code)) return code.slice(5);
    return code.replace(/^(Numpad|Mouse)/, '');
  }

  function assignControlBinding(action: GameInput, code: string) {
    if (code === 'Escape') {
      setRebindingAction(null);
      return;
    }

    if (code === 'Backspace' || code === 'Delete') {
      setControlBindings((current) => ({
        ...current,
        [action]: DEFAULT_CONTROL_BINDINGS[action],
      }));
      setRebindingAction(null);
      pressedKeys.current.clear();
      return;
    }

    setControlBindings((current) => {
      const next = { ...current };
      const previousCode = current[action];
      const occupiedAction = (Object.keys(current) as GameInput[]).find(
        (input) => input !== action && current[input] === code,
      );

      next[action] = code;
      if (occupiedAction) next[occupiedAction] = previousCode;
      return next;
    });
    setRebindingAction(null);
    pressedKeys.current.clear();
  }

  function handleControlBindingKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>, action: GameInput) {
    event.preventDefault();
    event.stopPropagation();
    assignControlBinding(action, event.code);
  }

  const controlsSettings = controlsSettingsOpen ? (
    <div className="controls-settings">
      <div className="controls-settings__header">
        <button className="controls-back-button" onClick={() => setControlsSettingsOpen(false)} type="button">
          Назад
        </button>
        <span>Управление</span>
        <button className="controls-reset-button" onClick={resetControlBindings} type="button">
          Сброс
        </button>
      </div>
      <div className="controls-bindings">
        {CONTROL_BINDING_LABELS.map(({ action, label }) => (
          <button
            className={`control-binding${rebindingAction === action ? ' control-binding--listening' : ''}`}
            key={action}
            onClick={() => setRebindingAction(action)}
            onKeyDown={(event) => handleControlBindingKeyDown(event, action)}
            type="button"
          >
            <span>{label}</span>
            <strong>{rebindingAction === action ? '...' : formatControlKey(controlBindings[action])}</strong>
          </button>
        ))}
      </div>
    </div>
  ) : (
    <button className="settings-menu-button" onClick={() => setControlsSettingsOpen(true)} type="button">
      Управление
    </button>
  );

  const soundSettings = (
    <>
      <label className="settings-control">
        <span>
          Эффекты
          <strong>{Math.round(effectsVolume * 100)}%</strong>
        </span>
        <input
          type="range"
          min="0"
          max="100"
          value={Math.round(effectsVolume * 100)}
          onChange={(event) => setEffectsVolume(Number(event.currentTarget.value) / 100)}
        />
      </label>
      <label className="settings-control">
        <span>
          Музыка
          <strong>{Math.round(musicVolume * 100)}%</strong>
        </span>
        <input
          type="range"
          min="0"
          max="100"
          value={Math.round(musicVolume * 100)}
          onChange={(event) => setMusicVolume(Number(event.currentTarget.value) / 100)}
        />
      </label>
      <button className="settings-menu-button" onClick={() => setControlsSettingsOpen(true)} type="button">
        Управление
      </button>
    </>
  );

  const settingsOverlay = (
    <div className={`settings-widget${isArenaPaused ? ' settings-widget--arena-paused' : ''}`}>
      <button
        className="settings-toggle"
        type="button"
        aria-expanded={settingsOpen}
        aria-label="Настройки"
        onClick={() => setSettingsOpen((isOpen) => !isOpen)}
      >
        <img src={settingsIcon} alt="" aria-hidden="true" />
      </button>
      {settingsOpen && (
        <div
          className={`settings-panel${controlsSettingsOpen ? ' settings-panel--controls' : ''}`}
          role="dialog"
          aria-label="Настройки звука"
        >
          {isArenaPaused && <div className="settings-panel__title">ПАУЗА</div>}
          <label className="settings-control">
            <span>
              Эффекты
              <strong>{Math.round(effectsVolume * 100)}%</strong>
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(effectsVolume * 100)}
              onChange={(event) => setEffectsVolume(Number(event.currentTarget.value) / 100)}
            />
          </label>
          <label className="settings-control">
            <span>
              Музыка
              <strong>{Math.round(musicVolume * 100)}%</strong>
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(musicVolume * 100)}
              onChange={(event) => setMusicVolume(Number(event.currentTarget.value) / 100)}
            />
          </label>
          {controlsSettings}
          {false ? soundSettings : null}
        </div>
      )}
    </div>
  );

  const arenaPauseMenu = isArenaPaused ? (
    <div className="arena-pause-menu" role="dialog" aria-label="Пауза">
      <div className="settings-panel__title">ПАУЗА</div>
      <label className="settings-control">
        <span>
          Эффекты
          <strong>{Math.round(effectsVolume * 100)}%</strong>
        </span>
        <input
          type="range"
          min="0"
          max="100"
          value={Math.round(effectsVolume * 100)}
          onChange={(event) => setEffectsVolume(Number(event.currentTarget.value) / 100)}
        />
      </label>
      <label className="settings-control">
        <span>
          Музыка
          <strong>{Math.round(musicVolume * 100)}%</strong>
        </span>
        <input
          type="range"
          min="0"
          max="100"
          value={Math.round(musicVolume * 100)}
          onChange={(event) => setMusicVolume(Number(event.currentTarget.value) / 100)}
        />
      </label>
      {controlsSettings}
      <button className="confirm-button arena-pause-menu__button" onClick={() => setSettingsOpen(false)} type="button">
        Продолжить
      </button>
      <button className="back-button arena-pause-menu__button" onClick={backToSelect} type="button">
        Выбор бойца
      </button>
    </div>
  ) : null;

  if (screen === 'victory') {
    const winner = winnerSide === 'left' ? player : opponent;
    const winnerLabel = winnerSide === 'left' ? 'Игрок 1' : 'Игрок 2';

    return (
      <main className="game-shell game-shell--menu-bg">
        <section className="victory-screen" aria-labelledby="victory-title">
          <p className="eyebrow">Finish</p>
          <h1 id="victory-title">{winnerLabel} победил</h1>
          <FighterPortrait fighter={winner} size="victory" />
          <p className="victory-copy">{winner.name} забрал раунд. Можно сыграть реванш или выбрать другого бойца.</p>
          <p className="victory-copy">Match score: {playerRoundWins}:{opponentRoundWins}</p>
          <div className="victory-actions">
            <button className="confirm-button" onClick={rematch} type="button">
              Реванш
            </button>
            <span>Right Shift - блок</span>
            <span>S + D + ←/→ - Special</span>
            <span>Air A + D + left/right - Tenna Wave</span>
            <button className="back-button" onClick={backToSelect} type="button">
              Выбор бойца
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (screen === 'title') {
    return (
      <main className="game-shell game-shell--title">
        <section className="title-menu" aria-labelledby="title-menu-heading">
          <img
            className="title-menu__backdrop"
            src={deltafightTitleBg}
            alt=""
            aria-hidden="true"
          />
          <div className="title-menu__content">
            <h1 id="title-menu-heading" className="title-menu__logo">DeltaFight</h1>
            <div className="title-menu__actions">
              <button className="title-menu__button" onClick={openModeMenu} type="button">
                Начать играть
              </button>
              <button
                className="title-menu__button title-menu__button--ghost"
                onClick={() => setShowTitleInfo((value) => !value)}
                type="button"
              >
                Что это за игра
              </button>
            </div>
            {showTitleInfo && (
              <p className="title-menu__info">
                DeltaFight - пиксельный файтинг с бойцами, спецприемами, раундами и тренировочным режимом.
              </p>
            )}
          </div>
        </section>
      </main>
    );
  }

  if (screen === 'campaign') {
    const campaignRoom = getCampaignRoomWithProgress(campaignRoomId, isCampaignBagDefeated);

    return (
      <main className="game-shell game-shell--campaign">
        <section className="campaign-screen" aria-label="Кампания">
          <div className={`campaign-room campaign-room--${campaignRoom.id}`}>
            {campaignRoom.allowed.map((rect, index) => (
              <span
                className="campaign-walk-area"
                aria-hidden="true"
                key={`${campaignRoom.id}-area-${index}`}
                style={{
                  left: `${rect.x}%`,
                  top: `${rect.y}%`,
                  width: `${rect.width}%`,
                  height: `${rect.height}%`,
                }}
              />
            ))}
            {campaignRoom.npcs?.map((npc) => {
              const npcSize = getCampaignNpcSize(npc);
              const isNpcTalking = npc.id === campaignActiveNpcId && Boolean(npc.talkSprite);

              return (
                <button
                  className={`campaign-npc${npc.id === campaignActiveNpcId ? ' campaign-npc--talking' : ''}`}
                  key={npc.id}
                  aria-label={npc.label}
                  style={{
                    left: `${npc.x}%`,
                    top: `${npc.y}%`,
                    width: `${npcSize.width}%`,
                    height: `${npcSize.height}%`,
                  }}
                  tabIndex={-1}
                  type="button"
                >
                  {npc.idleSprite ? (
                    <img
                      className="campaign-npc-sprite"
                      src={isNpcTalking && npc.talkSprite ? npc.talkSprite : npc.idleSprite}
                      style={
                        isNpcTalking && npc.talkOffsetY
                          ? { transform: `translateY(${npc.talkOffsetY}%)` }
                          : undefined
                      }
                      alt=""
                    />
                  ) : (
                    npc.label
                  )}
                </button>
              );
            })}
            {campaignRoom.signs?.map((sign) => (
              <button
                className="campaign-sign"
                key={sign.id}
                onClick={() => {
                  setCampaignDialogue(sign.text);
                  setCampaignActiveNpcId(null);
                }}
                style={{ left: `${sign.x}%`, top: `${sign.y}%` }}
                type="button"
              >
                {sign.label}
              </button>
            ))}
            {campaignRoomId === 'side-room' && isCampaignBagDefeated && !isCampaignBagCollected && (
              <img
                className={`campaign-defeated-bag${
                  campaignBossCutscenePhase === 'leaving' ? ' campaign-defeated-bag--collected' : ''
                }`}
                src={campaignNpcSideBagVictorySprite}
                alt=""
              />
            )}
            {campaignRoomId === 'side-room' && campaignBossCutsceneStep !== null && campaignBossCutsceneStep > 0 && (
              <img
                className={`campaign-room-boss-emerge${
                  campaignBossCutscenePhase === 'leaving' ? ' campaign-room-boss-emerge--leaving' : ''
                }`}
                src={campaignBossPlaceholderSprite}
                alt=""
              />
            )}
            <img
              className="campaign-player"
              src={campaignHeartPlayerSprite}
              alt=""
              style={{
                left: `${campaignPosition.x}%`,
                top: `${campaignPosition.y}%`,
              }}
            />
          </div>
          {campaignDialogue && (
            <button
              className="campaign-dialogue"
              onClick={() => {
                if (campaignDialogueVisibleChars < campaignDialogue.length) {
                  setCampaignDialogueVisibleChars(campaignDialogue.length);
                  return;
                }

                setCampaignDialogue(null);
                setCampaignActiveNpcId(null);
              }}
              type="button"
            >
              {campaignDialogue.slice(0, campaignDialogueVisibleChars)}
            </button>
          )}
          {campaignBossCutsceneStep !== null && (
            <button
              className={`campaign-boss-cutscene${
                campaignBossCutscenePhase === 'leaving' ? ' campaign-boss-cutscene--leaving' : ''
              }`}
              onClick={advanceCampaignBossCutscene}
              type="button"
            >
              <span className="campaign-boss-cutscene__dialogue">
                {CAMPAIGN_BOSS_CUTSCENE_LINES[campaignBossCutsceneStep]}
              </span>
            </button>
          )}
          {isCampaignMenuOpen && (
            <div className="campaign-pause-menu" role="dialog" aria-label="Меню кампании">
              <div className="settings-panel__title">ПАУЗА</div>
              <button
                className="confirm-button campaign-pause-menu__button"
                onClick={() => setIsCampaignMenuOpen(false)}
                type="button"
              >
                Продолжить
              </button>
              <button
                className="back-button campaign-pause-menu__button"
                onClick={() => {
                  campaignPressedKeys.current.clear();
                  setCampaignDialogue(null);
                  setCampaignActiveNpcId(null);
                  setIsCampaignMenuOpen(false);
                  setScreen('menu');
                }}
                type="button"
              >
                В меню
              </button>
            </div>
          )}
        </section>
      </main>
    );
  }

  if (screen === 'bag-battle') {
    const playerHealthPercent = Math.max(0, bagBattlePlayer.health);
    const bossHealthPercent = (Math.max(0, bagBattleBoss.health) / BAG_BATTLE_BOSS_START.health) * 100;
    const bagBattleBossSprite =
      bagBattleResult === 'won'
        ? campaignNpcSideBagVictorySprite
      : bagBattleResult !== 'playing'
        ? campaignNpcSideBagTalkSprite
        : bagBattleBossPattern === 'run-prep'
          ? campaignNpcSideBagRunPrepSprite
        : isBagBattleBossShooting
          ? campaignNpcSideBagShootSprite
          : campaignNpcSideBagTalkSprite;

    return (
      <main className="game-shell game-shell--bag-battle">
        <section
          className={`bag-battle-screen${isBagBattleIntro ? ' bag-battle-screen--intro' : ''}`}
          aria-label="Р‘РѕР№ СЃ РјРµС€РєРѕРј"
        >
          <div className="bag-battle-hud">
            <div className="bag-battle-health">
              <span>HEART SHADE</span>
              <strong>{Math.ceil(bagBattlePlayer.health)}</strong>
              <i style={{ width: `${playerHealthPercent}%` }} />
            </div>
            <div className="bag-battle-health bag-battle-health--boss">
              <span>BAG</span>
              <strong>{Math.ceil(bagBattleBoss.health)}</strong>
              <i style={{ width: `${bossHealthPercent}%` }} />
            </div>
          </div>
          <div className="bag-battle-arena">
            <div
              className={`bag-battle-player bag-battle-player--${bagBattleAttack}${
                isBagBattleCrouching ? ' bag-battle-player--crouch' : ''
              }${isBagBattleBlocking ? ' bag-battle-player--block' : ''}`}
              style={{
                left: `${bagBattlePlayer.x}%`,
                bottom: `${12 + bagBattlePlayer.y}%`,
              }}
            >
              <span className="bag-battle-player__body" aria-hidden="true">
                <span className="bag-battle-player__head">
                  <img src={campaignHeartPlayerSprite} alt="" />
                </span>
                <span className="stick-torso" />
                <span className="stick-arm stick-arm--front" />
                <span className="stick-arm stick-arm--back" />
                <span className="stick-leg stick-leg--front" />
                <span className="stick-leg stick-leg--back" />
              </span>
            </div>
            <img
              className={`bag-battle-boss${isBagBattleBossVulnerable ? ' bag-battle-boss--vulnerable' : ''}${
                isBagBattleBossShooting ? ' bag-battle-boss--shooting' : ''
              }${isBagBattleBossShooting && bagBattleBossShotLane === 'high' ? ' bag-battle-boss--shoot-high' : ''}${
                isBagBattleBossShooting && bagBattleBossShotLane === 'low' ? ' bag-battle-boss--shoot-low' : ''
              }${bagBattleResult === 'won' ? ' bag-battle-boss--victory' : ''}${
                bagBattleResult !== 'playing' ? ' bag-battle-boss--result' : ''
              }${bagBattleBossPattern === 'run-prep' ? ' bag-battle-boss--run-prep' : ''}${
                bagBattleBossPattern === 'running' || bagBattleBossPattern === 'returning'
                  ? ' bag-battle-boss--running'
                  : ''
              }`}
              src={bagBattleBossSprite}
              alt=""
              style={{ left: `${bagBattleBoss.x}%` }}
            />
            {bagBattleProjectiles.map((projectile) => (
              <span
                className={`bag-battle-projectile bag-battle-projectile--${projectile.owner}${
                  projectile.lane ? ` bag-battle-projectile--${projectile.lane}` : ''
                }`}
                key={projectile.id}
                style={{
                  left: `${projectile.x}%`,
                  bottom: `${14 + projectile.y}%`,
                }}
              />
            ))}
            {bagBattleResult === 'won' && (
              <div className="bag-battle-knockout" aria-hidden="true">
                KNOCKOUT!
              </div>
            )}
            {bagBattleResult !== 'playing' && (
              <button
                className="bag-battle-result"
                onClick={() => {
                  bagBattlePressedKeys.current.clear();
                  if (bagBattleResult === 'won') {
                    const returnPosition = { x: 68, y: 49 };
                    setIsCampaignBagDefeated(true);
                    setIsCampaignBagCollected(false);
                    setCampaignRoomId('side-room');
                    setCampaignPosition(returnPosition);
                    campaignPositionRef.current = returnPosition;
                    setCampaignDialogue(null);
                    setCampaignActiveNpcId(null);
                    setCampaignBossCutscenePhase('talking');
                    setCampaignBossCutsceneStep(0);
                  }
                  setScreen('campaign');
                }}
                type="button"
              >
                <span>{bagBattleResult === 'won' ? 'ПОБЕДА' : 'ПОРАЖЕНИЕ'}</span>
                <strong>Нажми Enter</strong>
              </button>
            )}
          </div>
        </section>
      </main>
    );
  }

  if (screen === 'rooms') {
    const canStartOnline = onlineRole === 'host' && onlinePeerReady && onlineRoomStatus !== 'connecting';

    return (
      <main className="game-shell game-shell--menu-bg">
        <section className="rooms-screen" aria-labelledby="rooms-title">
          <div className="select-header">
            <span className="header-rule" />
            <div>
              <p className="eyebrow">Online</p>
              <h1 id="rooms-title">Комнаты</h1>
            </div>
            <span className="header-rule" />
          </div>

          <div className="rooms-panel">
            <div className="room-card">
              <span className="room-card__label">Твоя комната</span>
              <strong className="room-code">{roomCode || '----'}</strong>
              <button className="confirm-button" onClick={createOnlineRoom} type="button">
                Создать
              </button>
            </div>

            <div className="room-card">
              <span className="room-card__label">Код друга</span>
              <input
                className="room-input"
                maxLength={8}
                onChange={(event) => setJoinRoomCode(event.currentTarget.value.toUpperCase())}
                placeholder="ABCD"
                value={joinRoomCode}
              />
              <button className="confirm-button" onClick={joinOnlineRoom} type="button">
                Подключиться
              </button>
            </div>
          </div>

          <p className={`room-status room-status--${onlineRoomStatus}`}>{onlineRoomMessage}</p>

          <div className="room-actions">
            <button className="confirm-button" disabled={!canStartOnline} onClick={startOnlineRoomMatch} type="button">
              Начать бой
            </button>
            <button
              className="back-button"
              onClick={() => {
                cleanupOnlineRoom();
                setScreen('menu');
              }}
              type="button"
            >
              Назад
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (screen === 'stage') {
    return (
      <main className="game-shell game-shell--menu-bg">
        <section className="stage-select-screen" aria-labelledby="stage-select-title">
          <div className="select-header">
            <span className="header-rule" />
            <div>
              <h1 id="stage-select-title">Выберите карту</h1>
            </div>
            <span className="header-rule" />
          </div>

          <div className="stage-grid" aria-label="Выбор карты">
            {stages.map((stage) => (
              <button
                className={`stage-card${stage.id === selectedStage.id ? ' stage-card--selected' : ''}`}
                key={stage.id}
                onClick={() => startFightOnStage(stage.id)}
                type="button"
              >
                <span
                  className="stage-card__preview"
                  style={{ backgroundImage: `url(${stage.image})` }}
                  aria-hidden="true"
                />
                <span className="stage-card__name">{stage.name}</span>
              </button>
            ))}
          </div>

          <div className="stage-select-actions">
            <button className="back-button" onClick={backToSelect} type="button">
              Назад к бойцам
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (screen === 'arena') {
    const arenaWinnerSide =
      opponentHealth <= 0
        ? 'left'
        : playerHealth <= 0
          ? 'right'
          : arenaMode !== 'sandbox' && roundTimeLeft <= 0 && roundResolvedRef.current
            ? winnerSide
            : null;
    const arenaWinner = arenaWinnerSide === 'left' ? player : opponent;
    const arenaWinnerLabel = arenaWinnerSide === 'left' ? 'Игрок 1' : 'Игрок 2';
    const playerIsRoundWinner = arenaWinnerSide === 'left';
    const opponentIsRoundWinner = arenaWinnerSide === 'right';
    const playerVictorySprite =
      playerIsRoundWinner && playerPosition.y === 0 ? roundWinnerPoseSprite : null;
    const opponentVictorySprite =
      opponentIsRoundWinner && opponentPosition.y === 0 ? roundWinnerPoseSprite : null;
    const queenStageVictorySprite =
      playerVictorySprite === queenVictoryBackdropSprite || opponentVictorySprite === queenVictoryBackdropSprite
        ? queenVictoryBackdropSprite
        : null;
    const playerBaseFacing: Facing =
      player.id === 'roaring-knight' &&
      playerKnightDarkWaveState === 'holding'
        ? playerKnightDarkWaveDirection === 1
          ? 'right'
          : 'left'
        : player.id === 'roaring-knight' &&
          (playerKnightSpherePhase === 'bird-transform' || playerKnightSpherePhase === 'bird')
          ? playerKnightBirdDashDirection.current === 1
            ? 'right'
            : 'left'
          : getFacingToward(playerPosition.x, opponentPosition.x);
    const opponentBaseFacing: Facing =
      opponent.id === 'roaring-knight' &&
      (opponentKnightSpherePhase === 'bird-transform' || opponentKnightSpherePhase === 'bird')
        ? opponentKnightBirdDashDirection.current === 1
          ? 'right'
          : 'left'
        : getFacingToward(opponentPosition.x, playerPosition.x);
    const playerRenderedFacing =
      attack !== 'idle' && playerAttackFacingRef.current
        ? playerAttackFacingRef.current
        : playerBaseFacing;
    const opponentRenderedFacing =
      opponentAttack !== 'idle' && opponentAttackFacingRef.current
        ? opponentAttackFacingRef.current
        : opponentBaseFacing;

    return (
      <main className="game-shell game-shell--menu-bg game-shell--arena">
        <section
          className={`arena-screen${isArenaPaused ? ' arena-screen--paused' : ''}`}
          aria-label="Игровое поле"
          style={
            {
              '--arena-stage-min-height': `${selectedStage.arenaHeight ?? 760}px`,
            } as CSSProperties
          }
        >
          <div
            className="arena-stage"
            style={{
              backgroundImage: `url(${selectedStage.image})`,
              backgroundPosition: selectedStage.position,
              backgroundSize: selectedStage.size,
              '--stage-floor-lift': `${selectedStage.fighterLift ?? 0}px`,
            } as CSSProperties}
          >
            <div className="moon" aria-hidden="true" />
            <div className="arena-hud">
              <FighterBadge
                fighter={player}
                label="P1"
                health={playerHealth}
                gersonAirHitCount={playerGersonAirLandingHits}
              />
              <span className="round-label">
                <span>Round {roundNumber}</span>
                <strong className="round-timer">{arenaMode === 'sandbox' ? '?' : roundTimeLeft}</strong>
                <span>{playerRoundWins}:{opponentRoundWins}</span>
              </span>
              <FighterBadge
                fighter={opponent}
                label={arenaMode === 'sandbox' ? 'DUMMY' : 'CPU'}
                health={opponentHealth}
                gersonAirHitCount={opponentGersonAirLandingHits}
                alignRight
              />
            </div>
            {queenStageVictorySprite && (
              <span
                className="arena-screen-victory arena-screen-victory--queen"
                style={{ backgroundImage: `url(${queenStageVictorySprite})` }}
                aria-hidden="true"
              />
            )}
            <div className="arena-floor" aria-hidden="true" />
            {!arenaWinnerSide && roundCurtainPhase === 'idle' && roundCountdown <= 0 && (
              <div className="round-announcement" key={roundNumber} aria-live="polite">
                <span>Round</span>
                <strong>{roundNumber}</strong>
              </div>
            )}
            {!arenaWinnerSide && roundCurtainPhase === 'idle' && roundCountdown > 0 && (
              <div className="round-countdown" key={`countdown-${roundNumber}-${roundCountdown}`} aria-live="polite">
                {roundCountdown}
              </div>
            )}
            {arenaWinnerSide && (
              <div className="fatality-window" role="status" aria-live="polite">
                <span className="fatality-window__eyebrow">Finish</span>
                <strong>{arenaWinnerLabel} победил</strong>
                <span>Round {roundNumber}: {arenaWinner.name}</span>
              </div>
            )}
            {roundCurtainPhase !== 'idle' && (
              <div
                className={`round-curtain round-curtain--${roundCurtainPhase}`}
                aria-hidden="true"
              />
            )}
            {isArenaPaused && <div className="arena-pause-scrim" aria-hidden="true" />}
            {arenaPauseMenu}
            {player.id === 'roaring-knight' && playerKnightDarkWaveState === 'holding' && (
              <div
                className="knight-channel-rings"
                aria-hidden="true"
                style={{
                  left: `${getArenaScreenX(playerPosition.x)}%`,
                  bottom: `${216 + (selectedStage.fighterLift ?? 0) + playerPosition.y}px`,
                }}
              >
                {Array.from({ length: 6 }, (_, index) => (
                  <span
                    className="knight-channel-ring"
                    key={`knight-channel-ring-${index}`}
                    style={{ animationDelay: `${index * 0.5}s` }}
                  />
                ))}
              </div>
            )}
            {opponent.id === 'roaring-knight' && opponentKnightDarkWaveState === 'holding' && (
              <div
                className="knight-channel-rings"
                aria-hidden="true"
                style={{
                  left: `${getArenaScreenX(opponentPosition.x)}%`,
                  bottom: `${216 + (selectedStage.fighterLift ?? 0) + opponentPosition.y}px`,
                }}
              >
                {Array.from({ length: 6 }, (_, index) => (
                  <span
                    className="knight-channel-ring"
                    key={`opponent-knight-channel-ring-${index}`}
                    style={{ animationDelay: `${index * 0.5}s` }}
                  />
                ))}
              </div>
            )}
            {projectiles.map((projectile) => (
              projectile.kind === 'queen-heal-wave' || projectile.kind === 'jevil-head' ? (
                <span
                  className={`special-projectile special-projectile--${projectile.kind} special-projectile--${projectile.lane} special-projectile--${projectile.owner} special-projectile--dir-${projectile.direction === 1 ? 'right' : 'left'}`}
                  aria-hidden="true"
                  key={projectile.id}
                  style={{
                    left: `${getArenaScreenX(projectile.x)}%`,
                    ...(projectile.kind === 'jevil-head'
                      ? { backgroundImage: `url(${getProjectileSprite(projectile)})` }
                      : {}),
                    ...(typeof projectile.bottomPx === 'number'
                      ? { bottom: `${projectile.bottomPx + (selectedStage.fighterLift ?? 0)}px` }
                      : {}),
                  }}
                />
              ) : (
                <img
                  className={`special-projectile special-projectile--${projectile.kind} special-projectile--${projectile.lane} special-projectile--${projectile.owner} special-projectile--dir-${projectile.direction === 1 ? 'right' : 'left'}`}
                  src={getProjectileSprite(projectile)}
                  alt=""
                  aria-hidden="true"
                  key={projectile.id}
                  style={{
                    left: `${getArenaScreenX(projectile.x)}%`,
                    ...(typeof projectile.bottomPx === 'number'
                      ? { bottom: `${projectile.bottomPx + (selectedStage.fighterLift ?? 0)}px` }
                      : {}),
                  }}
                />
              )
            ))}
            {playerAirSpecialWave && (
              <div
                className="tenna-air-wave"
                aria-hidden="true"
                style={{
                  left: `${getArenaScreenX(
                    playerPosition.x + (playerPosition.x <= opponentPosition.x ? 8 : -8),
                  )}%`,
                  bottom: `${128 + (selectedStage.fighterLift ?? 0) + playerPosition.y}px`,
                }}
              />
            )}
            {opponentAirSpecialWave && (
              <div
                className="tenna-air-wave"
                aria-hidden="true"
                style={{
                  left: `${getArenaScreenX(
                    opponentPosition.x + (opponentPosition.x <= playerPosition.x ? 8 : -8),
                  )}%`,
                  bottom: `${128 + (selectedStage.fighterLift ?? 0) + opponentPosition.y}px`,
                }}
              />
            )}
            {healPopups.map((popup) => (
              <img
                className={`heal-popup heal-popup--${popup.side}`}
                src={healPlusFiveSprite}
                alt=""
                aria-hidden="true"
                key={popup.id}
                style={{
                  left: `${getArenaScreenX(popup.x + (popup.side === 'left' ? -4 : 4))}%`,
                  bottom: `${168 + (selectedStage.fighterLift ?? 0) + popup.y}px`,
                }}
              />
            ))}
            {knightExplosions.map((explosion) => (
              <img
                className={`knight-dark-wave-explosion knight-dark-wave-explosion--${explosion.side}`}
                src={knightDarkWaveExplosionSprite}
                alt=""
                aria-hidden="true"
                key={explosion.id}
                style={{
                  left: `${getArenaScreenX(explosion.position.x)}%`,
                  bottom: `${28 + (selectedStage.fighterLift ?? 0) + explosion.position.y}px`,
                }}
              />
            ))}
            {gersonLeapEffects.map((effect) => (
              <span
                className={`gerson-leap-boost-effect gerson-leap-boost-effect--${effect.side} gerson-leap-boost-effect--${effect.direction === 1 ? 'right' : 'left'}`}
                aria-hidden="true"
                key={effect.id}
                style={{
                  left: `${getArenaScreenX(effect.x)}%`,
                  bottom: `${-32 + (selectedStage.fighterLift ?? 0)}px`,
                  backgroundImage: `url(${gersonBoomLeapBoostSprite})`,
                }}
              />
            ))}
            {jevilPlatforms.map((platform, index) => (
              <span
                className={`jevil-platform jevil-platform--${index % 2 === 0 ? 'low' : 'high'}`}
                aria-hidden="true"
                key={platform.id}
                style={{
                  left: `${getArenaScreenX(platform.x)}%`,
                  bottom: `${94 + (selectedStage.fighterLift ?? 0) + platform.y}px`,
                  backgroundImage: `url(${jevilPlatformSprite})`,
                }}
              />
            ))}
            {knightAfterimages.map((afterimage) => {
              const afterimageStyle = {
                left: `${getArenaScreenX(afterimage.x)}%`,
                bottom: `${
                  (afterimage.variant === 'sphere' ? 156 : 86) +
                  (selectedStage.fighterLift ?? 0) +
                  afterimage.y +
                  afterimage.visualLift
                }px`,
                ...(afterimage.renderMode === 'image' && afterimage.heightPx
                  ? { height: `${afterimage.heightPx}px` }
                  : {}),
              };
              const afterimageClassName = `knight-afterimage knight-afterimage--${afterimage.side} knight-afterimage--${afterimage.variant} knight-afterimage--face-${afterimage.facing}${
                afterimage.mirrorsBaseSprite ? ' knight-afterimage--mirrored-base' : ''
              }${
                afterimage.chargeAttackState !== 'idle'
                  ? ` knight-afterimage--charge-${afterimage.chargeAttackState}`
                  : ''
              }`;

              if (afterimage.renderMode === 'strip') {
                return (
                  <span
                    className={afterimageClassName}
                    aria-hidden="true"
                    key={afterimage.id}
                    style={{
                      ...afterimageStyle,
                      width: `${afterimage.width}px`,
                      height: `${afterimage.height}px`,
                      backgroundImage: `url(${afterimage.sprite})`,
                      backgroundSize: afterimage.backgroundSize,
                      backgroundPosition: afterimage.backgroundPosition,
                    }}
                  />
                );
              }

              return (
                <img
                  className={afterimageClassName}
                  src={afterimage.sprite}
                  alt=""
                  aria-hidden="true"
                  key={afterimage.id}
                  style={afterimageStyle}
                />
              );
            })}
            <StickFighter
              fighter={player}
              side="left"
              facing={playerRenderedFacing}
              attack={attack}
              isCrouching={
                playerStatus === 'idle' &&
                (isCrouching || isCrouchAttackLocked || isAlwaysCrouchingFighter(player))
              }
              isBlocking={isBlocking}
              position={playerPosition}
              status={playerStatus}
              isShootingSpecial={playerSpecialShooting}
              isDefeated={playerHealth <= 0}
              isDamageFlashing={playerDamageFlash}
              isRecovering={playerRecovering}
              victorySprite={playerVictorySprite}
              floorLift={selectedStage.fighterLift ?? 0}
              visualLift={player.id === 'roaring-knight' ? knightVisualLift : 0}
              chargeAttackState={playerChargeAttackState}
              chargeReleaseStartedAt={playerChargeReleaseStartedAt.current}
              knightDarkWaveState={player.id === 'roaring-knight' ? playerKnightDarkWaveState : 'idle'}
              isKnightDarkWaveOverheated={player.id === 'roaring-knight' && playerKnightDarkWaveOverheated}
              hasDarkAura={playerChargeAuraActive}
              knightSpherePhase={player.id === 'roaring-knight' ? playerKnightSpherePhase : 'idle'}
              isGersonLeapPreparing={player.id === 'gerson-boom' && playerGersonLeapPreparing}
              isGersonSpecialLeap={player.id === 'gerson-boom' && playerGersonLeapActive}
              isJevilAbsorbing={player.id === 'jevil' && playerJevilAbsorbing}
              isJevilHeadlessPose={player.id === 'jevil' && playerJevilHeadlessPose}
              specialSpriteOverride={playerSpecialSpriteOverride}
              onTennaAirSpecialSpriteStart={playTennaAirWaveSound}
              onTennaStarSpecialSpriteStart={playTennaStarSpecialSound}
              onQueenSpecialSpriteStart={playQueenCupThrowSound}
            />
            <StickFighter
              fighter={opponent}
              side="right"
              facing={opponentRenderedFacing}
              attack={opponentAttack}
              isCrouching={opponentStatus === 'idle' && (opponentCrouching || isAlwaysCrouchingFighter(opponent))}
              isBlocking={opponentBlocking}
              position={opponentPosition}
              status={opponentStatus}
              isShootingSpecial={opponentSpecialShooting}
              isDefeated={opponentHealth <= 0}
              isDamageFlashing={opponentDamageFlash}
              isRecovering={opponentRecovering}
              victorySprite={opponentVictorySprite}
              floorLift={selectedStage.fighterLift ?? 0}
              visualLift={opponent.id === 'roaring-knight' ? knightVisualLift : 0}
              chargeAttackState={opponent.id === 'roaring-knight' ? opponentChargeAttackState : 'idle'}
              chargeReleaseStartedAt={opponent.id === 'roaring-knight' ? opponentChargeReleaseStartedAt.current : 0}
              knightDarkWaveState={opponent.id === 'roaring-knight' ? opponentKnightDarkWaveState : 'idle'}
              isKnightDarkWaveOverheated={opponent.id === 'roaring-knight' && opponentKnightDarkWaveOverheated}
              hasDarkAura={opponentChargeAuraActive}
              knightSpherePhase={opponent.id === 'roaring-knight' ? opponentKnightSpherePhase : 'idle'}
              isGersonLeapPreparing={false}
              isGersonSpecialLeap={false}
              isJevilAbsorbing={opponent.id === 'jevil' && opponentJevilAbsorbing}
              isJevilHeadlessPose={opponent.id === 'jevil' && opponentJevilHeadlessPose}
              specialSpriteOverride={opponentSpecialSpriteOverride}
              onTennaAirSpecialSpriteStart={playTennaAirWaveSound}
              onTennaStarSpecialSpriteStart={playTennaStarSpecialSound}
              onQueenSpecialSpriteStart={playQueenCupThrowSound}
            />
          </div>

          <div className="arena-controls">
            {settingsOverlay}
            <span>Right Shift - блок</span>
            <span>A/D - ходьба</span>
            <span>W - прыжок</span>
            <span>S - присед</span>
            <span>← - удар рукой</span>
            <span>→ - удар ногой</span>
            <button className="back-button" onClick={backToSelect} type="button">
              Назад к выбору
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (screen === 'menu') {
    return (
      <main className={`game-shell game-shell--door-menu${doorTransitionMode ? ' game-shell--door-menu-fading' : ''}`}>
        <section className="main-menu" aria-labelledby="main-menu-title">
          <div className="select-header">
            <span className="header-rule" />
            <div>
              <h1 id="main-menu-title">Выберите режим</h1>
            </div>
            <span className="header-rule" />
          </div>

          <div className="mode-menu mode-menu--doors">
            <button
              className="mode-door mode-door--campaign"
              disabled={Boolean(doorTransitionMode)}
              onClick={openCampaignSaveSelect}
              onMouseEnter={playDoorHoverSound}
              type="button"
            >
              <span className="mode-door__panel" aria-hidden="true" />
              <span className="mode-door__label">Кампания</span>
            </button>
            <button
              className="mode-door mode-door--local"
              disabled={Boolean(doorTransitionMode)}
              onClick={() => openModeDoor('fight')}
              onMouseEnter={playDoorHoverSound}
              type="button"
            >
              <span className="mode-door__panel" aria-hidden="true" />
              <span className="mode-door__label">Локальные бои</span>
            </button>
            <button
              className="mode-door mode-door--training"
              disabled={Boolean(doorTransitionMode)}
              onClick={() => openModeDoor('sandbox')}
              onMouseEnter={playDoorHoverSound}
              type="button"
            >
              <span className="mode-door__panel" aria-hidden="true" />
              <span className="mode-door__label">Тренировка</span>
            </button>
            <button
              className="mode-door mode-door--online"
              disabled={Boolean(doorTransitionMode)}
              onClick={openRoomsScreen}
              onMouseEnter={playDoorHoverSound}
              type="button"
            >
              <span className="mode-door__panel" aria-hidden="true" />
              <span className="mode-door__label">Комнаты</span>
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (screen === 'campaign-saves') {
    return (
      <main className="game-shell game-shell--menu-bg">
        <section className="campaign-save-screen" aria-labelledby="campaign-save-title">
          <div className="select-header">
            <span className="header-rule" />
            <div>
              <p className="eyebrow">Кампания</p>
              <h1 id="campaign-save-title">Выберите сохранение</h1>
            </div>
            <span className="header-rule" />
          </div>

          <div className="campaign-save-list">
            {campaignSaves.map((save) => (
              <div className="campaign-save-slot" key={save.slot}>
                <button
                  className="campaign-save-slot__load"
                  onClick={() => openCampaignMap(save.slot)}
                  type="button"
                >
                  <span className="campaign-save-slot__number">СЛОТ {save.slot}</span>
                  <strong>{getCampaignSaveLabel(save)}</strong>
                  <span>
                    {save.updatedAt
                      ? new Date(save.updatedAt).toLocaleString('ru-RU', {
                          day: '2-digit',
                          month: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : 'Новая игра'}
                  </span>
                </button>
                <button
                  className="campaign-save-slot__reset"
                  disabled={!save.updatedAt}
                  onClick={() => resetCampaignSave(save.slot)}
                  type="button"
                >
                  Сброс
                </button>
              </div>
            ))}
          </div>

          <div className="menu-actions">
            <button className="back-button" onClick={() => setScreen('menu')} type="button">
              Назад
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className={`game-shell game-shell--menu-bg${isScreenRevealing ? ' game-shell--screen-reveal' : ''}`}>
      <section className="select-screen" aria-labelledby="screen-title">
        <div className="select-header">
          <span className="header-rule" />
          <div>
            <p className="eyebrow">Mr. Ant Tennas</p>
            <h1 id="screen-title">Выберите бойца</h1>
          </div>
          <span className="header-rule" />
        </div>

        <div className="combatants">
          <FighterPanel fighter={selectedFighter} label="Игрок 1" side="left" />

          <div className="versus">
            <span aria-hidden="true">VS</span>
            <div className="select-actions">
              <div className="select-targets" aria-label="Select side">
                <button
                  className={`target-button${selectTarget === 'player' ? ' target-button--active' : ''}`}
                  onClick={() => setSelectTarget('player')}
                  type="button"
                >
                  P1
                </button>
                <button
                  className={`target-button${selectTarget === 'opponent' ? ' target-button--active' : ''}`}
                  onClick={() => setSelectTarget('opponent')}
                  type="button"
                >
                  CPU
                </button>
              </div>
              <div className="difficulty-select" aria-label="Difficulty">
                {(['easy', 'normal', 'hard'] as Difficulty[]).map((difficulty) => (
                  <button
                    className={`difficulty-button${
                      selectedDifficulty === difficulty ? ' difficulty-button--active' : ''
                    }`}
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    type="button"
                  >
                    {AI_CONFIG[difficulty].label}
                  </button>
                ))}
              </div>
              <button className="confirm-button" onClick={startFight} type="button">
                В бой
              </button>
              <button className="sandbox-button" onClick={backToMainMenu} type="button">
                Main Menu
              </button>
            </div>
          </div>

          <FighterPanel fighter={opponent} label="CPU" side="right" muted />
        </div>

        <div className="selection-deck">
          <div className="roster" aria-label="Ростер персонажей">
            {fighters.map((fighter) => {
              const isSelected =
                selectTarget === 'player'
                  ? fighter.id === selectedFighter.id
                  : fighter.id === selectedOpponent.id;

              return (
                <button
                  className={`fighter-tile${isSelected ? ' fighter-tile--selected' : ''}`}
                  key={fighter.id}
                  onClick={() => {
                    if (selectTarget === 'player') {
                      setSelectedFighterId(fighter.id);
                    } else {
                      setSelectedOpponentId(fighter.id);
                    }
                    setLockedFighter(null);
                    setLockedOpponent(null);
                  }}
                  type="button"
                  aria-pressed={isSelected}
                >
                  <FighterPortrait fighter={fighter} size="tile" />
                  <span className="fighter-tile__name">{fighter.name}</span>
                </button>
              );
            })}
          </div>

          <div className="select-actions">
            <div className="select-targets" aria-label="Select side">
              <button
                className={`target-button${selectTarget === 'player' ? ' target-button--active' : ''}`}
                onClick={() => setSelectTarget('player')}
                type="button"
              >
                P1
              </button>
              <button
                className={`target-button${selectTarget === 'opponent' ? ' target-button--active' : ''}`}
                onClick={() => setSelectTarget('opponent')}
                type="button"
              >
                CPU
              </button>
            </div>
            <div className="difficulty-select" aria-label="Difficulty">
              {(['easy', 'normal', 'hard'] as Difficulty[]).map((difficulty) => (
                <button
                  className={`difficulty-button${
                    selectedDifficulty === difficulty ? ' difficulty-button--active' : ''
                  }`}
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  type="button"
                >
                  {AI_CONFIG[difficulty].label}
                </button>
              ))}
            </div>
            <button className="confirm-button" onClick={startFight} type="button">
              В бой
            </button>
            <button className="sandbox-button" onClick={backToMainMenu} type="button">
              Main Menu
            </button>
            <p className="selection-status">
              P1: {selectedFighter.name} / CPU: {selectedOpponent.name} /{' '}
              {arenaMode === 'sandbox' ? 'Sandbox' : AI_CONFIG[selectedDifficulty].label}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function FighterPanel({
  fighter,
  label,
  side,
  muted = false,
}: {
  fighter: Fighter;
  label: string;
  side: FighterSide;
  muted?: boolean;
}) {
  return (
    <article className={`fighter-panel fighter-panel--${side}${muted ? ' fighter-panel--muted' : ''}`}>
      <p className="player-label">{label}</p>
      <div className="portrait-stage">
        <FighterPortrait fighter={fighter} size="portrait" />
      </div>
      <div className="fighter-copy">
      </div>
    </article>
  );
}

function FighterPortrait({
  fighter,
  size,
}: {
  fighter: Fighter;
  size: 'portrait' | 'tile' | 'victory';
}) {
  if (fighter.sprite) {
    return (
      <img
        className={`fighter-sprite fighter-sprite--${size}`}
        src={fighter.sprite}
        alt=""
        aria-hidden="true"
      />
    );
  }

  return (
    <span
      className={`fighter-orb fighter-orb--${size}`}
      style={getOrbStyle(fighter)}
      aria-hidden="true"
    />
  );
}

function FighterBadge({
  fighter,
  label,
  health,
  infiniteHealth = false,
  gersonAirHitCount = 0,
  alignRight = false,
}: {
  fighter: Fighter;
  label: string;
  health: number;
  infiniteHealth?: boolean;
  gersonAirHitCount?: number;
  alignRight?: boolean;
}) {
  const visibleHealth = infiniteHealth ? MAX_HEALTH : health;
  const gersonAirCounterValue =
    fighter.id === 'gerson-boom' && gersonAirHitCount >= 5
      ? gersonAirHitCount - 4
      : 0;

  return (
    <div className={`fighter-badge${alignRight ? ' fighter-badge--right' : ''}`}>
      <div className="badge-topline">
        <span className="badge-label">{label}</span>
        <span className="badge-name">{fighter.name}</span>
      </div>
      <div className="health-track" aria-label={`Здоровье ${fighter.name}: ${health}`}>
        <span className="health-fill" style={{ width: `${visibleHealth}%` }} />
        {infiniteHealth && <span className="health-infinity">?</span>}
      </div>
      {gersonAirCounterValue > 0 && (
        <div className="gerson-air-counter" aria-label={`Gerson air counter x${gersonAirCounterValue}`}>
          <img src={gersonAirCounterIcon} alt="" aria-hidden="true" />
          <span>x{gersonAirCounterValue}</span>
        </div>
      )}
    </div>
  );
}

function StickFighter({
  fighter,
  side,
  facing,
  attack,
  isCrouching,
  isBlocking,
  position,
  status = 'idle',
  isShootingSpecial = false,
  isDefeated = false,
  isDamageFlashing = false,
  isRecovering = false,
  victorySprite = null,
  floorLift = 0,
  visualLift = 0,
  chargeAttackState = 'idle',
  chargeReleaseStartedAt = 0,
  knightDarkWaveState = 'idle',
  isKnightDarkWaveOverheated = false,
  hasDarkAura = false,
  knightSpherePhase = 'idle',
  isGersonLeapPreparing = false,
  isGersonSpecialLeap = false,
  isJevilAbsorbing = false,
  isJevilHeadlessPose = false,
  specialSpriteOverride = null,
  onTennaAirSpecialSpriteStart,
  onTennaStarSpecialSpriteStart,
  onQueenSpecialSpriteStart,
}: {
  fighter: Fighter;
  side: FighterSide;
  facing: Facing;
  attack: Attack;
  isCrouching: boolean;
  isBlocking: boolean;
  position: Position;
  status?: OpponentStatus;
  isShootingSpecial?: boolean;
  isDefeated?: boolean;
  isDamageFlashing?: boolean;
  isRecovering?: boolean;
  victorySprite?: string | null;
  floorLift?: number;
  visualLift?: number;
  chargeAttackState?: ChargeAttackState;
  chargeReleaseStartedAt?: number;
  knightDarkWaveState?: KnightDarkWaveState;
  isKnightDarkWaveOverheated?: boolean;
  hasDarkAura?: boolean;
  knightSpherePhase?: KnightSpherePhase;
  isGersonLeapPreparing?: boolean;
  isGersonSpecialLeap?: boolean;
  isJevilAbsorbing?: boolean;
  isJevilHeadlessPose?: boolean;
  specialSpriteOverride?: string | null;
  onTennaAirSpecialSpriteStart?: () => void;
  onTennaStarSpecialSpriteStart?: () => void;
  onQueenSpecialSpriteStart?: () => void;
}) {
  const previousXRef = useRef(position.x);
  const previousYRef = useRef(position.y);
  const walkTimer = useRef<number | null>(null);
  const victoryPoseTimer = useRef<number | null>(null);
  const victoryPoseWasDelayed = useRef(false);
  const queenVictorySoundRef = useRef<HTMLAudioElement | null>(null);
  const tennaVictoryThreeSoundRef = useRef<HTMLAudioElement | null>(null);
  const knightVictorySoundRef = useRef<HTMLAudioElement | null>(null);
  const gersonVictorySoundRef = useRef<HTMLAudioElement | null>(null);
  const playedQueenVictorySound = useRef(false);
  const playedTennaVictoryThreeSound = useRef(false);
  const playedKnightVictorySound = useRef(false);
  const playedGersonVictorySound = useRef(false);
  const playedAirSpecialSound = useRef(false);
  const playedTennaStarSpecialSound = useRef(false);
  const playedQueenSpecialSound = useRef(false);
  const wasGersonJumpSpriteActive = useRef(false);
  const [walkDirection, setWalkDirection] = useState<'idle' | 'forward' | 'backward'>('idle');
  const [jumpPhase, setJumpPhase] = useState<'rising' | 'falling'>('rising');
  const [gersonJumpRun, setGersonJumpRun] = useState(0);
  const [isGersonBounceJump, setIsGersonBounceJump] = useState(false);
  const [canShowVictoryPose, setCanShowVictoryPose] = useState(false);

  useEffect(() => {
    queenVictorySoundRef.current = new Audio(queenVictorySound);
    queenVictorySoundRef.current.volume = 0.9;
    queenVictorySoundRef.current.playbackRate = 3;
    queenVictorySoundRef.current.preload = 'auto';
    queenVictorySoundRef.current.load();
    tennaVictoryThreeSoundRef.current = new Audio(tennaVictoryThreeSound);
    tennaVictoryThreeSoundRef.current.volume = 0.9;
    tennaVictoryThreeSoundRef.current.preload = 'auto';
    tennaVictoryThreeSoundRef.current.load();
    knightVictorySoundRef.current = new Audio(roaringKnightRoarSound);
    knightVictorySoundRef.current.volume = 0.85;
    knightVictorySoundRef.current.preload = 'auto';
    knightVictorySoundRef.current.load();
    gersonVictorySoundRef.current = new Audio(gersonLaughSound);
    gersonVictorySoundRef.current.volume = 0.9;
    gersonVictorySoundRef.current.preload = 'auto';
    gersonVictorySoundRef.current.load();

    return () => {
      queenVictorySoundRef.current = null;
      tennaVictoryThreeSoundRef.current = null;
      knightVictorySoundRef.current = null;
      gersonVictorySoundRef.current = null;
    };
  }, []);

  useEffect(() => {
    const deltaX = position.x - previousXRef.current;
    previousXRef.current = position.x;

    if (Math.abs(deltaX) < 0.015 || position.y > 0) {
      return;
    }

    const nextWalkDirection =
      facing === 'right'
        ? deltaX > 0
          ? 'forward'
          : 'backward'
        : deltaX < 0
          ? 'forward'
          : 'backward';

    setWalkDirection(nextWalkDirection);

    if (walkTimer.current) window.clearTimeout(walkTimer.current);
    walkTimer.current = window.setTimeout(() => {
      setWalkDirection('idle');
    }, 120);
  }, [facing, position.x, position.y]);

  useEffect(() => {
    return () => {
      if (walkTimer.current) window.clearTimeout(walkTimer.current);
      if (victoryPoseTimer.current) window.clearTimeout(victoryPoseTimer.current);
    };
  }, []);

  useEffect(() => {
    if (victoryPoseTimer.current) {
      window.clearTimeout(victoryPoseTimer.current);
      victoryPoseTimer.current = null;
    }

    if (!victorySprite || isDefeated) {
      victoryPoseWasDelayed.current = false;
      playedQueenVictorySound.current = false;
      playedTennaVictoryThreeSound.current = false;
      playedKnightVictorySound.current = false;
      playedGersonVictorySound.current = false;
      setCanShowVictoryPose(false);
      return;
    }

    const shouldDelayVictoryPose =
      fighter.id === 'mister-ant-tenna' && (attack !== 'idle' || isShootingSpecial);

    if (shouldDelayVictoryPose) {
      victoryPoseWasDelayed.current = true;
      setCanShowVictoryPose(false);
      return;
    }

    if (victoryPoseWasDelayed.current) {
      victoryPoseTimer.current = window.setTimeout(() => {
        victoryPoseWasDelayed.current = false;
        setCanShowVictoryPose(true);
        victoryPoseTimer.current = null;
      }, 500);
      return;
    }

    setCanShowVictoryPose(true);
  }, [attack, fighter.id, isDefeated, isShootingSpecial, victorySprite]);

  useEffect(() => {
    const deltaY = position.y - previousYRef.current;
    previousYRef.current = position.y;

    if (position.y === 0) {
      setJumpPhase('rising');
      setIsGersonBounceJump(false);
      return;
    }

    if (deltaY < -0.01) {
      setJumpPhase('falling');
    } else if (deltaY > 0.01) {
      if (fighter.id === 'gerson-boom' && jumpPhase === 'falling') {
        setIsGersonBounceJump(true);
        setGersonJumpRun((run) => run + 1);
      }

      setJumpPhase('rising');
    }
  }, [fighter.id, jumpPhase, position.y]);

  const isCrouchPunchSprite =
    isCrouching && attack === 'punch' && Boolean(fighter.crouchPunchSprite);
  const isCrouchKickSprite =
    isCrouching && attack === 'kick' && Boolean(fighter.crouchKickSprite);
  const isStandingPunchStrip =
    attack === 'punch' && !isCrouching && fighter.id === 'queen' && Boolean(fighter.punchSprite);
  const isGersonSpinStrip =
    attack === 'punch' && fighter.id === 'gerson-boom' && Boolean(fighter.punchSprite);
  const isKickSprite = attack === 'kick' && !isCrouchKickSprite && Boolean(fighter.kickSprite);
  const isJumpSprite =
    position.y > 0 &&
    attack === 'idle' &&
    (!isCrouching || isAlwaysCrouchingFighter(fighter)) &&
    !isShootingSpecial &&
    Boolean(fighter.jumpSprite);
  const isGersonJumpSprite = isJumpSprite && fighter.id === 'gerson-boom';
  const isGersonLeapBoostSprite = isGersonJumpSprite && isGersonSpecialLeap;
  const isGersonLeapPrepSprite =
    fighter.id === 'gerson-boom' && isGersonLeapPreparing && status === 'idle';
  const isLaunchedSprite = status === 'launched' && Boolean(fighter.launchedSprite);
  const isKnockdownSprite = status === 'knockdown' && Boolean(fighter.knockdownSprite);
  const isAirSpecialSprite =
    isShootingSpecial && position.y > 0 && Boolean(fighter.airSpecialSprite);
  const isSpecialSprite = isShootingSpecial && Boolean(specialSpriteOverride ?? fighter.specialSprite);
  const isQueenSpecialSprite = isSpecialSprite && !isAirSpecialSprite && fighter.id === 'queen';
  const isJevilPlatformSpecialStrip = isSpecialSprite && fighter.id === 'jevil';
  const isJevilChaosSpecialStrip = isJevilPlatformSpecialStrip && specialSpriteOverride === jevilChaosSpecialSprite;
  const isJevilTeleportSpecialStrip =
    isJevilPlatformSpecialStrip && specialSpriteOverride === jevilTeleportSpecialSprite;
  const isJevilTeleportFreezePose =
    isJevilPlatformSpecialStrip && specialSpriteOverride === jevilTeleportFreezeSprite;
  const isJevilTeleportShootPose =
    isJevilPlatformSpecialStrip && specialSpriteOverride === jevilTeleportShootSprite;
  const isJevilHeadlessAbsorbPose = fighter.id === 'jevil' && isJevilHeadlessPose;
  const isDefeatSprite = isDefeated && Boolean(fighter.defeatSprite);
  const isVictorySprite = !isDefeated && Boolean(victorySprite) && canShowVictoryPose;
  const isQueenVictoryBackdrop =
    isVictorySprite && fighter.id === 'queen' && victorySprite === queenVictoryBackdropSprite;
  const isQueenVictoryStrip =
    isVictorySprite && fighter.id === 'queen' && victorySprite === queenVictorySprite;
  const isKnightVictoryStrip =
    isVictorySprite && fighter.id === 'roaring-knight' && victorySprite === roaringKnightVictorySprite;
  const isGersonVictorySprite =
    isVictorySprite && fighter.id === 'gerson-boom' && victorySprite === gersonBoomVictorySprite;
  const isChargeHoldSprite =
    chargeAttackState === 'charging' && Boolean(fighter.chargeHoldSprite);
  const isChargeReleaseSprite =
    chargeAttackState === 'releasing' && Boolean(fighter.chargeReleaseSprite);
  const chargeReleaseFrameSprite =
    isChargeReleaseSprite && fighter.id === 'roaring-knight'
      ? knightChargeReleaseFrameSprites[
          getKnightChargeReleaseFrameIndex(
            Math.max(0, window.performance.now() - chargeReleaseStartedAt),
          )
        ]
      : null;
  const isKnightDarkWaveSprite = fighter.id === 'roaring-knight' && knightDarkWaveState !== 'idle';
  const isBlockSprite = isBlocking && Boolean(fighter.blockSprite);
  const isKnightImpactStrip = fighter.id === 'roaring-knight' && (isLaunchedSprite || isKnockdownSprite);
  const isKnightSphereTransformSprite =
    fighter.id === 'roaring-knight' && (knightSpherePhase === 'entering' || knightSpherePhase === 'exiting');
  const isKnightSphereSprite = fighter.id === 'roaring-knight' && knightSpherePhase === 'active';
  const isKnightBirdTransformSprite = fighter.id === 'roaring-knight' && knightSpherePhase === 'bird-transform';
  const isKnightBirdSprite = fighter.id === 'roaring-knight' && knightSpherePhase === 'bird';

  useEffect(() => {
    if (isGersonJumpSprite && !wasGersonJumpSpriteActive.current) {
      setGersonJumpRun((run) => run + 1);
    }

    wasGersonJumpSpriteActive.current = isGersonJumpSprite;
  }, [isGersonJumpSprite]);

  useEffect(() => {
    if (!isQueenVictoryStrip) {
      playedQueenVictorySound.current = false;
      return;
    }

    if (playedQueenVictorySound.current) return;

    const sound = queenVictorySoundRef.current;
    playedQueenVictorySound.current = true;

    if (!sound) return;

    sound.currentTime = 0;
    sound.playbackRate = 3;
    void sound.play().catch(() => {
      // Victory audio is best-effort if the browser blocks playback.
    });
  }, [isQueenVictoryStrip]);

  useEffect(() => {
    const isTennaVictoryThree =
      isVictorySprite &&
      fighter.id === 'mister-ant-tenna' &&
      victorySprite === misterAntTennaVictoryThreeSprite;

    if (!isTennaVictoryThree) {
      playedTennaVictoryThreeSound.current = false;
      return;
    }

    if (playedTennaVictoryThreeSound.current) return;

    const sound = tennaVictoryThreeSoundRef.current;
    playedTennaVictoryThreeSound.current = true;

    if (!sound) return;

    sound.currentTime = 0;
    void sound.play().catch(() => {
      // Victory audio is best-effort if the browser blocks playback.
    });
  }, [fighter.id, isVictorySprite, victorySprite]);

  useEffect(() => {
    if (!isKnightVictoryStrip) {
      const sound = knightVictorySoundRef.current;
      playedKnightVictorySound.current = false;
      if (sound) {
        sound.pause();
        sound.currentTime = 0;
      }
      return undefined;
    }

    if (playedKnightVictorySound.current) return undefined;

    const sound = knightVictorySoundRef.current;
    playedKnightVictorySound.current = true;

    if (!sound) return undefined;

    const stopAtFourSeconds = () => {
      if (sound.currentTime >= 4) {
        sound.pause();
        sound.currentTime = 0;
        sound.removeEventListener('timeupdate', stopAtFourSeconds);
      }
    };

    sound.currentTime = 0;
    sound.addEventListener('timeupdate', stopAtFourSeconds);
    void sound.play().catch(() => {
      // Victory audio is best-effort if the browser blocks playback.
    });

    return () => {
      sound.removeEventListener('timeupdate', stopAtFourSeconds);
    };
  }, [isKnightVictoryStrip]);

  useEffect(() => {
    if (!isGersonVictorySprite) {
      const sound = gersonVictorySoundRef.current;
      playedGersonVictorySound.current = false;
      if (sound) {
        sound.pause();
        sound.currentTime = 0;
      }
      return;
    }

    if (playedGersonVictorySound.current) return;

    const sound = gersonVictorySoundRef.current;
    playedGersonVictorySound.current = true;

    if (!sound) return;

    sound.currentTime = 0;
    void sound.play().catch(() => {
      // Victory audio is best-effort if the browser blocks playback.
    });
  }, [isGersonVictorySprite]);

  const isDefeatStrip =
    isDefeatSprite &&
    (fighter.id === 'mister-ant-tenna' || fighter.id === 'roaring-knight' || fighter.id === 'gerson-boom');
  const isHealingSprite = status === 'healing' && Boolean(fighter.healSprite);
  const isWalkSprite =
    walkDirection !== 'idle' &&
    attack === 'idle' &&
    !isCrouching &&
    !isBlocking &&
    !isShootingSpecial &&
    status === 'idle' &&
    position.y === 0 &&
    !isDefeated &&
    Boolean(fighter.walkSprite);

  useLayoutEffect(() => {
    if (isAirSpecialSprite && fighter.id === 'mister-ant-tenna') {
      if (!playedAirSpecialSound.current) {
        playedAirSpecialSound.current = true;
        onTennaAirSpecialSpriteStart?.();
      }
      return;
    }

    playedAirSpecialSound.current = false;
  }, [fighter.id, isAirSpecialSprite, onTennaAirSpecialSpriteStart]);

  useLayoutEffect(() => {
    const isTennaStarSpecialSprite =
      isSpecialSprite && !isAirSpecialSprite && fighter.id === 'mister-ant-tenna';

    if (isTennaStarSpecialSprite) {
      if (!playedTennaStarSpecialSound.current) {
        playedTennaStarSpecialSound.current = true;
      }
      return;
    }

    playedTennaStarSpecialSound.current = false;
  }, [fighter.id, isAirSpecialSprite, isSpecialSprite, onTennaStarSpecialSpriteStart]);

  useLayoutEffect(() => {
    if (isQueenSpecialSprite) {
      if (!playedQueenSpecialSound.current) {
        playedQueenSpecialSound.current = true;
        onQueenSpecialSpriteStart?.();
      }
      return;
    }

    playedQueenSpecialSound.current = false;
  }, [isQueenSpecialSprite, onQueenSpecialSpriteStart]);
  const battleSprite =
    isDefeatSprite
      ? fighter.defeatSprite
      : isJevilHeadlessAbsorbPose
        ? jevilHeadlessAbsorbPoseSprite
      : isQueenVictoryBackdrop
        ? queenUniqueVictoryPoseSprite
      : isVictorySprite && !isQueenVictoryBackdrop
      ? victorySprite
      : isKnightSphereTransformSprite
        ? roaringKnightVanishSprite
      : isKnightBirdTransformSprite
        ? roaringKnightBirdSprite
      : isKnightBirdSprite
        ? roaringKnightBirdDashSprite
      : isKnightSphereSprite
        ? roaringKnightSphereSprite
      : isKnightDarkWaveSprite
        ? roaringKnightDarkWaveSprite
      : isBlockSprite
        ? fighter.blockSprite
      : isChargeReleaseSprite
        ? chargeReleaseFrameSprite ?? fighter.chargeReleaseSprite
        : isChargeHoldSprite
          ? fighter.chargeHoldSprite
          : isAirSpecialSprite
            ? fighter.airSpecialSprite
            : isSpecialSprite
              ? specialSpriteOverride ?? fighter.specialSprite
              : isHealingSprite
                ? fighter.healSprite
                : isLaunchedSprite
                  ? fighter.launchedSprite
                : isKnockdownSprite
                  ? fighter.knockdownSprite
                : isCrouchPunchSprite
                  ? fighter.crouchPunchSprite
                : isCrouchKickSprite
                  ? fighter.crouchKickSprite
                      : isGersonLeapPrepSprite
                        ? gersonBoomLeapPrepSprite
                      : isCrouching && fighter.crouchSprite
                        ? fighter.crouchSprite
                        : attack === 'punch' && fighter.punchSprite
                          ? fighter.punchSprite
                          : isKickSprite
                            ? fighter.kickSprite
                          : isJumpSprite
                              ? isGersonLeapBoostSprite
                                ? gersonBoomJumpSlowSprite
                                : isGersonBounceJump && fighter.id === 'gerson-boom'
                                ? gersonBoomJumpBounceSprite
                                : fighter.jumpSprite
                              : isWalkSprite
                                ? fighter.walkSprite
                                : fighter.battleSprite;
  const isGersonBackScarfSprite =
    fighter.id === 'gerson-boom' &&
    battleSprite === fighter.battleSprite &&
    attack === 'idle' &&
    status === 'idle' &&
    position.y === 0 &&
    !isBlocking &&
    !isShootingSpecial &&
    !isGersonLeapPreparing &&
    !isDefeatSprite &&
    !isVictorySprite;
  const isClassicBattlePoseStrip =
    battleSprite === fighter.battleSprite &&
    (fighter.id === 'mister-ant-tenna' || fighter.id === 'gerson-boom' || fighter.id === 'jevil');
  const spriteClassName = `battle-sprite battle-sprite--${fighter.id}${
    isCrouching && fighter.crouchSprite && !isCrouchPunchSprite && !isCrouchKickSprite
      ? ' battle-sprite--crouch'
      : ''
  }${attack === 'punch' && fighter.punchSprite && !isCrouchPunchSprite ? ' battle-sprite--punch' : ''}${
    isStandingPunchStrip ? ' battle-sprite--punch-strip' : ''
  }${
    isKickSprite ? ' battle-sprite--kick' : ''
  }${isCrouchPunchSprite ? ' battle-sprite--crouch-uppercut' : ''}${
    isCrouchKickSprite ? ' battle-sprite--crouch-sweep' : ''
  }${isSpecialSprite ? ' battle-sprite--special' : ''
  }${isJevilChaosSpecialStrip ? ' battle-sprite--jevil-chaos-special' : ''
  }${isJevilTeleportSpecialStrip ? ' battle-sprite--jevil-teleport-special' : ''
  }${isJevilTeleportFreezePose ? ' battle-sprite--jevil-teleport-freeze' : ''
  }${isJevilTeleportShootPose ? ' battle-sprite--jevil-teleport-shoot' : ''
  }${isJevilHeadlessAbsorbPose ? ' battle-sprite--jevil-headless-absorb' : ''
  }${isAirSpecialSprite ? ' battle-sprite--air-special' : ''
  }${isQueenSpecialSprite ? ' battle-sprite--queen-special' : ''
  }${isHealingSprite ? ' battle-sprite--healing' : ''
  }${isKnightSphereTransformSprite ? ` battle-sprite--sphere-transform battle-sprite--sphere-${knightSpherePhase}` : ''
  }${isKnightSphereSprite ? ' battle-sprite--sphere-idle' : ''
  }${isKnightBirdTransformSprite ? ' battle-sprite--bird-transform' : ''
  }${isKnightBirdSprite ? ' battle-sprite--bird-dash' : ''
  }${isKnightDarkWaveSprite ? ` battle-sprite--dark-wave battle-sprite--dark-wave-${knightDarkWaveState}` : ''
  }${isLaunchedSprite ? ' battle-sprite--launched-strip' : ''
  }${isKnockdownSprite ? ' battle-sprite--knockdown' : ''
  }${isDefeatSprite ? ' battle-sprite--defeat' : ''
  }${isVictorySprite && !isQueenVictoryBackdrop ? ' battle-sprite--round-victory' : ''
  }${isQueenVictoryBackdrop ? ' battle-sprite--queen-unique-victory' : ''
  }${isChargeHoldSprite ? ' battle-sprite--charge-hold' : ''
  }${isChargeReleaseSprite ? ' battle-sprite--charge-release' : ''
  }${isBlockSprite ? ' battle-sprite--block-strip' : ''
  }${isWalkSprite ? ' battle-sprite--walk' : ''
  }${isWalkSprite && walkDirection === 'backward' ? ' battle-sprite--walk-backward' : ''
  }${isClassicBattlePoseStrip ? ' battle-sprite--battle-pose-strip' : ''
  }${isGersonLeapPrepSprite ? ' battle-sprite--gerson-leap-prep' : ''
  }${isJumpSprite ? ' battle-sprite--jump' : ''
  }${isGersonJumpSprite ? ' battle-sprite--gerson-jump-strip' : ''
  }${isGersonBounceJump && isGersonJumpSprite ? ' battle-sprite--gerson-jump-bounce' : ''
  }${isGersonLeapBoostSprite ? ' battle-sprite--gerson-jump-slow' : ''
  }${isJumpSprite && jumpPhase === 'falling' ? ' battle-sprite--jump-falling' : ''
  }`;
  const className = `stick-fighter stick-fighter--${fighter.id} stick-fighter--${side} stick-fighter--face-${facing} stick-fighter--${attack}${
    isCrouching ? ' stick-fighter--crouch' : ''
  }${isShootingSpecial ? ' stick-fighter--special' : ''}${isBlocking ? ' stick-fighter--block' : ''}${
    status !== 'idle' ? ` stick-fighter--${status}` : ''
  }${isDamageFlashing ? ' stick-fighter--damage-flash' : ''}${isRecovering ? ' stick-fighter--recovering' : ''}${
    hasDarkAura ? ' stick-fighter--dark-aura' : ''
  }${isKnightDarkWaveOverheated ? ' stick-fighter--dark-wave-overheated' : ''
  }${isJevilAbsorbing ? ' stick-fighter--jevil-absorbing' : ''
  }`;

  return (
    <div className={className} style={getArenaFighterStyle(fighter, position, floorLift, visualLift)}>
      {isBlocking && <div className="block-label">BLOCK</div>}
      {isGersonBackScarfSprite && (
        <span
          className="gerson-back-scarf"
          style={{ backgroundImage: `url(${gersonBoomBackScarfSprite})` }}
          aria-hidden="true"
        />
      )}
      {battleSprite && (isClassicBattlePoseStrip || isKnightSphereTransformSprite || isKnightSphereSprite || isKnightBirdTransformSprite || isKnightBirdSprite || isKnightDarkWaveSprite || isBlockSprite || isKnightImpactStrip || isKickSprite || isJumpSprite || isCrouchPunchSprite || isDefeatStrip || isWalkSprite || isStandingPunchStrip || isGersonSpinStrip || isQueenSpecialSprite || isJevilPlatformSpecialStrip || isQueenVictoryStrip || isKnightVictoryStrip) ? (
        <span
          key={`${fighter.id}-${battleSprite}-${isChargeReleaseSprite ? 'charge-release' : 'default'}-${isGersonJumpSprite ? gersonJumpRun : 0}`}
          className={spriteClassName}
          style={{ backgroundImage: `url(${battleSprite})` }}
          aria-hidden="true"
        />
      ) : battleSprite ? (
        <img
          key={`${fighter.id}-${battleSprite}-${isChargeReleaseSprite ? 'charge-release' : 'default'}-${isGersonJumpSprite ? gersonJumpRun : 0}`}
          className={spriteClassName}
          src={battleSprite}
          alt=""
          aria-hidden="true"
        />
      ) : (
        <div className="stick-body" aria-hidden="true">
          <span className="stick-head" />
          <span className="stick-torso" />
          <span className="stick-arm stick-arm--front" />
          <span className="stick-arm stick-arm--back" />
          <span className="stick-leg stick-leg--front" />
          <span className="stick-leg stick-leg--back" />
        </div>
      )}
    </div>
  );
}

function getOrbStyle(fighter: Fighter): FighterOrbStyle {
  return {
    '--fighter-color': fighter.color,
    '--fighter-shadow': fighter.shadow,
  };
}

function getArenaFighterStyle(
  fighter: Fighter,
  position: Position,
  floorLift = 0,
  visualLift = 0,
): ArenaFighterStyle {
  return {
    '--fighter-color': fighter.color,
    '--fighter-shadow': fighter.shadow,
    left: `${getArenaScreenX(position.x)}%`,
    bottom: `${94 + floorLift + position.y + visualLift}px`,
  };
}

function getArenaScreenX(arenaX: number) {
  const arenaWidth = ARENA_RIGHT_LIMIT - ARENA_LEFT_LIMIT;
  const visibleWidth = ARENA_VISIBLE_RIGHT - ARENA_VISIBLE_LEFT;
  const progress = (clamp(arenaX, ARENA_LEFT_LIMIT, ARENA_RIGHT_LIMIT) - ARENA_LEFT_LIMIT) / arenaWidth;

  return ARENA_VISIBLE_LEFT + progress * visibleWidth;
}

function clampPlayerX(nextX: number, opponentX: number) {
  if (nextX <= opponentX) {
    return clamp(nextX, ARENA_LEFT_LIMIT, opponentX - FIGHTER_COLLISION_GAP);
  }

  return clamp(nextX, opponentX + FIGHTER_COLLISION_GAP, ARENA_RIGHT_LIMIT);
}

function clampAirbornePlayerX(nextX: number, currentX: number, opponentX: number) {
  const wantsToCrossRight = currentX <= opponentX && nextX > opponentX;
  const wantsToCrossLeft = currentX >= opponentX && nextX < opponentX;
  const hasRightLandingSpace = opponentX + AIRBORNE_CROSS_LANDING_SPACE <= ARENA_RIGHT_LIMIT;
  const hasLeftLandingSpace = opponentX - AIRBORNE_CROSS_LANDING_SPACE >= ARENA_LEFT_LIMIT;

  if (wantsToCrossRight && !hasRightLandingSpace) {
    return clamp(nextX, ARENA_LEFT_LIMIT, opponentX - FIGHTER_COLLISION_GAP);
  }

  if (wantsToCrossLeft && !hasLeftLandingSpace) {
    return clamp(nextX, opponentX + FIGHTER_COLLISION_GAP, ARENA_RIGHT_LIMIT);
  }

  return clamp(nextX, ARENA_LEFT_LIMIT, ARENA_RIGHT_LIMIT);
}

function clampOpponentX(nextX: number, playerX: number) {
  if (nextX >= playerX) {
    return clamp(nextX, playerX + FIGHTER_COLLISION_GAP, ARENA_RIGHT_LIMIT);
  }

  return clamp(nextX, ARENA_LEFT_LIMIT, playerX - FIGHTER_COLLISION_GAP);
}

function clampAirborneOpponentX(nextX: number, currentX: number, playerX: number) {
  const wantsToCrossRight = currentX <= playerX && nextX > playerX;
  const wantsToCrossLeft = currentX >= playerX && nextX < playerX;
  const hasRightLandingSpace = playerX + AIRBORNE_CROSS_LANDING_SPACE <= ARENA_RIGHT_LIMIT;
  const hasLeftLandingSpace = playerX - AIRBORNE_CROSS_LANDING_SPACE >= ARENA_LEFT_LIMIT;

  if (wantsToCrossRight && !hasRightLandingSpace) {
    return clamp(nextX, ARENA_LEFT_LIMIT, playerX - FIGHTER_COLLISION_GAP);
  }

  if (wantsToCrossLeft && !hasLeftLandingSpace) {
    return clamp(nextX, playerX + FIGHTER_COLLISION_GAP, ARENA_RIGHT_LIMIT);
  }

  return clamp(nextX, ARENA_LEFT_LIMIT, ARENA_RIGHT_LIMIT);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getGameKey(event: KeyboardEvent, controlBindings: Record<GameInput, string>) {
  if (event.code === 'Escape') return 'escape';

  const boundAction = (Object.keys(controlBindings) as GameInput[]).find(
    (action) => controlBindings[action] === event.code,
  );

  return boundAction ?? event.key.toLowerCase();
}
