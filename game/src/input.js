// Sizzle & Serve — input.js
// One job: turn mouse clicks and keys into game actions. Hit-testing reads
// the same SIZZLE_LAYOUT rects render.js draws, so clicks land where the
// picture says they should.

function sizzlePointInRect(x, y, rect) {
  return x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;
}

// Which counter bin (if any) holds canvas point (x, y)? Bins are laid out
// in sizzleDrawCounter; this mirrors that arithmetic exactly.
function sizzleCounterBinAt(x, y) {
  const c = SIZZLE_LAYOUT.counter;
  const binW = 92;
  const gap = (c.w - SIZZLE_INGREDIENTS.length * binW) / (SIZZLE_INGREDIENTS.length + 1);
  const binTop = c.y + 38;
  const binBottom = binTop + 128;
  if (y < binTop || y > binBottom) return null;
  for (let i = 0; i < SIZZLE_INGREDIENTS.length; i++) {
    const binX = c.x + gap + i * (binW + gap);
    if (x >= binX && x <= binX + binW) return SIZZLE_INGREDIENTS[i];
  }
  return null;
}

function sizzleHandleClick(state, x, y) {
  SizzleAudio.ensure();
  if (state.screen === 'title') {
    state.screen = 'playing';
    return;
  }
  if (state.screen === 'over') {
    Object.assign(state, sizzleNewState(), { screen: 'playing' });
    return;
  }
  if (state.screen === 'paused') {
    state.screen = 'playing';
    return;
  }
  if (sizzlePointInRect(x, y, SIZZLE_LAYOUT.grill)) {
    sizzleTakeFromStation(state, 'grill');
    return;
  }
  if (sizzlePointInRect(x, y, SIZZLE_LAYOUT.fryer)) {
    sizzleTakeFromStation(state, 'fryer');
    return;
  }
  if (sizzlePointInRect(x, y, SIZZLE_LAYOUT.pass)) {
    sizzleServe(state);
    return;
  }
  if (sizzlePointInRect(x, y, SIZZLE_LAYOUT.trash)) {
    sizzleTrash(state);
    return;
  }
  const bin = sizzleCounterBinAt(x, y);
  if (bin) sizzleAddIngredient(state, bin.id);
}

function sizzleHandleKey(state, key) {
  SizzleAudio.ensure();
  const k = key.length === 1 ? key.toUpperCase() : key;
  if (k === 'M') {
    state.muted = SizzleAudio.toggleMute();
    sizzleSay(state, state.muted ? 'Sound off' : 'Sound on');
    return;
  }
  if (k === 'P') {
    if (state.screen === 'playing') state.screen = 'paused';
    else if (state.screen === 'paused') state.screen = 'playing';
    return;
  }
  if (state.screen === 'title' && (k === ' ' || k === 'ENTER')) {
    state.screen = 'playing';
    return;
  }
  if (state.screen === 'over' && (k === ' ' || k === 'ENTER')) {
    Object.assign(state, sizzleNewState(), { screen: 'playing' });
    return;
  }
  if (state.screen !== 'playing') return;
  if (k === ' ') {
    sizzleServe(state);
    return;
  }
  if (k === 'T') {
    sizzleTrash(state);
    return;
  }
  const ing = SIZZLE_INGREDIENTS.find((item) => item.key === k);
  if (ing) sizzleAddIngredient(state, ing.id);
}

// Wire a canvas element to a state: click coordinates are scaled from the
// element's displayed size back to the 1280x720 game space.
function sizzleBindInput(canvas, state) {
  canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) * (SIZZLE_CONFIG.canvasWidth / rect.width);
    const y = (event.clientY - rect.top) * (SIZZLE_CONFIG.canvasHeight / rect.height);
    sizzleHandleClick(state, x, y);
  });
  window.addEventListener('keydown', (event) => {
    if (event.key === ' ') event.preventDefault();
    sizzleHandleKey(state, event.key);
  });
}
