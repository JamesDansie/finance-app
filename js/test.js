console.log('hello');

class Investment {
  constructor(principal, interest_rate, additional_amount) {
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

let stocks = new Investment(70000, 6, 60000);
stocks.compound(30);

console.log(stocks);
