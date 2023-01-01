<template>
  <div class="anime-title">
    <img :src="anime.images.jpg.image_url" />
    <div class="content-block">
      <h2 class="header">
        <span>Ranking: #{{ anime.rank }}</span>
        <span>Score: {{ anime.score }}</span>
        <span>Popularity: #{{ anime.popularity }}</span>
      </h2>
      <h1>{{ anime.title }}</h1>
      <h4 class="genre">
        <span v-for="genre in anime.genres" :key="genre.mal_id">
          {{ genre.name }}</span
        >
      </h4>
      <h4 class="theme">
        <span v-for="theme in anime.themes" :key="theme.mal_id">
          {{ theme.name }}</span
        >
      </h4>
      <h4>
        Episode(s): {{ anime.episodes }}
        <span v-if="anime.status == 'Finished Airing'">
          <span class="status-finish">{{ anime.status }}</span>
        </span>
        <span v-else>
          <span class="status-onair">{{ anime.status }}</span>
        </span>
      </h4>
      <h4>Studio: {{ anime.studios[0].name }}</h4>
      <span v-if="loggedIn">
        <h3>
          Rate this anime:
          <select id="score" v-model="givenScore">
            <option value="" disabled selected>Score</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option></select
          >/10
          <span v-if="givenScore != ''"
            ><button class="submit" @click="this.$store.dispatch('AddToList')">
              Add to list
            </button></span
          ><span v-else
            ><button class="disabled-submit">Add to list</button></span
          >
        </h3>
      </span>
    </div>
  </div>
  <hr />
  <div class="anime-description">
    <div class="anime-synopsis">
      <h2>Synopsis</h2>
      <h4><a class="tab"></a>{{ anime.synopsis }}</h4>
    </div>
    <div class="anime-video">
      <h2>Watch trailer</h2>
      <iframe
        v-bind:src="anime.trailer.embed_url"
        control
        width="450"
        height="225"
      ></iframe>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "AnimeDetailView",
  computed: {
    ...mapState({
      user: (state) => state.currentUser.username,
      anime: (state) => state.anime.data,
      loggedIn: (state) => state.loggedIn,
    }),
    givenScore: {
      get() {
        return this.$store.state.givenScore;
      },
      set(input) {
        this.$store.commit("setScoreInput", input);
      },
    },
  },
};
</script>
<style scoped>
.anime-title,
.anime-description {
  display: flex;
}
img {
  border-radius: 15px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
}
.genre span {
  background-color: rgba(133, 120, 207, 1);
  margin-left: 5px;
  padding: 0px 7.5px;
  border-radius: 5px;
  border: 2.5px solid white;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  color: white;
}
.theme span {
  background-color: rgb(92, 72, 206);
  margin-left: 5px;
  padding: 0px 7.5px;
  border-radius: 5px;
  border: 2.5px solid white;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  color: white;
}
.content-block,
.anime-description {
  justify-content: left;
  text-align: left;
  margin: 2.5px 15px;
  width: 100%;
}
hr {
  color: rgb(161, 148, 225);
  border-top: 2px solid;
  margin-bottom: 0px;
}
.header {
  text-align: left;
  width: 100%;
  margin: 0px;
  background-color: rgb(161, 148, 225);
  padding: 5px 15px;
  border-radius: 16px;
  border: 4px solid white;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
}
.header span {
  margin-right: 36px;
  color: rgb(255, 255, 255);
}
.status-finish {
  background-color: red;
  color: white;
  border-radius: 16px;
  border: 2px solid white;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  width: fit-content;
  padding: 5px 10px;
  font-size: 16px;
}
.status-onair {
  background-color: green;
  color: white;
  border-radius: 16px;
  border: 2px solid white;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  width: fit-content;
  padding: 5px 10px;
  font-size: 16px;
}
#score {
  display: inline-flex;
  margin-right: 5px;
}
.submit,
.disabled-submit {
  background-color: rgba(0, 255, 76, 0.718);
  color: white;
  border-radius: 16px;
  border: 2px solid white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  width: fit-content;
  padding: 5px 10px;
  margin-left: 20px;
}
.disabled-submit {
  opacity: 50%;
}
.submit:hover {
  cursor: pointer;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}
.disabled-submit:hover {
  cursor: default;
}

.tab {
  padding-left: 50px;
}
.anime-synopsis,
.anime-video {
  width: 50%;
  padding: 0px 10px;
}
.anime-video {
  margin-left: 5px;
}
.anime-synopsis {
  border-right: 2px solid rgb(161, 148, 225);
}
</style>
