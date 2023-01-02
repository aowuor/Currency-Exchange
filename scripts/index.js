let obje;
let date = new Date().getDate()
let originalRate = document.getElementById('original')
let revisedRate = document.getElementById('revised')
let url1 = "https://open.er-api.com/v6/latest/USD"
let url2 =  "http://localhost:3000/exchangeRates"

document.addEventListener("DOMContentLoaded",(postToDatabase) => {
    customFetch(url1, "GET")
} )

originalRate.addEventListener("click", () => {
    createObject
    customFetch(url2, "POST", obje)
})

function myFunction() {
    document.getElementById('updates').style.display = "block"

}


function createObject(rates){
    obje = {
        time_last_update_utc: rates.time_last_update_utc,
        time_next_update_utc:rates.time_next_update_utc,
        time_eol_unix: rates.time_eol_unix,
        base_code: rates.base_code,
        rates: rates.rates
    }
    if(rates.time_last_update_utc.split(" ")[1] != date){
        customFetch(url2, "POST", obje)
    }
}


// Display Exchange Rates
function renderExchangeRate(rates){
    let date = document.getElementById('date')
    let ul = document.getElementById('rates_list')
    date.innerText = `Last update: ${rates.time_last_update_utc}`
    for(let currency in rates.rates){
        let li = document.createElement('li')
        li.setAttribute("class","list-group-item")
        ul.appendChild(li)
        li.innerText = `${currency} - ${rates.rates[currency]}`     
    }
}
       
//Display exchange-rate select options
function populateFromCurrencyOptions(rates){
    let fromSelect = document.getElementById('from')
    for(let currency in rates.rates){
        let option = document.createElement('option')
        fromSelect.appendChild(option)
        option.text = currency
    }
}

function populateToCurrencyOptions(rates){
    let toSelect = document.getElementById('to')
    for(let currency in rates.rates){
        let option = document.createElement('option')
        toSelect.appendChild(option)
        option.text = currency
    }
}
    

// //Calculates exchange rate for a specific amount based on currencies selected by user
function calculateEquivalentAmount(rates){
    let form = document.getElementById('api_rate')
    form.addEventListener("submit", (e) => {
        e.preventDefault()

        let from = document.getElementById('from')
        let fromOption = from.options[from.selectedIndex].text
        let to = document.getElementById('to')
        let toOption = to.options[to.selectedIndex].text
        let amount = document.getElementById('amount')
        amount.innerText = form.amount.value

        let calculatedAmount = (form.amount.value * rates.rates[toOption])/rates.rates[fromOption]
        let result = document.getElementById('result')
        result.innerText = calculatedAmount.toFixed(2)
    })   
}


function postToDatabase(rates){
    let originalRate = document.getElementById('original')
    originalRate.addEventListener("click", () => {
        createObject
        customFetch(url2, "POST", obje)
    })

}

function updateDatabase(){
    let updateForm = document.getElementById('updateForm')
    updateForm.addEventListener("submit", (e) => {
        e.preventDefault()
        obje.rates[updateForm.currencyInput.value] = `${updateForm.rateInput.value}`
        customFetch(url2, "PATCH", obje)  
    })
}
updateDatabase()


// custom GET, POST, PATCH and DELETE Fetch functions
function customFetch(url,type,data){
    if(type === "GET"){
        fetch(url, {
            method: type,
        })
        .then((res)=> res.json())
        .then((data) => {
            renderExchangeRate(data)
            populateFromCurrencyOptions(data)
            populateToCurrencyOptions(data)
            calculateEquivalentAmount(data)
            createObject(data)
            postToDatabase(data)
        })
        .catch((error) => console.log(error))
    
    }
    if(type === "POST"){
        fetch(url, {
            method: type,
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(obje)
        })
        .then((res)=> res.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error))
    }
    if(type === "PATCH"){
        fetch(url, {
            method: type,
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data)
        })
        .then((res)=> res.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error))
    }
    if(type === "DELETE"){
        fetch(url, {
            method: type,
            headers: {
                "Content-type": "application/json",
            }
        })
        .catch((error) => console.log(error))
    }
}

// function changeRate(rates){
//     let updateForm = document.getElementById('updateForm')
//     updateForm.addEventListener("submit", (e) => {
//         e.preventDefault()
//         // console.log(`${updateForm.currencyInput.value} : ${updateForm.rateInput.value} `)
//         console.log(rates)
//         for(let key in rates){
//             // console.log(rt)
//         }
        
//     })
//     document.getElementById('change').addEventListener("click", () => {
//         // console.log(`${updateForm.currencyInput.value} : ${updateForm.rateInput.value} `)
        
//     })

// }
// changeRate()