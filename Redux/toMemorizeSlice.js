import { createSlice } from '@reduxjs/toolkit';
import set from "./setterReducer";
import { toggle, convert } from "./checkingPartsReducer";
export const toMemorizeSlice = createSlice({
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
// export { set, toggle, convert } = toMemorizeSlice.actions
export default toMemorizeSlice.reducer