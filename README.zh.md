# Keradux Engine

有趣的轻量可扩展**回合制对战引擎**，使用 TypeScript 编写，它面向一个古老的“石头剪刀布”式游戏（但更加复杂），在中学校园一度流传。

大二期间从零构建的个人项目。用于探索游戏引擎架构、AI 设计模式以及 TypeScript 模块系统。

## 特性

- `Field`、`Chara`、`Move`、`Buff`、`Effect`、`Damage` 均设计为可组合、可扩展的类。无需修改引擎即可添加自定义招式、增益效果和角色。
- 内置四种 AI 后端：
  - `RandomAi` — 在法力约束下随机选择招式
  - `GeneralAi` — 具备态势感知和概率决策的启发式 AI
  - `SmarterRandomAi`（ExperimentalAi）— 基于评分的招式评估
  - `GameTreeAi` — 带**记忆化**的递归博弈树搜索，可配置搜索深度和每招修正权重
- **13 个角色（继承自`Chara`类），拥有自定义能力、属性和 AI 行为策略。英雄 AI 通过组合不同修正参数的 `BaseAi` 实例构建。
- **Receiver Hook 系统** — 角色的方法（`takeDamage`、`takeHealing`、`takeDrain`、`takeCharge`）可被增益效果动态覆写，实现伤害免疫、防御、自定义触发等被动能力。
- **战斗面板 / 事件日志** — 内置战斗旁白系统，按类型来源（旁白、角色发言、聊天）记录战斗事件，支持颜色与 HTML 渲染。
- **工厂模式管理数据** — 招式与角色通过字符串 ID 经 `moveFactory()` 和 `heroCharaIncubator()` 创建，便于在数据文件中定义内容。
- **UMD 库构建** — 编译为单个 `kera.js` 文件，可直接通过浏览器 `<script>` 标签使用。

## 项目结构

```
src/
├── engine/           # 核心引擎类
│   ├── Field.ts      # 双人对战场景与回合结算
│   ├── Chara.ts      # 角色状态、增益、伤害/治疗接收器
│   ├── Move.ts       # 抽象招式定义
│   ├── Buff.ts       # 带持续时间和注入时机的状态效果
│   ├── Effect.ts     # 全局场地效果
│   ├── Damage.ts     # 伤害类型（物理、魔法、直接）
│   └── Board.ts      # 游戏内事件日志 / 信息面板
├── ai/               # AI 系统
│   ├── BaseAi.ts     # AI 抽象基类
│   ├── RandomAi.ts   # 随机招式选择
│   ├── GeneralAi.ts  # 启发式 / 态势 AI
│   ├── ExperimentalAi.ts  # 基于评分的评估 AI
│   ├── GameTreeAi.ts # 带记忆化的递归博弈树搜索
│   ├── HeroBehavior.ts    # 英雄专属 AI 抽象类
│   ├── behaviorProvider.ts # 英雄行为工厂
│   └── heroes/       # 13 个英雄行为实现
├── data/             # 游戏内容
│   ├── moveFactory.ts         # 招式工厂
│   ├── heroCharaIncubator.ts  # 角色工厂
│   ├── Move/                  # 招式定义（通用 + 角色专属）
│   └── Buff/                  # 增益与能力定义
├── utils/            # 工具函数
├── PveAiField.ts     # PvE 游戏模式：玩家 vs AI 英雄
└── index.ts          # 库入口与导出
```

## 快速开始

### 构建

```bash
npm install
npm run build        # 生产构建 → dist/kera.js
npm run build:dev    # 开发构建
npm run watch        # 监听模式
npm run serve        # 带热更新的开发服务器
```

### 浏览器中使用

```html
<script src="dist/kera.js"></script>
<script>
  // 创建一个简单的 1v1 对战场地
  const field = Kera.Field.startWithNewSimpleCharas();

  // 绑定一个 AI
  const ai = new Kera.GeneralAi();

  // 执行一回合：玩家使用 "attack"，AI 自行选择招式
  const aiMove = ai.think(field);
  field.turn(Kera.m("attack"), Kera.m(aiMove));

  console.log(field.getAllStatus());
  // [0] Health: 2, Mana: 0
  // [1] Health: 2, Mana: 0
</script>
```

### PvE 模式（英雄对战）

```html
<script src="dist/kera.js"></script>
<script>
  // 玩家 vs 英雄 "火 神"（id: e74c3c）
  const field = Kera.PveAiField.withHeroId(
    Kera.Chara.withName("Player"),
    "e74c3c"
  );

  // 玩家攻击，AI 英雄根据自身行为策略选择招式
  const aiMoveName = field.turnWithAi(Kera.m("attack"));
  console.log(`英雄使用了：${aiMoveName}`);

  // 将战斗日志渲染为 HTML
  document.getElementById("log").innerHTML = field.getBoardContentHTML(true);
</script>
```

### 演示页面

`dist/` 目录下包含两个可游玩的 HTML 演示：

| 文件 | 说明 |
|------|------|
| `dist/game_example.html` | 基础 PvP：你 vs 可配置 AI 对手 |
| `dist/game.html` | PvE 模式：你 vs 拥有独特 AI 行为的英雄角色 |

## 设计亮点

### 可扩展架构

引擎将**机制**与**内容**清晰分离：

- **招式**是继承 `Move` 的类 — 设置 `damage`、`healing`、`mp_cost`、`chara_effect` 等属性。
- **增益**是继承 `Buff` 的类 — 定义 `chores()` 方法以每回合修改角色状态。
- **角色**是通过 `heroCharaIncubator()` 配置了增益和名称的 `Chara` 实例。
- **AI 行为**实现 `HeroBehavior` 或继承 `BaseAi` — 每个英雄可拥有独立的策略。

### 带记忆化的博弈树 AI

`GameTreeAi` 在游戏状态空间（生命值 × 法力值组合）上执行递归的极小极大式搜索。它使用**记忆化**缓存子树结果，通过可配置的记忆边界深度避免浅层近似污染缓存。每种招式的修正函数允许精细调节 AI 的打法风格（激进、防守、均衡）。

### Receiver Hook 模式

增益效果可以动态替换角色的 `takeDamage`、`takeHealing`、`takeDrain` 和 `takeCharge` 方法，实现以下效果：

- **防御** — 一回合内格挡物理伤害
- **无敌** — 无视所有伤害
- 自定义受伤或治疗触发效果

引擎在每回合结束时重置接收器，然后重新应用活跃的增益效果，确保状态管理清晰可靠。

## 技术栈

- **TypeScript** — 核心语言
- **Webpack** — 打包为 UMD 格式（`dist/kera.js`）
- **ts-loader** — 构建流程中的 TypeScript 编译
- **html-webpack-plugin** — HTML 模板处理

## 许可证

MIT License

---

*始于好奇 — 一个大二学生对游戏引擎、AI 与软件设计的探索。*
