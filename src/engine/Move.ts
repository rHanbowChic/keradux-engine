import { Chara } from "./Chara";
import { Field } from "./Field";
import { Damage } from "./Damage";

type Scope = "self" | "enemy" | "all_but_self" | "ourside" | "enemyside" | "all";

abstract class Move {
    priority: number = 0;  // 优先度

    scope: Scope = "enemy";  // 作用范围

    mp_cost: number = null;  // 消耗的MP

    damage: Damage = null;  // 对手HP的减少值
    drain: number = null;  // 对手MP的减少值
    
    healing: number = null;  // 自身HP的增加值
    charge: number = null;  // 自身MP的增加值

    field_effect: ((f: Field) => void) | null = null;  // 施加的场地效果

    chara_effect: {
        chores: (c: Chara) => void,
        scope: Scope
    }[] = [];  // 施加的角色效果

    name: string;

    tags: string[] = [];

    factoryId: string;
}

export { Move, Scope };