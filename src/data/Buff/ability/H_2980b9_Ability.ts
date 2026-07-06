import { Buff, Chara, Damage } from "../../../engine/engine";
import { P } from "../../../utils/utils";

class H_2980b9_Ability extends Buff {
    chores = (c: Chara) => {
        if (c.metaData["magicify"] && c.moveStatus.damage !== null)
            c.moveStatus.damage.type = "magic";
        c.metaData["magicify"] = undefined;
        c.takeDamage = function(d: Damage, damageSource: Chara) {
            this.health -= d.value;
            this.metaData["magicify"] = true;

        }
    };
    duration = Infinity;
    
    name = "不屈之卫";
    tags = ["ability", "support"];
}

export { H_2980b9_Ability };