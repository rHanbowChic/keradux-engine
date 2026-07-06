import { Damage } from "../../../engine/Damage";
import { Chara, Move, Scope } from "../../../engine/engine";

class PowerAttack extends Move {
    mp_cost = 3;

    damage = Damage.magic(1);

    name = "Power Attack";
    tags = ["attack", "magic", "data-drived", "general"];
}

export { PowerAttack };