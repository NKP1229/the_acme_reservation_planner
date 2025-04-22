import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [showRestaurant, setShowRestaurant] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllRestaurants = async () => {
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
  }, [showRestaurant]);

  if (isLoading) {
    return <section className="loading">Loading</section>;
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
      </main>
    </div>
  );
}

export default App;
