import {
    surahInfo,
    convertFromJuzs,
    convertFromPages,
    convertFromSurahs,
    convertFromLines,
    subtractLines,
    getLengthOfSurahInPages,
} from "src/Data/quranStats";
import { bin2dec, dec2bin, getSum } from "src/Utils/utils";
import { Juz, Page, Surah } from "./part";

class MemorizedParts extends Array {
    push(...parts) {
        for (let part of parts) {
            if (part instanceof Page && part.getMemorizedLines !== part.FULL_PAGE) {
                let correspondingPage = this.find(e => e instanceof Page && part.number === e.number);
                if (typeof correspondingPage !== "undefined")
                    correspondingPage.addMemorizedLines(part.getMemorizedLines);
                else super.push(part);
            } else {
                super.push(part);
            }
        }
    }

    /**
     * Pack parts to the greatest (Juz > Surah > Page)
     */
    pack() {
        let juzs = this.filter(p => p instanceof Juz);
        let surahs = this.filter(p => p instanceof Surah);
        let pages = this.filter(p => p instanceof Page);

        let juzsNumbers = juzs.map(j => j.number);
        let juzsPagesNumber = convertFromJuzs(juzsNumbers)[1];
        let surahsNumbers = surahs.map(s => s.number);
        let surahsLinesNumber = convertFromSurahs(surahsNumbers)[1];
        let pagesNumber = pages.map(p => p.number);

        let totalPagesNumbers = [...new Set([...juzsPagesNumber, ...surahsLinesNumber])];
        let totalLines = convertFromPages(totalPagesNumbers)[2];

        for (let i = 0, length = pagesNumber.length; i < length; i++) {
            totalLines[pagesNumber[i] - 1] = dec2bin(
                bin2dec(totalLines[pagesNumber[i] - 1]) | pages.getMemorizedLines()
            );
        }

        let finalJuzsNumbers = convertFromLines(totalLines)[0];
        let finalJuzsLines = convertFromJuzs(finalJuzsNumbers)[2];
        let linesAfterJuz = subtractLines(totalLines, finalJuzsLines);

        let finalSurahsNumber = convertFromLines(linesAfterJuz)[1];
        let finalSurahsLines = convertFromSurahs(finalSurahsNumber)[2];
        let linesAfterSurahs = subtractLines(linesAfterJuz, finalSurahsLines);

        let finalPagesNumber = convertFromLines(linesAfterSurahs)[1];
        let finalPagesLines = convertFromPages(finalPagesNumber)[2];
        let linesAfterPages = subtractLines(linesAfterSurahs, finalPagesLines);

        let newJuzs = finalJuzsNumbers.filter(e => !juzsNumbers.includes(e));
        let newSurahs = finalSurahsNumber.filter(e => !surahsNumbers.includes(e));

        let absorbedSurahs = surahsNumbers.filter(e => !finalSurahsNumber.includes(e));
        let absorbedPages = pagesNumber.filter(e => !finalPagesNumber.includes(e));

        let consolidationPerNewJuz = newJuzs.map(j => {
            let convertedJuz = convertFromJuzs([j]);
            let numOfAbsorbedSurahsToJuz = convertedJuz[0].filter(e => absorbedSurahs.includes(e));
            let numOfAbsorbedPagesToJuz = convertedJuz[1].filter(e => absorbedPages.includes(e));

            let filteredAbsorbedSurahs = surahs.filter(s => s.number === numOfAbsorbedSurahsToJuz);
            let consolidationOfAbsorbedSurahs = filteredAbsorbedSurahs.map(s => s.consolidation);
            let pagesOfAbsorbedSurahs = filteredAbsorbedSurahs.map(s => getLengthOfSurahInPages(s.number));
            let consolidationOfAbsorbedPages = pages
                .filter(p => p.number === numOfAbsorbedPagesToJuz)
                .map(p => p.consolidation);

            let consolidation =
                getSum(consolidationOfAbsorbedSurahs.map((s, i) => s * pagesOfAbsorbedSurahs[i])) /
                    getSum(pagesOfAbsorbedSurahs) +
                getSum(consolidationOfAbsorbedPages) / consolidationOfAbsorbedPages.length;

            return consolidation;
        });

        let consolidationPerNewSurah = newSurahs.map(s => {
            let numOfAbsorbedPagesToSurah = convertFromSurahs([s])[1].filter(e => absorbedPages.includes(e));

            let consolidationOfAbsorbedPages = pages
                .filter(p => p.number === numOfAbsorbedPagesToSurah)
                .map(p => p.consolidation);
            let consolidation = getSum(consolidationOfAbsorbedPages) / consolidationOfAbsorbedPages.length;
            return consolidation;
        });

        let thisValues = this.slice(0);

        let thisValuesFiltered = thisValues.filter(
            e =>
                !(
                    (e instanceof Surah && absorbedSurahs.includes(e.number)) ||
                    (e instanceof Page && absorbedPages.includes(e.number))
                )
        );

        let newParts = [
            ...newJuzs.map((j, i) => Juz.newInstanceWithConsolidation(j, consolidationPerNewJuz[i])),
            ...newSurahs.map((s, i) => Surah.newInstanceWithConsolidation(s, consolidationPerNewSurah[i])),
            ...linesAfterPages
                .map((l, i) =>
                    l !== "000000000000000"
                        ? Page.newInstance(i + 1).setMemorizedLines(bin2dec(l))
                        : -1
                )
                .filter(e => e !== -1),
        ];

        thisValuesFiltered.push(...newParts);

        this.splice(0, this.length); //empty the array;
        this.push(...thisValuesFiltered);
    }
}
