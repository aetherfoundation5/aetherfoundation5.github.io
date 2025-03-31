let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;
function initCarousel() {
    setSlide(0);
    
    setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function setSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    currentSlide = n;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}
function changeSlide(offset) {
    let newIndex = (currentSlide + offset + totalSlides) % totalSlides;
    setSlide(newIndex);
}
function initItemCarousel() {
    const itemCarousels = document.querySelectorAll('.item-carousel');
    
    itemCarousels.forEach(carousel => {
        const container = carousel.querySelector('.item-carousel-container');
        const cards = carousel.querySelectorAll('.item-card');
        const prevBtn = carousel.querySelector('.item-carousel-prev');
        const nextBtn = carousel.querySelector('.item-carousel-next');
        
        let currentIndex = 0;
        const cardWidth = cards[0].offsetWidth + 20; 
        const visibleCards = Math.floor(container.offsetWidth / cardWidth);
        const maxIndex = Math.max(0, cards.length - visibleCards);

        updateCarouselPosition();

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarouselPosition();
            }
        });
        
        nextBtn.addEventListener('click', () => {
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarouselPosition();
            }
        });
        
        function updateCarouselPosition() {
            const translateX = -currentIndex * cardWidth;
            container.style.transform = `translateX(${translateX}px)`;
            prevBtn.classList.toggle('disabled', currentIndex === 0);
            nextBtn.classList.toggle('disabled', currentIndex >= maxIndex);

            container.classList.add('sliding');
            setTimeout(() => {
                container.classList.remove('sliding');
            }, 300);
        }
        window.addEventListener('resize', () => {
            const newCardWidth = cards[0].offsetWidth + 20;
            const newVisibleCards = Math.floor(container.offsetWidth / newCardWidth);
            const newMaxIndex = Math.max(0, cards.length - newVisibleCards);
            
            if (currentIndex > newMaxIndex) {
                currentIndex = newMaxIndex;
            }
            
            updateCarouselPosition();
        });
    });
}

function initAnimations() {
    const animatedElements = document.querySelectorAll('.item-card, .featured-section, .bundle-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    const priceButtons = document.querySelectorAll('.price-btn');
    priceButtons.forEach(button => {
        button.classList.add('pulse');
    });
}
function initModals() {
    const modalHTML = `
        <div class="modal-backdrop">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h2 class="modal-title">Add to Cart</h2>
                <div class="modal-item">
                    <img class="modal-item-image" src="" alt="Item">
                    <div class="modal-item-info">
                        <h3 class="modal-item-name"></h3>
                        <p class="modal-item-description"></p>
                    </div>
                </div>
                <div class="modal-price"></div>
                <div class="modal-quantity">
                    <button class="quantity-btn decrease">-</button>
                    <span class="quantity-display">1</span>
                    <button class="quantity-btn increase">+</button>
                </div>
                <button class="add-to-cart-btn">Add to Cart</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.querySelector('.modal-backdrop');
    const closeBtn = document.querySelector('.modal-close');
    const priceButtons = document.querySelectorAll('.price-btn');
    const decreaseBtn = document.querySelector('.decrease');
    const increaseBtn = document.querySelector('.increase');
    const quantityDisplay = document.querySelector('.quantity-display');
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    priceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const parent = this.closest('.hero-content') || this.closest('.featured-content') || this.closest('.item-card');
            const itemName = parent.querySelector('h1') || parent.querySelector('h2') || parent.querySelector('h3') || { textContent: 'Pokémon Item' };
            const itemImg = parent.querySelector('img') || { src: '' };
            const itemDesc = parent.querySelector('.item-description') || { textContent: '' };
            const price = this.textContent;

            document.querySelector('.modal-item-name').textContent = itemName.textContent;
            document.querySelector('.modal-item-image').src = itemImg.src;
            document.querySelector('.modal-item-description').textContent = itemDesc.textContent;
            document.querySelector('.modal-price').textContent = price;
            quantityDisplay.textContent = '1';

            modal.classList.add('active');
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    decreaseBtn.addEventListener('click', () => {
        let quantity = parseInt(quantityDisplay.textContent);
        if (quantity > 1) {
            quantityDisplay.textContent = quantity - 1;
        }
    });
    
    increaseBtn.addEventListener('click', () => {
        let quantity = parseInt(quantityDisplay.textContent);
        quantityDisplay.textContent = quantity + 1;
    });
    addToCartBtn.addEventListener('click', () => {
        const itemName = document.querySelector('.modal-item-name').textContent;
        const quantity = quantityDisplay.textContent;
        
        const originalText = addToCartBtn.textContent;
        addToCartBtn.textContent = 'Added to Cart!';
        addToCartBtn.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            modal.classList.remove('active');
            setTimeout(() => {
                addToCartBtn.textContent = originalText;
                addToCartBtn.style.backgroundColor = '';
            }, 300);
        }, 1500);
        console.log(`Added ${quantity} x ${itemName} to cart`);
    });
}
function initStickyHeader() {
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero');

    hero.style.marginTop = header.offsetHeight + 'px';
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    window.addEventListener('resize', () => {
        hero.style.marginTop = header.offsetHeight + 'px';
    });
}

function initNavScroll() {
    const navLinks = document.querySelectorAll('.secondary-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            navLinks.forEach(link => link.classList.remove('active'));

            this.classList.add('active');

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const navHeight = document.querySelector('.secondary-nav').offsetHeight;
                const offsetTop = targetSection.offsetTop - headerHeight - navHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initItemCarousel();
    initAnimations();
    initModals();
    initStickyHeader();
    initNavScroll();

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('slide-up');
    });
});