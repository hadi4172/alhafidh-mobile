import { createSlice } from '@reduxjs/toolkit';
import set from "./setterReducer";
import { toggle, convert } from "./checkingPartsReducer";
export const familiarSlice = createSlice({
  name: 'toMemorize',
  initialState: {
    value: [[],[],[]]
  },
  reducers: {
    set: set,
    toggle: toggle,
    convert: convert
  }
})
// export { set, toggle, convert } = familiarSlice.actions
export default familiarSlice.reducer