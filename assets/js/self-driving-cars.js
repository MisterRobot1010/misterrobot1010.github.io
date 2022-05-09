let countImage = 1;
let limitImage = 6;

let arrayForInfo = [
    `<h1>La mecatrónica</h1>
    <span>transformó completamente la forma en que se crean los autos y, al mismo tiempo se transforma la experiencia del usuario para conducir al ser una actividad tan usual.</span>
    `,
    `<h1>¿Cómo se puede ver afectada esta actividad cotidiana con este tipo de autos inteligentes?</h1>
    <span>Vamos a verlo con unos ejemplos...</span>
    `,
    `<h1>Beneficios</h1><span>&nbsp;de los self-driving cars:</span>
    <ul>
        <li>Optimizan nuestro día a día</li>
        <li>Buscan la mejor ruta de manera inteligente</li>
        <li>Utilizan el mapa de la ciudad de una manera óptima</li>
        <li>Poseen funciones de búsqueda de estacionamiento</li>
        <li>Manejas a través de la app vinculada</li>
    </ul>
    `,
    `<h1>Contras</h1><span>&nbsp;de los self-driving cars:</span>
    <ul>
        <li>Precios elevados</li>
        <li>Infraestructura de la ciudad no siempre apta para utilizarlos</li>
        <li>Baja seguridad del software del auto</li>
        <li>Accidentes ocurridos con la funcion "self-driving"</li>
    </ul>
    `,
    `
    <h1>Precios elevados de los modelos de Tesla:</h1>
    <ul>
        <li>Tesla Model S: $3,194,100.00 MXN</li>
        <li>Tesla Model X: $2,551,300.00 MXN</li>
        <li>Tesla Model 3: $1,303,900.00 MXN</li>
        <li>Tesla Model Y: $1,483,100.00 MXN</li>
    </ul>
    <br/>
    <span>Definitivamente no son accesibles para todo el público</span>
    `,
    `
    <h1>Pero... ¿qué tan seguros son estos autos?</h1>
    <br/>
    <div class="separator">
        <span>1.- Sensores avanzados: pueden contar con hasta 12 sensores avanzados</span>
    </div>
    <div class="separator">
        <span>2.- Cámaras de vídeo: hasta 8 cámaras periféricas con 360° de visibilidad</span>
    </div>
    <div class="separator">
        <span>3.- Redes neuronales: ejecutan y procesan todas las funciones para la computadora principal</span>
    </div>
    <div class="separator">
        <span>4.- Constantes actualizaciones de software</span>
    </div>
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