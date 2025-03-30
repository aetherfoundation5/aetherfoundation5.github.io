document.addEventListener('DOMContentLoaded', function() {
            const navLinks = document.querySelectorAll('.secondary-nav a');
        
            function setActiveLink(id) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.id === id) {
                        link.classList.add('active');
                    }
                });
            }
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
    
                    const targetId = this.getAttribute('href').substring(1);
                    const targetSection = document.getElementById(targetId);
                    
                    window.scrollTo({
                        top: targetSection.offsetTop - 100,
                        behavior: 'smooth'
                    });
                    
                    setActiveLink(this.id);
                });
            });
            
            window.addEventListener('scroll', function() {
                const scrollPosition = window.scrollY;
                const featured = document.getElementById('featured');
                const itemBoxes = document.getElementById('item-boxes');
                const pokecoins = document.getElementById('pokecoins');
                const dailyBundles = document.getElementById('daily-bundles');
                
                if (scrollPosition < itemBoxes.offsetTop - 120) {
                    setActiveLink('featured-link');
                } else if (scrollPosition < pokecoins.offsetTop - 120) {
                    setActiveLink('item-boxes-link');
                } else if (scrollPosition < dailyBundles.offsetTop - 120) {
                    setActiveLink('pokecoins-link');
                } else {
                    setActiveLink('daily-bundles-link');
                }
            });
        });
        let currentIndex = 0;
        const slides = document.querySelectorAll(".carousel-slide");
        const dots = document.querySelectorAll(".dot");

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle("active", i === index);
                dots[i].classList.toggle("active", i === index);
            });
            currentIndex = index;
        }

        function changeSlide(direction) {
            let newIndex = currentIndex + direction;
            if (newIndex >= slides.length) newIndex = 0;
            if (newIndex < 0) newIndex = slides.length - 1;
            showSlide(newIndex);
        }

        function setSlide(index) {
            showSlide(index);
        }
        
        