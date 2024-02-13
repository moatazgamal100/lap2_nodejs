function addCar() {
    const model = document.getElementById('model').value;
    const licenseNumber = document.getElementById('licenseNumber').value;

    const newCar = { model, licenseNumber };

    fetch('/cars', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCar)
    })
    .then(response => response.json())
    .then(data => {
        window.location.href = 'index.html';
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to get all cars
function getCars() {
    fetch('/cars')
        .then(response => response.json())
        .then(cars => {
            displayCars(cars);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function displayCars(cars) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ''; 

    const ul = document.createElement('ul');
    cars.forEach(car => {
        const li = document.createElement('li');
        li.textContent = `Model: ${car.model}, License Number: ${car.licenseNumber}`;

        li.setAttribute('id', `car-${car.id}`);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        
        deleteButton.addEventListener('click', () => {
            deleteCar(car.id); 
        });

        li.appendChild(deleteButton);

        ul.appendChild(li);
    });

    outputDiv.appendChild(ul);
}

function deleteCar(id) {
    fetch(`/cars/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            const deletedCarElement = document.getElementById(`car-${id}`);
            if (deletedCarElement) {
                deletedCarElement.remove();
            }
        } else {
            console.error('Error:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}