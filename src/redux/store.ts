import { combineReducers, configureStore } from "@reduxjs/toolkit";

import rootReducer from "./reducer";
type RootState = ReturnType<typeof rootReducer>;

const storeReducer = combineReducers({
  storereducer: rootReducer,
});
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
const store = configureStore({ reducer: storeReducer });
export type { RootState };
export default store;
