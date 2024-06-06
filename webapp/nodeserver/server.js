const express = require('express');
const axios = require('axios');

const app = express(); 

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});


app.get('/chart', async (req, res) => {
  const ticker = req.query.ticker;
  const response = await axios.get(`http://localhost:5000/chart?ticker=${ticker}`);
  const data = response.data.map(item => {
    return {
      date: item.date,
      price: parseFloat(item.price)
    };
  });
  const dates = data.map(item => item.date);
  const prices = data.map(item => item.price);
  
  console.log("Dates: ", dates);  // log dates
  console.log("Prices: ", prices);  // log prices
	
  res.render('chart', { ticker: ticker, prices: prices, dates: dates });
});

app.listen(8080, () => {
  console.log(`Server running at http://localhost:8080`);
});

