document.addEventListener('DOMContentLoaded', () => {

    // --- 1. LÓGICA DEL MENÚ MÓVIL ---
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileBtn && mobileMenu) {
        const icon = mobileBtn.querySelector('i');
        
        function toggleMenu() {
            mobileMenu.classList.toggle('hidden');
            if(mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            } else {
                icon.classList.remove('ph-list');
                icon.classList.add('ph-x');
            }
        }

        mobileBtn.addEventListener('click', toggleMenu);
        
        // Cerrar menú al hacer click en un enlace
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                if(!mobileMenu.classList.contains('hidden')) toggleMenu();
            });
        });
    }

    // --- 2. NAVBAR CON FONDO DESENFOCADO AL SCROLLEAR ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-sm');
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            } else {
                navbar.classList.remove('shadow-sm');
                navbar.style.background = 'rgba(255, 255, 255, 0.85)';
            }
        });
    }

    // --- 3. EFECTO DE APARICIÓN AL HACER SCROLL (Fade-in) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });

    // --- 4 y 5. LÓGICA DEL CARRUSEL 3D Y LIGHTBOX INTEGRADO ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('close-lightbox');

    const swiper = new Swiper('.skiperSwiper', {
        effect: 'creative',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true,
        speed: 500, // Reducido para que responda más rápido al scroll continuo
        mousewheel: {
            forceToAxis: false, // Permite el scroll vertical
            sensitivity: 2,     // Aumenta la velocidad de respuesta de la rueda del ratón
            releaseOnEdges: true // Evita que la página se quede atascada al llegar al inicio o fin del carrusel
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        creativeEffect: {
            limitProgress: 3, 
            prev: {
                // Rotación hacia adentro de 50 grados (Estilo exacto de tu imagen de referencia)
                translate: ['-75%', 0, -400],
                rotate: [0, 50, 0], 
                scale: 1,
                opacity: 0.9
            },
            next: {
                // Rotación hacia adentro de -50 grados
                translate: ['75%', 0, -400],
                rotate: [0, -50, 0], 
                scale: 1,
                opacity: 0.9
            }
        },
        // Integración nativa del Lightbox para abrir la foto al hacer clic
        on: {
            click: function (swiper) {
                const clickedEl = swiper.clickedSlide;
                if (clickedEl && lightbox && lightboxImg) {
                    const img = clickedEl.querySelector('img');
                    if (img) {
                        lightboxImg.setAttribute('src', img.getAttribute('src'));
                        lightbox.classList.remove('hidden');
                        setTimeout(() => lightbox.classList.add('show-lightbox'), 10);
                    }
                }
            }
        }
    });

    // Lógica para cerrar el lightbox (Al tocar la X o hacer clic fuera de la foto)
    const closeLightbox = () => {
        if(lightbox) {
            lightbox.classList.remove('show-lightbox');
            setTimeout(() => lightbox.classList.add('hidden'), 300); 
        }
    };

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (lightbox) lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) closeLightbox();
    });
    // --- 6. LÓGICA DEL ACORDEÓN (Preguntas Frecuentes) ---
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const header = item.querySelector('.flex');
        if (header) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Cerramos todas las preguntas primero
                faqItems.forEach(faq => faq.classList.remove('active'));
                
                // Si la que clicamos no estaba activa, la abrimos
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

});