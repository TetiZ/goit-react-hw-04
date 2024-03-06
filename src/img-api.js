import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";

export const fetchImg = async (searchQuery, page) => {
  const API_KEY = "L1prD8BqR15Gkg1702qWWBAC-R4T_wNXQc5qDB1lXlk";

  const response = await axios.get("/search/photos", {
    params: {
      query: searchQuery,
      per_page: 12,
      page,
    },
    headers: {
      Authorization: `Client-ID ${API_KEY}`,
    },
  });

  return response.data.results;
};
