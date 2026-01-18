console.log('JS CARGADO BIEN! YUPIIII');

const btn = document.querySelector("#saludar");

console.log('Boton', btn);

if (btn) {
    btn.addEventListener("click", () => {
        console.log("CLICK");
        alert("hola");
    });
}