// Sizzle & Serve — shots.js
// One job: the deterministic screenshot states behind `?shot=kitchen`,
// `?shot=assembly`, `?shot=serve` and `?shot=score`. Each one builds an
// exact, fixed scene (orders, timer, plate, grill) so a screenshot can be
// retaken any time and show the same kitchen. Gameplay without the param
// is untouched: these states are only ever built from the query string.

function sizzleApplyShot(state, shot) {
  if (shot === 'kitchen') {
    // Early shift: two orders up, a clean counter, plenty of time.
    state.screen = 'playing';
    state.elapsed = 18;
    state.timeLeft = SIZZLE_CONFIG.shiftSeconds - 18;
    state.score = 0;
    state.orders = [
      { id: 1, recipeId: 'ember-stack', timeLeft: 38, total: 48 },
      { id: 2, recipeId: 'sunny-garden', timeLeft: 26, total: 48 },
    ];
    state.nextOrderId = 3;
    state.spawnIn = 9;
    return true;
  }
  if (shot === 'assembly') {
    // Mid-assembly: bun and cheese already plated, a patty on the grill
    // two-thirds cooked, an order ticking down.
    state.screen = 'playing';
    state.elapsed = 52;
    state.timeLeft = SIZZLE_CONFIG.shiftSeconds - 52;
    state.score = 150;
    state.combo = 1;
    state.plate = ['bun', 'cheese'];
    state.grill = { ingredientId: 'patty', progress: 4, burnAt: SIZZLE_CONFIG.burnSeconds };
    state.orders = [
      { id: 1, recipeId: 'ember-stack', timeLeft: 24, total: 48 },
      { id: 2, recipeId: 'golden-crunch', timeLeft: 41, total: 48 },
    ];
    state.nextOrderId = 3;
    state.spawnIn = 7;
    SizzleAudio.startSizzle();
    return true;
  }
  if (shot === 'serve') {
    // A finished Ember Stack on the plate, the pass glowing, timer running.
    state.screen = 'playing';
    state.elapsed = 74;
    state.timeLeft = SIZZLE_CONFIG.shiftSeconds - 74;
    state.score = 250;
    state.combo = 2;
    state.bestCombo = 2;
    state.served = 2;
    state.plate = ['bun', 'patty', 'cheese', 'lettuce'];
    state.orders = [
      { id: 1, recipeId: 'ember-stack', timeLeft: 19, total: 48 },
      { id: 2, recipeId: 'sunny-garden', timeLeft: 33, total: 48 },
    ];
    state.nextOrderId = 3;
    state.spawnIn = 5;
    return true;
  }
  if (shot === 'score') {
    // The end-of-shift screen with a score, stars and a best dish.
    state.screen = 'over';
    state.elapsed = SIZZLE_CONFIG.shiftSeconds;
    state.timeLeft = 0;
    state.score = 1150;
    state.combo = 0;
    state.bestCombo = 4;
    state.served = 9;
    state.expired = 1;
    state.burned = 1;
    state.dishesServed = { 'ember-stack': 4, 'golden-crunch': 3, 'sunny-garden': 2 };
    state.servedDish = 'Ember Stack';
    state.orders = [];
    return true;
  }
  return false;
}

// Read ?shot= from the page's URL. Returns the mode name or null.
function sizzleShotFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const shot = params.get('shot');
  return shot && ['kitchen', 'assembly', 'serve', 'score'].includes(shot) ? shot : null;
}
