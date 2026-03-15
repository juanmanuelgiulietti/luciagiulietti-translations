document.addEventListener("DOMContentLoaded", () => {
  // Menu hamburguesa
  const hamburger = document.querySelector(".hamburguer-menu");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });
  }

  // Animaciones al scrollear
  const observerOptions = {
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // Manejo de formulario
  const quoteForm = document.getElementById("quoteForm");

  if (quoteForm) {
    quoteForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const btn = quoteForm.querySelector('button[type="submit"]');
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      const urgency = document.getElementById("urgency").value;

      // Validación básica
      if (!email || !urgency) {
        alert("Por favor, completa los campos obligatorios.");
        return;
      }

      // Preparar el mail
      const to = "luciagiulietti@hotmail.com";
      const subject = encodeURIComponent("Consulta de cotización NAATI");
      const body = encodeURIComponent(
        `Hola Lucía,\n\n` +
        `Quiero solicitar una cotización NAATI.\n\n` +
        `Nombre: ${name || "-"}\n` +
        `Email: ${email}\n` +
        `Plazo de entrega: ${urgency}\n\n` +
        `Mensaje:\n${message || "-"}\n\n` +
        `Adjunto los documentos a continuación.\n`
      );

      // Feedback visual antes de abrir el correo
      const originalText = btn.textContent;
      btn.textContent = "Abriendo correo...";
      btn.style.opacity = "0.7";

      // Abrir cliente de correo
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

      // Resetear formulario y botón después de un momento
      setTimeout(() => {
        alert("Se abrirá tu aplicación de correo para enviar los documentos. ¡Gracias!");
        btn.textContent = originalText;
        btn.style.opacity = "1";
        quoteForm.reset();
      }, 1000);
    });
  }
});