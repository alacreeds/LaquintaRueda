// ============================================================
// LA QUINTA RUEDA — interactividad del sitio
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Menú móvil ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.textContent = isOpen ? '✕' : '☰';
    });
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.textContent = '☰';
      });
    });
  }

  /* ---------- Mapa de patio (yard grid) ---------- */
  // Genera el mapa de slots de patio si existe el contenedor .yard-grid[data-generate]
  const yardGrid = document.querySelector('.yard-grid[data-generate]');
  if (yardGrid) {
    const cols = 10;
    const rows = 4;
    const total = cols * rows;
    // Porcentaje de slots marcados como ocupados / cargas especiales, para dar
    // sensación real de un patio operando sin ser un dato inventado como métrica.
    let html = '';
    for (let i = 0; i < total; i++) {
      const row = String.fromCharCode(65 + Math.floor(i / cols)); // A, B, C...
      const col = (i % cols) + 1;
      const roll = Math.random();
      let cls = 'slot';
      if (roll > 0.8) cls += ' filled';
      else if (roll > 0.72) cls += ' rust';
      html += `<div class="${cls}">${row}${col}</div>`;
    }
    yardGrid.innerHTML = html;
  }

  /* ---------- Formulario de contacto ---------- */
  const form = document.querySelector('#contact-form');
  const status = document.querySelector('#form-status');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.nombre.value.trim();
      const company = form.empresa.value.trim();
      const email = form.email.value.trim();
      const phone = form.telefono.value.trim();
      const service = form.servicio.value;
      const message = form.mensaje.value.trim();

      if (!name || !email || !message) {
        showStatus('Por favor completa nombre, correo y mensaje antes de enviar.', true);
        return;
      }

      const subject = encodeURIComponent(`Solicitud de servicio — ${service || 'General'} — ${company || name}`);
      const bodyLines = [
        `Nombre: ${name}`,
        company ? `Empresa: ${company}` : null,
        `Correo: ${email}`,
        phone ? `Teléfono: ${phone}` : null,
        service ? `Servicio de interés: ${service}` : null,
        '',
        'Mensaje:',
        message
      ].filter(Boolean);
      const body = encodeURIComponent(bodyLines.join('\n'));

      // Como el sitio es estático (sin backend), abrimos el cliente de correo
      // del usuario con todos los campos ya redactados.
      window.location.href = `mailto:info@laquintarueda.com.do?subject=${subject}&body=${body}`;

      showStatus('Se abrió tu cliente de correo con el mensaje redactado. Si no se abre automáticamente, escríbenos directo a info@laquintarueda.com.do o por WhatsApp.', false);
      form.reset();
    });
  }

  function showStatus(text, isError) {
    if (!status) return;
    status.textContent = text;
    status.style.borderLeftColor = isError ? '#c1440e' : '#f5b700';
    status.classList.add('show');
  }
});
