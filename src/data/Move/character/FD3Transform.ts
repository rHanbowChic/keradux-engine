import { Damage } from "../../../engine/Damage";
import { Chara, Field, Move, Scope } from "../../../engine/engine";
import { H_f4d03f_1_Ability } from "../../Buff/ability/H_f4d03f_1_Ability";

class FD3Transform extends Move {

    field_effect = (f: Field) => {
        if (f.charas[0].moveStatus.factoryId === "guard") {
            f.charas[0].health = f.charas[1].health = 1;
            f.charas[0].mana = f.charas[1].mana = 1;
            f.metaData["duel"] = true;
        }
        else {
            f.charas[1].buffs.push(new H_f4d03f_1_Ability());
        }
    }

    name = "Duel Seeking";
    tags = ["chores-drived"];
}

export { FD3Transform };