import baseApiUrl from "@/utils/baseApiUrl";
import axiosClient from "./clientAxios";

export const sendInfoContact = async (payload) => {
  try {
    const result = await axiosClient.post(`${baseApiUrl}/contacts`, payload);
    if (!result?.error) {
      return result?.data;
    }
  } catch (e) {
    return null;
  }
};
export const getInfoContact = async (payload) => {
  try {
    const result = await axiosClient.get(`/contact-info`);
    if (!result?.error) {
      return result?.data;
    }
  } catch (e) {
    return null;
  }
};
