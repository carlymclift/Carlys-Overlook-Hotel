import { expect } from 'chai';
import Hotel from '../src/Hotel.js'
import roomsSampleData from './testSampleData/room-sample.js';
import bookingsSampleData from './testSampleData/bookings-sample.js';

describe('Hotel', () => {
  let hotel

  beforeEach(() => {
    hotel = new Hotel()
  })

  it('Should be a function', () => {
    expect(Hotel).to.be.a('function');
  })

  it('Should be an instance of Hotel', () => {
    expect(hotel).to.be.an.instanceOf(Hotel)
  })

  it('Should hold on to data of the hotel', () => {
    expect(hotel.availableRooms).to.eql([]);
    expect(hotel.todaysRevenue).to.eql(0);
    expect(hotel.occupancy).to.eql(null);
    expect(hotel.rooms).to.eql(25);
  })

  it('Should be able to find all available rooms by date', () => {
    hotel.findAllAvailableRoomsByDate('2020/01/10', roomsSampleData, bookingsSampleData)
    expect(hotel.availableRooms).to.deep.eql([
      roomsSampleData[0],
      roomsSampleData[1],
      roomsSampleData[2],
      roomsSampleData[3],
      roomsSampleData[4],
      roomsSampleData[5],
      roomsSampleData[6],
      roomsSampleData[8],
      roomsSampleData[9],
      roomsSampleData[10],
      roomsSampleData[12],
      roomsSampleData[13],
      roomsSampleData[14],
      roomsSampleData[15],
      roomsSampleData[16],
      roomsSampleData[17],
      roomsSampleData[18],
      roomsSampleData[19],
      roomsSampleData[20],
      roomsSampleData[21],
      roomsSampleData[22],
      roomsSampleData[23],
    ])
  })

  it('Should require the correct arguments to find available rooms', () => {
    let badInvoke = hotel.findAllAvailableRoomsByDate('2020-01-10', roomsSampleData, bookingsSampleData)
    expect(badInvoke).to.eql('You must select a valid date to search')
  })

  it('Should be able to calculate the total revenue for todays date', () => {
    const rev = hotel.calculateTotalRevenueForDate('2020/01/10', roomsSampleData, bookingsSampleData)
    expect(hotel.todaysRevenue).to.eql('739.20')
    expect(rev).to.eql('739.20')
  })

  it('Should be able to find to percent of occupied rooms today', () => {
    const percent = hotel.findPercentOccupiedRoomsForDate('2020/01/10', bookingsSampleData)
    expect(hotel.occupancy).to.eql('12')
    expect(percent).to.eql('12')
  })
});