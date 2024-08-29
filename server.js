
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;


app.use(express.static('public'));


app.get('/weather', async (req, res) => {
    
    const city = req.query.city;
    
    const apiKey = '55efae5f1017d1c78a69f3ec941e9aee'; 

    const apiUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;

    try {   
        const response = await axios.get(apiUrl);

        if (response.data.success === false) {    
            res.status(400).json({ error: response.data.error.info });
        } else {   
            res.json(response.data);
        }
    } catch (error) {    
        res.status(500).json({ error: 'Unable to fetch weather data' });
    }
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});