import {
  setSearchResult,
  abhaRegistration,
  getAbhaCardResult,
  generatePhoneOtp,
  getAbhaQrCode,
  verifyAadhaar,
  verifyPhoneOtp,
  createHealthIdOtp,
  resendAadhaarOtp,
} from "./action";
const initialState = {
  searchResult: {},
  abhaCardResult: "",
  abhaQrCode: "",
  abhaInitiation: {},
  createHealthIdWithAadhaar: {}, // corrected typo in variable name
  aadhaarVerification: {},
  resendAadhaarOtp: {},
  mobileOtp: {},
  prescriptions: [],
};

type State = typeof initialState;

type Actions =
  | ReturnType<typeof setSearchResult>
  | ReturnType<typeof abhaRegistration>
  | ReturnType<typeof getAbhaCardResult>
  | ReturnType<typeof generatePhoneOtp>
  | ReturnType<typeof getAbhaQrCode>
  | ReturnType<typeof verifyAadhaar>
  | ReturnType<typeof resendAadhaarOtp>
  | ReturnType<typeof verifyPhoneOtp>
  | ReturnType<typeof createHealthIdOtp>;

const rootReducer = (state: State = initialState, action: Actions) => {
  switch (action.type) {
    case "SET_SEARCH_RESULT":
      return {
        ...state,
        searchResult: action.payload,
      };
    case "GET_ABHA_CARD_RESULT":
      return {
        ...state,
        abhaCardResult: action.payload,
      };
    case "GET_ABHA_QR_CODE":
      return {
        ...state,
        abhaQrCode: action.payload,
      };
    case "ABHA_REGISTRATION": // corrected action type
      return {
        ...state,
        abhaInitiation: action.payload,
      };
    case "GET_AADHAAR_VERIFICATION_OTP":
      return {
        ...state,
        aadhaarVerification: action.payload,
      };
    case "GET_AADHAAR_RESEND_OTP":
      return {
        ...state,
        resendAadhaarOtp: action.payload,
      };
    case "GET_MOBILE_OTP":
      return {
        ...state,
        mobileOtp: action.payload,
      };
    case "CREATE_HEALTH_ID":
      return {
        ...state,
        createHealthIdWithAadhaar: action.payload,
      };
    case "EXPORT_PRESCRIPTIONS":
      return {
        ...state,
        prescriptions: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
