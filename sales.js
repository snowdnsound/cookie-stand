// Constructor function for creating a Location object
function Store(name, minCustPerHour, maxCustPerHour, avgCookiesPerSale) {
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
  // Method to generate the table row HTML for this location
  this.generateTableRowHTML = function () {
    let tableRow = document.createElement('tr');
    let tableCellName = document.createElement('td');
    tableCellName.textContent = this.name;
    tableRow.append(tableCellName);

    for (let i = 0; i < 14; i++) {
      let tableCell = document.createElement('td');
      tableCell.textContent = this.cookiesPerHour[i];
      tableRow.append(tableCell);
    }
    return tableRow;
  };
}
//Method to calculate the hourly totals
this.calculateHourlyTotals = function () {
  for (let i = 0; i < 14; i++) {
    let total = 0;
    for (let j = 0; j < 5; j++) {
      total += stores[j].cookiesPerHour[i];
    }
    this.hourlyTotals.push(total);
  }
};
// Object literals for each shop location
let seattle = new Store('Seattle', 23, 65, 6.3);
seattle.simulateCookiesPerHour();
let tokyo = new Store('Tokyo', 3, 24, 1.2);
tokyo.simulateCookiesPerHour();
let dubai = new Store('Dubai', 11, 38, 3.7);
dubai.simulateCookiesPerHour();
let paris = new Store('Paris', 20, 38, 2.3);
paris.simulateCookiesPerHour();
let lima = new Store('Lima', 2, 16, 4.6);
lima.simulateCookiesPerHour();
let totals = new Store('Totals', 0, 0, 0);
let stores = [seattle, tokyo, dubai, paris, lima];
// Updated totals row
for (let i = 0; i < 14; i++) {
  let total = 0;
  for (let j = 0; j < stores.length; j++) {
    total += stores[j].cookiesPerHour[i];
  }
  totals.cookiesPerHour[i] = total;
}

const LocationForm = document.querySelector('form');

function renderTable() {
  let tableHTML = document.querySelector('table');
  tableHTML.innerHTML = '';
  // tableHTML += '<tr><th>Location</th><th>6:00 AM</th><th>7:00 AM</th><th>8:00 AM</th><th>9:00 AM</th><th>10:00 AM</th><th>11:00 AM</th><th>12:00 PM</th><th>1:00 PM</th><th>2:00 PM</th><th>3:00 PM</th><th>4:00 PM</th><th>5:00 PM</th><th>6:00 PM</th><th>7:00 PM</th><th>Daily Location Total</th></tr>';
  // Add rows for pre-defined store locations
  for (let i = 0; i < stores.length; i++) {
    tableHTML.append(stores[i].generateTableRowHTML());
  }
}
LocationForm.addEventListener('submit', handleSubmit);
// Define the handleSubmit function
function handleSubmit(event) {
  event.preventDefault();
  let standName = event.target.name.value;
  let standMinimum = event.target.minNumber.value;
  let standMaximum = event.target.maxNumber.value;
  let standAverage = event.target.avgNumber.value;
  const userStand = new Store(standName, standMinimum, standMaximum, standAverage);
  // Simulate cookies per hour for the new location
  userStand.simulateCookiesPerHour();
  // Add the new location to the userLocations array
  stores.push(userStand);
  renderTable();
  let tableContainer2 = document.querySelector('table');
  tableContainer2.append(totals.generateTableRowHTML());
}
renderTable();
