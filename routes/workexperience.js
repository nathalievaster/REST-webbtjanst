const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all work experiences
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM workexperience');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Serverfel: ' + err.message });
    }
});

// POST new work experience
router.post('/', async (req, res) => {
    const { companyname, jobtitle, location, startdate, enddate, description } = req.body;

    const errors = [];

    if (!companyname) errors.push('Företagsnamn måste anges.');
    if (!jobtitle) errors.push('Arbetstitel måste anges.');
    if (!location) errors.push('Plats måste anges.');
    if (!startdate) errors.push('Startdatum måste anges.');
    if (!enddate) errors.push('Slutdatum måste anges.');
    if (!description) errors.push('Arbetsbeskrivning måste anges.');

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    try {
        const result = await db.query(
            `INSERT INTO workexperience (companyname, jobtitle, location, startdate, enddate, description)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [companyname, jobtitle, location, startdate, enddate, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Serverfel: ' + err.message });
    }
});

// PUT (uppdatera) en specifik workexperience
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { companyname, jobtitle, location, startdate, enddate, description } = req.body;

    const errors = [];

    if (!companyname) errors.push('Företagsnamn måste anges.');
    if (!jobtitle) errors.push('Arbetstitel måste anges.');
    if (!location) errors.push('Plats måste anges.');
    if (!startdate) errors.push('Startdatum måste anges.');
    if (!enddate) errors.push('Slutdatum måste anges.');
    if (!description) errors.push('Arbetsbeskrivning måste anges.');

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    try {
        const result = await db.query(
            `UPDATE workexperience
             SET companyname = $1, jobtitle = $2, location = $3,
                 startdate = $4, enddate = $5, description = $6
             WHERE id = $7 RETURNING *`,
            [companyname, jobtitle, location, startdate, enddate, description, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Ingen post hittades med det ID:t.' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Serverfel: ' + err.message });
    }
});


module.exports = router;