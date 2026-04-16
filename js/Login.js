document.addEventListener("click", (e) => {
  if (e.target.id === "btnLogin") {
    e.preventDefault();
    const tipoUsuario = document.getElementById("tipousuario").value;
    const usuario = document.getElementById("usuario").value.trim();
    const contrasena = document.getElementById("contrasena").value;

    if (tipoUsuario === "") {
      document.getElementById("error").textContent =
        "Elija un tipo de usuario.";
      document.getElementById("error").classList.add("error-login");
      return;
    }
    if (usuario === "") {
      document.getElementById("error").textContent =
        "Ingrese su nombre de usuario.";
      document.getElementById("error").classList.add("error-login");
      return;
    }
    if (contrasena === "") {
      document.getElementById("error").textContent = "Ingrese su contraseña.";
      document.getElementById("error").classList.add("error-login");
      return;
    }

    // Simulación de autenticación
    if (
      tipoUsuario === "administrador" &&
      usuario === "admin" &&
      contrasena === "admin123"
    ) {
      document.getElementById("error").textContent = "Autenticación exitosa.";
      document.getElementById("error").classList.add("exito-login");
      localStorage.setItem("logueado", "true");
      localStorage.setItem("tipoUsuario", tipoUsuario);

      setTimeout(() => {
        cambiarPagina("nav", "./components/Nav.html");
        cambiarPagina("app", "./components/Dashboard.html");
      }, 2000);
    } else {
      document.getElementById("error").textContent =
        "Credenciales incorrectas.";
      document.getElementById("error").classList.add("error-login");
    }
  }
});
