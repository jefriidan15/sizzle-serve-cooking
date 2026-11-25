// Sizzle & Serve — state.js
// One job: the game's state and its rules — orders, cooking, plating,
// serving, scoring and the shift clock. Rendering never mutates state;
// input calls these functions and main.js ticks them.

function sizzleNewState() {
  return {
    screen: 'title', // title | playing | paused | over
    timeLeft: SIZZLE_CONFIG.shiftSeconds,
    elapsed: 0,
    score: 0,
    combo: 0,
    bestCombo: 0,
    lives: SIZZLE_CONFIG.maxLives,
    served: 0,
    expired: 0,
    burned: 0,
    dishesServed: {},
    orders: [], // {id, recipeId, timeLeft, total}
    nextOrderId: 1,
    spawnIn: SIZZLE_CONFIG.firstOrderDelay,
    plate: [], // cooked/ready ingredient ids on the assembly plate
    grill: null, // {ingredientId, progress, burnAt} | null
    fryer: null, // {ingredientId, progress, burnAt} | null
    floaters: [], // {x, y, text, color, ttl}
    message: '',
    messageTtl: 0,
    servedDish: null, // last served dish name, for the end screen
    muted: false,
    flashRed: 0,
  };
}

// Difficulty ramp: orders arrive faster and their timers shrink as the
// shift goes on. `elapsed` is seconds into the shift.
function sizzleSpawnInterval(elapsed) {
  const progress = Math.min(1, elapsed / SIZZLE_CONFIG.shiftSeconds);
  return Math.max(
    SIZZLE_CONFIG.orderSpawnMin,
    SIZZLE_CONFIG.orderSpawnBase - progress * 8,
  );
}

function sizzleOrderTime(elapsed) {
  const progress = Math.min(1, elapsed / SIZZLE_CONFIG.shiftSeconds);
  return Math.max(
    SIZZLE_CONFIG.orderTimeMin,
    SIZZLE_CONFIG.orderTimeBase - progress * 16,
  );
}

function sizzlePickRecipe(elapsed) {
  // Early on the no-cook salad shows up often; the grill and fryer dishes
  // take over as the shift heats up.
  const progress = Math.min(1, elapsed / SIZZLE_CONFIG.shiftSeconds);
  const roll = Math.random();
  if (progress < 0.25 && roll < 0.45) return SIZZLE_RECIPES[2];
  if (roll < 0.5) return SIZZLE_RECIPES[0];
  if (roll < 0.85) return SIZZLE_RECIPES[1];
  return SIZZLE_RECIPES[2];
}

function sizzleSpawnOrder(state) {
  if (state.orders.length >= SIZZLE_CONFIG.maxOrders) return;
  const recipe = sizzlePickRecipe(state.elapsed);
  const time = sizzleOrderTime(state.elapsed);
  state.orders.push({
    id: state.nextOrderId++,
    recipeId: recipe.id,
    timeLeft: time,
    total: time,
  });
}

// An ingredient clicked on the counter: a raw item that needs heat goes to
// its station; anything else lands straight on the plate.
function sizzleAddIngredient(state, ingredientId) {
  const ing = sizzleIngredientById(ingredientId);
  if (!ing || state.screen !== 'playing') return false;
  if (ing.station === 'grill') {
    if (state.grill) { sizzleSay(state, 'Grill is busy!'); return false; }
    state.grill = { ingredientId, progress: 0, burnAt: SIZZLE_CONFIG.burnSeconds };
    SizzleAudio.startSizzle();
    return true;
  }
  if (ing.station === 'fryer') {
    if (state.fryer) { sizzleSay(state, 'Fryer is busy!'); return false; }
    state.fryer = { ingredientId, progress: 0, burnAt: SIZZLE_CONFIG.fryBurnSeconds };
    SizzleAudio.startSizzle();
    return true;
  }
  if (state.plate.includes(ingredientId)) { sizzleSay(state, 'Already on the plate'); return false; }
  state.plate.push(ingredientId);
  SizzleAudio.pop();
  return true;
}

// A cooked item is ready when its progress passes its cook time and it has
// not yet burned. Clicking the station moves it to the plate.
function sizzleStationReady(slot, cookSeconds) {
  return slot && slot.progress >= cookSeconds && slot.progress < slot.burnAt;
}

function sizzleStationBurned(slot) {
  return slot && slot.progress >= slot.burnAt;
}

function sizzleTakeFromStation(state, which) {
  const slot = which === 'grill' ? state.grill : state.fryer;
  if (!slot) return false;
  const recipe = SIZZLE_RECIPES.find((r) => r.ingredients.includes(slot.ingredientId));
  const cookSeconds = recipe ? recipe.cookTime : SIZZLE_CONFIG.cookSeconds;
  if (sizzleStationBurned(slot)) {
    sizzleSay(state, 'Burnt! Click the trash to clear it.');
    return false;
  }
  if (!sizzleStationReady(slot, cookSeconds)) {
    sizzleSay(state, 'Still cooking…');
    return false;
  }
  if (state.plate.includes(slot.ingredientId)) { sizzleSay(state, 'Already on the plate'); return false; }
  state.plate.push(slot.ingredientId);
  if (which === 'grill') state.grill = null; else state.fryer = null;
  SizzleAudio.pop();
  if (!state.grill && !state.fryer) SizzleAudio.stopSizzle();
  return true;
}

