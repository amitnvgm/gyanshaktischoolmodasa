document.addEventListener('DOMContentLoaded', function() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mainMenu = document.querySelector('.main-menu');
    
    // Mobile menu toggle
    mobileBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        mainMenu.classList.toggle('active');
    });
    
    // Dropdown menus for mobile
    const dropdownParents = document.querySelectorAll('.menu-item-has-children > .nav-link');
    
    dropdownParents.forEach(parent => {
        parent.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const submenu = this.nextElementSibling;
                submenu.classList.toggle('active');
                
                // Rotate chevron icon
                const icon = this.querySelector('.dropdown-icon');
                if (icon) {
                    icon.classList.toggle('rotated');
                }
            }
        });
    });
    
    // Close menu when clicking outside (mobile)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            !e.target.closest('.nav-container') && 
            mainMenu.classList.contains('active')) {
            mobileBtn.classList.remove('active');
            mainMenu.classList.remove('active');
            
            // Close all submenus
            document.querySelectorAll('.submenu').forEach(sub => {
                sub.classList.remove('active');
            });
            
            // Reset all dropdown icons
            document.querySelectorAll('.dropdown-icon').forEach(icon => {
                icon.classList.remove('rotated');
            });
        }
    });
    
    // Close menu when resizing to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mobileBtn.classList.remove('active');
            mainMenu.classList.remove('active');
        }
    });
});



// Hero Slider
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-dot');
let currentSlide = 0;
let slideInterval;

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function startSlider() {
    slideInterval = setInterval(nextSlide, 5000);
}

// Dot click event
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(slideInterval);
        showSlide(index);
        startSlider();
    });
});


// Marquee functionality
document.addEventListener('DOMContentLoaded', function() {
    const marqueeClose = document.querySelector('.marquee-close');
    const marqueeContainer = document.querySelector('.marquee-container');
    
    // Close button functionality
    if (marqueeClose && marqueeContainer) {
        marqueeClose.addEventListener('click', function() {
            marqueeContainer.style.display = 'none';
            // Optional: Set cookie/localStorage to remember dismissal
        });
    }
    
    // Pause animation when tab is inactive
    document.addEventListener('visibilitychange', function() {
        const marqueeContent = document.querySelector('.marquee-content');
        if (marqueeContent) {
            if (document.hidden) {
                marqueeContent.style.animationPlayState = 'paused';
            } else {
                marqueeContent.style.animationPlayState = 'running';
            }
        }
    });
});


// Testimonials Slider

document.addEventListener('DOMContentLoaded', function() {
    // Select all testimonial elements
    const testimonials = document.querySelectorAll('.gyan-testimonial-item');
    const dots = document.querySelectorAll('.gyan-testimonial-dot');
    const prevBtn = document.querySelector('.gyan-slider-prev');
    const nextBtn = document.querySelector('.gyan-slider-next');
    let currentIndex = 0;
    let autoSlideInterval;
    const slideDuration = 5000; // 5 seconds
    
    // Function to show a specific testimonial
    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the selected testimonial
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    // Function for next testimonial
    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
        resetAutoSlide();
    }
    
    // Function for previous testimonial
    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentIndex);
        resetAutoSlide();
    }
    
    // Auto slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextTestimonial, slideDuration);
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
            resetAutoSlide();
        });
    });
    
    // Button navigation
    prevBtn.addEventListener('click', prevTestimonial);
    nextBtn.addEventListener('click', nextTestimonial);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevTestimonial();
        } else if (e.key === 'ArrowRight') {
            nextTestimonial();
        }
    });
    
    // Pause auto-slide on hover
    const slider = document.querySelector('.gyan-testimonial-slider');
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        resetAutoSlide();
    });
    
    // Initialize
    showTestimonial(currentIndex);
    startAutoSlide();
});



// Gallery Lightbox Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxModal = document.querySelector('.lightbox-modal');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxTitle = document.querySelector('.lightbox-title');
    const lightboxCategory = document.querySelector('.lightbox-category');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    let currentIndex = 0;
    let filteredItems = [];
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            if (filterValue === 'all') {
                // Show all items
                galleryItems.forEach(item => {
                    item.style.display = 'block';
                });
            } else {
                // Show only filtered items
                galleryItems.forEach(item => {
                    if (item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
        });
    });
    
    // Open lightbox when gallery item is clicked
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentIndex = index;
            updateLightbox();
            lightboxModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });
    
    // Close lightbox
    closeBtn.addEventListener('click', function() {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Enable scrolling
    });
    
    // Navigate to previous image
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        updateLightbox();
    });
    
    // Navigate to next image
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        updateLightbox();
    });
    
    // Close lightbox when clicking outside the image
    lightboxModal.addEventListener('click', function(e) {
        if (e.target === lightboxModal) {
            lightboxModal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Enable scrolling
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightboxModal.classList.contains('active')) {
            if (e.key === 'Escape') {
                lightboxModal.classList.remove('active');
                document.body.style.overflow = 'auto'; // Enable scrolling
            } else if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
                updateLightbox();
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % galleryItems.length;
                updateLightbox();
            }
        }
    });
    
    // Update lightbox content
    function updateLightbox() {
        const activeItem = galleryItems[currentIndex];
        const imgSrc = activeItem.querySelector('img').getAttribute('src');
        const title = activeItem.querySelector('.image-title').textContent;
        const category = activeItem.querySelector('.image-category').textContent;
        
        lightboxImage.setAttribute('src', imgSrc);
        lightboxImage.setAttribute('alt', title);
        lightboxTitle.textContent = title;
        lightboxCategory.textContent = category;
    }
});



// Counter Functionality

document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.counter-number');
    const speed = 200; // The lower the faster
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // Start animation when counter section is in view
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counterObserver.observe(document.querySelector('.counter-section'));
});


// footer functionality

// Back to top button functionality
document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.querySelector('.back-to-top a');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});