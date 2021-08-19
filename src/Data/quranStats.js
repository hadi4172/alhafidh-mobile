import { bin2dec, dec2bin, generateLines } from "src/Utils/utils";

let surahInfo = [
    { id: 1, name: "Al-Fatihah", pagestart: 1, finishline: 15 },
    { id: 2, name: "Al-Baqarah", pagestart: 2, finishline: 15 },
    { id: 3, name: "Aali-`Imran", pagestart: 50, finishline: 15 },
    { id: 4, name: "An-Nisa'", pagestart: 77, finishline: 7 },
    { id: 5, name: "Al-Ma'idah", pagestart: 106, finishline: 15 },
    { id: 6, name: "Al-Anaam", pagestart: 128, finishline: 15 },
    { id: 7, name: "Al-Aaraf", pagestart: 151, finishline: 15 },
    { id: 8, name: "Al-Anfal", pagestart: 177, finishline: 15 },
    { id: 9, name: "At-Taubah", pagestart: 187, finishline: 15 },
    { id: 10, name: "Yunus", pagestart: 208, finishline: 8 },
    { id: 11, name: "Hud", pagestart: 221, finishline: 10 },
    { id: 12, name: "Yusuf", pagestart: 235, finishline: 15 },
    { id: 13, name: "Ar-Raad", pagestart: 249, finishline: 4 },
    { id: 14, name: "Ibrahim", pagestart: 255, finishline: 15 },
    { id: 15, name: "Al-Hijr", pagestart: 262, finishline: 8 },
    { id: 16, name: "An-Nahl", pagestart: 267, finishline: 15 },
    { id: 17, name: "Al-Isra", pagestart: 282, finishline: 11 },
    { id: 18, name: "Al-Kahf", pagestart: 293, finishline: 15 },
    { id: 19, name: "Maryam", pagestart: 305, finishline: 6 },
    { id: 20, name: "Ta Ha", pagestart: 312, finishline: 15 },
    { id: 21, name: "Al-Anbiya'", pagestart: 322, finishline: 15 },
    { id: 22, name: "Al-Hajj", pagestart: 332, finishline: 15 },
    { id: 23, name: "Al-Mu'minun", pagestart: 342, finishline: 15 },
    { id: 24, name: "An-Nur", pagestart: 350, finishline: 12 },
    { id: 25, name: "Al-Furqan", pagestart: 359, finishline: 15 },
    { id: 26, name: "Ash-Shuaara'", pagestart: 367, finishline: 15 },
    { id: 27, name: "An-Naml", pagestart: 377, finishline: 9 },
    { id: 28, name: "Al-Qasas", pagestart: 385, finishline: 9 },
    { id: 29, name: "Al-`Ankabut", pagestart: 396, finishline: 11 },
    { id: 30, name: "Ar-Rum", pagestart: 404, finishline: 15 },
    { id: 31, name: "Luqman", pagestart: 411, finishline: 15 },
    { id: 32, name: "As-Sajdah", pagestart: 415, finishline: 15 },
    { id: 33, name: "Al-Ahzab", pagestart: 418, finishline: 15 },
    { id: 34, name: "Saba'", pagestart: 428, finishline: 9 },
    { id: 35, name: "Fatir", pagestart: 434, finishline: 5 },
    { id: 36, name: "Ya Sin", pagestart: 440, finishline: 15 },
    { id: 37, name: "As-Saffat", pagestart: 446, finishline: 15 },
    { id: 38, name: "Sad", pagestart: 453, finishline: 5 },
    { id: 39, name: "Az-Zumar", pagestart: 458, finishline: 4 },
    { id: 40, name: "Ghafir", pagestart: 467, finishline: 15 },
    { id: 41, name: "Fussilat", pagestart: 477, finishline: 15 },
    { id: 42, name: "Ash-Shura", pagestart: 483, finishline: 6 },
    { id: 43, name: "Az-Zukhruf", pagestart: 489, finishline: 15 },
    { id: 44, name: "Ad-Dukhan", pagestart: 496, finishline: 15 },
    { id: 45, name: "Al-Jathiyah", pagestart: 499, finishline: 8 },
    { id: 46, name: "Al-Ahqaf", pagestart: 502, finishline: 15 },
    { id: 47, name: "Muhammad", pagestart: 507, finishline: 15 },
    { id: 48, name: "Al-Fath", pagestart: 511, finishline: 8 },
    { id: 49, name: "Al-Hujurat", pagestart: 515, finishline: 15 },
    { id: 50, name: "Qaf", pagestart: 518, finishline: 13 },
    { id: 51, name: "Adh-Dhariyat", pagestart: 520, finishline: 9 },
    { id: 52, name: "At-Tur", pagestart: 523, finishline: 15 },
    { id: 53, name: "An-Najm", pagestart: 526, finishline: 11 },
    { id: 54, name: "Al-Qamar", pagestart: 528, finishline: 6 },
    { id: 55, name: "Ar-Rahman", pagestart: 531, finishline: 8 },
    { id: 56, name: "Al-Waqiah", pagestart: 534, finishline: 12 },
    { id: 57, name: "Al-Hadid", pagestart: 537, finishline: 15 },
    { id: 58, name: "Al-Mujadilah", pagestart: 542, finishline: 8 },
    { id: 59, name: "Al-Hashr", pagestart: 545, finishline: 15 },
    { id: 60, name: "Al-Mumtahanah", pagestart: 549, finishline: 8 },
    { id: 61, name: "As-Saff", pagestart: 551, finishline: 15 },
    { id: 62, name: "Al-Jumuah", pagestart: 553, finishline: 8 },
    { id: 63, name: "Al-Munafiqun", pagestart: 554, finishline: 15 },
    { id: 64, name: "At-Taghabun", pagestart: 556, finishline: 15 },
    { id: 65, name: "At-Talaq", pagestart: 558, finishline: 15 },
    { id: 66, name: "At-Tahrim", pagestart: 560, finishline: 15 },
    { id: 67, name: "Al-Mulk", pagestart: 562, finishline: 7 },
    { id: 68, name: "Al-Qalam", pagestart: 564, finishline: 11 },
    { id: 69, name: "Al-Haqqah", pagestart: 566, finishline: 10 },
    { id: 70, name: "Al-Maarij", pagestart: 568, finishline: 6 },
    { id: 71, name: "Nuh", pagestart: 570, finishline: 15 },
    { id: 72, name: "Al-Jinn", pagestart: 572, finishline: 15 },
    { id: 73, name: "Al-Muzammil", pagestart: 574, finishline: 9 },
    { id: 74, name: "Al-Mudathir", pagestart: 575, finishline: 7 },
    { id: 75, name: "Al-Qiyamah", pagestart: 577, finishline: 11 },
    { id: 76, name: "Al-Insan", pagestart: 578, finishline: 8 },
    { id: 77, name: "Al-Mursalat", pagestart: 580, finishline: 15 },
    { id: 78, name: "An-Naba'", pagestart: 582, finishline: 9 },
    { id: 79, name: "An-Naziaat", pagestart: 583, finishline: 15 },
    { id: 80, name: "`Abasa", pagestart: 585, finishline: 3 },
    { id: 81, name: "At-Takwir", pagestart: 586, finishline: 15 },
    { id: 82, name: "Al-Infitar", pagestart: 587, finishline: 13 },
    { id: 83, name: "Al-Mutaffifeen", pagestart: 587, finishline: 4 },
    { id: 84, name: "Al-Inshiqaq", pagestart: 589, finishline: 3 },
    { id: 85, name: "Al-Buruj", pagestart: 590, finishline: 15 },
    { id: 86, name: "At-Tariq", pagestart: 591, finishline: 11 },
    { id: 87, name: "Al-Aala", pagestart: 591, finishline: 6 },
    { id: 88, name: "Al-Ghashiya", pagestart: 592, finishline: 4 },
    { id: 89, name: "Al-Fajr", pagestart: 593, finishline: 7 },
    { id: 90, name: "Al-Balad", pagestart: 594, finishline: 3 },
    { id: 91, name: "Ash-Shams", pagestart: 595, finishline: 12 },
    { id: 92, name: "Al-Layl", pagestart: 595, finishline: 7 },
    { id: 93, name: "Ad-Duha", pagestart: 596, finishline: 14 },
    { id: 94, name: "Ash-Sharh", pagestart: 596, finishline: 4 },
    { id: 95, name: "At-Tin", pagestart: 597, finishline: 10 },
    { id: 96, name: "Al-`Alaq", pagestart: 597, finishline: 5 },
    { id: 97, name: "Al-Qadr", pagestart: 598, finishline: 10 },
    { id: 98, name: "Al-Bayyinah", pagestart: 598, finishline: 7 },
    { id: 99, name: "Az-Zalzala", pagestart: 599, finishline: 13 },
    { id: 100, name: "Al-`Adiyat", pagestart: 599, finishline: 5 },
    { id: 101, name: "Al-Qariah", pagestart: 600, finishline: 12 },
    { id: 102, name: "At-Takathur", pagestart: 600, finishline: 15 },
    { id: 103, name: "Al-`Asr", pagestart: 601, finishline: 6 },
    { id: 104, name: "Al-Humazah", pagestart: 601, finishline: 12 },
    { id: 105, name: "Al-Fil", pagestart: 601, finishline: 15 },
    { id: 106, name: "Quraish", pagestart: 602, finishline: 7 },
    { id: 107, name: "Al-Maaun", pagestart: 602, finishline: 13 },
    { id: 108, name: "Al-Kauthar", pagestart: 602, finishline: 15 },
    { id: 109, name: "Al-Kafirun", pagestart: 603, finishline: 7 },
    { id: 110, name: "An-Nasr", pagestart: 603, finishline: 12 },
    { id: 111, name: "Al-Masad", pagestart: 603, finishline: 15 },
    { id: 112, name: "Al-Ikhlas", pagestart: 604, finishline: 6 },
    { id: 113, name: "Al-Falaq", pagestart: 604, finishline: 11 },
    { id: 114, name: "An-Nas", pagestart: 604, finishline: 15 },
];

