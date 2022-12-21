
// Get data from API
customFetch("https://open.er-api.com/v6/latest/USD", "GET")

// Display Exchange Rates
function renderExchangeRate(rates){
    let date = document.getElementById('date')
    date.innerText = rates.time_last_update_utc

    console.log(rates.rates)
    for(let rate in rates.rates){
        let ul = document.getElementById('rates_list')
        let li = document.createElement('li')
        li.setAttribute("class","list-group-item")
        ul.appendChild(li)
        li.innerText = `${rate} - ${rates.rates[rate]}`
    }
}

//Display exchange rate select options
function populateFromCurrencyOptions(rates){
    for(let currency in rates.rates){
        let option = document.createElement('option')
        let fromSelect = document.getElementById('from')
        fromSelect.appendChild(option)
        option.text = currency
    }

}

function populateToCurrencyOptions(rates){
    for(let currency in rates.rates){
        let option = document.createElement('option')
        let toSelect = document.getElementById('to')
        toSelect.appendChild(option)
        option.text = currency
    }
    
}

//Calculates exchange rate for a specific amount based on currencies selected by user
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
   
    })   
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
            // console.log(data.rates);
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
            body: JSON.stringify(data)
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
