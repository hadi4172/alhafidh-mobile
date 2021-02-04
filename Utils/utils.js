
function getStringDiffTillFinish(moment, useSelector) {
    let initialDate = (new Date()).setHours(0, 0, 0, 0);
    let finishDaysRemaining = useSelector(state => state.finishTimeRemaining.value);
    let stringDiffTillFinish = moment.preciseDiff(initialDate, initialDate + finishDaysRemaining * (1000 * 60 * 60 * 24));
    return stringDiffTillFinish;
}

function configureRevisionMode(dispatch) {
    dispatch({ type: `percentageFinished/set`, payload: 100 });

}

function configureNormalMode(dispatch) {
    dispatch({ type: `percentageFinished/set`, payload: 0 });

}

const bin2dec = (bin) => {
    return parseInt(bin, 2);
}

const dec2bin = (dec) => {
    let binString = (dec >>> 0).toString(2);
    if (binString.length < 15) binString = "0".repeat(15 - binString.length) + binString;
    return binString
}

const flipByte = (bin) => {
    let binString = [];
    for (let i = 0, length = bin.length; i < length; i++) {
        if(bin[i] === "1") binString.push("0");
        else if (bin[i] === "0") binString.push("1");
    }
    return binString.join("");
}

const range = (start, count) => {
    return Array.apply(0, Array(count))
        .map((element, index) => index + start);
}

const generateLines = (isPageFull) => range(1, 604).map(x=> (isPageFull ? "1" : "0").repeat(15));

export {
    getStringDiffTillFinish,
    configureRevisionMode,
    configureNormalMode,

    bin2dec,
    dec2bin,
    flipByte,

    range,
    generateLines
};