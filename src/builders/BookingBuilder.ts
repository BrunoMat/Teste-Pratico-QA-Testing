import { faker } from '@faker-js/faker';
import { Booking } from '../schemas/BookingSchema';

export class BookingBuilder {
  private booking: Booking;

  constructor() {
    this.booking = {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      totalprice: faker.number.int({ min: 50, max: 1000 }),
      depositpaid: faker.datatype.boolean(),
      bookingdates: {
        checkin: faker.date.soon({ days: 5 }).toISOString().split('T')[0],
        checkout: faker.date.soon({ days: 10 }).toISOString().split('T')[0],
      },
      additionalneeds: faker.helpers.arrayElement(['Breakfast', 'Late Checkout', 'None']),
    };
  }

  withFirstname(firstname: string): this {
    this.booking.firstname = firstname;
    return this;
  }

  withTotalPrice(price: number): this {
    this.booking.totalprice = price;
    return this;
  }

  build(): Booking {
    return this.booking;
  }
}
