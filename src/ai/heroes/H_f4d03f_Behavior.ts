import { Field } from "../../engine/engine";
import { HeroBehavior } from "../HeroBehavior";
import { GeneralAi } from "../GeneralAi";
import { GameTreeAi } from "../GameTreeAi";

class H_f4d03f_Behavior extends HeroBehavior {
    ai = new GeneralAi();
    d_ai = GameTreeAi.createWithArguments(10, 3, ()=>1, ()=>0, ()=>0, ()=>1);
    choose(f: Field): string {
        if (f.getRound() === 0) {
            return "fd3_transform";
        }
        if (f.metaData["duel"]) {
            return this.d_ai.think(f);
        }
        return this.ai.think(f);
    }
}

export { H_f4d03f_Behavior };