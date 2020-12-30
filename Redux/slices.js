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

let setReducer = { set: set };

// =============================================================================
//  PARTS SLICES
// =============================================================================

/**
 * Valeur qui sera toujours commune aux 3 écrans car passée en référence, contient des 
 * tableaux d'integer représentant les parties activés de cette façon : 
 * [Juzs, Sourates, Pages]
 * Ex : 
 * [[5],[4],[
    77, 78, 79, 80, 81, 82, 83, 84,85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104
  ]]
 */
let partInitialValue = [[], [], []];

let partReducers = {
  set: set,
  toggle: toggle,
  convert: convert
};

const familiarSlice = sliceMaker("familiar", partInitialValue, partReducers);
const toMemorizeSlice = sliceMaker("toMemorize", partInitialValue, partReducers);
const memorizedSlice = sliceMaker("memorized", partInitialValue, partReducers);

const toggleAllCheckboxSlice = sliceMaker("toggleAllCheckbox", [false, false, false], setReducer);    // one array for earch screen (memorized, familiar, toMemorize)


// =============================================================================
//  USER GENERATED DATA SLICES 
// =============================================================================

const finishTimeRemainingSlice = sliceMaker("finishTimeRemaining", 0, setReducer);  //the value should be a number of days left
const percentageFinishedSlice = sliceMaker("percentageFinished", 0.0, setReducer);

// =============================================================================
// USER PERSONAL PROFILE DATA SLICES
// =============================================================================

const profileNameSlice = sliceMaker("profileName", "Utilisateur", setReducer);
const profilePictureSlice = sliceMaker("profilePicture", "", setReducer);


// =============================================================================
// USER SETTINGS SLICES
// =============================================================================

const revisionModeSlice = sliceMaker("revisionMode", false, setReducer);
const orderSlice = sliceMaker("order", true, setReducer);     //by default in the order of the mus'haf


// =============================================================================
// APPLICATION GENERAL DATA
// =============================================================================

const firstStartSlice = sliceMaker("firstStart", true, setReducer);


/* PARTS SLICES */
export let familiarReducer = familiarSlice.reducer;
export let toMemorizeReducer = toMemorizeSlice.reducer;
export let memorizedReducer = memorizedSlice.reducer;
export let toggleAllCheckboxReducer = toggleAllCheckboxSlice.reducer;

/* USER GENERATED DATA SLICES */
export let finishTimeRemainingReducer = finishTimeRemainingSlice.reducer;
export let percentageFinishedReducer = percentageFinishedSlice.reducer;

/* USER PERSONAL PROFILE DATA SLICES */
export let profileNameReducer = profileNameSlice.reducer;
export let profilePictureReducer = profilePictureSlice.reducer;

/* USER SETTINGS SLICES */
export let revisionModeReducer = revisionModeSlice.reducer;
export let orderReducer = orderSlice.reducer;

/* APPLICATION GENERAL DATA */
export let firstStartReducer = firstStartSlice.reducer;
