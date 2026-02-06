const hamburger = document.querySelector(".hamburguer-menu");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});


// Carga datos de formulario en la recepción del mail
document.getElementById("quoteForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const urgency = document.getElementById("urgency").value;

    if (!email || !urgency) return;

    const to = "luciagiulietti@hotmail.com";
    const subject = encodeURIComponent("Consulta de cotización NAATI");

    const body = encodeURIComponent(
      `Hola,\n\n` +
      `Quiero solicitar una cotización NAATI.\n\n` +
      `Nombre: ${name || "-"}\n` +
      `Email: ${email}\n` +
      `Plazo de entrega: ${urgency}\n\n` +
      `Mensaje:\n${message || "-"}\n\n` +
      `Adjunto los documentos a este correo.\n`
    );

    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });