import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./reducer";

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
const store = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
