//Cadartro do ponto de coleta

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => {return res.json() })
    .then( states => {

        for( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    } )
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")


    const ufValue = event.target.value

    const indexOfSelectdState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectdState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( (res) => {return res.json() })
    .then( cities => {

        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nomed}">${city.nome}</option>`
        }

        citySelect.disabled = false
    } )
}



document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//Itens de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId
        return itemFound
    })
    
    if(alreadySelected >= 0) {
       const filteredItmes = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        
        selectedItems = filteredItmes
        
    } else {
        selectedItems.push(itemId)
    }

    collectedItems.value = selectedItems
    
}

