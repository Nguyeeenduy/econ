import baseApiUrl from "@/utils/baseApiUrl";
import axiosClient from "./clientAxios";

export const getListBlogs = async (skip, limit, populate) => {
  try {
    const result = await axiosClient.get(
      `${baseApiUrl}/blog-lists?pagination%5Bpage%5D=${skip}&pagination%5BpageSize%5D=${limit}&populate=${populate}`
    );
    if (!result?.error) {
      return result;
    }
  } catch (e) {
    return null;
  }
};

export const getListBlogById = async (id) => {
  try {
    const result = await axiosClient.get(`${baseApiUrl}/blog-lists/${id}`);
    if (!result?.error) {
      return result;
    }
  } catch (e) {
    return null;
  }
};
export const updateBlogById = async (id, payload) => {
  try {
    const result = await axiosClient.put(
      `${baseApiUrl}/blog-lists/${id}`,
      payload
    );
    if (!result?.error) {
      return result;
    }
  } catch (e) {
    return null;
  }
};
export const getFilterBlog = async (filter, skip, limit, populate) => {
  try {
    const result = await axiosClient.get(
      `${baseApiUrl}/blog-lists?filters[title][$containsi]=${filter}${
        populate ? `&populate=${populate}` : ``
      }${skip !== undefined ? `&pagination%5Bpage%5D=${skip}` : ``}${
        limit ? `&pagination%5BpageSize%5D=${limit}` : ``
      }`
    );
    if (!result?.error) {
      return result;
    }
  } catch (e) {
    return null;
  }
};
export const getFilterBlogByCategory = async (
  filter,
  skip,
  limit,
  populate
) => {
  try {
    const result = await axiosClient.get(
      `${baseApiUrl}/blog-lists?${
        skip !== undefined ? `pagination%5Bpage%5D=${skip}` : ``
      }${
        limit ? `&pagination%5BpageSize%5D=${limit}` : ``
      }&filters%5Bcategory_lists%5D%5BcategoryName%5D%5B$eq%5D=${filter}&populate=${populate}`
    );
    if (!result?.error) {
      return result;
    }
  } catch (e) {
    return null;
  }
};
