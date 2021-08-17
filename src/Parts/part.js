import { dec2hex, dec2bin, bin2dec, hex2dec } from "src/Utils/utils.js";

class Part {
    number;
    isMemorized;
    isQadim;
    nextReading;
    revisionHealth;
    maxRevisionHealth;
    finalMaxRevisionHealth = 15;
    consolidation;
    consolidationToPassQadim = 30;
    stepToIncrementMaxRevisionHealth = 5;
    initialRevisionHealthOnMemorization = 3;

    static createFromLitteralObject(o) {
        return new this.constructor(
            o.number,
            o.isMemorized,
            o.isQadim,
            o.nextReading,
            o.revisionHealth,
            o.maxRevisionHealth,
            o.consolidation
        );
    }

    static newInstance(number) {
        return new this.constructor(number, false, false, undefined, 0, 0, 0);
    }

    static newInstanceWithConsolidation(number, consolidation) {
        return new this.constructor(
            number,
            true,
            false,
            undefined,
            initialRevisionHealthOnMemorization + (consolidation % stepToIncrementMaxRevisionHealth),
            initialRevisionHealthOnMemorization + (consolidation % stepToIncrementMaxRevisionHealth),
            consolidation
        );
    }

    constructor(number, isMemorized, isQadim, nextReading, revisionHealth, maxRevisionHealth, consolidation) {
        this.number = number;
        this.isMemorized = isMemorized;
        this.isQadim = isQadim;
        this.nextReading = nextReading;
        this.revisionHealth = revisionHealth;
        this.maxRevisionHealth = maxRevisionHealth;
        this.consolidation = consolidation;
    }

    generateLitteralObject() {
        return {
            number,
            isMemorized,
            isQadim,
            nextReading,
            revisionHealth,
            maxRevisionHealth,
            consolidation,
        };
    }

    setNextReadingDate(date) {
        this.nextReading = date;
    }

    memorize() {
        this.isMemorized = true;
        this.revisionHealth = initialRevisionHealthOnMemorization;
        this.maxRevisionHealth = initialRevisionHealthOnMemorization;
    }

    revise() {
        if (this.isMemorized && this.revisionHealth !== this.maxRevisionHealth) {
            this.revisionHealth = min(this.revisionHealth + (this.isQadim ? 1 : 0.5), this.maxRevisionHealth);
        }

        this.consolidation = min(this.consolidation + 1, this.consolidationToPassQadim);
        if (!this.isQadim && this.consolidation === this.consolidationToPassQadim) {
            this.passToQadim();
        } else if (
            this.consolidation % this.stepToIncrementMaxRevisionHealth === 0 &&
            this.maxRevisionHealth !== this.finalMaxRevisionHealth
        ) {
            this.revisionHealth++;
            this.maxRevisionHealth++;
        }
    }

    neglect() {
        this.revisionHealth = max(this.revisionHealth - 1, 0);
        if (this.isQadim && this.isForgotten()) {
            this.isQadim = false;
            this.consolidation -= 5;
            this.revisionHealth = max(maxRevisionHealth - 5, 0);
        }
    }

    isForgotten() {
        return revisionHealth === 0;
    }

    passToQadim() {
        this.isQadim = true;
        this.maxRevisionHealth = this.finalMaxRevisionHealth;
    }
}

class Juz extends Part {
    constructor(number) {
        super(number);
    }
}

class Surah extends Part {
    constructor(number) {
        super(number);
    }
}

class Page extends Part {
    memorizedLines;
    consolidationOfLines;

    FULL_PAGE = 0b111111111111111;

    constructor(number) {
        super(number);
        this.memorizedLines = 0b000000000000000;
        this.consolidationOfLines = 0x000000000000000;
    }

    memorize() {
        super.memorize();
        let sumOfLinesConsolidation = 0;
        for (let i = 1; i <= 15; i++) sumOfLinesConsolidation += this.getLineConsolidationAt(i);
        this.consolidation = Math.round(sumOfLinesConsolidation / 15);
    }

    //index from 1 to 15
    reviseLine(index) {
        let byte = Math.pow(15 - index - 1, 16);
        let lineIsNotRevisedAtMaximum = hex2dec(dec2hex(this.consolidationOfLines).charAt(15 - index - 1)) < 0xf;
        if (lineIsNotRevisedAtMaximum) {
            this.memorizedLines += byte;
        }
    }

    //index from 1 to 15
    memorizeLine(index) {
        let byte = 0b1 << (15 - index - 1);
        this.memorizedLines |= byte;
    }

    /**
     * Get if line is memorized
     * @param {int} index from 1 to 15
     * @returns is line memorized (bool)
     */
    isLineMemorizedAt(index) {
        return bin2dec(dec2bin(this.memorizedLines).charAt(15 - index - 1));
    }

    /**
     * Get consolidation of line
     * @param {int} index from 1 to 15
     * @returns consolidation of line (int between 0 and 15)
     */
    getLineConsolidationAt(index) {
        return hex2dec(dec2hex(this.consolidationOfLines).charAt(15 - index - 1));
    }

    getMemorizedLines() {
        return this.memorizedLines;
    }

    setMemorizedLines(memorizedLines) {
        this.memorizedLines = memorizedLines;
        return this;
    }

    addMemorizedLines(memorizedLines) {
        this.memorizedLines |= memorizedLines;
        if (!this.isMemorized && this.memorizedLines === this.FULL_PAGE) {
            this.memorize();
        }
    }
}

export { Part, Juz, Surah, Page };
