import User from './User.js'

class Manager extends User {
  constructor(username, password) {
    super(username, password) 
  }

  findGuestsByName() {
      
  }
}

export default Manager