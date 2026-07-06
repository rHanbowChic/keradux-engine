import { Field } from "../../engine/engine";
import { HeroBehavior } from "../HeroBehavior";
import { GameTreeAi } from "../GameTreeAi";
import { GeneralAi } from "../GeneralAi";
import { P } from "../../utils/utils";

class H_af7ac5_Behavior extends HeroBehavior {
    ai = GameTreeAi.createWithArguments(10, 3, 
        ()=>0, ()=>0, ()=>0.8+Math.random()*1.4, ()=>0.9
    );
    ai1 = GameTreeAi.createWithArguments(10, 3, 
        ()=>1, ()=>999, ()=>0, ()=>0
    );
    choose(f: Field) : string {
        //
        // 这个AI使用了一定程度的越权行为。会对可扩展性造成一定影响，需特别检查。
        //
        if (f.charas[1].metaData["phase2"]) return this.ai1.think(f);
        return this.ai.think(f);
    }
}

export { H_af7ac5_Behavior };