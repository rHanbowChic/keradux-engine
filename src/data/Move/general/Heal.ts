import { Move } from "../../../engine/engine";

class Heal extends Move {
    healing = 1;

    name = "Heal";
    tags = ["support", "data-drived", "general"];
}

export { Heal };