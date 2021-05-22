import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import dataReducer from './acuSlice';
import acupointReducer from "./acupointSlice"
// import logger from "./middleware/logger"
// import func from "./middleware/func"
import thunk from "redux-thunk"
import logger from  "redux-logger"

export const store = configureStore({
  reducer: {
    data: dataReducer,
    acupoint: acupointReducer,
  },
  middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(thunk,logger)
});


