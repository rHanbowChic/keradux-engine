import { HeroBehavior } from "../HeroBehavior";
import { GeneralAi } from "../GeneralAi";
import { Field } from "../../engine/engine";

class TestChara223Behavior extends HeroBehavior {
    g_ai: GeneralAi = new GeneralAi();
    choose(f: Field): string {
        return this.g_ai.think(f);
    }
    
}

export { TestChara223Behavior };