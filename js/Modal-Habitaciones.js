const inicializarModalHabitacion = () => {
  const modal = document.getElementById("modalHabitacion");
  const contenedor = document.getElementById("contenedorModal");
  const btnCerrar = document.getElementById("cerrarModalHabitacion");
  const btnCancelar = document.getElementById("btnCancelarHabitacion");
  const form = document.getElementById("formNuevaHabitacion");

  const cerrarModal = () => {
    modal.style.display = "none";
    contenedor.style.display = "none";
    contenedor.innerHTML = ""; // Limpiar el contenedor
  };

  btnCerrar?.addEventListener("click", cerrarModal);
  btnCancelar?.addEventListener("click", cerrarModal);

  // Cerrar al hacer clic fuera del contenido
  //modal?.addEventListener("click", (e) => {
  // if (e.target === modal) cerrarModal();
  //});

  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const numero = document.getElementById("numeroHabitacion").value;
    const tipo = document.getElementById("tipoHabitacion").value.toUpperCase();
    const precio = document.getElementById("precioHabitacion").value;
    const estado = document.getElementById("estadoHabitacion").value;
    const descripcion = document.getElementById("descripcionHabitacion").value;

    if (numero && tipo && precio) {
      const nuevaHabitacion = {
        numero: numero.padStart(2, "0"), // Formato "01", "02", etc.
        tipo: tipo,
        precio: parseFloat(precio).toFixed(2),
        estado: estado,
        descripcion: descripcion,
      };

      window.agregarHabitacion(nuevaHabitacion);
      alert(`Habitación ${numero} guardada con éxito✨`);
      cerrarModal();
    } else {
      alert("Por favor, complete los campos obligatorios.");
    }
  });
};

// Exponer en window
window.inicializarModalHabitacion = inicializarModalHabitacion;
