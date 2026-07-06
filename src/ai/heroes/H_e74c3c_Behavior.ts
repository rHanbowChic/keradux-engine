import { Field } from "../../engine/engine";
import { HeroBehavior } from "../HeroBehavior";
import { GameTreeAi } from "../GameTreeAi";

class H_e74c3c_Behavior extends HeroBehavior {
    ai1: GameTreeAi = GameTreeAi.createWithArguments(10, 3, ()=>0.7, ()=>0,
        ()=>1.5+Math.random()*0.6, ()=>1);
    ai2: GameTreeAi = GameTreeAi.createWithArguments(10, 3, ()=>1+Math.random()*0.4, ()=>0,
        ()=>1, ()=>1);
    choose(f: Field): string {
        if (f.getStatus("mana", 1) < 3)
            return this.ai1.think(f);
        return this.ai2.think(f);
    }

}

export { H_e74c3c_Behavior };