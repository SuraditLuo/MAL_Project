<template>
  <div class="login">
    <img alt="Vue logo" src="../assets/bocchi.gif" />
  </div>
  <div class="input">
    <input v-model="username" placeholder="Enter username:" type="text" />
    <input v-model="password" placeholder="Enter password:" type="text" />
  </div>
  <span v-if="$store.state.username != '' && $store.state.password != ''">
    <button @click="this.$store.dispatch('login')">submit</button>
  </span>
  <span v-else>
    <button class="empty">submit</button>
  </span>
</template>

<script>
export default {
  name: "LoginView",
  computed: {
    username: {
      get() {
        return this.$store.state.username;
      },
      set(input) {
        this.$store.commit("setUsernameInput", input);
      },
    },
    password: {
      get() {
        return this.$store.state.password;
      },
      set(input) {
        this.$store.commit("setPasswordInput", input);
      },
    },
  },
};
</script>
<style scoped>
.input {
  float: center;
}
input {
  display: block;
  margin: 0 auto;
  margin-top: 25px;
  background-color: rgba(133, 120, 207, 0.663);
  width: 500px;
  font-size: 20px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  border: 0.125rem solid rgb(133, 120, 207);
  border-radius: 12px;
}
input::placeholder,
input[type="text"] {
  color: rgb(247, 247, 247);
  -webkit-text-stroke: 0.125px rgb(0, 0, 0);
}
.input :nth-child(2) {
  -webkit-text-security: disc;
}
button {
  margin-top: 10px;
  border-radius: 7px;
  background-color: rgba(133, 120, 207, 1);
  border: 0.125 solid white;
  box-shadow: 1px 2px #88888847;
  font-size: 20px;
  color: white;
  width: 250px;
  height: 36px;
  cursor: pointer;
}
.empty {
  opacity: 25%;
  cursor: default;
}
</style>
