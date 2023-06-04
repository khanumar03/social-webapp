import { configureStore } from "@reduxjs/toolkit";
import { useReduxReducers } from "./reducers";


export const store = configureStore({
  reducer: useReduxReducers,
});