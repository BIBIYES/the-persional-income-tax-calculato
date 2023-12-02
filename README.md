
# the persional income tax calculator

A node.js based web app for income tax calculation.

Originally created by Sonic with help of ChatGPT (OpenAI) on Dec 2023, Chongqing, China.

## Descriptions:

- implement the calculation with python code `main.py` and `main_v2.py`
- as the chatGPT helping implementing a node.js app with frontend and backend.
  - this app can receive six parameters
  - calculate the sum and average of the six parameters in the nodejs backend
  - display asynchronously the calculation result in the frontend `index.html` page

- Continue asking the chatGPT for further functions adding:
  - implement the functions for this app with the description in the python code given
  - it works fine and small-and-non-functional human-fixing need.
  - done.

- Todo and to earn:
  - Optimize the app for good-looking and easy-use.
  - How to design/assign the bonus_included_income for minimum `totalIncomeTax` result?
  - Imagine you have a billion bonus, how to split it by a fine designed Five-year disbursement plan? How to design that plan?
  - Add a wechat pay for a smart-plan designing.

## The node.js app with frontend and backend

#### the `npm install` steps:
 
```bash
mkdir nodejs-income-calculator
cd nodejs-income-calculator
npm init -y
npm install express body-parser

touch index.js
mkdir public
cd public
touch index.html
cd ..
```

#### Code for the `index.js` file:

```javascript
// index.js

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Serve static files from the public dir
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Display the form, The '/form' route serves the HTML file with the form.
app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submissions and calculate on the backend
app.post('/submit', (req, res) => {
  // Extract values from the form and parse as integers
  const startTaxPoint = parseInt(req.body.start_tax_point_month, 10);
  const preTaxIncome = parseInt(req.body.pre_tax_income, 10);
  const annualBonus = parseInt(req.body.annual_bonus, 10);
  const bonusIncludedIncome = parseInt(req.body.bonus_included_income, 10);
  const insuranceFund = parseInt(req.body.insurance_fund, 10);
  const deductions = parseInt(req.body.deductions, 10);

  // Calculate sum and average
  const sum = startTaxPoint + preTaxIncome + annualBonus + bonusIncludedIncome + insuranceFund + deductions;
  const average = sum / 6;

  // Send the result back to the frontend
  res.json({ sum, average });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
```

#### Code for the `public/index.html` file:

```html
<!-- public/index.html -->

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Income Tax Calculator</title>
</head>
<body>
  <h1>Income Calculator</h1>

  <form id="incomeForm">
    <label for="start_tax_point_month">月收入起征点:</label>
    <input type="number" id="start_tax_point_month" name="start_tax_point_month" required><br>

    <label for="pre_tax_income">税前工资收入:</label>
    <input type="number" id="pre_tax_income" name="pre_tax_income" required><br>

    <label for="annual_bonus">年终奖总额:</label>
    <input type="number" id="annual_bonus" name="annual_bonus" required><br>

    <label for="bonus_included_income">年终奖计入工资部分:</label>
    <input type="number" id="bonus_included_income" name="bonus_included_income" required><br>

    <label for="insurance_fund">五险两金（个人年缴纳部分）:</label>
    <input type="number" id="insurance_fund" name="insurance_fund" required><br>

    <label for="deductions">专项扣除（子女、老人、教育、房租、房贷等）:</label>
    <input type="number" id="deductions" name="deductions" required><br>

    <button type="button" onclick="calculate()">Calculate</button>
  </form>

  <h2>Result:</h2>
  <p id="result"></p>

  <script>
    async function calculate() {
      // Extract values from the form
      const startTaxPoint = parseFloat(document.getElementById('start_tax_point_month').value);
      const preTaxIncome = parseFloat(document.getElementById('pre_tax_income').value);
      const annualBonus = parseFloat(document.getElementById('annual_bonus').value);
      const bonusIncludedIncome = parseFloat(document.getElementById('bonus_included_income').value);
      const insuranceFund = parseFloat(document.getElementById('insurance_fund').value);
      const deductions = parseFloat(document.getElementById('deductions').value);

      // Create an object with the form data
      const formData = {
        start_tax_point_month: startTaxPoint,
        pre_tax_income: preTaxIncome,
        annual_bonus: annualBonus,
        bonus_included_income: bonusIncludedIncome,
        insurance_fund: insuranceFund,
        deductions: deductions,
      };

      try {
        // Send an asynchronous POST request to the server
        const response = await fetch('/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        // Parse the JSON response
        const result = await response.json();

        // Display the result on the page
        document.getElementById('result').innerHTML = `Sum: ${result.sum}, Average: ${result.average.toFixed(2)}`;
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    }
  </script>
</body>
</html>

```
