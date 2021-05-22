import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './acuSlice';
import acupointReducer from "./acupointSlice"
import { createStore, applyMiddleware } from 'redux'


export const store = configureStore({
  reducer: {
    data: dataReducer,
    acupoint: acupointReducer,
  },
});


