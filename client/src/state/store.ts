import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userSlice from "./userSlice";
import habitSlice from "./habitSlice";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector as useReduxSelector,
} from "react-redux";

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  user: userSlice,
  habit: habitSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      serializableCheck: false,
    }),
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
