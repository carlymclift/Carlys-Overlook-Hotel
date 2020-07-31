import { expect } from 'chai';
import User from '../src/User.js';
import Manager from '../src/Manager.js';
import guestsSampleData from './testSampleData/guest-sample.js';

describe('Manager', () => {
  let manager

  beforeEach(() => {
    manager = new Manager('manager', 'overlook2020')
  })

  it('Should be a function', () => {
    expect(Manager).to.be.a('function');
  })

  it('Should be an instance of Manager', () => {
    expect(manager).to.be.an.instanceOf(Manager)
  })

  it('Should be a sub-class of the User class', () => {
    expect(manager).to.be.an.instanceOf(User);
  })

  it('Should hold on to data from the user', () => {
    expect(manager.username).to.eql('manager');
    expect(manager.password).to.eql('overlook2020');
  })

  it('Should be able to login as a manager', () => {
    expect(manager.login('manager', 'overlook2020')).to.equal(true)
    expect(manager.login('manager', 'overlook20')).to.equal('The username or password is incorrect')
  })

  it('Should be able to find guests by searching their name without case sensitivity', () => {
    let searchedUser = manager.searchGuestsByName('kenNeDi', guestsSampleData)
    expect(searchedUser).to.deep.eql({
      "id": 4,
      "name": "Kennedi Emard"
    })
  })
});