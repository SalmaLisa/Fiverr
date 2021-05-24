import { createSlice } from '@reduxjs/toolkit';

// const apiEndpoint = apiUrl.url + "/acupunctures";


const initialState = {
countrylist: []
};

export const clinicsSlice = createSlice({
  name: 'clinics',
  initialState,
  reducers: {
    countryList : ( state, action )=>{ 
        state.countrylist = action.payload;
    }
  },

});

export const {
    countryList
} = clinicsSlice.actions;


export const selectClinics = (state) => state.acupoint;


export default clinicsSlice.reducer;
