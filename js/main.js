/**
 * main.js – Helados del barrio
 *
 * Módulos
 *  1. Navigation   – Toggle móvil + active link tracking
 *  2. Header       – Clase "scrolled" al hacer scroll
 *  3. ScrollReveal – IntersectionObserver para animaciones de entrada
 *  4. ContactForm  – Validación simple + redirección a WhatsApp
 *  5. Footer year  – Año dinámico en el copyright
 */

'use strict';

/* ── Número de WhatsApp (editar aquí) ── */
const WA_NUMBER = '5730012345'; // ej: 573001234567


/* ================================================================
   1. NAVIGATION
   ================================================================ */
const navToggle = document.getElementById('nav-toggle');
const mainNav   = document.getElementById('main-nav');
const navLinks  = document.querySelectorAll('.nav__link');

/** Abre o cierra el menú móvil */
function toggleMenu() {
  const isOpen = mainNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen);

  // CAMBIO AQUÍ: Cambia las clases de Font Awesome según el estado del menú
  const icon = navToggle.querySelector('i');
  icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
}

navToggle.addEventListener('click', toggleMenu);

/** Cierra el menú al hacer clic en un enlace */
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (mainNav.classList.contains('is-open')) toggleMenu();
  });
});

/** Marca el enlace activo según la sección visible */
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  let currentId = '';
  const scrollMid = window.scrollY + window.innerHeight / 2;

  sections.forEach(section => {
    if (section.offsetTop <= scrollMid) currentId = section.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  });
}

// Escuchar el scroll para actualizar el enlace activo
window.addEventListener('scroll', updateActiveLink);


/* ================================================================
   2. HEADER SCROLL
   Añade la clase "scrolled" después de 60px de scroll.
   ================================================================ */
const siteHeader = document.getElementById('site-header');

function handleHeaderScroll() {
  siteHeader.classList.toggle('scrolled', window.scrollY > 60);
  updateActiveLink();
}

window.addEventListener('scroll', handleHeaderScroll, { passive: true });


/* ================================================================
   3. SCROLL REVEAL
   IntersectionObserver: agrega "is-visible" cuando el elemento
   entra al viewport. Sin librerías externas.
   ================================================================ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target); // se anima solo una vez
      }
    });
  },
  { threshold: 0.12 } // se activa cuando el 12% del elemento es visible
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ================================================================
   4. FORMULARIO DE CONTACTO → WHATSAPP
   Valida los campos requeridos en el cliente y, si todo es
   correcto, construye un mensaje formateado y abre WhatsApp.
   Sin backend ni servidor.
   ================================================================ */
const contactForm = document.getElementById('contact-form');

/**
 * Muestra o limpia el mensaje de error de un campo.
 * @param {HTMLElement} input  - El campo
 * @param {string}      msg    - Mensaje de error (vacío para limpiar)
 */
function setError(input, msg) {
  const errorEl = input.closest('.form-group')?.querySelector('.form-error');
  input.classList.toggle('is-error', !!msg);
  if (errorEl) errorEl.textContent = msg;
}

/** Valida el formulario y devuelve true si todo está bien. */
function validateForm(form) {
  let valid = true;

  const name  = form.elements['name'];
  const phone = form.elements['phone'];

  if (!name.value.trim()) {
    setError(name, 'Por favor ingresa tu nombre.');
    valid = false;
  } else {
    setError(name, '');
  }

  if (!phone.value.trim()) {
    setError(phone, 'Por favor ingresa un teléfono.');
    valid = false;
  } else {
    setError(phone, '');
  }

  return valid;
}

/** Construye el texto del mensaje de WhatsApp. */
function buildWhatsAppMessage(form) {
  const fields = {
    nombre:  form.elements['name'].value.trim(),
    telefono: form.elements['phone'].value.trim(),
    tema:    form.elements['topic'].value  || 'No especificado',
    mensaje: form.elements['message'].value.trim() || 'Sin mensaje adicional',
  };

  return [
    '✉️ *CONSULTA – Tetas Heladas*',
    '',
    `👤 *Nombre:*   ${fields.nombre}`,
    `📞 *Teléfono:* ${fields.telefono}`,
    `📋 *Tema:*     ${fields.tema}`,
    '',
    `📝 *Mensaje:*`,
    fields.mensaje,
  ].join('\n');
}

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // bloquea el envío HTTP tradicional

    if (!validateForm(contactForm)) return;

    const msg = buildWhatsAppMessage(contactForm);
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  });
}


/* ================================================================
   5. AÑO DINÁMICO EN EL FOOTER
   ================================================================ */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
