var fetchClasses = () => {
    var url = `https://api.airtable.com/v0/appiaoTw3dT0mkQUJ/GoogleMeet?sort%5B0%5D%5Bfield%5D=id&sort%5B0%5D%5Bdirection%5D=asc`

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${AIRTABLE_API_KEY}`);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            classes = JSON.parse(xhr.responseText).records
        }
    };
    xhr.send();
}

var renderClasses = () => {
    classes.forEach(clas => {
        let classData = clas.fields
        let temp = `<div class="class" data-lookup="${classData.lookup}" onclick="classClicked(this)">
                        <img class="class_image" src="${classData.image}">
                        <h2 class="class_title">${classData.id.toUpperCase()}</h2>
                    </div>`
        container.innerHTML += temp
    })

}


var classClicked = (clas) => {
    let lookUp = clas.dataset.lookup
    let accountIndex = counterNumber.innerText
    url = `//meet.google.com/lookup/${lookUp}?authuser=${accountIndex}`
    window.open(url, '_blank').focus();
}


var updateCounter = sign => {
    if (sign == '+') {
        var currentCounter = counterNumber.innerText
        counterNumber.innerText = ++currentCounter
    } else if (sign == '-') {
        var currentCounter = counterNumber.innerText
        counterNumber.innerText = --currentCounter
    }
    counterPlus.disabled = false
    counterMinus.disabled = false

    if (currentCounter == 9)
        counterPlus.disabled = true
    if (currentCounter == 0)
        counterMinus.disabled = true
    localStorage.setItem("currentCounter", currentCounter)
}

var checkCounterInitial = () => {
    if (localStorage.getItem("currentCounter"))
        counterNumber.innerText = localStorage.getItem("currentCounter")
    else counterNumber.innerText = '0'
    var currentCounter = counterNumber.innerText
    if (currentCounter == 9)
        counterPlus.disabled = true
    if (currentCounter == 0)
        counterMinus.disabled = true
}

var toggleColorMode = () => {

    if (document.body.classList.toggle('dark-mode')) {
        document.querySelector('img.color-mode').src = 'img/sun.svg'
        localStorage.setItem('colorMode', 'dark')
    } else {
        document.querySelector('img.color-mode').src = 'img/moon.svg'
        localStorage.setItem('colorMode', 'light')
    }

}

var checkColorModeInitial = () => {
    if (localStorage.getItem('colorMode') == 'dark') {
        document.body.classList.add('dark-mode')
        document.querySelector('img.color-mode').src = 'img/sun.svg'
        localStorage.setItem('colorMode', 'dark')
    } else {
        document.body.classList.remove('dark-mode')
        document.querySelector('img.color-mode').src = 'img/moon.svg'
        localStorage.setItem('colorMode', 'light')
    }
}



import { AIRTABLE_API_KEY } from "./apikey.js"

let counterNumber = document.querySelector('.counter_number')
let counterPlus = document.querySelector('.counter_plus')
let counterMinus = document.querySelector('.counter_minus')
let container = document.querySelector('.container')
var classes
checkCounterInitial()
checkColorModeInitial()
fetchClasses()
renderClasses()
