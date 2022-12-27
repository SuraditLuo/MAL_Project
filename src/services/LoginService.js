function login(username, password, users) {
  console.log(username, password);
  console.log(users);
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