let juzEndPages = [
    21, 41, 61, 81, 101, 121, 141, 161, 181, 201, 221, 241, 261, 281, 301, 321, 341, 361, 381, 401, 421, 441, 461, 481,
    501, 521, 541, 561, 581, 604,
];

let startPageOfSurahs = surahInfo.map(x => x.pagestart);
let endLineOfSurahs = surahInfo.map(x => x.finishline);

//prends en entree un tabeau de pages comme celui affiche dans le mushaf
function convertFromPages(pages) {
    //Pages starts from 1 to 604
    let correspondingLines = generateLines(false);
    for (let i = 0, length = pages.length; i < length; i++) {
        correspondingLines[pages[i] - 1] = "111111111111111";
    }
    let partsConversionFromLines = convertFromLines(correspondingLines);

    return [partsConversionFromLines[0], partsConversionFromLines[1], correspondingLines];
}

function convertFromSurahs(surahs) {
    //Surahs starts from 0 to 113
    let correspondingLines = generateLines(false);

    for (let i = 0, length = surahs.length; i < length; i++) {
        let startPageOfCurrent = startPageOfSurahs[surahs[i]];
        let startLineOfCurrent =
            surahs[i] !== 0 ? (endLineOfSurahs[surahs[i] - 1] !== 15 ? endLineOfSurahs[surahs[i] - 1] + 1 : 1) : 1;
        let finishLineOfCurrent = endLineOfSurahs[surahs[i]];
        let finishPageOfCurrent =
            surahs[i] !== 113 ? startPageOfSurahs[surahs[i] + 1] - (finishLineOfCurrent === 15 ? 1 : 0) : 604;

        for (let j = startPageOfCurrent; j <= finishPageOfCurrent; j++) {
            if (startPageOfCurrent === finishPageOfCurrent) {
                correspondingLines[startPageOfCurrent - 1] = dec2bin(
                    bin2dec(correspondingLines[startPageOfCurrent - 1]) |
                        bin2dec(
                            "0".repeat(startLineOfCurrent - 1) +
                                "1".repeat(finishLineOfCurrent - startLineOfCurrent + 1) +
                                "0".repeat(15 - finishLineOfCurrent)
                        )
                );
            } else {
                if (j === startPageOfCurrent) {
                    correspondingLines[j - 1] = dec2bin(
                        bin2dec(correspondingLines[j - 1]) |
                            bin2dec("0".repeat(startLineOfCurrent - 1) + "1".repeat(15 - startLineOfCurrent + 1))
                    );
                } else if (j !== startPageOfCurrent && j !== finishPageOfCurrent) {
                    correspondingLines[j - 1] = dec2bin(bin2dec(correspondingLines[j - 1]) | bin2dec("1".repeat(15)));
                } else if (j === finishPageOfCurrent) {
                    correspondingLines[j - 1] = dec2bin(
                        bin2dec(correspondingLines[j - 1]) |
                            bin2dec("1".repeat(finishLineOfCurrent) + "0".repeat(15 - finishLineOfCurrent))
                    );
                }
            }
        }
    }
    let partsConversionFromLines = convertFromLines(correspondingLines);
    return [partsConversionFromLines[0], partsConversionFromLines[2], correspondingLines];
}

