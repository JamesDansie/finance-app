'use strict';

class Investment {
  // These are annual interest_rate and additional_amount per year
  constructor(name, principal, interest_rate, additional_amount) {
    this.name = name;
    this.principal = [principal];
    this.interest_rate = interest_rate;
    this.additional_amount = additional_amount;
    this.monthly_income = [];
    this.year = [];
    this.growth = [];
  }

  compound(years) {
    for (let i = 0; i < years; i++) {
      this.growth[i] = this.principal[i] * this.interest_rate / 100.0;
      this.principal[i + 1] = this.principal[i] + this.growth[i] + this.additional_amount;
      this.monthly_income[i] = this.growth[i] / 12;
      this.year[i] = i + 1;
    }
  }
}

let investments = [];
let additional_stock = 20000 + 12 * 5000;
let stocks = new Investment('stocks', 250000, 5, additional_stock);
investments.push(stocks);
let savings_account = new Investment('savings', 50000, 2, 0);
investments.push(savings_account);
let real_estate = new Investment('real estate', 142000, 5, 0);
investments.push(real_estate);
// let bonds = new Investment('bonds', 20000, 4, 5000);
// investments.push(bonds);
let flat_amount = new Investment('Contributions', 0, 0, additional_stock);
investments.push(flat_amount);

const years = 30;
investments.forEach(investment => investment.compound(years));

// build data table
let data_table =[[]];
for (let i = 0; i < investments.length; i++) {
  data_table[0][i] = investments[i].name;
}
data_table[0].unshift('Year');
for (let year = 1; year <= years; year++) {
  let new_array = [];
  new_array.push(year);
  for (let invest_index = 0; invest_index < investments.length; invest_index++){
    new_array.push(investments[invest_index].principal[year-1]);
  }
  data_table.push(new_array);
}

// Display the table
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable(data_table);

  var options = {
    title: 'Principal Growth',
    isStacked: true,
    hAxis: {title: 'Year', titleTextStyle: {color: '#333'}},
    vAxis: {minValue: 0, format:'$###,###,###.00'}
  };

  var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

// build data table
let income_table =[[]];
for (let i = 0; i < investments.length; i++) {
  income_table[0][i] = investments[i].name;
}
income_table[0].unshift('Year');
for (let year = 1; year <= years; year++) {
  let new_array = [];
  new_array.push(year);
  for (let invest_index = 0; invest_index < investments.length; invest_index++){
    new_array.push(investments[invest_index].monthly_income[year-1]);
  }
  income_table.push(new_array);
}

// Display the table
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawIncomeChart);

function drawIncomeChart() {
  var data = google.visualization.arrayToDataTable(income_table);

  var options = {
    title: 'Monthly Income',
    isStacked: true,
    hAxis: {title: 'Year', titleTextStyle: {color: '#333'}},
    vAxis: {minValue: 0, format:'$###,###,###.00'}
  };

  var chart = new google.visualization.AreaChart(document.getElementById('income_div'));
  chart.draw(data, options);
}

// Original example
// function drawChart() {
//     var data = google.visualization.arrayToDataTable([
//       ['Year', 'Sales', 'Expenses'],
//       ['2013',  1000,      400],
//       ['2014',  1170,      460],
//       ['2015',  660,       1120],
//       ['2016',  1030,      540]
//     ]);

//     var options = {
//       title: 'Company Performance',
//       isStacked: true,
//       hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
//       vAxis: {minValue: 0}
//     };

//     var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
//     chart.draw(data, options);
//   }
