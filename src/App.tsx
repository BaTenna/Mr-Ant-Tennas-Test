import { type CSSProperties, useEffect, useLayoutEffect, useRef, useState } from 'react';
import misterAntTennaSprite from './assets/mister-ant-tenna.png';
import misterAntTennaBattleSprite from './assets/tenna-battle.gif';
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
import roaringKnightPortraitSprite from './assets/roaring-knight-portrait.png';
import roaringKnightSprite from './assets/roaring-knight.png';
import roaringKnightIdleSprite from './assets/roaring-knight-idle.gif';
import healPlusFiveSprite from './assets/heal-plus-five.png';
import selectSound from './assets/snd_select.wav';
import fightStartSound from './assets/snd_boost.wav';
import queenVictorySound from './assets/queen-intro.ogg';
import tennaAirWaveSound from './assets/snd_scytheburst.wav';
import queenHealSound from './assets/snd_power.wav';
import queenCupThrowSound from './assets/snd_b.wav';
import projectileHitSound from './assets/snd_bomb.wav';
import attackUppercutSound from './assets/snd_criticalswing.wav';
import attackSweepSound from './assets/snd_grab.wav';
import attackKickSound from './assets/snd_heavyswing.wav';
import attackPunchSound from './assets/snd_impact.wav';
import queenPunchSound from './assets/snd_laz_c.wav';
import queenKickSound from './assets/snd_rudebuster_hit.wav';
import tennaVictoryThreeSound from './assets/crowd-laughter-deltarune.mp3';
import tennaStarSpecialSound from './assets/snd_tensionhorn.wav';
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
  specialSprite?: string;
  airSpecialSprite?: string;
  healSprite?: string;
  defeatSprite?: string;
  victorySprites?: string[];
};

type Screen = 'title' | 'menu' | 'select' | 'stage' | 'arena' | 'victory';
type Attack = 'idle' | 'punch' | 'kick';
type HitLevel = 'high' | 'mid' | 'low';
type HitEffect = 'none' | 'sweep' | 'uppercut';
type ArenaMode = 'fight' | 'sandbox';
type FighterSide = 'left' | 'right';
type Facing = 'left' | 'right';
type Position = { x: number; y: number };
type ProjectileLane = 'low' | 'high';
type ProjectileKind = 'tenna-star' | 'queen-wave' | 'queen-heal-wave';
type RoundCurtainPhase = 'idle' | 'closing' | 'opening';
type Projectile = {
  id: number;
  x: number;
  direction: -1 | 1;
  owner: FighterSide;
  lane: ProjectileLane;
  kind: ProjectileKind;
};
type HealPopup = {
  id: number;
  side: FighterSide;
  x: number;
  y: number;
};
type KnightAfterimage = {
  id: number;
  side: FighterSide;
  x: number;
  y: number;
  facing: Facing;
};
type OpponentStatus = 'idle' | 'knockdown' | 'launched' | 'healing';
type SelectTarget = 'player' | 'opponent';
type Difficulty = 'easy' | 'normal' | 'hard';
type PlayerSpecialMove = 'tenna-ground' | 'tenna-air' | 'queen-ground' | 'queen-heal';
type AttackSoundId =
  | 'attackPunch'
  | 'attackKick'
  | 'attackUppercut'
  | 'attackSweep'
  | 'queenPunch'
  | 'queenKick';
type BufferedSoundId =
  | 'select'
  | 'fightStart'
  | 'tennaAirWave'
  | 'queenHeal'
  | 'queenCupThrow'
  | 'projectileHit'
  | 'tennaStarSpecial'
  | 'doorHover'
  | 'doorClick'
  | 'countdown1'
  | 'countdown2'
  | 'countdown3'
  | AttackSoundId;

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
    id: 'volt',
    name: 'Volt',
    title: 'Storm Striker',
    realm: 'Sky Forge',
    color: '#f0c84b',
    shadow: '#9a6900',
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
    battleSprite: roaringKnightIdleSprite,
  },
];

