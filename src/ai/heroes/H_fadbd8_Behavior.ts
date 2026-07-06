import { Field } from "../../engine/engine";
import { HeroBehavior } from "../HeroBehavior";
import { GameTreeAi } from "../GameTreeAi";
import { GeneralAi } from "../GeneralAi";
import { P } from "../../utils/utils";

class H_fadbd8_Behavior extends HeroBehavior {
    ai = GameTreeAi.createWithArguments(10, 3,
        ()=>1, ()=>1, ()=>1.2+Math.random()*0.6, () => 0.9);
    choose(f: Field) : string {
        return this.ai.think(f);
    }
}

export { H_fadbd8_Behavior };