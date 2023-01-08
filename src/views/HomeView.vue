<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/bocchi.gif" />
    <span v-if="this.$store.state.loggedIn == true">
      <h4>Hello, {{ this.$store.state.currentUser.username }}</h4>
    </span>
    <div class="search-switch">
      <h3>Search by:</h3>
      <button v-if="searchBy == 'description'" @click.prevent="ByTitle">
        Title
      </button>
      <button v-else class="disabled">Title</button>
      <button v-if="searchBy == 'title'" @click.prevent="ByDescription">
        Description
      </button>
      <button v-else class="disabled">Description</button>
    </div>
    <form
      v-if="searchBy == 'title'"
      class="search-box"
      @submit.prevent="SearchTitle"
    >
      <input
        type="search"
        class="search-field"
        placeholder="Search for title:"
        v-model="searchQuery"
      />
    </form>
    <form v-else class="search-box" @submit.prevent="SearchDescription">
      <input
        type="search"
        class="search-field"
        placeholder="Search for description:"
        v-model="searchQuery"
      />
    </form>
  </div>
  <div class="centered">
    <div v-if="animelist.similar == null" class="anime-cards">
      <AnimeCard
        v-for="anime in animelist"
        :key="anime.mal_id"
        :anime="anime"
      />
    </div>
    <div v-else class="not-found">
      <h3>
        Did you mean:
        <i @click.prevent="SearchBySimilar">{{ animelist.similar }}</i>
      </h3>
      <h1>404 not found..</h1>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import AnimeCard from "@/components/AnimeCard.vue";
export default {
  name: "HomeView",
  data() {
    return {
      searchQuery: "",
      animelist: [],
      searchBy: "title",
    };
  },
  methods: {
    async SearchTitle() {
      const response = await fetch(
        `http://localhost:5000/title?query=${this.searchQuery}`
      );
      this.animelist = await response.json();
      this.searchQuery = "";
    },
    async SearchDescription() {
      const response = await fetch(
        `http://localhost:5000/description?query=${this.searchQuery}`
      );
      this.animelist = await response.json();
      console.log(this.animelist);
      this.searchQuery = "";
    },
    SearchBySimilar() {
      this.searchQuery = this.animelist.similar;
      if (this.searchBy == "title") {
        this.SearchTitle();
      } else {
        this.SearchDescription();
      }
    },
    async ByTitle() {
      this.searchQuery = "";
      this.searchBy = "title";
    },
    async ByDescription() {
      this.searchQuery = "";
      this.searchBy = "description";
    },
  },
  components: {
    AnimeCard,
  },
};
</script>
<style scoped>
.search-field {
  border: none;
  outline: none;
  background-color: #f3f3f3;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  width: 600px;
  border-radius: 15px;
  padding: 15px;
  margin-top: 10px;
  font-size: 16px;
}
.search-field:hover,
.search-field:focus {
  background-color: #ecebeb;
  box-shadow: none;
}
.anime-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.centered {
  align-items: center;
  height: 300px;
  margin: 16px auto;
  width: 78.5%;
}
i {
  text-decoration: underline;
}
i:hover {
  cursor: pointer;
  color: #23313f;
  font-size: 110%;
  transition: 0.4s;
}
h1 {
  font-size: 400%;
}
.not-found h3 {
  height: 80px;
}
.not-found {
  width: auto;
  height: 250px;
  background-color: rgb(245, 240, 252);
}
.search-switch button {
  margin: 0px 5px;
  font-size: 16px;
  background-color: rgb(133, 120, 207);
  color: rgb(255, 255, 255);
  border-radius: 7px;
  border: 2.5px solid white;
  box-shadow: 1.5px 3px #88888847;
}
.search-switch button:hover {
  size: 105%;
  transition: 0.2s;
  font-size: 105%;
  cursor: pointer;
}
.search-switch h3 {
  display: inline-block;
  margin-right: 7.5px;
}
.disabled {
  opacity: 50%;
}
.disabled:hover {
  pointer-events: none;
  cursor: default;
}
</style>
