document.addEventListener("DOMContentLoaded", () => {
    const encryptBtn = document.querySelector(".btn-1");
    const dencryptBtn = document.querySelector(".btn-2");
    const entradaTexto = document.getElementById("area-texto");
    const contentB = document.querySelector(".main-section-b-content");
    const copiar = document.createElement('button');

    copiar.innerText = 'Copiar';
    copiar.classList.add('content-b-copiar');

    function Encriptar(str) {
        const regex = /[^a-z\s]/;

        if (regex.test(str)) {
            alert("El sistema admite únicamente letras minúsculas")
            location.reload();
            return null;
        }


        let res = [];
        for (let i = 0; i < str.length; i++) {
            let el = str[i];

            if (el === "a") {
                res.push("ai")
            } else if (el === "e") {
                res.push("enter");
            } else if (el === "i") {
                res.push("imes");
            } else if (el === "o") {
                res.push("ober");
            } else if (el === "u") {
                res.push("ufat");
            } else {
                res[i] = el;
            }

        }
        return res.join("")
    }

    //desencriptar
    function Desencriptar(text) {

        let rdo = "";
        let claves = {
            "ai": "a",
            "enter": "e",
            "imes": "i",
            "ober": "o",
            "ufat": "u"
        }

        for (let i = 0; i < text.length; i++) {

            let detectado = false;
            for (const encriptado in claves) {

                if (text.startsWith(encriptado, i)) {
                    rdo += claves[encriptado];

                    i += encriptado.length - 1;
                    detectado = true;
                    break;
                }
            }
            if (!detectado) {
                rdo += text[i];
            }
        }
        return rdo;
    }

    //estilo de botones
    function estiloBotones(activo, inactivo) {
        activo.classList.add("btn-activo");
        activo.classList.remove("btn-inactivo")
        inactivo.classList.add("btn-inactivo");
        inactivo.classList.remove("btn-activo");

    }

    //copiar
    function copiarTexto(texto) {
        navigator.clipboard.writeText(texto).catch(err => {
            console.error("Error al copiar el texto: ", err);
        });
    }

    encryptBtn.addEventListener("click", () => {
        const texto = entradaTexto.value;
        let parrafoNuevo = document.createElement('p');

        if (texto === "") {
            alert("Ingrese un texto a encriptar en minúsculas");
            location.reload(); // Recargar la página
            return null;
        }

        let resultado = Encriptar(texto);

        if (resultado !== null) {

            // Limpiar el contenido actual de .main-section-b-content
            contentB.innerHTML = '';
            entradaTexto.value = '';
            document.querySelectorAll('.el-i').forEach(e => {
                e.style.display = 'none';
            });


            parrafoNuevo.classList.add('content-b-resultado'); 
            contentB.classList.remove("main-section-b-content");
            contentB.classList.add('content-b');

            encryptBtn.classList.remove("btn-1");
            dencryptBtn.classList.remove("btn-2");
            estiloBotones(dencryptBtn, encryptBtn);

            parrafoNuevo.innerHTML = resultado;

            contentB.appendChild(parrafoNuevo);
            contentB.appendChild(copiar);

            copiar.removeEventListener("click", copiarTexto); // Eliminar cualquier evento anterior
            copiar.addEventListener("click", () => {
                copiarTexto(resultado);
            });
          
        }



    });

    dencryptBtn.addEventListener("click", () => {
        const texto = entradaTexto.value;
        let parrafoNuevo = document.createElement('p');

        let desencriptado = Desencriptar(texto);

        if (texto === "") {
            alert("Primero ingrese un texto a desencriptar");
            return null;
        }


        if (desencriptado !== null) {

            // Limpiar el contenido actual de .main-section-b-content
            contentB.innerHTML = '';
            entradaTexto.value = '';
            document.querySelectorAll('.el-i').forEach(e => {
                e.style.display = 'none';
            });

            contentB.classList.remove("main-section-b-content");
            contentB.classList.add("content-b")
            parrafoNuevo.classList.add('content-b-resultado'); // añade clase


            parrafoNuevo.innerHTML = desencriptado;

            contentB.appendChild(parrafoNuevo);
            contentB.appendChild(copiar);

            encryptBtn.classList.remove("btn-1");
            dencryptBtn.classList.remove("btn-2");
            estiloBotones(encryptBtn, dencryptBtn);
        }

        copiar.removeEventListener("click", copiarTexto);
        copiar.addEventListener("click", () => {
            copiarTexto(desencriptado);
        });

    });






});