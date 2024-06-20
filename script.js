let previousPrices = {
  USD: null,
  GBP: null,
  EUR: null
};

async function fetchBitcoinPrice() {
  try {
      const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
      const data = await response.json();
      const priceUSD = parseFloat(data.bpi.USD.rate.replace(',', ''));
      const priceGBP = parseFloat(data.bpi.GBP.rate.replace(',', ''));
      const priceEUR = parseFloat(data.bpi.EUR.rate.replace(',', ''));

      updatePrice('USD', priceUSD);
      updatePrice('GBP', priceGBP);
      updatePrice('EUR', priceEUR);
  } catch (error) {
      document.getElementById('price-usd').innerText = 'USD: Error fetching data';
      document.getElementById('price-gbp').innerText = 'GBP: Error fetching data';
      document.getElementById('price-eur').innerText = 'EUR: Error fetching data';
      console.error('Error fetching Bitcoin price:', error);
  }
}

function updatePrice(currency, newPrice) {
  const priceElement = document.getElementById(`price-${currency.toLowerCase()}`);
  const previousPrice = previousPrices[currency];

  if (previousPrice !== null) {
      if (newPrice > previousPrice) {
          priceElement.style.color = 'green';
      } else if (newPrice < previousPrice) {
          priceElement.style.color = 'red';
      }
  }

  priceElement.innerText = `${currency}: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(newPrice)}`;

  setTimeout(() => {
      priceElement.style.color = '#666';
  }, 1000);

  previousPrices[currency] = newPrice;
}

document.getElementById('toggle-theme').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Fetch the price immediately when the page loads
fetchBitcoinPrice();

// Fetch the price every minute (60000 milliseconds)
setInterval(fetchBitcoinPrice, 1000);
