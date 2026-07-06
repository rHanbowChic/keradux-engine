import { Chara, Move, Scope } from "../../../engine/engine";
import { Guarding } from "../../Buff/Guarding";

class Guard extends Move {
    priority = 6;

    chara_effect = [
        {
            chores: (c: Chara) => {
                c.buffs.push(new Guarding());
                Chara.applyLastNBuffs(c, 1);
            },
            scope: "self" as Scope,
        }
    ];

    name = "Guard";
    tags = ["defense", "buff", "chores-drived", "high-priority", "general"];
}

export { Guard };