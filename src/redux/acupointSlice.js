import { createSlice } from '@reduxjs/toolkit';

// const apiEndpoint = apiUrl.url + "/acupunctures";


const initialState = {
  nav: 'Profile',
  acupagelink: '',
  activeid: null,
  acupointlinkload : false
};

export const acupointSlice = createSlice({
  name: 'acupoint',
  initialState,
  reducers: {
    activeNav : ( state, action )=>{ 
        state.nav = action.payload;
    },
    acuPageLink : ( state, action )=>{
        state.acupagelink = action.payload;
        state.acupointlinkload = true;
    },
    activeId: ( state, action )=>{
      state.activeid = action.payload
    }
  },

});

export const { 
    activeNav,
    acuPageLink,
    activeId
} = acupointSlice.actions;


export const selectAcuPoint = (state) => state.acupoint;


export default acupointSlice.reducer;
