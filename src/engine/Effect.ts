import { Field } from "./Field";

class Effect {
    chores: (f: Field) => void;
    duration: number = 1;

    name: string;
    tags: string[] = [];
}

export { Effect };