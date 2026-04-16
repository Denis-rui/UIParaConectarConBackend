window.abrirModalReserva = (modo = "nuevo", datos = null) => {
  const contenedor = document.getElementById("contenedorModal");

  fetch("./components/Modal-Dashboard.html")
    .then((res) => res.text())
    .then((data) => {
      contenedor.innerHTML = data;

      const modal = document.getElementById("modalReserva");
      const cerrar = document.getElementById("cerrarModal");
      const form = document.getElementById("formReserva");

      // Mostrar el contenedor y el modal
      contenedor.style.display = "block";
      modal.style.display = "block";

      cerrar.addEventListener("click", () => {
        modal.style.display = "none";
        contenedor.style.display = "none";
      });

      if (modo === "editar" && datos) {
        document.getElementById("nombre").value = datos.nombre;
        document.getElementById("email").value = datos.email;
        document.getElementById("tiReserva").value = datos.tipoReserva;
        document.getElementById("fechaEntrada").value = datos.fechaEntrada;
        document.getElementById("horaEntrada").value = datos.horaEntrada;
        document.getElementById("fechaSalida").value = datos.fechaSalida;
        document.getElementById("horaSalida").value = datos.horaSalida;
        document.querySelector('select[name="habitacion"]').value =
          datos.habitacion;
        document.getElementById("TipoPago").value = datos.tipoPago;
        document.getElementById("total").value = datos.total;
      }
      form.addEventListener("submit", (e) => {
        e.preventDefault(); // --- Evita recargar la página ---

        // --- Ejecutamos la validación ---
        if (validarFormulario()) {
          alert(
            modo === "nuevo"
              ? "Reserva guardada con éxito ✨"
              : "Reserva actualizada con éxito ✏️",
          );

          // --- Cerramos el modal ---
          modal.style.display = "none";
          contenedor.style.display = "none";
          form.reset();
        }
      });

      function validarFormulario() {
        let valido = true;

        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const fechaEntrada = document.getElementById("fechaEntrada").value;
        const fechaSalida = document.getElementById("fechaSalida").value;
        const horaEntrada = document.getElementById("horaEntrada").value;
        const horaSalida = document.getElementById("horaSalida").value;
        const habitacion = document.querySelector(
          'select[name="habitacion"]',
        ).value;
        const TipoPago = document.getElementById("TipoPago").value;

        // Validación de Nombre
        if (nombre === "") {
          valido = false;
          alert("Nombre y Apellido obligatorio");
        }
        // Validación de Email
        if (email === "") {
          valido = false;
          alert("Correo electrónico obligatorio.");
        } else if (!email.includes("@") || !email.includes(".")) {
          valido = false;
          alert("Correo electrónico no válido.");
        }

        // Validación de Fechas
        if (fechaEntrada === "") {
          valido = false;
          alert("Fecha de check-in obligatoria.");
        }
        if (fechaSalida === "") {
          valido = false;
          alert("Fecha de check-out obligatoria.");
        }

        if (fechaEntrada && fechaSalida && fechaEntrada > fechaSalida) {
          valido = false;
          alert(
            "La fecha de check-out debe ser posterior a la fecha de check-in.",
          );
        }

        if (horaEntrada === "") {
          valido = false;
          alert("Hora de entrada obligatoria.");
        }
        if (horaSalida === "") {
          valido = false;
          alert("Hora de salida obligatoria.");
        }

        if (habitacion === "") {
          valido = false;
          alert("Seleccione una habitación.");
        }

        if (TipoPago === "") {
          valido = false;
          alert("Seleccione un tipo de pago.");
        }
        return valido;
      }
    });
};

window.configurarBtnNuevaReserva = () => {
  const btn = document.getElementById("btnNuevaReserva");
  if (!btn) return;

  btn.addEventListener("click", () => {
    window.abrirModalReserva("nuevo");
  });
};
