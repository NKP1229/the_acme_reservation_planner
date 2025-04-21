const { client } = require("./common");

const createTables = async () => {
  try {
    await client.connect();
    const SQL = `
            DROP TABLE IF EXISTS Customer CASCADE;
            CREATE TABLE Customer(
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name VARCHAR(100)
            );
            DROP TABLE IF EXISTS Restaurant CASCADE;
            CREATE TABLE Restaurant(
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name VARCHAR(100)
            );
            DROP TABLE IF EXISTS Reservation CASCADE;
            CREATE TABLE Reservation(
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                date DATE NOT NULL,
                party_count INTEGER NOT NULL,
                restaurant_id UUID REFERENCES Restaurant(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
                customer_id UUID REFERENCES Customer(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL
            );
        `;
    await client.query(SQL);
    console.log("We have seeded our db");
    await client.end();
  } catch (error) {
    console.error(error);
  }
};
const createCustomer = async () => {};
const createRestaurant = async () => {};
const fetchCustomers = async () => {};
const fetchRestaurants = async () => {};
const createReservation = async () => {};
const destroyReservation = async () => {};

module.exports = {
  createTables,
  createCustomer,
  createRestaurant,
  fetchCustomers,
  fetchRestaurants,
  createReservation,
  destroyReservation,
};
