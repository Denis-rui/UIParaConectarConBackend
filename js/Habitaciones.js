// Datos iniciales de las habitaciones
let habitacionesData = [
  {
    numero: "01",
    tipo: "MATRIMONIAL",
    precio: "180.00",
    estado: "Disponible",
    descripcion:
      "Cama de dos plazas, ducha inglesa, wifi, cable, con vista a la montaña.",
  },
  {
    numero: "02",
    tipo: "MATRIMONIAL",
    precio: "180.00",
    estado: "Mantenimiento",
    descripcion:
      "Cama de dos plazas, ducha inglesa, wifi, cable, con vista a la montaña.",
  },
  {
    numero: "03",
    tipo: "MATRIMONIAL",
    precio: "180.00",
    estado: "Mantenimiento",
    descripcion:
      "Cama de dos plazas, ducha inglesa, wifi, cable, con vista a la montaña.",
  },
  {
    numero: "04",
    tipo: "MATRIMONIAL",
    precio: "180.00",
    estado: "Mantenimiento",
    descripcion:
      "Cama de dos plazas, ducha inglesa, wifi, cable, con vista a la montaña.",
  },
  {
    numero: "05",
    tipo: "MATRIMONIAL",
    precio: "180.00",
    estado: "Disponible",
    descripcion:
      "Cama de dos plazas, ducha inglesa, wifi, cable, con vista a la montaña.",
  },
  {
    numero: "06",
    tipo: "MATRIMONIAL",
    precio: "180.00",
    estado: "Disponible",
    descripcion:
      "Cama de dos plazas, ducha inglesa, wifi, cable, con vista a la montaña.",
  },
  {
    numero: "07",
    tipo: "MATRIMONIAL/DOBLE",
    precio: "200.00",
    estado: "Disponible",
    descripcion:
      "Cama de dos plazas, ducha inglesa, wifi, cable, con vista a la montaña.",
  },
  {
    numero: "08",
    tipo: "SIMPLE",
    precio: "200.00",
    estado: "Disponible",
    descripcion:
      "Cama de dos plazas, ducha inglesa, wifi, cable, con vista a la montaña.",
  },
  {
    numero: "09",
    tipo: "QUEEN",
    precio: "200.00",
    estado: "Disponible",
    descripcion:
      "Cama de dos plazas, ducha inglesa, wifi, cable, con vista a la montaña.",
  },
  {
    numero: "10",
    tipo: "QUEEN",
    precio: "200.00",
    estado: "Reservada",
    descripcion:
      "Cama de dos plazas, ducha inglesa, wifi, cable, con vista a la montaña.",
  },
];

const renderizarHabitaciones = () => {
  const grid = document.getElementById("gridHabitaciones");
  if (!grid) return;

  grid.innerHTML = "";

  habitacionesData.forEach((hab) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = `tarjeta-habitacion ${hab.estado.toLowerCase()}`;

    tarjeta.innerHTML = `
            <div class="habitacion-numero">${hab.numero}</div>
            <div class="habitacion-tipo">${hab.tipo}</div>
            <div class="habitacion-precio">S/ ${hab.precio} <span>/ noche</span></div>
            <div class="habitacion-descripcion">${hab.descripcion}</div>
            <div class="etiqueta-estado">${hab.estado}</div>
        `;

    grid.appendChild(tarjeta);
  });
};

const agregarHabitacion = (nuevaHab) => {
  habitacionesData.unshift(nuevaHab); // Agregar al inicio
  renderizarHabitaciones();
};

// Exportar funciones
window.agregarHabitacion = agregarHabitacion;

const configurarBtnNuevaHabitacion = () => {
  console.log("Iniciando configurarBtnNuevaHabitacion");
  renderizarHabitaciones(); // Renderizar al cargar la sección

  const btn = document.getElementById("btnNuevaHabitacion");
  const contenedor = document.getElementById("contenedorModal");

  if (!btn) {
    console.error("Botón btnNuevaHabitacion no encontrado");
    return;
  }

  btn.addEventListener("click", () => {
    fetch("./components/Modal-Habitaciones.html")
      .then((res) => res.text())
      .then((html) => {
        contenedor.innerHTML = html;
        contenedor.style.display = "block";

        const modal = document.getElementById("modalHabitacion");
        if (modal) {
          modal.style.display = "flex";
          // Inicializar la lógica interna del modal
          window.inicializarModalHabitacion?.();
        }
      })
      .catch((error) =>
        console.error("Error al cargar el modal de habitaciones:", error),
      );
  });
};

// Exponer en window para que main.js pueda llamarlo
window.configurarBtnNuevaHabitacion = configurarBtnNuevaHabitacion;
