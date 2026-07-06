import { Move } from "./Move";
import { Buff } from "./Buff";
import { Field } from "./Field";
import { Damage } from "./Damage";

class Chara {
    health: number = 3;
    mana: number = 0;
    
    buffs: Buff[] = [];
    moveStatus: Move;

    metaData: { [key: string]: any } = {};

    location: Field = null;
    locationPoint: number = null;

    familiarName: string = "";

    takeDamage(d: Damage, damageSource: Chara) {
        this.health -= d.value;
        // 这个函数可被技能修改，以实现被动效果。damageSource在默认情况下并不会用到。
    }

    takeDrain(d: number, damageSource: Chara) {
        this.mana -= d;
        // 这个函数可被技能修改，以实现被动效果。damageSource在默认情况下并不会用到。
    }

    takeHealing(h: number) {
        this.health += h;
        // 这个函数可被技能修改，以实现被动效果。
    }

    takeCharge(h: number) {
        this.mana += h;
        // 这个函数可被技能修改，以实现被动效果。
    }

    costMana(cost: number) {
        this.mana -= cost;
    }


    private static applyBuffsWithKind(c: Chara, k: "after-move" | "before-move") {
        let i = 0;
        while (i < c.buffs.length) {
            if (c.buffs[i].applyInject !== k) {
                i += 1;
                continue;
            }
            c.buffs[i].chores(c);
            c.buffs[i].duration -= 1;
            if (c.buffs[i].duration <= 0) c.buffs.splice(i, 1);
            else i += 1;
        }
    }
    static applyBuffs(c: Chara) {
        this.applyBuffsWithKind(c, "before-move");
    }

    static applyLaterBuffs(c: Chara) {
        this.applyBuffsWithKind(c, "after-move");
    }

    static applyLastNBuffs(c: Chara, n: number) {
        {
            let i = c.buffs.length - n;
            while (i < c.buffs.length) {
                c.buffs[i].chores(c);
                c.buffs[i].duration -= 1;
                if (c.buffs[i].duration <= 0) c.buffs.splice(i, 1);
                else i += 1;
            }
        }
    }

    static resetReceivers(c: Chara) {
        const takeDamage = function (d: Damage, damageSource: Chara) {
            this.health -= d.value;
        }.bind(c);
        const takeDrain = function (d: number, damageSource: Chara) {
            this.mana -= d;
        }.bind(c);
        const takeHealing = function (h: number) {
            this.health += h;
        }.bind(c);
        const takeCharge = function (h: number) {
            this.mana += h;
        }.bind(c)
        const costMana = function (cost: number) {
            this.mana -= cost;
        }.bind(c);


        c.takeDamage = takeDamage;
        c.takeDrain = takeDrain;
        c.takeHealing = takeHealing;
        c.takeCharge = takeCharge;
        c.costMana = costMana;

    }

    static withName(name: string) : Chara {
        const c = new Chara();
        c.familiarName = name;
        return c;
    }

}

export { Chara };