function convertFromJuzs(juzs) {
    //Juz's start from 0 to 29
    juzs = juzs.slice();
    juzs.sort((a, b) => a - b);
    let correspondingPages = [];

    for (let i = 0, length = juzs.length; i < length; i++) {
        if (juzs[i] !== 0) {
            for (let j = juzEndPages[juzs[i] - 1], length = juzEndPages[juzs[i]]; j < length; j++) {
                correspondingPages.push(j);
            }
        } else {
            correspondingPages.push(...Array(21).keys());
        }
    }
    correspondingPages = correspondingPages.map(x => x + 1);
    let partsConversionFromPages = convertFromPages(correspondingPages);
    return [partsConversionFromPages[1], correspondingPages, partsConversionFromPages[2]];
}

function convertFromLines(lines) {
    //donner en argument tableau des lignes
    const FULL_PAGE = 0b111111111111111;
    let correspondingJuzs = [];
    let correspondingSurahs = [];
    let correspondingPages = [];

    // get corresponding juz's and pages
    for (let i = -1, length = juzEndPages.length - 1; i < length; i++) {
        let currentJuzIsIncluded = true;
        for (let j = i == -1 ? 0 : juzEndPages[i], length = juzEndPages[i + 1] - 1; j <= length; j++) {
            if (bin2dec(lines[j]) === FULL_PAGE) correspondingPages.push(j + 1);
            else currentJuzIsIncluded = false;
        }
        if (currentJuzIsIncluded) correspondingJuzs.push(i + 1);
    }

    // get corresponding surahs
    for (let i = 0, length = startPageOfSurahs.length; i < length; i++) {
        let startPageOfCurrent = startPageOfSurahs[i];
        let startLineOfCurrent = i !== 0 ? (endLineOfSurahs[i - 1] !== 15 ? endLineOfSurahs[i - 1] + 1 : 1) : 1;
        let finishLineOfCurrent = endLineOfSurahs[i];
        let finishPageOfCurrent = i !== 113 ? startPageOfSurahs[i + 1] - (finishLineOfCurrent === 15 ? 1 : 0) : 604;

        // console.log(`i:${i}, startPageOfCurrent:${startPageOfCurrent}, finishPageOfCurrent:${finishPageOfCurrent}, startLineOfCurrent:${startLineOfCurrent}, finishLineOfCurrent:${finishLineOfCurrent}`);

        let surrahIsIncluded = true;

        for (let j = startPageOfCurrent; j <= finishPageOfCurrent; j++) {
            if (startPageOfCurrent === finishPageOfCurrent) {
                if (
                    (bin2dec(lines[j - 1]) |
                        bin2dec(
                            "1".repeat(startLineOfCurrent - 1) +
                                "0".repeat(finishLineOfCurrent - startLineOfCurrent + 1) +
                                "1".repeat(15 - finishLineOfCurrent)
                        )) !==
                    FULL_PAGE
                ) {
                    surrahIsIncluded = false;
                }
            } else {
                if (
                    j === startPageOfCurrent &&
                    (bin2dec(lines[j - 1]) |
                        bin2dec("1".repeat(startLineOfCurrent - 1) + "0".repeat(15 - startLineOfCurrent + 1))) !==
                        FULL_PAGE
                ) {
                    surrahIsIncluded = false;
                } else if (
                    j !== startPageOfCurrent &&
                    j !== finishPageOfCurrent &&
                    bin2dec(lines[j - 1]) !== FULL_PAGE
                ) {
                    surrahIsIncluded = false;
                } else if (
                    j === finishPageOfCurrent &&
                    (bin2dec(lines[j - 1]) |
                        bin2dec("0".repeat(finishLineOfCurrent) + "1".repeat(15 - finishLineOfCurrent))) !==
                        FULL_PAGE
                ) {
                    surrahIsIncluded = false;
                }
            }
        }
        if (surrahIsIncluded) correspondingSurahs.push(i);
    }

    return [correspondingJuzs, correspondingSurahs, correspondingPages];
}

