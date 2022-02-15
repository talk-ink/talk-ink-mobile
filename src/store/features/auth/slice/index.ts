import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {AuthState, Token, TUserProfile} from '@/types';

const initialState: AuthState = {
  token: null,
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<Token>) => {
      state.token = action.payload.token;
    },
    setAuthUser: (state, action: PayloadAction<TUserProfile>) => {
      let avatar = null;
      let doneThreads: string[] = [];

      if (action.payload.avatar) {
        avatar = action.payload.avatar[0]?.url;
      }
      if (action.payload.doneThreads) {
        doneThreads = action.payload.doneThreads;
      }
      state.user = {
        ...action.payload,
        avatar,
        doneThreads,
      };
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    login: (state, action: PayloadAction<AuthState>) => {
      //   const localStorageToken = localStorage.getItem('token');
      //   if (!localStorageToken) {
      //     cookies.set('token', `${action.payload.token}`);
      //   }
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: state => {
      state.token = null;
      state.user = null;
    },
    updateUser: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
  },
});

export const {
  setAuthToken,
  setAuthUser,
  setAuthLoading,
  logout,
  login,
  updateUser,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
