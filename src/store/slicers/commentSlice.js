import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import {
  collection,
  getDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

export const getCommentsCollection = createAsyncThunk(
  "comments/getCommentsCollection",
  async () => {
    const commentsRef = [];
    const col = query(
      collection(db, "comments"),
      orderBy("commentTime", "desc")
    );
    const docs = await getDocs(col);

    docs.forEach((com) => {
      const data = com.data();
      commentsRef.push({ ...data, id: com.id });
    });

    const res = await Promise.all(
      commentsRef.map(
        async ({
          favorite,
          thumbDown,
          thumbUp,
          comment,
          writerId,
          commentTime,
          id,
        }) => {
          const refData = await getDoc(writerId);
          const { fullName, photoURL } = refData.data();
          return {
            comment,
            fullName,
            photoURL,
            commentTime,
            favorite,
            thumbDown,
            thumbUp,
            id,
          };
        }
      )
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
