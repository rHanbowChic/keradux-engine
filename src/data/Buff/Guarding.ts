import { Buff, Chara, Damage } from "../../engine/engine";

class Guarding extends Buff {
    chores = (c: Chara) => {
        c.takeDamage = function (d: Damage, damageSource: Chara) {
            if (d.type !== "physical") this.health -= d.value;
        }.bind(c);
    };
    duration = 1;
    
    name = "Guarding";
    tags = ["defense", "receiver-hook", "general"];
}

export { Guarding };