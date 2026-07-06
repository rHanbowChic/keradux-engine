# Keradux Engine

[简体中文](./README.zh.md)

A lightweight, extensible **turn-based battle engine** written in TypeScript, designed for PvE (Player vs Environment) combat games. Built from scratch during my sophomore year as a personal project to explore game engine architecture, AI design patterns, and TypeScript module systems.

## Features

- **Modular Engine Core** — `Field`, `Chara`, `Move`, `Buff`, `Effect`, and `Damage` are all designed as composable, extensible classes. Custom moves, buffs, and characters can be added without touching the engine.
- **Pluggable AI System** — ships with four AI backends:
  - `RandomAi` — random move selection with basic mana constraints
  - `GeneralAi` — heuristic AI with situational awareness and probability-driven decisions
  - `SmarterRandomAi` (ExperimentalAi) — score-based evaluation across available moves
  - `GameTreeAi` — recursive game-tree search with **memoization**, configurable search depth, and per-move modifier weights
- **13 Unique Hero Characters** — each with custom abilities, stats, and AI behavior strategies. Hero AIs are built by composing `GameTreeAi` instances with different modifier profiles.
- **Receiver Hook System** — character methods (`takeDamage`, `takeHealing`, `takeDrain`, `takeCharge`) can be dynamically overridden by buffs, enabling passive abilities like damage immunity, guard, and custom effects.
- **Battle Board / Event Log** — in-game narration system that records battle events with typed origins (narration, character emits, chat), color support, and HTML rendering.
- **Factory Pattern for Data** — moves and characters are created via string IDs through `moveFactory()` and `heroCharaIncubator()`, making it easy to define content in data files.
- **UMD Library Build** — compiles to a single `kera.js` file usable in browser `<script>` tags.

## Project Structure

```
src/
├── engine/           # Core engine classes
│   ├── Field.ts      # 2-player battle arena & turn resolution
│   ├── Chara.ts      # Character state, buffs, damage/heal receivers
│   ├── Move.ts       # Abstract move definition
│   ├── Buff.ts       # Status effects with duration & injection timing
│   ├── Effect.ts     # Field-wide effects
│   ├── Damage.ts     # Damage types (physical, magic, direct)
│   └── Board.ts      # In-game event log / message board
├── ai/               # AI system
│   ├── BaseAi.ts     # Abstract AI base class
│   ├── RandomAi.ts   # Random move selection
│   ├── GeneralAi.ts  # Heuristic/situational AI
│   ├── ExperimentalAi.ts  # Score-based evaluation AI
│   ├── GameTreeAi.ts # Recursive game-tree search with memoization
│   ├── HeroBehavior.ts    # Abstract hero-specific AI
│   ├── behaviorProvider.ts # Hero behavior factory
│   └── heroes/       # 13 hero behavior implementations
├── data/             # Game content
│   ├── moveFactory.ts         # Move factory
│   ├── heroCharaIncubator.ts  # Character factory
│   ├── Move/                  # Move definitions (general + character-specific)
│   └── Buff/                  # Buff & ability definitions
├── utils/            # Utility functions
├── PveAiField.ts     # PvE game mode: Player vs AI Hero
└── index.ts          # Library entry point & exports
```

## Quick Start

### Build

```bash
npm install
npm run build        # Production build → dist/kera.js
npm run build:dev    # Development build
npm run watch        # Watch mode
npm run serve        # Dev server with hot reload
```

### Usage in Browser

```html
<script src="dist/kera.js"></script>
<script>
  // Create a simple 1v1 field
  const field = Kera.Field.startWithNewSimpleCharas();

  // Attach an AI
  const ai = new Kera.GeneralAi();

  // Take a turn: player uses "attack", AI chooses its move
  const aiMove = ai.think(field);
  field.turn(Kera.m("attack"), Kera.m(aiMove));

  console.log(field.getAllStatus());
  // [0] Health: 2, Mana: 0
  // [1] Health: 2, Mana: 0
</script>
```

### PvE Mode with Hero Characters

```html
<script src="dist/kera.js"></script>
<script>
  // Player vs hero "火 神" (id: e74c3c)
  const field = Kera.PveAiField.withHeroId(
    Kera.Chara.withName("Player"),
    "e74c3c"
  );

  // Player attacks, AI hero chooses based on its own behavior strategy
  const aiMoveName = field.turnWithAi(Kera.m("attack"));
  console.log(`Hero used: ${aiMoveName}`);

  // Render the battle log as HTML
  document.getElementById("log").innerHTML = field.getBoardContentHTML(true);
</script>
```

### Demo Pages

Two playable HTML demos are included in `dist/`:

| File | Description |
|------|-------------|
| `dist/game_example.html` | Basic PvP: you vs a configurable AI opponent |
| `dist/game.html` | PvE mode: you vs a hero character with unique AI behavior |

## Design Highlights

### Extensible Architecture

The engine cleanly separates **mechanics** from **content**:

- **Moves** are classes extending `Move` — set `damage`, `healing`, `mp_cost`, `chara_effect`, etc.
- **Buffs** are classes extending `Buff` — define `chores()` to modify character state each turn.
- **Characters** are `Chara` instances configured with buffs and a familiar name via `heroCharaIncubator()`.
- **AI behaviors** implement `HeroBehavior` or extend `BaseAi` — each hero can have its own strategy.

### GameTree AI with Memoization

`GameTreeAi` performs a recursive minimax-style search over the game state space (health × mana combinations). It uses **memoization** to cache subtree results, with a configurable memory-bound depth to avoid polluting the cache with shallow approximations. Per-move modifier functions allow fine-tuning the AI's playstyle (aggressive, defensive, balanced).

### Receiver Hook Pattern

Buffs can dynamically replace a character's `takeDamage`, `takeHealing`, `takeDrain`, and `takeCharge` methods. This enables effects like:

- **Guarding** — blocks physical damage for one turn
- **Invincibility** — ignores all damage
- Custom on-damage or on-heal triggers

The engine resets receivers at the end of each turn, then re-applies active buffs, ensuring clean state management.

## Tech Stack

- **TypeScript** — core language
- **Webpack** — bundling to UMD (`dist/kera.js`)
- **ts-loader** — TypeScript compilation in the build pipeline
- **html-webpack-plugin** — HTML template processing

## License

MIT

---

*Built with curiosity — a sophomore's exploration into game engines, AI, and software design.*
