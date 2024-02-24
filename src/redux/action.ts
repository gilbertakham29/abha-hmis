export const setSearchResult = (result: object) => ({
  type: "SET_SEARCH_RESULT",
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
