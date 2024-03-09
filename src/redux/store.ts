import { combineReducers } from "@reduxjs/toolkit";

import rootReducer from "./reducer";
type RootState = ReturnType<typeof rootReducer>;

const store = combineReducers({
  reducer: rootReducer,
});
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}

export type { RootState };
export default store;
