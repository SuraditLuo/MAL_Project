import apiClient from "@/services/AxiosClient.js";

export default {
  getAnime(anime) {
    return apiClient.get("/" + anime + "/full");
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
