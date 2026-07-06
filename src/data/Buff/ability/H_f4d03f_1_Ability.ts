import { Buff, Chara, Damage } from "../../../engine/engine";
import { P } from "../../../utils/utils";

class H_f4d03f_1_Ability extends Buff {
    chores = (c: Chara) => {
        c.takeDamage = function (d: Damage, damageSource: Chara) {
            if (P(0.65 - this.health * 0.15)) {
                this.health -= d.value;
            }
        }.bind(c);
    };
    duration = Infinity;
    
    name = "往昔之勇";
    tags = ["ability", "defense", "receiver-hook"];
}

export { H_f4d03f_1_Ability };