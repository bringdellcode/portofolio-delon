// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Animated statistics counter
    function animateValue(id, start, end, duration) {
        let obj = document.getElementById(id);
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start)) + start;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Initialize counters
    animateValue("projects-count", 0, 1, 1);
    animateValue("incomming-count", 0, 3, 5);
    animateValue("hours-count", 0, 60, 70);
    
    // Add interactive effects to cards
    const cards = document.querySelectorAll('.link-card, .feature-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
    
    // Simple search functionality
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            alert(`Searching for: ${this.value}`);
            // In a real implementation, you would filter your portfolio items here
        }
    });
    
    // Add parallax effect to background
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const stars = document.querySelector('.stars');
        const twinkling = document.querySelector('.twinkling');
        
        stars.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        twinkling.style.transform = `translateY(${scrollPosition * 0.2}px)`;
    });
});

// add effect scroll for about section

// Update script.js dengan menambahkan fungsi berikut:

document.addEventListener('DOMContentLoaded', function() {
    // ... kode sebelumnya tetap ada ...
    
    // Smooth scroll to section
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            navButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get target section
            const targetId = this.textContent.toLowerCase();
            let targetSection;
            
            if (targetId === 'about') {
                targetSection = document.getElementById('about');
            } else if (targetId === 'projects') {
                // Sesuaikan dengan ID section projects Anda
                targetSection = document.getElementById('projects');
            } else if (targetId === 'contact') {
                // Sesuaikan dengan ID section contact Anda
                targetSection = document.getElementById('contact');
            }
            
            if (targetSection) {
                // Smooth scroll to target
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Animate skill bars when about section is in view
    const aboutSection = document.getElementById('about');
    const skillLevels = document.querySelectorAll('.skill-level');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillLevels.forEach(level => {
                    const width = level.getAttribute('data-level');
                    level.style.width = width + '%';
                });
            }
        });
    }, { threshold: 0.5 });
    
    if (aboutSection) {
        observer.observe(aboutSection);
    }
    
    // Highlight nav button based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        // Get all sections
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navButtons.forEach(button => {
                    button.classList.remove('active');
                    if (button.textContent.toLowerCase() === sectionId) {
                        button.classList.add('active');
                    }
                });
            }
        });
    });
});

// added projects section

// Update fungsi navigasi di script.js
// navButtons.forEach(button => {
//     button.addEventListener('click', function() {
//         // Remove active class from all buttons
//         navButtons.forEach(btn => btn.classList.remove('active'));
        
//         // Add active class to clicked button
//         this.classList.add('active');
        
//         // Get target section
//         const targetId = this.textContent.toLowerCase();
//         let targetSection;
        
//         if (targetId === 'about') {
//             targetSection = document.getElementById('about');
//         } else if (targetId === 'projects') {
//             targetSection = document.getElementById('projects');
//         } else if (targetId === 'contact') {
//             targetSection = document.getElementById('contact');
//         }
        
//         if (targetSection) {
//             // Smooth scroll to target
//             targetSection.scrollIntoView({
//                 behavior: 'smooth',
//                 block: 'start'
//             });
//         }
//     });
// });

// Tambahkan efek scroll animation untuk project items
const projectItems = document.querySelectorAll('.project-item');

const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

projectItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(50px)';
    item.style.transition = 'all 0.6s ease-out';
    projectObserver.observe(item);
});

document.addEventListener('DOMContentLoaded', function() {
    // Variabel yang diperlukan
    const menuToggle = document.getElementById('menuToggle');
    const navbar = document.getElementById('navbar');
    
    // Fungsi toggle menu
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        navbar.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }
    
    // Event listener untuk tombol menu
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
    
    // Tutup menu saat mengklik di luar
    document.addEventListener('click', function(e) {
        if (navbar.classList.contains('active') && 
            !e.target.closest('.navbar') && 
            !e.target.closest('.menu-toggle')) {
            toggleMenu();
        }
    });
    
    // Tutup menu saat mengklik link
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                toggleMenu();
            }
        });
    });
    
    // Tutup menu saat resize ke desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navbar.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Update event listener untuk semua nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // Skip untuk link contact yang mengarah ke WhatsApp
        if (this.getAttribute('href') === '#contact') {
            return; // Biarkan default behavior (akan scroll ke section contact)
        }
        
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Tambahkan ini untuk WhatsApp redirect dari menu contact
const contactMenuLink = document.querySelector('.nav-link[href="#contact"]');
if (contactMenuLink) {
    contactMenuLink.addEventListener('click', function(e) {
        // Jika di mobile (hamburger menu aktif), biarkan scroll dulu
        if (window.innerWidth <= 768 && document.getElementById('navbar').classList.contains('active')) {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                window.scrollTo({
                    top: contactSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Set timeout untuk redirect setelah scroll selesai
                setTimeout(() => {
                    window.location.href = "https://wa.me/6281234567890";
                }, 1000);
            }
        }
    });
}