import apiClient from "@/services/AxiosClient.js";

export default {
  getAnime(anime) {
    return apiClient.get("/" + anime + "/full");
  },
};
