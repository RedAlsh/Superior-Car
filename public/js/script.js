let carsData = [];

// Fetch cars data on page load
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/cars');
        carsData = await response.json();
    } catch (error) {
        console.error('Error fetching cars:', error);
    }

    const filterBtns = document.querySelectorAll('.filter-btn');
    const carCards = document.querySelectorAll('.car-card');
    const modal = document.getElementById('galleryModal');
    const closeBtn = document.querySelector('.close-btn');

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            
            carCards.forEach(card => {
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

    // Gallery modal functionality
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const carId = parseInt(btn.getAttribute('data-car-id'));
            const car = carsData.find(c => c.id === carId);
            
            if (car) {
                openGalleryModal(car);
            }
        });
    });

    // Close modal
    closeBtn.addEventListener('click', closeGalleryModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeGalleryModal();
        }
    });

    // Thumbnail click
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const index = parseInt(thumb.getAttribute('data-index'));
            switchImage(index);
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeGalleryModal();
        }
    });
});

function openGalleryModal(car) {
    const modal = document.getElementById('galleryModal');
    const mainImage = document.getElementById('mainGalleryImage');
    const carName = document.getElementById('carName');
    const carSpecs = document.getElementById('carSpecs');
    const carPrice = document.getElementById('carPrice');
    const thumbnails = document.querySelectorAll('.thumbnail');

    // Set main content
    mainImage.src = car.mainImage;
    carName.textContent = car.name;
    carSpecs.textContent = car.specs;
    carPrice.textContent = car.price;

    // Set gallery images
    const allImages = [car.mainImage, ...car.gallery];
    thumbnails.forEach((thumb, index) => {
        if (allImages[index]) {
            thumb.src = allImages[index];
            thumb.onerror = function() {
                this.src = 'https://via.placeholder.com/80x80?text=Car';
            };
        }
    });

    // Reset active thumbnail
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
    const currentCar = carsData.find(c => c.name === document.getElementById('carName').textContent);
    
    if (currentCar) {
        const allImages = [currentCar.mainImage, ...currentCar.gallery];
        if (allImages[index]) {
            mainImage.src = allImages[index];
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