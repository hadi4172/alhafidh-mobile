
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


export {
    getStringDiffTillFinish,
    configureRevisionMode,
    configureNormalMode
};