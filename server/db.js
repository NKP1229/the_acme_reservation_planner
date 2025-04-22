const { client } = require("./common");

const createTables = async () => {
  try {
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
  } catch (error) {
    console.error(error);
  }
};
const createCustomer = async (name) => {
  try {
    const SQL = `
        INSERT INTO customer(name) VALUES($1) RETURNING *
    `;
    response = await client.query(SQL, [name]);
    return response.rows;
  } catch (error) {
    console.error(error);
  }
};
const createRestaurant = async (name) => {
  try {
    const SQL = `
        INSERT INTO restaurant(name) VALUES($1) RETURNING *
    `;
    response = await client.query(SQL, [name]);
    return response.rows;
  } catch (error) {
    console.error(error);
  }
};
const fetchCustomers = async () => {
  try {
    const SQL = `
        SELECT * from customer 
    `;
    const response = await client.query(SQL);
    return response.rows;
  } catch (error) {
    console.error(error);
  }
};
const fetchRestaurants = async () => {
  try {
    const SQL = `
        SELECT * from restaurant
    `;
    const response = await client.query(SQL);
    return response.rows;
  } catch (error) {
    console.error(error);
  }
};
const createReservation = async (
  date,
  party_count,
  restaurant_id,
  customer_id
) => {
  try {
    const SQL = `
        INSERT INTO reservation(date, party_count, restaurant_id, customer_id) VALUES($1, $2, $3, $4) RETURNING *
    `;
    response = await client.query(SQL, [
      date,
      party_count,
      restaurant_id,
      customer_id,
    ]);
    return response.rows;
  } catch (error) {
    console.error(error);
  }
};
const destroyReservation = async (id, customer_id) => {
  try {
    const SQL = `
        DELETE FROM reservation 
        WHERE id = $1 
        AND customer_id = (SELECT id FROM customer WHERE name = $2)
    `;
    const response = await client.query(SQL, [id, customer_id]);
    return response.rows;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createTables,
  createCustomer,
  createRestaurant,
  fetchCustomers,
  fetchRestaurants,
  createReservation,
  destroyReservation,
};
