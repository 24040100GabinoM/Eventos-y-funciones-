// ==================== VARIABLES GLOBALES ====================
const btnNav = document.querySelectorAll('.btn-nav');
const secciones = document.querySelectorAll('.seccion');
const modal = document.getElementById('modal');
const btnCerrarModal = document.getElementById('btn-cerrar-modal');
const formularioContacto = document.getElementById('formulario-contacto');
const btnComenzar = document.getElementById('btn-comenzar');

// Estadísticas
let estadisticas = {
    juegos: 0,
    victorias: 0,
    puntos: 0,
    nivel: 1
};

// ==================== EVENTOS DE NAVEGACIÓN ====================
/**
 * Maneja los clics en los botones de navegación
 * Cambia entre secciones y actualiza el estado activo
 */
btnNav.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remover clase activa de todos los botones
        btnNav.forEach(b => b.classList.remove('activo'));
        
        // Agregar clase activa al botón clickeado
        this.classList.add('activo');
        
        // Obtener la sección a mostrar
        const seccionId = this.getAttribute('data-seccion');
        mostrarSeccion(seccionId);
    });
});

/**
 * Muestra la sección solicitada y oculta las demás
 * @param {string} idSeccion - ID de la sección a mostrar
 */
function mostrarSeccion(idSeccion) {
    secciones.forEach(seccion => {
        seccion.classList.remove('activa');
    });
    
    const seccionActiva = document.getElementById(idSeccion);
    if (seccionActiva) {
        seccionActiva.classList.add('activa');
    }
}

// ==================== EVENTOS DE JUEGOS ====================
/**
 * Maneja los clics en los botones de juegos
 * Muestra un modal con información del juego seleccionado
 */
const botonesJuegos = document.querySelectorAll('.btn-juego');
botonesJuegos.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const tarjeta = this.closest('.tarjeta-juego');
        const nombreJuego = tarjeta.querySelector('h3').textContent;
        const juegoId = tarjeta.getAttribute('data-juego');
        
        mostrarModalJuego(nombreJuego, juegoId);
    });
});

/**
 * Muestra un modal con información del juego
 * @param {string} nombreJuego - Nombre del juego
 * @param {string} juegoId - ID del juego
 */
function mostrarModalJuego(nombreJuego, juegoId) {
    const mensajeJuego = obtenerMensajeJuego(juegoId);
    mostrarModal(nombreJuego, mensajeJuego);
}

/**
 * Retorna un mensaje personalizado según el juego
 * @param {string} juegoId - ID del juego
 * @returns {string} Mensaje del juego
 */
function obtenerMensajeJuego(juegoId) {
    const mensajes = {
        'cyber-runner': '¡Prepárate para una carrera a velocidad extrema! Esquiva obstáculos y alcanza la meta. ¿Puedes superar tu récord personal?',
        'neon-battle': '¡Que comience la batalla! Derrota a tus oponentes en arenas luminosas. El ganador será el último en pie.',
        'void-quest': '¡Bienvenido a las dimensiones desconocidas! Resuelve misterios antiguos y descubre secretos del universo.',
        'quantum-maze': '¡Tu mente es tu mejor arma! Navega por laberintos complejos y desbloquea el código cuántico.'
    };
    
    return mensajes[juegoId] || '¡Comienza tu aventura!';
}

// ==================== EVENTOS DE ESTADÍSTICAS ====================
/**
 * Incrementa una estadística específica
 * @param {string} tipo - Tipo de estadística a incrementar
 */
function incrementarStat(tipo) {
    if (tipo === 'nivel') {
        estadisticas.nivel++;
    } else if (tipo === 'juegos') {
        estadisticas.juegos++;
    } else if (tipo === 'victorias') {
        estadisticas.victorias++;
    } else if (tipo === 'puntos') {
        estadisticas.puntos += 100;
    }
    
    actualizarPantallaDatos();
    reproducirSonidoExito();
}

/**
 * Actualiza la visualización de las estadísticas en pantalla
 */
function actualizarPantallaDatos() {
    document.getElementById('stat-juegos').textContent = estadisticas.juegos;
    document.getElementById('stat-victorias').textContent = estadisticas.victorias;
    document.getElementById('stat-puntos').textContent = estadisticas.puntos;
    document.getElementById('stat-nivel').textContent = estadisticas.nivel;
    
    // Actualizar barra de experiencia
    const porcentajeExp = Math.min(estadisticas.puntos % 500 / 5, 100);
    const barraExp = document.getElementById('barra-exp');
    if (barraExp) {
        barraExp.style.width = porcentajeExp + '%';
        barraExp.parentElement.parentElement.querySelector('span').textContent = Math.round(porcentajeExp) + '%';
    }
}

// ==================== EVENTOS DE FORMULARIO ====================
/**
 * Maneja el envío del formulario de contacto
 */
formularioContacto.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;
    
    if (nombre.trim() && email.trim() && mensaje.trim()) {
        procesarFormulario(nombre, email, mensaje);
    }
});

/**
 * Procesa el envío del formulario y muestra un modal de confirmación
 * @param {string} nombre - Nombre del usuario
 * @param {string} email - Email del usuario
 * @param {string} mensaje - Mensaje del usuario
 */
