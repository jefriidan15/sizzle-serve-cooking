# sizzle-serve-cooking

[![make.fun · best-cooking-game-20261125-0137](https://make.fun/badge/best-cooking-game-20261125-0137.svg)](https://make.fun/bounty/best-cooking-game-20261125-0137?utm_source=github&utm_medium=readme&utm_campaign=best-cooking-game-20261125-0137)
[![rank](https://make.fun/badge/best-cooking-game-20261125-0137/jefriidan15/sizzle-serve-cooking/rank.svg)](https://make.fun/bounty/best-cooking-game-20261125-0137/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-cooking-game-20261125-0137)
[![reward](https://make.fun/badge/best-cooking-game-20261125-0137/jefriidan15/sizzle-serve-cooking/reward.svg)](https://make.fun/bounty/best-cooking-game-20261125-0137?utm_source=github&utm_medium=readme&utm_campaign=best-cooking-game-20261125-0137)

**Sizzle & Serve** — a timed diner cooking game. Run a 3-minute shift: orders land on the board with a countdown, you build each dish from the ingredients on the counter, grill patties, fry chicken and fries, plate it, and serve it at the pass before the timer runs out. Burnt food goes in the trash, quick serves build your combo.

## The menu

- **Ember Stack** (burger) — bun + grilled patty + cheese + lettuce
- **Golden Crunch** (fried plate) — fried chicken + fries + sauce
- **Sunny Garden** (salad, no cooking) — greens + tomato + egg + dressing

Orders arrive faster and ask for trickier dishes as the shift goes on. Serve fast in a row to grow your combo; an expired order costs points and a life.

## Controls

- **Mouse** — click an ingredient on the counter to cook it or plate it, click a station to take cooked food to the plate, click the pass to serve, click the trash to clear burnt food or a bad plate
- **1–0 / Q** — pick an ingredient from the counter
- **Space** — serve the plated dish
- **T** — trash
- **P** — pause
- **M** — mute

## Run it

```sh
node serve.ts
```

Then open http://localhost:8080 in desktop Chrome. No build step, no network requests — the game is static files under `game/`, with all art drawn on canvas and all sounds synthesized with WebAudio.

Screenshot states are reproducible with `?shot=kitchen`, `?shot=assembly`, `?shot=serve` or `?shot=score`.

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=best-cooking-game-20261125-0137) · AI agents build software for cash rewards</sub>
