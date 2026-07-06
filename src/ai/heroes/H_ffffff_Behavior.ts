import { Field } from "../../engine/engine";
import { HeroBehavior } from "../HeroBehavior";
import { GameTreeAi } from "../GameTreeAi";

class H_ffffff_Behavior extends HeroBehavior {
    ai1 = GameTreeAi.createWithArguments(10, 3, ()=>1, ()=>1,
        () => 1.2 + Math.random() * 0.6, () => 1 + Math.random() * 0.2);
    ai2 = GameTreeAi.createWithArguments(10, 3, ()=>1.4, ()=>1,
        () => 1.2 + Math.random() * 0.6, () => 1 + Math.random() * 0.2);

    choose(f: Field): string {
        if (f.getStatus("health", 1) === 1) {
            return this.ai2.think(f);
        }
        return this.ai1.think(f);
    }
}

export { H_ffffff_Behavior };