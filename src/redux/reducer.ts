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
  getHealthInfo,
  getConsentHeaderList,
} from "./action";
interface ConsentHeaders {
  abhaConsentHeaderId: string;
  healthId: string;
  consentStatus: string;
  fetchFromDate: string;
  fetchToDate: string;
  permissionExpiryDate: string;
}
interface HealthInfoData {
  healthInformationTypeId: number;
  code: string;
  display: string;
}
interface DemographicResult {
  abhaAccountId: number;
  name: string;
  pinCode: string;
  dob: string;
  address: string;
  mobile: string;
  healthIdNumber: string;
  healthId: string;
}
type abhaCardData = string;
type abhaQrData = string;
const initialConsentHeaderData: ConsentHeaders[] = [
  {
    abhaConsentHeaderId: "",
    healthId: "",
    consentStatus: "",
    fetchFromDate: "",
    fetchToDate: "",
    permissionExpiryDate: "",
  },
];
const healthInformationTypeData: HealthInfoData[] = [
  {
    healthInformationTypeId: 1,
    code: "",
    display: "",
  },
];
const demographicSearchResult: DemographicResult = {
  abhaAccountId: 1,
  name: "",
  pinCode: "",
  dob: "",
  address: "",
  mobile: "",
  healthIdNumber: "",
  healthId: "",
};
const abhaCardDataResponse: abhaCardData = "";
const abhaQrDataResponse: abhaQrData = "";
const initialState = {
  searchResult: demographicSearchResult,
  abhaCardResult: abhaCardDataResponse,
  abhaQrCode: abhaQrDataResponse,
  abhaInitiation: {},
  createHealthIdWithAadhaar: {}, // corrected typo in variable name
  aadhaarVerification: {},
  resendAadhaarOtp: {},
  mobileOtp: {},
  prescriptions: [],
  getHealthInfoData: healthInformationTypeData,
  getConsentHeaderData: initialConsentHeaderData,
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
  | ReturnType<typeof createHealthIdOtp>
  | ReturnType<typeof getHealthInfo>
  | ReturnType<typeof getConsentHeaderList>;

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
    case "GET_HEALTH_INFO":
      return {
        ...state,
        getHealthInfoData: action.payload,
      };
    case "GET_CONSENT_HEADER":
      return {
        state,
        getConsentHeaderData: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
