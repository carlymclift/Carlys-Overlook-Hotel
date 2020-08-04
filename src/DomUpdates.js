class DomUpdates {

  populateGuestPageWithInfo(currentUser, rooms) {
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

    this.populateEachGuestIntoGuestSection(guests)
  } 

  populateEachGuestIntoGuestSection(guests) {
    guests.forEach(guest => {
      document.getElementById('users')
        .insertAdjacentHTML('afterBegin', `
        <p>${guest.name}</p>
        <p>user id #: ${guest.id}<hr>`)
    })
  }

  displayUserSearchedFor(searchedUser, searchedUserBookings, rooms, guests) {
    let userArea = document.getElementById('users')
    userArea.innerHTML = ""
    userArea.insertAdjacentHTML('afterBegin', `
    <button id="back-button">&#11013back</button>
    <h3>${searchedUser.name}</h3>
    <p>user id #: ${searchedUser.id}</p>
    <p>Total spent: $${searchedUser.totalSpent.toFixed(2)}</p>
    <p>Number of stays: ${searchedUserBookings.length}</p>
    <p>Most recent booking: ${searchedUserBookings[0].date}<br>
    in room number ${searchedUserBookings[0].roomNumber}</p>
    <h3>Stay history:</h3>`)

    this.displaySearchedUsersBookings(userArea, searchedUserBookings, rooms)  
    document.getElementById('back-button')
      .addEventListener('click', () => this.populateEachGuestIntoGuestSection(guests))
  }

  populateAvailableRoomsForBooking(rooms) {
    let roomArea = document.getElementById('available-rooms-manager-post')
    roomArea.innerHTML = ""
    rooms.forEach(room => {
      roomArea.innerHTML += `
      <div class="av-rooms-post-card" id=${room.number}>
      <p>Room #${room.number}<br>${room.numBeds} beds<br>$${room.costPerNight}/night</p>
      </div>
      `
    })
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
    let roomArea = document.getElementById('available-rooms-cards')
    roomArea.innerHTML = ""
    orderedRooms.forEach(room => {
      roomArea.innerHTML += `
        <div class="room-card" id=${room.number}>
            <p>Room #${room.number}</p>
            <p>${room.roomType}</p>
            <p>${room.numBeds} ${room.bedSize}</p>
            <p>Cost/night: $${room.costPerNight}</p>
            <button class="book-this-room-button">Book Room</button>
        </div>`  
    })
  }

  displayedConfirmation(room, date) {
    let confirmInfo = document.getElementById('pop-up-box')
    confirmInfo.innerHTML = ""
    confirmInfo.innerHTML += `
        <h2>Confirm your booking</h2>
        <div class="confirm-elements">
        <p>Reservation date: ${date}</p>
        <p id="number-element">You'll be staying in room #${room.number}</p>
        <p>${room.roomType}</p>
        <p>The cost per night is $${room.costPerNight}</p>
        </div>
        <button id="cancel-booking" class="cancel-booking">Cancel</button>
        <button id="confirm-booking" class="confirm-booking">Confirm</button>`
  }
}

export default DomUpdates