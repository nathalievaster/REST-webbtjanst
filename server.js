const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

// Routes
app.get("/routes/workexperience", (req, res) => {
    res.json({message: "Welcome to my api!"});
});

// Startar upp servern
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server is running on port: ' + port);
})