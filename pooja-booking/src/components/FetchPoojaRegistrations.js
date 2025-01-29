import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./FetchPoojaRegistrations.css";

export const FetchPoojaRegistrations = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [registrations, setRegistrations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateError, setDateError] = useState(""); // New state for date error

  const fetchRegistrations = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    // Date validation: check if startDate is later than endDate
    if (new Date(startDate) > new Date(endDate)) {
      setDateError("Start date cannot be later than end date.");
      return;
    }

    setDateError(""); // Clear error if validation passes

    axios
      .get("http://localhost:5000/api/pooja_registration", {
        params: { startDate, endDate },
      })
      .then((response) => {
        setRegistrations(response.data);
        setIsModalOpen(true); // Open modal on successful fetch
      })
      .catch((error) => {
        console.error("Error fetching registrations:", error);
        alert("Failed to retrieve registrations.");
      });
  };

  const formatDate = (isoDate) => isoDate.split("T")[0];

  const downloadPDF = () => {
    if (registrations.length === 0) {
      alert("No data available to download.");
      return;
    }

    const doc = new jsPDF();

    // Add the current date of print in the header
    const currentDate = new Date().toLocaleDateString();

    // Add each registration with a thank you note
    let yOffset = 30;
    registrations.forEach((reg) => {
      doc.setFontSize(12);

      // Side headings in bold
      doc.setFont("helvetica", "bold");
      doc.text("Name:", 14, yOffset);
      doc.setFont("helvetica", "normal");
      doc.text(`${reg.name}`, 40, yOffset);

      doc.setFont("helvetica", "bold");
      doc.text("Date:", 14, yOffset + 6);
      doc.setFont("helvetica", "normal");
      doc.text(`${formatDate(reg.pooja_date)}`, 40, yOffset + 6);

      doc.setFont("helvetica", "bold");
      doc.text("Contact:", 14, yOffset + 12);
      doc.setFont("helvetica", "normal");
      doc.text(`${reg.contact_number}`, 40, yOffset + 12);

      doc.setFont("helvetica", "bold");
      doc.text("Address:", 14, yOffset + 18);
      doc.setFont("helvetica", "normal");
      doc.text(`${reg.address}`, 40, yOffset + 18);

      doc.setFont("helvetica", "bold");
      doc.text("Pincode:", 14, yOffset + 24);
      doc.setFont("helvetica", "normal");
      doc.text(`${reg.pincode}`, 40, yOffset + 24);

      // Add the current date of print on the right side of each registration
      doc.setFont("helvetica", "normal");
      doc.text(`Date: ${currentDate}`, 160, yOffset + 6);

      // Thank you message
      doc.setFont("helvetica", "normal");
      doc.text("Thank you for your participation in the seva!", 14, yOffset + 30);

      // Add a line and space after each registration
      yOffset += 40;
      doc.line(14, yOffset, 195, yOffset); // Horizontal line

      yOffset += 10; // Additional space after the line

      if (yOffset > 250) { // If the page is about to overflow, add a new page
        doc.addPage();
        yOffset = 20; // Reset yOffset for new page
      }
    });

    // Save the generated PDF
    doc.save("pooja_registrations.pdf");
  };

  return (
    <div className="fetch-registrations-container">
      <div className="form-section">
        <h2>Retrieve Pooja Registrations</h2>
        <div className="form-group">
          <label htmlFor="start-date">Start Date:</label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            style={{
              borderColor: dateError ? "red" : "", // Apply red border if there's an error
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="end-date">End Date:</label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            style={{
              borderColor: dateError ? "red" : "", // Apply red border if there's an error
            }}
          />
        </div>
        {dateError && <p style={{ color: "red" }}>{dateError}</p>} {/* Show error message */}
        <button className="fetch-button" onClick={fetchRegistrations}>
          Fetch Registrations
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">Pooja Registrations</div>
            <div className="modal-body">
              {registrations.length > 0 ? (
                <table className="registration-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Date</th>
                      <th>Contact</th>
                      <th>Address</th>
                      <th>Pincode</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((registration, index) => (
                      <tr key={index}>
                        <td>{registration.name}</td>
                        <td>{formatDate(registration.pooja_date)}</td>
                        <td>{registration.contact_number}</td>
                        <td>{registration.address}</td>
                        <td>{registration.pincode}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No registrations found for the selected dates.</p>
              )}
            </div>
            <div className="modal-footer">
              <button className="close-button" onClick={() => setIsModalOpen(false)}>
                Close
              </button>
              <button className="download-pdf-button" onClick={downloadPDF}>
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
