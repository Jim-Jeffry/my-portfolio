document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    window.addEventListener('load', function() {
        document.querySelector('.preloader').style.display = 'none';
    });

    // Create code particles
    function createParticles() {
        const particlesContainer = document.querySelector('.code-particles');
        const codeSnippets = ['<div>', 'function()', 'const', 'let', 'class', 'import', 'export', 
                             'return', 'if', 'else', 'for', 'while', 'try', 'catch', 'console.log'];
        
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
            
            // Random position
            const posX = Math.random() * 100;
            const delay = Math.random() * 15;
            const duration = 10 + Math.random() * 20;
            
            particle.style.left = `${posX}%`;
            particle.style.top = `-30px`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    createParticles();

    // Mobile Navigation Toggle
    const mobileNavToggle = document.createElement('div');
    mobileNavToggle.className = 'mobile-nav-toggle d-lg-none';
    mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.appendChild(mobileNavToggle);
    
    mobileNavToggle.addEventListener('click', function() {
        document.querySelector('.sidebar').classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
    });

    // Close mobile navigation when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                document.querySelector('.sidebar').classList.remove('active');
                mobileNavToggle.querySelector('i').classList.remove('fa-times');
            }
        });
    });

    // Typed.js Animation
    const typed = new Typed('#typed', {
        strings: ['Java Full Stack Developer', 'Web Developer', 'Software Engineer', 'Problem Solver', 'Team Leader'],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Navigation on Scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Initialize AOS Animation
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Portfolio Filtering
    const portfolioFilter = document.querySelector('.portfolio-filter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (portfolioFilter) {
        portfolioFilter.addEventListener('click', function(e) {
            if (e.target.classList.contains('filter-btn')) {
                // Remove active class from all buttons
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                e.target.classList.add('active');
                
                const filterValue = e.target.getAttribute('data-filter');
                
                // Filter portfolio items
                portfolioItems.forEach(item => {
                    if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
        });
    }

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const formMessage = document.getElementById('form-message');
            
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    formMessage.textContent = 'Message sent successfully!';
                    formMessage.className = 'success';
                    this.reset();
                    
                    // Hide message after 5 seconds
                    setTimeout(() => {
                        formMessage.textContent = '';
                        formMessage.className = '';
                    }, 5000);
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                formMessage.textContent = 'There was a problem sending your message. Please try again later.';
                formMessage.className = 'error';
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.textContent = '';
                    formMessage.className = '';
                }, 5000);
            });
        });
    }

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Lightbox initialization
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'showImageNumberLabel': false
    });

    // Animate progress bars on scroll
    const animateProgressBars = function() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        progressBars.forEach(bar => {
            const width = bar.parentElement.getAttribute('aria-valuenow');
            bar.style.width = width + '%';
        });
    };
    
    // Run once when skills section is in view
    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // Skills Radar Chart
    const skillsData = {
        labels: ['Java', 'Spring Boot', 'REST APIs', 'MySQL', 'HTML/CSS', 'JavaScript'],
        datasets: [{
            label: 'Skill Level',
            data: [85, 70, 70, 85, 90, 70],
            backgroundColor: 'rgba(52, 152, 219, 0.2)',
            borderColor: 'rgba(52, 152, 219, 1)',
            pointBackgroundColor: 'rgba(52, 152, 219, 1)',
            pointBorderColor: '#fff',
            pointHoverRadius: 5
        }]
    };

    const skillsChart = new Chart(document.getElementById('skills-chart'), {
        type: 'radar',
        data: skillsData,
        options: {
            responsive: true,
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            },
            elements: {
                line: {
                    borderWidth: 3
                }
            }
        }
    });

    // Certification Slider
    $('.certification-slider').slick({
        dots: false,
        arrows: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        centerMode: true,
        variableWidth: true,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    centerMode: false,
                    variableWidth: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    centerMode: false,
                    variableWidth: false,
                    arrows: true
                }
            }
        ]
    });

    // Terminal Typing Animation
    const terminalLines = document.querySelectorAll('.terminal-line.typing');
    terminalLines.forEach(line => {
        const text = line.textContent;
        line.textContent = '';
        
        let i = 0;
        const typing = setInterval(() => {
            if (i < text.length) {
                line.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, 50);
    });

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate header elements
    gsap.from('.header-content .subtitle', {
        scrollTrigger: {
            trigger: '.header-section',
            start: 'top center',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 1
    });
    
    gsap.from('.header-content .title', {
        scrollTrigger: {
            trigger: '.header-section',
            start: 'top center',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3
    });
    
    gsap.from('.typing-text', {
        scrollTrigger: {
            trigger: '.header-section',
            start: 'top center',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.6
    });
    
    gsap.from('.header-buttons', {
        scrollTrigger: {
            trigger: '.header-section',
            start: 'top center',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.9
    });
    
    // Animate timeline items
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: i * 0.1
        });
    });
    
    // Animate floating cube
    gsap.to('.floating-cube .cube', {
        scrollTrigger: {
            trigger: '.header-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: 200,
        rotation: 90,
        ease: 'none'
    });
});
