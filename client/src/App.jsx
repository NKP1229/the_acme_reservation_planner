import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [showRestaurant, setShowRestaurant] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addCustomer, setAddCustomer] = useState(false);
  const [addRestaurant, setAddRestaurant] = useState(false);

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

  if (isLoading) {
    return <section className="loading">Loading</section>;
  }
  if (addCustomer) {
    return (
      <div className="page">
        <main>
          <button onClick={() => setAddCustomer(false)}>back</button>
          <h1>Add new Customer:</h1>
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
