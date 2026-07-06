import { Field } from "../../engine/engine";
import { HeroBehavior } from "../HeroBehavior";
import { GameTreeAi } from "../GameTreeAi";
import { GeneralAi } from "../GeneralAi";
import { P } from "../../utils/utils";

class H_000000_Behavior extends HeroBehavior {
    ai = new GameTreeAi();
    ai1 = new GeneralAi();
    choose(f: Field) : string {
        if (P(0.4)) return this.ai.think(f);
        return this.ai1.think(f);
    }
}

export { H_000000_Behavior };