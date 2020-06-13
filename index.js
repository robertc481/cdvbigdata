import Chart from 'chart.js';

let currencyData;
let rates = [];
const APIKey = `https://api.nbp.pl/api/exchangerates/rates/a/`;//endpoint needs 2 more arguments : #1 - currency code,#2 - range of date;
const currency = 'thb';
const dateRange = '2020-03-01/2020-06-13';//period of pandemic lockdown (true date would be until 2020-07-01 but there is no data like this)

const fetchCurrencyData = (APIKey, currencyCode, dateRange) => fetch(`${APIKey}${currencyCode}/${dateRange}`).then(res => res.json()).then(data => {
   currencyData = data
   rates = data.rates.map(item => item.mid);
});

fetchCurrencyData(APIKey, currency, dateRange);

setTimeout(() => {
   console.log(currencyData);
   console.log(rates);


   var ctx = document.getElementById('myChart').getContext('2d');
   var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
         labels: [...currencyData.rates.map(i => i.effectiveDate)],
         datasets: [{
            label: 'Wstęp do Big Data - Tajski Bat w czasie COVID-19',
            backgroundColor: 'rgb(185, 99, 255)',
            borderColor: 'rgb(0, 0, 0)',
            data: rates
         }]
      },

      // Configuration options go here
      options: {}
   });


   document.getElementById('minVal').innerHTML = Math.min(...rates);
   document.getElementById('maxVal').innerHTML = Math.max(...rates);
   document.getElementById('avgVal').innerHTML = (rates.reduce((acc, curr) => acc + curr, 0) / rates.length).toFixed(4);

}, 1000);
/*

*/