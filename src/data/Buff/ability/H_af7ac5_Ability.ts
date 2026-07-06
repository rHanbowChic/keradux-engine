import { Buff, Chara, Damage } from "../../../engine/engine";
import { P } from "../../../utils/utils";

class H_af7ac5_Ability extends Buff {
    applyInject: "before-move" | "after-move" = "after-move";

    chores = (c: Chara) => {
        if (c.health <= 0) {
            c.health = 2;
            c.metaData["phase2"] = true;
            this.duration = 1;  // 使Field实现发现并清除此效果
        }
    };

    duration = Infinity;

    name = "永远相伴";
    tags = ["ability", "defense", "support"];
}

export { H_af7ac5_Ability };