const pool = require('./db');

// Skapar tabellen
const createTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS workexperience (
      id SERIAL PRIMARY KEY,
      companyname VARCHAR(255) NOT NULL,
      jobtitle VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      startdate DATE NOT NULL,
      enddate DATE NOT NULL,
      description TEXT NOT NULL
    );
  `;

  try {
    await pool.query(query);
    console.log('Tabellen skapades (eller finns redan).');
  } catch (err) {
    console.error('Fel vid skapande av tabell:', err);
  } finally {
    pool.end();
  }
};

createTable();