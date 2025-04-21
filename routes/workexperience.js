const express = require('express');
const router = express.Router();
const db = require('../db'); // Anslutning till databasen

// GET – Hämta alla arbetserfarenheter
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM workexperience');
        res.json(result.rows); // Skickar tillbaka alla rader som JSON
    } catch (err) {
        res.status(500).json({ error: 'Serverfel: ' + err.message });
    }
});

// POST – Skapa en ny arbetserfarenhet
router.post('/', async (req, res) => {
    const { companyname, jobtitle, location, startdate, enddate, description } = req.body;

    // Validering av input
    const errors = [];

    if (!companyname) errors.push('Företagsnamn måste anges.');
    if (!jobtitle) errors.push('Arbetstitel måste anges.');
    if (!location) errors.push('Plats måste anges.');
    if (!startdate) errors.push('Startdatum måste anges.');
    if (!enddate) errors.push('Slutdatum måste anges.');
    if (!description) errors.push('Arbetsbeskrivning måste anges.');

    // Om något fält saknas, returnera felmeddelanden
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    try {
        // Infogar ny post i databasen
        const result = await db.query(
            `INSERT INTO workexperience (companyname, jobtitle, location, startdate, enddate, description)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [companyname, jobtitle, location, startdate, enddate, description]
        );
        res.status(201).json(result.rows[0]); // Returnerar den nyss skapade posten
    } catch (err) {
        res.status(500).json({ error: 'Serverfel: ' + err.message });
    }
});

// PUT – Uppdatera en befintlig post
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { companyname, jobtitle, location, startdate, enddate, description } = req.body;

    // Validering av input
    const errors = [];

    if (!companyname) errors.push('Företagsnamn måste anges.');
    if (!jobtitle) errors.push('Arbetstitel måste anges.');
    if (!location) errors.push('Plats måste anges.');
    if (!startdate) errors.push('Startdatum måste anges.');
    if (!enddate) errors.push('Slutdatum måste anges.');
    if (!description) errors.push('Arbetsbeskrivning måste anges.');

    // Om något fält saknas, returnera felmeddelanden
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    try {
        // Uppdaterar posten med angivet ID
        const result = await db.query(
            `UPDATE workexperience
             SET companyname = $1, jobtitle = $2, location = $3,
                 startdate = $4, enddate = $5, description = $6
             WHERE id = $7 RETURNING *`,
            [companyname, jobtitle, location, startdate, enddate, description, id]
        );

        // Om ingen post uppdaterades, returnera 404
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Ingen post hittades med det ID:t.' });
        }

        res.json(result.rows[0]); // Returnerar den uppdaterade posten
    } catch (err) {
        res.status(500).json({ error: 'Serverfel: ' + err.message });
    }
});

//  DELETE – Radera en specifik post
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Tar bort posten med angivet ID
        const result = await db.query(
            'DELETE FROM workexperience WHERE id = $1 RETURNING *',
            [id]
        );

        // Om ingen post raderades, returnera 404
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Ingen post hittades med det ID:t.' });
        }

        res.json({ message: 'Post raderad.', deleted: result.rows[0] }); // Bekräftelse + raderad post
    } catch (err) {
        res.status(500).json({ error: 'Serverfel: ' + err.message });
    }
});

module.exports = router; // Exporterar routern så att den kan användas i server.js
