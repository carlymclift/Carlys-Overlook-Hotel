import User from './User.js'

class Guest extends User {
  constructor(userInfo) {
    super(`customer${userInfo.id}`, 'overlook2020') 
    this.id = userInfo.id
    this.name = userInfo.name
    this.firstName = this.getFirstName(); 
    this.bookings = []
    this.totalSpent = 0
  }

  getFirstName() {
    return this.name.split(' ')[0]
  }

  getAllGuestBookings(bookings) {
    bookings.filter(booking => {
      if (booking.userID === this.id) {
        this.bookings.push(booking)
      }
    })
    return this.bookings
  }

  getTotalMoneyGuestHasSpent(bookings, rooms) {
    let bookingsById = bookings.filter(booking => {
      return booking.userID === this.id
    })
    let moneySpent = rooms.reduce((counter, room) => {
      bookingsById.forEach(booking => {
        if (booking.roomNumber === room.number) {
          counter += room.costPerNight
        }
      })
      return counter
    }, 0)
    this.totalSpent += moneySpent
  }

  filterRoomsByType(rooms, type) {
    return rooms.filter(room => room.roomType === type)
  }
}

export default Guest


