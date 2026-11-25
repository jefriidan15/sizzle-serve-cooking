// Sizzle & Serve — config.js
// One job: every tunable constant, ingredient and recipe of the game.
// No other file defines dishes or timings; they all read from here.

const SIZZLE_CONFIG = {
  canvasWidth: 1280,
  canvasHeight: 720,
  shiftSeconds: 180,
  maxOrders: 3,
  firstOrderDelay: 1.5,
  orderSpawnBase: 14,
  orderSpawnMin: 6,
  orderTimeBase: 48,
  orderTimeMin: 26,
  cookSeconds: 6,
  burnSeconds: 11,
  frySeconds: 7,
  fryBurnSeconds: 12,
  baseServePoints: 100,
  quickServeBonus: 50,
  comboStep: 25,
  expirePenalty: 50,
  maxLives: 3,
  stars: [400, 900, 1500],
};

// Every ingredient the counter stocks. `station` names where a raw item must
// cook before it can be plated; null means it goes straight onto the plate.
const SIZZLE_INGREDIENTS = [
  { id: 'bun',      name: 'Bun',      key: '1', color: '#e8b96a', station: null    },
  { id: 'patty',    name: 'Patty',    key: '2', color: '#8a4b2d', station: 'grill' },
  { id: 'cheese',   name: 'Cheese',   key: '3', color: '#f7c948', station: null    },
  { id: 'lettuce',  name: 'Lettuce',  key: '4', color: '#5da24a', station: null    },
  { id: 'chicken',  name: 'Chicken',  key: '5', color: '#d99a4e', station: 'fryer' },
  { id: 'fries',    name: 'Fries',    key: '6', color: '#f2c14e', station: 'fryer' },
  { id: 'sauce',    name: 'Sauce',    key: '7', color: '#d94f3d', station: null    },
  { id: 'greens',   name: 'Greens',   key: '8', color: '#3f8f3a', station: null    },
  { id: 'tomato',   name: 'Tomato',   key: '9', color: '#e23b2e', station: null    },
  { id: 'egg',      name: 'Egg',      key: '0', color: '#fdf3d0', station: null    },
  { id: 'dressing', name: 'Dressing', key: 'Q', color: '#f5e6b8', station: null    },
];

// The three dishes on the menu. `ingredients` lists the cooked item ids the
// plate must hold; a raw patty never counts, only a grilled one does.
const SIZZLE_RECIPES = [
  {
    id: 'ember-stack',
    name: 'Ember Stack',
    blurb: 'Burger',
    ingredients: ['bun', 'patty', 'cheese', 'lettuce'],
    cookTime: 6,
    color: '#b5651d',
  },
  {
    id: 'golden-crunch',
    name: 'Golden Crunch',
    blurb: 'Fried plate',
    ingredients: ['chicken', 'fries', 'sauce'],
    cookTime: 7,
    color: '#d99a2b',
  },
  {
    id: 'sunny-garden',
    name: 'Sunny Garden',
    blurb: 'Salad',
    ingredients: ['greens', 'tomato', 'egg', 'dressing'],
    cookTime: 0,
    color: '#4d8f3f',
  },
];

function sizzleIngredientById(id) {
  return SIZZLE_INGREDIENTS.find((ing) => ing.id === id) || null;
}

function sizzleRecipeById(id) {
  return SIZZLE_RECIPES.find((recipe) => recipe.id === id) || null;
}

// Layout of the kitchen, in canvas pixels. render.js draws from these rects
// and input.js hit-tests against them, so the picture and the clicks agree.
const SIZZLE_LAYOUT = {
  topBar:    { x: 0,    y: 0,   w: 1280, h: 64 },
  orderBoard:{ x: 16,   y: 80,  w: 288,  h: 240 },
  grill:     { x: 336,  y: 96,  w: 240,  h: 150 },
  fryer:     { x: 608,  y: 96,  w: 240,  h: 150 },
  plate:     { x: 336,  y: 288, w: 512,  h: 200 },
  pass:      { x: 880,  y: 288, w: 384,  h: 200 },
  trash:     { x: 1160, y: 520, w: 104,  h: 120 },
  counter:   { x: 16,   y: 520, w: 1120, h: 184 },
};
