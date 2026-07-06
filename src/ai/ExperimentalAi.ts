import { Field, Move } from "../engine/engine";
import { BaseAi } from "./BaseAi";
import { rdSelect } from "../utils/utils";

class ExperimentalAi extends BaseAi {
    think(f: Field): string {
        const selfMP = f.getStatus("mana", 1);
        const selfHP = f.getStatus("health", 1);
        const oppoMP = f.getStatus("mana", 0);
        const oppoHP = f.getStatus("health", 0);

        const eTable = {"attack": 0, "power_attack": 0, "guard": 0, "charge": 0,};

        /* guard */
        if (this.canUseAtk(oppoMP)) {
            eTable.guard = 1;
        }


        /* charge */
        eTable.charge = 1;

        if (this.canUsePwAtk(selfMP))
        {
            /* power_attack */
            if (oppoHP == 1) eTable.power_attack = 1000000;
        }
        if (this.canUseAtk(selfMP))
        {
            /* attack */
            eTable.attack = 1;
        }

        let maxE = 0;
        for (let i in eTable) {
            let iKey = i as keyof typeof eTable;
            if (eTable[iKey] > maxE) maxE = eTable[iKey];
        }
        const goodMoves: string[] = [];
        for (let i in eTable) {
            let iKey = i as keyof typeof eTable;
            if (eTable[iKey] == maxE) goodMoves.push(i);
        }
        return rdSelect(goodMoves) as string;
    }
    private canUsePwAtk(mp: number) : boolean {
        return mp >= 3;
    }
    private canUseAtk(mp: number) : boolean {
        return mp > 0;
    }
    private canOnlyUseAtk(mp: number) : boolean {
        return mp > 0 && mp < 3;
    }
    private cannotAtk(mp: number) : boolean {
        return mp == 0;
    }
}

export { ExperimentalAi };