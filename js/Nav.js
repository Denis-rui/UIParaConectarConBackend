document.addEventListener("click", (e) => {
  const elem = e.target.closest("[data-view]");
  if (!elem) return;
  const li = elem.closest("li");

  if (li) {
    document.querySelectorAll(".nav li").forEach((el) => {
      el.classList.remove("activo");
    });

    li.classList.add("activo");
  }

  const viewEscogido = elem.dataset.view;
  if (!viewEscogido) return;

  e.preventDefault();

  if (viewEscogido === "cerrar-sesion") {
    localStorage.removeItem("logueado");
    localStorage.removeItem("tipoUsuario");
    document.getElementById("nav").innerHTML = "";
    window.cambiarPagina?.("app", "./components/Login.html");
    return;
  } else {
    window.cambiarPagina?.("app", `./components/${viewEscogido}.html`);
  }
});
