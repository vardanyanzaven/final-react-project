import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { collection, getDoc, getDocs, query } from "firebase/firestore";

export const getCommentsCollection = createAsyncThunk(
  "comments/getCommentsCollection",
  async () => {
    const result = [];
    const col = query(collection(db, "comments"));
    const docs = await getDocs(col);
    docs.forEach((com) => {
      const data = com.data();

      result.push(data);
    });

    const lastRes = [];

    for (let i = 0; i < result.length; i++) {
      const { comment, photoURL, writerId } = result[i];
      const snap = await getDoc(writerId);
      lastRes.push({
        comment,
        photoURL,
        fullName: snap.data().fullName,
      });
    }
    return lastRes;
  }
);

const initialState = {
  commentsCol: [],
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCommentsCollection.fulfilled, (state, { payload }) => {
      state.commentsCol = payload;
    });
  },
});

export default commentSlice.reducer;
