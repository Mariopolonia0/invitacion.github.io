const inputNombre = document.querySelector('#nombre');
const inputNumero = document.querySelector('#numero');

//ul se uso para ver la lista hay que quitarlo despues del ejemplo
const list = document.querySelector('ul');

//Debajo de las declaraciones constantes, agrega las siguientes líneas:
let db;

//A continuación, agrega lo siguiente al final de tu código:
window.onload = function () { };

let request = window.indexedDB.open("notes_os", 1);

// un controlador de error significa que la base de datos no se abrió correctamente
request.onerror = function () {
    console.log("No se pudo abrir la base de datos");
};

// controlador onsuccess significa que la base de datos se abrió correctamente
request.onsuccess = function () {
    console.log("Base de datos abierta con éxito");

    // Almacena el objeto de base de datos abierto en la variable db. Esto se usa mucho a continuación
    db = request.result;

    // Ejecute la función displayData() para mostrar las notas que ya están en la IDB
    displayData();
};

// Configura las tablas de la base de datos si esto aún no se ha hecho
request.onupgradeneeded = function (e) {
    // Toma una referencia a la base de datos abierta
    let db = e.target.result;

    // Crea un objectStore para almacenar nuestras notas (básicamente como una sola tabla)
    // incluyendo una clave de incremento automático
    let objectStore = db.createObjectStore("notes_os", {
        keyPath: "id",
        autoIncrement: true,
    });

    // Define qué elementos de datos contendrá el objectStore
    objectStore.createIndex("Nombre", "Nombre", { unique: true });
    objectStore.createIndex("Numero", "Numero", { unique: false });

    console.log("Configuración de la base de datos completa");
};

function displayData() {

    let objectStore = db.transaction("notes_os").objectStore("notes_os");
    objectStore.openCursor().onsuccess = function (e) {
        // Obtiene una referencia al cursor
        let cursor = e.target.result;

        // Si todavía hay otro elemento de datos para iterar, sigue ejecutando este código
        if (cursor) {
            // Crea un elemento de lista, h3 y p para poner cada elemento de datos dentro al mostrarlo
            // estructura el fragmento HTML y lo anexa dentro de la lista
            const listItem = document.createElement("li");
            const h3 = document.createElement("h3");
            const para = document.createElement("p");

            listItem.appendChild(h3);
            listItem.appendChild(para);
            list.appendChild(listItem);

            // Coloca los datos del cursor dentro de h3 y para
            h3.textContent = cursor.value.Nombre;
            para.textContent = cursor.value.Numero;

            // Almacena el ID del elemento de datos dentro de un atributo en listItem, para que sepamos
            // a qué elemento corresponde. Esto será útil más adelante cuando queramos eliminar elementos.
            listItem.setAttribute("data-note-id", cursor.value.id);

            // Crea un botón y lo coloca dentro de cada listItem
            // const deleteBtn = document.createElement("button");
            // listItem.appendChild(deleteBtn);
            //deleteBtn.textContent = "Delete";

            // Establece un controlador de eventos para que cuando se hace clic en el botón, el elemento deleteItem()
            // se ejecuta la función
            // deleteBtn.onclick = deleteItem;

            // Iterar al siguiente elemento del cursor
            cursor.continue();
        } else {
            // Nuevamente, si el elemento de la lista está vacío, muestra el mensaje 'No hay notas almacenadas'
            if (!list.firstChild) {
                const listItem = document.createElement("li");
                listItem.textContent = "No hay notas almacenadas.";
                list.appendChild(listItem);
            }
            // si no hay más elementos de cursor para iterar, dilo
            console.log("Se muestran todas las notas");
        }
    };

}

function add() {
    let newItem = { Nombre: inputNombre.value, Numero: inputNumero.value };

    // abre una transacción de base de datos de lectura/escritura, lista para agregar los datos
    let transaction = db.transaction(["notes_os"], "readwrite");

    // llama a un almacén de objetos que ya se ha agregado a la base de datos
    let objectStore = transaction.objectStore("notes_os");

    // Hacer una solicitud para agregar nuestro objeto newItem al almacén de objetos
    let request = objectStore.add(newItem);

    request.onsuccess = function () {
        // Limpiar el formulario, listo para agregar la siguiente entrada
        inputNombre.value = "";
        inputNumero.value = "";
    };

    transaction.oncomplete = function () {
        console.log(
            "Transacción completada: modificación de la base de datos finalizada.",
        );
    }

    transaction.onerror = function () {
        console.log("Transacción no abierta debido a error");
    };
}

function Enviar() {

    try {
        add()

        // const dbPromise = idb.open('test-db1', 1);
    } catch (ex) {
        alert("Error: " + ex)
        console.log(ex)
    }
}