import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from "../api"


const initialState = {
  list: [],
  status: 'idle',
  filter: 'all',
  acudata: {},
  error: false,
  datalink: '',
  acudataloading: 'loading',
  progress: 0,
  cookieaccept: false,
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
    headingData: ( state , action ) =>{
      state.acudata = action.payload
      state.acudataloading = "loaded"
    },
    error: ( state , action )=>{
      state.status = 'error'
    },
    datalink: ( state , action )=>{
      state.datalink = action.payload
    },
    changepaginationvisiblity: ( state , action ) =>{
      state.acudata.paginationvisible = action.payload
    },
    Progress: ( state, action )=>{
      console.log(state.progress)
      state.progress = state.progress == 100 ? 0 + action.payload : state.progress +  action.payload
    },
    setCookieAccept: (state, action)=>{
      state.cookieaccept = action.payload
    }
  },

});

export const { 
  Progress,
    activeFilter,
    data,
    loading,
    headingData,
    error,
    datalink,
    changepaginationvisiblity,
    setCookieAccept
} = dataSlice.actions;


export const selectData = (state) => state.data;


export const loadData = () => (dispatch, getState) => {
  console.log(" apiRequest DataLink ",getState().entities.acudata.datalink)
  const url = getState().entities.acudata.datalink
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
