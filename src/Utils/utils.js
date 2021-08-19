function getStringDiffTillFinish(moment, useSelector) {
    let initialDate = new Date().setHours(0, 0, 0, 0);
    let finishDaysRemaining = useSelector(state => state.finishTimeRemaining.value);
    let stringDiffTillFinish = moment.preciseDiff(
        initialDate,
        initialDate + finishDaysRemaining * (1000 * 60 * 60 * 24)
    );
    return stringDiffTillFinish;
}

function configureRevisionMode(dispatch) {
    dispatch({ type: `percentageFinished/set`, payload: 100 });
}

function configureNormalMode(dispatch) {
    dispatch({ type: `percentageFinished/set`, payload: 0 });
}

const bin2dec = bin => {
    return parseInt(bin, 2);
};

const dec2bin = dec => {
    let binString = (dec >>> 0).toString(2);
    if (binString.length < 15) binString = "0".repeat(15 - binString.length) + binString;
    return binString;
};

function dec2hex(dec) {
    let hexString = (dec >>> 0).toString(16);
    if (hexString.length < 15) hexString = "0".repeat(15 - hexString.length) + hexString;
    return hexString;
}

function hex2dec(hex) {
    return parseInt(hex, 16);
}

const flipByte = bin => {
    let binString = [];
    for (let i = 0, length = bin.length; i < length; i++) {
        if (bin[i] === "1") binString.push("0");
        else if (bin[i] === "0") binString.push("1");
    }
    return binString.join("");
};

const range = (start, count) => {
    return Array.apply(0, Array(count)).map((element, index) => index + start);
};

const generateLines = isPageFull => range(1, 604).map(x => (isPageFull ? "1" : "0").repeat(15));

function roundNDec(num, decimals) {
    return Math.round((num + Number.EPSILON) * Math.pow(10, decimals)) / Math.pow(10, decimals);
}
function round1dec(num) {
    return roundNDec(num, 1);
}
function round2dec(num) {
    return roundNDec(num, 2);
}

function getSum(arr) {
    return arr.reduce((a, b) => a + b, 0);
}

function integrate(f, a, b, n) {
    const returnIfFinite = number => (!isNaN(number) && isFinite(number) ? number : 0);
    if (!n) n = (b - a) / 0.001;
    let dx = returnIfFinite((b - a) / n);
    let sum1 = returnIfFinite(f(a + dx / 2));
    let sum2 = 0;
    for (let i = 1; i < n; i++) {
        sum1 += returnIfFinite(f(a + dx * i + dx / 2));
        sum2 += returnIfFinite(f(a + dx * i));
    }
    return (dx / 6) * (returnIfFinite(f(a)) + returnIfFinite(f(b)) + 4 * sum1 + 2 * sum2);
}

/** Function that count occurrences of a substring in a string;
 * @param {String} string               The string
 * @param {String} subString            The sub string to search for
 * @param {Boolean} [allowOverlapping]  Optional. (Default:false)
 *
 * @author Vitim.us https://gist.github.com/victornpb/7736865
 * @see Unit Test https://jsfiddle.net/Victornpb/5axuh96u/
 * @see http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string/7924240#7924240
 */
 function occurrences(string, subString, allowOverlapping) {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}

function removeFromArray(array, item){
    let index = array.indexOf(item); if (index !== -1) array.splice(index, 1);
}

export {
    getStringDiffTillFinish,
    configureRevisionMode,
    configureNormalMode,
    bin2dec,
    dec2bin,
    dec2hex,
    hex2dec,
    flipByte,
    range,
    generateLines,
    roundNDec,
    round1dec,
    round2dec,
    getSum,
    integrate,
    occurrences,
    removeFromArray
};
