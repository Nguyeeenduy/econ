import baseApiUrl from "@/utils/baseApiUrl";
import baseApiUrlV2 from "@/utils/baseApiUrlV2";
import axios from "axios";

export const getGoldPrice = async () => {
  try {
    const result = await axios.get(`${baseApiUrlV2}/v1/gold/lastest`);
    if (!result?.error) {
      return result;
    }
  } catch (e) {
    return null;
  }
};

export const getExchangeRate = async (from, to) => {
  try {
    const result = await axios.get(`${baseApiUrlV2}/v1/finance/${from}${to}`);
    if (!result?.error) {
      return result;
    }
  } catch (e) {
    return null;
  }
};
export const getNation = async () => {
  try {
    const result = await axios.get(
      `${baseApiUrl}/currency-lists?populate=image`
    );
    if (!result?.error) {
      return result;
    }
  } catch (e) {
    return null;
  }
};
export const getATMName = async () => {
  try {
    const result = await axios.get(`${baseApiUrl}/atm-names`);
    if (!result?.error) {
      return result;
    }
  } catch (e) {
    return null;
  }
};
export const getConsciousName = async () => {
  try {
    const result = await axios.get(`${baseApiUrl}/conscious-lists`);
    if (!result?.error) {
      return result;
    }
  } catch (e) {
    return null;
  }
};
export const getDistrictByConscious = async (conscious) => {
  try {
    const result = await axios.get(
      `${baseApiUrl}/district-lists?filters[conscious_list][name]=${conscious}`
    );
    if (!result?.error) {
      return result;
    }
  } catch (e) {
    return null;
  }
};
export const getATMLocation = async (atmName, district) => {
  try {
    const result = await axios.get(
      `${baseApiUrl}/atm-locations?filters[district_list][name]=${district}&filters[atm_name][name]=${atmName}`
    );
    if (!result?.error) {
      return result;
    }
  } catch (e) {
    return null;
  }
};
export const getDebtPurpose = async () => {
  try {
    const result = await axios.get(`${baseApiUrl}/debt-purposes`);
    if (!result?.error) {
      return result;
    }
  } catch (e) {
    return null;
  }
};
export const getCreditScore = async () => {
  try {
    const result = await axios.get(`${baseApiUrl}/credit-scores`);
    if (!result?.error) {
      return result;
    }
  } catch (e) {
    return null;
  }
};
export const getLoanCompanie = async (skip, limit, populate) => {
  try {
    const result = await axios.get(
      `${baseApiUrl}/loan-companies?pagination%5Bpage%5D=${skip}&pagination%5BpageSize%5D=${limit}&populate=${populate}`
    );
    if (!result?.error) {
      return result;
    }
  } catch (e) {
    return null;
  }
};
export const getFilterLoanCompanie = async (filter, populate) => {
  try {
    const result = await axios.get(
      `${baseApiUrl}/loan-companies?${filter}&populate=${populate}`
    );
    if (!result?.error) {
      return result;
    }
  } catch (e) {
    return null;
  }
};
