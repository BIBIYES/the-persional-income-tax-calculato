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

//   console.log(`Calculate(): ${startTaxPoint}, ${preTaxIncome}, ${annualBonus}, ${bonusIncludedIncome} `);
  // Calculate sum and average
  const sum = startTaxPoint + preTaxIncome + annualBonus + bonusIncludedIncome + insuranceFund + deductions;
  const average = sum / 6;

  // Send the result back to the frontend
  res.json({ sum, average });
});

// Handle income tax calculation
app.post('/calculateTax', (req, res) => {
  // Extract values from the form and parse as integers
  const startTaxPointMonth = parseInt(req.body.start_tax_point_month, 10);
  const salaryIncomeBeforeTax = parseInt(req.body.pre_tax_income, 10);
  const rewardIncomeBeforeTax = parseInt(req.body.annual_bonus, 10);
  const rewardCalAsSalary = parseInt(req.body.bonus_included_income, 10);
  const fiveInsurances = parseInt(req.body.insurance_fund, 10);
  const specialDeduction = parseInt(req.body.deductions, 10);

  // Perform the income tax calculation
  const startTaxPointYear = 12 * startTaxPointMonth;
  const comprehensiveDeclaration = salaryIncomeBeforeTax + rewardCalAsSalary;
  const comprehensiveTaxable = comprehensiveDeclaration - startTaxPointYear - fiveInsurances - specialDeduction;
  const comprehensiveIncomeTax = calculateSalaryTax(comprehensiveTaxable) - calculateSalaryDeduction(comprehensiveTaxable);

  const rewardsDeclaration = rewardIncomeBeforeTax - rewardCalAsSalary;
  const rewardIncomeTax = calculateRewardTax(rewardsDeclaration) - calculateRewardDeduction(rewardsDeclaration);

  const totalIncomeTax = comprehensiveIncomeTax + rewardIncomeTax;

  res.json({ totalIncomeTax });
});

// Add this function inside your index.js file
function calculateSalaryTax(declarationVal) {
  if (declarationVal < 36000) {
    return declarationVal * 0.03;
  } else if (36000 < declarationVal && declarationVal <= 144000) {
    return declarationVal * 0.1;
  } else if (144000 < declarationVal && declarationVal <= 300000) {
    return declarationVal * 0.2;
  } else if (300000 < declarationVal && declarationVal <= 420000) {
    return declarationVal * 0.25;
  } else if (420000 < declarationVal && declarationVal <= 660000) {
    return declarationVal * 0.3;
  } else if (660000 < declarationVal && declarationVal <= 960000) {
    return declarationVal * 0.35;
  } else if (declarationVal > 960000) {
    return declarationVal * 0.4;
  } else {
    return 0;  // Default case, if the input doesn't match any of the conditions
  }
}

// Add this function inside your index.js file
function calculateSalaryDeduction(declarationVal) {
    if (declarationVal < 36000) {
      return 0;
    } else if (36000 < declarationVal && declarationVal <= 144000) {
      return 2520;
    } else if (144000 < declarationVal && declarationVal <= 300000) {
      return 16920;
    } else if (300000 < declarationVal && declarationVal <= 420000) {
      return 31920;
    } else if (420000 < declarationVal && declarationVal <= 660000) {
      return 52920;
    } else if (660000 < declarationVal && declarationVal <= 960000) {
      return 85920;
    } else if (declarationVal > 960000) {
      return 181920;
    } else {
      return 0;  // Default case, if the input doesn't match any of the conditions
    }
  }

// Add these functions inside your index.js file

function calculateRewardTax(declarationVal) {
    if (declarationVal < 36000) {
      return declarationVal * 0.03;
    } else if (36000 < declarationVal && declarationVal <= 144000) {
      return declarationVal * 0.1;
    } else if (144000 < declarationVal && declarationVal <= 300000) {
      return declarationVal * 0.2;
    } else if (300000 < declarationVal && declarationVal <= 420000) {
      return declarationVal * 0.25;
    } else if (420000 < declarationVal && declarationVal <= 660000) {
      return declarationVal * 0.3;
    } else if (660000 < declarationVal && declarationVal <= 960000) {
      return declarationVal * 0.35;
    } else if (declarationVal > 960000) {
      return declarationVal * 0.45;
    } else {
      return -1;  // Default case, if the input doesn't match any of the conditions
    }
  }

function calculateRewardDeduction(declarationVal) {
    if (declarationVal < 36000) {
      return 0;
    } else if (36000 < declarationVal && declarationVal <= 144000) {
      return 210;
    } else if (144000 < declarationVal && declarationVal <= 300000) {
      return 1410;
    } else if (300000 < declarationVal && declarationVal <= 420000) {
      return 2660;
    } else if (420000 < declarationVal && declarationVal <= 660000) {
      return 4410;
    } else if (660000 < declarationVal && declarationVal <= 960000) {
      return 7160;
    } else if (declarationVal > 960000) {
      return 15160;
    } else {
      return 0;  // Default case, if the input doesn't match any of the conditions
    }
  }

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
