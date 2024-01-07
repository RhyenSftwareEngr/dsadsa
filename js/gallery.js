//javascript for navigation bar effects on scroll
window.addEventListener("scroll", function(){
const header = document.querySelector("header");
header.classList.toggle('sticky', window.scrollY > 0);
});

//javascript for responsive navigation sidebar menu
const menuBtn = document.querySelector(".menu-btn");
const navigation = document.querySelector(".navigation");
const navigationItems = document.querySelectorAll(".navigation a")

menuBtn.addEventListener("click",  () => {
menuBtn.classList.toggle("active");
navigation.classList.toggle("active");
});

navigationItems.forEach((navigationItem) => {
navigationItem.addEventListener("click", () => {
    menuBtn.classList.remove("active");
    navigation.classList.remove("active");
});
});

const scrollBtn = document.querySelector(".scrollToTop-btn");

/*javascript for scroll back to top on click scroll-to-top button
scrollBtn.addEventListener("click", () => {
document.body.scrollTop = 0;
document.documentElement.scrollTop = 0;
});
*/

//javascript for reveal website elements on scroll
window.addEventListener("scroll", reveal);

function reveal(){
var reveals = document.querySelectorAll(".reveal");

for(var i = 0; i < reveals.length; i++){
    var windowHeight = window.innerHeight;
    var revealTop = reveals[i].getBoundingClientRect().top;
    var revealPoint = 50;

    if(revealTop < windowHeight - revealPoint){
    reveals[i].classList.add("active");
    }
}
}

// Gallery script below




// CSV Parser
async function getData() {
    const response = await fetch("../assets/json/bob_ross.json");
    let data = JSON.parse(await response.text());

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


const art_name = document.querySelector("[art_name]")
const img_src = document.querySelector("[img_src]")
const colors_used = document.querySelector("[colors_used]")
const save_button = document.querySelector("[save_button]")
let last_painting_index

save_button.addEventListener("click", (e) => {
    e.stopPropagation()

    let reader = new FileReader()
    reader.addEventListener("load", function() {
        last_painting_index = last_painting_index+1
        sessionStorage.setItem("last_painting_index", last_painting_index)
        let output_color = colors_used.value.split(",")
        output_color = output_color.map(Function.prototype.call, String.prototype.trim) 
        dataCSV[dataCSV.length] = {"painting_index": last_painting_index, "painting_title": art_name.value, "num_colors": output_color.length, "colors": output_color, "img_src": reader.result}
        sessionStorage.setItem("csvData", JSON.stringify(dataCSV))

        // Reset
        art_name.value = ""
        img_src.value = ""
        colors_used.value = "" 
        searchOutput.innerHTML = ""
        makeGallery()
    }, false)

    if (art_name.value == "" || img_src.value == "" || colors_used.value == "") {
        console.log("fields not filled")
        if (art_name.value == "") {
            art_name.style.borderColor = "red"
        } else {
            art_name.style.borderColor = "black"
        }

        if (img_src.value == "") {
            img_src.style.border = "1px solid red"
        } else {
            img_src.style.border = "1px solid black"
        }

        if (colors_used.value == "") {
            colors_used.style.borderColor = "red"
        } else {
            colors_used.style.borderColor = "black"
        }

        return
    }

    reader.readAsDataURL(img_src.files[0])
})


// Gallery

const outputTemplate = document.querySelector("[search-output-template]")
const searchOutput = document.querySelector("[search-output-container]")
const searchInput = document.querySelector("[search-input]")

searchInput.addEventListener("focusin", e => {
    document.getElementById("search-bar-container").style.borderColor = "#111811"
})

searchInput.addEventListener("focusout", e => {
    document.getElementById("search-bar-container").style.borderColor = "rgb(157 157 157 / 51%)"
})

let added_data = []
let dataCSV
if (sessionStorage.getItem("csvData") == null) {

    let data = getData()

    data.then((dataC) => {
        sessionStorage.setItem("csvData", JSON.stringify(dataC))
        sessionStorage.setItem("last_painting_index", 411)
        
        last_painting_index = 411
        dataCSV = JSON.parse(sessionStorage.getItem("csvData"))
        makeGallery()
        addSrcToImages()
    })
} else {
    dataCSV = JSON.parse(sessionStorage.getItem("csvData"))
    last_painting_index = parseInt(sessionStorage.getItem("last_painting_index"))
    console.log(dataCSV)
    makeGallery()
    addSrcToImages()
}

async function makeGallery() {
    for(let i=1; i<dataCSV.length; i++) {
        let template = outputTemplate.content.cloneNode(true).children[0]
        let img = template.querySelector("[output-img]")
        let h3 = template.querySelector("[output-label]")
    
        
        if (dataCSV[i]["img_src"].includes("data")) {
            img.src = dataCSV[i]["img_src"]
        } else {
            let response = await (await fetch("../assets/paintings/" + dataCSV[i]["painting_index"]+ ".png")).blob()
            img.src = URL.createObjectURL(response)
        }
        
        h3.textContent = dataCSV[i]["painting_title"]

        added_data.push(template)
        searchOutput.append(template)
    }



    searchInput.addEventListener("input", e => {
        const value = e.target.value.toLowerCase()
        added_data.forEach(d => {
            const isVisible = d.textContent.toLowerCase().includes(value)
            d.classList.toggle("hide", !isVisible)
            
        })
    })
}

// Add source image to featured cards
async function addSrcToImages() {
    const arr1 = document.getElementsByClassName("card-one")
    const arr2 = document.getElementsByClassName("card-two")
    const arr3 = document.getElementsByClassName("card-three")
    iterate(arr1, Math.round(Math.random()  * 403))
    iterate(arr2, Math.round(Math.random()  * 403))
    iterate(arr3, Math.round(Math.random()  * 403))

    async function iterate(arr, index) {
        for (let i = 0; i < arr.length; i+= 1) {
            let response = await (await fetch("../assets/paintings/" + dataCSV[index]["painting_index"]+ ".png")).blob()
            arr[i].src = URL.createObjectURL(response)
        }
    } 
}