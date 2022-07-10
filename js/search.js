let request = {
    type: "", //"easy" "hard"
    array: null,
    object: null
}

let functions = {
    returnCorrectData: (data) => {
        let correctData = functions.eraseSpacesFromBeginningAndFinal(data)
        correctData = functions.convertMultipleSpacesToOneSpace(correctData)
        correctData = functions.removeAccents(correctData).toLowerCase()

        return correctData
    },
    eraseSpacesFromBeginningAndFinal: (data) => {
        let finalData = ""

        //Beginning
        let positionOfBeginning = null
        for (let i = 0; (i < data.length) && (positionOfBeginning === null) ; i++) {
            if (data[i] !== " ") {
                positionOfBeginning = i
            }
        }

        //Final
        let positionOfFinal = null
        for (let i = (data.length - 1); (i >= 0) && (positionOfFinal === null) ; i--) {
            if (data[i] !== " ") {
                positionOfFinal = i
            }
        }

        for (let i = positionOfBeginning; i <= positionOfFinal; i++) {
            finalData += data[i]
        }

        return finalData
    },
    convertMultipleSpacesToOneSpace: (data) => {
        let finalData = ""
        let i = 0
        let initialIndex
        let finalIndex
        let nextCharIsLetter

        if (data.length > 0) {
            while (i < data.length) {
                if (data[i] === " ") {
                    finalData += data[i]
                    initialIndex = i
                    finalIndex = i + 1
                    nextCharIsLetter = false

                    while ((finalIndex < data.length) && (!nextCharIsLetter)) {
                        if (data[finalIndex] !== " ") {
                            nextCharIsLetter = true // => finalIndex
                        }
                        else {
                            finalIndex++
                        }
                    }

                    i = finalIndex
                }
                else {
                    finalData += data[i]
                    i++
                }
            }
        }

        return finalData
    },
    removeAccents: (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    },
}

