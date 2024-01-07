

let data = getData()

data.then((dataCSV) => {
    if (sessionStorage.getItem("csvData") == null) {
        sessionStorage.setItem("csvData", JSON.stringify(dataCSV))
        sessionStorage.setItem("last_painting_index", 411)
    }
    
})


addSrcToImages()


// CSV Parser
async function getData() {
    const response = await fetch("../assets/json/bob_ross.json");
    let data = JSON.parse(await response.text());

    

    function separateRows(row) {
        return row.split(/,(?=\S)/);
    } 

    function convertStringToList(row) {
        row["colors"] = row["colors"].trim()
        row["colors"] = row["colors"].replace(/'/g, '"').replace(/\\r\\n/g, '')
        row["colors"] = row["colors"].slice(2,-2).split(/, /g)

        cleanString(row["colors"])

        function cleanString(row2) {
            for (let i = 0; i<row2.length; i++) {
                row2[i] = row2[i].slice(1,-1)
            }
        }
        
    }

    for (let i=1; i<data.length; i++) {
        convertStringToList(data[i])    
    }

    return data
}



// Add source image to featured cards
async function addSrcToImages() {
    data.then((msg) => {
        const arr1 = document.getElementsByClassName("card-one")
        const arr2 = document.getElementsByClassName("card-two")
        const arr3 = document.getElementsByClassName("card-three")
        iterate(arr1, Math.round(Math.random()  * 403))
        iterate(arr2, Math.round(Math.random()  * 403))
        iterate(arr3, Math.round(Math.random()  * 403))

        async function iterate(arr, index) {
            for (let i = 0; i < arr.length; i+= 1) {
                let response = await (await fetch("../assets/paintings/" + msg[index]["painting_index"]+ ".png")).blob()
                arr[i].src = URL.createObjectURL(response)
            }
        } 
    })
}




