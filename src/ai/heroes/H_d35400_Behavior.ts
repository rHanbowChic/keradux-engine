import { Field } from "../../engine/engine";
import { HeroBehavior } from "../HeroBehavior";
import { GameTreeAi } from "../GameTreeAi";

class H_d35400_Behavior extends HeroBehavior {
    ai: GameTreeAi = GameTreeAi.createWithArguments(10, 3, ()=>1, ()=>1, ()=>1, ()=>0.7);
    choose(f: Field): string {
        return this.ai.think(f);
    }

}

export { H_d35400_Behavior };