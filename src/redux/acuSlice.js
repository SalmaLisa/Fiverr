import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios"
import { getReq } from "./dataFetch"
import { apiUrl } from "../config/config"
// import { apiUrl } from "../config/config"

const apiEndpoint = apiUrl.url + "/acupunctures";

const initialState = {
  list: [],
  status: 'idle',
  filter: 'all',
  acudata: {},
  error: false,
  mList: []
};

export const dataAsync = createAsyncThunk(
  'data',
  async () => {
    const response = await getReq(apiEndpoint);
    console.log(response.data)
    return data(response.data)
  }
);

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    activeFilter: ( state , action ) => {
      state.filter = action.payload;
    },
    data: ( state , action )=> {
      state.list = action.payload
      state.status = 'loaded'
    },
    loading: ( state , action )=>{
      state.status = 'loading'
    },
    acupuntureData: ( state , action ) =>{
      state.acudata = action.payload
    },
    error: ( state , action )=>{
      state.error = true;
      state.data = null;
      state.status = 'idle'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(dataAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(dataAsync.fulfilled, (state, action) => {
        state.list = action.payload.payload;
        state.status = 'loaded';
      });
  },

});

export const { 
    activeFilter,
    data,
    loading,
    acupuntureData,
    error,
    meridian,
} = dataSlice.actions;


export const selectData = (state) => state.data;


export default dataSlice.reducer;
