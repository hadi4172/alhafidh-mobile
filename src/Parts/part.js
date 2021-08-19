import Observable from "src/Utils/observable";
import { dec2hex, dec2bin, bin2dec, hex2dec } from "src/Utils/utils.js";

class Part extends Observable {
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
        return new this.constructor().setFromLitteralObject(o);
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

    /**
     * Should Never be called directly, instead, use static factory methods
     */
    constructor(number, isMemorized, isQadim, nextReading, revisionHealth, maxRevisionHealth, consolidation) {
        super();
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
            number: this.number,
            isMemorized: this.isMemorized,
            isQadim: this.isQadim,
            nextReading: this.nextReading,
            revisionHealth: this.revisionHealth,
            maxRevisionHealth: this.maxRevisionHealth,
            consolidation: this.consolidation,
            observers: this.observers,
        };
    }

    setFromLitteralObject(o) {
        for (const key in o) {
            this[key] = o[key];
        }
        return this;
    }

    setNextReadingDate(date) {
        this.nextReading = date;
    }

    memorize() {
        this.isMemorized = true;
        this.revisionHealth = initialRevisionHealthOnMemorization;
        this.maxRevisionHealth = initialRevisionHealthOnMemorization;

        this.notifyAllObservers({ memorized: this });
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

        this.notifyAllObservers({ revised: this });
    }

    neglect() {
        this.revisionHealth = max(this.revisionHealth - 1, 0);
        if (this.isQadim && this.isForgotten()) {
            this.isQadim = false;
            this.consolidation -= 5;
            this.revisionHealth = max(maxRevisionHealth - 5, 0);
        }
        this.notifyAllObservers({ neglected: this });
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
    /**
     * Should Never be called directly, instead, use static factory methods
     */
    constructor(number, isMemorized, isQadim, nextReading, revisionHealth, maxRevisionHealth, consolidation) {
        super(number, isMemorized, isQadim, nextReading, revisionHealth, maxRevisionHealth, consolidation);
    }
}

class Surah extends Part {
    /**
     * Should Never be called directly, instead, use static factory methods
     */
    constructor(number, isMemorized, isQadim, nextReading, revisionHealth, maxRevisionHealth, consolidation) {
        super(number, isMemorized, isQadim, nextReading, revisionHealth, maxRevisionHealth, consolidation);
    }
}

class Page extends Part {
    toMemorizeLines;
    memorizedLines;
    consolidationOfLines;

    FULL_PAGE = 0b111111111111111;

    /**
     * Should Never be called directly, instead, use static factory methods
     */
    constructor(
        number,
        isMemorized,
        isQadim,
        nextReading,
        revisionHealth,
        maxRevisionHealth,
        consolidation,
        toMemorizeLines,
        memorizedLines,
        consolidationOfLines
    ) {
        super(number, isMemorized, isQadim, nextReading, revisionHealth, maxRevisionHealth, consolidation);
        this.toMemorizeLines = toMemorizeLines;
        this.memorizedLines = typeof memorizedLines === "undefined" ? 0b000000000000000 : memorizedLines;
        this.consolidationOfLines =
            typeof consolidationOfLines === "undefined" ? 0x000000000000000 : consolidationOfLines;
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
        this.notifyAllObservers({ lineRevised: { ref: this, index } });
    }

    //index from 1 to 15
    memorizeLine(index) {
        let byte = 0b1 << (15 - index - 1);
        this.memorizedLines |= byte;
        this.notifyAllObservers({ lineMemorized: { ref: this, index } });
    }

    //index from 1 to 15
    addLineToMemorize(index) {
        let byte = 0b1 << (15 - index - 1);
        this.toMemorizeLines |= byte;
    }

    //index from 1 to 15
    removeLineToMemorize(index) {
        let byte = 0b1 << (15 - index - 1);
        this.toMemorizeLines &= ~byte;
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
     * Get if line is memorized
     * @param {int} index from 1 to 15
     * @returns is line memorized (bool)
     */
    isLineToMemorizeAt(index) {
        return bin2dec(dec2bin(this.memorizedLines).charAt(15 - index - 1));
    }

    addToMemorizeNonIncludedLine(times = 1, fromLeft = true) {
        for (let j = 0; j < times; j++) {
            for (let i = 0; i < 15; i++) {
                if (!this.isLineToMemorizeAt(fromLeft ? i + 1 : 15 - i)) {
                    this.addLineToMemorize(fromLeft ? i + 1 : 15 - i);
                    break;
                }
            }
        }
    }

    removeToMemorizeNonIncludedLine(times = 1, fromLeft = true) {
        for (let j = 0; j < times; j++) {
            for (let i = 0; i < 15; i++) {
                if (this.isLineToMemorizeAt(fromLeft ? i + 1 : 15 - i)) {
                    this.removeLineToMemorize(fromLeft ? i + 1 : 15 - i);
                    break;
                }
            }
        }
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

    getToMemorizeLines() {
        return this.toMemorizeLines;
    }

    setToMemorizeLines(toMemorizeLines) {
        this.toMemorizeLines = toMemorizeLines;
        return this;
    }

    generateLitteralObject() {
        return {
            ...super.generateLitteralObject(),
            toMemorizeLines: this.toMemorizeLines,
            memorizedLines: this.memorizedLines,
            consolidationOfLines: this.consolidationOfLines,
        };
    }

    clone() {
        return Page.createFromLitteralObject(this.generateLitteralObject());
    }
}

export { Part, Juz, Surah, Page };
