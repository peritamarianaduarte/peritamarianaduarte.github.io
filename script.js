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
                'ponto 1 - preco',
                'ponto 2 - preco',
                'ponto 3 - preco'
            ],
            values: 'colocar alguma coisa aqui'
        },
        'mentoria-mercado': {
            title: 'Mentoria de Ingresso no Mercado',
            services: [
                'ponto 1 - preco',
                'ponto 2 - preco',
                'ponto 3 - preco'
            ],
            values: 'colocar alguma coisa aqui'
        },
        'assistencia-tecnica': {
            title: 'Assistência Técnica',
            services: [
                'ponto 1 - preco',
                'ponto 2 - preco',
                'ponto 3 - preco'
            ],
            values: 'colocar alguma coisa aqui'
        }
    };

    function openPlanModal(key) {
        if (!planModal || !plansData[key]) return;

        const data = plansData[key];

        planModalTitle.textContent = data.title;
        planModalServices.innerHTML =
            '<ul>' +
                data.services.map(s => '<li>' + s + '</li>').join('') +
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