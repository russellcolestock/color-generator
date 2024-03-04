const dropBtn = document.getElementById('drop-btn')
const dropContent = document.getElementById('drop-content')
const getColorBtn = document.getElementById('color-scheme-btn')
let currentColor = "#F55A5A"
let currentScheme = "Monochrome"

getColorBtn.addEventListener('click', function(){
    const colorPicker = document.getElementById('color-picker')
    currentColor = colorPicker.value.slice(1)
    fetchDataWithColor(currentColor)
})


function dropDownMenu(scheme = 'monochrome'){
    currentScheme = scheme
    dropContent.classList.toggle('show') 
    fetchDataWithColor(currentColor, scheme)
    dropBtn.textContent = currentScheme.charAt(0).toUpperCase() + currentScheme.slice(1) 
    
}

dropContent.addEventListener('click', function(event){
    if (event.target.tagName == 'BUTTON') {
        const selectScheme = event.target.textContent.trim().toLowerCase()
        dropDownMenu(selectScheme)
    }
}) 

dropBtn.addEventListener('click', function(){
    dropDownMenu()
})

function fetchDataWithColor(color, scheme = 'monochrome'){

    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${scheme}`)
    .then(res => res.json())
    .then(data => {
        // console.log('API Response', data)
        updateColorDivs(data.colors)
    })
    .catch(error => {
        console.error('Error fetching color:', error)
    })
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => console.log('Text copied to clipboard'))
        .catch(err => console.error('Unable to copy text to clipboard', err));
}

function updateColorDivs(colors){
    for (let i = 0; i < colors.length; i++){
        const colorDisplay = document.getElementById(`color${i + 1}`)
        const color = colors[i].hex.value
        colorDisplay.style.backgroundColor = color

        colorDisplay.textContent = ""

        const hexValueElement = document.createElement('div')
        hexValueElement.classList.add('hex-value')
        hexValueElement.textContent = color

        hexValueElement.addEventListener('click', () => {
            copyToClipboard(color);
        })

        colorDisplay.appendChild(hexValueElement)
    }
}