function sizzleTrash(state) {
  let cleared = false;
  if (sizzleStationBurned(state.grill)) { state.grill = null; cleared = true; state.burned++; }
  if (sizzleStationBurned(state.fryer)) { state.fryer = null; cleared = true; state.burned++; }
  if (state.plate.length > 0) { state.plate = []; cleared = true; }
  if (cleared) {
    sizzleSay(state, 'Trashed.');
    if (!state.grill && !state.fryer) SizzleAudio.stopSizzle();
  }
  return cleared;
}

// Does the plate hold exactly one open order's recipe, no more, no less?
function sizzleMatchingOrder(state) {
  const plate = [...state.plate].sort().join(',');
  return state.orders.find((order) => {
    const recipe = sizzleRecipeById(order.recipeId);
    return recipe && [...recipe.ingredients].sort().join(',') === plate;
  }) || null;
}

function sizzleServe(state) {
  const order = sizzleMatchingOrder(state);
  if (!order) {
    if (state.plate.length > 0) sizzleSay(state, 'No order matches this plate yet.');
    return false;
  }
  const recipe = sizzleRecipeById(order.recipeId);
  const quick = order.timeLeft > order.total * 0.5;
  const points = SIZZLE_CONFIG.baseServePoints
    + (quick ? SIZZLE_CONFIG.quickServeBonus : 0)
    + state.combo * SIZZLE_CONFIG.comboStep;
  state.score += points;
  state.combo += 1;
  state.bestCombo = Math.max(state.bestCombo, state.combo);
  state.served += 1;
  state.dishesServed[recipe.id] = (state.dishesServed[recipe.id] || 0) + 1;
  state.servedDish = recipe.name;
  state.orders = state.orders.filter((o) => o.id !== order.id);
  state.plate = [];
  const pass = SIZZLE_LAYOUT.pass;
  state.floaters.push({
    x: pass.x + pass.w / 2, y: pass.y + 30,
    text: `+${points} ${recipe.name}!`, color: '#ffd94a', ttl: 1.6,
  });
  if (state.combo >= 2) {
    state.floaters.push({
      x: pass.x + pass.w / 2, y: pass.y + 58,
      text: `COMBO x${state.combo}`, color: '#ff9d4d', ttl: 1.6,
    });
  }
  SizzleAudio.ding();
  return true;
}

function sizzleSay(state, text) {
  state.message = text;
  state.messageTtl = 2.2;
}

// One tick of the shift clock. Returns nothing; the screen flips to 'over'
// when the timer runs out or the last life is lost.
function sizzleTick(state, dt) {
  if (state.screen !== 'playing') return;
  state.elapsed += dt;
  state.timeLeft = Math.max(0, SIZZLE_CONFIG.shiftSeconds - state.elapsed);
  if (state.messageTtl > 0) state.messageTtl -= dt;
  if (state.flashRed > 0) state.flashRed -= dt;
  for (const f of state.floaters) f.ttl -= dt;
  state.floaters = state.floaters.filter((f) => f.ttl > 0);

  // Cooking stations advance; a full burn stays put until trashed.
  if (state.grill) state.grill.progress += dt;
  if (state.fryer) state.fryer.progress += dt;
  if (sizzleStationBurned(state.grill) || sizzleStationBurned(state.fryer)) {
    if (state.messageTtl <= 0) sizzleSay(state, 'Something burned! Trash it (T).');
  }

  // Orders count down; an expired order costs points and a life.
  for (const order of state.orders) order.timeLeft -= dt;
  const gone = state.orders.filter((o) => o.timeLeft <= 0);
  if (gone.length > 0) {
    state.orders = state.orders.filter((o) => o.timeLeft > 0);
    state.expired += gone.length;
    state.lives -= gone.length;
    state.combo = 0;
    state.score = Math.max(0, state.score - SIZZLE_CONFIG.expirePenalty * gone.length);
    state.flashRed = 0.5;
    SizzleAudio.buzz();
    sizzleSay(state, 'Order expired! -' + SIZZLE_CONFIG.expirePenalty + ' pts');
  }

  // New orders keep arriving until the last 10 seconds.
  state.spawnIn -= dt;
  if (state.spawnIn <= 0 && state.timeLeft > 10) {
    sizzleSpawnOrder(state);
    state.spawnIn = sizzleSpawnInterval(state.elapsed);
  }

  if (state.timeLeft <= 0 || state.lives <= 0) {
    state.screen = 'over';
    SizzleAudio.stopSizzle();
  }
}

function sizzleStars(state) {
  const [one, two, three] = SIZZLE_CONFIG.stars;
  if (state.score >= three) return 3;
  if (state.score >= two) return 2;
  if (state.score >= one) return 1;
  return 0;
}

function sizzleBestDish(state) {
  let best = null;
  let bestCount = 0;
  for (const [id, count] of Object.entries(state.dishesServed)) {
    if (count > bestCount) { best = id; bestCount = count; }
  }
  return best ? sizzleRecipeById(best).name : '—';
}
