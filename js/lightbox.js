document.addEventListener('DOMContentLoaded', function() {
    // Select elements
    const imageItems = document.querySelectorAll('.image-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');

    let currentIndex = 0;
    const images = Array.from(imageItems).map(item => ({
        src: item.querySelector('img').src,
        alt: item.querySelector('img').alt
    }));

    // Open lightbox on image click
    imageItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            updateLightbox();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Update displayed image
    function updateLightbox() {
        lightboxImage.src = images[currentIndex].src;
        lightboxImage.alt = images[currentIndex].alt;
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                updateLightbox();
                break;
            case 'ArrowRight':
                currentIndex = (currentIndex + 1) % images.length;
                updateLightbox();
                break;
        }
    });

    // Touch swipe navigation
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) < 50) return; // Ignore tiny swipes

        if (swipeDistance > 0) {
            // Swipe right → previous image
            currentIndex = (currentIndex - 1 + images.length) % images.length;
        } else {
            // Swipe left → next image
            currentIndex = (currentIndex + 1) % images.length;
        }
        updateLightbox();
    }
});
