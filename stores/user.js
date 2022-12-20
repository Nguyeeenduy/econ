import baseApiUrl from "@/utils/baseApiUrl";
import axiosClient from "./clientAxios";

export const getUserList = async () => {
    try {
      const result = await axiosClient.get(
        `${baseApiUrl}/users?populate=*`
      );
      if (!result?.error) {
        return result?.data;
      }
    } catch (e) {
      return null;
    }
};

export const getUserById = async (id) => {
    try {
      const result = await axiosClient.get(
        `${baseApiUrl}/users/${id}?populate=*`
      );
      if (!result?.error) {
        return result?.data;
      }
    } catch (e) {
      return null;
    }
};