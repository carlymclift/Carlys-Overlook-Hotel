import { expect } from 'chai';
import User from '../src/User.js';
import Guest from '../src/Guest.js';
import guestsSampleData from './testSampleData/guest-sample';
import bookingsSampleData from './testSampleData/bookings-sample';
import roomsSampleData from './testSampleData/room-sample.js';

describe('Guest', () => {
  let guest;

  beforeEach(() => {
    guest = new Guest(guestsSampleData[0], 'customer1', 'overlook2020')
  })

  it('Should be a function', () => {
    expect(Guest).to.be.a('function');
  })

  it('Should be an instance of Guest', () => {
    expect(guest).to.be.an.instanceOf(Guest)
  })

  it('Should be a sub-class of the User class', () => {
    expect(guest).to.be.an.instanceOf(User);
  })

  it('Should hold on to data from the user', () => {
    expect(guest.username).to.eql('customer1');
    expect(guest.password).to.eql('overlook2020');
    expect(guest.id).to.eql(1);
    expect(guest.name).to.eql('Leatha Ullrich');
    expect(guest.firstName).to.eql('Leatha')
    expect(guest.bookings).to.deep.eql([]);
    expect(guest.totalSpent).to.eql(172.09);
  })

//   it('Should be able to login as a traveler', () => {
//     expect(traveler.logIn('traveler7', 'travel2020')).to.equal('Hello Emmet Sandham!')
//   })

  it('Should be able to calculate total money spent at Overlook', () => {
    let userMoneySpent = guest.getTotalMoneyUserHasSpent(bookingsSampleData, roomsSampleData)
    expect(userMoneySpent).to.eql(172.09)
  })

  it('Should get the first name of the guest', () => {
    let userFirstName = guest.getFirstName()
    expect(userFirstName).to.eql('Leatha')
  })

// [bookingsSampleData[4]], 172.09
});