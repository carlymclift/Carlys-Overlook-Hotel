class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  login(username, password) {
    if (username === 'manager' && password === "overlook2020") {
      return true
    } else if (username === this.username && password === "overlook2020") {
      return false
    } else {
      return 'The username or password is incorrect'
    }
  }
}

export default User;