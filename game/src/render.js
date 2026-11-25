// Sizzle & Serve — render.js
// One job: everything the player sees, drawn on one canvas. It reads the
// state and never writes it. Every dish and ingredient is drawn from simple
// shapes in this file — the game's own art, no image files.

function sizzleRoundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// One ingredient, drawn at (cx, cy) with size s (its bounding square).
function sizzleDrawIngredient(ctx, id, cx, cy, s) {
  const h = s / 2;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.lineWidth = Math.max(2, s * 0.04);
  ctx.strokeStyle = 'rgba(0,0,0,0.35)';
  if (id === 'bun') {
    ctx.fillStyle = '#e8b96a';
    ctx.beginPath();
    ctx.ellipse(0, -h * 0.25, h * 0.95, h * 0.55, 0, Math.PI, 0);
    ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#c98f3d';
    sizzleRoundRect(ctx, -h * 0.9, h * 0.15, h * 1.8, h * 0.45, h * 0.2);
    ctx.fill(); ctx.stroke();
  } else if (id === 'patty') {
    ctx.fillStyle = '#8a4b2d';
    sizzleRoundRect(ctx, -h * 0.95, -h * 0.4, h * 1.9, h * 0.8, h * 0.35);
    ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#6e3a20';
    ctx.fillRect(-h * 0.5, -h * 0.15, h * 0.3, h * 0.3);
    ctx.fillRect(h * 0.2, -h * 0.1, h * 0.3, h * 0.25);
  } else if (id === 'cheese') {
    ctx.fillStyle = '#f7c948';
    ctx.beginPath();
    ctx.moveTo(-h * 0.9, -h * 0.5);
    ctx.lineTo(h * 0.9, -h * 0.5);
    ctx.lineTo(h * 0.2, h * 0.6);
    ctx.lineTo(-h * 0.6, h * 0.6);
    ctx.closePath();
    ctx.fill(); ctx.stroke();
  } else if (id === 'lettuce') {
    ctx.fillStyle = '#5da24a';
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      ctx.ellipse(Math.cos(a) * h * 0.45, Math.sin(a) * h * 0.45, h * 0.55, h * 0.4, a, 0, Math.PI * 2);
    }
    ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#7cbf6a';
    ctx.beginPath();
    ctx.arc(0, 0, h * 0.45, 0, Math.PI * 2);
    ctx.fill();
  } else if (id === 'chicken') {
    ctx.fillStyle = '#d99a4e';
    ctx.beginPath();
    ctx.ellipse(0, -h * 0.1, h * 0.85, h * 0.6, 0.3, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#f5e6c8';
    ctx.beginPath();
    ctx.arc(h * 0.55, h * 0.45, h * 0.35, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#b5772f';
    ctx.fillRect(-h * 0.7, -h * 0.2, h * 0.5, h * 0.12);
    ctx.fillRect(-h * 0.6, h * 0.05, h * 0.5, h * 0.12);
  } else if (id === 'fries') {
    ctx.fillStyle = '#f2c14e';
    for (let i = -2; i <= 2; i++) {
      ctx.fillRect(i * h * 0.28 - h * 0.1, -h * 0.9 + Math.abs(i) * h * 0.12, h * 0.2, h * 1.1);
    }
    ctx.strokeRect(-h * 0.8, -h * 0.9, h * 1.6, h * 1.1);
    ctx.fillStyle = '#d94f3d';
    ctx.beginPath();
    ctx.moveTo(-h * 0.85, -h * 0.1);
    ctx.lineTo(h * 0.85, -h * 0.1);
    ctx.lineTo(h * 0.6, h * 0.85);
    ctx.lineTo(-h * 0.6, h * 0.85);
    ctx.closePath();
    ctx.fill(); ctx.stroke();
  } else if (id === 'sauce') {
    ctx.fillStyle = '#d94f3d';
    ctx.beginPath();
    ctx.moveTo(0, -h * 0.9);
    ctx.quadraticCurveTo(h * 0.8, -h * 0.1, h * 0.55, h * 0.7);
    ctx.quadraticCurveTo(0, h * 0.95, -h * 0.55, h * 0.7);
    ctx.quadraticCurveTo(-h * 0.8, -h * 0.1, 0, -h * 0.9);
    ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(-h * 0.25, -h * 0.15, h * 0.14, 0, Math.PI * 2);
    ctx.fill();
  } else if (id === 'greens') {
    ctx.fillStyle = '#3f8f3a';
    ctx.beginPath();
    ctx.ellipse(-h * 0.35, -h * 0.2, h * 0.6, h * 0.4, -0.5, 0, Math.PI * 2);
    ctx.ellipse(h * 0.35, -h * 0.2, h * 0.6, h * 0.4, 0.5, 0, Math.PI * 2);
    ctx.ellipse(0, h * 0.35, h * 0.65, h * 0.4, 0, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();
    ctx.strokeStyle = '#2c6b28';
    ctx.beginPath();
    ctx.moveTo(0, -h * 0.5); ctx.lineTo(0, h * 0.6);
    ctx.stroke();
  } else if (id === 'tomato') {
    ctx.fillStyle = '#e23b2e';
    ctx.beginPath();
    ctx.arc(0, h * 0.1, h * 0.8, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#3f8f3a';
    ctx.beginPath();
    ctx.moveTo(0, -h * 0.7);
    ctx.lineTo(-h * 0.35, -h * 0.25);
    ctx.lineTo(h * 0.35, -h * 0.25);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#ff8a7a';
    ctx.beginPath();
    ctx.arc(-h * 0.3, -h * 0.2, h * 0.18, 0, Math.PI * 2);
    ctx.fill();
  } else if (id === 'egg') {
    ctx.fillStyle = '#fdf3d0';
    ctx.beginPath();
    ctx.ellipse(0, 0, h * 0.9, h * 0.7, 0.2, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#f7b731';
    ctx.beginPath();
    ctx.arc(h * 0.1, 0, h * 0.42, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();
  } else if (id === 'dressing') {
    ctx.fillStyle = '#f5e6b8';
    sizzleRoundRect(ctx, -h * 0.45, -h * 0.9, h * 0.9, h * 1.8, h * 0.25);
    ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#c9a86a';
    ctx.fillRect(-h * 0.45, -h * 0.9, h * 0.9, h * 0.3);
    ctx.fillStyle = '#fff8dc';
    ctx.font = `bold ${Math.round(h * 0.7)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('~', 0, h * 0.25);
  }
  ctx.restore();
}

function sizzleProgressBar(ctx, x, y, w, h, frac, fill) {
  ctx.fillStyle = 'rgba(0,0,0,0.45)';
  sizzleRoundRect(ctx, x, y, w, h, h / 2);
  ctx.fill();
  ctx.fillStyle = fill;
  const inner = Math.max(0, Math.min(1, frac)) * (w - 4);
  if (inner > 0) {
    sizzleRoundRect(ctx, x + 2, y + 2, inner, h - 4, (h - 4) / 2);
    ctx.fill();
  }
}

function sizzleClockText(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

function sizzleDrawTopBar(ctx, state) {
  const bar = SIZZLE_LAYOUT.topBar;
  ctx.fillStyle = '#2b2118';
  ctx.fillRect(bar.x, bar.y, bar.w, bar.h);
  ctx.fillStyle = '#ffd94a';
  ctx.font = 'bold 30px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('🍳 SIZZLE & SERVE', 20, 34);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 26px sans-serif';
  ctx.textAlign = 'center';
  const clock = sizzleClockText(state.timeLeft);
  ctx.fillStyle = state.timeLeft <= 30 ? '#ff6b5e' : '#fff';
  ctx.fillText(`⏱ ${clock}`, 640, 32);
  sizzleProgressBar(ctx, 560, 50, 160, 8, state.timeLeft / SIZZLE_CONFIG.shiftSeconds, '#ffd94a');
  ctx.textAlign = 'right';
  ctx.fillStyle = '#ffd94a';
  ctx.font = 'bold 26px sans-serif';
  ctx.fillText(`SCORE ${state.score}`, 1000, 26);
  ctx.fillStyle = state.combo >= 2 ? '#ff9d4d' : '#cfc4b0';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText(state.combo >= 2 ? `COMBO x${state.combo}` : 'COMBO —', 1000, 50);
  ctx.fillStyle = '#ff6b5e';
  ctx.font = 'bold 26px sans-serif';
  ctx.fillText('♥'.repeat(Math.max(0, state.lives)) + '♡'.repeat(Math.max(0, SIZZLE_CONFIG.maxLives - state.lives)), 1256, 34);
}

function sizzleDrawOrderBoard(ctx, state) {
  const b = SIZZLE_LAYOUT.orderBoard;
  ctx.fillStyle = '#3a2f24';
  sizzleRoundRect(ctx, b.x, b.y, b.w, b.h, 12);
  ctx.fill();
  ctx.strokeStyle = '#ffd94a';
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = '#ffd94a';
  ctx.font = 'bold 22px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('ORDER BOARD', b.x + 14, b.y + 22);
  if (state.orders.length === 0) {
    ctx.fillStyle = '#cfc4b0';
    ctx.font = '18px sans-serif';
    ctx.fillText('No orders yet —', b.x + 14, b.y + 80);
    ctx.fillText('the rush is coming!', b.x + 14, b.y + 106);
    return;
  }
  state.orders.forEach((order, i) => {
    const recipe = sizzleRecipeById(order.recipeId);
    const y = b.y + 44 + i * 64;
    const urgent = order.timeLeft <= 12;
    ctx.fillStyle = urgent ? '#5a2320' : '#4a3d2c';
    sizzleRoundRect(ctx, b.x + 10, y, b.w - 20, 56, 8);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText(recipe.name, b.x + 20, y + 14);
    ctx.fillStyle = urgent ? '#ff6b5e' : '#fff';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`${Math.ceil(order.timeLeft)}s`, b.x + b.w - 16, y + 14);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#cfc4b0';
    ctx.font = '14px sans-serif';
    ctx.fillText(recipe.ingredients.map((id) => sizzleIngredientById(id).name).join(' + '), b.x + 20, y + 34);
    const frac = Math.max(0, order.timeLeft / order.total);
    sizzleProgressBar(ctx, b.x + 10, y + 46, b.w - 20, 7, frac, urgent ? '#ff6b5e' : '#7cbf6a');
  });
}

function sizzleDrawStation(ctx, state, which, rect, label) {
  const slot = which === 'grill' ? state.grill : state.fryer;
  ctx.fillStyle = '#4a4a52';
  sizzleRoundRect(ctx, rect.x, rect.y, rect.w, rect.h, 12);
  ctx.fill();
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 20px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, rect.x + 14, rect.y + 20);
  if (which === 'grill') {
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 3;
    for (let i = 1; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(rect.x + 16, rect.y + 40 + i * 16);
      ctx.lineTo(rect.x + rect.w - 16, rect.y + 40 + i * 16);
      ctx.stroke();
    }
  } else {
    ctx.fillStyle = '#c98f2e';
    sizzleRoundRect(ctx, rect.x + 16, rect.y + 44, rect.w - 32, 56, 10);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.arc(rect.x + 40 + i * 48, rect.y + 66 + (i % 2) * 14, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  if (slot) {
    const recipe = SIZZLE_RECIPES.find((r) => r.ingredients.includes(slot.ingredientId));
    const cookSeconds = recipe ? recipe.cookTime : SIZZLE_CONFIG.cookSeconds;
    const burned = sizzleStationBurned(slot);
    const ready = sizzleStationReady(slot, cookSeconds);
    sizzleDrawIngredient(ctx, slot.ingredientId, rect.x + rect.w / 2, rect.y + 78, 64);
    if (burned) {
      ctx.fillStyle = '#1a1a1a';
      ctx.beginPath();
      ctx.arc(rect.x + rect.w / 2, rect.y + 78, 26, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ff6b5e';
      ctx.font = 'bold 18px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('BURNT!', rect.x + rect.w / 2, rect.y + 78);
    }
    const frac = Math.min(1, slot.progress / cookSeconds);
    sizzleProgressBar(ctx, rect.x + 16, rect.y + rect.h - 26, rect.w - 32, 12,
      frac, burned ? '#3a3a3a' : ready ? '#7cbf6a' : '#ff9d4d');
    ctx.fillStyle = ready ? '#7cbf6a' : '#fff';
    ctx.font = 'bold 15px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(burned ? 'Burnt — trash it (T)' : ready ? 'READY — click to plate!' : 'Cooking…', rect.x + rect.w / 2, rect.y + rect.h - 34);
    ctx.textAlign = 'left';
  } else {
    ctx.fillStyle = '#b9b3a8';
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'center';
    // The fryer hint sits below its oil pool so it stays readable.
    const hintY = which === 'fryer' ? rect.y + 122 : rect.y + 78;
    ctx.fillText(which === 'grill' ? 'Click a patty on the counter' : 'Click chicken or fries', rect.x + rect.w / 2, hintY);
    ctx.textAlign = 'left';
  }
}

function sizzleDrawPlate(ctx, state) {
  const p = SIZZLE_LAYOUT.plate;
  ctx.fillStyle = '#6b4a2f';
  sizzleRoundRect(ctx, p.x, p.y, p.w, p.h, 12);
  ctx.fill();
  ctx.strokeStyle = '#ffd94a';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 20px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('ASSEMBLY PLATE', p.x + 14, p.y + 20);
  const cx = p.x + p.w / 2;
  const cy = p.y + 118;
  ctx.fillStyle = '#f5f0e6';
  ctx.beginPath();
  ctx.ellipse(cx, cy, 150, 52, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#c9bda6';
  ctx.lineWidth = 3;
  ctx.stroke();
  if (state.plate.length === 0) {
    ctx.fillStyle = '#8a7f6d';
    ctx.font = '17px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Click ingredients on the counter to build a dish', cx, cy);
    ctx.textAlign = 'left';
    return;
  }
  const n = state.plate.length;
  state.plate.forEach((id, i) => {
    const x = cx + (i - (n - 1) / 2) * 62;
    sizzleDrawIngredient(ctx, id, x, cy - 8, 52);
  });
  const match = sizzleMatchingOrder(state);
  ctx.fillStyle = match ? '#7cbf6a' : '#fff';
  ctx.font = 'bold 17px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(match ? `✓ ${sizzleRecipeById(match.recipeId).name} complete — serve it!` : `${n} item${n > 1 ? 's' : ''} on the plate`, cx, p.y + p.h - 16);
  ctx.textAlign = 'left';
}

function sizzleDrawPass(ctx, state) {
  const p = SIZZLE_LAYOUT.pass;
  const match = sizzleMatchingOrder(state);
  const glow = match && state.screen === 'playing';
  ctx.save();
  if (glow) {
    ctx.shadowColor = '#ffd94a';
    ctx.shadowBlur = 28;
  }
  ctx.fillStyle = glow ? '#7a5a1e' : '#54432c';
  sizzleRoundRect(ctx, p.x, p.y, p.w, p.h, 12);
  ctx.fill();
  ctx.restore();
  ctx.strokeStyle = glow ? '#ffd94a' : '#8a7a5e';
  ctx.lineWidth = glow ? 4 : 2;
  ctx.stroke();
  ctx.fillStyle = glow ? '#ffd94a' : '#fff';
  ctx.font = 'bold 22px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(glow ? '★ READY TO SERVE ★' : 'SERVICE PASS', p.x + 14, p.y + 24);
  ctx.fillStyle = '#e8dcc0';
  ctx.fillRect(p.x + 20, p.y + 52, p.w - 40, 10);
  ctx.fillStyle = '#c9bda6';
  ctx.beginPath();
  ctx.arc(p.x + p.w / 2, p.y + 108, 34, Math.PI, 0);
  ctx.fill();
  ctx.fillStyle = '#8a7f6d';
  ctx.fillRect(p.x + p.w / 2 - 40, p.y + 106, 80, 8);
  if (match) {
    const recipe = sizzleRecipeById(match.recipeId);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(recipe.name, p.x + p.w / 2, p.y + 150);
    ctx.fillStyle = '#ffd94a';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText('Click the pass or press SPACE', p.x + p.w / 2, p.y + 176);
    ctx.textAlign = 'left';
  } else {
    ctx.fillStyle = '#b9b3a8';
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(state.plate.length > 0 ? 'Finish the plate to match an order' : 'Serve a finished dish here', p.x + p.w / 2, p.y + 160);
    ctx.textAlign = 'left';
  }
}

function sizzleDrawCounter(ctx, state) {
  const c = SIZZLE_LAYOUT.counter;
  ctx.fillStyle = '#8a5a2e';
  sizzleRoundRect(ctx, c.x, c.y, c.w, c.h, 12);
  ctx.fill();
  ctx.fillStyle = '#a9743f';
  ctx.fillRect(c.x, c.y, c.w, 26);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 19px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('COUNTER — click an ingredient (or press its key)', c.x + 14, c.y + 14);
  const binW = 92;
  const gap = (c.w - SIZZLE_INGREDIENTS.length * binW) / (SIZZLE_INGREDIENTS.length + 1);
  SIZZLE_INGREDIENTS.forEach((ing, i) => {
    const x = c.x + gap + i * (binW + gap);
    const y = c.y + 38;
    const busy = (ing.station === 'grill' && state.grill) || (ing.station === 'fryer' && state.fryer);
    ctx.fillStyle = busy ? '#6b5a44' : '#f5eeda';
    sizzleRoundRect(ctx, x, y, binW, 128, 10);
    ctx.fill();
    ctx.strokeStyle = '#5a4632';
    ctx.lineWidth = 2;
    ctx.stroke();
    sizzleDrawIngredient(ctx, ing.id, x + binW / 2, y + 52, 56);
    ctx.fillStyle = '#2b2118';
    ctx.font = 'bold 15px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(ing.name, x + binW / 2, y + 100);
    ctx.fillStyle = '#8a7f6d';
    ctx.font = '13px sans-serif';
    ctx.fillText(ing.station ? `→ ${ing.station}` : '→ plate', x + binW / 2, y + 118);
    ctx.fillStyle = '#ffd94a';
    ctx.beginPath();
    ctx.arc(x + binW - 12, y + 12, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#2b2118';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText(ing.key, x + binW - 12, y + 13);
  });
  ctx.textAlign = 'left';
  const t = SIZZLE_LAYOUT.trash;
  ctx.fillStyle = '#4a4a52';
  sizzleRoundRect(ctx, t.x, t.y, t.w, t.h, 12);
  ctx.fill();
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 18px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🗑 TRASH', t.x + t.w / 2, t.y + 24);
  ctx.font = '15px sans-serif';
  ctx.fillStyle = '#cfc4b0';
  ctx.fillText('burnt food', t.x + t.w / 2, t.y + 52);
  ctx.fillText('or bad plate', t.x + t.w / 2, t.y + 74);
  ctx.fillText('press T', t.x + t.w / 2, t.y + 98);
  ctx.textAlign = 'left';
}

function sizzleDrawFloaters(ctx, state) {
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (const f of state.floaters) {
    ctx.globalAlpha = Math.max(0, Math.min(1, f.ttl));
    ctx.fillStyle = f.color;
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText(f.text, f.x, f.y - (1.6 - f.ttl) * 30);
  }
  ctx.globalAlpha = 1;
  ctx.textAlign = 'left';
}

function sizzleDrawControlsHint(ctx) {
  ctx.fillStyle = 'rgba(0,0,0,0.55)';
  ctx.fillRect(0, 700, 1280, 20);
  ctx.fillStyle = '#e8dcc0';
  ctx.font = '13px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Click ingredients to cook & plate · SPACE serve · T trash · P pause · M mute · 1-0/Q pick ingredients', 640, 710);
  ctx.textAlign = 'left';
}

function sizzleDrawTitle(ctx) {
  ctx.fillStyle = 'rgba(20,14,8,0.82)';
  ctx.fillRect(0, 64, 1280, 656);
  ctx.fillStyle = '#ffd94a';
  ctx.font = 'bold 64px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🍳 SIZZLE & SERVE', 640, 190);
  ctx.fillStyle = '#fff';
  ctx.font = '28px sans-serif';
  ctx.fillText('A 3-minute diner shift. Cook fast, serve faster.', 640, 250);
  ctx.font = '20px sans-serif';
  ctx.fillStyle = '#e8dcc0';
  ctx.fillText('Orders appear on the board — build each dish from the counter,', 640, 310);
  ctx.fillText('grill patties, fry chicken & fries, plate it, and serve at the pass.', 640, 340);
  ctx.fillText('Burnt food goes in the trash. Quick serves build your combo!', 640, 370);
  ctx.fillStyle = '#ffd94a';
  ctx.font = 'bold 26px sans-serif';
  ctx.fillText('CLICK TO START YOUR SHIFT', 640, 450);
  ctx.fillStyle = '#fff';
  ctx.font = '18px sans-serif';
  ctx.fillText('Mouse + keys 1-0/Q · SPACE serve · T trash · P pause · M mute', 640, 500);
  ctx.textAlign = 'left';
}

function sizzleDrawPaused(ctx) {
  ctx.fillStyle = 'rgba(20,14,8,0.7)';
  ctx.fillRect(0, 64, 1280, 656);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 52px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('PAUSED', 640, 330);
  ctx.font = '22px sans-serif';
  ctx.fillText('Press P or click to get back to the rush.', 640, 390);
  ctx.textAlign = 'left';
}

function sizzleDrawGameOver(ctx, state) {
  ctx.fillStyle = 'rgba(20,14,8,0.88)';
  ctx.fillRect(0, 64, 1280, 656);
  ctx.fillStyle = '#ffd94a';
  ctx.font = 'bold 52px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('SHIFT OVER!', 640, 160);
  const stars = sizzleStars(state);
  ctx.font = '56px sans-serif';
  ctx.fillText('★'.repeat(stars) + '☆'.repeat(3 - stars), 640, 230);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 30px sans-serif';
  ctx.fillText(`Final score: ${state.score}`, 640, 300);
  ctx.font = '22px sans-serif';
  ctx.fillStyle = '#e8dcc0';
  ctx.fillText(`Dishes served: ${state.served}   ·   Best combo: x${state.bestCombo}   ·   Orders lost: ${state.expired}`, 640, 350);
  ctx.fillText(`Best dish: ${sizzleBestDish(state)}   ·   Burnt: ${state.burned}`, 640, 386);
  ctx.fillStyle = '#ffd94a';
  ctx.font = 'bold 24px sans-serif';
  ctx.fillText('Click to play another shift', 640, 450);
  ctx.textAlign = 'left';
}

// The one entry point: draw the whole kitchen for this state.
function sizzleRender(ctx, state) {
  ctx.fillStyle = '#7a5c3e';
  ctx.fillRect(0, 0, 1280, 720);
  // Tiled floor.
  ctx.fillStyle = '#8a6a48';
  for (let y = 64; y < 720; y += 64) {
    for (let x = (y / 64) % 2 === 0 ? 0 : 32; x < 1280; x += 64) {
      ctx.fillRect(x, y, 60, 60);
    }
  }
  // Back wall band behind the stations.
  ctx.fillStyle = '#a8b8a0';
  ctx.fillRect(0, 64, 1280, 16);
  sizzleDrawTopBar(ctx, state);
  sizzleDrawOrderBoard(ctx, state);
  sizzleDrawStation(ctx, state, 'grill', SIZZLE_LAYOUT.grill, '🔥 GRILL');
  sizzleDrawStation(ctx, state, 'fryer', SIZZLE_LAYOUT.fryer, '🍟 FRYER');
  sizzleDrawPlate(ctx, state);
  sizzleDrawPass(ctx, state);
  sizzleDrawCounter(ctx, state);
  if (state.messageTtl > 0) {
    ctx.fillStyle = 'rgba(0,0,0,0.65)';
    const w = ctx.measureText(state.message).width + 36;
    sizzleRoundRect(ctx, 640 - w / 2, 496, w, 30, 8);
    ctx.fill();
    ctx.fillStyle = '#ffd94a';
    ctx.font = 'bold 17px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(state.message, 640, 512);
    ctx.textAlign = 'left';
  }
  sizzleDrawFloaters(ctx, state);
  if (state.flashRed > 0) {
    ctx.fillStyle = `rgba(255,40,30,${state.flashRed * 0.4})`;
    ctx.fillRect(0, 0, 1280, 720);
  }
  if (state.screen === 'title') sizzleDrawTitle(ctx);
  if (state.screen === 'paused') sizzleDrawPaused(ctx);
  if (state.screen === 'over') sizzleDrawGameOver(ctx, state);
  sizzleDrawControlsHint(ctx);
}
