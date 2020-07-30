import User from './User.js'

class Manager extends User {
  constructor() {
    super('manager', 'overlook2020') 
  }

  searchGuestsByName(input, users) {
    return users.find(user => {
      if ((user.name.toLowerCase()).includes(input.toLowerCase())) {
        return user
      }
    })
  }
}

export default Manager