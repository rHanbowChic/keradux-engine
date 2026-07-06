import { Field, Move } from "../engine/engine";
import { BaseAi } from "./BaseAi"
import { rdSelect, P } from "../utils/utils"

class GeneralAi extends BaseAi {
    movesBelow3Mana = ["attack", "guard", "charge"];
    movesBelow1Mana = ["guard", "charge"];
    think(f: Field): string {
        if (P(0.07)) return this.randomCard(f);  // 7%的概率，AI会完全随机地出牌

        const selfMP = f.getStatus("mana", 1);
        const selfHP = f.getStatus("health", 1);
        const oppoMP = f.getStatus("mana", 0);
        const oppoHP = f.getStatus("health", 0);

        if (selfMP >= 3 && oppoHP == 1) return "power_attack";
        if (selfMP >= 2 && oppoHP == 1) return "attack";

        if (selfHP == 3 && oppoHP == 3 && oppoMP > selfMP) {
            if (P(0.5)) return "charge";
            return "guard";
        }
        if (selfHP < oppoHP && selfMP == 2) {
            if (P(0.5)) return "charge";
        }
        if (selfHP == 1 && oppoHP == 1 && selfMP == 0) {
            if (P(0.5)) return "guard";
        }
        
        
        if (selfMP >= 1 && oppoHP == 1 && P(0.8)) return "attack";

        if (selfHP == 1 && oppoMP < 2) {
            if (P(0.6)) return "guard";
        }
        if (selfHP == 1 && selfMP > 0) {
            if (selfMP >= 3) return "power_attack";
            return "attack";
        }


        if (selfMP >= 3 && P(selfMP / 5) && P(0.7)) return "power_attack";
        if (oppoMP >= 2 && P(0.5)) return "charge";
        if (selfMP == 0) return "charge";
        if (P(1 - Math.exp(selfMP/(-2)) / 2)) return "attack";
        return "charge";

    }

    randomCard(f: Field) {
        if (f.getStatus("mana", 1) < 1)
            return rdSelect(this.movesBelow1Mana) as string;
        if (f.getStatus("mana", 1) < 3)
            return rdSelect(this.movesBelow3Mana) as string;
        return rdSelect(this.availableMoves) as string;
    }

}

export { GeneralAi };