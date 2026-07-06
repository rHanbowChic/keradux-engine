import { Field, Move } from "../engine/engine";
import { rdSelect } from "../utils/utils";
import { BaseAi } from "./BaseAi";

class RandomAi extends BaseAi {
    movesBelow3Mana = ["attack", "guard", "charge"];
    movesBelow1Mana = ["guard", "charge"];
    
    think(f: Field): string {
        if (f.getStatus("mana", 1) < 1)
            return rdSelect(this.movesBelow1Mana) as string;
        if (f.getStatus("mana", 1) < 3)
            return rdSelect(this.movesBelow3Mana) as string;
        return rdSelect(this.availableMoves) as string;
    }

}

export { RandomAi };