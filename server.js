const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = 8000;
const stocks = [
  { id: 1, ticker: 'AAPL', price: 497.48 },
  { id: 2, ticker: 'MSFT', price: 213.02 },
  {
    id: 3,
    ticker: 'AMZN',
    price: 3284.72,
  },
];

function getRandomStock() {
  return Math.round(Math.random() * 2);
}

function getRandomPrice() {
  return Math.random() * (5000 - 20) + 20;
}

app.get('/stocks', function (req, res) {
  res.status(200).json({ success: true, data: stocks });
});

app.get('/realtime-price', function (req, res) {
  res.writeHead(200, {
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
  });
  setInterval(() => {
    const value = { ...stocks[getRandomStock()], price: getRandomPrice() };
    console.log(value);
    const everything = `event: message\ndata: ${JSON.stringify(value)}\n\n`;
    res.write(everything);
  }, 4000);
});

app.get('/realtime-price-polling', function (req, res) {
  const randomIndex = Math.floor(Math.random() * stocks.length);
  const updatedStock = {
    ...stocks[randomIndex],
    price: getRandomPrice(),
  };
  const updatedStocks = [...stocks.slice(0, randomIndex), updatedStock, ...stocks.slice(randomIndex + 1)];

  res.status(200).json({ success: true, data: updatedStocks });
});

app.listen(PORT, function () {
  console.log(`Server is running on ${PORT}`);
});
