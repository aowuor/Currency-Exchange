let obje;
// Get data from API
function getData(){
    let originalRate = document.getElementById('original')
    let revisedRate = document.getElementById('revised')
    
    originalRate.addEventListener("click", ()=> {
        customFetch("https://open.er-api.com/v6/latest/USD", "GET")
    })
    revisedRate.addEventListener("click", ()=> {
        customFetch("http://localhost:3000/exchangeRates", "GET")

    })
}
getData()


// Display Exchange Rates
function renderExchangeRate(rates){
    let date = document.getElementById('date')
    let ul = document.getElementById('rates_list')

    for(let item in rates){
        date.innerText = rates.time_last_update_utc
        for(let currency in rates.rates){
            let li = document.createElement('li')
            li.setAttribute("class","list-group-item")
            ul.appendChild(li)
            li.innerText = `${currency} - ${rates.rates[currency]}`
        }   
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
        
        for(let currency in rates.rates){
            let calculatedAmount = (form.amount.value * rates.rates[toOption])/rates.rates[fromOption]
            let result = document.getElementById('result')
            result.innerText = calculatedAmount.toFixed(2)
        }
    })   
}


function postToDatabase(rates){
    let revisedRate = document.getElementById('revised')
    revisedRate.addEventListener("click", ()=> {
        // customFetch("https://open.er-api.com/v6/latest/USD", "GET")
        obje = {
            time_last_update_utc: rates.time_last_update_utc,
            time_next_update_utc:rates.time_next_update_utc,
            time_eol_unix: rates.time_eol_unix,
            base_code: rates.base_code,
            rates: rates.rates
        } 
    })
    customFetch("http://localhost:3000/exchangeRates", "POST", obje)
}


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






// // Display Exchange Rates
// function renderExchangeRate(rates){
//     obje = rates
//     console.log(rates)
//     let date = document.getElementById('date')
//     date.innerText = rates.time_last_update_utc

//     // console.log(rates.rates)
//     for(let rate in rates.rates){
//         let ul = document.getElementById('rates_list')
//         let li = document.createElement('li')
//         li.setAttribute("class","list-group-item")
//         ul.appendChild(li)
//         li.innerText = `${rate} - ${rates.rates[rate]}`
//     }
// }

// // //Display exchange-rate select options
// // function populateFromCurrencyOptions(rates){
    
// //     for(let currency in rates.rates){
// //         let option = document.createElement('option')
// //         let fromSelect = document.getElementById('from')
// //         fromSelect.appendChild(option)
// //         option.text = currency
// //     }

// // }

// // function populateToCurrencyOptions(rates){
// //     for(let currency in rates.rates){
// //         let option = document.createElement('option')
// //         let toSelect = document.getElementById('to')
// //         toSelect.appendChild(option)
// //         option.text = currency
// //     }
    
// // }

// // //Calculates exchange rate for a specific amount based on currencies selected by user
// // function calculateEquivalentAmount(rates){
// //     let form = document.getElementById('api_rate')
// //     form.addEventListener("submit", (e) => {
// //         e.preventDefault()

// //         let from = document.getElementById('from')
// //         let fromOption = from.options[from.selectedIndex].text
// //         let to = document.getElementById('to')
// //         let toOption = to.options[to.selectedIndex].text
// //         let amount = document.getElementById('amount')
// //         amount.innerText = form.amount.value

// //         let calculatedAmount = (form.amount.value * rates.rates[toOption])/rates.rates[fromOption]
// //         let result = document.getElementById('result')
// //         result.innerText = calculatedAmount.toFixed(2)
   
// //     })   
// // }