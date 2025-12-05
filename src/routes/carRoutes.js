const express = require('express');
const CarController = require('../controllers/carController');

const setCarRoutes = (app) => {
    const router = express.Router();
    const carController = new CarController();

    router.get('/fleet', carController.getFleet.bind(carController));
    router.get('/car/:id', carController.getCarDetails.bind(carController));

    app.use('/api/cars', router);
};

module.exports = setCarRoutes;