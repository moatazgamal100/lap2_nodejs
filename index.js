const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let cars = [
    { id: 1, model: 'Toyota Camry', licenseNumber: 'ABC123' },
    { id: 2, model: 'Honda Civic', licenseNumber: 'XYZ789' }
];

// GET all cars
app.get('/cars', (req, res) => {
    res.json(cars);
});

// GET car by ID
app.get('/cars/:id', (req, res) => {
    const carId = parseInt(req.params.id);
    const car = cars.find(car => car.id === carId);
    if (!car) {
        return res.status(404).json({ error: 'Car not found' });
    }
    res.json(car);
});

// POST a new car
app.post('/cars', (req, res) => {
    const newCar = req.body;
    cars.push(newCar);
    res.status(201).json(newCar);
});

// DELETE a car by ID
app.delete('/cars/:id', (req, res) => {
    const carId = parseInt(req.params.id);
    cars = cars.filter(car => car.id !== carId);
    res.sendStatus(204);
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});
