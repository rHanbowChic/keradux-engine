import { Buff, Chara, Damage } from "../../../engine/engine";

class Invincibility extends Buff {
    chores = (c: Chara) => {
        c.takeDamage = function (d: Damage, damageSource: Chara) {
        }.bind(c);
    };
    duration = Infinity;
    
    name = "Invincibility";
    tags = ["ability", "defense", "receiver-hook", "general"];
}

export { Invincibility };