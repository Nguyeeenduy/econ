import baseApiUrl from "@/utils/baseApiUrl";
import axiosClient from "./clientAxios";

export const getListProduct = async (skip, limit, populate, filters) => {
  try {
    const result = await axiosClient.get(
      `${baseApiUrl}/products?pagination%5Bpage%5D=${skip}&pagination%5BpageSize%5D=${limit}&populate=${populate}${filters}`
    );
    if (!result?.error) {
      return result;
    }
  } catch (e) {
    return null;
  }
};
export const getProductBySlug = async (slug, populate) => {
  try {
    const result = await axiosClient.get(
      `${baseApiUrl}/products?populate=${populate}&filters%5Bslug%5D=${slug}`
    );
    if (!result?.error) {
      return result;
    }
  } catch (e) {
    return null;
  }
};

export const getFilterProduct = async (filter, skip, limit, populate) => {
  try {
    const result = await axiosClient.get(
      `${baseApiUrl}/products?filters[name][$containsi]=${filter}${
        populate ? `&populate=${populate}` : ``
      }${skip ? `&pagination%5Bpage%5D=${skip}` : ``}${
        limit ? `&pagination%5B5BpageSize%5D=${limit}` : ``
      }`
    );
    if (!result?.error) {
      return result;
    }
  } catch (e) {
    return null;
  }
};
export const getFilterProductType = async (filter, skip, limit, populate) => {
  try {
    const result = await axiosClient.get(
      `${baseApiUrl}/protypes?filters[name][$containsi]=${filter}${
        populate ? `&populate=${populate}` : ``
      }${skip ? `&pagination%5Bpage%5D=${skip}` : ``}${
        limit ? `&pagination%5B5BpageSize%5D=${limit}` : ``
      }`
    );
    if (!result?.error) {
      return result;
    }
  } catch (e) {
    return null;
  }
};
export const getProductByType = async (id, skip, limit, populate) => {
  try {
    const result = await axiosClient.get(
      `${baseApiUrl}/protypes?populate=${populate}&filters[id]=${id}&pagination%5Bpage%5D=${skip}&pagination%5BpageSize%5D=${limit}`
    );
    if (!result?.error) {
      return result;
    }
  } catch (e) {
    return null;
  }
};
export const getListSubcateBySlug = async (slug) => {
  try {
    const result = await axiosClient.get(
      `${baseApiUrl}/subcates?populate=child_subcates&filters[child_subcates][Slug]=${slug}`
    );
    if (!result?.error) {
      return result;
    }
  } catch (e) {
    return null;
  }
};
