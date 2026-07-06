import { Field } from "../../engine/engine";
import { HeroBehavior } from "../HeroBehavior";
import { GameTreeAi } from "../GameTreeAi";
import { GeneralAi } from "../GeneralAi";
import { P } from "../../utils/utils";

// Smogon's beloved :|
class H_27ae60_Behavior extends HeroBehavior {
    ai = GameTreeAi.createWithArguments(10, 3,
        ()=>1, ()=>0.4, ()=>1.2+Math.random()*0.4, ()=>1+Math.random()*0.3);
    choose(f: Field) : string {
        this.updateMoveMemory(f);
        if (this.selfMoved[f.getRound()-1] === "guard" && P(0.33))
            return "heal";
        return this.ai.think(f);
    }
}

export { H_27ae60_Behavior };