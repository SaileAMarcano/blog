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