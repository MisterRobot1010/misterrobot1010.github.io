let selectedFile
let URLOfExcelFile = "https://misterrobot1010.github.io/assets/PGD_Base%20de%20datos_ORIGINAL.xlsx"
let allOfData = []
let responseFromAllOfData
let rangeForShowCoincidences = {
    amountOfElements: 10, //Amount for show by page   
    begin: 0, //Access to position in array
    end: null, //Access to position in array
    showButtonForward: null,
    showButtonBackward: null,
    numberOfPages: null,

    //For menu-control-coincidences-item
    coincidencesPagination: {
        firstPage: null,

        previousPage: null,
        actualPage: null,
        nextPage: null,

        lastPage: null,
    }
}
let responseFromAllOfDataInText = []
let columns = ["Autor", "Carpeta", "Código", "Fecha dd/mm/aaaa", "Lugar", "Marca temporal", "Observaciones", "Otros [Firma]", "Otros [Notas]", "Otros [Subrayado]", "Si el tema es docencia, indicar aquí la materia", "Tamaño del documento", "Tema [2]", "Tema: Filosofía [Filosofía]", "Tipo de documento", "Título"]

let functions = {
    removeAccents: (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    },
    setPaginationOfCoincidences: (actualPage) => {
        //rangeForShowCoincidences.numberOfPages = null
        //actualPage begins from 1 to infinite

        //Easy: 1
        // rangeForShowCoincidences = {
        //     ...rangeForShowCoincidences,
        //     coincidencesPagination: {
        //         ...rangeForShowCoincidences.coincidencesPagination,

        //     }
        // }
        rangeForShowCoincidences = {
            ...rangeForShowCoincidences,
            coincidencesPagination: {
                ...rangeForShowCoincidences.coincidencesPagination,
                actualPage: actualPage       
            }
        }

        //set previous and next page
        if ((actualPage - 1) > 0) {
            rangeForShowCoincidences = {
                ...rangeForShowCoincidences,
                coincidencesPagination: {
                    ...rangeForShowCoincidences.coincidencesPagination,
                    previousPage: actualPage - 1
                }
            }
        }
        else {
            rangeForShowCoincidences = {
                ...rangeForShowCoincidences,
                coincidencesPagination: {
                    ...rangeForShowCoincidences.coincidencesPagination,
                    previousPage: null
                }
            }
        }

        if ((actualPage + 1) <= rangeForShowCoincidences.numberOfPages) {
            rangeForShowCoincidences = {
                ...rangeForShowCoincidences,
                coincidencesPagination: {
                    ...rangeForShowCoincidences.coincidencesPagination,
                    nextPage: actualPage + 1
                }
            }
        }
        else {
            rangeForShowCoincidences = {
                ...rangeForShowCoincidences,
                coincidencesPagination: {
                    ...rangeForShowCoincidences.coincidencesPagination,
                    nextPage: null
                }
            }
        }

        //set first and last page
        if (rangeForShowCoincidences.coincidencesPagination.previousPage !== null) {

            if (rangeForShowCoincidences.coincidencesPagination.previousPage === 1) {
                rangeForShowCoincidences = {
                    ...rangeForShowCoincidences,
                    coincidencesPagination: {
                        ...rangeForShowCoincidences.coincidencesPagination,
                        firstPage: null
                    }
                }
            }
            else {
                rangeForShowCoincidences = {
                    ...rangeForShowCoincidences,
                    coincidencesPagination: {
                        ...rangeForShowCoincidences.coincidencesPagination,
                        firstPage: 1
                    }
                }
            }

        }
        else {
            rangeForShowCoincidences = {
                ...rangeForShowCoincidences,
                coincidencesPagination: {
                    ...rangeForShowCoincidences.coincidencesPagination,
                    firstPage: null
                }
            }
        }

        if (rangeForShowCoincidences.coincidencesPagination.nextPage !== null) {
            if (rangeForShowCoincidences.coincidencesPagination.nextPage === rangeForShowCoincidences.numberOfPages) {
                rangeForShowCoincidences = {
                    ...rangeForShowCoincidences,
                    coincidencesPagination: {
                        ...rangeForShowCoincidences.coincidencesPagination,
                        lastPage: null
                    }
                }
            }
            else {
                rangeForShowCoincidences = {
                    ...rangeForShowCoincidences,
                    coincidencesPagination: {
                        ...rangeForShowCoincidences.coincidencesPagination,
                        lastPage: rangeForShowCoincidences.numberOfPages
                    }
                }
            }
        }
        else {
            rangeForShowCoincidences = {
                ...rangeForShowCoincidences,
                coincidencesPagination: {
                    ...rangeForShowCoincidences.coincidencesPagination,
                    lastPage: null
                }
            }
        }

        let content = ``

        if (rangeForShowCoincidences.showButtonBackward) {
            content += `
                <div class="menu-control-coincidences-item touchable available">
                    <i class="fa-solid fa-angle-left"></i>
                </div>
            `
        }
        else {
            content += `
                <div class="menu-control-coincidences-item">
                    <i class="fa-solid fa-angle-left"></i>
                </div>
            `
        }

        
        if (rangeForShowCoincidences.coincidencesPagination.firstPage !== null) {
            content += `
                <div class="menu-control-coincidences-item touchable">
                    <span>${rangeForShowCoincidences.coincidencesPagination.firstPage}</span>
                </div>
            `
        }

        if ((rangeForShowCoincidences.coincidencesPagination.previousPage !== null) && (rangeForShowCoincidences.coincidencesPagination.firstPage !== null)) {
            if ((rangeForShowCoincidences.coincidencesPagination.previousPage - rangeForShowCoincidences.coincidencesPagination.firstPage) > 1) {
                content += `
                    <div class="menu-control-coincidences-item">
                        <span>...</span>
                    </div>
                `
            }
        }

        if (rangeForShowCoincidences.coincidencesPagination.previousPage !== null) {
            content += `
                <div class="menu-control-coincidences-item touchable">
                    <span>${rangeForShowCoincidences.coincidencesPagination.previousPage}</span>
                </div>
            `
        }

        content += `
            <div class="menu-control-coincidences-item selected touchable">
                <span>${rangeForShowCoincidences.coincidencesPagination.actualPage}</span>
            </div>
        `

        if (rangeForShowCoincidences.coincidencesPagination.nextPage !== null) {
            content += `
                <div class="menu-control-coincidences-item touchable">
                    <span>${rangeForShowCoincidences.coincidencesPagination.nextPage}</span>
                </div>
            `
        }

        if ((rangeForShowCoincidences.coincidencesPagination.nextPage !== null) && (rangeForShowCoincidences.coincidencesPagination.lastPage !== null)) {
            if ((rangeForShowCoincidences.coincidencesPagination.lastPage - rangeForShowCoincidences.coincidencesPagination.nextPage) > 1) {
                content += `
                    <div class="menu-control-coincidences-item">
                        <span>...</span>
                    </div>
                `
            }
        }

        if (rangeForShowCoincidences.coincidencesPagination.lastPage !== null) {
            content += `
                <div class="menu-control-coincidences-item touchable">
                    <span>${rangeForShowCoincidences.coincidencesPagination.lastPage}</span>
                </div>
            `
        }

        if (rangeForShowCoincidences.showButtonForward) {
            content += `
                <div class="menu-control-coincidences-item touchable available">
                    <i class="fa-solid fa-angle-right"></i>
                </div>
            `
        }
        else {
            content += `
                <div class="menu-control-coincidences-item">
                    <i class="fa-solid fa-angle-right"></i>
                </div>
            `
        }

        document.querySelector(".control-coincidences .menu-control-coincidences").innerHTML = content

        //Events
        //Button backward and forward
        
    
    
        document.querySelector(".control-coincidences .menu-control-coincidences .menu-control-coincidences-item:first-child").addEventListener("click", () => {
            if (rangeForShowCoincidences.showButtonBackward) {
                functions.updateBeginAndEndForRangeCoincidencesBackward()
                events.showResponseFromAllOfDataInText()
            }
        })
        document.querySelector(".control-coincidences .menu-control-coincidences .menu-control-coincidences-item:last-child").addEventListener("click", () => {
            if (rangeForShowCoincidences.showButtonForward) {
                functions.updateBeginAndEndForRangeCoincidencesForward()
                events.showResponseFromAllOfDataInText()
            }
        })
        document.querySelectorAll(".control-coincidences .menu-control-coincidences .menu-control-coincidences-item.touchable:not(:first-child):not(:last-child)").forEach(element => {
            element.addEventListener("click", (e) => {

                let selectedPage

                if (e.path[0].tagName.toLowerCase() === "span") {
                    selectedPage = parseInt(e.target.innerHTML)
                }
                else {
                    selectedPage = parseInt(e.path[0].children[0].innerHTML)
                }

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
                functions.setPaginationOfCoincidences(selectedPage)
                events.showResponseFromAllOfDataInText()
                
            })
        })


        /* 
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
        */
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

        //show coincidencesPagination
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

        functions.setPaginationOfCoincidences(1)
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

        functions.setPaginationOfCoincidences(rangeForShowCoincidences.coincidencesPagination.actualPage + 1)
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

        functions.setPaginationOfCoincidences(rangeForShowCoincidences.coincidencesPagination.actualPage - 1)
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
                            <span><span style="font-weight: normal; color: gray;">Título:</span> ${element["Título"]}</span>
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
                            <span class="text-info">${element["Tema"]}</span>
                        </div>
                        <div class="subtopic">
                            <span class="text-column">Subtema:&nbsp;</span>
                            <span class="text-info">${element["Subtema"]}</span>
                        </div>
                        ${(element["Si el tema es docencia, indicar aquí la materia"]) ? 
                            `<div class="subtopic">
                                <span class="text-column">Materia:&nbsp;</span>
                                <span class="text-info">${element["Si el tema es docencia, indicar aquí la materia"]}</span>
                            </div>`
                            :
                            ``
                        }
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
        //console.log(equalities)
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
        let comparisonIsImpossible //Word is a connector like: of, the, an, etc

        if (column === "All(string)") {
            columnsForSearch = allOfConstants.columns
        }
        else {
            columnsForSearch = []
            columnsForSearch.push(column)
        }

        let statesOfEqualities = []

        //Para retornar este record, todas las equalities me tienen que devolver true
        //Caso especial: Si hay 3 o más "palabras solamente", retorna true automaticamente (Error)

        equalities.forEach(eq => {
            stateOfActualEquality = false
            firstData = eq.phrase //"titulo"
            comparisonIsImpossible = false

            allOfFunctions.returnCorrectData(firstData)

            for (let i = 0; (i < allOfConstants.omittedWordsInSearch.length) && (!comparisonIsImpossible) ; i++) {
                if (allOfFunctions.returnCorrectData(allOfConstants.omittedWordsInSearch[i]) === allOfFunctions.returnCorrectData(firstData)) {
                    comparisonIsImpossible = true
                }
            }

            if (!comparisonIsImpossible) {
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
    
                        //Just if firstData is a phrase, like "hello world"
                        if (secondData.includes(firstData) && firstData.includes(" ")) {
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
            }
        })

        // console.log(statesOfEqualities)

        if (statesOfEqualities.includes(true) && statesOfEqualities.includes(false)) {
            // console.log(statesOfEqualities)
            // console.log(equalities)
            // console.log(record)
        }
        
        //Verifica este algoritmo despues
        //Te ayudará a detectar errores

        if (((counterOfJustWords >= 3) && (someWordInTrue)) || ((!statesOfEqualities.includes(false)) && (statesOfEqualities.includes(true)))) {
            return true
        }
        //Caso especial para los que son "different"
        else if (statesOfEqualities.includes(true) && statesOfEqualities.includes(false)) {
            //Si todos son different
            let eqDiff = 0
            for (let i = 0; i < equalities.length; i++) {
                if (equalities[i].comparison === "different") {
                    eqDiff++
                }
            }

            if (eqDiff === equalities.length) {
                equalities.forEach((eq, index) => {
                    if (statesOfEqualities[index] === true) {
                        return true
                    }
                })
            }
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

            

            if ((!correctClauses.includes(false)) && (correctClauses.includes(true))) {
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

                        //allOfData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
                        //I must put topic, subtopic and subject
                        allOfData = []
                        let propOfTopic
                        let topic
                        let subtopic
                        let subject
                        let amountOfColumnsForTopic

                        XLSX.utils.sheet_to_json(workbook.Sheets[sheet]).forEach((object, index) => {

                            amountOfColumnsForTopic = 0
                            propOfTopic = null
                            topic = null
                            subtopic = null
                            subject = null
                            Object.getOwnPropertyNames(object).forEach(property => {
                                if (functions.returnCorrectData(property).includes(functions.returnCorrectData(allOfConstants.separatorOfTopic))) {
                                    propOfTopic = property
                                    amountOfColumnsForTopic++
                                }    
                            })

                            if (amountOfColumnsForTopic > 1) {
                                console.log("Se encontraron 2 o más columnas para Tema. Se pondrá la última encontrada. El registro es el número: " + index)
                            }

                            if (propOfTopic) {
                                topic = object[propOfTopic]
                                subtopic = allOfFunctions.returnSubtopic(propOfTopic, topic)
                                
                                
                                if (allOfFunctions.returnCorrectData(topic) === "docencia") {
                                    if (object["Si el tema es docencia, indicar aquí la materia"]) {
                                        subject = object["Si el tema es docencia, indicar aquí la materia"]
                                    }
                                }
                            }

                            object["Tema"] = topic
                            object["Subtema"] = subtopic
                            object["Materia"] = subject

                            allOfData.push(object)
                        })

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