import React, { useState } from "react";
import { Dashboard } from "./components/Dashboard"; // Import Dashboard component
import { Login } from "./components/Login"; // Import Login component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username, password) => {
    // Simple authentication logic (replace with real authentication later)
    if (username === "admin" && password === "password") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <Dashboard /> // Render Dashboard if logged in
      ) : (
        <Login onLogin={handleLogin} /> // Render Login component
      )}
    </div>
  );
}

export default App;
