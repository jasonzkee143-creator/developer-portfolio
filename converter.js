// Hardcoded exchange rates relative to 1 USD baseline
const EXCHANGE_RATES = {
    USD: 1,
    PHP: 56.50,    // 1 USD = 56.50 PHP
    BTC: 0.000015  // 1 USD = 0.000015 Bitcoin
};

// Target the HTML Elements inside the DOM
const amountInput = document.getElementById('amountInput');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const convertBtn = document.getElementById('convertBtn');
const resultText = document.getElementById('resultText');

// Create the core calculation function
function performConversion() {
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    // Handle invalid numerical inputs gracefully
    if (isNaN(amount) || amount <= 0) {
        resultText.innerText = "Please enter a valid amount";
        resultText.style.color = "#ef4444"; // Red color error
        return;
    }
    resultText.style.color = "white";

    // Standard Math Formula: Convert to baseline (USD) first, then convert to target currency
    const amountInUSD = amount / EXCHANGE_RATES[from];
    const finalResult = amountInUSD * EXCHANGE_RATES[to];

    // Format display cleanly based on asset type
    let decimalPlaces = to === 'BTC' ? 6 : 2;
    
    // Update the layout screen live!
    resultText.innerText = `${amount.toLocaleString()} ${from} = ${finalResult.toFixed(decimalPlaces)} ${to}`;
}

// Attach a listener so clicking the button triggers the code calculation
convertBtn.addEventListener('click', performConversion);