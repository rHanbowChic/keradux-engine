import { Field } from "../../engine/engine";
import { HeroBehavior } from "../HeroBehavior";
import { GameTreeAi } from "../GameTreeAi";
import { GeneralAi } from "../GeneralAi";
import { P } from "../../utils/utils";

class H_b7950b_Behavior extends HeroBehavior {
    ai = GameTreeAi.createWithArguments(10, 3,
        ()=>0.5+Math.random()*0.6, ()=>0.3, ()=>1.2+Math.random()*0.4, ()=>1
    );
    ai1 = new GeneralAi();

    choose(f: Field) : string {
        if (f.charas[1].mana < 2) return this.ai.think(f);
        return this.ai1.think(f);
    }
}

export { H_b7950b_Behavior };