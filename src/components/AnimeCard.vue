<template>
  <div class="card">
    <router-link
      target="_self"
      :to="{ name: 'animeDetail', params: { id: anime.mal_id } }"
    >
      <a>
        <div class="image-container">
          <img :src="anime.main_picture" :alt="anime.title + ' Poster'" />
        </div>
        <span class="below-anime-image">
          <h4>{{ anime.title }}</h4>
          <span v-if="!wasFavorited()">
            <h4 class="star">&star;</h4>
          </span>
          <span v-else><h4 class="star">⭐</h4></span>
        </span>
      </a>
    </router-link>
  </div>
</template>
<script>
export default {
  props: ["anime"],
  methods: {
    wasFavorited() {
      let exist = this.$store.state.currentUser.favorites.find(
        (fAnime) => fAnime.id === this.anime.mal_id
      );
      if (exist) {
        //do something
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
<style scoped>
.card {
  margin-top: 15px;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  margin: 10px 5px 0px 5px;
  width: 200px;
}
.card:hover {
  background-color: rgb(245, 240, 252);
  transition: 0.4s;
}
.card img {
  object-fit: cover;
  border-radius: 10px 10px 0px 0px;
  transition: 0.3s;
  max-width: 200px;
}
h4 {
  margin: 0px;
  color: rgb(84, 1, 139);
  font-size: 18px;
  text-align: left;
  padding-bottom: 7px;
  width: 90%;
}
a:link,
a:visited,
a:hover,
a:active {
  text-decoration: none;
}
.star {
  width: 20%;
}
.below-anime-image {
  display: flex;
}
.star {
  font-size: 24px;
  text-align: center;
}
.image-container {
  height: 270px;
  overflow: hidden;
}
</style>
