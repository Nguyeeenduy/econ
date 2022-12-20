import baseApiUrl from "@/utils/baseApiUrl";
import axiosClient from "./clientAxios";

export const getCommentByBlog = async (id) => {
  try {
    const result = await axiosClient.get(
      `${baseApiUrl}/comments/api::blog-list.blog-list:${id}`
    );
    if (!result?.error) {
      return result?.data;
    }
  } catch (e) {
    return null;
  }
};
export const getRatingByBlog = async (slug) => {
  try {
    const result = await axiosClient.get(
      `${baseApiUrl}/ratings/reviews/${slug}`
    );
    if (!result?.error) {
      return result?.data;
    }
  } catch (e) {
    return null;
  }
};
export const postRatingByBlog = async (slug, payload) => {
  try {
    const result = await axiosClient.post(
      `${baseApiUrl}/ratings/reviews/${slug}`,
      payload
    );
    if (!result?.error) {
      return result?.data;
    }
  } catch (e) {
    return null;
  }
};

export const postCommentByBlog = async (id, payload) => {
  try {
    const result = await axiosClient.post(
      `${baseApiUrl}/comments/api::blog-list.blog-list:${id}`,
      payload
    );
    if (!result?.error) {
      return result?.data;
    }
  } catch (e) {
    return null;
  }
};
