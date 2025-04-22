import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [showCustomer, setShowCustomer] = useState(false);
  const [showRestaurant, setShowRestaurant] = useState(true);
  const [showReservations, setShowReservations] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addCustomer, setAddCustomer] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [addRestaurant, setAddRestaurant] = useState(false);
  const [restaurantName, setRestaurantName] = useState("");
  const [addReservation, setAddReservation] = useState(false);
  const [whichRestaurant, setWhichRestaurant] = useState("");
  const [whichCustomer, setWhichCustomer] = useState("");
  const [partyCount, setPartyCount] = useState(1);
  const [Date, setDate] = useState("");

  useEffect(() => {
    const getAllRestaurants = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/restaurants");
        setRestaurants(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        console.error("Error response:", error.response);
        setIsLoading(false);
      }
    };
    getAllRestaurants();
    const getAllCustomers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/customers");
        setCustomers(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching customers:", error);
        console.error("Error response:", error.response);
        setIsLoading(false);
      }
    };
    getAllCustomers();
    const getAllReservations = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/reservations");
        setReservations(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        console.error("Error response:", error.response);
        setIsLoading(false);
      }
    };
    getAllReservations();
  }, [showCustomer, showRestaurant, addRestaurant]);

  function whichNav(id) {
    if (id == "customer") {
      setShowCustomer(true);
      setShowRestaurant(false);
      setShowReservations(false);
    } else if (id == "restaurant") {
      setShowRestaurant(true);
      setShowCustomer(false);
      setShowReservations(false);
    } else if (id == "reservation") {
      setShowReservations(true);
      setShowCustomer(false);
      setShowRestaurant(false);
    }
  }
  async function addNewCustomer(event) {
    event.preventDefault();
    try {
      await axios.post("/api/newCustomer", {
        name: customerName,
      });
      setAddCustomer(false);
    } catch (error) {
      console.error(error);
      setAddCustomer(false);
    }
  }
  async function addNewRestaurant(event) {
    event.preventDefault();
    try {
      await axios.post("/api/newRestaurant", {
        name: restaurantName,
      });
      setAddRestaurant(false);
    } catch (error) {
      console.error(error);
      setAddRestaurant(false);
    }
  }
  async function addNewReservation(event) {
    event.preventDefault();
    try {
      await axios.post(`/api/customers/${whichCustomer}/reservations`, {
        date: Date,
        party_count: partyCount,
        restaurant_id: whichRestaurant,
      });
      setAddReservation(false);
    } catch (error) {
      console.error(error);
      setAddReservation(false);
    }
  }
  if (isLoading) {
    return <section className="loading">Loading</section>;
  }
  if (addCustomer) {
    return (
      <div className="page">
        <main>
          <button onClick={() => setAddCustomer(false)}>back</button>
          <h1>Add new Customer:</h1>
          <form onSubmit={addNewCustomer}>
            <div>
              <label>Name</label>
              <input
                type="text"
                name="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter customer name"
              ></input>
            </div>
            <button type="submit">Submit</button>
          </form>
        </main>
      </div>
    );
  }
  if (addRestaurant) {
    return (
      <div className="page">
        <main>
          <button onClick={() => setAddRestaurant(false)}>back</button>
          <h1>Add new Restaurant:</h1>
          <form onSubmit={addNewRestaurant}>
            <div>
              <label>Name</label>
              <input
                type="text"
                name="restaurantName"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                placeholder="Enter restaurant name"
              ></input>
            </div>
            <button type="submit">Submit</button>
          </form>
        </main>
      </div>
    );
  }
  if (addReservation) {
    return (
      <div className="page">
        <main>
          <button onClick={() => setAddReservation(false)}>back</button>
          <h1>Add new reservation:</h1>
          <form onSubmit={addNewReservation}>
            <div>
              <label>Date</label>
              <input
                type="date"
                name="Date"
                value={Date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label>Party Count</label>
              <select
                value={partyCount}
                onChange={(e) => setPartyCount(e.target.value)}
              >
                <option></option>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="8">8</option>
                <option value="10">10</option>
              </select>
            </div>
            <div>
              <label>Restaurant</label>
              <select
                value={whichRestaurant}
                onChange={(e) => setWhichRestaurant(e.target.value)}
              >
                <option></option>
                {restaurants.map((restaurant) => (
                  <option key={restaurant.id} value={restaurant.id}>
                    {restaurant.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Customer</label>
              <select
                value={whichCustomer}
                onChange={(e) => setWhichCustomer(e.target.value)}
              >
                <option></option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit">Submit</button>
          </form>
        </main>
      </div>
    );
  }
  if (showRestaurant) {
    return (
      <div className="page">
        <div className="header">
          <ul>
            <li>
              <button onClick={() => whichNav("customer")}>Customers</button>
            </li>
            <li>
              <button onClick={() => whichNav("restaurant")}>
                Restaurants
              </button>
            </li>
            <li>
              <button onClick={() => whichNav("reservation")}>
                Reservations
              </button>
            </li>
          </ul>
        </div>
        <main>
          <h1>The Acme Reservation Planner</h1>
          <h3>RESTAURANTS:</h3>
          <ol>
            {restaurants.map((restaurant) => (
              <li key={restaurant.id}>
                <div>{restaurant.name}</div>
              </li>
            ))}
          </ol>
          <button onClick={() => setAddRestaurant(true)}>add Restaurant</button>
        </main>
      </div>
    );
  }
  if (showReservations) {
    return (
      <div className="page">
        <div className="header">
          <ul>
            <li>
              <button onClick={() => whichNav("customer")}>Customers</button>
            </li>
            <li>
              <button onClick={() => whichNav("restaurant")}>
                Restaurants
              </button>
            </li>
            <li>
              <button onClick={() => whichNav("reservation")}>
                Reservations
              </button>
            </li>
          </ul>
        </div>
        <main>
          <h1>The Acme Reservation Planner</h1>
          <h3>RESERVATIONS:</h3>
          <ol>
            {reservations.map((reservation) => (
              <li key={reservation.id}>
                <div>{reservation.name}</div>
              </li>
            ))}
          </ol>
          <button onClick={() => setAddReservation(true)}>
            add Reservation
          </button>
        </main>
      </div>
    );
  }
  if (showCustomer) {
    return (
      <div className="page">
        <div className="header">
          <ul>
            <li>
              <button onClick={() => whichNav("customer")}>Customers</button>
            </li>
            <li>
              <button onClick={() => whichNav("restaurant")}>
                Restaurants
              </button>
            </li>
            <li>
              <button onClick={() => whichNav("reservation")}>
                Reservations
              </button>
            </li>
          </ul>
        </div>
        <main>
          <h1>The Acme Reservation Planner</h1>
          <h3>CUSTOMERS:</h3>
          <ol>
            {customers.map((customer) => (
              <li key={customer.id}>
                <div>{customer.name}</div>
              </li>
            ))}
          </ol>
          <button onClick={() => setAddCustomer(true)}>add Customer</button>
        </main>
      </div>
    );
  }
}

export default App;
