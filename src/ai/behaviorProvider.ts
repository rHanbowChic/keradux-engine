import { HeroBehavior } from "./HeroBehavior";

import { TestChara223Behavior } from "./heroes/TestChara223Behavior";
import { H_d35400_Behavior } from "./heroes/H_d35400_Behavior";
import { H_000000_Behavior } from "./heroes/H_000000_Behavior";
import { H_f4d03f_Behavior } from "./heroes/H_f4d03f_Behavior";
import { H_ffffff_Behavior } from "./heroes/H_ffffff_Behavior";
import { H_e74c3c_Behavior } from "./heroes/H_e74c3c_Behavior";
import { H_2980b9_Behavior } from "./heroes/H_2980b9_Behavior";
import { H_7e5109_Behavior } from "./heroes/H_7e5109_Behavior";
import { H_fadbd8_Behavior } from "./heroes/H_fadbd8_Behavior";
import { H_27ae60_Behavior } from "./heroes/H_27ae60_Behavior";
import { H_b7950b_Behavior } from "./heroes/H_b7950b_Behavior";
import { H_45b39d_Behavior } from "./heroes/H_45b39d_Behavior";
import { H_af7ac5_Behavior } from "./heroes/H_af7ac5_Behavior";

function behaviorProvider(id: string) : HeroBehavior {
    const idBehaviorTable: {[key: string] : new (...args: any[]) => any} = {
        "trololo": TestChara223Behavior,
        "d35400": H_d35400_Behavior,
        "000000": H_000000_Behavior,
        "f4d03f": H_f4d03f_Behavior,
        "ffffff": H_ffffff_Behavior,
        "e74c3c": H_e74c3c_Behavior,
        "2980b9": H_2980b9_Behavior,
        "7e5109": H_7e5109_Behavior,
        "fadbd8": H_fadbd8_Behavior,
        "27ae60": H_27ae60_Behavior,
        "b7950b": H_b7950b_Behavior,
        "45b39d": H_45b39d_Behavior,
        "af7ac5": H_af7ac5_Behavior,
    }
    if (!(id in idBehaviorTable)) {
        throw "Invalid behavior: " + id;
    }
    return new idBehaviorTable[id]();
}

export { behaviorProvider };