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
        5. MODAL (IMAGENS) - protegido
    ========================== */

    const modal = document.getElementById('modal');
    if (modal) {
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
            // if the clicked image is inside the 'Resultados' (#credenciais) section,
            // add a specific class so we can style this modal differently
            if (el.closest && el.closest('#credenciais')) {
                modal.classList.add('modal--credenciais');
            } else {
                modal.classList.remove('modal--credenciais');
            }

            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modal.classList.remove('show');
            modal.classList.remove('modal--credenciais');
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
    }

    /* Modal dos planos */

    const planModal = document.getElementById('plan-modal');
    const planModalClose = planModal && planModal.querySelector('.plan-modal-close');
    const planModalOverlay = planModal && planModal.querySelector('.plan-modal-overlay');
    const planModalTitle = planModal && document.getElementById('plan-modal-title');
    const planModalServices = planModal && document.getElementById('plan-modal-services');
    const planModalValues = planModal && document.getElementById('plan-modal-values');

    const plansData = {
        'mentoria-pericia': {
            title: 'Mentoria em Perícia',
            services: [
                '• Mentoria Individual – Elétrica',
                'Unitário: R$ 2.000,00 | Completo: R$ 5.000,00',
                '<br>',
                '• Mentoria Individual – Água e Saneamento',
                'Unitário: R$ 1.600,00 | Completo: R$ 4.000,00',
                '<br>',
                '• Mentoria em Grupo',
                'Essencial: R$ 1.500,00 | Completo: R$ 2.200,00'

            ],
            values: 'Para detalhes sobre valores, condições de pagamento e prazos, favor entrar em contato via WhatsApp.'
        },
        'mentoria-mercado': {
            title: 'Mentoria de Ingresso no Mercado',
            services: [
                '• Sessão individual - R$790,99',
                '<br>',
                '• Sessão em Grupo - R$1.500,00',
                '<br>',
                '• Sessão em Grupo - R$2.000,00',
                '<br>',
                '• Vantagem exclusiva - 50% do valor investido poderá ser abatido em futura mentoria técnica individual.'
            ],
            values: 'Para detalhes sobre valores, condições de pagamento e prazos, favor entrar em contato via WhatsApp.'
        },
        'assistencia-tecnica': {
            title: 'Assistência Técnica',
            services: [
                '• Análise técnica do processo + Quesitos iniciais - R$250.00',
                '<br>',
                '• Parecer Técnico e Manifestação sobre Informações - R$250.00',
                '<br>',
                '• Impugnação ao Laudo Pericial - R$250.00',
                '<br>',
                '• Acompanhamento Presencial de vistoria pericial - R$400.00'

            ],
            values: 'Para detalhes sobre valores, condições de pagamento e prazos, favor entrar em contato via WhatsApp.'
        }
    };

    function openPlanModal(key) {
        if (!planModal || !plansData[key]) return;

        const data = plansData[key];

        planModalTitle.textContent = data.title;
        planModalServices.innerHTML =
            '<ul>' +
                data.services.map(s => '<ul>' + s + '</ul>').join('') +
            '</ul>';
        planModalValues.textContent = data.values;

        planModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }


    function closePlanModal() {
        if (!planModal) return;
        planModal.classList.remove('show');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.plan-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            const key = btn.dataset.plan;
            openPlanModal(key);
            const select = document.getElementById('plano');
            if (select) {
                const dataTitle = plansData[key] && plansData[key].title;
                Array.from(select.options).forEach(opt => opt.selected = (opt.text === dataTitle));
                select.dispatchEvent(new Event('change'));
            }
        });
    });

    if (planModalClose) planModalClose.addEventListener('click', closePlanModal);
    if (planModalOverlay) planModalOverlay.addEventListener('click', closePlanModal);

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePlanModal();
            if (modal) modal.classList.remove('show');
        }
    });

    const planForm = document.getElementById('plan-form');
    if (planForm) {
        planForm.addEventListener('submit', e => {
            e.preventDefault();
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const cpf = document.getElementById('cpf').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const plano = document.getElementById('plano').value.trim();

            if (!nome || !email || !cpf || !telefone || !plano) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            const message = `Olá, Mariana! Meu nome é ${nome}.\nTenho interesse no plano ${plano}.\nE-mail: ${email}\nCPF: ${cpf}\nTelefone: ${telefone}`;
            const phone = '5524992644177';
            const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        });
    }

    // Mantém a observação para elementos recém adicionados
    document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

    

    });

    // Carousel interno dos resultados 
    (function initCredenciaisCarousel(){
        const container = document.querySelector('#credenciais .product-card--large .card-carousel');
        if (!container) return;

        const slidesEl = container.querySelector('.slides');
        const slides = Array.from(slidesEl.querySelectorAll('img'));
        const prev = container.querySelector('.carousel-prev');
        const next = container.querySelector('.carousel-next');
        let idx = 0;

        function show(i){
            idx = (i + slides.length) % slides.length;
            slidesEl.style.transform = `translateX(${ -idx * 100 }%)`;
        }

        function nextSlide(){ show(idx + 1); }
        function prevSlide(){ show(idx - 1); }

        if (next) next.addEventListener('click', e => { e.preventDefault(); nextSlide(); });
        if (prev) prev.addEventListener('click', e => { e.preventDefault(); prevSlide(); });

        // Keep simple: no autoplay. Images remain clickable to open modal (handled elsewhere).
        show(0);
    })();