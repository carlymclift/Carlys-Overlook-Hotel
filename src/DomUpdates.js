class DomUpdates {

    // changeInnerTextID(id, text) {
    //     document.getElementById(id).innerText = text;
    //   }

  populateGuestPageWithInfo(currentUser) {
    // this.changeInnerTextID('greet-on-guest-page', `Hello, ${currentUser.firstName}!`);
    document.getElementById('greet-on-guest-page')
      .innerText = `Hello, ${currentUser.firstName}!`

    document.getElementById('amount-spent')
      .innerText = `You've spent $${currentUser.totalSpent.toFixed(2)}`

    currentUser.bookings.forEach(booking => {
      document.getElementById('booking-list')
        .insertAdjacentHTML('afterBegin', `
            <div class="booking-card">
            <p>On ${booking.date}</p>
            <p>Room Number: ${booking.roomNumber}</p>
            <p>Service Charges: ${booking.roomServiceCharges.length}</p>
            </div>`)
    })
  }
  
}

export default DomUpdates