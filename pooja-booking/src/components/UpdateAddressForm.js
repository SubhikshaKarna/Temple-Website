import React, { useState } from 'react';
import './UpdateAddressForm.css';

const UpdateAddressForm = () => {
  const [contactNumber, setContactNumber] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/update_address', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contactNumber, newAddress }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setContactNumber('');
        setNewAddress('');
      } else {
        setMessage(data.error || 'Failed to update address');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="update-address-form">
      <h2>Update Address</h2>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number:</label>
          <input
            type="text"
            id="contactNumber"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newAddress">New Address:</label>
          <textarea
            id="newAddress"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Update Address</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default UpdateAddressForm;
