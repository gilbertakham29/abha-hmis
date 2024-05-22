import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ConsentHeaders {
  abhaConsentHeaderId: string;
  healthId: string;
  consentStatus: string;
  fetchFromDate: string;
  fetchToDate: string;
  permissionExpiryDate: string;
}
export interface InitAuth {
  txnId: string;
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
export interface ProfileResultByHipCodeandTokenNumber {
  name: string;
  gender: string;
  dob: string;
  mobileNumber: string;
  healthIDNumber: string;
  healthID: string;
}
export interface PatientResult {
  name: string;
  pinCode: string;
  dob: string;
  address: string;
  mobile: string;
  healthIdNumber: string;
  healthId: string;
  abhaAccountID: number;
}
export interface PatientListData {
  abhaAddress: string;
  abhaId: string;
  addedDate: string;
  age: number;
  contactNumber: string;
  dob: string;
  gender: string;
  isAbhaCreated: boolean;
  isActive: boolean;
  patientId: number;
  patientName: string;
  permanentAddress: string;
  pin: number;
  state: string;
  title: string;
  uhid: string;
}
export interface InitiateLinking {
  abhaId: string;
  requestId: string;
  requesterType: string;
}
export interface ConfirmWithMobileOtp {
  requestId: string;
  otp: string;
}
export interface User {
  token: string;
}
export interface AbhaCardList {
  abhaCardResult: string;
}
interface State {
  searchResult: DemographicResult;
  profileResultByHipandTokeNumber: ProfileResultByHipCodeandTokenNumber;
  initAuthResult: InitAuth;
  patientResult: PatientResult;
  patientList: PatientListData[];
  abhaCardResult: string;
  abhaCardList: AbhaCardList[];
  abhaQrCode: string;
  abhaInitiation: object;
  createHealthIdWithAadhaar: object;
  aadhaarVerification: object;
  resendAadhaarOtp: object;
  mobileOtp: object;
  verifyMobileOtpHealthId: object;
  user: User;
  clearMessage: string;
  prescriptions: string | number | object | [];
  getHealthInfoData: HealthInfoData[];
  getConsentHeaderData: ConsentHeaders[];
  initiateLinkingData: object;
  confirmMobileOtp: object;
  otpSuccess: object;
  errorMessage: object;
  mobileNumberSuccess: object;
  mobileNumberError: object;
  mobileOtpSuccess: object;
  mobileOtpError: object;
  verifyHealthOtpError: object;
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
  profileResultByHipandTokeNumber: {
    name: "",
    gender: "",
    dob: "",
    mobileNumber: "",
    healthIDNumber: "",
    healthID: "",
  },
  initAuthResult: {
    txnId: "",
  },
  patientResult: {
    name: "",
    pinCode: "",
    dob: "",
    address: "",
    mobile: "",
    healthIdNumber: "",
    healthId: "",
    abhaAccountID: Number(""),
  },
  patientList: [
    {
      abhaAddress: "",
      abhaId: "",
      addedDate: "",
      age: Number(""),
      contactNumber: "",
      dob: "",
      gender: "",
      isAbhaCreated: false,
      isActive: false,
      patientId: Number(""),
      patientName: "",
      permanentAddress: "",
      pin: Number(""),
      state: "",
      title: "",
      uhid: "",
    },
  ],
  abhaCardResult: "",
  abhaCardList: [],
  abhaQrCode: "",
  abhaInitiation: {},
  createHealthIdWithAadhaar: {},
  aadhaarVerification: {},
  resendAadhaarOtp: {},
  mobileOtp: {},
  user: {
    token: "",
  },
  clearMessage: "",
  verifyMobileOtpHealthId: {},
  prescriptions: [],
  getHealthInfoData: [
    { healthInformationTypeId: Number(""), code: "", display: "" },
  ],

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
  initiateLinkingData: {},
  confirmMobileOtp: {},
  otpSuccess: {},
  errorMessage: {},
  mobileNumberSuccess: {},
  mobileNumberError: {},
  mobileOtpSuccess: {},
  mobileOtpError: {},
  verifyHealthOtpError: {},
};

const rootReducerSlice = createSlice({
  name: "rootReducer",
  initialState,
  reducers: {
    setSearchResult(state, action: PayloadAction<DemographicResult>) {
      state.searchResult = action.payload;
    },
    setProfileHipcodeandTokenNumber(
      state,
      action: PayloadAction<ProfileResultByHipCodeandTokenNumber>
    ) {
      state.profileResultByHipandTokeNumber = action.payload;
    },
    setInitAuth(state, action: PayloadAction<InitAuth>) {
      state.initAuthResult = action.payload;
    },
    setPatientResult(state, action: PayloadAction<PatientResult>) {
      state.patientResult = action.payload;
    },
    getPatientList(state, action: PayloadAction<Array<PatientListData>>) {
      state.patientList = action.payload;
    },
    getAbhaCardResult(state, action: PayloadAction<string>) {
      state.abhaCardResult = action.payload;
    },
    getAbhaCardResultList(state, action: PayloadAction<Array<AbhaCardList>>) {
      state.abhaCardList = action.payload;
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
    getRequestId(state, action: PayloadAction<object>) {
      state.initiateLinkingData = action.payload;
    },
    getMobileOtpRequestId(state, action: PayloadAction<object>) {
      state.confirmMobileOtp = action.payload;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user.token = action.payload.token;
    },
    logoutSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<object>) => {
      state.errorMessage = action.payload;
    },
    exportPrescriptions(
      state,
      action: PayloadAction<string | number | object | []>
    ) {
      state.prescriptions = action.payload;
    },
    clearErrorMessage: (state) => {
      state.clearMessage = "";
    },
    optSuccessMessage: (state, action: PayloadAction<object>) => {
      state.otpSuccess = action.payload;
    },
    mobileNumberMessage: (state, action: PayloadAction<object>) => {
      state.mobileNumberSuccess = action.payload;
    },
    mobileNumberError: (state, action: PayloadAction<object>) => {
      state.mobileNumberError = action.payload;
    },
    mobileOtpSuccess: (state, action: PayloadAction<object>) => {
      state.mobileOtpSuccess = action.payload;
    },
    mobileOtpError: (state, action: PayloadAction<object>) => {
      state.mobileOtpError = action.payload;
    },
    verifyHealthOtpError: (state, action: PayloadAction<object>) => {
      state.verifyHealthOtpError = action.payload;
    },
  },
});

export const {
  setSearchResult,
  setProfileHipcodeandTokenNumber,
  setInitAuth,
  setPatientResult,
  getPatientList,
  getAbhaCardResult,
  getAbhaCardResultList,
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
  getRequestId,
  getMobileOtpRequestId,
  exportPrescriptions,
  loginSuccess,
  setErrorMessage,
  clearErrorMessage,
  optSuccessMessage,
  mobileNumberMessage,
  mobileNumberError,
  mobileOtpSuccess,
  mobileOtpError,
  verifyHealthOtpError,
} = rootReducerSlice.actions;

export default rootReducerSlice.reducer;
