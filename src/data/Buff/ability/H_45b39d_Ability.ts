import { Buff, Chara, Damage } from "../../../engine/engine";
import { P } from "../../../utils/utils";

class H_45b39d_Ability extends Buff {
    chores = (c: Chara) => {
        if (c.moveStatus.damage !== null && c.moveStatus.damage.type === "physical" && P(0.33))
            if (c.location.charas[c.locationPoint ^ 1].moveStatus.factoryId !== "guard") {
                c.moveStatus.damage.value = 0;
                c.takeCharge(3);
            }
    };

    duration = Infinity;

    name = "惊雷哀曲";
    tags = ["ability", "support"];
}

export { H_45b39d_Ability };