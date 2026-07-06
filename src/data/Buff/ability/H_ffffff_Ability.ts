import { Buff, Chara, Damage } from "../../../engine/engine";
import { P } from "../../../utils/utils";

class H_ffffff_Ability extends Buff {
    chores = (c: Chara) => {
        if (c.health === 1) {
            if (c.metaData["magicify"] && c.moveStatus.damage !== null) {
                c.moveStatus.damage.type = "magic";
            }
            c.metaData["magicify"] = undefined;
            if (c.moveStatus.factoryId === "guard") c.mana += 1;
            if (c.moveStatus.factoryId === "charge") c.metaData["magicify"] = true;
            if (c.moveStatus.tags.includes("attack"))
                c.takeDamage = function (d: Damage, damageSource: Chara) {
                };
        }
    };
    duration = Infinity;
    
    name = "万众一心";
    tags = ["ability", "defense", "support"];
}

export { H_ffffff_Ability };