function procesarFormulario(nombre, email, mensaje) {
    console.log('Formulario enviado:', { nombre, email, mensaje });
    
    const mensajeExito = `¡Hola ${nombre}! Tu mensaje ha sido enviado exitosamente. Responderemos a ${email} pronto.`;
    mostrarModal('MENSAJE ENVIADO', mensajeExito);
    
    // Limpiar formulario
    formularioContacto.reset();
    
    // Reproducir sonido de éxito
    reproducirSonidoExito();
}

// ==================== FUNCIONES DE MODAL ====================
/**
 * Muestra el modal con un título y mensaje personalizado
 * @param {string} titulo - Título del modal
 * @param {string} mensaje - Mensaje del modal
 */
function mostrarModal(titulo, mensaje) {
    document.getElementById('modal-titulo').textContent = titulo;
    document.getElementById('modal-mensaje').textContent = mensaje;
    modal.classList.add('activo');
}

/**
 * Cierra el modal
 */
function cerrarModal() {
    modal.classList.remove('activo');
}

/**
 * Maneja el cierre del modal al hacer clic en el botón de cerrar
 */
btnCerrarModal.addEventListener('click', cerrarModal);

/**
 * Cierra el modal al hacer clic fuera del contenido
 */
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        cerrarModal();
    }
});

/**
 * Cierra el modal al presionar la tecla ESC
 */
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        cerrarModal();
    }
});

// ==================== EVENTOS DEL BOTÓN COMENZAR ====================
/**
 * Maneja el clic en el botón "Comenzar Partida"
 */
btnComenzar.addEventListener('click', function() {
    const mensajeComenzar = '¡Tu aventura ha comenzado! Selecciona un juego de nuestro catálogo para empezar.';
    mostrarModal('¡BIENVENIDO!', mensajeComenzar);
    
    // Cambiar a la sección de juegos después de un pequeño retraso
    setTimeout(() => {
        cerrarModal();
        document.querySelector('[data-seccion="juegos"]').click();
    }, 2000);
});

// ==================== EFECTOS DE SONIDO ====================
/**
 * Reproduce un sonido de éxito (visual, sin audio real)
 */
function reproducirSonidoExito() {
    // Efecto visual de vibración/pulso
    const elemento = document.querySelector('.contenedor-principal');
    elemento.style.animation = 'none';
    
    setTimeout(() => {
        elemento.style.animation = 'pulsoExito 0.3s ease';
    }, 10);
}

// Agregar animación de pulso en CSS dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes pulsoExito {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.02);
        }
    }
`;
document.head.appendChild(style);

// ==================== EVENTOS DE INTERACTIVIDAD ADICIONAL ====================
/**
 * Agrega interactividad a las tarjetas de juegos
 * Efecto de luz que sigue al mouse
 */
const tarjetasJuegos = document.querySelectorAll('.tarjeta-juego');
tarjetasJuegos.forEach(tarjeta => {
    tarjeta.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.style.boxShadow = `
            0 0 20px rgba(0, 255, 65, 0.3),
            ${x - rect.width / 2}px ${y - rect.height / 2}px 30px rgba(255, 0, 110, 0.2)
        `;
    });
    
    tarjeta.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'var(--sombra-neon), var(--sombra-neon-rosa), inset 0 0 20px rgba(0, 255, 65, 0.2)';
    });
});

// ==================== INICIALIZACIÓN ====================
/**
 * Inicializa la página
 */
function inicializar() {
    console.log('🚀 Sistema NEXUS GAMING inicializado');
    
    // Establecer la sección de inicio como activa
    mostrarSeccion('inicio');
    
    // Marcar el primer botón de navegación como activo
    btnNav[0].classList.add('activo');
    
    // Cargar estadísticas guardadas (si existen)
    cargarEstadisticas();
    
    // Animación de entrada suave
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
}

/**
 * Carga las estadísticas del almacenamiento local
 */
function cargarEstadisticas() {
    const statsGuardadas = localStorage.getItem('estadisticasNexus');
    if (statsGuardadas) {
        estadisticas = JSON.parse(statsGuardadas);
        actualizarPantallaDatos();
    }
}

/**
 * Guarda las estadísticas en almacenamiento local
 */
function guardarEstadisticas() {
    localStorage.setItem('estadisticasNexus', JSON.stringify(estadisticas));
}

// Guardar estadísticas cada 10 segundos
setInterval(guardarEstadisticas, 10000);

// Guardar estadísticas antes de cerrar la página
window.addEventListener('beforeunload', guardarEstadisticas);

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializar);

// ==================== FUNCIONES AUXILIARES ====================
/**
 * Muestra la hora actual en la consola
 */
function mostrarHora() {
    const ahora = new Date();
    console.log(`⏰ ${ahora.toLocaleTimeString('es-ES')}`);
}

/**
 * Muestra un mensaje de bienvenida en la consola
 */
console.log('%c🎮 NEXUS GAMING - Portal Futurista', 'color: #00ff41; font-size: 20px; font-weight: bold; text-shadow: 0 0 20px rgba(0, 255, 65, 0.5)');
console.log('%cDesarrollado con HTML, CSS y JavaScript', 'color: #00d9ff; font-size: 14px');
console.log('%c¡Bienvenido a la experiencia gaming del futuro!', 'color: #ff006e; font-size: 12px');