function getSurahsContainingTheseLines(lines) {
    //toutes les sourates contenant au moin une page incluse seront incluses
    const FULL_PAGE = 0b111111111111111;
    let correspondingSurahs = [];

    // get corresponding surahs
    for (let i = 0, length = startPageOfSurahs.length; i < length; i++) {
        let startPageOfCurrent = startPageOfSurahs[i];
        let startLineOfCurrent = i !== 0 ? (endLineOfSurahs[i - 1] !== 15 ? endLineOfSurahs[i - 1] + 1 : 1) : 1;
        let finishLineOfCurrent = endLineOfSurahs[i];
        let finishPageOfCurrent = i !== 113 ? startPageOfSurahs[i + 1] - (finishLineOfCurrent === 15 ? 1 : 0) : 604;

        // console.log(`i:${i}, startPageOfCurrent:${startPageOfCurrent}, finishPageOfCurrent:${finishPageOfCurrent}, startLineOfCurrent:${startLineOfCurrent}, finishLineOfCurrent:${finishLineOfCurrent}`);

        let surrahIsIncluded = false;

        for (let j = startPageOfCurrent; j <= finishPageOfCurrent; j++) {
            if (startPageOfCurrent === finishPageOfCurrent) {
                if (
                    (bin2dec(lines[j - 1]) |
                        bin2dec(
                            "1".repeat(startLineOfCurrent - 1) +
                                "0".repeat(finishLineOfCurrent - startLineOfCurrent + 1) +
                                "1".repeat(15 - finishLineOfCurrent)
                        )) ===
                    FULL_PAGE
                ) {
                    surrahIsIncluded = true;
                }
            } else {
                if (
                    j === startPageOfCurrent &&
                    (bin2dec(lines[j - 1]) |
                        bin2dec("1".repeat(startLineOfCurrent - 1) + "0".repeat(15 - startLineOfCurrent + 1))) ===
                        FULL_PAGE
                ) {
                    surrahIsIncluded = true;
                } else if (
                    j !== startPageOfCurrent &&
                    j !== finishPageOfCurrent &&
                    bin2dec(lines[j - 1]) === FULL_PAGE
                ) {
                    surrahIsIncluded = true;
                } else if (
                    j === finishPageOfCurrent &&
                    (bin2dec(lines[j - 1]) |
                        bin2dec("0".repeat(finishLineOfCurrent) + "1".repeat(15 - finishLineOfCurrent))) ===
                        FULL_PAGE
                ) {
                    surrahIsIncluded = true;
                }
            }
        }
        if (surrahIsIncluded) correspondingSurahs.push(i);
    }

    return correspondingSurahs;
}

