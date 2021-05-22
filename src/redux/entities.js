import { combineReducers } from '@reduxjs/toolkit';
import dataSlice from "./acuSlice"
import acupointSlice from "./acupointSlice"

export default combineReducers({
  acudata: dataSlice,
  acupoint: acupointSlice
});