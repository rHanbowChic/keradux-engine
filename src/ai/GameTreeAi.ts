import { Field, Move } from "../engine/engine";
import { BaseAi } from "./BaseAi";
import { rdSelect } from "../utils/utils";

class GameTreeAi extends BaseAi {
    private MAX_DEPTH = 10;
    private MEM_BOUND_DEPTH = 3;
    private MODIFIER_GUARD = () => 1 + Math.random() * 0.2;
    private MODIFIER_ATTACK = () => 1;
    private MODIFIER_POWER_ATTACK = () => 1;
    private MODIFIER_CHARGE = () => 1.2 + Math.random() * 0.6;
    private memo: any = {};
    eTable = {"attack": 0, "power_attack": 0, "guard": 0, "charge": 0,};

    think(f: Field): string {
        const selfMP = f.getStatus("mana", 1);
        const selfHP = f.getStatus("health", 1);
        const oppoMP = f.getStatus("mana", 0);
        const oppoHP = f.getStatus("health", 0);
        this.winRate(selfHP, selfMP, oppoHP, oppoMP, 0);
        this.memo = {};
        this.eTable.attack *= this.MODIFIER_ATTACK();

        this.eTable.power_attack *= this.MODIFIER_POWER_ATTACK();
        this.eTable.guard *= this.MODIFIER_GUARD();
        this.eTable.charge *= this.MODIFIER_CHARGE();

        let maxE = 0;
        for (let i in this.eTable) {
            let iKey = i as keyof typeof this.eTable;
            if (this.eTable[iKey] > maxE) maxE = this.eTable[iKey];
        }
        const goodMoves: string[] = [];
        for (let i in this.eTable) {
            let iKey = i as keyof typeof this.eTable;
            if (this.eTable[iKey] == maxE) goodMoves.push(i);
        }
        //console.log(`Skill weights:`);
        //console.log(this.eTable);
        return rdSelect(goodMoves) as string;
    }

    private winRate(selfHP: number, selfMP: number, oppoHP: number, oppoMP: number, depth: number) {
        // 终点状态
        if (oppoHP == 0 && selfHP == 0) return 0.5;
        if (oppoHP == 0) return 1;
        if (selfHP == 0) return 0;

        // 过深情况
        if (depth >= this.MAX_DEPTH) return 0.5;
        depth += 1;

        // 检测记忆
        let o: number | undefined;
        if ((o = this.remind(selfHP, selfMP, oppoHP, oppoMP)) !== undefined) return o;

        let rate: number = 0;
        
        let avaiSelf: number;
        let avaiOppo: number;
        if (selfMP > 0) {
            if (selfMP >= 3) avaiSelf = 4;
            else avaiSelf = 3;
        }
        else avaiSelf = 2;
        if (oppoMP > 0) {
            if (oppoMP >= 3) avaiOppo = 4;
            else avaiOppo = 3;
        }
        else avaiOppo = 2;

        let amount: number = avaiSelf * avaiOppo;

        
        let a_rate = 0;
        if (selfMP > 0) {  // Self: attack
            if (oppoMP > 0 && oppoMP < 3)
            // attack
                a_rate += this.winRate(selfHP-1, selfMP-1, oppoHP-1, oppoMP-1, depth) / amount;
            if (oppoMP >= 3)
            //power_attack
                a_rate += this.winRate(selfHP-1, selfMP-1, oppoHP-1, oppoMP-3, depth) / amount * 5;  // 如果对方可以出power_attack，一般来说不会放过这一招
            // guard
            a_rate += this.winRate(selfHP, selfMP-1, oppoHP, oppoMP, depth) / amount;
            // charge
            a_rate += this.winRate(selfHP, selfMP-1, oppoHP-1, oppoMP+1, depth) / amount;

        }
        rate += a_rate;
        let p_rate = 0;
        if (selfMP >= 3) {  // Self: power_attack
            if (oppoMP > 0 && oppoMP < 3)
            // attack
                p_rate += this.winRate(selfHP-1, selfMP-3, oppoHP-1, oppoMP-1, depth) / amount;
            if (oppoMP >= 3)
            //power_attack
                p_rate += this.winRate(selfHP-1, selfMP-3, oppoHP-1, oppoMP-3, depth) / amount * 5;
            // guard
            p_rate += this.winRate(selfHP, selfMP-3, oppoHP-1, oppoMP, depth) / amount;
            // charge
            p_rate += this.winRate(selfHP, selfMP-3, oppoHP-1, oppoMP+1, depth) / amount;
        }

        let g_rate = 0;
        // Self: guard
        if (oppoMP > 0 && oppoMP < 3)
        // attack
            g_rate += this.winRate(selfHP, selfMP, oppoHP, oppoMP-1, depth) / amount;
        if (oppoMP >= 3)
        //power_attack
            g_rate += this.winRate(selfHP-1, selfMP, oppoHP, oppoMP-3, depth) / amount * 5;
        // guard
        g_rate += this.winRate(selfHP, selfMP, oppoHP, oppoMP, depth) / amount;
        // charge
        g_rate += this.winRate(selfHP, selfMP, oppoHP, oppoMP+1, depth) / amount;
        rate += g_rate;

        let c_rate = 0;
        // Self: charge
        if (oppoMP > 0 && oppoMP < 3)
        // attack
            c_rate += this.winRate(selfHP-1, selfMP+1, oppoHP, oppoMP-1, depth) / amount;
        if (oppoMP >= 3)
        //power_attack
            c_rate += this.winRate(selfHP-1, selfMP+1, oppoHP, oppoMP-3, depth) / amount * 5;
        // guard
        c_rate += this.winRate(selfHP, selfMP+1, oppoHP, oppoMP, depth) / amount;
        // charge
        c_rate += this.winRate(selfHP, selfMP+1, oppoHP, oppoMP+1, depth) / amount;
        rate += c_rate;

        // 保存记忆
        if (this.MAX_DEPTH - depth > this.MEM_BOUND_DEPTH)  // 最靠近顶端的计算结果准确度欠佳，会污染记忆
            this.memorize(selfHP, selfMP, oppoHP, oppoMP, rate);

        if (depth == 1) {
            this.eTable.attack = a_rate;
            this.eTable.charge = c_rate;
            this.eTable.guard = g_rate;
            this.eTable.power_attack = p_rate;
        }
        
        return rate;

    }

    private memorize(selfHP: number, selfMP: number, oppoHP: number, oppoMP: number, rate: number) {
        this.memo[`${selfHP},${selfMP},${oppoHP},${oppoMP}`] = rate;
    }
    private remind(selfHP: number, selfMP: number, oppoHP: number, oppoMP: number) : number | undefined {
        
        return this.memo[`${selfHP},${selfMP},${oppoHP},${oppoMP}`];
    }



    static createWithArguments(maxDepth: number, memBoundDepth: number,
        mod_atk: FunctionReturnsNum, mod_pwa: FunctionReturnsNum, mod_chg: FunctionReturnsNum, mod_def: FunctionReturnsNum
    ) : GameTreeAi {
        let ai = new GameTreeAi();
        ai.MAX_DEPTH = maxDepth;
        ai.MEM_BOUND_DEPTH = memBoundDepth;
        ai.MODIFIER_ATTACK = mod_atk;
        ai.MODIFIER_CHARGE = mod_chg;
        ai.MODIFIER_GUARD = mod_def;
        ai.MODIFIER_POWER_ATTACK = mod_pwa;
        return ai;

    }

}

type FunctionReturnsNum = () => number;

export { GameTreeAi };
