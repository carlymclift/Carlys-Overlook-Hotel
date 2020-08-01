// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import './css/_variables.scss';
// import './css/_mixins.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
// import './images/hotel.jpg'

console.log('This is the JavaScript entry file - your code begins here.');


import './css/base.scss';
import User from './User';
import Guest from './Guest';
import Manager from './Manager';
import Hotel from './Hotel';
import fetchData from './fetchAllData';
import DomUpdates from './DomUpdates';
// import guestsSampleData from '../test/testSampleData/guest-sample';
// import DomUpdates from './DomUpdates';

let manager, guest, user, domUpdate, hotel

window.onload = startUp();

document.getElementById('login-button').addEventListener('click', loadUserPage)
// document.getElementById('log-out-button').addEventListener('click', window.location.reload(false))
const username = document.getElementById('username-input')
const password = document.getElementById('password-input')
let loginPage = document.querySelector('.main-page')
let managerPage = document.getElementById('manager-sec')
let guestPage = document.getElementById('guest-sec')

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
    //   populatePage();
    })
    .catch((err) => console.log(err.message));
}

function instantiateClasses() {
  domUpdate = new DomUpdates()
}

function loadUserPage() {
  console.log(username.value)
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
  console.log(guest)
  getAllGuestInfo(currentUser, guest)
}

function getAllGuestInfo(currentUser, guest) {
    let guestBookings = guest.getAllGuestBookings(data.bookingsData)
    // console.log('b', guestBookings)
    let sortedBookings = guestBookings.sort((a, b) => new Date(b.date) - new Date(a.date))
    console.log('c', sortedBookings)
    guest.getTotalMoneyGuestHasSpent(data.bookingsData, data.roomsData)
    domUpdate.populateGuestPageWithInfo(guest, sortedBookings)
}