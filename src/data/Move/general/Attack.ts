import { Damage } from "../../../engine/Damage";
import { Move } from "../../../engine/engine";

class Attack extends Move {
    mp_cost = 1;

    damage = Damage.physical(1);

    name = "Attack";
    tags = ["attack", "physical", "data-drived", "general"];
}

export { Attack };