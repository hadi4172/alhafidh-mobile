import { createSlice } from '@reduxjs/toolkit';
import { set, toggle, convert } from "./reducers";

let partInitialValue = [[],[],[]];

let partReducers = {
  set: set,
  toggle: toggle,
  convert: convert
};

const familiarSlice = createSlice({
  name: 'familiar',
  initialState: {
    value: partInitialValue
  },
  reducers: partReducers
});

const toMemorizeSlice = createSlice({
  name: 'toMemorize',
  initialState: {
    value: partInitialValue
  },
  reducers: partReducers
});

const memorizedSlice = createSlice({
  name: 'memorized',
  initialState: {
    value: partInitialValue
  },
  reducers: partReducers
});

const finishDateSlice = createSlice({
  name: 'finishDate',
  initialState: {
    value: 0      //it should be a timestamp
  },
  reducers: {
    set: set
  }
});

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    value: true      //by default in the order of the mus'haf
  },
  reducers: {
    set: set
  }
});


export let familiarReducer = familiarSlice.reducer;
export let toMemorizeReducer = toMemorizeSlice.reducer;
export let memorizedReducer = memorizedSlice.reducer;
export let finishDateReducer = finishDateSlice.reducer;
export let orderReducer = orderSlice.reducer;
