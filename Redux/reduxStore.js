// import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit';
import {
    familiarReducer,
    toMemorizeReducer,
    memorizedReducer,
    toggleAllCheckboxReducer,

    finishTimeRemainingReducer,
    percentageFinishedReducer,

    profileNameReducer,
    profilePictureReducer,

    revisionModeReducer,
    orderReducer,

    firstStartReducer
} from "./slices"

const store = configureStore({
    reducer: {
        memorized: memorizedReducer,
        familiar: familiarReducer,
        toMemorize: toMemorizeReducer,
        toggleAllCheckbox: toggleAllCheckboxReducer,

        finishTimeRemaining: finishTimeRemainingReducer,
        percentageFinished: percentageFinishedReducer,

        profileName: profileNameReducer,
        profilePicture: profilePictureReducer,

        revisionMode: revisionModeReducer,
        order: orderReducer,

        firstStart: firstStartReducer
    }
});

export default store;