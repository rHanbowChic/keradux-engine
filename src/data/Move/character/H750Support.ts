import { Chara, Field, Move, Scope } from "../../../engine/engine";
import { H750Supporting } from "../../Buff/H750Supporting";

class H750Support extends Move {

    chara_effect = [
        {
            chores: (c: Chara) => {
                c.buffs.push(new H750Supporting);
            },
            scope: "self" as Scope
        },
    ];

    name = "Overload";
    tags = ["chores-drived"];
}

export { H750Support };