const stages: Stage[] = [
  {
    id: 'tenna-stage',
    name: 'Tenna Stage',
    image: stageTennaArena,
    position: 'center calc(100% + 18px)',
    size: '118% 100%',
  },
  {
    id: 'couch-cliffs',
    name: 'Couch Cliffs',
    image: stageCouchCliffs,
    position: 'center calc(50% + 34px)',
    size: 'cover',
  },
  {
    id: 'cold-place',
    name: 'Cold Place',
    image: stageColdPlace,
    position: 'center center',
    size: 'cover',
  },
  {
    id: 'dark-sanctuaries',
    name: 'Dark Sanctuaries',
    image: stageDarkSanctuaries,
    position: 'center center',
    size: 'cover',
  },
  {
    id: 'queens-mansion',
    name: "Queen's Mansion",
    image: stageQueensMansion,
    position: 'center calc(50% + 34px)',
    size: 'cover',
    fighterLift: 46,
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

const START_POSITION: Position = { x: 12, y: 0 };
const OPPONENT_POSITION: Position = { x: 88, y: 0 };
const ARENA_LEFT_LIMIT = -18;
const ARENA_RIGHT_LIMIT = 118;
const ARENA_VISIBLE_LEFT = 6;
const ARENA_VISIBLE_RIGHT = 94;
const FIGHTER_COLLISION_GAP = 9;
const MAX_HEALTH = 100;
const ATTACK_COOLDOWN_MS = 780;
const CPU_ATTACK_COOLDOWN_MS = 860;
const SPECIAL_COOLDOWN_MS = 900;
const QUEEN_SPECIAL_COOLDOWN_MS = 3000;
const QUEEN_HEAL_COOLDOWN_MS = 6800;
const QUEEN_HEAL_DURATION_MS = 4200;
const QUEEN_HEAL_TICK_MS = 1000;
const QUEEN_HEAL_PER_TICK = 5;
const QUEEN_HEAL_WAVE_DAMAGE = 4;
const QUEEN_HEAL_WAVE_KNOCKBACK = 0.85;
const HEAL_POPUP_MS = 520;
const TENNA_AIR_SPECIAL_COOLDOWN_MS = 2600;
const SPECIAL_INPUT_WINDOW_MS = 240;
const SPECIAL_INPUT_TOTAL_MS = 520;
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
const PROJECTILE_DAMAGE = 8;
const QUEEN_PROJECTILE_DAMAGE = 13;
const PROJECTILE_KNOCKBACK_VELOCITY = 1.25;
const QUEEN_PROJECTILE_KNOCKBACK_VELOCITY = 2.15;
const PROJECTILE_KNOCKBACK_FRICTION = 0.9;
const PROJECTILE_SPEED = 0.72;
const ATTACK_DURATION_MS: Record<Exclude<Attack, 'idle'>, number> = {
  punch: 240,
  kick: 520,
};
const CROUCH_UPPERCUT_DURATION_MS = 420;
const CROUCH_UPPERCUT_RECOVERY_MS = 1000;
const UPPERCUT_KNOCKBACK = 2.25;
const SWEEP_KNOCKDOWN_MS = 2000;
const UPPERCUT_LANDING_KNOCKDOWN_MS = 1000;
const KNOCKDOWN_RECOVERY_MS = 360;
const WALK_SPEED = 0.2;
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
  const [lockedFighter, setLockedFighter] = useState<Fighter | null>(null);
  const [lockedOpponent, setLockedOpponent] = useState<Fighter | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [effectsVolume, setEffectsVolume] = useState(0.85);
  const [musicVolume, setMusicVolume] = useState(0.55);
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
  const [playerAirSpecialWave, setPlayerAirSpecialWave] = useState(false);
  const [opponentAirSpecialWave, setOpponentAirSpecialWave] = useState(false);
  const [isCrouching, setIsCrouching] = useState(false);
  const [isCrouchAttackLocked, setIsCrouchAttackLocked] = useState(false);
  const [isBlocking, setIsBlocking] = useState(false);
  const [playerHealth, setPlayerHealth] = useState(MAX_HEALTH);
  const [opponentHealth, setOpponentHealth] = useState(MAX_HEALTH);
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  const [healPopups, setHealPopups] = useState<HealPopup[]>([]);
  const [knightAfterimages, setKnightAfterimages] = useState<KnightAfterimage[]>([]);
  const [winnerSide, setWinnerSide] = useState<FighterSide>('left');
  const [playerDamageFlash, setPlayerDamageFlash] = useState(false);
  const [opponentDamageFlash, setOpponentDamageFlash] = useState(false);
  const [roundNumber, setRoundNumber] = useState(1);
  const [playerRoundWins, setPlayerRoundWins] = useState(0);
  const [opponentRoundWins, setOpponentRoundWins] = useState(0);
  const [roundWinnerPoseSprite, setRoundWinnerPoseSprite] = useState<string | null>(null);
  const [roundCurtainPhase, setRoundCurtainPhase] = useState<RoundCurtainPhase>('idle');
  const [roundCountdown, setRoundCountdown] = useState(3);

  const attackTimer = useRef<number | null>(null);
  const opponentAttackTimer = useRef<number | null>(null);
  const opponentAttackInterval = useRef<number | null>(null);
  const opponentStatusTimer = useRef<number | null>(null);
  const playerStatusTimer = useRef<number | null>(null);
  const playerDamageFlashTimer = useRef<number | null>(null);
  const opponentDamageFlashTimer = useRef<number | null>(null);
  const playerRecoveryTimer = useRef<number | null>(null);
  const opponentRecoveryTimer = useRef<number | null>(null);
  const opponentCrouchTimer = useRef<number | null>(null);
  const victoryTimer = useRef<number | null>(null);
  const roundTransitionTimer = useRef<number | null>(null);
  const roundCurtainTimer = useRef<number | null>(null);
  const countdownTimer = useRef<number | null>(null);
  const doorTransitionTimer = useRef<number | null>(null);
  const screenRevealTimer = useRef<number | null>(null);
  const knightAfterimageTimer = useRef<number | null>(null);
  const attackReadyAt = useRef(0);
  const opponentAttackReadyAt = useRef(0);
  const specialReadyAt = useRef(0);
  const specialInputStep = useRef<0 | 1 | 2>(0);
  const specialInputExpiresAt = useRef(0);
  const specialInputStartedAt = useRef(0);
  const specialInputMove = useRef<PlayerSpecialMove | null>(null);
  const opponentSpecialReadyAt = useRef(0);
  const attackRef = useRef<Attack>('idle');
  const playerSpecialLockRef = useRef(false);
  const opponentSpecialLockRef = useRef(false);
  const playerSpecialTimer = useRef<number | null>(null);
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
  const playerHealthRef = useRef(MAX_HEALTH);
  const opponentHealthRef = useRef(MAX_HEALTH);
  const opponentPositionRef = useRef(OPPONENT_POSITION);
  const playerStatusRef = useRef<OpponentStatus>('idle');
  const opponentStatusRef = useRef<OpponentStatus>('idle');
  const opponentJumpVelocity = useRef(0);
  const isBlockingRef = useRef(false);
  const pressedKeys = useRef(new Set<string>());
  const jumpVelocity = useRef(0);
  const playerAirSpecialActiveRef = useRef(false);
  const playerAirSpecialYRef = useRef(0);
  const opponentAirSpecialActiveRef = useRef(false);
  const opponentAirSpecialYRef = useRef(0);
  const playerKnockbackVelocity = useRef(0);
  const opponentKnockbackVelocity = useRef(0);
  const positionRef = useRef(START_POSITION);
  const projectilesRef = useRef<Projectile[]>([]);
  const projectileIdRef = useRef(1);
  const healPopupIdRef = useRef(1);
  const knightAfterimageIdRef = useRef(1);
  const roundResolvedRef = useRef(false);
  const roundCountdownRef = useRef(3);
  const animationFrame = useRef<number | null>(null);
  const selectSoundRef = useRef<HTMLAudioElement | null>(null);
  const fightStartSoundRef = useRef<HTMLAudioElement | null>(null);
  const tennaAirWaveSoundRef = useRef<HTMLAudioElement | null>(null);
  const queenHealSoundRef = useRef<HTMLAudioElement | null>(null);
  const queenCupThrowSoundRef = useRef<HTMLAudioElement | null>(null);
  const projectileHitSoundRef = useRef<HTMLAudioElement | null>(null);
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
  const audioContextRef = useRef<AudioContext | null>(null);
  const soundBuffersRef = useRef<Partial<Record<BufferedSoundId, AudioBuffer>>>({});
  const countdownSoundRefs = useRef<Record<1 | 2 | 3, HTMLAudioElement | null>>({
    1: null,
    2: null,
    3: null,
  });

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
  ) {
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

  function playTennaStarSpecialSound() {
    playBufferedSound('tennaStarSpecial', tennaStarSpecialSoundRef.current, 0.9);
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
    if (knightAfterimageTimer.current) {
      window.clearInterval(knightAfterimageTimer.current);
      knightAfterimageTimer.current = null;
    }

    setKnightAfterimages([]);

    const hasKnight = player.id === 'roaring-knight' || opponent.id === 'roaring-knight';

    if (screen !== 'arena' || !hasKnight) return undefined;

    function spawnKnightAfterimage(side: FighterSide, position: Position, facing: Facing) {
      const id = knightAfterimageIdRef.current;
      knightAfterimageIdRef.current += 1;

      setKnightAfterimages((current) => [
        ...current.slice(-7),
        {
          id,
          side,
          x: position.x,
          y: position.y,
          facing,
        },
      ]);

      window.setTimeout(() => {
        setKnightAfterimages((current) => current.filter((afterimage) => afterimage.id !== id));
      }, 2000);
    }

    knightAfterimageTimer.current = window.setInterval(() => {
      if (player.id === 'roaring-knight') {
        spawnKnightAfterimage(
          'left',
          positionRef.current,
          positionRef.current.x <= opponentPositionRef.current.x ? 'right' : 'left',
        );
      }

      if (opponent.id === 'roaring-knight') {
        spawnKnightAfterimage(
          'right',
          opponentPositionRef.current,
          opponentPositionRef.current.x <= positionRef.current.x ? 'right' : 'left',
        );
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
    if (countdownTimer.current) {
      window.clearTimeout(countdownTimer.current);
      countdownTimer.current = null;
    }

    if (
      screen !== 'arena' ||
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
  }, [opponentHealth, playerHealth, roundCountdown, roundCurtainPhase, screen]);

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
      (pressedKeys.current.has('s') && positionRef.current.y === 0) ||
      (player.id === 'queen' && playerStatusRef.current === 'healing')
    );
  }

  function isOpponentLowProfile() {
    return (
      opponentCrouchingRef.current ||
      (opponent.id === 'queen' && opponentStatusRef.current === 'healing')
    );
  }

  function damagePlayer(baseDamage: number, effect: HitEffect = 'none', hitLevel: HitLevel = 'mid') {
    if (playerStatusRef.current === 'knockdown') return false;

    const playerIsCrouching = isPlayerLowProfile();
    const playerIsAirborne = positionRef.current.y > 0;
    const isBlocking = isBlockingRef.current && playerStatusRef.current === 'idle';
    const isDodged =
      (hitLevel === 'high' && playerIsCrouching && !isBlocking) ||
      (hitLevel === 'low' && playerIsAirborne);
    const isBlocked =
      hitLevel === 'low'
        ? isBlocking && playerIsCrouching
        : isBlocking;

    if (isDodged) return false;

    const finalDamage = isBlocked ? Math.ceil(baseDamage * 0.25) : baseDamage;
    if (playerStatusRef.current === 'healing') stopQueenHeal('left');
    flashDamage('left');
    setPlayerHealth((health) => {
      const nextHealth = clamp(health - finalDamage, 0, MAX_HEALTH);
      playerHealthRef.current = nextHealth;
      return nextHealth;
    });

    if (isBlocked || effect === 'none') return !isBlocked;

    if (playerStatusTimer.current) window.clearTimeout(playerStatusTimer.current);

    if (effect === 'sweep') {
      jumpVelocity.current = 0;
      updatePlayerStatus('knockdown');
      playerStatusTimer.current = window.setTimeout(() => {
        recoverFromKnockdown('left');
      }, SWEEP_KNOCKDOWN_MS);
      return true;
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
    playerStatusRef.current = nextStatus;
    setPlayerStatus(nextStatus);
    if (nextStatus !== 'idle') setPlayerRecovering(false);
  }

  function updateOpponentAttack(nextAttack: Attack) {
    opponentAttackRef.current = nextAttack;
    setOpponentAttack(nextAttack);
  }

  function updateOpponentBlock(isActive: boolean) {
    opponentBlockingRef.current = isActive;
    setOpponentBlocking(isActive);
  }

  function updateOpponentCrouch(isActive: boolean) {
    opponentCrouchingRef.current = isActive;
    setOpponentCrouching(isActive);
  }

  function updateOpponentStatus(nextStatus: OpponentStatus) {
    opponentStatusRef.current = nextStatus;
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

  function damageOpponentHealth(baseDamage: number, hitLevel: HitLevel = 'mid') {
    if (opponentStatusRef.current === 'knockdown') return false;

    const opponentIsCrouching = isOpponentLowProfile();
    const opponentIsAirborne = opponentPositionRef.current.y > 0;
    const isBlocking =
      opponentBlockingRef.current &&
      opponentStatusRef.current === 'idle' &&
      opponentAttackRef.current === 'idle';
    const isDodged =
      (hitLevel === 'high' && opponentIsCrouching && !isBlocking) ||
      (hitLevel === 'low' && opponentIsAirborne);
    const isBlocked =
      hitLevel === 'low'
        ? isBlocking && opponentIsCrouching
        : isBlocking;

    if (isDodged) return false;

    if (arenaMode === 'sandbox') {
      flashDamage('right');
      opponentHealthRef.current = MAX_HEALTH;
      setOpponentHealth(MAX_HEALTH);
      return true;
    }

    const damage = isBlocked ? Math.ceil(baseDamage * 0.25) : baseDamage;
    if (opponentStatusRef.current === 'healing') stopQueenHeal('right');
    flashDamage('right');

    setOpponentHealth((health) => {
      const nextHealth = clamp(health - damage, 0, MAX_HEALTH);
      opponentHealthRef.current = nextHealth;
      return nextHealth;
    });

    return !isBlocked;
  }

  function spawnProjectile(
    owner: FighterSide,
    x: number,
    direction: -1 | 1,
    lane: ProjectileLane,
    kind: ProjectileKind,
  ) {
    const nextProjectile: Projectile = {
      id: projectileIdRef.current,
      x: clamp(x + direction * 7, ARENA_LEFT_LIMIT, ARENA_RIGHT_LIMIT),
      direction,
      owner,
      lane,
      kind,
    };

    projectileIdRef.current += 1;
    projectilesRef.current = [...projectilesRef.current, nextProjectile];
    setProjectiles(projectilesRef.current);
  }

  function lockSpecialShooter(owner: FighterSide) {
    if (owner === 'left') {
      playerSpecialLockRef.current = true;
      setPlayerSpecialShooting(true);

      if (playerSpecialTimer.current) window.clearTimeout(playerSpecialTimer.current);
      playerSpecialTimer.current = window.setTimeout(() => {
        playerSpecialLockRef.current = false;
        setPlayerSpecialShooting(false);
      }, SPECIAL_SHOOT_MS);
      return;
    }

    opponentSpecialLockRef.current = true;
    setOpponentSpecialShooting(true);

    if (opponentSpecialTimer.current) window.clearTimeout(opponentSpecialTimer.current);
    opponentSpecialTimer.current = window.setTimeout(() => {
      opponentSpecialLockRef.current = false;
      setOpponentSpecialShooting(false);
    }, SPECIAL_SHOOT_MS);
  }

  function getProjectileDamage(kind: ProjectileKind) {
    return kind === 'queen-heal-wave'
      ? QUEEN_HEAL_WAVE_DAMAGE
      : kind === 'queen-wave'
        ? QUEEN_PROJECTILE_DAMAGE
        : PROJECTILE_DAMAGE;
  }

  function getProjectileKnockback(kind: ProjectileKind) {
    return kind === 'queen-heal-wave'
      ? QUEEN_HEAL_WAVE_KNOCKBACK
      : kind === 'queen-wave'
      ? QUEEN_PROJECTILE_KNOCKBACK_VELOCITY
      : PROJECTILE_KNOCKBACK_VELOCITY;
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
    opponentAirSpecialYRef.current = Math.max(opponentPositionRef.current.y, 42);
    opponentPositionRef.current = {
      ...opponentPositionRef.current,
      y: opponentAirSpecialYRef.current,
    };
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
      if (canApplyKnockback) {
        applyProjectileKnockback('left', direction, TENNA_AIR_SPECIAL_KNOCKBACK);
      }
    }
  }

  useEffect(() => {
    if (screen !== 'arena') return undefined;
    if (arenaMode === 'sandbox') return undefined;
    if (opponentHealth > 0 && playerHealth > 0) return undefined;
    if (roundResolvedRef.current) return undefined;

    const roundWinner: FighterSide = opponentHealth <= 0 ? 'left' : 'right';
    const nextPlayerWins = playerRoundWins + (roundWinner === 'left' ? 1 : 0);
    const nextOpponentWins = opponentRoundWins + (roundWinner === 'right' ? 1 : 0);
    const roundWinnerFighter = roundWinner === 'left' ? player : opponent;
    const victorySprites = roundWinnerFighter.victorySprites ?? [];
    const availableVictorySprites =
      selectedStage.id === 'tenna-stage'
        ? victorySprites
        : victorySprites.filter((sprite) => sprite !== queenVictoryBackdropSprite);

    setWinnerSide(roundWinner);
    setRoundWinnerPoseSprite(
      availableVictorySprites.length > 0
        ? availableVictorySprites[Math.floor(Math.random() * availableVictorySprites.length)]
        : null,
    );
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

    return () => {
      if (victoryTimer.current) window.clearTimeout(victoryTimer.current);
    };
  }, [arenaMode, opponentHealth, playerHealth, screen]);

  useEffect(() => {
    if (screen !== 'arena') return undefined;

    function damageOpponent(nextAttack: Exclude<Attack, 'idle'>) {
      if (opponentStatusRef.current === 'knockdown') return;

      const isCrouchAttack = pressedKeys.current.has('s') && positionRef.current.y === 0;
      const range = nextAttack === 'punch' ? 18 : 22;
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

      if (distance <= range) {
        const canApplyHitEffect = damageOpponentHealth(baseDamage, hitLevel);
        if (!canApplyHitEffect) return;

        if (isCrouchAttack && nextAttack === 'kick') {
          if (opponentStatusTimer.current) window.clearTimeout(opponentStatusTimer.current);
          opponentJumpVelocity.current = 0;
          updateOpponentStatus('knockdown');
          opponentStatusTimer.current = window.setTimeout(() => {
            recoverFromKnockdown('right');
          }, SWEEP_KNOCKDOWN_MS);
        }

        if (isCrouchAttack && nextAttack === 'punch') {
          if (opponentStatusTimer.current) window.clearTimeout(opponentStatusTimer.current);
          opponentJumpVelocity.current = 13.2;
          applyProjectileKnockback(
            'right',
            opponentPositionRef.current.x >= positionRef.current.x ? 1 : -1,
            UPPERCUT_KNOCKBACK,
          );
          updateOpponentStatus('launched');
        }
      }
    }

    function triggerAttack(nextAttack: Exclude<Attack, 'idle'>) {
      const now = window.performance.now();

      if (
        now < attackReadyAt.current ||
        attackRef.current !== 'idle' ||
        opponentHealthRef.current <= 0
      ) {
        return;
      }
      attackReadyAt.current = now + ATTACK_COOLDOWN_MS;

      const isCrouchAttack = pressedKeys.current.has('s') && positionRef.current.y === 0;
      attackRef.current = nextAttack;
      setAttack(nextAttack);
      playAttackSound(player, nextAttack, isCrouchAttack);
      damageOpponent(nextAttack);

      if (attackTimer.current) window.clearTimeout(attackTimer.current);
      const isCrouchUppercut = nextAttack === 'punch' && isCrouchAttack;
      const attackDuration =
        isCrouchUppercut
          ? CROUCH_UPPERCUT_DURATION_MS + CROUCH_UPPERCUT_RECOVERY_MS
          : ATTACK_DURATION_MS[nextAttack];

      setIsCrouchAttackLocked(isCrouchAttack);
      attackTimer.current = window.setTimeout(() => {
        attackRef.current = 'idle';
        setIsCrouchAttackLocked(false);
        setAttack('idle');
      }, attackDuration);
    }

    function triggerSpecial(specialMove: PlayerSpecialMove) {
      const now = window.performance.now();
      const direction: -1 | 1 = opponentPositionRef.current.x >= positionRef.current.x ? 1 : -1;
      const isTennaGroundSpecial = specialMove === 'tenna-ground';
      const isTennaAirSpecial = specialMove === 'tenna-air';
      const isQueenSpecial = specialMove === 'queen-ground';
      const isQueenHeal = specialMove === 'queen-heal';

      if (
        now < specialReadyAt.current ||
        attackRef.current !== 'idle' ||
        playerSpecialLockRef.current ||
        isBlockingRef.current ||
        playerStatusRef.current !== 'idle' ||
        ((isTennaGroundSpecial || isQueenSpecial || isQueenHeal) && positionRef.current.y > 0) ||
        (isTennaAirSpecial && positionRef.current.y <= 0) ||
        ((isTennaGroundSpecial || isTennaAirSpecial) && player.id !== 'mister-ant-tenna') ||
        ((isQueenSpecial || isQueenHeal) && player.id !== 'queen') ||
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
          : isTennaAirSpecial
            ? TENNA_AIR_SPECIAL_COOLDOWN_MS
            : SPECIAL_COOLDOWN_MS);

      if (isQueenHeal) {
        startQueenHeal('left');
        return true;
      }

      if (isTennaGroundSpecial) {
        playTennaStarSpecialSound();
      }

      lockSpecialShooter('left');

      if (isQueenSpecial) {
        if (playerSpecialSpawnTimer.current) window.clearTimeout(playerSpecialSpawnTimer.current);
        playerSpecialSpawnTimer.current = window.setTimeout(() => {
          const delayedDirection: -1 | 1 =
            opponentPositionRef.current.x >= positionRef.current.x ? 1 : -1;

          spawnProjectile('left', positionRef.current.x, delayedDirection, 'high', 'queen-wave');
        }, SPECIAL_SHOOT_MS);
        return true;
      }

      if (isTennaAirSpecial) {
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
      return true;
    }

    function resetSpecialInput() {
      specialInputStep.current = 0;
      specialInputExpiresAt.current = 0;
      specialInputStartedAt.current = 0;
      specialInputMove.current = null;
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

      if (key === 'd' || key === 's') {
        const expectedSecondKey = specialInputMove.current === 'queen-heal' ? 's' : 'd';
        if (specialInputStep.current === 1 && key === expectedSecondKey) {
          specialInputStep.current = 2;
          specialInputExpiresAt.current = now + SPECIAL_INPUT_WINDOW_MS;
          return null;
        }
      }

      const firstComboMove: PlayerSpecialMove | null =
        player.id === 'queen'
          ? positionRef.current.y === 0
            ? key === 's'
              ? 'queen-heal'
              : key === 'a'
                ? 'queen-ground'
                : null
            : null
          : player.id === 'mister-ant-tenna'
            ? positionRef.current.y > 0
              ? 'tenna-air'
              : 'tenna-ground'
            : null;
      const firstComboKey =
        firstComboMove === 'queen-ground' || firstComboMove === 'tenna-air' ? 'a' : 's';

      if (firstComboMove && key === firstComboKey) {
        specialInputStep.current = 1;
        specialInputMove.current = firstComboMove;
        specialInputStartedAt.current = now;
        specialInputExpiresAt.current = now + SPECIAL_INPUT_WINDOW_MS;
        return null;
      }

      if (key === 'arrowleft' || key === 'arrowright' || key === 'arrowdown') {
        const specialArrow =
          specialInputMove.current === 'queen-heal'
            ? 'arrowdown'
            : opponentPositionRef.current.x >= positionRef.current.x
              ? 'arrowright'
              : 'arrowleft';
        const isCompleteCombo = specialInputStep.current === 2 && key === specialArrow;
        const completedMove = isCompleteCombo ? specialInputMove.current : null;

        resetSpecialInput();
        return completedMove;
      }

      return null;
    }

    function handleKeyDown(event: KeyboardEvent) {
      const key = getGameKey(event);
      const handledKeys = ['w', 'a', 's', 'd', 'arrowleft', 'arrowright', 'arrowdown', 'arrowup', 'block'];

      if (!handledKeys.includes(key)) return;
      event.preventDefault();

      if (roundCountdownRef.current > 0 || roundResolvedRef.current) return;
      if (event.repeat) return;

      if (key === 'arrowup') {
        if (playerStatusRef.current === 'healing') stopQueenHeal('left');
        return;
      }

      const specialInput = advanceSpecialInput(key);

      const isOnGround = positionRef.current.y === 0;

      if (key === 'block') {
        if (
          !isOnGround ||
          attackRef.current !== 'idle' ||
          playerSpecialLockRef.current ||
          playerStatusRef.current !== 'idle'
        ) return;

        isBlockingRef.current = true;
        setIsBlocking(true);
        return;
      }

      if (key === 'arrowleft' || key === 'arrowright' || key === 'arrowdown') {
        if (specialInput) {
          triggerSpecial(specialInput);
          return;
        }

        if (key === 'arrowdown') return;

        if (
          !isOnGround ||
          isBlockingRef.current ||
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
          !pressedKeys.current.has('s') &&
          !isBlockingRef.current &&
          attackRef.current === 'idle' &&
          !playerSpecialLockRef.current &&
          playerStatusRef.current === 'idle';

        if (canJump) jumpVelocity.current = 10.2;
        return;
      }

      pressedKeys.current.add(key);
    }

    function handleKeyUp(event: KeyboardEvent) {
      const key = getGameKey(event);

      if (key === 'block') {
        isBlockingRef.current = false;
        setIsBlocking(false);
        return;
      }

      pressedKeys.current.delete(key);
    }

    function movePlayer() {
      const keys = pressedKeys.current;
      const isOnGround = positionRef.current.y === 0;
      const isRoundLocked = roundCountdownRef.current > 0 || roundResolvedRef.current;
      const nextIsCrouching = keys.has('s') && isOnGround && playerStatusRef.current === 'idle';
      const movementLocked =
        isRoundLocked ||
        nextIsCrouching ||
        isBlockingRef.current ||
        playerSpecialLockRef.current ||
        attackRef.current !== 'idle' ||
        playerStatusRef.current !== 'idle';
      const speed = WALK_SPEED;
      const nextPosition = { ...positionRef.current };

      if (!movementLocked) {
        if (keys.has('a')) nextPosition.x -= speed;
        if (keys.has('d')) nextPosition.x += speed;
      }

      if (Math.abs(playerKnockbackVelocity.current) > 0.03) {
        nextPosition.x += playerKnockbackVelocity.current;
        playerKnockbackVelocity.current *= PROJECTILE_KNOCKBACK_FRICTION;
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
        nextPosition.y = playerAirSpecialYRef.current;
        jumpVelocity.current = 0;
      } else if (jumpVelocity.current !== 0 || nextPosition.y > 0) {
        nextPosition.y = Math.max(0, nextPosition.y + jumpVelocity.current);
        jumpVelocity.current -= 0.28;

        if (nextPosition.y === 0 && jumpVelocity.current < 0) {
          jumpVelocity.current = 0;

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
        positionRef.current = nextPosition;
        setPlayerPosition(nextPosition);
      }

      if (opponentAirSpecialActiveRef.current) {
        const nextOpponentPosition = {
          ...opponentPositionRef.current,
          y: opponentAirSpecialYRef.current,
        };

        opponentJumpVelocity.current = 0;

        if (nextOpponentPosition.y !== opponentPositionRef.current.y) {
          opponentPositionRef.current = nextOpponentPosition;
          setOpponentPosition(nextOpponentPosition);
        }
      } else if (opponentJumpVelocity.current !== 0 || opponentPositionRef.current.y > 0) {
        const nextOpponentPosition = { ...opponentPositionRef.current };
        nextOpponentPosition.y = Math.max(0, nextOpponentPosition.y + opponentJumpVelocity.current);
        opponentJumpVelocity.current -= 0.34;

        if (nextOpponentPosition.y === 0 && opponentJumpVelocity.current < 0) {
          opponentJumpVelocity.current = 0;

          if (opponentStatusRef.current === 'launched') {
            updateOpponentStatus('knockdown');
            opponentStatusTimer.current = window.setTimeout(() => {
              recoverFromKnockdown('right');
            }, UPPERCUT_LANDING_KNOCKDOWN_MS);
          }
        }

        if (nextOpponentPosition.y !== opponentPositionRef.current.y) {
          opponentPositionRef.current = nextOpponentPosition;
          setOpponentPosition(nextOpponentPosition);
        }
      }

      if (Math.abs(opponentKnockbackVelocity.current) > 0.03) {
        const nextOpponentPosition = {
          ...opponentPositionRef.current,
          x:
            opponentPositionRef.current.y > 0 || positionRef.current.y > 0
              ? clampAirborneOpponentX(
                  opponentPositionRef.current.x + opponentKnockbackVelocity.current,
                  opponentPositionRef.current.x,
                  positionRef.current.x,
                )
              : clampOpponentX(
                  opponentPositionRef.current.x + opponentKnockbackVelocity.current,
                  positionRef.current.x,
                ),
        };

        opponentKnockbackVelocity.current *= PROJECTILE_KNOCKBACK_FRICTION;
        opponentPositionRef.current = nextOpponentPosition;
        setOpponentPosition(nextOpponentPosition);
      } else {
        opponentKnockbackVelocity.current = 0;
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
        const ai = AI_CONFIG[selectedDifficulty];
        const nextOpponentPosition = { ...opponentPositionRef.current };
        const distanceToPlayer = positionRef.current.x - nextOpponentPosition.x;
        const absDistance = Math.abs(distanceToPlayer);
        const directionToPlayer = Math.sign(distanceToPlayer);

        if (absDistance > ai.preferredRange) {
          nextOpponentPosition.x += directionToPlayer * ai.moveSpeed;
        } else if (selectedDifficulty === 'hard' && absDistance < 12) {
          nextOpponentPosition.x -= directionToPlayer * ai.moveSpeed * 0.55;
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
          opponentPositionRef.current = nextOpponentPosition;
          setOpponentPosition(nextOpponentPosition);
        }
      }

      if (!isRoundLocked && projectilesRef.current.length > 0) {
        let didProjectileHit = false;
        const nextProjectiles = projectilesRef.current
          .map((projectile) => ({
            ...projectile,
            x: projectile.x + projectile.direction * PROJECTILE_SPEED,
          }))
          .filter((projectile) => {
            if (projectile.x < ARENA_LEFT_LIMIT - 4 || projectile.x > ARENA_RIGHT_LIMIT + 4) {
              return false;
            }

            if (projectile.owner === 'left') {
              const isLowProjectile = projectile.lane === 'low';
              const opponentCanBeHit =
                opponentStatusRef.current !== 'knockdown' &&
                opponentStatusRef.current !== 'launched' &&
                (!isLowProjectile || opponentPositionRef.current.y < 6) &&
                (isLowProjectile || !isOpponentLowProfile()) &&
                Math.abs(projectile.x - opponentPositionRef.current.x) <= 5.5;

              if (!opponentCanBeHit) return true;

              const didDamageThroughBlock = damageOpponentHealth(
                getProjectileDamage(projectile.kind),
                projectile.lane === 'low' ? 'low' : 'high',
              );
              if (didDamageThroughBlock) {
                applyProjectileKnockback(
                  'right',
                  projectile.direction,
                  getProjectileKnockback(projectile.kind),
                );
              }
              playProjectileHitSound();
              didProjectileHit = true;
              return false;
            }

            const playerIsCrouchingNow =
              (keys.has('s') && positionRef.current.y === 0) ||
              (player.id === 'queen' && playerStatusRef.current === 'healing');
            const isLowProjectile = projectile.lane === 'low';
            const playerCanBeHit =
              playerStatusRef.current !== 'knockdown' &&
              playerStatusRef.current !== 'launched' &&
              (!isLowProjectile || positionRef.current.y < 6) &&
              (isLowProjectile || !playerIsCrouchingNow) &&
              Math.abs(projectile.x - positionRef.current.x) <= 5.5;

            if (!playerCanBeHit) return true;

            const didDamageThroughBlock = damagePlayer(
              getProjectileDamage(projectile.kind),
              'none',
              projectile.lane === 'low' ? 'low' : 'high',
            );
            if (didDamageThroughBlock) {
              applyProjectileKnockback(
                'left',
                projectile.direction,
                getProjectileKnockback(projectile.kind),
              );
            }
            playProjectileHitSound();
            didProjectileHit = true;
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
      animationFrame.current = window.requestAnimationFrame(movePlayer);
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    animationFrame.current = window.requestAnimationFrame(movePlayer);

    if (arenaMode === 'sandbox') {
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
        pressedKeys.current.clear();
        jumpVelocity.current = 0;
        opponentJumpVelocity.current = 0;
        playerKnockbackVelocity.current = 0;
        opponentKnockbackVelocity.current = 0;
        attackRef.current = 'idle';
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
        setIsCrouchAttackLocked(false);
        setIsCrouching(false);
        setIsBlocking(false);
        setPlayerSpecialShooting(false);
        setPlayerAirSpecialWave(false);
        setOpponentSpecialShooting(false);
        setOpponentAirSpecialWave(false);
        updateOpponentBlock(false);
        updateOpponentCrouch(false);
        setProjectiles([]);
        setHealPopups([]);
        isBlockingRef.current = false;

        if (attackTimer.current) window.clearTimeout(attackTimer.current);
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
        if (opponentBlockTimer.current) window.clearTimeout(opponentBlockTimer.current);
        if (opponentCrouchTimer.current) window.clearTimeout(opponentCrouchTimer.current);
        if (playerStatusTimer.current) window.clearTimeout(playerStatusTimer.current);
        if (opponentStatusTimer.current) window.clearTimeout(opponentStatusTimer.current);
        if (playerDamageFlashTimer.current) window.clearTimeout(playerDamageFlashTimer.current);
        if (opponentDamageFlashTimer.current) window.clearTimeout(opponentDamageFlashTimer.current);
        if (playerRecoveryTimer.current) window.clearTimeout(playerRecoveryTimer.current);
        if (opponentRecoveryTimer.current) window.clearTimeout(opponentRecoveryTimer.current);
        setPlayerRecovering(false);
        setOpponentRecovering(false);
        if (animationFrame.current) window.cancelAnimationFrame(animationFrame.current);
      };
    }

    opponentAttackInterval.current = window.setInterval(() => {
      if (roundCountdownRef.current > 0 || roundResolvedRef.current) return;

      const distance = Math.abs(opponentPositionRef.current.x - positionRef.current.x);
      const ai = AI_CONFIG[selectedDifficulty];
      const opponentOnGround = opponentPositionRef.current.y === 0;

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

        return (
          projectile.owner === 'left' &&
          isMovingTowardCpu &&
          distanceToCpu < 24
        );
      });

      if (incomingProjectile && Math.random() < dodgeChance) {
        if (incomingProjectile.lane === 'low') {
          opponentJumpVelocity.current = selectedDifficulty === 'hard' ? 10.6 : 9.8;
          return;
        }

        updateOpponentCrouch(true);

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
        startQueenHeal('right');
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

      if (distance <= 30 && Math.random() < ai.jumpChance) {
        opponentJumpVelocity.current = selectedDifficulty === 'hard' ? 10.4 : 9.6;
        return;
      }

      const playerAttackIsLow =
        playerIsAttacking && attackRef.current === 'kick' && pressedKeys.current.has('s');
      const playerAttackIsHigh =
        playerIsAttacking && attackRef.current === 'punch' && !pressedKeys.current.has('s');

      if (playerAttackIsHigh && Math.random() < dodgeChance * 0.55) {
        updateOpponentCrouch(true);

        if (opponentCrouchTimer.current) window.clearTimeout(opponentCrouchTimer.current);
        opponentCrouchTimer.current = window.setTimeout(() => updateOpponentCrouch(false), 380);
        return;
      }

      if (
        (playerIsAttacking && Math.random() < ai.blockChance) ||
        (!playerIsAttacking && Math.random() < ai.blockChance * 0.18)
      ) {
        updateOpponentCrouch(playerAttackIsLow);
        updateOpponentBlock(true);

        if (opponentBlockTimer.current) window.clearTimeout(opponentBlockTimer.current);
        opponentBlockTimer.current = window.setTimeout(
          () => {
            updateOpponentBlock(false);
            if (playerAttackIsLow) updateOpponentCrouch(false);
          },
          selectedDifficulty === 'hard' ? 540 : 420,
        );
        return;
      }

      if (distance > 24) return;

      if (!playerIsAttacking && Math.random() < ai.crouchChance * 0.35) {
        updateOpponentCrouch(true);

        if (opponentCrouchTimer.current) window.clearTimeout(opponentCrouchTimer.current);
        opponentCrouchTimer.current = window.setTimeout(() => updateOpponentCrouch(false), 360);
        return;
      }

      const now = window.performance.now();

      if (now < opponentAttackReadyAt.current || Math.random() > ai.attackChance) return;

      opponentAttackReadyAt.current = now + CPU_ATTACK_COOLDOWN_MS;

      const shouldUseCrouchAttack = distance <= 20 && Math.random() < ai.specialChance;
      const nextAttack: Exclude<Attack, 'idle'> = shouldUseCrouchAttack
        ? Math.random() < 0.55
          ? 'kick'
          : 'punch'
        : Math.random() < (selectedDifficulty === 'easy' ? 0.68 : 0.5)
          ? 'punch'
          : 'kick';
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
        attackEffect === 'uppercut'
          ? CROUCH_UPPERCUT_DURATION_MS + CROUCH_UPPERCUT_RECOVERY_MS
          : nextAttack === 'kick' && attackEffect === 'sweep'
            ? 420
            : ATTACK_DURATION_MS[nextAttack];

      updateOpponentCrouch(shouldUseCrouchAttack);

      updateOpponentAttack(nextAttack);
      playAttackSound(opponent, nextAttack, shouldUseCrouchAttack);
      damagePlayer(attackDamage, attackEffect, hitLevel);

      if (opponentAttackTimer.current) window.clearTimeout(opponentAttackTimer.current);
      opponentAttackTimer.current = window.setTimeout(
        () => {
          updateOpponentAttack('idle');
          updateOpponentCrouch(false);
        },
        attackDuration,
      );
    }, AI_CONFIG[selectedDifficulty].thinkMs);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      pressedKeys.current.clear();
      jumpVelocity.current = 0;
      opponentJumpVelocity.current = 0;
      playerKnockbackVelocity.current = 0;
      opponentKnockbackVelocity.current = 0;
      attackRef.current = 'idle';
      specialInputStep.current = 0;
      specialInputExpiresAt.current = 0;
      specialInputStartedAt.current = 0;
      playerSpecialLockRef.current = false;
      opponentSpecialLockRef.current = false;
      updatePlayerStatus('idle');
      updateOpponentAttack('idle');
      updateOpponentStatus('idle');
      projectilesRef.current = [];
      setIsCrouchAttackLocked(false);
      setIsCrouching(false);
      setIsBlocking(false);
      setPlayerSpecialShooting(false);
      setOpponentSpecialShooting(false);
      updateOpponentBlock(false);
      updateOpponentCrouch(false);
      setProjectiles([]);
      setHealPopups([]);
      isBlockingRef.current = false;

      if (attackTimer.current) window.clearTimeout(attackTimer.current);
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
      if (opponentAttackInterval.current) window.clearInterval(opponentAttackInterval.current);
      if (opponentBlockTimer.current) window.clearTimeout(opponentBlockTimer.current);
      if (opponentCrouchTimer.current) window.clearTimeout(opponentCrouchTimer.current);
      if (playerStatusTimer.current) window.clearTimeout(playerStatusTimer.current);
      if (opponentStatusTimer.current) window.clearTimeout(opponentStatusTimer.current);
      if (playerDamageFlashTimer.current) window.clearTimeout(playerDamageFlashTimer.current);
      if (opponentDamageFlashTimer.current) window.clearTimeout(opponentDamageFlashTimer.current);
      if (playerRecoveryTimer.current) window.clearTimeout(playerRecoveryTimer.current);
      if (opponentRecoveryTimer.current) window.clearTimeout(opponentRecoveryTimer.current);
      setPlayerRecovering(false);
      setOpponentRecovering(false);
      if (animationFrame.current) window.cancelAnimationFrame(animationFrame.current);
    };
  }, [arenaMode, screen, selectedDifficulty]);

  function resetRound({ clearOpponentLoop = false } = {}) {
    if (attackTimer.current) window.clearTimeout(attackTimer.current);
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
    if (clearOpponentLoop && opponentAttackInterval.current) window.clearInterval(opponentAttackInterval.current);
    if (opponentBlockTimer.current) window.clearTimeout(opponentBlockTimer.current);
    if (opponentCrouchTimer.current) window.clearTimeout(opponentCrouchTimer.current);
    if (playerStatusTimer.current) window.clearTimeout(playerStatusTimer.current);
    if (opponentStatusTimer.current) window.clearTimeout(opponentStatusTimer.current);
    if (playerDamageFlashTimer.current) window.clearTimeout(playerDamageFlashTimer.current);
    if (opponentDamageFlashTimer.current) window.clearTimeout(opponentDamageFlashTimer.current);
    if (playerRecoveryTimer.current) window.clearTimeout(playerRecoveryTimer.current);
    if (opponentRecoveryTimer.current) window.clearTimeout(opponentRecoveryTimer.current);
    if (victoryTimer.current) window.clearTimeout(victoryTimer.current);
    if (roundTransitionTimer.current) window.clearTimeout(roundTransitionTimer.current);
    if (roundCurtainTimer.current) window.clearTimeout(roundCurtainTimer.current);
    if (countdownTimer.current) window.clearTimeout(countdownTimer.current);

    setPlayerPosition(START_POSITION);
    setOpponentPosition(OPPONENT_POSITION);
    setPlayerHealth(MAX_HEALTH);
    setOpponentHealth(MAX_HEALTH);
    playerHealthRef.current = MAX_HEALTH;
    opponentHealthRef.current = MAX_HEALTH;
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
    opponentSpecialReadyAt.current = 0;
    attackRef.current = 'idle';
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
    isBlockingRef.current = false;
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
    setIsBlocking(false);
    setPlayerSpecialShooting(false);
    setOpponentSpecialShooting(false);
    setPlayerAirSpecialWave(false);
    setOpponentAirSpecialWave(false);
    setPlayerDamageFlash(false);
    setOpponentDamageFlash(false);
    setRoundWinnerPoseSprite(null);
    setRoundCurtainPhase('idle');
    setRoundCountdown(3);
    roundCountdownRef.current = 3;
  }

  function resetFight() {
    resetRound({ clearOpponentLoop: true });
    setRoundNumber(1);
    setPlayerRoundWins(0);
    setOpponentRoundWins(0);
    setWinnerSide('left');
  }

  function openCharacterSelect(mode: ArenaMode) {
    setArenaMode(mode);
    setScreen('select');
  }

  function startFight() {
    setLockedFighter(selectedFighter);
    setLockedOpponent(selectedOpponent);
    setScreen('stage');
  }

  function startFightOnStage(stageId: string) {
    setSelectedStageId(stageId);
    resetFight();
    playFightStartSound();
    setScreen('arena');
  }

  function rematch() {
    resetFight();
    playFightStartSound();
    setScreen('arena');
  }

  function backToSelect() {
    resetFight();
    setLockedFighter(null);
    setLockedOpponent(null);
    setScreen('select');
  }

  function backToMainMenu() {
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

  const settingsOverlay = (
    <div className="settings-widget">
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
        <div className="settings-panel" role="dialog" aria-label="Настройки звука">
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
        </div>
      )}
    </div>
  );

  if (screen === 'victory') {
    const winner = winnerSide === 'left' ? player : opponent;
    const winnerLabel = winnerSide === 'left' ? 'Игрок 1' : 'Игрок 2';

    return (
      <main className="game-shell game-shell--menu-bg">
        {settingsOverlay}
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
        {settingsOverlay}
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

  if (screen === 'stage') {
    return (
      <main className="game-shell game-shell--menu-bg">
        {settingsOverlay}
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
    const arenaWinnerSide = opponentHealth <= 0 ? 'left' : playerHealth <= 0 ? 'right' : null;
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

    return (
      <main className="game-shell game-shell--menu-bg">
        {settingsOverlay}
        <section className="arena-screen" aria-label="Игровое поле">
          <div className="arena-hud">
            <FighterBadge fighter={player} label="P1" health={playerHealth} />
            <span className="round-label">Round {roundNumber} - {playerRoundWins}:{opponentRoundWins}</span>
            <FighterBadge
              fighter={opponent}
              label={arenaMode === 'sandbox' ? 'DUMMY' : 'CPU'}
              health={opponentHealth}
              infiniteHealth={arenaMode === 'sandbox'}
              alignRight
            />
          </div>

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
            {projectiles.map((projectile) => (
              projectile.kind === 'queen-heal-wave' ? (
                <span
                  className={`special-projectile special-projectile--queen-heal-wave special-projectile--${projectile.lane} special-projectile--${projectile.owner}`}
                  aria-hidden="true"
                  key={projectile.id}
                  style={{ left: `${getArenaScreenX(projectile.x)}%` }}
                />
              ) : (
                <img
                  className={`special-projectile special-projectile--${projectile.kind} special-projectile--${projectile.lane} special-projectile--${projectile.owner}`}
                  src={projectile.kind === 'queen-wave' ? queenProjectileSprite : misterAntTennaProjectileSprite}
                  alt=""
                  aria-hidden="true"
                  key={projectile.id}
                  style={{ left: `${getArenaScreenX(projectile.x)}%` }}
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
            {knightAfterimages.map((afterimage) => (
              <img
                className={`knight-afterimage knight-afterimage--${afterimage.side} knight-afterimage--face-${afterimage.facing}`}
                src={roaringKnightSprite}
                alt=""
                aria-hidden="true"
                key={afterimage.id}
                style={{
                  left: `${getArenaScreenX(afterimage.x)}%`,
                  bottom: `${104 + (selectedStage.fighterLift ?? 0) + afterimage.y}px`,
                }}
              />
            ))}
            <StickFighter
              fighter={player}
              side="left"
              facing={playerPosition.x <= opponentPosition.x ? 'right' : 'left'}
              attack={attack}
              isCrouching={playerStatus === 'idle' && (isCrouching || isCrouchAttackLocked)}
              isBlocking={isBlocking}
              position={playerPosition}
              status={playerStatus}
              isShootingSpecial={playerSpecialShooting}
              isDefeated={playerHealth <= 0}
              isDamageFlashing={playerDamageFlash}
              isRecovering={playerRecovering}
              victorySprite={playerVictorySprite}
              floorLift={selectedStage.fighterLift ?? 0}
              onTennaAirSpecialSpriteStart={playTennaAirWaveSound}
              onTennaStarSpecialSpriteStart={playTennaStarSpecialSound}
              onQueenSpecialSpriteStart={playQueenCupThrowSound}
            />
            <StickFighter
              fighter={opponent}
              side="right"
              facing={opponentPosition.x <= playerPosition.x ? 'right' : 'left'}
              attack={opponentAttack}
              isCrouching={opponentStatus === 'idle' && opponentCrouching}
              isBlocking={opponentBlocking}
              position={opponentPosition}
              status={opponentStatus}
              isShootingSpecial={opponentSpecialShooting}
              isDefeated={opponentHealth <= 0}
              isDamageFlashing={opponentDamageFlash}
              isRecovering={opponentRecovering}
              victorySprite={opponentVictorySprite}
              floorLift={selectedStage.fighterLift ?? 0}
              onTennaAirSpecialSpriteStart={playTennaAirWaveSound}
              onTennaStarSpecialSpriteStart={playTennaStarSpecialSound}
              onQueenSpecialSpriteStart={playQueenCupThrowSound}
            />
          </div>

          <div className="arena-controls">
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
        {settingsOverlay}
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
              onClick={() => openModeDoor('fight')}
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
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className={`game-shell game-shell--menu-bg${isScreenRevealing ? ' game-shell--screen-reveal' : ''}`}>
      {settingsOverlay}
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
  alignRight = false,
}: {
  fighter: Fighter;
  label: string;
  health: number;
  infiniteHealth?: boolean;
  alignRight?: boolean;
}) {
  const visibleHealth = infiniteHealth ? MAX_HEALTH : health;

  return (
    <div className={`fighter-badge${alignRight ? ' fighter-badge--right' : ''}`}>
      <div className="badge-topline">
        <span className="badge-label">{label}</span>
        <span className="badge-name">{fighter.name}</span>
      </div>
      <div className="health-track" aria-label={`Здоровье ${fighter.name}: ${health}`}>
        <span className="health-fill" style={{ width: `${visibleHealth}%` }} />
        {infiniteHealth && <span className="health-infinity">∞</span>}
      </div>
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
  const playedQueenVictorySound = useRef(false);
  const playedTennaVictoryThreeSound = useRef(false);
  const playedAirSpecialSound = useRef(false);
  const playedTennaStarSpecialSound = useRef(false);
  const playedQueenSpecialSound = useRef(false);
  const [walkDirection, setWalkDirection] = useState<'idle' | 'forward' | 'backward'>('idle');
  const [jumpPhase, setJumpPhase] = useState<'rising' | 'falling'>('rising');
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

    return () => {
      queenVictorySoundRef.current = null;
      tennaVictoryThreeSoundRef.current = null;
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
      return;
    }

    if (deltaY < -0.01) {
      setJumpPhase('falling');
    } else if (deltaY > 0.01) {
      setJumpPhase('rising');
    }
  }, [position.y]);

  const isCrouchPunchSprite =
    isCrouching && attack === 'punch' && Boolean(fighter.crouchPunchSprite);
  const isCrouchKickSprite =
    isCrouching && attack === 'kick' && Boolean(fighter.crouchKickSprite);
  const isStandingPunchStrip =
    attack === 'punch' && !isCrouching && fighter.id === 'queen' && Boolean(fighter.punchSprite);
  const isKickSprite = attack === 'kick' && !isCrouchKickSprite && Boolean(fighter.kickSprite);
  const isJumpSprite =
    position.y > 0 && attack === 'idle' && !isCrouching && !isShootingSpecial && Boolean(fighter.jumpSprite);
  const isKnockdownSprite = status === 'knockdown' && Boolean(fighter.knockdownSprite);
  const isAirSpecialSprite =
    isShootingSpecial && position.y > 0 && Boolean(fighter.airSpecialSprite);
  const isSpecialSprite = isShootingSpecial && Boolean(fighter.specialSprite);
  const isQueenSpecialSprite = isSpecialSprite && !isAirSpecialSprite && fighter.id === 'queen';
  const isDefeatSprite = isDefeated && Boolean(fighter.defeatSprite);
  const isVictorySprite = !isDefeated && Boolean(victorySprite) && canShowVictoryPose;
  const isQueenVictoryBackdrop =
    isVictorySprite && fighter.id === 'queen' && victorySprite === queenVictoryBackdropSprite;
  const isQueenVictoryStrip =
    isVictorySprite && fighter.id === 'queen' && victorySprite === queenVictorySprite;

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
  const isDefeatStrip = isDefeatSprite && fighter.id === 'mister-ant-tenna';
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
      : isVictorySprite && !isQueenVictoryBackdrop
      ? victorySprite
      : isAirSpecialSprite
        ? fighter.airSpecialSprite
        : isSpecialSprite
        ? fighter.specialSprite
        : isHealingSprite
        ? fighter.healSprite
        : isKnockdownSprite
        ? fighter.knockdownSprite
        : isCrouchPunchSprite
          ? fighter.crouchPunchSprite
          : isCrouchKickSprite
            ? fighter.crouchKickSprite
            : isCrouching && fighter.crouchSprite
              ? fighter.crouchSprite
              : attack === 'punch' && fighter.punchSprite
                ? fighter.punchSprite
                : isKickSprite
                  ? fighter.kickSprite
                  : isJumpSprite
                    ? fighter.jumpSprite
                    : isWalkSprite
                      ? fighter.walkSprite
                      : fighter.battleSprite;
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
  }${isAirSpecialSprite ? ' battle-sprite--air-special' : ''
  }${isQueenSpecialSprite ? ' battle-sprite--queen-special' : ''
  }${isHealingSprite ? ' battle-sprite--healing' : ''
  }${isKnockdownSprite ? ' battle-sprite--knockdown' : ''
  }${isDefeatSprite ? ' battle-sprite--defeat' : ''
  }${isVictorySprite && !isQueenVictoryBackdrop ? ' battle-sprite--round-victory' : ''
  }${isWalkSprite ? ' battle-sprite--walk' : ''
  }${isWalkSprite && walkDirection === 'backward' ? ' battle-sprite--walk-backward' : ''
  }${isJumpSprite ? ' battle-sprite--jump' : ''
  }${isJumpSprite && jumpPhase === 'falling' ? ' battle-sprite--jump-falling' : ''
  }`;
  const className = `stick-fighter stick-fighter--${fighter.id} stick-fighter--${side} stick-fighter--face-${facing} stick-fighter--${attack}${
    isCrouching ? ' stick-fighter--crouch' : ''
  }${isShootingSpecial ? ' stick-fighter--special' : ''}${isBlocking ? ' stick-fighter--block' : ''}${
    status !== 'idle' ? ` stick-fighter--${status}` : ''
  }${isDamageFlashing ? ' stick-fighter--damage-flash' : ''}${isRecovering ? ' stick-fighter--recovering' : ''}`;

  return (
    <div className={className} style={getArenaFighterStyle(fighter, position, floorLift)}>
      {isBlocking && <div className="block-label">BLOCK</div>}
      {battleSprite && (isKickSprite || isJumpSprite || isCrouchPunchSprite || isDefeatStrip || isWalkSprite || isStandingPunchStrip || isQueenSpecialSprite || isQueenVictoryStrip) ? (
        <span
          className={spriteClassName}
          style={{ backgroundImage: `url(${battleSprite})` }}
          aria-hidden="true"
        />
      ) : battleSprite ? (
        <img
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

function getArenaFighterStyle(fighter: Fighter, position: Position, floorLift = 0): ArenaFighterStyle {
  return {
    '--fighter-color': fighter.color,
    '--fighter-shadow': fighter.shadow,
    left: `${getArenaScreenX(position.x)}%`,
    bottom: `${94 + floorLift + position.y}px`,
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
  const hasRightLandingSpace = opponentX + FIGHTER_COLLISION_GAP <= ARENA_RIGHT_LIMIT;
  const hasLeftLandingSpace = opponentX - FIGHTER_COLLISION_GAP >= ARENA_LEFT_LIMIT;

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
  const hasRightLandingSpace = playerX + FIGHTER_COLLISION_GAP <= ARENA_RIGHT_LIMIT;
  const hasLeftLandingSpace = playerX - FIGHTER_COLLISION_GAP >= ARENA_LEFT_LIMIT;

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

function getGameKey(event: KeyboardEvent) {
  const keyByCode: Record<string, string> = {
    KeyW: 'w',
    KeyA: 'a',
    KeyS: 's',
    KeyD: 'd',
    ArrowLeft: 'arrowleft',
    ArrowRight: 'arrowright',
    ArrowDown: 'arrowdown',
    ArrowUp: 'arrowup',
    ShiftRight: 'block',
  };

  return keyByCode[event.code] ?? event.key.toLowerCase();
}
