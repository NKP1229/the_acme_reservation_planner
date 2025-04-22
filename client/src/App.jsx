import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [showRestaurant, setShowRestaurant] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addCustomer, setAddCustomer] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [addRestaurant, setAddRestaurant] = useState(false);
  const [restaurantName, setRestaurantName] = useState("");

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
        console.error("Error fetching restaurants:", error);
        console.error("Error response:", error.response);
        setIsLoading(false);
      }
    };
    getAllCustomers();
  }, [showRestaurant, addRestaurant]);

  async function addNewCustomer(event) {
    event.preventDefault();
    try {
      console.log("new customer: ", customerName);
      const response = await axios.post("/api/newCustomer", {
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
      console.log("new customer: ", restaurantName);
      const response = await axios.post("/api/newRestaurant", {
        name: restaurantName,
      });
      setAddRestaurant(false);
    } catch (error) {
      console.error(error);
      setAddRestaurant(false);
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
  if (showRestaurant) {
    return (
      <div className="page">
        <div className="header">
          <ul>
            <li>
              <button onClick={() => setShowRestaurant(false)}>
                Customers
              </button>
            </li>
            <li>
              <button onClick={() => setShowRestaurant(true)}>
                Restaurants
              </button>
            </li>
          </ul>
        </div>
        <main>
          <h1>The Acme Reservation Planner</h1>
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
  return (
    <div className="page">
      <div className="header">
        <ul>
          <li>
            <button onClick={() => setShowRestaurant(false)}>Customers</button>
          </li>
          <li>
            <button onClick={() => setShowRestaurant(true)}>Restaurants</button>
          </li>
        </ul>
      </div>
      <main>
        <h1>The Acme Reservation Planner</h1>
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

export default App;
