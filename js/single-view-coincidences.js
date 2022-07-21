let infoOfCoincidences = []
let allOfData = []
let responseFromAllOfData = []
let responseFromAllOfDataInText = []
let URLOfExcelFile = "https://misterrobot1010.github.io/assets/PGD_Base%20de%20datos_ORIGINAL.xlsx"
let columns = ["Autor", "Carpeta", "Código", "Fecha dd/mm/aaaa", "Lugar", "Marca temporal", "Observaciones", "Otros [Firma]", "Otros [Notas]", "Otros [Subrayado]", "Si el tema es docencia, indicar aquí la materia", "Tamaño del documento", "Tema [2]", "Tema: Filosofía [Filosofía]", "Tipo de documento", "Título"]

let events = {
    fillResponseFromAllOfDataInText: () => {
        //Remembre after change this
        if (responseFromAllOfData.length === 1) {
            //console.log(responseFromAllOfData[0])

            let content
            let contentOfDivs = ""
            let actualDiv

            allOfConstants.columns.forEach(col => {
                actualDiv = null

                if (responseFromAllOfData[0][col]) {
                    actualDiv = `
                        <div>
                            <b>${col}:&nbsp;</b>
                            <span>${responseFromAllOfData[0][col]}</span>
                        </div>
                    `                    
                }

                if (actualDiv) {
                    contentOfDivs += actualDiv
                }
            })

            content = `
                <span>Información del registro</span>
                <br>
                <br>
                ${contentOfDivs}
            `

            document.querySelector(".coincidences-container").innerHTML = content
        }
    },
    getCoincidencesOfAllOfData: () => {
        let coincidentObjects = []
        infoOfCoincidences.forEach(element => {
            coincidentObjects.push(allOfData[element.indexInAllOfData])
        });
        responseFromAllOfData = coincidentObjects

        events.fillResponseFromAllOfDataInText()
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
                                if (allOfFunctions.returnCorrectData(property).includes(allOfFunctions.returnCorrectData(allOfConstants.separatorOfTopic))) {
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
                        infoOfCoincidences = JSON.parse(url.searchParams.get("coincidences"))
                        //console.log(infoOfCoincidences)

                        //events.search(request.clauses)
                        //events.showResponseFromAllOfDataInText()

                        events.getCoincidencesOfAllOfData()
                        
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

events.getAllOfDataAndShowCoincidences()