import {
  getAbhaCardResult,
  getAbhaQrCode,
  setSearchResult,
  abhaRegistration,
  createHealthIdOtp,
  verifyAadhaar,
  generatePhoneOtp,
  verifyPhoneOtp,
  resendAadhaarOtp,
  getHealthInfo,
  getConsentHeaderList,
  verifyMobileOtpCreateHealthId,
  getRequestId,
  getMobileOtpRequestId,
  loginSuccess,
} from "../redux/reducer";

import { AppDispatch } from "../redux/store";
export const handleSearch = async (
  phoneNumber: string,
  dispatch: AppDispatch
) => {
  const data = {
    searchString: phoneNumber,
  };
  try {
    const response = await fetch(
      `https://dev-care-connect-api.azurewebsites.net/api/AbhaRegistration/GetDemographics`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    dispatch(setSearchResult(result));
    console.log(result);

    return result;
  } catch (error) {
    console.error("Error fetching patient details:", error);
  }
};
export const getAbhaCard = async (
  abhaAccountID: number,
  dispatch: AppDispatch
) => {
  const data = {
    id: abhaAccountID,
  };
  try {
    const response = await fetch(
      "https://dev-care-connect-api.azurewebsites.net/api/AbhaRegistration/GetAbhaCard",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await response.text();

    dispatch(getAbhaCardResult(result));
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error fetching card details:", error);
  }
};
export const getQrcode = async (
  abhaAccountID: number,
  dispatch: AppDispatch
) => {
  const data = {
    id: abhaAccountID,
  };
  try {
    const response = await fetch(
      "https://dev-care-connect-api.azurewebsites.net/api/AbhaRegistration/GetQrCode",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await response.text();
    dispatch(getAbhaQrCode(result));
    console.log(result);
  } catch (error) {
    console.error("Error in fetching QR code", error);
  }
};
export const initAbhaRegistration = async (
  aadhaarInput: string,
  dispatch: AppDispatch
) => {
  const data = {
    aadhaar: aadhaarInput,
  };
  try {
    const response = await fetch(
      "https://dev-care-connect-api.azurewebsites.net/api/AbhaRegistration/InitiateRegistration",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    dispatch(abhaRegistration(result));
    console.log(result);
  } catch (error) {
    console.error("Fail to initiate registration! Please try again.", error);
  }
};
export const verifyAadhaarOtp = async (
  aadhaarInput: string,
  otp: number,
  dispatch: AppDispatch
) => {
  const data = {
    aadhaar: aadhaarInput,
    otp: otp,
  };
  const response = await fetch(
    "https://dev-care-connect-api.azurewebsites.net/api/AbhaRegistration/VerifyAadharOtp",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  dispatch(verifyAadhaar(result));
  console.log(result);
};
export const generateMobileOtp = async (
  aadhaarInput: string,
  phoneNumber: number,
  dispatch: AppDispatch
) => {
  const data = {
    aadhaar: aadhaarInput,
    mobile: phoneNumber,
  };
  const response = await fetch(
    "https://dev-care-connect-api.azurewebsites.net/api/AbhaRegistration/GenerateMobileOtp",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  dispatch(generatePhoneOtp(result));
  console.log(result);
};
export const verifyMobileOtp = async (
  aadhaarInput: string,
  otp: number,
  dispatch: AppDispatch
) => {
  const data = {
    aadhaar: aadhaarInput,
    otp: otp,
  };
  const response = await fetch(
    "https://dev-care-connect-api.azurewebsites.net/api/AbhaRegistration/VerifyMobileOtp",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  dispatch(verifyPhoneOtp(result));
  console.log(result);
};
export const resendOtp = async (
  aadhaarInput: string,
  dispatch: AppDispatch
) => {
  const data = {
    aadhaar: aadhaarInput,
  };
  const response = await fetch(
    "https://dev-care-connect-api.azurewebsites.net/api/AbhaRegistration/ResendAadharOtp",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  dispatch(resendAadhaarOtp(result));
  console.log(result);
};
export const createHealthId = async (
  aadhaarInput: string,
  otp: number,
  dispatch: AppDispatch
) => {
  const data = {
    aadhaar: aadhaarInput,
    otp: otp,
  };
  const response = await fetch(
    "https://dev-care-connect-api.azurewebsites.net/api/AbhaRegistration/CreateHealthId",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  dispatch(createHealthIdOtp(result));
  console.log(result);
};
export const verifyOtpandCreateHealthId = async (
  aadhaarInput: string,
  otp: number,
  email: string,
  dispatch: AppDispatch
) => {
  const data = {
    aadhaar: aadhaarInput,
    otp: otp,
    emailId: email,
  };
  const response = await fetch(
    "https://dev-care-connect-api.azurewebsites.net/api/AbhaRegistration/VerifyMobileOtpAndGenerateHealthId",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  dispatch(verifyMobileOtpCreateHealthId(result));
  console.log(result);
};
export const initiateConsent = async (
  healthIdInput: string,
  facilityIdInput: string,
  requesterNameInput: string,
  requesterTypeInput: string,
  requesterIdInput: string,
  permissionFromDateInput: Date,
  permissionToDateInput: Date,
  permissionExpiryDateInput: Date,
  hiTypesListInput: string[]
) => {
  const data = {
    healthId: healthIdInput,
    facilityId: facilityIdInput,
    requesterName: requesterNameInput,
    requesterType: requesterTypeInput,
    requesterId: requesterIdInput,
    permissionFromDate: permissionFromDateInput,
    permissionToDate: permissionToDateInput,
    permissionExpiryDate: permissionExpiryDateInput,
    hiTypesList: hiTypesListInput,
  };
  const response = await fetch(
    "https://dev-care-connect-api.azurewebsites.net/api/AbdmM3/InitiateConsentForDataTransfer",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  console.log(result);
};
export const getHealthInformationType = async (dispatch: AppDispatch) => {
  const response = await fetch(
    "https://dev-care-connect-api.azurewebsites.net/api/AbhaBase/GetHealthInformationType",
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const result = await response.json();
  dispatch(getHealthInfo(result));
  console.log(result);
};
export const getConsentHeaders = async (
  facilityInput: string,
  fromDateInput: string | null,
  toDateInput: string | null,
  dispatch: AppDispatch
) => {
  const data = {
    facilityId: facilityInput,
    fromDate: fromDateInput,
    toDate: toDateInput,
  };
  const response = await fetch(
    "https://dev-care-connect-api.azurewebsites.net/api/AbdmM3/GetConsentHeaders",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  dispatch(getConsentHeaderList(result));
  console.log(result);
};
export const getRequstIdData = async (
  abhaIdInput: string,
  requesterIdInput: string,
  requesterTypeInput: string,
  dispatch: AppDispatch
) => {
  const data = {
    abhaId: abhaIdInput,
    requesterId: requesterIdInput,
    requesterType: requesterTypeInput,
  };
  console.log(data);

  const response = await fetch(
    "https://dev-care-connect-api.azurewebsites.net/api/Facilities/InitLinkingByMobileOtp",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  dispatch(getRequestId(result));
  console.log(result);
};
export const confirmUsingMobileOtp = async (
  requestIdInput: string,
  otp: string,
  dispatch: AppDispatch
) => {
  const data = {
    requestId: requestIdInput,
    otp: otp,
  };
  const response = await fetch(
    "https://dev-care-connect-api.azurewebsites.net/api/Facilities/ConfirmAuthUsingMobileOtp",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  dispatch(getMobileOtpRequestId(result));
  console.log(result);
};
export const addCareContext = async (
  requestIdInput: string,
  patientMrnInput: string,
  patientNameInput: string,
  patientVisitInput: string,
  messageInput: string
) => {
  const data = {
    requestId: requestIdInput,
    patientMrn: patientMrnInput,
    patientName: patientNameInput,
    patientVisitReference: patientVisitInput,
    displayMessage: messageInput,
  };
  const response = await fetch(
    "https://dev-care-connect-api.azurewebsites.net/api/Facilities/AddCareContext",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const result = await response.status;
  console.log(result);
};
export const loginUser = async (
  emailInput: string,
  passwordInput: string,
  dispatch: AppDispatch
) => {
  const data = {
    email: emailInput,
    password: passwordInput,
  };
  try {
    const res = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Invalid email or password!");
    }

    const { token } = await res.json();
    localStorage.setItem("token", token);
    dispatch(loginSuccess(token));

    // Navigate to the next page
  } catch (error) {
    console.error("Unable to sign in!");
  }
};
