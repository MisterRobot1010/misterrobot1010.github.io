let selectedFile
let URLOfExcelFile = "https://misterrobot1010.github.io/assets/PGD_Base%20de%20datos_ORIGINAL.xlsx"
let allOfData = []
let responseFromAllOfData
let rangeForShowCoincidences = {
    amountOfElements: 10, //Amount for show by page   
    begin: 0,
    end: null,
    showButtonForward: null,
    showButtonBackward: null,
    numberOfPages: null
}
let responseFromAllOfDataInText = []
let columns = ["Autor", "Carpeta", "Código", "Fecha dd/mm/aaaa", "Lugar", "Marca temporal", "Observaciones", "Otros [Firma]", "Otros [Notas]", "Otros [Subrayado]", "Si el tema es docencia, indicar aquí la materia", "Tamaño del documento", "Tema [2]", "Tema: Filosofía [Filosofía]", "Tipo de documento", "Título"]

let functions = {
    removeAccents: (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    },
    setForRangeCoincidencesInitial: () => {
        rangeForShowCoincidences = {
            ...rangeForShowCoincidences,    
            begin: 0,
            end: null,
            numberOfPages: Math.ceil(responseFromAllOfDataInText.length / rangeForShowCoincidences.amountOfElements)
        }
        

        let end = (rangeForShowCoincidences.amountOfElements - 1)

        if (responseFromAllOfDataInText.length < rangeForShowCoincidences.amountOfElements) {
            end = responseFromAllOfDataInText.length - 1
        }

        rangeForShowCoincidences = {
            ...rangeForShowCoincidences,
            end: end,
            showButtonBackward: false
        }

        //showButtonForward
        //Detect if we are in the finish
        //So, I cannot advance after
        if ((((rangeForShowCoincidences.end - rangeForShowCoincidences.begin) + 1) < rangeForShowCoincidences.amountOfElements) || ((rangeForShowCoincidences.end + 1) == (responseFromAllOfDataInText.length))) {
            rangeForShowCoincidences = {
                ...rangeForShowCoincidences,
                showButtonForward: false
            }
        }
        else {
            rangeForShowCoincidences = {
                ...rangeForShowCoincidences,
                showButtonForward: true
            }
        }
    },
    updateBeginAndEndForRangeCoincidencesForward: () => {
        let end = rangeForShowCoincidences.end + (rangeForShowCoincidences.amountOfElements)

        if (end >= responseFromAllOfDataInText.length) {
            end = responseFromAllOfDataInText.length - 1
        }

        rangeForShowCoincidences = {
            ...rangeForShowCoincidences,
            begin: rangeForShowCoincidences.begin + (rangeForShowCoincidences.amountOfElements),
            end: end,
            showButtonBackward: true
        }

        //Detect if we are in the finish
        //So, I cannot advance after
        if ((((rangeForShowCoincidences.end - rangeForShowCoincidences.begin) + 1) < rangeForShowCoincidences.amountOfElements) || ((rangeForShowCoincidences.end + 1) == (responseFromAllOfDataInText.length))) {
            rangeForShowCoincidences = {
                ...rangeForShowCoincidences,
                showButtonForward: false
            }
        }
    },
    updateBeginAndEndForRangeCoincidencesBackward: () => {
        let end = rangeForShowCoincidences.begin - 1
        let begin = rangeForShowCoincidences.begin - rangeForShowCoincidences.amountOfElements
        rangeForShowCoincidences = {
            ...rangeForShowCoincidences,
            begin: begin,
            end: end,
            showButtonForward: true
        }

        //Detect if we are in the beginning
        //So, I cannot backward
        if (rangeForShowCoincidences.begin == 0) {
            rangeForShowCoincidences = {
                ...rangeForShowCoincidences,
                showButtonBackward: false
            }
        }
    },
    justUpdateBeginAndEnd: () => {
        //Forward
        rangeForShowCoincidences = {
            ...rangeForShowCoincidences,
            showButtonForward: true
        }

        //Detect if we are in the finish
        //So, I cannot advance after
        if ((((rangeForShowCoincidences.end - rangeForShowCoincidences.begin) + 1) < rangeForShowCoincidences.amountOfElements) || ((rangeForShowCoincidences.end + 1) == (responseFromAllOfDataInText.length))) {
            rangeForShowCoincidences = {
                ...rangeForShowCoincidences,
                showButtonForward: false
            }
        }

        //Backward
        rangeForShowCoincidences = {
            ...rangeForShowCoincidences,
            showButtonBackward: true
        }

        //Detect if we are in the beginning
        //So, I cannot backward
        if (rangeForShowCoincidences.begin == 0) {
            rangeForShowCoincidences = {
                ...rangeForShowCoincidences,
                showButtonBackward: false
            }
        }
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
    returnCorrectData: (data) => {
        let correctData = functions.eraseSpacesFromBeginningAndFinal(data)
        correctData = functions.convertMultipleSpacesToOneSpace(correctData)
        correctData = functions.removeAccents(correctData).toLowerCase()

        return correctData
    }
}

let events = {
    showResponseFromAllOfDataInText: () => {
        let coincidencesContainer = document.getElementById("all-of-coincidences")
        let allCoincidences = ""
        //Coincidence

        
        for (let i = rangeForShowCoincidences.begin; i <= rangeForShowCoincidences.end; i++) {
            allCoincidences += responseFromAllOfDataInText[i]
        }
        coincidencesContainer.innerHTML = ""
        coincidencesContainer.innerHTML = allCoincidences

        document.querySelectorAll(".coincidences .coincidence").forEach((element) => {
            element.addEventListener("click", (e) => {
                let coincidence = null

                e.path.forEach(component => {
                    
                    if (component.classList) {
                        if (component.classList.contains("coincidence")) {
                            coincidence = component
                        }
                    }
                })
                
                let index = Array.from(coincidence.parentElement.children).indexOf(coincidence)

                let indexInResponseFromAllOfData = (rangeForShowCoincidences.begin) + index

                //let selectedCoincidence = responseFromAllOfData[indexInResponseFromAllOfData]
                
                /* 
                    array = [
                        {
                            indexInAllOfData: 19,
                            code: "D0001"
                        }
                    ]
                */
                
                let objectWithInfoCoincidence = {
                    code: responseFromAllOfData[indexInResponseFromAllOfData]["Código"],
                    indexInAllOfData: null
                }

                allOfData.forEach((d, indexD) => {
                    if (d["Código"] === objectWithInfoCoincidence.code) {
                        objectWithInfoCoincidence = {
                            ...objectWithInfoCoincidence,
                            indexInAllOfData: indexD
                        }
                    } 
                })

                let coincidencesForSend = [objectWithInfoCoincidence]

                location.href = "./single-view-coincidences.html?coincidences=" + (JSON.stringify(coincidencesForSend))
            })
        })

        //Buttons y numOfPages
        let controlCoincidencesCointainer = document.querySelectorAll(".coincidences-container .control-coincidences")[0]
        controlCoincidencesCointainer.style.display = "flex"
        console.log(controlCoincidencesCointainer)

        let buttonForward = document.querySelectorAll(".coincidences-container .forward-button")[0]
        let buttonBackward = document.querySelectorAll(".coincidences-container .backward-button")[0]
        let listOfNumbersOfPages = document.querySelectorAll(".coincidences-container .numbers-of-pages")[0]

        if (rangeForShowCoincidences.showButtonBackward) {
            buttonBackward.style.display = "flex"
        }
        else {
            buttonBackward.style.display = "none"
        }

        if (rangeForShowCoincidences.showButtonForward) {
            buttonForward.style.display = "flex"
        }
        else {
            buttonForward.style.display = "none"
        }

        
        let allPages = ""
        for (let i = 1; i <= rangeForShowCoincidences.numberOfPages; i++) {

            allPages += `
                <a class="page" href="#">${i}</a>
            `
             
        }

        listOfNumbersOfPages.innerHTML = allPages

        document.querySelectorAll(".control-coincidences .numbers-of-pages .page").forEach(element => {
            element.addEventListener("click", (e) => {
                e.preventDefault()

                let selectedPage = parseInt(e.target.innerHTML)

                console.log(selectedPage)
                
                //Modify rangeForShowCoincidences.begin
                selectedPage -= 1
                rangeForShowCoincidences = {
                    ...rangeForShowCoincidences,
                    begin: (selectedPage) * (rangeForShowCoincidences.amountOfElements)
                }
                
                //Modify rangeForShowCoincidences.end
                selectedPage += 1
                
                if (selectedPage == rangeForShowCoincidences.numberOfPages) {
                    rangeForShowCoincidences = {
                        ...rangeForShowCoincidences,
                        end: responseFromAllOfDataInText.length - 1
                    }
                }
                else {
                    rangeForShowCoincidences = {
                        ...rangeForShowCoincidences,
                        end: rangeForShowCoincidences.begin + (rangeForShowCoincidences.amountOfElements - 1)
                    }
                }

                functions.justUpdateBeginAndEnd()
                events.showResponseFromAllOfDataInText()
                
            })            
        })

        document.querySelectorAll(".coincidences-container .amount-coincidences .content").forEach(containerOfAmount => {
            containerOfAmount.innerHTML = (responseFromAllOfDataInText.length === 0 ? "Mostrando 0 - 0 de 0 resultados." : "Mostrando " + (rangeForShowCoincidences.begin + 1) + " - " + (rangeForShowCoincidences.end + 1) + " de " + (responseFromAllOfDataInText.length) + (responseFromAllOfDataInText.length === 1 ? " resultado" : " resultados"))
        })
    },
    getBeginAndEndWithNumberOfPage: (num) => {
        
    },
    fillResponseFromAllOfDataInText: () => {
        responseFromAllOfDataInText = []
        responseFromAllOfData.forEach(element => {
            let actualElementInText = `
                <div class="coincidence">
                    <div class="photo-container">
                        <div class="photo">

                        </div>
                    </div>
                    <div class="info-container">
                        <div class="title">
                            <span>Título: ${element["Título"]}</span>
                        </div>
                        <div class="code">
                            <span class="text-column">Código:&nbsp;</span>
                            <span class="text-info">${element["Código"]}</span>
                        </div>
                        <div class="author">
                            <span class="text-column">Autor:&nbsp;</span>
                            <span class="text-info">${element["Autor"]}</span>
                        </div>
                        <div class="topic">
                            <span class="text-column">Tema:&nbsp;</span>
                            <span class="text-info">${element["Tema [2]"]}</span>
                        </div>
                        <div class="subtopic">
                            <span class="text-column">Subtema:&nbsp;</span>
                            <span class="text-info">${element["Si el tema es docencia, indicar aquí la materia"]}</span>
                        </div>
                    </div>
                </div>
            `
            responseFromAllOfDataInText.push(actualElementInText)
        })
        functions.setForRangeCoincidencesInitial()
    },
    returnEqualitiesInData: (initialData) => {
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

        let equalities = []
        let actualEquality
        initialIndex = null
        let finalIndex = null
        let actualPhrase
        
        sentences.forEach((sen) => {
            //sen[0] = a || - || `"`
            actualEquality = null
            initialIndex = null
            finalIndex = null
            actualPhrase = ""

            if (sen[0] === `"`) {
                initialIndex = 1
                finalIndex = sen.length - 2

                for (let i = initialIndex; i <= finalIndex; i++) {
                    actualPhrase += sen[i]
                }

                actualEquality = {
                    phrase: actualPhrase,
                    comparison: "similar"
                }
            }
            else if (sen[0] === "-") {
                if (sen[1] === `"`) {
                    initialIndex = 2
                    finalIndex = sen.length - 2
                }
                else {
                    initialIndex = 1
                    finalIndex = sen.length - 1
                }

                for (let i = initialIndex; i <= finalIndex; i++) {
                    actualPhrase += sen[i]
                }

                actualEquality = {
                    phrase: actualPhrase,
                    comparison: "different"
                }
            }
            else {
                actualEquality = {
                    phrase: sen,
                    comparison: "similar"
                }
            }

            equalities.push(actualEquality)
        })

        return equalities
    },
    comparisonWithText: (record, equalities, column) => {
        //record[Autor], record[Carpeta], etc.
        //equalities
        let stateOfActualEquality = null
        let columnsForSearch
        let firstData
        let secondData
        let secondDataInArray
        let actualColumn
        let counterOfJustWords = 0 //Not negatives
        let someWordInTrue = false

        if (column === "All(string)") {
            columnsForSearch = columns
        }
        else {
            columnsForSearch = []
            columnsForSearch.push(column)
        }

        let statesOfEqualities = []

        //Para retornar este record, todas las equalities me tienen que devolver true
        //Caso especial: Si hay 3 o más "palabras solamente", retorna true automaticamente

        equalities.forEach(eq => {
            stateOfActualEquality = false
            firstData = eq.phrase //"titulo"

            if ((!firstData.includes(" ")) && (eq.comparison === "similar")) {
                counterOfJustWords++
            }

            secondData = null
            secondDataInArray = null
            actualColumn = null

            for (let i = 0; (i < columnsForSearch.length) && (!stateOfActualEquality) ; i++) {
                actualColumn = columnsForSearch[i]
                if (typeof record[actualColumn] === "string") {
                    secondData = functions.removeAccents(record[actualColumn]).toLowerCase() // "del libro"
                    secondDataInArray = secondData.split(" ")

                    for (let j = 0; (j < secondDataInArray.length) && (!stateOfActualEquality) ; j++) {
                        //secondDataInArray[j]
                        if (secondDataInArray[j] === firstData) {
                            stateOfActualEquality = true
                            someWordInTrue = true
                        }
                    }

                    if (secondData.includes(firstData)) {
                        stateOfActualEquality = true
                    }
                }
            }

            if ((eq.comparison === "similar") && (stateOfActualEquality)) {
                //Alguna columna tendrá que retornar true
                statesOfEqualities.push(true)
            }
            else if ((eq.comparison === "different") && (!stateOfActualEquality)) {
                //Todas tienen que retornar false
                statesOfEqualities.push(true)
            }
            else {
                statesOfEqualities.push(false)
            }
        })
        
        if (((counterOfJustWords >= 3) && (someWordInTrue)) || (!statesOfEqualities.includes(false))) {
            return true
        }
        else {
            return false
        }
    },
    comparisonWithDate: () => {},
    search: (clauses) => {
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
        let coincidences = []
        let correctClauses = []
        let correctCoincidence
        let stateOfActualClause

        for (let i = 0; i < allOfData.length; i++) {
            //allOfData[i] => actualRecord
            correctClauses = []
            correctCoincidence = null
            for (let j = 0; j < clauses.length; j++) {
                //clauses[j].data
                stateOfActualClause = false
                if (clauses[j].dataType === "text") {
                    stateOfActualClause = events.comparisonWithText(allOfData[i], events.returnEqualitiesInData(clauses[j].data), clauses[j].column)
                }
                else if (clauses[j].dataType === "date") {
                    alert("Hay fechas involucradas")
                }

                correctClauses.push(stateOfActualClause)
            }

            if (!correctClauses.includes(false)) {
                coincidences.push(i)
            }
        }

        let coincidentObjects = []
        coincidences.forEach(element => {
            coincidentObjects.push(allOfData[element])
        });
        responseFromAllOfData = coincidentObjects

        events.fillResponseFromAllOfDataInText()
    },
    easySearch: (data, typeOfEasySearch) => {
        let coincidences = []
        for (let i = 0; i < allOfData.length; i++) {
            columns.forEach(column => {
                //allOfData[i][column]
                if (typeOfEasySearch === "exact") {
                    //Preguntar a la maestra cómo comparamos las fechas, porque son numeros, y tienen muchos formatos
                    if (typeof allOfData[i][column] === "string") {
                        if (allOfData[i][column] === data) {
                            if (!coincidences.includes(i)) {
                                coincidences.push(i)
                            }
                        }
                    }
                }
                else if (typeOfEasySearch === "similar") {
                    if (typeof allOfData[i][column] === "string") {
                        if (functions.removeAccents(allOfData[i][column].toLowerCase()).includes(functions.removeAccents(data.toLowerCase()))) {
                            if (!coincidences.includes(i)) {
                                coincidences.push(i)
                            }
                        }
                    }
                }
                else if (typeOfEasySearch === "not") {
                    if (typeof allOfData[i][column] === "string") {
                        if (!functions.removeAccents(allOfData[i][column].toLowerCase()).includes(functions.removeAccents(data.toLowerCase()))) {
                            if (!coincidences.includes(i)) {
                                coincidences.push(i)
                            }
                        }
                    }
                }
            })
        }

        let coincidentObjects = []
        coincidences.forEach(element => {
            coincidentObjects.push(allOfData[element])
        });
        responseFromAllOfData = coincidentObjects

        events.fillResponseFromAllOfDataInText()
    },
    hardSearch: (array) => {
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
        //El ser humano no siempre será perfecto, y no pondrá tal cual la palabra
        //Así que está por defecto que tengamos que convertir a lowercase y quitar signos extraños

        /*
        Autor: Abraham
        Título: Tiempo
        */
        let coincidences = []

        //First, fill fastly
        for (let i = 0; i < allOfData.length; i++) {
            coincidences.push(i)
        }

        let comprobationForAdd
        let firstData
        let secondData
        let filteredCoincidences

        array.forEach((element) => {
            
            if (element.dataType === "text") {

                filteredCoincidences = []

                coincidences.forEach((c) => {
                    comprobationForAdd = false
                    firstData = ""
                    secondData = ""

                    if (allOfData[c][element.column]) {
                        firstData = functions.removeAccents(allOfData[c][element.column].toLowerCase())
                        secondData = functions.removeAccents(element.data.toLowerCase())

                        if ((element.condition === "es exactamente") && (firstData === secondData)) {
                            comprobationForAdd = true
                        }
                        else if ((element.condition === "es similar a") && (firstData.includes(secondData))) {
                            comprobationForAdd = true
                        }
                        else if ((element.condition === "no es") && !(firstData.includes(secondData))) {
                            //Tambien involucra "no es" y "no incluye"
                            comprobationForAdd = true
                        }

                    }

                    if (comprobationForAdd) {
                        if (!filteredCoincidences.includes(c)) {
                            filteredCoincidences.push(c)
                        }
                    }
                })

                coincidences = filteredCoincidences
            }
            else {
                alert("Hay un tipo de dato de número siendo evaluado en la búsqueda.")
            }
        })

        //Aquí me quede
        let coincidentObjects = []
        coincidences.forEach(element => {
            coincidentObjects.push(allOfData[element])
        });
        responseFromAllOfData = coincidentObjects

        events.fillResponseFromAllOfDataInText()
    },
    getAllCoincidencesForColumn: (column) => {
        let array = []
        allOfData.forEach(element => {
            //I need if this comparation is with exactly, o no need exactly
            //By default, "no exactly" 
            if (!array.includes(element[column])) {
                array.push(element[column])
            }
        })
        return array
    },
    searchColumnOfTextInAllOfData: (data, column) => {
        let array = []
        allOfData.forEach(element => {
            //I need if this comparation is with exactly, o no need exactly
            //By default, "no exactly" 
            
            
            if (functions.removeAccents(element[column].toLowerCase()).includes(functions.removeAccents(data.toLowerCase()))) {
                console.log(array.push(element))
            }
            
        })
        responseFromAllOfData = array
        
    },
    getAllOfDataAndShowCoincidences: async () => {
        let promise = await fetch(URLOfExcelFile)
            .then(res => res.blob())
            .then(data => {
                let fileReader = new FileReader()
                fileReader.readAsBinaryString(data)
                fileReader.onload = (event) => {
                    let data = event.target.result
                    let workbook = XLSX.read(data, {type: "binary"})
                    workbook.SheetNames.forEach(sheet => {
                        allOfData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
                        console.log("Hecho")
                        let url = new URL(window.location.href)
                        request = JSON.parse(url.searchParams.get("request"))
                        console.log(request)

                        events.search(request.clauses)
                        events.showResponseFromAllOfDataInText()
                        
                        /*
                        if (request.type === "easy") {
                            events.easySearch(request.object.data, request.object.typeOfEasySearch)
                            events.showResponseFromAllOfDataInText()
                        }
                        else if (request.type === "hard") {
                            events.hardSearch(request.array)
                            events.showResponseFromAllOfDataInText()
                        }
                        */
                    })
                }
            })
            .catch(e => {
                console.log(e)
            })
    }
}

/*
document.getElementById("input").addEventListener("change", (event) => {
    selectedFile = event.target.files[0]
})

document.getElementById("button").addEventListener("click", async () => {
    if (true) {
        
    }
})
*/
document.querySelectorAll(".coincidences-container .backward-button")[0].addEventListener("click", () => {
    functions.updateBeginAndEndForRangeCoincidencesBackward()
    events.showResponseFromAllOfDataInText()
})

document.querySelectorAll(".coincidences-container .forward-button")[0].addEventListener("click", () => {
    functions.updateBeginAndEndForRangeCoincidencesForward()
    events.showResponseFromAllOfDataInText()
})
/*
document.querySelectorAll(".easy-search-container .exact")[0].addEventListener("click", () => {
    let data = document.querySelectorAll(".easy-search-container .easy-search-text")[0].value
    events.easySearch(data, "exact")
    events.showResponseFromAllOfDataInText()
})

document.querySelectorAll(".easy-search-container .no-exact")[0].addEventListener("click", () => {
    let data = document.querySelectorAll(".easy-search-container .easy-search-text")[0].value
    events.easySearch(data, "no exact")
    events.showResponseFromAllOfDataInText()
})
*/

events.getAllOfDataAndShowCoincidences()