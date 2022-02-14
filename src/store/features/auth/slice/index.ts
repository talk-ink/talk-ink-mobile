import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getAuthToken, setAuthToken as setAuthTokenStorage} from '@utils/auth';
import {AuthState, Token, TUserProfile} from '@customTypes/index';

const initialState: AuthState = {
  token: null,
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken: async (state, action: PayloadAction<Token>) => {
      const token = await getAuthToken();
      if (!token) {
        await setAuthTokenStorage(`${action.payload.token}`);
      }
      state.token = action.payload.token;
    },
    setAuthUser: (state, action: PayloadAction<TUserProfile>) => {
      let avatar = null;

      if (action.payload.avatar) {
        avatar = action.payload.avatar[0]?.url;
      }
      state.user = {
        ...action.payload,
        avatar,
      };
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    login: async (state, action: PayloadAction<AuthState>) => {
      const token = await getAuthToken();
      if (!token) {
        await setAuthTokenStorage(`${action.payload.token}`);
      }
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
    addDoneThread: (state, action: PayloadAction<string>) => {
      let doneThreads = [];
      if (!state.user.doneThreads) {
        doneThreads.push(action.payload);
      } else {
        doneThreads = [...state.user.doneThreads, action.payload];
      }
      state.user = {
        ...state.user,
        doneThreads,
      };
    },
    deleteDoneThread: (state, action: PayloadAction<string>) => {
      let deletedIndex = state.user.doneThreads.findIndex(
        data => data === action.payload,
      );
      state.user.doneThreads.splice(deletedIndex, 1);
    },
    addReadThread: (state, action: PayloadAction<string>) => {
      let readedThreads = [];
      if (!state.user.readedThreads) {
        readedThreads.push(action.payload);
      } else {
        readedThreads = [...state.user.readedThreads, action.payload];
      }
      state.user = {
        ...state.user,
        readedThreads,
      };
    },
    deleteReadThread: (state, action: PayloadAction<string>) => {
      let deletedIndex = state.user.readedThreads.findIndex(
        data => data === action.payload,
      );
      state.user.readedThreads.splice(deletedIndex, 1);
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
  addDoneThread,
  deleteDoneThread,
  addReadThread,
  deleteReadThread,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
