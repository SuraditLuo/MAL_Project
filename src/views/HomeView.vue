<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/bocchi.gif" />
    <span v-if="this.$store.state.loggedIn == true">
      <h4>Hello, {{ this.$store.state.currentUser.username }}</h4>
    </span>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  // components: {
  //   HelloWorld,
  // },
};
</script>
