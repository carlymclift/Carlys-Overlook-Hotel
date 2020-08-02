class DomUpdates {

    // changeInnerTextID(id, text) {
    //     document.getElementById(id).innerText = text;
    //   }

  populateGuestPageWithInfo(currentUser, rooms) {
    // this.changeInnerTextID('greet-on-guest-page', `Hello, ${currentUser.firstName}!`);
    document.getElementById('greet-on-guest-page')
      .innerText = `Hello, ${currentUser.firstName}!`

    document.getElementById('amount-spent')
      .innerText = `You've spent $${currentUser.totalSpent.toFixed(2)}`

    currentUser.bookings.forEach(booking => {
      let matchedRoom = rooms.find(room => room.number === booking.roomNumber)
      document.getElementById('booking-list')
        .insertAdjacentHTML('afterBegin', `
            <div class="booking-card">
            <p>On ${booking.date}</p>
            <p>Room Number: ${booking.roomNumber}</p>
            <p>Cost: $${matchedRoom.costPerNight}</p>
            </div>`)
    })
  }

  populateManagerPageInfo(hotel, guests) {
    document.getElementById('rooms-available')
      .innerText = `${hotel.availableRooms.length}`

    document.getElementById('total-revenue')
      .innerText = `$${hotel.todaysRevenue}`

    document.getElementById('occupancy')
      .innerText = `${hotel.occupancy}%`

    let alphabetizedNames = guests.map(guest => guest.name).sort().reverse()
    // let alphabetizedNames = guestNames.sort().reverse()
    alphabetizedNames.forEach(name => {
      document.getElementById('users')
        .insertAdjacentHTML('afterbegin', `
              <p>${name}</p><hr>`)
    })
  } 

  displayUserSearchedFor(searchedUser, searchedUserBookings, rooms) {
    let userArea = document.getElementById('users')
    userArea.innerHTML = ""
    userArea.insertAdjacentHTML('afterBegin', `
        <h3>${searchedUser.name}</h3>
        <p>Total spent: $${searchedUser.totalSpent.toFixed(2)}</p>
        <p>Number of stays: ${searchedUserBookings.length}</p>
        <p>Most recent stay: ${searchedUserBookings[0].date}<br>
        in room number ${searchedUserBookings[0].roomNumber}</p>
        <h3>Stay history:</h3>`)
    this.displaySearchedUsersBookings(userArea, searchedUserBookings, rooms)
  }

  displaySearchedUsersBookings(element, bookings, rooms) {
    bookings.forEach(booking => {
      let matchedRoom = rooms.find(room => room.number === booking.roomNumber)
      element.insertAdjacentHTML('beforeEnd', `
        <div class="booking-card-manager">
            <p>On ${booking.date}</p>
            <p>Room Number: ${booking.roomNumber}</p>
            <p>Cost: $${matchedRoom.costPerNight}</p>
            </div>`)
    })
  }

  displayRooms(rooms) {
    let orderedRooms = rooms.reverse()
    orderedRooms.forEach(room => {
      document.getElementById('available-rooms-cards')
        .insertAdjacentHTML('afterbegin', `
        <div class="room-card">
            <p>Room #${room.number}</p>
            <p>${room.roomType}</p>
            <p>${room.numBeds} ${room.bedSize}</p>
            <p>Cost/night: $${room.costPerNight}</p>
        </div>`)  
    })
  }

 
}

export default DomUpdates