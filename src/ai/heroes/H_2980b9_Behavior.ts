import { Field } from "../../engine/engine";
import { HeroBehavior } from "../HeroBehavior";
import { GeneralAi } from "../GeneralAi";
import { ExperimentalAi } from "../ExperimentalAi";
import { P } from "../../utils/utils";

class H_2980b9_Behavior extends HeroBehavior {
    ai = new GeneralAi();
    ai1 = new ExperimentalAi();
    choose(f: Field) : string {
        if (P(0.5)) return this.ai.think(f);
        return this.ai1.think(f);
    }
}

export { H_2980b9_Behavior };