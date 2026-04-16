const cambiarPagina = (id, archivo) => {
  fetch(archivo)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById(id).innerHTML = html;

      if (id === "app" && archivo.includes("Usuarios.html")) {
        window.inicializarUsuarios();
      }
      if (id === "app" && archivo.includes("Configuracion.html")) {
        setTimeout(() => {
          window.inicializarConfiguraciones();
        }, 0);
      }
      if (
        id === "app" &&
        (archivo.includes("Dashboard.html") ||
          archivo.includes("Reservas.html"))
      ) {
        setTimeout(() => {
          window.configurarBtnNuevaReserva();
        }, 0);
      }
      if (id === "app" && archivo.includes("Habitaciones.html")) {
        setTimeout(() => {
          console.log("Configurando btn nueva habitacion");
          window.configurarBtnNuevaHabitacion?.();
        }, 0);
      }

      if (id === "app" && archivo.includes("Reservas.html")) {
        setTimeout(() => {
          window.inicializarReservas?.();
        }, 0);
      }
    })
    .catch((error) => console.error("Error cargando página:", error));
};

// Exponer en window para que sea accesible desde otros scripts
window.cambiarPagina = cambiarPagina;

const logueado = localStorage.getItem("logueado");

if (logueado === "true") {
  cambiarPagina("nav", "./components/Nav.html");
  cambiarPagina("app", "./components/Dashboard.html");
} else {
  cambiarPagina("app", "./components/Login.html");
}
