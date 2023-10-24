const inputNombre = document.querySelector('#nombre');
const inputNumero = document.querySelector('#numero');

let url = "http://badaapi.somee.com/api/Invitado"

function Enviar() {

    try {

        $.get(url, function (respuesta) {
            console.log(respuesta)
        }, "JSON")

    } catch (ex) {
        alert("Error: " + ex)
        console.log(ex)
    }
}