import { Field } from "../engine/engine";

abstract class HeroBehavior {
    // Move memory
    selfMoved: string[] = [];
    oppoMoved: string[] = [];

    updateMoveMemory(f: Field) {
        if (f.getRound() === 0) return;
        const round = f.getRound() - 1;
        this.selfMoved[round] = f.getLastUsedMove(1);
        this.oppoMoved[round] = f.getLastUsedMove(0);
    }

    abstract choose(f: Field) : string;

}

export { HeroBehavior };