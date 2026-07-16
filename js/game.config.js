// ═══════════════════════════════════════════════════════
//  GLITZ OF HORIZON — MASTER GAME CONFIG
//  js/game.config.js
//  Edit file ini untuk adjust semua variable game
//  Jangan ubah struktur key — hanya nilai (value) nya
// ═══════════════════════════════════════════════════════

const GLITZ_CONFIG = {

  // ─────────────────────────────────────────────────────
  //  UNIT DEFINITIONS
  //  counters : unit ini kuat melawan siapa
  //  weakTo   : unit ini lemah melawan siapa
  //  modelPath: path ke file .glb (isi setelah asset siap)
  // ─────────────────────────────────────────────────────
  units: {
    sword: {
      sign:      '⚔️',
      label:     'Swordsman',
      hp:        1000,
      move:      3,
      range:     1,
      stDrain:   15,
      color:     0x607d8b,
      shape:     'square',
      modelPath: 'assets/units/sword.glb',
      scale:     [0.5, 0.7, 0.5],
      perk:      'Balanced Infantry. Holds the line.',
      counters:  ['archer'],
      weakTo:    ['horse'],
    },
    archer: {
      sign:      '🏹',
      label:     'Archer',
      hp:        800,
      move:      3,
      range:     3,
      stDrain:   15,
      color:     0x5c6bc0,
      shape:     'triangle',
      modelPath: 'assets/units/archer.glb',
      scale:     [0.5, 0.7, 0.5],
      perk:      'Wind affects arrows. Ranged threat.',
      counters:  ['horse'],
      weakTo:    ['sword'],
    },
    horse: {
      sign:      '♞',
      label:     'Horseman',
      hp:        1200,
      move:      5,
      range:     1,
      stDrain:   15,
      color:     0x424242,
      shape:     'long_rect',
      modelPath: 'assets/units/horse.glb',
      scale:     [0.5, 0.5, 0.9],
      perk:      'Flank causes run. High mobility.',
      counters:  ['sword'],
      weakTo:    ['spear'],
    },
    spear: {
      sign:      '⇂',
      label:     'Spearman',
      hp:        1000,
      move:      2,
      range:     1,
      stDrain:   25,
      color:     0x8d6e63,
      shape:     'stick',
      modelPath: 'assets/units/spear.glb',
      scale:     [0.15, 0.9, 0.15],
      perk:      'Pushback horses. Anti-cavalry.',
      counters:  ['horse'],
      weakTo:    ['archer'],
    }
  },

  // ─────────────────────────────────────────────────────
  //  TERRAIN TYPES
  //  moveCost     : berapa stamina extra untuk masuk tile ini
  //  defBonus     : % damage reduction saat diserang di sini
  //  canAmbush    : unit bisa bersembunyi di sini
  //  provideCover : unit tidak terlihat dari jauh
  //  blockedFor   : array unit type yang tidak bisa masuk
  //  rangeBonus   : extra jangkauan ranged unit di tile ini
  // ─────────────────────────────────────────────────────
  terrain: {
    plains: {
      label:        'Plains',
      icon:         '🌾',
      moveCost:     1,
      defBonus:     0,
      colorHex:     '#aed581',
      canAmbush:    false,
      provideCover: false,
      blockedFor:   [],
      rangeBonus:   0,
      desc:         'Open ground. No advantage.',
    },
    forest: {
      label:        'Forest',
      icon:         '🌲',
      moveCost:     2,
      defBonus:     15,
      colorHex:     '#388e3c',
      canAmbush:    true,
      provideCover: true,
      blockedFor:   [],
      rangeBonus:   0,
      desc:         'Slows movement. Units can hide here.',
    },
    hill: {
      label:        'Hill',
      icon:         '⛰️',
      moveCost:     2,
      defBonus:     20,
      colorHex:     '#8d6e63',
      canAmbush:    false,
      provideCover: false,
      blockedFor:   [],
      rangeBonus:   1,
      desc:         'High ground. Ranged +1 range.',
    },
    mud: {
      label:        'Mud',
      icon:         '💧',
      moveCost:     2,
      defBonus:     -10,
      colorHex:     '#795548',
      canAmbush:    false,
      provideCover: false,
      blockedFor:   [],
      rangeBonus:   0,
      desc:         'Created by Rain. Slows and weakens.',
    },
    river: {
      label:        'River',
      icon:         '🌊',
      moveCost:     3,
      defBonus:     -15,
      colorHex:     '#29b6f6',
      canAmbush:    false,
      provideCover: false,
      blockedFor:   ['horse'],
      rangeBonus:   0,
      desc:         'Horse cannot cross. Dangerous to cross.',
    },
    road: {
      label:        'Road',
      icon:         '🛤️',
      moveCost:     0,
      defBonus:     0,
      colorHex:     '#bdbdbd',
      canAmbush:    false,
      provideCover: false,
      blockedFor:   [],
      rangeBonus:   0,
      desc:         'Fast movement. No terrain bonus.',
    },
  },

  // ─────────────────────────────────────────────────────
  //  ENVIRONMENT OBJECTS
  //  Ditaruh di atas tile sebagai dekorasi + mechanic
  //  blocksMovement : tile tidak bisa dimasuki unit
  //  blocksVision   : tile di belakangnya tidak terlihat
  //  provideCover   : unit di tile ini bisa ambush
  // ─────────────────────────────────────────────────────
  environment: {
    tree: {
      modelPath:      'assets/environment/tree_low.glb',
      scale:          [0.4, 0.6, 0.4],
      provideCover:   true,
      blocksVision:   true,
      blocksMovement: false,
    },
    bush: {
      modelPath:      'assets/environment/bush.glb',
      scale:          [0.5, 0.3, 0.5],
      provideCover:   true,
      blocksVision:   false,
      blocksMovement: false,
    },
    rock: {
      modelPath:      'assets/environment/rock.glb',
      scale:          [0.4, 0.4, 0.4],
      provideCover:   false,
      blocksVision:   false,
      blocksMovement: true,
    },
  },

  // ─────────────────────────────────────────────────────
  //  WEATHER
  //  stDrainBonus  : tambahan stamina drain per aksi
  //  visionRange   : max tile jarak penglihatan
  //  archerAccMod  : multiplier akurasi archer (1.0 = normal)
  //  mudChance     : probabilitas tile plains jadi mud (0-1)
  //  moveMod       : pengurangan move semua unit
  //  fogOfWar      : semua enemy hidden kecuali adjacent
  // ─────────────────────────────────────────────────────
  weather: {
    sun: {
      icon:         '☀️',
      label:        'Bright',
      stDrainBonus: 15,
      visionRange:  10,
      archerAccMod: 1.0,
      mudChance:    0,
      moveMod:      0,
      fogOfWar:     false,
    },
    rain: {
      icon:         '🌧️',
      label:        'Mud Season',
      stDrainBonus: 0,
      visionRange:  4,
      archerAccMod: 0.8,
      mudChance:    0.3,
      moveMod:      -1,
      fogOfWar:     false,
    },
    moon: {
      icon:         '🌙',
      label:        'Night',
      stDrainBonus: 0,
      visionRange:  5,
      archerAccMod: 0.9,
      mudChance:    0,
      moveMod:      0,
      fogOfWar:     false,
    },
    fog: {
      icon:         '🌫️',
      label:        'Fog of War',
      stDrainBonus: 0,
      visionRange:  2,
      archerAccMod: 0.7,
      mudChance:    0,
      moveMod:      0,
      fogOfWar:     true,
    },
    snow: {
      icon:         '❄️',
      label:        'Blizzard',
      stDrainBonus: 10,
      visionRange:  3,
      archerAccMod: 0.8,
      mudChance:    0,
      moveMod:      -1,
      fogOfWar:     false,
    },
  },

  // ─────────────────────────────────────────────────────
  //  BATTLE RULES
  // ─────────────────────────────────────────────────────
  battle: {
    gridX:           10,
    gridZ:           14,
    tileSize:        1.0,
    tileGap:         0.02,
    walkSpeed:       4.5,
    baseDamage:      100,
    recoilRatio:     0.075,
    backstabMult:    1.30,
    sidestabMult:    1.10,
    stRecoverPerTurn:15,
    dailyBattleLimit:8,
    maxTurns:        30,
  },

  // ─────────────────────────────────────────────────────
  //  AMBUSH SYSTEM
  //  revealRange  : jarak (tile) musuh terlihat dari cover
  //  bonusDmgMult : damage multiplier serangan pertama
  // ─────────────────────────────────────────────────────
  ambush: {
    enabled:      true,
    revealRange:  1,
    bonusDmgMult: 1.5,
    requiresCover:true,
  },

  // ─────────────────────────────────────────────────────
  //  WIND DIRECTIONS
  //  Mempengaruhi akurasi dan damage archer
  // ─────────────────────────────────────────────────────
  winds: [
    { id:'N',  deg:0,   vec:{ x:0,  z:-1 } },
    { id:'NE', deg:45,  vec:{ x:1,  z:-1 } },
    { id:'E',  deg:90,  vec:{ x:1,  z:0  } },
    { id:'SE', deg:135, vec:{ x:1,  z:1  } },
    { id:'S',  deg:180, vec:{ x:0,  z:1  } },
    { id:'SW', deg:225, vec:{ x:-1, z:1  } },
    { id:'W',  deg:270, vec:{ x:-1, z:0  } },
    { id:'NW', deg:315, vec:{ x:-1, z:-1 } },
  ],

  // ─────────────────────────────────────────────────────
  //  PLAYER COMBAT TITLES
  //  Dihitung dari rasio unit yang paling sering dipakai
  // ─────────────────────────────────────────────────────
  titles: {
    'Iron Linebreaker':   'Tembok pertahanan pejal, dominasi garis depan.',
    'Blitz Cavalry':      'Pasukan kilat pengacau formasi musuh.',
    'Phantom Skirmisher': 'Taktik hit-and-run mematikan dari bayang-bayang.',
    'Phalanx Warden':     'Dinding tombak tak tergoyahkan.',
    'Balanced Vanguard':  'Seimbang dan tangguh di segala situasi.',
    'Eagle Eye Marksman': 'Fokus serangan jarak jauh yang presisi.',
    'Swift Flanker':      'Mobilitas tinggi untuk serangan sayap.',
    'Tactical Commander': 'Ahli strategi adaptif.',
    'Recruit':            'Memulai perjalanan di medan pertempuran.',
  },

  // ─────────────────────────────────────────────────────
  //  WORLD MAP BUILDINGS  (v2 — belum aktif)
  //  upgradesTo : null berarti level maksimal
  // ─────────────────────────────────────────────────────
  buildings: {
    camp:    { maxPop:50,   trainSlots:1, defBonus:5,  upgradesTo:'village' },
    village: { maxPop:200,  trainSlots:2, defBonus:10, upgradesTo:'town'    },
    town:    { maxPop:1000, trainSlots:3, defBonus:20, upgradesTo:'city'    },
    city:    { maxPop:5000, trainSlots:4, defBonus:35, upgradesTo:'castle'  },
    castle:  { maxPop:null, trainSlots:6, defBonus:60, upgradesTo:null      },
  },

};

