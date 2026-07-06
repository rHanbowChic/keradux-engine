import { Buff, Chara, Damage } from "../../../engine/engine";
import { P } from "../../../utils/utils";

class H_fadbd8_Ability extends Buff {
    chores = (c: Chara) => {
        if (c.metaData[`useabl_${c.location.getRound()}`]) {
            c.takeDamage(Damage.direct(1), c);
            if (P(0.75 - c.health*0.15)) {
                c.mana += 3;
            }
            else {
                if (c.moveStatus.damage !== null && c.moveStatus.damage.type == "physical")
                    c.moveStatus.damage.value += 1;
            }
        }
        if (P(c.health === 1 ? 0.5 : 0.3)) c.metaData[`useabl_${c.location.getRound()+1}`] = true;
    };
    duration = Infinity;
    
    name = "★☆★☆";
    tags = ["ability", "support"];
}

export { H_fadbd8_Ability };