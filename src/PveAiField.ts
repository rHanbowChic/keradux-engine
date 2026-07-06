import { Chara, Field, Move } from "./engine/engine";
import { HeroBehavior } from "./ai/HeroBehavior";
import { heroCharaIncubator } from "./data/heroCharaIncubator";
import { behaviorProvider } from "./ai/behaviorProvider";
import { moveFactory } from "./data/moveFactory";

class PveAiField extends Field {
    c1Ai: HeroBehavior;

    constructor(c0: Chara, c1: Chara, c1Ai: HeroBehavior) {
        super(c0, c1);
        this.c1Ai = c1Ai;
    }

    turnWithAi(m0: Move) : string {
        const m1 = moveFactory(this.c1Ai.choose(this));
        this.turn(m0, m1);
        return m1.name;
    }

    static withHeroId(c0: Chara, id: string) : PveAiField {
        const c1 = heroCharaIncubator(id);
        const ai = behaviorProvider(id);
        const f = new PveAiField(c0, c1, ai);
        return f;
    }
}

export { PveAiField };