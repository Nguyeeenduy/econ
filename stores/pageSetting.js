import baseApiUrl from "@/utils/baseApiUrl";
import axiosClient from "./clientAxios";

export const getHomePageSetting = async (populate) => {
  try {
    const result = await axiosClient.get(
      `${baseApiUrl}/home-page-setting${
        populate ? `?populate=${populate}` : ""
      }`
    );
    if (!result?.error) {
      return result;
    }
  } catch (e) {
    return null;
  }
};
export const getIntroducePageSetting = async () => {
  try {
    const result = await axiosClient.get(
      `${baseApiUrl}/introduce-page-setting?populate=deep`
    );
    if (!result?.error) {
      return result;
    }
  } catch (e) {
    return null;
  }
};
export const getListTop10Ezchoices = async () => {
  try {
    const result = await axiosClient.get(
      `${baseApiUrl}/subcates?populate=child_subcates`
    );
    if (!result?.error) {
      return result;
    }
  } catch (e) {
    return null;
  }
};
