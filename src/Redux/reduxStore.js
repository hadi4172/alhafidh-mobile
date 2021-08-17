// import { combineReducers } from 'redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
    familiarReducer,
    toMemorizeReducer,
    memorizedReducer,
    toggleAllCheckboxReducer,
    orderedFamiliarSurahsReducer,
    orderedToMemorizeSurahsReducer,

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
        orderedFamiliarSurahs: orderedFamiliarSurahsReducer,
        orderedToMemorizeSurahs: orderedToMemorizeSurahsReducer,

        finishTimeRemaining: finishTimeRemainingReducer,
        percentageFinished: percentageFinishedReducer,

        profileName: profileNameReducer,
        profilePicture: profilePictureReducer,

        revisionMode: revisionModeReducer,
        order: orderReducer,

        firstStart: firstStartReducer
    },
    middleware: [...getDefaultMiddleware({immutableCheck: false})]
});

export default store;