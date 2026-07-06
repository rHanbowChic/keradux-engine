import { Move } from "../engine/engine";

// Nothing
import { Nothing } from "./Move/Nothing";
// General Moves
import { Attack } from "./Move/general/Attack";
import { Guard } from "./Move/general/Guard";
import { PowerAttack } from "./Move/general/PowerAttack";
import { Charge } from "./Move/general/Charge";
import { Heal } from "./Move/general/Heal";
// Character Moves
import { FD3Transform } from "./Move/character/FD3Transform";
import { H750Support } from "./Move/character/H750Support";

function moveFactory(id: string) : Move {
    const idClsTable: {[key: string] : new (...args: any[]) => any} = {
        "nothing": Nothing,
        "attack": Attack,
        "guard": Guard,
        "power_attack": PowerAttack,
        "charge": Charge,
        "heal": Heal,
        "fd3_transform": FD3Transform,
        "750_support": H750Support,
    }
    if (!(id in idClsTable)) {
        console.warn(`[${id}] was not a valid move. Returned [Nothing].`);
        return new Nothing();
    }
    let move = new idClsTable[id]();
    move.factoryId = id;
    return move;
}

export { moveFactory };
