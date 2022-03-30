import axios from "axios";
import { PATH_API } from "../constants";

export const getCategories = async () => {
  const token = localStorage.getItem("token");
  return await axios({
    url: PATH_API + "/category?expand=children",
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const getSeasons = async () => {
  const token = localStorage.getItem("token");
  return await axios({
    url: PATH_API + "/season",
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const getGenders = async () => {
  const token = localStorage.getItem("token");
  return await axios({
    url: PATH_API + "/gender",
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const getBrends = async () => {
  const token = localStorage.getItem("token");
  return await axios({
    url: PATH_API + "/brand",
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const getSizes = async (categoryId) => {
  const token = localStorage.getItem("token");
  return await axios({
    url: PATH_API + `/size?categoryId=${categoryId}`,
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const getDiscount = async () => {
    const token = localStorage.getItem("token");
    return await axios({
      url: PATH_API + "/discount",
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  };