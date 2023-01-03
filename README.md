## Currency Exchange

# Introduction
Currency Exchange app primarily operates on https://open.er-api.com/v6/latest/USD API data. It fetches the latest exchange rates for 162 currencies based on USD rate. It enables the user to input a specific amount, select the currency for the input then select the currency to convert the amount to. Since the API rate is updated once a day, the app saves the retrieved data and allows the user to update rates and store the updates in a local database.

# Instructions
1. The app is written in javascript language and it uses json server to access local database. Installation of json server is therefore required.
2. Start both json server and live server.
3. At the start of the app, a list of all the rates is displayed. 
4. Put the amount to convert in the input box. Select the currencies to consider for the exchange and use the 'calculate' button to completed the conversion between currencies.
5. Use the form to enter a new rate and save the changes to the database
6. User can reset the database through the 'original rate' button

The Currency Exchange app is available on the link below
https://aowuor.github.io/Currency-Exchange/

# Author and Licence
@2022 Angela Owuor