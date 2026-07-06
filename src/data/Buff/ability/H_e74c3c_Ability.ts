import { Buff, Chara, Damage } from "../../../engine/engine";
import { P } from "../../../utils/utils";

class H_e74c3c_Ability extends Buff {
    chores = (c: Chara) => {
        if (c.metaData[`futuresight_${c.location.getRound()}`]) {
            c.location.charas[c.locationPoint ^ 1].takeDamage(
                Damage.magic(c.metaData[`futuresight_${c.location.getRound()}`]), c
            );
        }
        if (c.moveStatus.damage !== null && c.moveStatus.damage.type == "physical") {
            
            c.metaData[`futuresight_${c.location.getRound() + 2}`] = c.moveStatus.damage.value;
            c.moveStatus.damage.value = 0;
        }
    };
    duration = Infinity;
    
    name = "星火汇聚";
    tags = ["ability", "support"];
}

export { H_e74c3c_Ability };