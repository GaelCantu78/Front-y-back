document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login/login.html";
    return;
  }

  const rangoUsuario = localStorage.getItem("rango");
  const sidebar = document.getElementById("sidebar");
  const menuRango = document.getElementById("menuRango");
  const tituloRango = document.getElementById("tituloRango");
  const btnPerfil = document.getElementById("btnPerfil");
  const mainContent = document.querySelector(".main-content");

  // Logout
  document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "login/login.html";
  });

  // =========================
  // Contenido principal inicial
  // =========================
  mainContent.innerHTML = `
    <h1>Bienvenido 🚀</h1>
    <p>Has iniciado sesión correctamente.</p>
  `;

  // =========================
  // Cargar sidebar según rango
  // =========================
  function cargarSidebar(rango) {
    menuRango.innerHTML = "";
    tituloRango.textContent = `Panel ${rango}`;

    if (rango === "Estudiante") {
      menuRango.innerHTML = `
        <button id="btnTareas">📘 Ver Tareas</button>
        <button id="btnCursos">📚 Ver Cursos</button>
      `;
    } else if (rango === "Maestro") {
      menuRango.innerHTML = `
        <button id="btnNuevaTarea">📝 Crear Tarea</button>
        <button id="btnVerTareas">📋 Ver Tareas</button>
      `;
    } else if (rango === "Administrador") {
      menuRango.innerHTML = `
        <button id="btnUsuarios">👤 Gestión de Usuarios</button>
        <button id="btnConfig">🔧 Configuración del Sistema</button>
      `;
    } else {
      menuRango.innerHTML = `<p>No hay opciones disponibles.</p>`;
    }
  }
  cargarSidebar(rangoUsuario);

  // Mostrar / ocultar sidebar
  btnPerfil.addEventListener("click", () => {
    sidebar.classList.add("visible");
  });
  sidebar.addEventListener("mouseleave", () => {
    sidebar.classList.remove("visible");
  });

  // =========================
  // Acciones del sidebar
  // =========================
  sidebar.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;

    const id = e.target.id;
    mainContent.classList.add("active");

    // Limpia el contenido antes de cambiar
    mainContent.innerHTML = "";

    // === Estudiante ===
    if (rangoUsuario === "Estudiante") {
      if (id === "btnTareas") renderTareasEstudiante();
      if (id === "btnCursos") renderCursosEstudiante();
    }

    // === Maestro ===
    if (rangoUsuario === "Maestro") {
      if (id === "btnNuevaTarea") renderFormularioTarea();
      if (id === "btnVerTareas") renderVistaTareas();
    }

    // === Administrador ===
    if (rangoUsuario === "Administrador") {
      mainContent.innerHTML = `
        <div style="color:white;text-align:center;">
          <h2>Panel de Administración</h2>
          <p>Sección en construcción...</p>
        </div>
      `;
    }
  });

  // =========================
  // Funciones de renderizado
  // =========================

  // Estudiante — Lista de tareas
  function renderTareasEstudiante() {
    mainContent.innerHTML = `
      <h2>📘 Tareas Asignadas</h2>
      <div class="card-grid">
        <div class="card">
          <h4>Matemáticas</h4>
          <p>Resolver ejercicios de álgebra. Entrega: 10/10/2025</p>
        </div>
        <div class="card">
          <h4>Historia</h4>
          <p>Leer el capítulo 4 y responder las preguntas.</p>
        </div>
        <div class="card">
          <h4>Inglés</h4>
          <p>Ensayo corto sobre "My Favorite Movie".</p>
        </div>
      </div>
    `;
  }

  // Estudiante — Lista de cursos
  function renderCursosEstudiante() {
    mainContent.innerHTML = `
      <h2>📚 Tus Cursos</h2>
      <div class="card-grid">
        <div class="card"><h4>Matemáticas</h4><p>Profesor: Sr. García</p></div>
        <div class="card"><h4>Historia</h4><p>Profesor: Sra. López</p></div>
        <div class="card"><h4>Inglés</h4><p>Profesor: Mr. Johnson</p></div>
      </div>
    `;
  }

  // Maestro — Formulario de nueva tarea
  function renderFormularioTarea() {
    mainContent.innerHTML = `
      <form class="task-form">
        <h3>📝 Crear Nueva Tarea</h3>

        <label for="nombre">Nombre de la tarea</label>
        <input type="text" id="nombre" placeholder="Ej: Ensayo sobre energía solar">

        <label for="descripcion">Descripción</label>
        <textarea id="descripcion" placeholder="Escribe aquí los detalles de la tarea..."></textarea>

        <label for="archivo">Contenido o Archivos</label>
        <input type="file" id="archivo" multiple>

        <button type="submit">Guardar Tarea</button>
      </form>
    `;

    const form = document.querySelector(".task-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("✅ Tarea creada exitosamente (demo)");
    });
  }

  // Maestro — Vista de tareas creadas
  function renderVistaTareas() {
    mainContent.innerHTML = `
      <h2>📋 Tareas Publicadas</h2>
      <div class="card-grid">
        <div class="card"><h4>Lectura Capítulo 2</h4><p>Publicada el 01/10/2025</p></div>
        <div class="card"><h4>Ejercicios de Física</h4><p>Publicada el 03/10/2025</p></div>
      </div>
    `;
  }
});
