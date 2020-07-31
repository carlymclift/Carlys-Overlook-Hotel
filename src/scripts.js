// import './css/base.scss';
// import User from './User';
// import Guest from './Guest';
// import Manager from './Manager';
// import Hotel from './Hotel';
// import fetchData from './fetchAllData';
// import DomUpdates from './DomUpdates';


// const data = {
//     guestData: null,
//     bookingsData: null,
//     roomsData: null
// };

// const startUp = () => {
//     fetchData()
//     .then((allData) => {
//         data.guestData = allData.userData;
//         data.bookingsData = allData.sleepData;
//         data.roomsData = allData.activityData;
//     })
//     .catch((err) => console.log(err.message));
// }


// const loadUserPage = () => {
//     console.log(username)
//     let user = new User(username, password)
//     let loginCredentials = user.login(username, password)
//     if (loginCredentials === true) {
//         loginPage.classList.add('.hidden')
//     }
// }

// window.onload = startUp();

// document.getElementById('login-button').addEventListener('click', loadUserPage)
// let username = document.getElementById('username-input').value
// let password = document.getElementById('password-input').value
// let loginPage = document.querySelector('.main-page')
