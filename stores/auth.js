import baseApiUrl from "@/utils/baseApiUrl";
import axiosClient from "./clientAxios";

export const Login = async (checked, payload) => {
  try {
    const result = await axiosClient.post(`${baseApiUrl}/auth/local?`, payload);
    if (!result?.error) {
      localStorage.setItem("token", JSON.stringify(result.data.jwt));
      const infoUser = await axiosClient.get(
        `${baseApiUrl}/users/me?populate=deep`,
        { headers: { Authorization: `Bearer ${result.data.jwt}` } }
      );
      if (!infoUser?.error)
        localStorage.setItem("user", JSON.stringify(infoUser.data));
      return result;
    }
  } catch (e) {
    return null;
  }
};

export const Register = async (payload) => {
  try {
    const result = await axiosClient.post(
      `${baseApiUrl}/auth/local/register?populate=deep`,
      payload
    );
    if (!result?.error) {
      localStorage.setItem("user", JSON.stringify(result.data));
      return result;
    }
  } catch (e) {
    return e.response.data;
  }
};


