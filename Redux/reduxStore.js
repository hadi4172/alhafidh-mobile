// import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit';
import { familiarReducer, toMemorizeReducer, memorizedReducer, finishDateReducer, orderReducer } from "./slices"

const store = configureStore({
    reducer: {
        memorized: memorizedReducer,
        familiar: familiarReducer,
        toMemorize: toMemorizeReducer,
        finishDate: finishDateReducer,
        order: orderReducer
    }
});

export default store;