import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import dataReducer from './acuSlice';
import acupointReducer from "./acupointSlice"
import logger from "./middleware/logger"
import func from "./middleware/func"

export const store = configureStore({
  reducer: {
    data: dataReducer,
    acupoint: acupointReducer,
  },
});


