import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./projectSlice";

export const store = configureStore({
  reducer: {
    project: projectReducer,
   
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,

    }),


});


