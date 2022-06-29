let selectedFile
let allOfData = []
let responseFromAllOfData
let rangeForShowCoincidences = {
    amountOfElements: 10,    
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
                else if (typeOfEasySearch === "no exact") {
                    if (typeof allOfData[i][column] === "string") {
                        if (functions.removeAccents(allOfData[i][column].toLowerCase()).includes(functions.removeAccents(data.toLowerCase()))) {
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
        
    }
}

document.getElementById("input").addEventListener("change", (event) => {
    selectedFile = event.target.files[0]
})

document.getElementById("button").addEventListener("click", () => {
    if (selectedFile) {
        let fileReader = new FileReader()
        fileReader.readAsBinaryString(selectedFile)
        fileReader.onload = (event) => {
            let data = event.target.result
            let workbook = XLSX.read(data, {type: "binary"})
            workbook.SheetNames.forEach(sheet => {
                allOfData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
                alert("Hecho")                
            });
        }
    }
})

document.querySelectorAll(".coincidences-container .backward-button")[0].addEventListener("click", () => {
    functions.updateBeginAndEndForRangeCoincidencesBackward()
    events.showResponseFromAllOfDataInText()
})

document.querySelectorAll(".coincidences-container .forward-button")[0].addEventListener("click", () => {
    functions.updateBeginAndEndForRangeCoincidencesForward()
    events.showResponseFromAllOfDataInText()
})

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