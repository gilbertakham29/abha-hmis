import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type { RootState };
export default store;
