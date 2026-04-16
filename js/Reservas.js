const reservas = [
  {
    id: 1,
    nombre: "Juan Pérez",
    email: "juan@gmail.com",
    habitacion: "Suite Deluxe",
    tipoReserva: "Normal",
    fechaEntrada: "2024-07-01",
    horaEntrada: "14:00",
    fechaSalida: "2024-07-05",
    horaSalida: "12:00",
    tipoPago: "contado",
    total: 500,
    estado: "Confirmada",
  },
  {
    id: 2,
    nombre: "María Gómez",
    email: "maria@gmail.com",
    habitacion: "Habitación Doble",
    tipoReserva: "Promo",
    fechaEntrada: "2024-07-02",
    horaEntrada: "13:00",
    fechaSalida: "2024-07-06",
    horaSalida: "11:00",
    tipoPago: "yape",
    total: 300,
    estado: "Pendiente",
  },
];

window.inicializarReservas = () => {
  renderizarReservas();
  configurarEventosReservas();
  const buscarReserva = document.getElementById("inputBuscarReserva");
  const estadoSeleccionadoFiltro = document.getElementById("filtroEstado");

  if (!buscarReserva || !estadoSeleccionadoFiltro) return;

  const aplicarFiltros = () => {
    const nombreBuscar = buscarReserva.value.toLowerCase();
    const estadoSeleccionado = estadoSeleccionadoFiltro.value.toLowerCase();
    const filas = document.querySelectorAll("#contenido-reservas tr");
    filas.forEach((fila) => {
      const nombre = fila.children[0].textContent.toLowerCase();
      const estado = fila.children[5].textContent.toLocaleLowerCase();
      if (
        nombre.includes(nombreBuscar) &&
        (estadoSeleccionado === "" || estado === estadoSeleccionado)
      ) {
        fila.style.display = "";
      } else {
        fila.style.display = "none";
      }
    });
  };

  buscarReserva.addEventListener("input", () => {
    aplicarFiltros();
  });

  estadoSeleccionadoFiltro.addEventListener("change", () => {
    aplicarFiltros();
  });

  document.addEventListener("click", (e) => {
    const btnEditar = e.target.closest(".btn-editar");
    if (!btnEditar) return;

    const fila = btnEditar.closest("tr");
    const id = Number(fila.dataset.id);
    const reserva = reservas.find((r) => r.id === id);
    abrirModalReserva("editar", reserva);
  });
};

const renderizarReservas = () => {
  const tbody = document.getElementById("contenido-reservas");
  tbody.innerHTML = "";

  reservas.forEach((r) => {
    tbody.innerHTML += `
      <tr data-id="${r.id}">
        <td>${r.nombre}</td>
        <td>${r.habitacion}</td>
        <td>${r.fechaEntrada}</td>
        <td>${r.fechaSalida}</td>
        <td>S/. ${r.total}</td>
        <td>${r.estado}</td>
        <td>
          <button class="btn-editar">✏️</button>
          <button class="btn-cancelar">❌</button>
        </td>
      </tr>
    `;
  });
};

const configurarEventosReservas = () => {
  const btnNuevaReserva = document.getElementById("btnNuevaReserva");
  const cuerpoTabla = document.getElementById("contenido-reservas");

  // --- BOTÓN NUEVA RESERVA ---
  if (btnNuevaReserva) {
    btnNuevaReserva.addEventListener("click", () => {
      window.abrirModalReserva("nuevo");
    });
  }

  // --- BOTONES EDITAR ---
  if (cuerpoTabla) {
    cuerpoTabla.addEventListener("click", (e) => {
      const btnEditar = e.target.closest(".btn-editar");
      if (!btnEditar) return;

      const fila = btnEditar.closest("tr");
      const id = Number(fila.dataset.id);
      const reserva = reservas.find((r) => r.id === id);

      window.abrirModalReserva("editar", reserva);
    });
  }
};
