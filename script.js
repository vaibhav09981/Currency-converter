// script.js
const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const convertButton = document.getElementById('convertButton');
const resultDiv = document.getElementById('result');
const exchangeRatesDiv = document.getElementById('exchangeRates');
const openPanelButton = document.getElementById('openPanel');
const closePanelButton = document.getElementById('closePanel');
const slidingPanel = document.querySelector('.sliding-panel');


// Sample currency data (replace with actual API data)
const currencies = {
    USD: 'United States Dollar',
    EUR: 'Euro',
    GBP: 'British Pound',
    INR: 'Indian Rupee',
    JPY: 'Japanese Yen',
    // ... add more currencies
};

// Populate currency dropdowns
for (const code in currencies) {
    const option1 = document.createElement('option');
    option1.value = code;
    option1.text = currencies[code];
    fromCurrencySelect.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = code;
    option2.text = currencies[code];
    toCurrencySelect.appendChild(option2);
}


// Event listener for conversion
convertButton.addEventListener('click', () => {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    // Replace with actual API call
    fetch(`https://api.exchangerate-api.com/v6/latest/${fromCurrency}`)  // Example API endpoint
        .then(response => response.json())
        .then(data => {
            const exchangeRate = data.rates[toCurrency];
            const convertedAmount = amount * exchangeRate;
            resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;

            // Update exchange rates in the sliding panel (if needed)
            exchangeRatesDiv.innerHTML = ""; // Clear previous rates
            for (const currency in data.rates) {
                const rate = data.rates[currency];
                const rateElement = document.createElement('p');
                rateElement.textContent = `${fromCurrency} to ${currency}: ${rate.toFixed(4)}`;
                exchangeRatesDiv.appendChild(rateElement);
            }
        })
        .catch(error => {
            resultDiv.textContent = "Error fetching exchange rates.";
            console.error("Error:", error);
        });

});


// Sliding panel functionality
openPanelButton.addEventListener('click', () => {
    slidingPanel.classList.add('open');
});

closePanelButton.addEventListener('click', () => {
    slidingPanel.classList.remove('open');
});
