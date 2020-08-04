const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);
import { expect } from 'chai';
import DomUpdates from '../src/DomUpdates';
import Hotel from '../src/Hotel';
import guestsSampleData from './testSampleData/guest-sample.js';

describe('DomUpdates', () => {
  let domUpdate,
    currentUser, 
    matchedRoom, 
    mostRecentDate, 
    rooms, 
    hotel, 
    element

  before(() => {

    hotel = new Hotel()

    currentUser = {
      username: "customer1", 
      password: "overlook2020", 
      id: 1, 
      name: "Leatha Ullrich", 
      firstName: "Leatha",
      totalSpent: 11567.42,
      bookings: [{
        id: "5fwrgu4i7k55hl6sz",
        userID: 9,
        date: "2020/04/22",
        roomNumber: 15,
        roomServiceCharges: []
      },
      {
        id: "5fwrgu4i7k55hl6t5",
        userID: 43,
        date: "2020/01/24",
        roomNumber: 24,
        roomServiceCharges: []
      }]
    }

    rooms = [{
      number: 15,
      roomType: "residential suite",
      bidet: true,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 358.4
    },
    {
      number: 24,
      roomType: "suite",
      bidet: false,
      bedSize: "full",
      numBeds: 2,
      costPerNight: 477.38
    }]

    matchedRoom = {
      number: 1,
      roomType: "residential suite",
      bidet: true,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 358.4
    }

    mostRecentDate = '2019/06/15';    
  });

  beforeEach(() => {
    domUpdate = new DomUpdates();
    global.document = {};
    chai.spy.on(document, ['getElementById'], () => {
      return { innerText: '', insertAdjacentHTML: () => {
        { return }
      }, addEventListener: () => {
        { return }
      } }
    });
  });

  it('Should be a function', () => {
    expect(DomUpdates).to.be.a('function');
  });

  it('Should be an instance of a DomUpdates', () => {
    expect(domUpdate).to.be.an.instanceOf(DomUpdates);
  });

  it('Should call getElementByID with the correct arguments and times', () => {
    domUpdate.populateGuestPageWithInfo(currentUser, rooms);
    expect(document.getElementById).to.have.been.called.with('greet-on-guest-page');
    expect(document.getElementById).to.have.been.called.with('amount-spent');
    expect(document.getElementById).to.have.been.called.with('booking-list');
    expect(document.getElementById).to.have.been.called(4);
  });

  it('Should call getElementByID with the correct arguments and times', () => {
    domUpdate.populateManagerPageInfo(hotel, guestsSampleData)

    expect(document.getElementById).to.have.been.called.with('rooms-available');
    expect(document.getElementById).to.have.been.called.with('total-revenue');
    expect(document.getElementById).to.have.been.called.with('occupancy');
    expect(document.getElementById).to.have.been.called(53);
  });

  it('Should call getElementByID with the correct arguments and times', () => {
    domUpdate.populateEachGuestIntoGuestSection(guestsSampleData)

    expect(document.getElementById).to.have.been.called.with('users');
    expect(document.getElementById).to.have.been.called(50);
  });

  it('Should call getElementByID with the correct arguments and times', () => {
    domUpdate.displayUserSearchedFor(currentUser, currentUser.bookings, rooms, guestsSampleData)

    expect(document.getElementById).to.have.been.called.with('users');
    expect(document.getElementById).to.have.been.called.with('back-button');
    expect(document.getElementById).to.have.been.called(2);
  });

  it('Should call getElementByID with the correct argument and times', () => {
    domUpdate.populateAvailableRoomsForBooking(rooms)

    expect(document.getElementById).to.have.been.called.with('available-rooms-manager-post');
    expect(document.getElementById).to.have.been.called(1);
  });

  it('Should call getElementByID the correct amount of times', () => {
    element = document.getElementById('this-element')
    domUpdate.displaySearchedUsersBookings(element, currentUser.bookings, rooms)

    expect(document.getElementById).to.have.been.called(1);
  });

  it('Should call getElementByID with the correct arguments and times', () => {
    domUpdate.displayRooms(rooms)

    expect(document.getElementById).to.have.been.called.with('available-rooms-cards');
    expect(document.getElementById).to.have.been.called(1);
  });

  it('Should call getElementByID with the correct arguments and times', () => {
    domUpdate.displayedConfirmation(matchedRoom, mostRecentDate)

    expect(document.getElementById).to.have.been.called.with('pop-up-box');
    expect(document.getElementById).to.have.been.called(1);
  });
})