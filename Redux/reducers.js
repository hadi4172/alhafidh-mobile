import { convertFromJuzs, convertFromPages, convertFromSurahs } from "../Data/quranStats";

let set = (state, action) => {
    state.value = action.payload;
}

let toggle = (state, action) => {
    let type = action.payload[0];    // is It a Juz or Surah or Page
    let index = action.payload[1];

    if (state.value[type].some(x => x === index)) {
        state.value[type] = state.value[type].filter(x => x !== index);
    } else {
        state.value[type].push(index);
    }
}

let convert = (state, action) => {
    let from = action.payload;  //int : 0 for Juz, 1 for Surah, 2 for Page
    let result;
    
    switch (from) {
        case 0:
            result = convertFromJuzs(state.value[0].map(x => x -= 1));
            [state.value[1], state.value[2]] = [result[0].map(x => x += 1), result[1]];
            break;
        case 1:
            result = convertFromSurahs(state.value[1].map(x => x -= 1));
            [state.value[0], state.value[2]] = [result[0].map(x => x += 1), result[1]];
            break;
        case 2:
            result = convertFromPages(state.value[2]);
            [state.value[0], state.value[1]] = [result[0].map(x => x += 1), result[1].map(x => x += 1)];
            break;
        default:
            break;
    }
}

export { set, toggle, convert };