// Required libraries and database connection setup
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bookingdb', // Database name
  timezone: 'Z', // Ensure consistent UTC timezone handling
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// POST Route for handling form submission
app.post('/api/pooja_registration', (req, res) => {
  const { name, poojaName, poojaDate, contactNumber, address, pincode, tithi } = req.body;

  if (!name || !poojaName || !poojaDate || !contactNumber || !address || !pincode) {
    return res.status(400).json({ error: 'All fields except tithi are required' });
  }

  const query =
    'INSERT INTO pooja_registration (name, pooja_name, pooja_date, contact_number, address, pincode, tithi) VALUES (?, ?, ?, ?, ?, ?, ?)';

  db.query(query, [name, poojaName, poojaDate, contactNumber, address, pincode, tithi || null], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Failed to insert data' });
    }
    res.status(200).json({ message: 'Pooja registration successful' });
  });
});

// GET Route to retrieve registrations by date range
app.get('/api/pooja_registration', (req, res) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ error: 'Start date and end date are required' });
  }

  const query = `SELECT *, DATE_FORMAT(pooja_date, '%Y-%m-%d') AS formatted_date FROM pooja_registration WHERE pooja_date BETWEEN ? AND ? ORDER BY pooja_date ASC`;

  db.query(query, [startDate, endDate], (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Failed to retrieve data' });
    }
    res.status(200).json(
      results.map((row) => ({
        ...row,
        pooja_date: row.formatted_date,
      }))
    );
  });
});

// GET Route to retrieve registrations by specific day
app.get('/api/pooja_registration/day', (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: 'Date is required' });
  }

  const query = `SELECT *, DATE_FORMAT(pooja_date, '%Y-%m-%d') AS formatted_date FROM pooja_registration WHERE pooja_date = ? ORDER BY pooja_date ASC`;

  db.query(query, [date], (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Failed to retrieve data' });
    }
    res.status(200).json(
      results.map((row) => ({
        ...row,
        pooja_date: row.formatted_date,
      }))
    );
  });
});

// GET Route to retrieve registrations by specific month
app.get('/api/pooja_registration/month', (req, res) => {
  const { year, month } = req.query;

  if (!year || !month) {
    return res.status(400).json({ error: 'Year and month are required' });
  }

  const query = `SELECT *, DATE_FORMAT(pooja_date, '%Y-%m-%d') AS formatted_date FROM pooja_registration WHERE YEAR(pooja_date) = ? AND MONTH(pooja_date) = ? ORDER BY pooja_date ASC`;

  db.query(query, [year, month], (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Failed to retrieve data' });
    }
    res.status(200).json(
      results.map((row) => ({
        ...row,
        pooja_date: row.formatted_date,
      }))
    );
  });
});

// PUT Route to update only the address based on contact number
app.put('/api/update_address', (req, res) => {
  const { contactNumber, newAddress } = req.body;

  if (!contactNumber || !newAddress) {
    return res.status(400).json({ error: 'Contact number and new address are required' });
  }

  const query = `UPDATE pooja_registration SET address = ? WHERE contact_number = ?`;

  db.query(query, [newAddress, contactNumber], (err, result) => {
    if (err) {
      console.error('Error updating address:', err);
      return res.status(500).json({ error: 'Failed to update address' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Contact number not found' });
    }

    res.status(200).json({ message: 'Address updated successfully' });
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
