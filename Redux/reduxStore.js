// import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit';
import { familiarReducer, toMemorizeReducer, memorizedReducer, finishDateReducer } from "./slices"

const store = configureStore({
    reducer: {
        memorized: memorizedReducer,
        familiar: familiarReducer,
        toMemorize: toMemorizeReducer,
        finishDate: finishDateReducer
    }
});

export default store;