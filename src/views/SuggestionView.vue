<template>
  <h2>Recommend</h2>
  <div class="suggestion-list">
    <AnimeCard
      v-for="anime in suggest"
      :key="anime.mal_id"
      :anime="anime"
      class="small-card"
    />
  </div>
  <hr />
</template>

<script>
import { mapState } from "vuex";
import AnimeCard from "@/components/AnimeCard.vue";
export default {
  computed: {
    ...mapState({
      suggest: (state) => state.suggest,
    }),
  },
  components: {
    AnimeCard,
  },
};
</script>
<style scoped>
h2 {
  text-align: left;
}
hr {
  color: rgb(161, 148, 225);
  border-top: 2px solid;
  margin-bottom: 0px;
}
.suggestion-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
