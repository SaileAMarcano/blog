document.addEventListener("DOMContentLoaded", function () {
    const posts = document.querySelectorAll(".post");

    posts.forEach(post => {

        post.addEventListener("click", function (event) {

            if (event.target.closest('.zona-comentarios')) {
                return;
            }

            const yaEstaActivo = post.classList.contains("activa");

            // cerrar todos
            posts.forEach(p => p.classList.remove("activa"));

            // SI SE VA A ABRIR → aplicar animación FLIP
            if (!yaEstaActivo) {

                // -------- FIRST --------
                const first = post.getBoundingClientRect();

                // activar estado final
                post.classList.add("activa");

                // -------- LAST --------
                const last = post.getBoundingClientRect();

                // -------- INVERT --------
                const deltaX = first.left - last.left;
                const deltaY = first.top - last.top;
                const scaleX = first.width / last.width;
                const scaleY = first.height / last.height;

                post.style.transform = `
                    translate(${deltaX}px, ${deltaY}px)
                    scale(${scaleX}, ${scaleY})
                `;

                post.offsetWidth; // reflow

                // -------- PLAY --------
                post.style.transform = "";
            }
        });

        const zona = post.querySelector(".zona-comentarios");
        if (zona) {
            zona.addEventListener("click", function (e) {
                e.stopPropagation();
            });
        }
    });
});
// 1. Inicialización de Supabase
const supabaseURL = "https://ibchhjwgidtbsjsyitvj.supabase.co";
const supabaseKey = "sb_publishable_kKY5zFT9wfHOU_6XRZxazQ_AnjcLuCe";
const supabaseClient = supabase.createClient(supabaseURL, supabaseKey);

document.addEventListener("DOMContentLoaded", function () {
    const posts = document.querySelectorAll(".post");

    posts.forEach(post => {
        // Evento principal para abrir/cerrar libros y cargar comentarios
        post.addEventListener("click", function (event) {
            
            // Evitamos que la tarjeta se cierre si hacemos clic en la zona de comentarios
            if (event.target.closest('.zona-comentarios')) {
                return;
            }

            const yaEstaActivo = post.classList.contains("activa");

            // Cerramos todos los demás posts
            posts.forEach(p => p.classList.remove("activa"));

            // Si el que tocamos no estaba abierto, lo abrimos
            if (!yaEstaActivo) {
                post.classList.add("activa");

                // --- TOQUE 3: CARGA AUTOMÁTICA ---
                // Buscamos el ID del libro dinámicamente desde el input que está dentro de este post
                const input = post.querySelector('input[id^="input-"]');
                if (input) {
                    // Extraemos el nombre (ej. de "input-hercules" sacamos "hercules")
                    const libroId = input.id.replace('input-', ''); 
                    obtenerComentarios(libroId); 
                }
            }
        });

        // Detenemos la propagación del clic en la zona de comentarios por seguridad extra
        const zona = post.querySelector(".zona-comentarios");
        if (zona) {
            zona.addEventListener("click", function (e) {
                e.stopPropagation();
            });
        }
    });
});

// 2. Función para GUARDAR comentarios
async function enviarComentario(libroId) {
    const input = document.getElementById(`input-${libroId}`);
    const texto = input.value.trim();

    if (texto === "") return;

    const { error } = await supabaseClient
        .from("comentarios")
        .insert([{ libro: libroId, comentario: texto }]);

    if (error) {
        console.error("Error al guardar:", error);
    } else {
        input.value = ""; // Limpiar el campo de texto
        obtenerComentarios(libroId); // Refrescar la lista inmediatamente
    }
}

// 3. Función para MOSTRAR comentarios (obtener de Supabase)
async function obtenerComentarios(libroId) {
    const contenedor = document.getElementById(`comentarios-${libroId}`);
    
    // Si por algún motivo el div de comentarios no existe, salimos de la función
    if (!contenedor) return;

    const { data, error } = await supabaseClient
        .from("comentarios")
        .select("comentario, created_at")
        .eq("libro", libroId)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error al obtener:", error);
    } else {
        // Dibujamos los comentarios en el HTML
        contenedor.innerHTML = data.map(c => `
            <div class="comentario-item">
                <p>${c.comentario}</p>
                <small>${new Date(c.created_at).toLocaleDateString()} ${new Date(c.created_at).toLocaleTimeString()}</small>
            </div>
        `).join('');
    }
}
