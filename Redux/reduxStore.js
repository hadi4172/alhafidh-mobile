// import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit';
import {
    familiarReducer,
    toMemorizeReducer,
    memorizedReducer,

    finishTimeRemainingReducer,
    percentageFinishedReducer,

    profileNameReducer,
    profilePictureReducer,

    orderReducer,

    firstStartReducer
} from "./slices"

const store = configureStore({
    reducer: {
        memorized: memorizedReducer,
        familiar: familiarReducer,
        toMemorize: toMemorizeReducer,

        finishTimeRemaining: finishTimeRemainingReducer,
        percentageFinished: percentageFinishedReducer,

        profileName: profileNameReducer,
        profilePicture: profilePictureReducer,

        order: orderReducer,

        firstStart: firstStartReducer
    }
});

export default store;