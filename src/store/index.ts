import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/dist/query';

import {authReducer} from './features/auth';
import {channelReducer} from './features/channels/slice';
import {workspaceReducer} from './features/workspaces';
import {threadReducer} from './features/threads';
import {toastReducer} from './features/toast/slice';
import {memberReducer} from './features/members/slice';
import {inboxReducer} from './features/inbox';
import {pageStatusReducer} from './features/pageStatus';

const appReducer = combineReducers({
  auth: authReducer,
  workspace: workspaceReducer,
  channel: channelReducer,
  thread: threadReducer,
  toast: toastReducer,
  member: memberReducer,
  inbox: inboxReducer,
  pageStatus: pageStatusReducer,
});

export const store = configureStore({
  reducer: appReducer,
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
