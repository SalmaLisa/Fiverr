import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from "./api"


const initialState = {
  list: [],
  status: 'idle',
  filter: 'all',
  acudata: {},
  error: false,
  mList: []
};


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
      state.status = 'error'
    },
  },

});

export const { 
    activeFilter,
    data,
    loading,
    acupuntureData,
    error,
} = dataSlice.actions;


export const selectData = (state) => state.data;


const url = "/acupunctures";

export const loadData = () => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url,
      onStart: loading.type,
      onSuccess: data.type,
      onError: error.type,
    })
  );
};

export default dataSlice.reducer;
