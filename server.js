const express = require('express');       // Importerar Express-ramverket
const cors = require('cors');             // Importerar CORS för att tillåta anrop från andra domäner
const app = express();                    // Skapar en ny Express-applikation
require('dotenv').config();               // Laddar miljövariabler från .env-filen

app.use(cors());                          // Aktiverar CORS för alla inkommande requests
app.use(express.json());                 // Gör så att vi kan läsa JSON-data från request-body

// Importerar routes från workexperience.js och kopplar till /api/workexperience som blir den url som används
const workexperienceRouter = require('./routes/workexperience');
app.use('/api/workexperience', workexperienceRouter);


// Startar upp servern
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server is running on port: ' + port);
})