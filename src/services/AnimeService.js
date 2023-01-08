import apiClient from "@/services/AxiosClient.js";
export default {
  getAnime(anime) {
    return apiClient.get("/" + anime + "/full");
  },
  getSuggestion(userId) {
    return apiClient.get("http://127.0.0.1:5000/suggestion?query=" + userId);
  },
  removeMatchingObject(list, object) {
    for (let i = 0; i < list.length; i++) {
      if (
        list[i].rank === object.rank &&
        list[i].name === object.name &&
        list[i].score === object.score
      ) {
        list.splice(i, 1);
      }
    }
  },
  addRank(list) {
    for (let i = 0; i < list.length; i++) {
      list[i]["rank"] = i + 1;
    }
  },
};
