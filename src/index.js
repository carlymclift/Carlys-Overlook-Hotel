import './css/base.scss';
import './css/_variables.scss';
import './css/base.scss';
import User from './User';
import Guest from './Guest';
import Manager from './Manager';
import Hotel from './Hotel';
import fetchData from './fetchAllData';
import DomUpdates from './DomUpdates';
import postBooking from './postBooking';
import deleteBooking from './deleteBooking';

let manager, guest, user, domUpdate, hotel



window.onload = startUp();

const managerRoomsArea = document.getElementById('available-rooms-manager-post')
const userRoomsArea = document.getElementById('available-rooms-cards')
document.getElementById('login-button').addEventListener('click', loadUserPage)
document.getElementById('search-users-button').addEventListener('click', findGuestByNameSearch)
document.getElementById('book-button').addEventListener('click', addBooking)
document.getElementById('delete-button').addEventListener('click', deleteUserBooking)
// document.getElementById('book-this-room-button').addEventListener('click', openBookingConfirmation)
document.querySelector('.date-search').addEventListener('click', () => getRoomsForSelectedDate('date-on-manager', managerRoomsArea))
document.querySelector('.search-button-user-page').addEventListener('click', () => getRoomsForSelectedDate('date-on-user', userRoomsArea))
document.querySelector('.filter-section').addEventListener('click', () => {
  getRoomsForSelectedDate('date-on-user', userRoomsArea);
  getCurrentCardsDisplayed();
})

// document.getElementById('book-this-room-button').addEventListener('click', openBookingConfirmation)
document.getElementById('available-rooms-cards').addEventListener('click', targetButtonAndID)
document.getElementById('pop-up-box').addEventListener('click', targetConfirmationButtons)

const username = document.getElementById('username-input')
const password = document.getElementById('password-input')
let loginPage = document.querySelector('.main-page')
let managerPage = document.getElementById('manager-sec')
let guestPage = document.getElementById('guest-sec')
const guestNameSearch = document.getElementById('search-input')
const popUpConfirmation = document.getElementById('pop-up-section')
const dateSelectedByUser = document.getElementById('date-on-user')
// selectRoomButton.addEventListener('click', openBookingConfirmation)

const data = {
  guestData: null,
  bookingsData: null,
  roomsData: null
};



function startUp() {
  fetchData()
    .then((allData) => {
      data.guestData = allData.guestData;
      data.bookingsData = allData.bookingsData;
      data.roomsData = allData.roomsData;
    })
    .then(() => {
      instantiateClasses();
    })
    .catch((err) => console.log(err.message));
}

function instantiateClasses() {
  domUpdate = new DomUpdates()
}

function findGuestByNameSearch() {
  let foundUser = manager.searchGuestsByName(guestNameSearch.value, data.guestData)
  guestNameSearch.value = ''
  guest = new Guest(foundUser, `customer${foundUser.id}`, 'overlook2020')

  let guestBookings = guest.getAllGuestBookings(data.bookingsData)
  let sortedBookings = guestBookings.sort((a, b) => new Date(b.date) - new Date(a.date))
  guest.getTotalMoneyGuestHasSpent(data.bookingsData, data.roomsData)
  domUpdate.displayUserSearchedFor(guest, sortedBookings, data.roomsData, data.guestData)

}

function loadUserPage() {
  user = new User(username.value, password.value)
  let loginCredentials = user.login(username.value, password.value)
  if (loginCredentials === true) {
    instantiateManagerInfo()
    loginPage.classList.add('hidden')
    managerPage.classList.remove('hidden')
  } else if (loginCredentials === false) {
    instantiateGuest(username.value, password.value)
    loginPage.classList.add('hidden')
    guestPage.classList.remove('hidden')
  } else {
    alert('Wrong username or password')
  }
}

function targetButtonAndID(event) {
  if (event.target.classList.contains('book-this-room-button')) {
    // console.log(event.target.classList.contains('book-this-room-button'))
    // console.log(Number(event.target.parentNode.dataset.id))
    openBookingConfirmation(event)
  }
}

function targetConfirmationButtons(event) {
  if (event.target.classList.contains('cancel-booking')) {
    popUpConfirmation.classList.add('hidden')
  }
  if (event.target.classList.contains('confirm-booking')) {
    addBookingByUser()
    popUpConfirmation.classList.add('hidden')
  }
}

function addBookingByUser() {
  let formattedDate = dateSelectedByUser.value.replace(/-/g, '/')
  let element = document.getElementById('number-element')
  let roomString = element.innerText.split('#')[1]

  let postObj = {
    "userID": guest.id,
    "date": formattedDate,
    "roomNumber": parseFloat(roomString)
  }
  postBooking(postObj)
}

function openBookingConfirmation(event) {
  let idNum = parseInt(event.target.parentNode.id)
  let roomMatchesNum = data.roomsData.find(room => room.number === idNum)
  console.log(roomMatchesNum)

  if (!dateSelectedByUser.value) {
    alert('Please select date to book')
  } else {
    popUpConfirmation.classList.remove('hidden')
    domUpdate.displayedConfirmation(roomMatchesNum, dateSelectedByUser.value)
  }
}

