/* ============================================================
   HYDROSTATS — script.js
   ============================================================ */


/* ------------------------------------------------------------
   1. HAMBURGUER — abre/fecha menu mobile
   ------------------------------------------------------------ */

const toggle = document.querySelector('.cabecalho__toggle');
const menu   = document.querySelector('.cabecalho__menu');

toggle.addEventListener('click', () => {
    const aberto = menu.classList.toggle('aberto');
    toggle.setAttribute('aria-expanded', aberto);
    toggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
});

// Fecha o menu ao clicar em qualquer link
menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('aberto');
        toggle.setAttribute('aria-expanded', false);
        toggle.setAttribute('aria-label', 'Abrir menu');
    });
});

// Fecha o menu ao clicar fora dele
document.addEventListener('click', e => {
    if (!e.target.closest('.cabecalho')) {
        menu.classList.remove('aberto');
        toggle.setAttribute('aria-expanded', false);
    }
});


/* ------------------------------------------------------------
   2. SCROLL SUAVE com offset do header fixo
   Os links do menu usam href="#secao", mas o header fixo
   cobre o topo. Isso corrige o destino de cada âncora.
   ------------------------------------------------------------ */

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const id = link.getAttribute('href').slice(1);
        const alvo = document.getElementById(id);
        if (!alvo) return;

        e.preventDefault();

        const alturaHeader = document.querySelector('.cabecalho').offsetHeight;
        const posicao = alvo.getBoundingClientRect().top + window.scrollY - alturaHeader - 12;

        window.scrollTo({ top: posicao, behavior: 'smooth' });
    });
});


/* ------------------------------------------------------------
   3. LINK ATIVO no menu — destaca a seção atual enquanto
   o usuário rola a página (IntersectionObserver)
   ------------------------------------------------------------ */

const secoes = document.querySelectorAll('section[id]');

const observador = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        menu.querySelectorAll('a').forEach(link => {
            link.classList.remove('ativo');
        });

        const linkAtivo = menu.querySelector(`a[href="#${entry.target.id}"]`);
        if (linkAtivo) linkAtivo.classList.add('ativo');
    });
}, {
    rootMargin: '-40% 0px -55% 0px'
});

secoes.forEach(s => observador.observe(s));


/* ------------------------------------------------------------
   4. ANIMAÇÃO DE ENTRADA — seções e cards aparecem
   com fade + slide ao entrar na viewport
   ------------------------------------------------------------ */

const animaveis = document.querySelectorAll('.secao, .card, .ods__imagem');

animaveis.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity .55s ease, transform .55s ease';
});

const observadorEntrada = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observadorEntrada.unobserve(entry.target);
    });
}, { threshold: 0.08 });

animaveis.forEach(el => observadorEntrada.observe(el));


/* ------------------------------------------------------------
   5. HEADER SCROLLADO — adiciona sombra ao rolar
   ------------------------------------------------------------ */

const cabecalho = document.querySelector('.cabecalho');

window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        cabecalho.classList.add('scrollado');
    } else {
        cabecalho.classList.remove('scrollado');
    }
}, { passive: true });