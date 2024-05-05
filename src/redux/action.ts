export const setSearchResult = (result: object) => ({
  type: "SET_SEARCH_RESULT",
  payload: result,
});
export const setPatientResult = (result: object) => ({
  type: "SET_PATIENT_RESULT",
  payload: result,
});
export const getAbhaCardResult = (result: string) => ({
  type: "GET_ABHA_CARD_RESULT",
  payload: result,
});
export const getAbhaQrCode = (result: string) => ({
  type: "GET_ABHA_QR_CODE",
  payload: result,
});
export const abhaRegistration = (result: string) => ({
  type: "SET_INITIATE_ABHA_REGISTRATION",
  payload: result,
});
export const verifyAadhaar = (result: string) => ({
  type: "GET_AADHAAR_VERIFICATION_OTP",
  payload: result,
});
export const resendAadhaarOtp = (result: string) => ({
  type: "GET_AADHAAR_RESEND_OTP",
  payload: result,
});
export const generatePhoneOtp = (result: number) => ({
  type: "GET_MOBILE_OTP",
  payload: result,
});
export const verifyPhoneOtp = (result: number) => ({
  type: "GET_MOBILE_VERIFICATION_OTP",
  payload: result,
});
export const createHealthIdOtp = (result: string) => ({
  type: "CREATE_HEALTH_ID",
  payload: result,
});
export const verifyMobiletpWithEmail = (result: object) => ({
  type: "VERIFY_MOBILE_OTP_AND_CREATE_HEALTH_ID",
  payload: result,
});
export const getHealthInfo = (result: []) => ({
  type: "GET_HEALTH_INFO",
  payload: result,
});
export const getRequestIdInfo = (result: object) => ({
  type: "GET_REQUEST_ID",
  payload: result,
});
export const getMobileOtpRequestId = (result: object) => ({
  type: "GET_MOBILE_OTP_REQUEST_ID",
  payload: result,
});
export const getConsentHeaderList = (result: []) => ({
  type: "GET_CONSENT_HEADER",
  payload: result,
});
export const loginUserSuccess = (result: object) => ({
  type: "GET_USER_TOKEN",
  payload: result,
});
export const patientList = (result: []) => ({
  type: "GET_PATIENTLIST",
  payload: result,
});
export const setErrorMessage = (errorMessage: object) => ({
  type: "SET_ERROR_MESSAGE",
  payload: errorMessage,
});
export const mobileNumberErrorMessage = (mobileNumberError: object) => ({
  type: "MOBILE_NUMBER_ERROR",
  payload: mobileNumberError,
});
export const optSuccessMessage = (otpSuccess: object) => ({
  type: "OTP_SUCCESS_MESSAGE",
  payload: otpSuccess,
});
export const clearErrorMessage = () => ({
  type: "CLEAR_ERROR_MESSAGE",
});
export const mobileNumberMessage = (mobileNumberSuccess: object) => ({
  type: "MOBILE_NUMBER_SUCCESS",
  payload: mobileNumberSuccess,
});
export const mobileOtpSuccess = (mobileOtpSuccessMessage: object) => ({
  type: "MOBILE_OTP_SUCCESS",
  payload: mobileOtpSuccessMessage,
});
export const mobileOtpError = (mobileOtpErrorMessage: object) => ({
  type: "MOBILE_OTP_ERROR",
  payload: mobileOtpErrorMessage,
});
