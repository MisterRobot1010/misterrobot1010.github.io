let i = 0;
let limit = 1;

let array = [
    [
        `
        <video src="./assets/videos/mining.mp4" autoplay muted loop></video>
        <div class="content">
            <h2>Industría de la minería</h2>
            <br>
            <span>Es representada por la explotación o extracción de los minerales que se han acumulado en el suelo y subsuelo en forma de yacimientos</span>
        </div>
        `,
        `
        <video src="./assets/videos/medicine.mp4" autoplay muted loop></video>
        <div class="content">
            <h2>Industría de la medicina</h2>
            <br>
            <span>Rama de la industria que se dedica al descubrimiento, desarrollo, fabricación y comercialización de medicamentos para la salud</span>
        </div>
        `,
        `
        <video src="./assets/videos/textile.mp4" autoplay muted loop></video>
        <div class="content">
            <h2>Industria textil</h2>
            <br>
            <span>Sector de la industria dedicado a la producción de fibras (naturales y sintéticas), hilados, telas y productos relacionados con la confección de ropa</span>
        </div>
        `
    ],
    [
        `
        <video src="./assets/videos/metal.mp4" autoplay muted loop></video>
        <div class="content">
            <h2>Industría metalúrgica</h2>
            <br>
            <span>Técnica de la obtención y tratamiento de los metales a partir de minerales metálicos, ademas de estudiar la producción de aleaciones</span>
        </div>
        `,
        `
        <video src="./assets/videos/food.mp4" autoplay muted loop></video>
        <div class="content">
            <h2>Industría de la comida</h2>
            <br>
            <span>Encargada de transformar la materia prima de origen animal y vegetal en alimentos que se llevarán al mercado para el consumo directo</span>
        </div>
        `,
        `
        <video src="./assets/videos/automobile.mp4" autoplay muted loop></video>
        <div class="content">
            <h2>Industria automotríz</h2>
            <br>
            <span>Es un conjunto de compañías y organizaciones relacionadas en las áreas de diseño, desarrollo, manufactura, marketing y ventas de automóviles.</span><span>&nbsp;¡Vamos a conocer más sobre esta industria!</span>
        </div>
        `
    ]
]

let events = {
    buttonFunction: (next) => {
        let box1 = document.querySelectorAll(".box.box1")
        box1[0].innerHTML = array[next][0];

        let box2 = document.querySelectorAll(".box.box2")
        box2[0].innerHTML = array[next][1];

        let box3 = document.querySelectorAll(".box.box3")
        box3[0].innerHTML = array[next][2];
    }
}

console.log("Hola mundo")

let box = document.querySelectorAll(".box")
box.forEach(popup => popup.addEventListener("click", () => {
    popup.classList.toggle("active")

    let controls = document.querySelectorAll(".controls")
    controls[0].classList.toggle("hide")
    controls[0].classList.toggle("show")
}))

let nextButton = document.querySelectorAll(".next")
nextButton[0].addEventListener("click", () => {
    console.log("Lo presionaste")
    if (i == limit) {
        i = 0
    }
    else {
        i++
    }
    events.buttonFunction(i)
})

let prevButton = document.querySelectorAll(".prev")
prevButton[0].addEventListener("click", () => {
    console.log("Lo presionaste")
    if (i == 0) {
        i = limit
    }
    else {
        i--
    }
    events.buttonFunction(i)
})