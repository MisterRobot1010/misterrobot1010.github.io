let countImage = 1;
let limitImage = 6;

let arrayForInfo = [
    `<h1>¿Cómo se llevaría a cabo nuestra solución?</h1>
    <br>
    <span>La manera en la que vamos a solucionar las problemáticas es mediante programas informáticos. Sin embargo, aunque se podría pensar que solamente diseñaremos un modelo y copiaremos y pegaremos este en todos los casos; esto no será así. Cada programa informático tiene que ser diferente, en mayor o menor medida. De esta manera es que llegamos a una metodología de fases la cual nos servirá para cumplir con nuestro propósito.</span>
    `,
    `<h1>1.- Observar y analizar el caso en estudio</h1>
    <br>
    <span>Debido a que todos los usuarios son diferentes, es necesario preguntar sobre para qué será utilizado dicho programa.</span>
    <br>
    <ul>
        <li>¿Quién usará este programa?</li>
        <li>¿Para qué se usará dicho programa?</li>
        <li>¿Cuáles son los problemas que tienes actualmente, y esperas que sean resueltos con este programa?</li>
        <li>¿Te gustaría algún diseño o paleta de colores?</li>
        <li>¿Cuáles son las especificaciones de las computadoras que usarán este programa?</li>
        <li>Hacer dibujos o diagramas de cómo serían las interfaces y funcionamiento del programa</li>
    </ul>
    <br>
    <span>Con las respuestas obtenidas tenemos mucha información sobre qué es lo que quiere el usuario.</span>
    `,
    `<h1>2.- Elaborar bocetos de prueba y presentarlos.</h1>
    <br>
    <span>Las tecnologías que en su mayoría utilizaremos para la elaboración de los programas serán:</span>
    <br>
    <ul>
        <li>Lenguajes de programación: Java, C#, C++, Swift, JavaScript</li>
        <li>IDE's: Visual Studio</li>
        <li>Servidores: HTTP, HTTPS, FTP, Bases de datos, etc.</li>
        <li>Otras tecnologías: Electron, FCM Notifications, Redux, Reac-Native, etc.</li>
    </ul>
    `,
    `<span>Una vez elaborado el boceto de prueba no podemos simplemente entregarlo como producto final. En todo desarrollo siempre hay varias versiones de prueba. Siempre despues de un boceto hay que presentarlo al cliente, y preguntar lo siguiente:</span>
    <br>
    <ul>
        <li>¿Qué es lo que esperabas, y este programa no tiene?</li>
        <li>¿Qué es lo que te hubiera gustado que tuviese este programa?</li>
        <li>¿El diseño te agrada o disgusta?</li>
        <li>¿Qué otras ideas se te han ocurrido en este tiempo?</li>
        <li>Hacer otros dibujos o diagramas de cómo serían las nuevas interfaces o funcionamientos del programa, y preguntar si las adiciones, eliminaciones o actualizaciones ilustradas son adecuadas.</li>
    </ul>
    <br>
    <span>Una vez obtenida la nueva información, hay que elaborar otro u otros bocetos que cada vez más se acerquen a la versión final del producto. Cada vez que obtengamos un boceto relativamente decente, hay que presentarlo y repetir las preguntas anteriormente mencionadas.</span>
    `,
    `
    <h1>3.- Preparar todo para versión de producción y notificar sobre información de contacto</h1>
    <br>
    <span>Cuando hayamos llegado a un boceto de prueba el cual no extraiga nada de información nueva otorgada por las preguntas ofrecidas en la fase 2, aún no es tiempo de entregarlo. Es necesario realizar los siguientes puntos:</span>
    <br>
    <ul>
        <li>Cambiar variables necesarias para producción</li>
        <li>Verificar que se hayan seguido buenas prácticas de desarrollo</li>
        <li>Crear la versión de producto final que estará en los dispositivos de los usuarios</li>
        <li>Comprobar si funciona con propios celulares o computadores (emulados o físicos)</li>
    </ul>
    `,
    `
    <span>Al momento de hacer entrega se informaría sobre cómo usarlo mediante una exposición y/o un manual de usuario. Y, por último, como un programador no siempre puede preveer todos los puntos de falla, es importante informar sobre nuestra información de contacto en caso de errores encontrados. Una parte del servicio es que siempre, o en el tiempo posible, hay que estar dispuestos a resolver dudas y fallas detectadas en el software ofrecido.</span>
    `
]

const events = {
    prevButton: () => {

    },
    nextButton: () => {
        let viewer = document.getElementsByClassName("viewer")[0];

        //animation img
        viewer.classList.add("animation-img1-to-img2");
        viewer.style.background = "url(\"./assets/img/self-driving-cars/img2.jpg\")";
        viewer.style.backgroundPosition = "center center";
        viewer.style.backgroundSize = "cover";
        viewer.style.backgroundRepeat = "no-repeat";

        //animation txt

        //colorear contorno
    },
    setStateOfPresentation: (actual, next) => {
        

        //from 1 to 2
        //from 2 to 1

        //animation img
        //todas tienen que ser jpg
        let viewer = document.getElementsByClassName("viewer")[0];
        let isItTheBeginning = viewer.classList.contains("start");

        //.animation-img-1-2
        let classForAnimationImg = "animation-img-" + actual + "-" + next;
        if (isItTheBeginning) {
            viewer.classList.toggle("start");
        } else {
            //delete all class with ...animation...
            viewer.classList.forEach((value) => {
                if (value.toLowerCase().includes("animation")) {
                    viewer.classList.toggle(value);
                }
            })
        }

        viewer.classList.add(classForAnimationImg);
        viewer.style.background = "url(\"./assets/img/self-driving-cars/img" + (next) + ".jpg\")";
        viewer.style.backgroundPosition = "center center";
        viewer.style.backgroundSize = "cover";
        viewer.style.backgroundRepeat = "no-repeat";


        //animation txt
        let info = document.getElementById("info");

        info.classList.add("animation-info-none");
        info.style.display = "none";

        let content = arrayForInfo[next - 1];

        info.innerHTML = content;

        info.classList.toggle("animation-info-none");
        info.classList.add("animation-info-flex");
        info.style.display = "flex";
        info.classList.toggle("animation-info-flex");


        //contorno
        let pastPreviewImage = document.getElementById("preimg"+actual);
        pastPreviewImage.classList.toggle("active");

        let futurePreviewImage = document.getElementById("preimg"+next);
        futurePreviewImage.classList.toggle("active");

        countImage = next;
    }
}

window.addEventListener("load", () => {
    let nextButton = document.getElementById("next");
    nextButton.addEventListener("click", () => {
        if (countImage < limitImage) {
            events.setStateOfPresentation(countImage, countImage + 1);
        }
    })

    let prevButton = document.getElementById("prev");
    prevButton.addEventListener("click", () => {
        if (countImage > 1) {
            events.setStateOfPresentation(countImage, countImage - 1)
        }
    })
})