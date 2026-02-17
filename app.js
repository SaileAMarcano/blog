document.addEventListener("DOMContentLoaded", function () {
    const posts = document.querySelectorAll(".post");

    posts.forEach(post => {
        post.addEventListener("click", function () {
            // 1. Cerramos los otros libros abiertos
            posts.forEach(p => {
                if (p !== post) {
                    p.classList.remove("activa");
                }
            });

            // 2. Togleamos el libro actual
            post.classList.toggle("activa");
        });
    });
});

const supabaseURL ="https://ibchhjwgidtbsjsyitvj.supabase.co";
const supabaseKey ="sb_publishable_kKY5zFT9wfHOU_6XRZxazQ_AnjcLuCe";
const supabaseClient = supabaseKey.createClient(supabaseURL, supabaseKey);

async function guardarComentario(libro, texto) {
    const { data, error } = await supabaseClient
    .from("comentarios")
    .insert([
        {libro: libro, comentario: texto}
    ]);
    if(error){
        console.error(error);
    }
    
}