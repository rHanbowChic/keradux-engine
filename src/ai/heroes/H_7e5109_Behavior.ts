import { Field } from "../../engine/engine";
import { HeroBehavior } from "../HeroBehavior";
import { GameTreeAi } from "../GameTreeAi";
import { GeneralAi } from "../GeneralAi";
import { P } from "../../utils/utils";

class H_7e5109_Behavior extends HeroBehavior {
    ai = new GameTreeAi();
    choose(f: Field) : string {
        this.updateMoveMemory(f);
        const m = this.ai.think(f);
        if (f.charas[1].mana > 0 && this.selfMoved[f.getRound()-1] !== "750_support") {
            if (["charge", "attack"].includes(m) && P(f.charas[1].mana * 0.15 + 0.3)) return "750_support";
        }
        return m;
    }
}

export { H_7e5109_Behavior };