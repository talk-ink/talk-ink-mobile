import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Toast} from '@customTypes/index';

const initialState: Toast = {
  message: '',
  duration: 2000,
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setToast: (state, action: PayloadAction<Toast>) => {
      state.message = action.payload.message;
      state.duration = action.payload.duration ?? state.duration;
    },
  },
});

export const {setToast} = toastSlice.actions;
export const toastReducer = toastSlice.reducer;
