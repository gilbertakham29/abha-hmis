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
} from "../redux/action";
import { Dispatch } from "redux";
export const handleSearch = async (phoneNumber: string, dispatch: Dispatch) => {
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
    return result;
  } catch (error) {
    console.error("Error fetching patient details:", error);
  }
};
export const getAbhaCard = async (
  abhaAccountID: number,
  dispatch: Dispatch
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
export const getQrcode = async (abhaAccountID: number, dispatch: Dispatch) => {
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
  dispatch: Dispatch
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
  dispatch: Dispatch
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
  dispatch: Dispatch
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
  dispatch: Dispatch
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
export const resendOtp = async (aadhaarInput: string, dispatch: Dispatch) => {
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
  dispatch: Dispatch
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

export const initiateConsent = async (
  healthIdInput: string,
  facilityIdInput: string,
  requesterNameInput: string,
  requesterTypeInput: string,
  requesterIdInput: string,
  permissionFromDateInput: string | null,
  permissionToDateInput: string | null,
  permissionExpiryDateInput: string | null,
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
export const getHealthInformationType = async (dispatch: Dispatch) => {
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
  dispatch: Dispatch
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
