import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";

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

    const res = await Promise.all(
      result.map(async ({ comment, writerId, commentTime }) => {
        const refData = await getDoc(writerId);
        const { fullName, photoURL } = refData.data();
        return {
          comment,
          fullName,
          photoURL,
          commentTime,
        };
      })
    ).catch((e) => {
      console.log(e, "dafjkfdkj");
      return [];
    });
    return res;
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
