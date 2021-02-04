import { convertFromJuzs, convertFromPages, convertFromSurahs, convertFromLines } from "../Data/quranStats";
import { bin2dec, dec2bin, generateLines } from "../Utils/utils";

let set = (state, action) => {
    state.value = action.payload;
}

let toggle = (state, action) => {
    let type = action.payload[0];    // is It a Juz or Surah or Page
    let index = action.payload[1];      //id of the checkbox (int)

    let convertFrom = [convertFromJuzs, convertFromSurahs, convertFromPages];
    let correspondingLines = convertFrom[type]([index - (type !== 2 ? 1 : 0)])[2];

    if (state.value[type].some(x => x === index)) {     //remove part
        state.value[3] = state.value[3].map((x, i) => dec2bin(bin2dec(x) & ~bin2dec(correspondingLines[i])));
        state.value[type] = state.value[type].filter(x => x !== index);
    } else {                                            //add part
        state.value[3] = state.value[3].map((x, i) => dec2bin(bin2dec(x) | bin2dec(correspondingLines[i])));
        state.value[type].push(index);
    }
}

let forceCheckbox = (state, action) => {
    let type = action.payload[0];    // is It a Juz or Surah or Page
    let index = action.payload[1];
    let isChecked = action.payload[2];

    let convertFrom = [convertFromJuzs, convertFromSurahs, convertFromPages];
    let correspondingLines = convertFrom[type]([index - (type !== 2 ? 1 : 0)])[2];

    if (state.value[type].some(x => x === index)) {
        if (!isChecked) {
            state.value[3] = state.value[3].map((x, i) => dec2bin(bin2dec(x) & ~bin2dec(correspondingLines[i])));
            state.value[type] = state.value[type].filter(x => x !== index);
        }
    } else {
        if (isChecked) {
            state.value[3] = state.value[3].map((x, i) => dec2bin(bin2dec(x) | bin2dec(correspondingLines[i])));
            state.value[type].push(index);
        }
    }
}

let convert = (state) => {
    let result = convertFromLines(state.value[3]);
    state.value = [
        result[0].map(x => x + 1),          //because state parts all starts from 1
        result[1].map(x => x + 1),          //because state parts all starts from 1
        result[2],
        state.value[3]
    ];
}

export { set, toggle, convert, forceCheckbox };