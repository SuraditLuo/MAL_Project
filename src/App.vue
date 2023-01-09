<template>
  <nav>
    <span>
      <router-link to="/"><a class="logo">Anime Lookup</a></router-link>
      <span
        v-if="
          this.$store.state.loggedIn == true &&
          this.$store.state.currentUser.favorites.length >= 5
        "
      >
        <router-link
          :to="{
            name: 'discovery',
            params: { id: this.$store.state.currentUser.id },
          }"
          ><a class="discovery">Discovery</a></router-link
        >
      </span>
      <span v-else>
        <a class="discovery-disabled">Discovery</a>
      </span>
    </span>
    <span v-if="this.$route.name !== 'login'">
      <span v-if="this.$store.state.loggedIn == false">
        <router-link to="/login">
          <a class="login-button">Log in</a>
        </router-link>
      </span>
      <span v-else>
        <router-link to="/favorite"
          ><a class="favorite-button">Favorite</a></router-link
        >
        <a class="logout-button" @click="this.$store.dispatch('logout')"
          >Log out</a
        >
      </span>
    </span>
  </nav>
  <router-view />
</template>

<style>
body {
  background-color: rgba(133, 120, 207, 0.268);
}

#app {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: auto 5rem;
}

nav {
  display: flex;
  padding: 30px;
  justify-content: space-between;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}
.login-button {
  margin-top: 30px;
  display: inline-block;
  background-color: rgb(133, 120, 207);
  border-radius: 5px;
  width: 75px;
  padding: 4px 0px;
  color: rgb(255, 255, 255);
}
.logout-button {
  margin-top: 30px;
  display: inline-block;
  background-color: rgba(226, 90, 90, 0.878);
  border-radius: 5px;
  width: 75px;
  padding: 4px 0px;
  color: rgb(255, 255, 255);
  cursor: pointer;
}
.logo {
  display: inline-block;
  font-size: 36px;
  border: 2.5px solid white;
  box-shadow: 2px 4px #88888847;
  padding: 5px 10px;
  border-radius: 10px;
  background-color: rgb(133, 120, 207);
  color: rgb(255, 255, 255);
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.favorite-button {
  margin-top: 30px;
  display: inline-block;
  background-color: rgba(223, 186, 37, 0.878);
  border-radius: 5px;
  width: 75px;
  padding: 4px 0px;
  color: rgb(255, 255, 255);
  cursor: pointer;
  margin-right: 16px;
}
.discovery,
.discovery-disabled {
  display: inline-block;
  font-size: 24px;
  border: 2.5px solid white;
  box-shadow: 2px 4px #88888847;
  padding: 5px 10px;
  border-radius: 10px;
  background-color: rgb(144, 24, 124);
  color: rgb(255, 255, 255);
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  margin-left: 16px;
}

.discovery:hover {
  font-size: 155%;
  box-shadow: none;
  transition: 0.15s;
}
.discovery-disabled {
  opacity: 20%;
}
</style>
