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

document.getElementById('login-button').addEventListener('click', loadUserPage)
document.getElementById('search-users-button').addEventListener('click', findGuestByNameSearch)
document.getElementById('book-button').addEventListener('click', addBooking)
document.getElementById('delete-button').addEventListener('click', deleteUserBooking)
const username = document.getElementById('username-input')
const password = document.getElementById('password-input')
let loginPage = document.querySelector('.main-page')
let managerPage = document.getElementById('manager-sec')
let guestPage = document.getElementById('guest-sec')
const guestNameSearch = document.getElementById('search-input')

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
  console.log(guestNameSearch.value)
  let foundUser = manager.searchGuestsByName(guestNameSearch.value, data.guestData)
  console.log(foundUser)
  guest = new Guest(foundUser, `customer${foundUser.id}`, 'overlook2020')
  console.log(guest)
  let guestBookings = guest.getAllGuestBookings(data.bookingsData)
  let sortedBookings = guestBookings.sort((a, b) => new Date(b.date) - new Date(a.date))
  guest.getTotalMoneyGuestHasSpent(data.bookingsData, data.roomsData)
  domUpdate.displayUserSearchedFor(guest, sortedBookings, data.roomsData)
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
  hotel.findAllAvailableRoomsByDate('2020/01/10', data.roomsData, data.bookingsData)
  hotel.calculateTotalRevenueForDate('2020/01/10', data.roomsData, data.bookingsData)
  hotel.findPercentOccupiedRoomsForDate('2020/01/10', data.bookingsData)
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
  getAllGuestInfo(currentUser, guest)
}

function getAllGuestInfo(currentUser, guest) {
  let guestBookings = guest.getAllGuestBookings(data.bookingsData)
  // console.log('b', guestBookings)
  let sortedBookings = guestBookings.sort((a, b) => new Date(a.date) - new Date(b.date))
  console.log('c', sortedBookings)
  guest.getTotalMoneyGuestHasSpent(data.bookingsData, data.roomsData)
  domUpdate.populateGuestPageWithInfo(guest, data.roomsData)
  domUpdate.displayRooms(data.roomsData)
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