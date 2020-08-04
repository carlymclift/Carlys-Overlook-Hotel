class Hotel {
  constructor() {
    this.availableRooms = []
    this.todaysRevenue = 0
    this.occupancy = null
    this.rooms = 25
  }

  findAllAvailableRoomsByDate(date, rooms, bookings) {
    if (date === '' || date.includes('-')) {
      return 'You must select a valid date to search'
    }
    const bookingsOnDate = bookings.filter(booking => booking.date === date)
    const unavailableRooms = bookingsOnDate.map(booking => booking.roomNumber)
    let avRooms = rooms.filter(room => {
      if (!unavailableRooms.includes(room.number)) {
        this.availableRooms.push(room)
        return true
      }
    })
    return avRooms
  }

  calculateTotalRevenueForDate(date, rooms, bookings) {
    const bookingsOnDate = bookings.filter(booking => booking.date === date) || undefined
    const todaysRevenue = bookingsOnDate.reduce((counter, booking) => {
      rooms.forEach(room => {
        if (room.number === booking.roomNumber) {
          counter += room.costPerNight
        }
      })
      return counter
    }, 0)
    this.todaysRevenue = todaysRevenue.toFixed(2)
    return todaysRevenue.toFixed(2)
  }

  findPercentOccupiedRoomsForDate(date, bookings) {
    const bookingsOnDate = bookings.filter(booking => booking.date === date).length
    const percent = ((bookingsOnDate / this.rooms) * 100)
    this.occupancy = percent
    return percent
  }
}

export default Hotel;