function instantiateManagerInfo() {
  hotel = new Hotel()
  manager = new Manager(username.value, password.value)
  hotel.findAllAvailableRoomsByDate('2020/01/10', data.roomsData, data.bookingsData)
  hotel.calculateTotalRevenueForDate('2020/01/10', data.roomsData, data.bookingsData)
  hotel.findPercentOccupiedRoomsForDate('2020/01/10', data.bookingsData)
  console.log(hotel)
  let avRooms = hotel.availableRooms
  domUpdate.populateAvailableRoomsForBooking(avRooms)
  domUpdate.populateManagerPageInfo(hotel, data.guestData)
}

function instantiateGuest(username, password) {
  let userID = username.split('r')[1]
  const num = parseInt(userID)
  const currentUser = data.guestData.find(guest => guest.id === num)
  console.log(currentUser)
  guest = new Guest(currentUser, username, password)
  hotel = new Hotel()
  console.log(guest)
  getAllGuestInfo(guest)
}

function getAllGuestInfo(guest) {
  let guestBookings = guest.getAllGuestBookings(data.bookingsData)
  // console.log('b', guestBookings)
  let sortedBookings = guestBookings.sort((a, b) => new Date(a.date) - new Date(b.date))
  console.log('c', sortedBookings)
  guest.getTotalMoneyGuestHasSpent(data.bookingsData, data.roomsData)
  domUpdate.populateGuestPageWithInfo(guest, data.roomsData)

  let availRooms = hotel.findAllAvailableRoomsByDate('2020/01/10', data.roomsData, data.bookingsData)
  domUpdate.displayRooms(availRooms)
  // document.getElementById('book-this-room-button').addEventListener('click', openBookingConfirmation)
  // document.querySelectorAll('.book-this-room-button').addEventListener('click', openBookingConfirmation)
  // document.querySelector('room-card').addEventListener('click', openBookingConfirmation)

}

function addBooking() {
  let selectedDate = document.getElementById('date-on-manager').value || '1994/10/01'
  selectedDate = selectedDate.replace(/-/g, '/')
  const userID = document.getElementById('user-id').value
  const roomNum = document.getElementById('room-number').value
  let postObj = {
    "userID": parseFloat(userID),
    "date": selectedDate,
    "roomNumber": parseFloat(roomNum)
  }
  console.log(postObj)
  postBooking(postObj)
}

function deleteUserBooking() {
  const idInput = document.getElementById('booking-num-id').value
  let deleteObj = {
    'id': parseFloat(idInput)
  }
  deleteBooking(deleteObj)
}

function getCurrentCardsDisplayed() {
  let roomElements = document.getElementsByClassName('room-card')
  let values = Object.values(roomElements)
  let numbersOfCards = values.map(item => parseInt(item.id))

  let currentlyDisplayedRoomsToFilter = numbersOfCards.map(num => {
    let roomsFound = data.roomsData.find(room => {
      if (num === room.number) {
        return room
      }
    })
    return roomsFound
  })
  filterButtonConditionals(currentlyDisplayedRoomsToFilter)
}

  function filterButtonConditionals(displayedCards) {
  if (event.target.classList.contains('suite')) {
    let roomsToDisplay = guest.filterRoomsByType(displayedCards, 'suite')
    getRoomsForSelectedDate('date-on-user', userRoomsArea)
    domUpdate.displayRooms(roomsToDisplay)
  }
  if (event.target.classList.contains('single')) {
    let roomsToDisplay = guest.filterRoomsByType(displayedCards, 'single room')
    domUpdate.displayRooms(roomsToDisplay)
  }
  if (event.target.classList.contains('residential')) {
    let roomsToDisplay = guest.filterRoomsByType(displayedCards, 'residential suite')
    domUpdate.displayRooms(roomsToDisplay)
  }
  if (event.target.classList.contains('junior')) {
    let roomsToDisplay = guest.filterRoomsByType(displayedCards, 'junior suite')
    domUpdate.displayRooms(roomsToDisplay)
  }
  document.querySelectorAll('.book-this-room-button').addEventListener('click', openBookingConfirmation)

}

function getRoomsForSelectedDate(elementID, secID) {
  let selectedDate = document.getElementById(elementID).value

  if (!selectedDate) {
    alert('Please select date to see the rooms available.')
  } else {
    selectedDate = selectedDate.replace(/-/g, '/')
    let allAvRooms = hotel.findAllAvailableRoomsByDate(selectedDate, data.roomsData, data.bookingsData)
    let noDuplicates = [...new Set(allAvRooms)]

    if (secID === userRoomsArea) {
      console.log(noDuplicates)
      domUpdate.displayRooms(noDuplicates)
    } else {
      domUpdate.populateAvailableRoomsForBooking(noDuplicates)
    }
  }

}

