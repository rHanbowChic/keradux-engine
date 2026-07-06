import { Buff, Chara, Damage } from "../../engine/engine";
import { Guarding } from "./Guarding";

class H750Supporting extends Buff {
    chores = (c: Chara) => {
        if (this.duration === 1) {
            if (c.health === 3 && c.moveStatus.tags.includes("attack"))
                c.buffs.push(new Guarding());
            if (c.health === 2 && c.moveStatus.damage !== null)
                c.moveStatus.damage.type = "magic";
            if (c.health === 1 && c.moveStatus.damage !== null) {
                c.moveStatus.damage.value += 1;
            }
        }
    };
    duration = 1;
    
    name = "全面战备";
    tags = ["defense", "support", "receiver-hook"];
}

export { H750Supporting };