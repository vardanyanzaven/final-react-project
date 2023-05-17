import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { collection, getDoc, getDocs, query } from "firebase/firestore";

export const getCommentsCollection = createAsyncThunk(
  "comments/getCommentsCollection",
  async () => {
    const result = [];
    const col = query(collection(db, "comments"));
    const docs = await getDocs(col);
    docs.forEach(async (com) => {
      const data = com.data();
      const fullName = await getDoc(data.writerId);

      result.push({ ...data, ...fullName.data() });
    });

    return result.map((com) => ({
      com: com.comment,
      photoURL: com.photoURL,
      fullName: com.fullName,
    }));
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
