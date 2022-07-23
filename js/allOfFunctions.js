const allOfFunctions = {
    removeAccents: (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
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
    returnCorrectData: (data) => {
        let correctData = allOfFunctions.eraseSpacesFromBeginningAndFinal(data)
        correctData = allOfFunctions.convertMultipleSpacesToOneSpace(correctData)
        correctData = allOfFunctions.removeAccents(correctData).toLowerCase()

        return correctData
    },
    returnSubtopic: (propOfTopic, topic) => {
        //propOfTopic y topic are without accents

        //Detect num of subtopic
        let numOfSubtopic = null
        let initialIndex = propOfTopic.indexOf("[")
        let finalIndex = propOfTopic.indexOf("]")
        let numOfSubtopicInString = ""
        let subtopic = null

        for (let i = (initialIndex + 1); i < finalIndex; i++) {
            numOfSubtopicInString += propOfTopic[i]
        }

        numOfSubtopic = parseInt(numOfSubtopicInString)
        
        //Get subtopic
        allOfConstants.allOfSubtopics.forEach(element => {
            if (allOfFunctions.returnCorrectData(topic) === allOfFunctions.returnCorrectData(element.topic)) {
                if ((numOfSubtopic - 1) < element.subtopics.length) {
                    //We can enter
                    subtopic = element.subtopics[numOfSubtopic - 1]
                }
            }
        })

        return subtopic
    },
    cointainsJustNumbers: (data) => {
        let response = null
        
        if (!data) {
            return false
        }

        for (let i = 0; (i < data.length) && ((response === null) || (response)) ; i++) {
            switch(data[i]) {
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                case "0":
                    response = true
                    break;
                default:
                    response = false
                    break;
            }
        }

        if ((response === null) || (!response)) {
            return false
        }
        else if (response) {
            return true
        }
    },
    returnArrayOfYears: (initialData) => {
        let array = []
        let data
        if (typeof initialData === "number") {
            data = initialData.toString()
        }
        else if (typeof initialData === "string") {
            data = initialData
        }

        if (data) {
            let actualYear

            for (let i = 0; i < data.length; i++) {
                if (
                    ((i + 1) < data.length) &&
                    ((i + 2) < data.length) &&
                    ((i + 3) < data.length)
                ) {
                    actualYear = data[i] + data[i + 1] + data[i + 2] + data[i + 3]

                    if (allOfFunctions.cointainsJustNumbers(actualYear)) {
                        if (actualYear.startsWith("18") || actualYear.startsWith("19") || actualYear.startsWith("20")) {
                            array.push(parseInt(actualYear))
                        }
                    }
                }
            }
        }

        return array
    }
}