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
import moment from 'moment';

const managerRoomsArea = document.getElementById('available-rooms-manager-post')
const userRoomsArea = document.getElementById('available-rooms-cards')
const username = document.getElementById('username-input')
const password = document.getElementById('password-input')
const loginPage = document.querySelector('.main-page')
const managerPage = document.getElementById('manager-sec')
const guestPage = document.getElementById('guest-sec')
const guestNameSearch = document.getElementById('search-input')
const popUpConfirmation = document.getElementById('pop-up-section')
const dateSelectedByUser = document.getElementById('date-on-user')
const dateSelectedByManager = document.getElementById('date-on-manager')
const currentDate = moment().format('YYYY/MM/DD')
let manager, guest, user, domUpdate, hotel
const data = {
  guestData: null,
  bookingsData: null,
  roomsData: null
};

document.getElementById('login-button')
  .addEventListener('click', loadUserPage)
document.getElementById('search-users-button')
  .addEventListener('click', findGuestByNameSearch)
document.getElementById('book-button')
  .addEventListener('click', addBooking)
document.getElementById('delete-button')
  .addEventListener('click', deleteUserBooking)
document.querySelector('.date-search')
  .addEventListener('click', () => getRoomsForSelectedDate('date-on-manager', managerRoomsArea))
document.querySelector('.search-button-user-page')
  .addEventListener('click', () => getRoomsForSelectedDate('date-on-user', userRoomsArea))
document.getElementById('available-rooms-cards')
  .addEventListener('click', targetButtonAndID)
document.getElementById('pop-up-box')
  .addEventListener('click', targetConfirmationButtons)
document.querySelector('.filter-section')
  .addEventListener('click', () => {
    getRoomsForSelectedDate('date-on-user', userRoomsArea);
    getCurrentCardsDisplayed();
  })

window.onload = startUp;

function startUp() {
  fetchData()
    .then((allData) => {
      data.guestData = allData.guestData;
      data.bookingsData = allData.bookingsData;
      data.roomsData = allData.roomsData;
    })
    .then(() => {
      instantiateClasses()
      setCalenderLimits()
    })
    .catch((err) => console.log(err.message));
}

function instantiateClasses() {
  domUpdate = new DomUpdates()
}

function setCalenderLimits() {
  let reformattedDate = currentDate.replace(/\//g, '-')
  dateSelectedByManager.min = reformattedDate
  dateSelectedByUser.min = reformattedDate
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

function instantiateManagerInfo() {
  hotel = new Hotel()
  manager = new Manager(username.value, password.value)
  hotel.findAllAvailableRoomsByDate(currentDate, data.roomsData, data.bookingsData)
  hotel.calculateTotalRevenueForDate(currentDate, data.roomsData, data.bookingsData)
  hotel.findPercentOccupiedRoomsForDate(currentDate, data.bookingsData)
  let avRooms = hotel.availableRooms
  domUpdate.populateAvailableRoomsForBooking(avRooms)
  domUpdate.populateManagerPageInfo(hotel, data.guestData)
}

function instantiateGuest(username, password) {
  let userID = username.split('r')[1]
  const num = parseInt(userID)
  const currentUser = data.guestData.find(guest => guest.id === num)
  guest = new Guest(currentUser, username, password)
  hotel = new Hotel()
  getAllGuestInfo(guest)
}

function getAllGuestInfo(guest) {
  guest.getAllGuestBookings(data.bookingsData)
  guest.getTotalMoneyGuestHasSpent(data.bookingsData, data.roomsData)
  domUpdate.populateGuestPageWithInfo(guest, data.roomsData)
  let availRooms = hotel.findAllAvailableRoomsByDate(currentDate, data.roomsData, data.bookingsData)
  domUpdate.displayRooms(availRooms)
}

function targetButtonAndID(event) {
  if (event.target.classList.contains('book-this-room-button')) {
    openBookingConfirmation(event)
  }
}

function openBookingConfirmation(event) {
  let idNum = parseInt(event.target.parentNode.id)
  let roomMatchesNum = data.roomsData.find(room => room.number === idNum)
  if (!dateSelectedByUser.value) {
    alert('Please select date to book')
  } else {
    popUpConfirmation.classList.remove('hidden')
    domUpdate.displayedConfirmation(roomMatchesNum, dateSelectedByUser.value)
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
  postBooking(postObj)
}

function deleteUserBooking() {
  const idInput = document.getElementById('booking-num-id').value
  let deleteObj = {
    'id': parseFloat(idInput)
  }
  deleteBooking(deleteObj)
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
      domUpdate.displayRooms(noDuplicates)
    } else {
      domUpdate.populateAvailableRoomsForBooking(noDuplicates)
    }
  }
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
}