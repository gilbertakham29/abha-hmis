import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ConsentHeaders {
  abhaConsentHeaderId: string;
  healthId: string;
  consentStatus: string;
  fetchFromDate: string;
  fetchToDate: string;
  permissionExpiryDate: string;
}

export interface HealthInfoData {
  healthInformationTypeId: number;
  code: string;
  display: string;
}

export interface DemographicResult {
  name: string;
  pinCode: string;
  dob: string;
  address: string;
  mobile: string;
  healthIdNumber: string;
  healthId: string;
}

interface State {
  searchResult: DemographicResult;
  abhaCardResult: string;
  abhaQrCode: string;
  abhaInitiation: object;
  createHealthIdWithAadhaar: object;
  aadhaarVerification: object;
  resendAadhaarOtp: object;
  mobileOtp: object;
  verifyMobileOtpHealthId: object;
  prescriptions: string | number | object | [];
  getHealthInfoData: HealthInfoData[];
  getConsentHeaderData: ConsentHeaders[];
}

const initialState: State = {
  searchResult: {
    name: "",
    pinCode: "",
    dob: "",
    address: "",
    mobile: "",
    healthIdNumber: "",
    healthId: "",
  },
  abhaCardResult: "",
  abhaQrCode: "",
  abhaInitiation: {},
  createHealthIdWithAadhaar: {},
  aadhaarVerification: {},
  resendAadhaarOtp: {},
  mobileOtp: {},
  verifyMobileOtpHealthId: {},
  prescriptions: [],
  getHealthInfoData: [{ healthInformationTypeId: 0, code: "", display: "" }],
  getConsentHeaderData: [
    {
      abhaConsentHeaderId: "",
      healthId: "",
      consentStatus: "",
      fetchFromDate: "",
      fetchToDate: "",
      permissionExpiryDate: "",
    },
  ],
};

const rootReducerSlice = createSlice({
  name: "rootReducer",
  initialState,
  reducers: {
    setSearchResult(state, action: PayloadAction<DemographicResult>) {
      state.searchResult = action.payload;
    },
    getAbhaCardResult(state, action: PayloadAction<string>) {
      state.abhaCardResult = action.payload;
    },
    generatePhoneOtp(state, action: PayloadAction<object>) {
      state.mobileOtp = action.payload;
    },
    getAbhaQrCode(state, action: PayloadAction<string>) {
      state.abhaQrCode = action.payload;
    },
    abhaRegistration(state, action: PayloadAction<object>) {
      state.abhaInitiation = action.payload;
    },
    verifyAadhaar(state, action: PayloadAction<object>) {
      state.aadhaarVerification = action.payload;
    },
    resendAadhaarOtp(state, action: PayloadAction<object>) {
      state.resendAadhaarOtp = action.payload;
    },
    verifyPhoneOtp(state, action: PayloadAction<object>) {
      state.mobileOtp = action.payload;
    },
    verifyMobileOtpCreateHealthId(state, action: PayloadAction<object>) {
      state.verifyMobileOtpHealthId = action.payload;
    },
    createHealthIdOtp(state, action: PayloadAction<object>) {
      state.createHealthIdWithAadhaar = action.payload;
    },
    getHealthInfo(state, action: PayloadAction<Array<HealthInfoData>>) {
      state.getHealthInfoData = action.payload;
    },
    getConsentHeaderList(state, action: PayloadAction<Array<ConsentHeaders>>) {
      state.getConsentHeaderData = action.payload;
    },
    exportPrescriptions(
      state,
      action: PayloadAction<string | number | object | []>
    ) {
      state.prescriptions = action.payload;
    },
  },
});

export const {
  setSearchResult,
  getAbhaCardResult,
  getAbhaQrCode,
  abhaRegistration,
  verifyAadhaar,
  resendAadhaarOtp,
  verifyPhoneOtp,
  createHealthIdOtp,
  getHealthInfo,
  generatePhoneOtp,
  verifyMobileOtpCreateHealthId,
  getConsentHeaderList,
  exportPrescriptions,
} = rootReducerSlice.actions;

export default rootReducerSlice.reducer;
