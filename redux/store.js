import { configureStore, compose, applyMiddleware } from "@reduxjs/toolkit";
import projectReducer from "./projectSlice";
import { authIsReady, firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import thunk from "redux-thunk";
// import { getFirebase, reactReduxFirebase } from "react-redux-firebase";
// import { getFirestore, reduxFirestore } from "redux-firestore";
import { app, firebaseConfig } from "@config/firebaseConfig ";

export const store = configureStore({
  reducer: {
    project: projectReducer,
    // firebase: firebaseReducer,
    // firestore: firestoreReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,

      // thunk: {
      //   extraArgument: { getFirebase, getFirestore },
      // },
    }),

  // middleware: compose(
  //   [
  //     applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
  //     reduxFirestore(app),
  //     reactReduxFirebase(app, {
  //       useFirestoreForProfile: true,
  //       userProfile: "users",
  //       attachAuthIsReady: true,
  //     }),
  //   ]
  // ),
});

//  (store.getState());
