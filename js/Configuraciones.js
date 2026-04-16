window.inicializarConfiguraciones = () => {
  const formulario = document.getElementById("formulario");

  formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    validarFormulario();
  });

  // -- Función ---
  function validarFormulario() {
    limpiarErrores();
    let valido = true;

    const nombre_hotel = formulario.querySelector("#nombre");
    const ruc = formulario.querySelector("#ruc");
    const telefono = formulario.querySelector("#telefono");
    const correo = formulario.querySelector("#email");

    if (nombre_hotel.value.trim() === "") {
      mostrarError(nombre_hotel, "error-nombre", "El nombre es obligatorio");
      valido = false;
    }

    if (ruc.value.trim().length !== 11 || isNaN(ruc.value)) {
      mostrarError(ruc, "error-ruc", "El RUC debe tener 11 dígitos");
      valido = false;
    }

    if (telefono.value.trim().length < 9 || telefono.value.trim().length > 9) {
      mostrarError(telefono, "error-telefono", "Teléfono inválido");
      valido = false;
    }

    if (!correo.value.includes("@") || !correo.value.includes(".")) {
      mostrarError(correo, "error-email", "Correo inválido");
      valido = false;
    }

    if (valido) {
      alert("Formulario válido");
    }
  }

  function mostrarError(input, idError, mensaje) {
    const error = document.getElementById(idError);
    error.textContent = mensaje;
    input.classList.add("input-error");
  }

  function limpiarErrores() {
    const errores = formulario.querySelectorAll(".error");
    errores.forEach((e) => (e.textContent = ""));

    const inputs = formulario.querySelectorAll(".form-input");
    inputs.forEach((i) => i.classList.remove("input-error"));
  }
};
