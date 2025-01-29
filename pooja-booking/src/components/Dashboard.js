import React, { useState } from "react";
import "./Dashboard.css";
import Header from "./Header";
import { PoojaRegistrationForm } from "./PoojaRegistrationForm";
import { FetchPoojaRegistrations } from "./FetchPoojaRegistrations";
import UpdateAddressForm from "./UpdateAddressForm";

export const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState("dashboard");

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const renderContent = () => {
    switch (selectedOption) {
      case "pooja-registration":
        return <PoojaRegistrationForm />;
      case "FetchPoojaRegistration":
        return <FetchPoojaRegistrations />;
      case "update-address":
        return <UpdateAddressForm />;
      case "dashboard":
      default:
        return (
          <div className="dashboard-container">
            <h2 className="dashboard-title">ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಸ್ವಾಗತ <br></br> (Welcome to the Dashboard)</h2>
            <div className="card-container">
              <div
                className="dashboard-card"
                onClick={() => handleSelect("pooja-registration")}
              >
                ಪೂಜೆ ನೋಂದಣಿ
                <br></br>
                <br></br>
                (Pooja Registration)
              </div>
              <div
                className="dashboard-card"
                onClick={() => handleSelect("FetchPoojaRegistration")}
              >
                ಪೂಜೆ ವಿವರಗಳು
                <br></br>
                <br></br>
                (Pooja Details)

              </div>
              <div
                className="dashboard-card"
                onClick={() => handleSelect("update-address")}
              >
                ವಿಳಾಸವನ್ನು ನವೀಕರಿಸಿ
                <br></br>
                <br></br>
                (Update Address)
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="sidebar-title">ಮೆನು<br></br> (Menu)</h2>
        <button
          className={`sidebar-button ${
            selectedOption === "dashboard" ? "active" : ""
          }`}
          onClick={() => handleSelect("dashboard")}
        >
          ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌
          <br></br>
          (Dashboard)
        </button>
        <button
          className={`sidebar-button ${
            selectedOption === "pooja-registration" ? "active" : ""
          }`}
          onClick={() => handleSelect("pooja-registration")}
        >
                ಪೂಜೆ ನೋಂದಣಿ
                <br></br>
                (Pooja Registration)
        </button>
        <button
          className={`sidebar-button ${
            selectedOption === "FetchPoojaRegistration" ? "active" : ""
          }`}
          onClick={() => handleSelect("FetchPoojaRegistration")}
        >
                ಪೂಜೆ ವಿವರಗಳು
                <br></br>
                (Pooja Details)
        </button>
        <button
          className={`sidebar-button ${
            selectedOption === "update-address" ? "active" : ""
          }`}
          onClick={() => handleSelect("update-address")}
        >
                ವಿಳಾಸವನ್ನು ನವೀಕರಿಸಿ
                <br></br>
                (Update Address)
        </button>
      </div>

      {/* Main Section */}
      <div className="main-content">
        {/* Header section */}
        <Header />
        {/* Dashboard content */}
        <div className="content-area">{renderContent()}</div>
      </div>
    </div>
  );
};
