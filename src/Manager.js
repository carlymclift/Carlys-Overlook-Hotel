import User from './User.js'

class Manager extends User {
  constructor() {
    super('manager', 'overlook2020') 
  }

  searchGuestsByName(input, users) {
    if (typeof input !== 'string') {
      return 'please search a name'
    } else { 
      return users.find(user => {
        if ((user.name.toLowerCase()).includes(input.toLowerCase())) {
          return user
        }
      })
    }
  }
}

export default Manager