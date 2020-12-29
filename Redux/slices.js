import { createSlice } from '@reduxjs/toolkit';
import { set, toggle, convert } from "./reducers";


function sliceMaker(name, initialValue, reducers) {
  return createSlice({
    name: name,
    initialState: {
      value: initialValue
    },
    reducers: reducers
  });
}

let setReducer = {set: set};

// =============================================================================
//  PARTS SLICES
// =============================================================================

let partInitialValue = [[],[],[]];

let partReducers = {
  set: set,
  toggle: toggle,
  convert: convert
};

const familiarSlice = sliceMaker("familiar", partInitialValue, partReducers);
const toMemorizeSlice = sliceMaker("toMemorize", partInitialValue, partReducers);
const memorizedSlice = sliceMaker("memorized", partInitialValue, partReducers);


// =============================================================================
//  USER GENERATED DATA SLICES 
// =============================================================================

const finishTimeRemainingSlice =  sliceMaker("finishTimeRemaining", 0, setReducer);  //the value should be a number of days left
const percentageFinishedSlice =  sliceMaker("percentageFinished", 0.0, setReducer);

// =============================================================================
// USER PERSONAL PROFILE DATA SLICES
// =============================================================================

const profileNameSlice = sliceMaker("profileName", "Utilisateur", setReducer);
const profilePictureSlice = sliceMaker("profilePicture", "", setReducer);


// =============================================================================
// USER SETTINGS SLICES
// =============================================================================

const orderSlice = sliceMaker("order", true, setReducer);     //by default in the order of the mus'haf


// =============================================================================
// APPLICATION GENERAL DATA
// =============================================================================

const firstStartSlice = sliceMaker("firstStart", true, setReducer);   


/* PARTS SLICES */
export let familiarReducer = familiarSlice.reducer;
export let toMemorizeReducer = toMemorizeSlice.reducer;
export let memorizedReducer = memorizedSlice.reducer;

/* USER GENERATED DATA SLICES */
export let finishTimeRemainingReducer = finishTimeRemainingSlice.reducer;
export let percentageFinishedReducer = percentageFinishedSlice.reducer;

/* USER PERSONAL PROFILE DATA SLICES */
export let profileNameReducer = profileNameSlice.reducer;
export let profilePictureReducer = profilePictureSlice.reducer;

/* USER SETTINGS SLICES */
export let orderReducer = orderSlice.reducer;

/* APPLICATION GENERAL DATA */
export let firstStartReducer = firstStartSlice.reducer;
