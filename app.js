// Create a constructor function for creating a Location object
function Location(name, minCustPerHour, maxCustPerHour, avgCookiesPerSale) {
  this.name = name;
  this.minCustPerHour = minCustPerHour;
  this.maxCustPerHour = maxCustPerHour;
  this.avgCookiesPerSale = avgCookiesPerSale;
  this.cookiesPerHour = [];
  this.totalCookies = 0;

  // Method to generate a random number of customers per hour
  this.randomCustPerHour = function () {
    return Math.floor(Math.random() * (this.maxCustPerHour - this.minCustPerHour + 1) + this.minCustPerHour);
  };

  // Method to calculate and store the simulated amounts of cookies purchased for each hour at each location
  this.simulateCookiesPerHour = function () {
    for (let i = 0; i < 14; i++) {
      let cookies = Math.ceil(this.randomCustPerHour() * this.avgCookiesPerSale);
      this.cookiesPerHour.push(cookies);
      this.totalCookies += cookies;
    }
  };

  // Method to display the values of cookies per hour as an unordered list in the browser
  this.render = function () {
    let div = document.getElementById(this.name.toLowerCase());
    let ul = document.createElement('ul');
    ul.textContent = this.name;
    div.appendChild(ul);
    for (let i = 0; i < 14; i++) {
      let li = document.createElement('li');
      li.textContent = i + 6 + ':00 AM: ' + this.cookiesPerHour[i] + ' cookies';
      ul.appendChild(li);
    }
    let liTotal = document.createElement('li');
    liTotal.textContent = 'Total: ' + this.totalCookies + ' cookies';
    ul.appendChild(liTotal);
  };
}

// Create object literals for each shop location
let seattle = new Location('Seattle', 23, 65, 6.3);
seattle.simulateCookiesPerHour();
seattle.render();

let tokyo = new Location('Tokyo', 3, 24, 1.2);
tokyo.simulateCookiesPerHour();
tokyo.render();

let dubai = new Location('Dubai', 11, 38, 3.7);
dubai.simulateCookiesPerHour();
dubai.render();

let paris = new Location('Paris', 20, 38, 2.3);
paris.simulateCookiesPerHour();
paris.render();

let lima = new Location('Lima', 2, 16, 4.6);
lima.simulateCookiesPerHour();
lima.render();
