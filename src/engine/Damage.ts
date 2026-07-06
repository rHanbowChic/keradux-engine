type DamageType = "physical" | "magic" | "direct";

class Damage {
    value: number;
    type: DamageType;

    constructor(v: number, t: DamageType) {
        this.value = v;
        this.type = t;
    }
    static physical(v: number) {
        return new Damage(v, "physical");
    }
    static magic(v: number) {
        return new Damage(v, "magic");
    }
    static direct(v: number) {
        return new Damage(v, "direct");
    }
}

export { Damage, DamageType };