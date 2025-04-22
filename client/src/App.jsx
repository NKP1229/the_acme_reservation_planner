import { useState } from "react";
import "./App.css";

function App() {
  const [showRestaurant, setShowRestaurant] = useState(true);
  if (showRestaurant) {
    return (
      <div className="page">
        <div className="header">
          <ul>
            <li>
              <button>Customers</button>
            </li>
            <li>
              <button>Restaurants</button>
            </li>
          </ul>
        </div>
        <main>
          <h1>The Acme Reservation Planner</h1>
        </main>
      </div>
    );
  }
  return (
    <div className="page">
      <div className="header">
        <ul>
          <li>
            <button>Customers</button>
          </li>
          <li>
            <button>Restaurants</button>
          </li>
        </ul>
      </div>
      <main>
        <h1>The Acme Reservation Planner</h1>
      </main>
    </div>
  );
}

export default App;
