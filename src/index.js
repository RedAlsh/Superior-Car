const express = require('express');
const path = require('path');
const carData = require('./data/cars.json');
const app = express();

// Middleware
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  res.render('index', { cars: carData.cars });
});

app.get('/api/cars', (req, res) => {
  res.json(carData.cars);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});