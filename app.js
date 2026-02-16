document.addEventListener("DOMContentLoaded", function(){

    const imagen = document.getElementById("imagenlibro");
    const texto = document.getElementById("descripcionlibro");

    imagen.addEventListener("click", function(){
        texto.classList.toggle("oculto");
    });

});

document.addEventListener("DOMContentLoaded", function(){

    const imagen = document.getElementById("imagenlibroingles");
    const texto = document.getElementById("descripcionlibroingles");

    imagen.addEventListener("click", function(){
        texto.classList.toggle("oculto");
    });

});
