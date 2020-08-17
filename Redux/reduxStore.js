// import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit';
import memorizedReducer from "./memorizedSlice"
import toMemorizeReducer from "./toMemorizeSlice"
import familiarReducer from "./familiarSlice"

const store = configureStore({
    reducer: {          
        memorized: memorizedReducer,
        familiar: familiarReducer,
        toMemorize: toMemorizeReducer
    }
});

export default store;