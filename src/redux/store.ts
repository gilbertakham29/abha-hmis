import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  abhaCardResultReducer,
  abhaInitiationReducer,
  abhaQrResultReducer,
  adhaarVerificationOtpReducer,
  createHealtIdReducer,
  getConsentHeaderReducer,
  getHealthInfoReducer,
  mobileOtpReducer,
  mobileVerificationOtpReducer,
  resendAdhaarOtpReducer,
  searchResultReducer,
} from "./reducer";
//import rootReducer from "./reducer";
type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  searchResultReducer,
  abhaCardResultReducer,
  abhaQrResultReducer,
  abhaInitiationReducer,
  adhaarVerificationOtpReducer,
  resendAdhaarOtpReducer,
  mobileOtpReducer,
  mobileVerificationOtpReducer,
  createHealtIdReducer,
  getHealthInfoReducer,
  getConsentHeaderReducer,
});
const store = configureStore({
  reducer: rootReducer,
});
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type { RootState };
export default store;
