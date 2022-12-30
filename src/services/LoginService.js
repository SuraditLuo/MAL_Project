function login(username, password, users) {
  for (let index = 0; index < users.length; index++) {
    if (
      username == users[index].username &&
      password == users[index].password
    ) {
      return true;
    }
  }
}
export default {
  login,
};
