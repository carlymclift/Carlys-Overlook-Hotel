import { expect } from 'chai';
import User from '../src/User.js';

describe('User', () => {
  let user, user2

  beforeEach(() => {
    user = new User('manager', 'overlook2020')
    user2 = new User('customer7', 'overlook2020')
  })

  it('Should be a function', () => {
    expect(User).to.be.a('function');
  })

  it('Should be an instance of Manager', () => {
    expect(user).to.be.an.instanceOf(User)
  })

  it('Should not require an argument to create a new user', () => {
    expect(() => {
      new User()
    }).to.not.throw(Error);
  })

  it('Should be undefined if no arguement is given for the user', () => {
    const noUser = new User()
    expect(noUser.data).to.eql(undefined);
  });

  it('Should hold on to data from the user', () => {
    expect(user.username).to.eql('manager');
    expect(user.password).to.eql('overlook2020');
  })

  it('Should be able to login as a any type of user', () => {
    expect(user.login('manager', 'overlook2020')).to.equal(true)
    expect(user.login('manager', 'overlook20')).to.equal('The username or password is incorrect')

    expect(user2.login('customer7', 'overlook2020')).to.equal(false)
    expect(user2.login('customer7', 'overlk20')).to.equal('The username or password is incorrect')
    expect(user2.login()).to.equal('The username or password is incorrect')
    expect(user2.login(4, true)).to.equal('The username or password is incorrect')
  })
});