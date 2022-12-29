<template>
  <div class="card">
    <a :href="anime.url" target="_blank">
      <img :src="anime.main_picture" :alt="anime.title + ' Poster'" />
      <span class="below-anime-image">
        <h4>{{ anime.title }}</h4>
        <h4 class="star">&star;</h4>
      </span>
    </a>
  </div>
</template>
<script>
export default {
  props: ["anime"],
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
  border-radius: 10px;
  transition: 0.3s;
  max-width: 200px;
}
h4 {
  margin: 0px;
  color: rgb(84, 1, 139);
  font-size: 18px;
  text-align: left;
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
</style>
