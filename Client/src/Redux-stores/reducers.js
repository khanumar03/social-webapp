import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  User: null,
  postData: [],
};

export const useReduxReducers = createReducer(initialState, (builder) => {
  builder.addCase("USER_TOKEN", (state, action) => {
    state.User = action.payload;
  });

  builder.addCase("POST_DATA", (state, action) => {
    state.postData = action.Data;
  });

  builder.addCase("CLEAR", (state, action) => {
    return {
      ...state,
      postData: [...state.postData, { ...action.Data, like: false }],
    };
  });
});
