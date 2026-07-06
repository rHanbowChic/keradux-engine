import { Field, Move } from "../engine/engine";

abstract class BaseAi {
    availableMoves = ["attack", "power_attack", "guard", "charge"];

    abstract think(f: Field) : string;

}

export { BaseAi };