// ─────────────────────────────────────────────────────
//  HELPER FUNCTIONS
//  Fungsi kecil yang dipakai semua file
// ─────────────────────────────────────────────────────

// Ambil random weather berdasarkan key
function getRandomWeather() {
  const keys = Object.keys(GLITZ_CONFIG.weather);
  // Hanya sun/rain/moon untuk v1 — fog & snow dilock
  const v1Keys = ['sun', 'rain', 'moon'];
  const key = v1Keys[Math.floor(Math.random() * v1Keys.length)];
  return { id: key, ...GLITZ_CONFIG.weather[key] };
}

// Ambil random wind
function getRandomWind() {
  const winds = GLITZ_CONFIG.winds;
  return winds[Math.floor(Math.random() * winds.length)];
}

// Hitung combat title dari usage stats
function getCombatTitle(inf, arch, horse, spear) {
  const total = inf + arch + horse + spear;
  if (total === 0) return 'Recruit';
  const i = inf/total, a = arch/total, h = horse/total, s = spear/total;

  if (i >= 0.65 && h <= 0.1)  return 'Iron Linebreaker';
  if (h >= 0.65 && a <= 0.1)  return 'Blitz Cavalry';
  if (a >= 0.65 && i <= 0.1)  return 'Phantom Skirmisher';
  if (s >= 0.5)                return 'Phalanx Warden';
  if (i >= 0.4 && a >= 0.2 && h >= 0.2) return 'Balanced Vanguard';
  if (a >= 0.4 && i >= 0.2 && h >= 0.2) return 'Eagle Eye Marksman';
  if (h >= 0.4 && i >= 0.2 && a >= 0.2) return 'Swift Flanker';
  return 'Tactical Commander';
}

// Ambil deskripsi title
function getTitleDesc(title) {
  return GLITZ_CONFIG.titles[title] || GLITZ_CONFIG.titles['Recruit'];
}
