const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

// Importerar routes från workexperience.js och kopplar till /api/workexperience som blir den url som används
const workexperienceRouter = require('./routes/workexperience');
app.use('/api/workexperience', workexperienceRouter);


// Startar upp servern
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server is running on port: ' + port);
})