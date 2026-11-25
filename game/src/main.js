// Sizzle & Serve — main.js
// One job: boot the game and run its loop. It builds the state, wires the
// canvas and input, applies a ?shot= screenshot state when one is given,
// then ticks and renders every animation frame.

(function sizzleMain() {
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  const state = sizzleNewState();

  // A ?shot= state freezes the scene for screenshots: the clock still
  // ticks (timers visibly run) but no new orders spawn and nothing expires
  // before the shot is taken, because the state is re-applied each frame.
  const shot = sizzleShotFromUrl();
  let shotState = null;
  if (shot) {
    shotState = sizzleNewState();
    sizzleApplyShot(shotState, shot);
    // Freeze the clock for the shot so the render is stable.
    shotState.screen = shot === 'score' ? 'over' : 'playing';
  }

  sizzleBindInput(canvas, state);

  // Expose the live state for play-testing and debugging.
  window.SIZZLE_GAME = { state, shotState };

  let last = performance.now();
  function frame(now) {
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    try {
      if (shotState) {
        // Re-apply the deterministic scene, then let only the cooking
        // progress and floaters move so the grill bar visibly fills.
        const keepGrill = shotState.grill ? { ...shotState.grill } : null;
        const keepFryer = shotState.fryer ? { ...shotState.fryer } : null;
        sizzleApplyShot(shotState, shot);
        if (keepGrill) shotState.grill.progress = keepGrill.progress;
        if (keepFryer) shotState.fryer.progress = keepFryer.progress;
        if (shotState.grill) shotState.grill.progress = Math.min(shotState.grill.progress + dt, 4.5);
        sizzleRender(ctx, shotState);
      } else {
        sizzleTick(state, dt);
        sizzleRender(ctx, state);
      }
    } catch (err) {
      // One bad frame must never freeze the game: log it and keep going.
      console.error(err);
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
