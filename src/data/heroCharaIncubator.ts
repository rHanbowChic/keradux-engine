import { Chara } from "../engine/engine";

import { Invincibility } from "./Buff/ability/Invincibility";
import { H_f4d03f_1_Ability } from "./Buff/ability/H_f4d03f_1_Ability";
import { H_ffffff_Ability } from "./Buff/ability/H_ffffff_Ability";
import { H_e74c3c_Ability } from "./Buff/ability/H_e74c3c_Ability";
import { H_2980b9_Ability } from "./Buff/ability/H_2980b9_Ability";
import { H_fadbd8_Ability } from "./Buff/ability/H_fadbd8_Ability";
import { H_b7950b_Ability } from "./Buff/ability/H_b7950b_Ability";
import { H_45b39d_Ability } from "./Buff/ability/H_45b39d_Ability";
import { H_af7ac5_Ability } from "./Buff/ability/H_af7ac5_Ability";

type charaTraits = {
    name: string,
    ability: new (...args: any[]) => any;
    
}

function heroCharaIncubator(id: string) : Chara {
    const idTraitsTable: {[key: string] : charaTraits} = {
        "trololo": {
            name: "TheGreatTroll", ability: Invincibility
        },
        "d35400": {
            name: "难民众", ability: null
        },
        "000000": {
            name: "「命运的抛光者」", ability: null
        },
        "f4d03f": {
            name: "老拳雄扎克", ability: null
        },
        "ffffff": {
            name: "“开拓者”", ability: H_ffffff_Ability
        },
        "e74c3c": {
            name: "火 神", ability: H_e74c3c_Ability
        },
        "2980b9": {
            name: "警员小李", ability: H_2980b9_Ability
        },
        "7e5109": {
            name: "彼得罗夫", ability: null
        },
        "fadbd8": {
            name: "Izumi-chan", ability: H_fadbd8_Ability
        },
        "27ae60": {
            name: "园艺师陈遥", ability: null
        },
        "b7950b": {
            name: "石川龙生", ability: H_b7950b_Ability
        },
        "45b39d": {
            name: "LT0018代一琮", ability: H_45b39d_Ability
        },
        "af7ac5": {
            name: "DH9126“小奇迹”", ability: H_af7ac5_Ability
        }
    };

    const c = new Chara();
    if (!(id in idTraitsTable)) {
        console.warn(`[${id}] was not a valid traits set. Returned a chara without traits.`);
        return c;
    }
    c.familiarName = idTraitsTable[id].name;
    if (idTraitsTable[id].ability !== null)
        c.buffs.push(new (idTraitsTable[id].ability)());
    return c;
}

export { heroCharaIncubator };