document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById('modal-libro');
    const modalImg = document.getElementById('modal-img');
    const modalInfo = document.getElementById('modal-info');

    // Seleccionamos todos los posts
    document.querySelectorAll('.post').forEach(post => {
        post.addEventListener('click', () => {
            
            // 1. Extraemos la información del post clickeado
            const imgSrc = post.querySelector('.imagenlibro').src;
            const descripcion = post.querySelector('.descripcionlibro').innerHTML;
            const zonaComentarios = post.querySelector('.zona-comentarios').innerHTML;

            // 2. Pasamos esa info al modal
            modalImg.src = imgSrc;
            // Juntamos la descripción y los comentarios dentro del <aside>
            modalInfo.innerHTML = `
                <div class="descripcion-modal">${descripcion}</div>
                <hr style="margin: 15px 0; border: 0; border-top: 1px solid #eee;">
                <div class="zona-comentarios" style="display: flex;">${zonaComentarios}</div>
            `;

            // 3. Abrimos el modal con la función nativa de HTML5
            modal.showModal();
        });
    });

    // Para cerrar el modal si haces clic fuera de la caja blanca
    modal.addEventListener('click', (e) => {
        const dialogDimensions = modal.getBoundingClientRect();
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            modal.close();
        }
    });
});

// Cambiamos el nombre para que coincida exactamente con tu HTML
function enviarComentario(postId) {
    // 1. Extraemos el ID limpio (ej: de 'post-hushhush' saca 'hushhush')
    const idLimpio = postId.split('-')[1];
    
    // 2. Buscamos los elementos en el HTML
    const input = document.getElementById(`input-${idLimpio}`);
    const lista = document.getElementById(`lista-${idLimpio}`);

    // Seguridad: Si no encuentra los elementos, nos avisa en la consola en vez de romperse
    if (!input || !lista) {
        console.error("Error: No se encontró el input o la lista para: " + idLimpio);
        return;
    }

    const texto = input.value.trim();

    if (texto === "") {
        alert("¡Escribe algo antes de comentar! ✨");
        return;
    }

    const nuevoComentario = {
        texto: texto,
        fecha: new Date().toLocaleDateString()
    };

    // Guardar y mostrar
    guardarComentario(postId, nuevoComentario);
    renderizarComentario(lista, nuevoComentario);

    // Limpiar el campo
    input.value = "";
}

function renderizarComentario(contenedor, info) {
    const div = document.createElement('div');
    div.className = 'comentario-item';
    div.innerHTML = `<strong>Usuario:</strong> ${info.texto} <br> <small>${info.fecha}</small>`;
    contenedor.appendChild(div);
}

function guardarComentario(postId, comentario) {
    let comentariosPrevios = JSON.parse(localStorage.getItem(postId)) || [];
    comentariosPrevios.push(comentario);
    localStorage.setItem(postId, JSON.stringify(comentariosPrevios));
}

// Cargar comentarios al iniciar
window.addEventListener('DOMContentLoaded', () => {
    const todosLosPosts = document.querySelectorAll('.post');
    todosLosPosts.forEach(post => {
        const postId = post.id;
        if (postId && postId.includes('-')) {
            const idLimpio = postId.split('-')[1];
            const contenedor = document.getElementById(`lista-${idLimpio}`);
            if (contenedor) {
                const guardados = JSON.parse(localStorage.getItem(postId)) || [];
                guardados.forEach(com => renderizarComentario(contenedor, com));
            }
        }
    });
});
