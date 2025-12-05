class CarController {
    constructor(carData) {
        this.carData = carData;
    }

    getFleet(req, res) {
        res.json(this.carData);
    }

    getCarDetails(req, res) {
        const carId = req.params.id;
        const car = this.carData.find(car => car.id === carId);
        if (car) {
            res.json(car);
        } else {
            res.status(404).send('Car not found');
        }
    }
}

module.exports = CarController;