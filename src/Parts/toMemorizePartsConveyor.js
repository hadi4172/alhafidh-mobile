import HifdhInformator from "src/Data/hifdhInformator";
import { convertFromSurahs } from "src/Data/quranStats";
import { bin2dec, dec2bin, getSum, removeFromArray } from "src/Utils/utils";
import MemorizedParts from "./memorizedParts";
import { Page } from "./part";

//s'occupera de donner la bonne partie à chaque jour
export default class ToMemorizePartsConveyor {
    allParts;
    leftParts;
    currentParts;

    static instance;

    static getInstance() {
        if (typeof this.instance == "undefined") this.instance = new MemorizedParts();
        return this.instance;
    }

    //should not be called
    constructor() {}

    initialize(orderedSurahs) {
        let orderedSurahsObject = orderedSurahs
            .map((s, i) => (s !== 0 ? { surahNumber: i + 1, order: s } : s))
            .filter(s => s !== 0)
            .sort((s1, s2) => s1.order - s2.order);
        let linesOfSurahs = orderedSurahsObject
            .map(s => convertFromSurahs(s.surahNumber))
            .map((l, i) => (l !== `000000000000000` ? { surahNumber: i + 1, lines: l } : 0))
            .filter(s => s !== 0);
        this.allParts = linesOfSurahs.map(s =>
            Page.newInstance(s.surahNumber).setToMemorizeLines(bin2dec(s.lines)).addObserver(this)
        );

        this.leftParts = this.allParts.slice(0);

        this.currentParts = [];
        this.sendNext();
    }

    /**
     * determine the next parts to memorize
     * Verify parts of currentParts which where memorized and generate new ones, then delete memorized ones from leftParts
     * send reference of memorized parts to MemorizedParts instance
     * 
     * @returns this.currentParts
     */
    sendNext() {
        let numberOfPagesNotMemorized = getSum(
            this.currentParts.map(
                p => dec2bin(p.getToMemorizeLines() - p.getMemorizedLines()).replace(/0/g, "").length / 15
            )
        );

        let numberOfPagesMemorized = MemorizedParts.getInstance().getNumberOfPagesMemorized();
        let nextNumberOfLines = Math.round(
            (HifdhInformator.getMainInstance().getdF(numberOfPagesMemorized) - numberOfPagesNotMemorized) * 15
        );

        while (nextNumberOfLines > 0 && this.leftParts.length > 0) {
            let nbOfToMemorizeLinesOfCurrentPage = dec2bin(this.leftParts[0].getToMemorizeLines()).replace(
                /0/g,
                ""
            ).length;

            if (nextNumberOfLines > nbOfToMemorizeLinesOfCurrentPage) {
                this.currentParts.push(this.leftParts.shift());
            } else {
                let clonePage = this.leftParts[0].clone();
                this.leftParts[0].removeToMemorizeNonIncludedLine(nextNumberOfLines);
                clonePage.removeToMemorizeNonIncludedLine(nbOfToMemorizeLinesOfCurrentPage - nextNumberOfLines, false);
                this.currentParts.push(clonePage);
            }
            nextNumberOfLines = max(nextNumberOfLines - nbOfToMemorizeLinesOfCurrentPage, 0);
        }
        return this.currentParts;
    }

    update(message) {
        for (const key in message) {
            switch (key) {
                case "memorized":
                    MemorizedParts.getInstance().push(
                        message[key].removeObserver(this).addObserver(MemorizedParts.getInstance())
                    );
                    removeFromArray(this.currentParts, message[key]);
                    break;
                case "lineMemorized":
                    MemorizedParts.getInstance().push(
                        message[key].ref.clone().removeObserver(this).addObserver(MemorizedParts.getInstance())
                    );
                    break;
                default:
                    break;
            }
        }
    }
}