let events = {
    returnSentencesInData: (initialData) => {
        //word, phrase
        //similar, different

        /* 
            [
                {
                    phrase: "hello" || "hello world",
                    comparison: "similar" || "different"
                }
            ]
        */

        //data = `Hola Mundo "Hola mundo" -Hola -"Hola mundo"`
        let actualSentence
        let searchedChar
        let data = functions.returnCorrectData(initialData)
        let initialIndex
        let indexForNextSentence
        let sentences = []
        if (data.length > 0) {
            let i = 0

            while (i < data.length) {
                actualSentence = ""
                searchedChar = null
                initialIndex = null
                indexForNextSentence = null

                if (data[i] === `"`) {
                    searchedChar = `"`
                    actualSentence += data[i]
                    initialIndex = i + 1
                }
                else if (data[i] === "-") {
                    actualSentence += data[i]
                    initialIndex = i + 1                    

                    if ((i + 1) < data.length) {
                        if (data[i + 1] === `"`) {
                            searchedChar = `"`
                            actualSentence += data[i + 1]
                            initialIndex++
                        }
                        else {
                            searchedChar = " "
                            actualSentence += data[i + 1]
                            initialIndex++
                        }
                    }
                }
                else {
                    searchedChar = " "
                    actualSentence += data[i]
                    initialIndex = i + 1
                }
                
                if (searchedChar !== null) {
                    for (let j = initialIndex; (j < data.length) && (indexForNextSentence === null) ; j++) {
                        if (data[j] !== searchedChar) {
                            actualSentence += data[j]
                        }
                        else {
                            //" " ó `"`
                            if (data[j] === " ") {
                                indexForNextSentence = j + 1
                            }
                            else if (data[j] === `"`) {
                                actualSentence += data[j]
                                indexForNextSentence = j + 2
                            }
                        }
                    }
                }

                //Change
                if (indexForNextSentence === null) {
                    i = data.length
                }
                else {
                    i = indexForNextSentence
                }

                
                if (!sentences.includes(actualSentence)) {
                    sentences.push(actualSentence)
                }
            }
        }

        return sentences
    },
    getClausesOfEasySearch: () => {
        /* 
            clauses = [
                {
                    column: "All(string)" || "Autor" || ...,
                    data: `hello` || `"hello world"` || `-Hello` || `-"Hello World"`, => true
                    dataType: "text" || "date"
                } => true,
                {
                    column: "Autor" || ...,
                    data: `hello` || `"hello world"` || `-Hello` || `-"Hello World"`, => true
                    dataType: "text" || "date"
                } => true,
            ]
        */
        let clauses = []
        let textInput = document.querySelector(".easy-search-text")

        clauses.push({
            column: "All(string)",
            data: textInput.value,
            dataType: "text"
        })

        return clauses
    },
    getClausesOfHardSearch: () => {
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
        let actualSentences = []

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
                    actualCondition = "similar"
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

                    if (actualCondition === "different") {
                        actualSentences = events.returnSentencesInData(actualData)
                        actualData = ""
                        
                        for (let i = 0; i < actualSentences.length; i++) {
                            actualData += "-" + actualSentences[i]

                            if ((i + 1) !== actualSentences.length) {
                                actualData += " "
                            }
                        }
                    }

                    console.log(actualData)
                    
                    
                    actualDataType = "text"

                    actualObject = {
                        column: actualColumn,
                        data: actualData,
                        dataType: actualDataType,
                        /*
                        {
                            column: "All(string)" || "Autor" || ...,
                            data: `hello` || `"hello world"` || `-Hello` || `-"Hello World"`, => true
                            dataType: "text" || "date"
                        }
                        */
                    }

                    array.push(actualObject)
                    
                }
                else {
                    alert("Si escribes algo dentro de una caja, selecciona un modo de búsqueda.")
                    permissionToSearch = false
                }
                
            }
        })

        return array

        /*
        if (permissionToSearch) {
            request = {
                ...request,
                type: "hard",
                array: array,
                object: null
            }
            
            location.href = "./coincidences.html?request=" + (JSON.stringify(request))
        }
        */
    },
    createClauses: () => {
        let selectedSpan = document.querySelector(".area-menu .menu .header .selected")
        
        if (selectedSpan.id === "menu-header-easy-span") {
            request = {
                ...request,
                type: "easy"
            }
        }
        else if (selectedSpan.id === "menu-header-hard-span") {
            request = {
                ...request,
                type: "hard"
            }
        }
    },
    showComponentsFromEasySearch: () => {
        let content = `
            <span>Buscar:</span>
            <input type="text" name="" class="easy-search-text" placeholder="Ej: Autor, Lugar, Título, etc.">

            <br>
            <span>*Si desea buscar por frase exacta escriba entre comillas dobles ("xxx xx xxxx").</span>
            <span>*Si se escriben más de dos palabras sin comillas (""), cada resultado contendrá al menos una.</span>
            <span>*Si desea buscar una frase omitiendo algunas palabras escribimos el signo (-) seguida de la palabra (xxx xx -xxx) o (xxx xx -"xxx xx").</span>
            <br>
            <!--
            <span>Modo de búsqueda:</span>

            <div class="radio-easy-mode">
                <input type="radio" name="group-mode" value="exact" id="radio-easy-exact">
                <label for="radio-easy-exact"><i class="fa-solid fa-equals"></i>Es exactamente...</label>

                <input type="radio" name="group-mode" value="similar" id="radio-easy-similar">
                <label for="radio-easy-similar"><i class="fa-solid fa-s"></i>Es similar...</label>

                <input type="radio" name="group-mode" value="not" id="radio-easy-not">
                <label for="radio-easy-not"><i class="fa-solid fa-not-equal"></i>No es...</label>
            </div>
            -->

            <input type="button" value="Buscar" id="easy-search-button">
        `
        let container = document.querySelectorAll(".area-menu .menu .container")[0]
        container.innerHTML = content

        document.getElementById("easy-search-button").addEventListener("click", () => {
            let data = document.querySelector(".area-menu .menu .container .easy-search-text").value

            console.log()

            request = {
                ...request,
                type: "easy",
                clauses: events.getClausesOfEasySearch(data)
            }

            location.href = "./coincidences.html?request=" + (JSON.stringify(request))
            

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

                    <input type="radio" name="rdbtn-hard-sizedoc" id="rdbtn-hard-sizedoc-not" value="not">
                    <label for="rdbtn-hard-sizedoc-not"><i class="fa-solid fa-not-equal"></i></label>
                </div>
            </div>
            <input type="button" value="Buscar" id="hard-search-button">
        `
        let container = document.querySelectorAll(".area-menu .menu .container")[0]
        container.innerHTML = content

        events.setClickedRdbtnsByDefault()

        document.getElementById("hard-search-button").addEventListener("click", () => {
            request = {
                ...request,
                type: "easy",
                clauses: events.getClausesOfHardSearch()
            }

            location.href = "./coincidences.html?request=" + (JSON.stringify(request))
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
            selection = "similar"
        }
        else if (elements[1].checked) {
            selection = "different"
        }

        return selection
    },
    setClickedRdbtnsByDefault: () => {
        let rdbtns = document.querySelectorAll(`.radio-hard-texts input[type="radio"]`)

        rdbtns.forEach(rdbtn => {
            if (rdbtn.id.includes("exact")) {
                rdbtn.click()
            }
        })
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

