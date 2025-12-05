const carsData = [
    {
        "id": 1,
        "name": "Renault Clio 5",
        "brand": "Renault",
        "category": "Essence",
        "mainImage": "public/images/cars/Clio 5 Gris Schiste/main.jpeg",
        "gallery": [
            "public/images/cars/Clio 5 Gris Schiste/gallery-1.jpeg",
            "public/images/cars/Clio 5 Gris Schiste/gallery-2.jpeg"
        ],
        "specs": "Modèle 2025 Gris Schiste"
    },
    {
        "id": 2,
        "name": "Renault Clio 5",
        "brand": "Renault",
        "category": "Diesel",
        "mainImage": "public/images/cars/Clio 5 Bleu Céladon/main.jpeg",
        "gallery": [
            "public/images/cars/Clio 5 Bleu Céladon/gallery-1.jpeg",
            "public/images/cars/Clio 5 Bleu Céladon/gallery-2.jpeg"
        ],
        "specs": "Modèle 2021 Bleu Céladon"
    },
    {
        "id": 3,
        "name": "Renault Clio 5",
        "brand": "Renault",
        "category": "Diesel",
        "mainImage": "public/images/cars/Clio 5 Bleu Iron/main.jpeg",
        "gallery": [
            "public/images/cars/Clio 5 Bleu Iron/gallery-1.jpeg",
            "public/images/cars/Clio 5 Bleu Iron/gallery-2.jpeg"
        ],
        "specs": "Modèle 2022 Bleu Iron"
    },
    {
        "id": 4,
        "name": "Dacia Logan",
        "brand": "Dacia",
        "category": "Essence",
        "mainImage": "public/images/cars/Dacia Logan Gris  Schiste/main.jpeg",
        "gallery": [
            "public/images/cars/Dacia Logan Gris  Schiste/gallery-1.jpeg",
            "public/images/cars/Dacia Logan Gris  Schiste/gallery-2.jpeg"
        ],
        "specs": "Modèle 2024 Gris Schiste"
    },
    {
        "id": 5,
        "name": "Dacia Logan",
        "brand": "Dacia",
        "category": "Diesel",
        "mainImage": "public/images/cars/Dacia Logan Gris Schiste/main.jpeg",
        "gallery": [
            "public/images/cars/Dacia Logan Gris Schiste/gallery-1.jpeg",
            "public/images/cars/Dacia Logan Gris Schiste/gallery-2.jpeg"
        ],
        "specs": "Modèle 2024 Gris Schiste"
    },
    {
        "id": 6,
        "name": "Dacia Logan",
        "brand": "Dacia",
        "category": "Diesel",
        "mainImage": "public/images/cars/Dacia Logan Blanc Glacier/main.jpeg",
        "gallery": [
            "public/images/cars/Dacia Logan Blanc Glacier/gallery-1.jpeg",
            "public/images/cars/Dacia Logan Blanc Glacier/gallery-2.jpeg"
        ],
        "specs": "Modèle 2022 Blanc Glacier"
    },
    {
        "id": 7,
        "name": "Hyundai Accent",
        "brand": "Hyundai",
        "category": "Diesel",
        "mainImage": "public/images/cars/Hyundai Accent Blanc Nacré/main.jpeg",
        "gallery": [
            "public/images/cars/Hyundai Accent Blanc Nacré/gallery-1.jpeg",
            "public/images/cars/Hyundai Accent Blanc Nacré/gallery-2.jpeg"
        ],
        "specs": "Modèle 2023 Blanc Nacré"
    },
    {
        "id": 8,
        "name": "Dacia Sandero Stepway",
        "brand": "Dacia",
        "category": "Diesel",
        "mainImage": "public/images/cars/Dacia Sandero Stepway Gris Schiste/main.jpeg",
        "gallery": [
            "public/images/cars/Dacia Sandero Stepway Gris Schiste/gallery-1.jpeg",
            "public/images/cars/Dacia Sandero Stepway Gris Schiste/gallery-2.jpeg"
        ],
        "specs": "Modèle 2023 Gris Schiste"
    },
    {
        "id": 9,
        "name": "Kia Picanto",
        "brand": "Kia",
        "category": "Essence",
        "mainImage": "public/images/cars/Kia Picanto Bleu Denim/main.jpeg",
        "gallery": [
            "public/images/cars/Kia Picanto Bleu Denim/gallery-1.jpeg",
            "public/images/cars/Kia Picanto Bleu Denim/gallery-2.jpeg"
        ],
        "specs": "Modèle 2024 Bleu Denim"
    },
    {
        "id": 10,
        "name": "Peugeot 208",
        "brand": "Peugeot",
        "category": "Diesel",
        "mainImage": "public/images/cars/Peugeot 208 Gris Selenium/main.jpeg",
        "gallery": [
            "public/images/cars/Peugeot 208 Gris Selenium/gallery-1.jpeg",
            "public/images/cars/Peugeot 208 Gris Selenium/gallery-2.jpeg"
        ],
        "specs": "Modèle 2023 Gris Selenium"
    }
];

