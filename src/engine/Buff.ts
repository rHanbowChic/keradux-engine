import { Chara } from "./Chara";

abstract class Buff {
    chores: (c: Chara) => void;
    duration: number = 1;
    applyInject: "before-move" | "after-move" = "before-move";

    name: string;
    tags: string[] = [];
}

export { Buff };