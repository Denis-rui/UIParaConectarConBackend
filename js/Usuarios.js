let listaUsuarios = [
  {
    id: 1,
    nombre: "Juan Pérez",
    usuario: "admin",
    gmail: "admin@gmail.com",
    telefono: "987654321",
    dni: "12345678",
    rol: "administrador",
    password: "123",
  },
  {
    id: 2,
    nombre: "Ana López",
    usuario: "recepcion",
    gmail: "recepcion@gmail.com",
    telefono: "912345678",
    dni: "87654321",
    rol: "recepcionista",
    password: "456",
  },
];

let textoBusquedaUsuarios = "";

const normalizarTextoBusqueda = (texto) => texto.toLowerCase().trim();

const obtenerUsuariosFiltradosPorNombre = () => {
  const criterioBusqueda = normalizarTextoBusqueda(textoBusquedaUsuarios);

  if (!criterioBusqueda) return listaUsuarios;

  return listaUsuarios.filter((usuario) =>
    normalizarTextoBusqueda(usuario.nombre).includes(criterioBusqueda),
  );
};

const renderizarTablaUsuarios = (usuariosAMostrar = listaUsuarios) => {
  const cuerpoTabla = document.getElementById("contenido-usuarios");
  if (!cuerpoTabla) return;

  cuerpoTabla.innerHTML = "";
  usuariosAMostrar.forEach((usuario) => {
    cuerpoTabla.innerHTML += `<tr>
      <td>${usuario.id}</td>
      <td>${usuario.nombre}</td>
      <td>${usuario.usuario}</td>
      <td>${usuario.gmail || ""}</td>
      <td>${usuario.telefono || ""}</td>
      <td>${usuario.dni || ""}</td>
      <td>${usuario.rol}</td>
      <td>
        <button type="button" class="btnEditar" data-id="${usuario.id}">✏️</button>
        <button type="button" class="btnEliminar" data-id="${usuario.id}">🗑️</button>
      </td>
    </tr>`;
  });
};

const obtenerSiguienteIdUsuario = () => {
  if (listaUsuarios.length === 0) return 1;
  const idMaximo = Math.max(
    ...listaUsuarios.map((usuario) => Number(usuario.id)),
  );
  return idMaximo + 1;
};

const guardarUsuario = (datosUsuario) => {
  const nuevoUsuario = {
    ...datosUsuario,
    id: obtenerSiguienteIdUsuario(),
  };

  listaUsuarios.push(nuevoUsuario);
  renderizarTablaUsuarios(obtenerUsuariosFiltradosPorNombre());
};

const actualizarUsuario = (datosUsuario) => {
  const idBuscado = Number(datosUsuario.id);
  const indiceUsuario = listaUsuarios.findIndex((usuario) => {
    if (Number(usuario.id) === idBuscado) {
      return true;
    } else {
      return false;
    }
  });

  if (indiceUsuario === -1) return;

  listaUsuarios[indiceUsuario] = {
    ...listaUsuarios[indiceUsuario],
    ...datosUsuario,
    id: idBuscado,
  };

  renderizarTablaUsuarios(obtenerUsuariosFiltradosPorNombre());
};

const eliminarUsuarioPorId = (idUsuario) => {
  listaUsuarios = listaUsuarios.filter((usuario) => {
    if (Number(usuario.id) !== Number(idUsuario)) {
      return true;
    } else {
      return false;
    }
  });
  renderizarTablaUsuarios(obtenerUsuariosFiltradosPorNombre());
};

const abrirModalParaEditar = (idUsuario) => {
  const usuarioSeleccionado = listaUsuarios.find((usuario) => {
    if (Number(usuario.id) === Number(idUsuario)) {
      return true;
    }
    return false;
  });

  if (!usuarioSeleccionado) return;

  window.abrirModalUsuario("editar", usuarioSeleccionado);
};

const configurarEventosUsuarios = () => {
  const botonNuevoUsuario = document.getElementById("btnNuevoUsuario");
  const cuerpoTabla = document.getElementById("contenido-usuarios");
  const inputBuscarUsuario = document.getElementById("inputBuscarUsuario");

  if (botonNuevoUsuario) {
    botonNuevoUsuario.addEventListener("click", () => {
      window.abrirModalUsuario("nuevo");
    });
  }

  if (cuerpoTabla) {
    cuerpoTabla.addEventListener("click", (evento) => {
      const botonEditar = evento.target.closest(".btnEditar");
      if (botonEditar) {
        abrirModalParaEditar(botonEditar.dataset.id);
        return;
      }

      const botonEliminar = evento.target.closest(".btnEliminar");
      if (botonEliminar) {
        eliminarUsuarioPorId(botonEliminar.dataset.id);
      }
    });
  }

  if (inputBuscarUsuario) {
    inputBuscarUsuario.addEventListener("input", (evento) => {
      textoBusquedaUsuarios = evento.target.value;
      renderizarTablaUsuarios(obtenerUsuariosFiltradosPorNombre());
    });
  }
};

window.inicializarUsuarios = () => {
  renderizarTablaUsuarios(obtenerUsuariosFiltradosPorNombre());
  configurarEventosUsuarios();
};

window.obtenerListaUsuarios = () => listaUsuarios;
window.registrarUsuarioNuevo = guardarUsuario;
window.actualizarUsuarioExistente = actualizarUsuario;
