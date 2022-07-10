let request = {
    type: "", //"easy" "hard"
    array: null,
    object: null
}

let events = {
    showComponentsFromEasySearch: () => {
        let content = `
            <span>Buscar:</span>
            <input type="text" name="" class="easy-search-text" placeholder="Ej: Autor, Lugar, Título, etc.">

            <span>Modo de búsqueda:</span>

            <div class="radio-easy-mode">
                <input type="radio" name="group-mode" value="exact" id="radio-easy-exact">
                <label for="radio-easy-exact"><i class="fa-solid fa-equals"></i>Es exactamente...</label>

                <input type="radio" name="group-mode" value="similar" id="radio-easy-similar">
                <label for="radio-easy-similar"><i class="fa-solid fa-s"></i>Es similar...</label>

                <input type="radio" name="group-mode" value="not" id="radio-easy-not">
                <label for="radio-easy-not"><i class="fa-solid fa-not-equal"></i>No es...</label>
            </div>

            <input type="button" value="Buscar" id="easy-search-button">
        `
        let container = document.querySelectorAll(".area-menu .menu .container")[0]
        container.innerHTML = content

        document.getElementById("easy-search-button").addEventListener("click", () => {
            let data = document.querySelector(".area-menu .menu .container .easy-search-text").value

            console.log(data)


            // let rdbtn = document.getElementsByName("group-mode")
            // let typeOfEasySearch

            // if (rdbtn[0].checked) {
            //     typeOfEasySearch = "exact"
            // }
            // else if (rdbtn[1].checked) {
            //     typeOfEasySearch = "similar"
            // }
            // else if (rdbtn[2].checked) {
            //     typeOfEasySearch = "not"
            // }

            // request = {
            //     ...request,
            //     type: "easy",
            //     array: null,
            //     object: {
            //         data: data,
            //         typeOfEasySearch: typeOfEasySearch
            //     }
            // }

            // location.href = "./coincidences.html?request=" + (JSON.stringify(request))
            

            //location.href = "./coincidences.html?data=hola"
        })
    },
    showComponentsFromHardSearch: () => {
        let content = `
            <span>Código:</span>
            <input type="text" name="" id="hard-inputtext-code" class="hard-search-text" placeholder="Ej: D00001">
            <span>Título:</span>
            <div class="area-hard-texts">
                <input type="text" name="" id="hard-inputtext-title" class="hard-search-text" placeholder='Ej: Estética'>
                <div class="radio-hard-texts">
                    <input type="radio" name="rdbtn-hard-title" id="rdbtn-hard-title-exact" value="exact">
                    <label for="rdbtn-hard-title-exact"><i class="fa-solid fa-equals"></i></label>

                    <input type="radio" name="rdbtn-hard-title" id="rdbtn-hard-title-similar" value="similar">
                    <label for="rdbtn-hard-title-similar"><i class="fa-solid fa-s"></i></label>

                    <input type="radio" name="rdbtn-hard-title" id="rdbtn-hard-title-not" value="not">
                    <label for="rdbtn-hard-title-not"><i class="fa-solid fa-not-equal"></i></label>
                </div>
            </div>
            <span>Autor:</span>
            <div class="area-hard-texts">
                <input type="text" name="" id="hard-inputtext-author" class="hard-search-text" placeholder='Ej: Pedro Gómez Danés'>
                <div class="radio-hard-texts">
                    <input type="radio" name="rdbtn-hard-author" id="rdbtn-hard-author-exact" value="exact">
                    <label for="rdbtn-hard-author-exact"><i class="fa-solid fa-equals"></i></label>

                    <input type="radio" name="rdbtn-hard-author" id="rdbtn-hard-author-similar" value="similar">
                    <label for="rdbtn-hard-author-similar"><i class="fa-solid fa-s"></i></label>

                    <input type="radio" name="rdbtn-hard-author" id="rdbtn-hard-author-not" value="not">
                    <label for="rdbtn-hard-author-not"><i class="fa-solid fa-not-equal"></i></label>
                </div>
            </div>
            <span>Lugar:</span>
            <div class="area-hard-texts">
                <input type="text" name="" id="hard-inputtext-place" class="hard-search-text" placeholder='Ej: Monterrey, Nuevo León'>
                <div class="radio-hard-texts">
                    <input type="radio" name="rdbtn-hard-place" id="rdbtn-hard-place-exact" value="exact">
                    <label for="rdbtn-hard-place-exact"><i class="fa-solid fa-equals"></i></label>

                    <input type="radio" name="rdbtn-hard-place" id="rdbtn-hard-place-similar" value="similar">
                    <label for="rdbtn-hard-place-similar"><i class="fa-solid fa-s"></i></label>

                    <input type="radio" name="rdbtn-hard-place" id="rdbtn-hard-place-not" value="not">
                    <label for="rdbtn-hard-place-not"><i class="fa-solid fa-not-equal"></i></label>
                </div>
            </div>
            <span>Tema:</span>
            <div class="area-hard-texts">
                <input type="text" name="" id="hard-inputtext-topic" class="hard-search-text" placeholder='Ej: Filosofía'>
                <div class="radio-hard-texts">
                    <input type="radio" name="rdbtn-hard-topic" id="rdbtn-hard-topic-exact" value="exact">
                    <label for="rdbtn-hard-topic-exact"><i class="fa-solid fa-equals"></i></label>

                    <input type="radio" name="rdbtn-hard-topic" id="rdbtn-hard-topic-similar" value="similar">
                    <label for="rdbtn-hard-topic-similar"><i class="fa-solid fa-s"></i></label>

                    <input type="radio" name="rdbtn-hard-topic" id="rdbtn-hard-topic-not" value="not">
                    <label for="rdbtn-hard-topic-not"><i class="fa-solid fa-not-equal"></i></label>
                </div>
            </div>
            <span>Tipo de documento:</span>
            <div class="area-hard-texts">
                <input type="text" name="" id="hard-inputtext-typedoc" class="hard-search-text" placeholder='Ej: Mecanoescrito'>
                <div class="radio-hard-texts">
                    <input type="radio" name="rdbtn-hard-typedoc" id="rdbtn-hard-typedoc-exact" value="exact">
                    <label for="rdbtn-hard-typedoc-exact"><i class="fa-solid fa-equals"></i></label>

                    <input type="radio" name="rdbtn-hard-typedoc" id="rdbtn-hard-typedoc-similar" value="similar">
                    <label for="rdbtn-hard-typedoc-similar"><i class="fa-solid fa-s"></i></label>

                    <input type="radio" name="rdbtn-hard-typedoc" id="rdbtn-hard-typedoc-not" value="not">
                    <label for="rdbtn-hard-typedoc-not"><i class="fa-solid fa-not-equal"></i></label>
                </div>
            </div>

            <span>Tamaño del documento:</span>
            <div class="area-hard-texts">
                <input type="text" name="" id="hard-inputtext-sizedoc" class="hard-search-text" placeholder='Ej: Carta, Oficio, etc.'>
                <div class="radio-hard-texts">
                    <input type="radio" name="rdbtn-hard-sizedoc" id="rdbtn-hard-sizedoc-exact" value="exact">
                    <label for="rdbtn-hard-sizedoc-exact"><i class="fa-solid fa-equals"></i></label>

                    <input type="radio" name="rdbtn-hard-sizedoc" id="rdbtn-hard-sizedoc-similar" value="similar">
                    <label for="rdbtn-hard-sizedoc-similar"><i class="fa-solid fa-s"></i></label>

                    <input type="radio" name="rdbtn-hard-sizedoc" id="rdbtn-hard-sizedoc-not" value="not">
                    <label for="rdbtn-hard-sizedoc-not"><i class="fa-solid fa-not-equal"></i></label>
                </div>
            </div>
            <input type="button" value="Buscar" id="hard-search-button">
        `
        let container = document.querySelectorAll(".area-menu .menu .container")[0]
        container.innerHTML = content

        document.getElementById("hard-search-button").addEventListener("click", () => {
            /* 
            array = [
                {
                    column: "Autor",
                    condition: "es exactamente || es similar a || no es ",
                    data: "",
                    dataType: "text || date"
                },
                {
                    ...
                }
            ]
            */  
            //Case: Texts
            //If inputtext is void, I won't send
            let array = []
            let actualObject = null
            let actualColumn
            let actualCondition
            let actualData
            let actualDataType
            let permissionToSearch = true

            let allOfInputsTextForTexts = document.querySelectorAll(".hard-search-text")
            allOfInputsTextForTexts.forEach(element => {

                if (element.value !== "") {
                    actualObject = null
                    actualColumn = ""
                    actualCondition = ""
                    actualData = ""
                    actualDataType = ""

                    if (element.id.includes("code")) {
                        actualColumn = "Código"
                        actualCondition = "es exactamente"
                    }
                    else if (element.id.includes("title")) {
                        actualColumn = "Título"
                        actualCondition = events.getSelectionFromHardRdbtnForTexts("title")
                    }
                    else if (element.id.includes("author")) {
                        actualColumn = "Autor"
                        actualCondition = events.getSelectionFromHardRdbtnForTexts("author")
                    }
                    else if (element.id.includes("place")) {
                        actualColumn = "Lugar"
                        actualCondition = events.getSelectionFromHardRdbtnForTexts("place")
                    }
                    else if (element.id.includes("topic")) {
                        actualColumn = "Tema [2]"
                        actualCondition = events.getSelectionFromHardRdbtnForTexts("topic")
                    }
                    else if (element.id.includes("typedoc")) {
                        actualColumn = "Tipo de documento"
                        actualCondition = events.getSelectionFromHardRdbtnForTexts("typedoc")
                    }
                    else if (element.id.includes("sizedoc")) {
                        actualColumn = "Tamaño del documento"
                        actualCondition = events.getSelectionFromHardRdbtnForTexts("sizedoc")
                    }

                    if (!(actualCondition === "" || actualCondition === null)) {
                        actualData = element.value
                        actualDataType = "text"

                        actualObject = {
                            column: actualColumn,
                            condition: actualCondition,
                            data: actualData,
                            dataType: actualDataType
                        }

                        array.push(actualObject)
                    }
                    else {
                        alert("Si escribes algo dentro de una caja, selecciona un modo de búsqueda.")
                        permissionToSearch = false
                    }
                    
                }
            })

            if (permissionToSearch) {
                request = {
                    ...request,
                    type: "hard",
                    array: array,
                    object: null
                }
                
                location.href = "./coincidences.html?request=" + (JSON.stringify(request))
            }

            
        })
    },
    showComponentsEasyOrHardSearch: () => {
        let selectedSpan = document.querySelector(".area-menu .menu .header .selected")
        
        if (selectedSpan.id === "menu-header-easy-span") {
            events.showComponentsFromEasySearch()
        }
        else if (selectedSpan.id === "menu-header-hard-span") {
            events.showComponentsFromHardSearch()
        }
    },
    getSelectionFromHardRdbtnForTexts: (column) => {
        let name = "rdbtn-hard-" + column 
        let elements = document.getElementsByName(name)
        let selection = null

        if (elements[0].checked) {
            selection = "es exactamente"
        }
        else if (elements[1].checked) {
            selection = "es similar a"
        }
        else if (elements[2].checked) {
            selection = "no es"
        }

        return selection
    }
}

document.querySelector(".menu .header #menu-header-easy-span").addEventListener("click", (e) => {
    let hardSpan = document.getElementById("menu-header-hard-span")
    if (hardSpan.classList.contains("selected")) {
        hardSpan.classList.toggle("selected")
    }

    if (!e.target.classList.contains("selected")) {
        e.target.classList.toggle("selected")
        events.showComponentsEasyOrHardSearch()
    }
})

document.querySelector(".menu .header #menu-header-hard-span").addEventListener("click", (e) => {
    let easySpan = document.getElementById("menu-header-easy-span")
    if (easySpan.classList.contains("selected")) {
        easySpan.classList.toggle("selected")
    }

    if (!e.target.classList.contains("selected")) {
        e.target.classList.toggle("selected")
        events.showComponentsEasyOrHardSearch()
    }
})

events.showComponentsEasyOrHardSearch()

