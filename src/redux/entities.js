import { combineReducers } from '@reduxjs/toolkit';
import dataSlice from "./Acupunture/acuSlice"
import acupointSlice from "./Acupunture/acupointSlice"

export default combineReducers({
  acudata: dataSlice,
  acupoint: acupointSlice
});