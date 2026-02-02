document.addEventListener('DOMContentLoaded', () => {

    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');

    function handleNavbarScroll() {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    }

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        hamburger.classList.toggle('toggle');
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
        navLinks.classList.remove('nav-active');
        hamburger.classList.remove('toggle');
        });
    });

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll();


    const observer = new IntersectionObserver(
        (entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            entry.target.classList.add('show');
            obs.unobserve(entry.target);
            }
        });
        },
        { threshold: 0.15 }
    );

    document.querySelectorAll('.hidden')
        .forEach(el => observer.observe(el));



    /* =========================
        5. MODAL (SIMPLIFICADO)
    ========================== */

    const modal = document.getElementById('modal');
    if (!modal) return;

    const modalImg = modal.querySelector('.modal-img');
    const modalCaption = modal.querySelector('#modal-caption');
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');

    const items = Array.from(
        document.querySelectorAll('img.modal-trigger')
    ).filter(img => !img.closest('.gallery-thumbs'));

    let index = 0;

    function openModal(i) {
        index = i;
        const el = items[index];
        modalImg.src = el.dataset.image || el.src;
        modalCaption.textContent = el.dataset.caption || el.alt || '';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    items.forEach((img, i) => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', e => {
        e.preventDefault();
        openModal(i);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    });