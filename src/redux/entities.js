import { combineReducers } from '@reduxjs/toolkit';
import dataSlice from "./Acupunture/acuSlice"
import acupointSlice from "./Acupunture/acupointSlice"
import clinicsSlice from "./clinicsSlics"

export default combineReducers({
  clinics: clinicsSlice,
  acudata: dataSlice,
  acupoint: acupointSlice,
});