// Load cars on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCars(carsData);
    setupFilters();
    setupModal();
});

function loadCars(cars) {
    const carsGrid = document.getElementById('carsGrid');
    carsGrid.innerHTML = '';

    cars.forEach(car => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card';
        carCard.setAttribute('data-category', car.brand);
        carCard.setAttribute('data-id', car.id);

        carCard.innerHTML = `
            <div class="car-image">
                <img src="${car.mainImage}" alt="${car.name}" onerror="this.src='https://via.placeholder.com/300x200?text=${car.name.replace(/\s/g, '+')}">
                <div class="car-overlay">
                    <button class="view-btn" data-car-id="${car.id}">Voir Galerie</button>
                </div>
            </div>
            <div class="car-info">
                <h3>${car.name}</h3>
                <p class="category">${car.category}</p>
                <p class="specs">${car.specs}</p>
            </div>
        `;

        carsGrid.appendChild(carCard);
    });

    // Setup view buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const carId = parseInt(btn.getAttribute('data-car-id'));
            const car = carsData.find(c => c.id === carId);
            if (car) openGalleryModal(car);
        });
    });
}

function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const carCards = document.querySelectorAll('.car-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            const allCards = document.querySelectorAll('.car-card');
            
            allCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.classList.remove('hidden');
                    card.style.animation = 'cardAppear 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

function setupModal() {
    const modal = document.getElementById('galleryModal');
    const closeBtn = document.querySelector('.close-btn');

    closeBtn.addEventListener('click', closeGalleryModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeGalleryModal();
    });

    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const index = parseInt(thumb.getAttribute('data-index'));
            switchImage(index);
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeGalleryModal();
        }
    });
}

function openGalleryModal(car) {
    const modal = document.getElementById('galleryModal');
    const mainImage = document.getElementById('mainGalleryImage');
    const carName = document.getElementById('carName');
    const carSpecs = document.getElementById('carSpecs');
    const thumbnails = document.querySelectorAll('.thumbnail');

    // Store car ID for later reference
    modal.setAttribute('data-car-id', car.id);

    mainImage.src = car.mainImage;
    mainImage.onerror = function() {
        this.src = 'https://via.placeholder.com/400x300?text=Car';
    };
    carName.textContent = car.name;
    carSpecs.textContent = car.specs;

    const allImages = [car.mainImage, ...car.gallery];
    thumbnails.forEach((thumb, index) => {
        if (allImages[index]) {
            thumb.src = allImages[index];
            thumb.onerror = function() {
                this.src = 'https://via.placeholder.com/80x80?text=Car';
            };
        }
    });

    thumbnails.forEach((thumb, index) => {
        if (index === 0) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });

    modal.classList.remove('hidden');
    modal.classList.add('show');
}

function closeGalleryModal() {
    const modal = document.getElementById('galleryModal');
    modal.classList.remove('show');
    modal.classList.add('hidden');
}

function switchImage(index) {
    const mainImage = document.getElementById('mainGalleryImage');
    const modal = document.getElementById('galleryModal');
    const carId = parseInt(modal.getAttribute('data-car-id'));
    const currentCar = carsData.find(c => c.id === carId);
    
    if (currentCar) {
        const allImages = [currentCar.mainImage, ...currentCar.gallery];
        if (allImages[index]) {
            mainImage.src = allImages[index];
            mainImage.onerror = function() {
                this.src = 'https://via.placeholder.com/400x300?text=Car';
            };
        }
    }

    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, i) => {
        if (i === index) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}