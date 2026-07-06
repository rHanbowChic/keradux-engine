import { Chara } from "./Chara";
import { Effect } from "./Effect";
import { Move } from "./Move";
import { Board } from "./Board";
import { htmlEscape as e } from "../utils/utils";

// 双人场地。
class Field {
    charas: Chara[] = [];
    round: number = 0;

    effects: Effect[] = [];
    
    metaData: { [key: string]: any } = {};

    isOver: boolean = false;

    board: Board = new Board();

    constructor(c0: Chara, c1: Chara) {
        this.charas.push(c0);
        c0.location = this;
        c0.locationPoint = 0;
        this.charas.push(c1);
        c1.location = this;
        c1.locationPoint = 1;
    }

    
    turn(m0: Move, m1: Move) {
        this.charas[0].moveStatus = m0;
        this.charas[1].moveStatus = m1;

        const cs = this.charas.slice();
        cs.sort((a, b) => b.moveStatus.priority == a.moveStatus.priority ?
            Math.random() - 0.5 :
            b.moveStatus.priority - a.moveStatus.priority
        );

        for (let i of [0, 1]) {
            Chara.applyBuffs(cs[i]);
        }
        for (let i of [0, 1]) {
            Board.narrate(this.board,
                `[${cs[i].familiarName == "Player" ? cs[i].familiarName : "cs[i].familiarName"}] 使用了 [${cs[i].moveStatus.name}]`);
            const selfId = i;
            const oppoIds = ["all"].includes(cs[i].moveStatus.scope) ? [i, i^1] : 
                ["self", "ourside"].includes(cs[i].moveStatus.scope) ? [i] : [i^1];
            
            if (cs[selfId].mana < cs[selfId].moveStatus.mp_cost) {
                console.warn(`Attempt to use [${cs[selfId].moveStatus.name}] while mana is below [${cs[selfId].moveStatus.mp_cost}]`);
                continue;
            }
            cs[selfId].costMana(cs[selfId].moveStatus.mp_cost);
            for (let oppoId of oppoIds) {
                if (cs[selfId].moveStatus.damage !== null)
                    cs[oppoId].takeDamage(cs[selfId].moveStatus.damage, cs[selfId]);

                if (cs[selfId].moveStatus.drain !== null)
                    cs[oppoId].takeDrain(cs[selfId].moveStatus.drain, cs[selfId]);
            }

            if (cs[selfId].moveStatus.healing !== null)
                cs[selfId].takeHealing(cs[selfId].moveStatus.healing);

            if (cs[selfId].moveStatus.charge !== null)
                cs[selfId].takeCharge(cs[selfId].moveStatus.charge);
            

            for (let e of cs[i].moveStatus.chara_effect) {
                const oppos = ["all"].includes(e.scope) ? [cs[i], cs[i^1]] :
                    ["self", "ourside"].includes(e.scope) ? [cs[i]] : [cs[i^1]];
                for (let oppo of oppos) {
                    e.chores(oppo);
                }
            }


            if (cs[i].moveStatus.field_effect !== null) {
                cs[i].moveStatus.field_effect(this);
            }
            
        }
        for (let i of [0, 1]) {
            Chara.applyLaterBuffs(cs[i]);
        }
        for (let i of [0, 1]) {
            Chara.resetReceivers(cs[i]);
        }

        {
            let i = 0;
            while (i < this.effects.length) {
                this.effects[i].chores(this);
                this.effects[i].duration -= 1;
                if (this.effects[i].duration == 0) this.effects.splice(i, 1);
                else i += 1;
            }
        }

        if (!this.isOver) {
            if (this.charas[0].health <= 0 && this.charas[1].health <= 0) {
                Board.narrate(this.board, `游戏结束！出现了平局！`);
                this.isOver = true;
            }
            else if (this.charas[0].health <= 0) {
                Board.narrate(this.board, `游戏结束！[1]获胜！`);
                this.isOver = true;
            }
            else if (this.charas[1].health <= 0) {
                Board.narrate(this.board, `游戏结束！[0]获胜！`);
                this.isOver = true;
            }
        }
        
        this.round += 1;
    }

    getStatus(statusType: "health" | "mana", chara: 0 | 1) : number {
        if (statusType == "health") {
            return this.charas[chara].health;
        }
        else if (statusType == "mana") {
            return this.charas[chara].mana;
        }
        return null;
    }

    getRound() : number {
        return this.round;
    }

    getLastUsedMove(chara: 0 | 1) : string {
        if (this.charas[chara].moveStatus === undefined) return null;
        return this.charas[chara].moveStatus.factoryId;
    }

    getAllStatus() : string {
        return `[0] Health: ${this.getStatus("health", 0)}, Mana: ${this.getStatus("mana", 0)}
[1] Health: ${this.getStatus("health", 1)}, Mana: ${this.getStatus("mana", 1)}`
    }

    getBoardContentHTML(useColor: boolean) : string {
        let o = "";
        for (let item of this.board.items) {
            o += `<div class="board-item board-${e(item.origin.type)}"${useColor ? ' style="color: ' + e(item.color) + ';"' : ""}>
    <span class="board-sender">${e(item.origin.sender)}</span>
    <span class="board-text">${e(item.text)}</span>
</div>
`;  // 多人游戏注意！这里有潜在的XSS风险，即使我们已经过滤一次，但最佳的实践应为在传递到此函数前进行恶意代码检查
        }
        return o;
    }


    static startWithNewSimpleCharas() {
        const c0 = new Chara();
        const c1 = new Chara();
        return new Field(c0, c1);
    }
}

export { Field };