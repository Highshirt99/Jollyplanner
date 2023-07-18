import { createSlice } from "@reduxjs/toolkit";

//

const initialState = {
  user: null,
  projects: null,
  auth: false,
  newUser: null,
};

// export const createProjectAsync = createAsyncThunk(
//   "project/createProjectAsync",
//   async (payload, { getFirebase, getFirestore }) => {
//     const firestore = getFirestore();
//     // const profile = getState().firebase.profile;
//     // const authorId = getState().firebase.auth.uid;
//     await firestore.collection("projects").add({
//       ...payload,
//       authorFirstName: "Hey",
//       authorLastName: "Hi",
//       authorId: "123",
//       createdAt: new Date(),
//     });
//   }
// );

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    setNewUser: (state, action) => {
      state.newUser = action.payload;
    },
    setUser: (state, action) => {
      state.auth = { ...action.payload };
    },

    signoutUser: (state) => {
      state.auth = null;
    },
    setAuth: (state) => {
      state.auth = true;
    },
    // extraReducers: (builder) => {
    //   builder.addCase(createProjectAsync.fulfilled, (state, action) => {
    //      ("Project added successfully");
    //   })
    // },
  },
});

export const { setProjects, setNewUser, setUser, signoutUser, setAuth } =
  projectSlice.actions;
export default projectSlice.reducer;
