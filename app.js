document.addEventListener("DOMContentLoaded", function () {

    document.querySelectorAll(".post").forEach(post => {

        const imagen = post.querySelector(".imagenlibro");
        const texto = post.querySelector(".descripcionlibro");

        if (imagen && texto) {
            imagen.addEventListener("click", function (e) {
                e.stopPropagation(); // evita que se active el click del post
                texto.classList.toggle("oculto");
            });
        }

        post.addEventListener("click", function () {

            document.querySelectorAll(".post").forEach(p => {
                if (p !== post) {
                    p.classList.remove("activa");
                }
            });

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

async function cargarComentarios(libro){

    const { data, error } = await supabaseClient
        .from("comentarios")
        .select("*")
        .eq("libro", libro)
        .order("fecha", { ascending: false });

    return data;
}
