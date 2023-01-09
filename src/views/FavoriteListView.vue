<template>
  <table class="favorites-list">
    <tr>
      <th>#</th>
      <th class>Anime</th>
      <th>Score</th>
      <th>Remove from list</th>
    </tr>
    <tr
      class="favorites-detail"
      v-for="favorite in favorites"
      :key="favorite.id"
    >
      <td>{{ favorite.rank }}</td>
      <td class="name">{{ favorite.name }}</td>
      <td>{{ favorite.score }}</td>
      <td>
        <button class="remove" @click="dispatchAction(favorite)">-</button>
      </td>
    </tr>
  </table>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "FavoriteListView",
  methods: {
    dispatchAction(favorite) {
      console.log(favorite);
      this.$store.commit("setSelectedAnime", favorite);
      this.$store.dispatch("RemoveFromList");
    },
  },
  computed: {
    ...mapState({
      favorites: (state) => state.currentUser.favorites,
    }),
  },
};
</script>
<style scoped>
table {
  background-color: rgb(133, 120, 207);
  border: 3px solid white;
  width: 75%;
  margin-top: 50px;
}
.name {
  text-align: left;
  padding-left: 5px;
}
td,
th {
  border: 2.5px solid white;
  color: white;
}
.remove {
  border-radius: 10px;
  background-color: red;
  color: white;
  border: 2px solid white;
  margin: 5px;
  width: 35px;
}
.remove:hover {
  cursor: pointer;
  background-color: rgb(208, 0, 0);
}
.favorites-list tr:nth-child(2) {
  background-color: rgb(209, 178, 3);
}
.favorites-list tr:nth-child(3) {
  background-color: rgb(143, 143, 143);
}
.favorites-list tr:nth-child(4) {
  background-color: rgb(184, 115, 51);
}
.favorites-list {
  margin: auto;
}
</style>
