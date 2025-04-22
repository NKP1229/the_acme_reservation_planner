const { client } = require("./common");
const express = require("express");
const app = express();
const PORT = 3000;
app.use(require("morgan")("dev"));
const cors = require("cors");
app.use(cors({ origin: `http://localhost:${PORT}` }));
app.use(express.json());
const {
  createTables,
  createCustomer,
  createRestaurant,
  fetchCustomers,
  fetchRestaurants,
  fetchReservations,
  createReservation,
  destroyReservation,
} = require("./db");

app.listen(PORT, () => {
  console.log(`I am listening on port number ${PORT}`);
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "This works" });
});

app.put("/resetTables", async (req, res, next) => {
  try {
    await createTables();
    res.status(200).json({ message: "Tables have been reset successfully." });
  } catch (error) {
    next(error);
    console.error("Error resetting tables:", error); // Log the error on the server side
    res
      .status(500)
      .json({ message: "Failed to reset tables", error: error.message });
  }
});
app.post("/api/newCustomer", async (req, res, next) => {
  try {
    const { name } = req.body;
    const response = await createCustomer(name);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});
app.post("/api/newRestaurant", async (req, res, next) => {
  try {
    const { name } = req.body;
    const response = await createRestaurant(name);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});
app.get("/api/customers", async (req, res, next) => {
  try {
    const response = await fetchCustomers();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});
app.get("/api/restaurants", async (req, res, next) => {
  try {
    const response = await fetchRestaurants();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});
app.get("/api/reservations", async (req, res, next) => {
  try {
    const response = await fetchReservations();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});
app.post("/api/customers/:customer_id/reservations", async (req, res, next) => {
  try {
    const { date, party_count, restaurant_id } = req.body;
    const { customer_id } = req.params;
    console.log(date, party_count, restaurant_id, customer_id);
    const response = await createReservation(
      date,
      party_count,
      restaurant_id,
      customer_id
    );
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});
app.delete(
  "/api/customers/:customer_id/reservations/:id",
  async (req, res, next) => {
    try {
      const { id, customer_id } = req.params;
      await destroyReservation(id, customer_id);
      res.status(204);
    } catch (error) {
      next(error);
    }
  }
);

const init = async () => {
  await client.connect();
};
init();
