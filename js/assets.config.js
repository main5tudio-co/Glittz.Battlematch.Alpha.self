// ═══════════════════════════════════════════════════════
//  GLITZ — ASSET CONNECTOR
//  js/assets.config.js
//  Satu tempat untuk semua path asset + audio sprite segments.
//  Kalau nambah/rename file di GitHub asset/ folder, cukup
//  update object di bawah — nggak perlu sentuh battle logic.
// ═══════════════════════════════════════════════════════

const ASSET_ROOT = 'asset';

// ─────────────────────────────────────────────────────
//  3D MODELS  (asset/units/)
// ─────────────────────────────────────────────────────
const UNIT_MODELS = {
  sword:  `${ASSET_ROOT}/units/swordman.gltf`,
  archer: `${ASSET_ROOT}/units/archer.gltf`,
  horse:  `${ASSET_ROOT}/units/horseman.gltf`,
  spear:  `${ASSET_ROOT}/units/spearman.gltf`,
};

// ─────────────────────────────────────────────────────
//  UNIT AUDIO  (asset/audfx/)
//  Sekarang baru ada 7 file, belum lengkap a-f per unit.
//  Setiap kategori punya fallback ke file umum kalau
//  file khusus unit itu belum ada — jadi nggak error,
//  tinggal isi filenya belakangan pas asset nambah.
//
//  tap: satu file, dibagi jadi 3 segmen waktu (start/end
//  detik) sesuai brief kamu — 90% / 60% / 20% confidence.
//  Ganti angka start/end setelah kamu tau durasi asli file.
// ─────────────────────────────────────────────────────
const UNIT_AUDIO = {
  sword: {
    tap:      { file: `${ASSET_ROOT}/audfx/Swordmen.. ready.wav`, segments: { high: [0, 0.6], mid: [0.6, 1.3], low: [1.3, 2.0] } },
    move:     `${ASSET_ROOT}/audfx/step march foot.wav`,
    attack:   `${ASSET_ROOT}/audfx/sword sure.wav`,
    critical: null,   // TODO: belum ada file — fallback ke attack
    defend:   null,   // TODO: belum ada file
    lose:     null,   // TODO: belum ada file
  },
  archer: {
    tap:      { file: `${ASSET_ROOT}/audfx/tapped_common.wav`, segments: { high: [0, 0.6], mid: [0.6, 1.3], low: [1.3, 2.0] } },
    move:     `${ASSET_ROOT}/audfx/step march foot.wav`,
    attack:   `${ASSET_ROOT}/audfx/fly archers.wav`,
    critical: null,
    defend:   null,
    lose:     null,
  },
  horse: {
    tap:      { file: `${ASSET_ROOT}/audfx/horsie tapp.wav`, segments: { high: [0, 0.6], mid: [0.6, 1.3], low: [1.3, 2.0] } },
    move:     `${ASSET_ROOT}/audfx/horse manuver.wav`,
    attack:   null,   // TODO
    critical: null,
    defend:   null,
    lose:     null,
  },
  spear: {
    tap:      { file: `${ASSET_ROOT}/audfx/tapped_common.wav`, segments: { high: [0, 0.6], mid: [0.6, 1.3], low: [1.3, 2.0] } },
    move:     `${ASSET_ROOT}/audfx/step march foot.wav`,
    attack:   null,   // TODO
    critical: null,
    defend:   null,
    lose:     null,
  },
};

// ─────────────────────────────────────────────────────
//  BGM  (asset/bgm/)
//  Baru ada 2 track, belum 4 seperti brief (weather /
//  1st conflict / near victory / tough fight). Map
//  sementara, tambah key baru pas file nambah.
// ─────────────────────────────────────────────────────
const BGM_TRACKS = {
  weather:      `${ASSET_ROOT}/bgm/rainy thunder field.ogg`,
  firstConflict:`${ASSET_ROOT}/bgm/confront trigger.ogg`,
  nearVictory:  null,   // TODO: belum ada file
  toughFight:   null,   // TODO: belum ada file
};

// ─────────────────────────────────────────────────────
//  TERRAIN  (asset/terrain/object/, asset/terrain/texture/)
//  Belum ada file model — masih placeholder txt.
// ─────────────────────────────────────────────────────
const TERRAIN_OBJECTS = {
  tree: null,  // TODO
  bush: null,  // TODO
  rock: null,  // TODO
};

// ─────────────────────────────────────────────────────
//  HELPER — play a tap segment by confidence tier
//  Sama pola dengan gunshot sprite: 1 buffer, banyak segmen,
//  irit HTTP request buat mobile.
// ─────────────────────────────────────────────────────
function playTapSegment(audioCtx, buffer, tier /* 'high' | 'mid' | 'low' */) {
  const unitKey = Object.keys(UNIT_AUDIO).find(k => UNIT_AUDIO[k].tap);
  // Caller biasanya sudah tau unit-nya; contoh generic:
  const seg = buffer._segments?.[tier];
  if (!seg) return;
  const [start, end] = seg;
  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.connect(audioCtx.destination);
  source.start(0, start, end - start);
}

// Resolve audio path with fallback, so missing files don't crash the game
function resolveUnitSound(unitType, category) {
  const unit = UNIT_AUDIO[unitType];
  if (!unit) return null;
  const entry = unit[category];
  if (entry && typeof entry === 'string') return entry;
  if (entry && entry.file) return entry.file;
  // fallback chain: attack -> tap common, critical/defend/lose -> attack
  if (category !== 'tap' && unit.attack) return unit.attack;
  return unit.tap ? unit.tap.file : `${ASSET_ROOT}/audfx/tapped_common.wav`;
}
