import { Buff, Chara, Damage } from "../../../engine/engine";
import { P } from "../../../utils/utils";

class H_b7950b_Ability extends Buff {
    chores = (c: Chara) => {
        c.takeDamage = function(d: Damage, dS: Chara) {
            if (d.type !== "physical") this.health -= d.value;
            else if (this.mana >= Math.ceil(this.location.getRound() / 3) + this.moveStatus.mp_cost
            && P(0.5))
                this.takeDrain(Math.ceil(this.location.getRound() / 3), this);
            else this.health -= d.value;
        }.bind(c);
    };

    duration = Infinity;

    name = "回转硬币";
    tags = ["ability", "defense"];
}

export { H_b7950b_Ability };