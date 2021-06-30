var fetchClasses = async () => {
    var res = (await fetch('/.netlify/functions/get-classes')).json()
    return res
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
        document.querySelector('img.color-mode').src = './img/sun.svg'
        localStorage.setItem('colorMode', 'dark')
    } else {
        document.querySelector('img.color-mode').src = './img/moon.svg'
        localStorage.setItem('colorMode', 'light')
    }

}

var checkColorModeInitial = () => {
    if (localStorage.getItem('colorMode') == 'dark') {
        document.body.classList.add('dark-mode')
        document.querySelector('img.color-mode').src = './img/sun.svg'
        localStorage.setItem('colorMode', 'dark')
    } else {
        document.body.classList.remove('dark-mode')
        document.querySelector('img.color-mode').src = './img/moon.svg'
        localStorage.setItem('colorMode', 'light')
    }
}


let counterNumber = document.querySelector('.counter_number')
let counterPlus = document.querySelector('.counter_plus')
let counterMinus = document.querySelector('.counter_minus')
let container = document.querySelector('.container')
var classes = []


var main = async () => {
    checkCounterInitial()
    checkColorModeInitial()
    classes = await fetchClasses()
    renderClasses()

}

main()