function subtractLines(minuendLines, subtrahendLines) {
    return minuendLines.map((l, i) => dec2bin(bin2dec(l) - bin2dec(subtrahendLines[i])));
}

function orLines(lines1, lines2) {
    return lines1.map((l, i) => dec2bin(bin2dec(l) | bin2dec(lines2[i])));
}

function andLines(lines1, lines2) {
    return lines1.map((l, i) => dec2bin(bin2dec(l) & bin2dec(lines2[i])));
}

//return a float (includes lines)
function getLengthOfSurahInPages(number) {
    let startPageOfCurrent = startPageOfSurahs[surahs[i]];
    let startLineOfCurrent =
        surahs[i] !== 0 ? (endLineOfSurahs[surahs[i] - 1] !== 15 ? endLineOfSurahs[surahs[i] - 1] + 1 : 1) : 1;
    let finishLineOfCurrent = endLineOfSurahs[surahs[i]];
    let finishPageOfCurrent =
        surahs[i] !== 113 ? startPageOfSurahs[surahs[i] + 1] - (finishLineOfCurrent === 15 ? 1 : 0) : 604;

    return (
        (finishLineOfCurrent !== 15 ? finishPageOfCurrent - 1 : finishPageOfCurrent) -
        (startLineOfCurrent === 1 ? startPageOfCurrent : startPageOfCurrent + 1) +
        ((startLineOfCurrent === 1 ? 0 : 15 - startLineOfCurrent + 1) +
            (finishLineOfCurrent !== 15 ? finishLineOfCurrent : 0)) /
            15
    );
}

export {
    surahInfo,
    convertFromJuzs,
    convertFromPages,
    convertFromSurahs,
    convertFromLines,
    getSurahsContainingTheseLines,
    subtractLines,
    orLines,
    andLines,
    getLengthOfSurahInPages
};
