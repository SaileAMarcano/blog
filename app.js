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
