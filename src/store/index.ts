import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/dist/query';
import {authReducer} from './features/auth';

const appReducer = combineReducers({
  auth: authReducer,
});

export const store = configureStore({
  reducer: appReducer,
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
