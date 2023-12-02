''' 

This python scipt calculate the personal income tax 

usage:
  1. configure the consts
  2. configure the 
    工资收入（税前）、
    年终奖金额（税前）、 
    年终奖计入工资部分、 
    五险两金（个人缴纳部分）、
    专项扣除金额（子女、老人、教育、房租、房贷等）
  3. run the calculation and gives out the report
'''

# configure the const
start_tax_point_month = 5000  #月收入起征点

# ask the user to input or configure here:
salary_income_beforeTax = 226636  # 税前工资收入
reward_income_beforeTax = 298000  # 年终奖总额
reward_cal_asSalary = 155000      # 年终奖计入工资部分
five_insurances = 16776           # 五险两金（个人年缴纳部分）
special_deduction = 72000         # 专项扣除（子女、老人、教育、房租、房贷等）

# start calculation:
def calculate_salaryTaxRate(c15_value):
    if c15_value < 36000:
        return 0.03
    elif 36000 <= c15_value < 144000:
        return 0.1
    elif 144000 <= c15_value < 300000:
        return 0.2
    elif 300000 <= c15_value < 420000:
        return 0.25
    elif 420000 <= c15_value < 660000:
        return 0.3
    elif 660000 <= c15_value < 960000:
        return 0.35
    elif c15_value >= 960000:
        return 0.4
    else:
        return 0.4  # Default case, in case the input doesn't match any of the conditions

def calculate_salaryDeduction(c15_value):
    if c15_value < 36000:
        return 0
    elif 36000 <= c15_value < 144000:
        return 2520
    elif 144000 <= c15_value < 300000:
        return 16920
    elif 300000 <= c15_value < 420000:
        return 31920
    elif 420000 <= c15_value < 660000:
        return 52920
    elif 660000 <= c15_value < 960000:
        return 85920
    elif c15_value >= 960000:
        return 181920
    else:
        return 0  # Default case, in case the input doesn't match any of the conditions

def calculate_rewardTaxRate(c20_value):
    if c20_value < 36000:
        return 0.03
    elif 36000 <= c20_value < 144000:
        return 0.1
    elif 144000 <= c20_value < 300000:
        return 0.2
    elif 300000 <= c20_value < 420000:
        return 0.25
    elif 420000 <= c20_value < 660000:
        return 0.3
    elif 660000 <= c20_value < 960000:
        return 0.35
    elif c20_value >= 960000:
        return 0.45
    else:
        return -1  # Default case, if the input doesn't match any of the conditions

def calculate_rewardDeduction(c20_value):
    if c20_value < 36000:
        return 0
    elif 36000 <= c20_value < 144000:
        return 210
    elif 144000 <= c20_value < 300000:
        return 1410
    elif 300000 <= c20_value < 420000:
        return 2660
    elif 420000 <= c20_value < 660000:
        return 4410
    elif 660000 <= c20_value < 960000:
        return 7160
    elif c20_value >= 960000:
        return 15160
    else:
        return 0  # Default case, if the input doesn't match any of the conditions

#===============================
#===============================
#===============================



#综合申报额：
start_tax_point_year = 12 * start_tax_point_month  #年收入起征点
comprehensive_delaration  = salary_income_beforeTax + reward_cal_asSalary
#综合应纳税额:
comprehensive_taxable = comprehensive_delaration - start_tax_point_year - five_insurances - special_deduction
#综合所得税：
comprehensive_income_tax = comprehensive_taxable * calculate_salaryTaxRate(comprehensive_taxable) - calculate_salaryDeduction(comprehensive_taxable)

#年终奖申报额：（年终奖计入奖金部分 i.e. 年终奖应纳税额）
rewards_declaration = reward_income_beforeTax - reward_cal_asSalary
#年终奖所得税:
reward_income_tax = rewards_declaration * calculate_rewardTaxRate(rewards_declaration) - calculate_rewardDeduction(rewards_declaration)

#个人所得税 = 综合所得税+年终奖所得税：
total_income_tax = comprehensive_income_tax + reward_income_tax

print(f'you total income tax: {total_income_tax}')




# Range for reward_cal_asSalary
reward_cal_asSalary_range = range(124000, 200001, 500)

# Iterate over different values of reward_cal_asSalary
for reward_cal_asSalary in reward_cal_asSalary_range:
    # 综合申报额：
    comprehensive_declaration = salary_income_beforeTax + reward_cal_asSalary
    # 综合应纳税额:
    comprehensive_taxable = comprehensive_declaration - start_tax_point_year - five_insurances - special_deduction
    # 综合所得税：
    comprehensive_income_tax = comprehensive_taxable * calculate_salaryTaxRate(comprehensive_taxable) - calculate_salaryDeduction(comprehensive_taxable)

    # 年终奖申报额：（年终奖计入奖金部分 i.e. 年终奖应纳税额）
    rewards_declaration = reward_income_beforeTax - reward_cal_asSalary
    # 年终奖所得税:
    reward_income_tax = rewards_declaration * calculate_rewardTaxRate(rewards_declaration) - calculate_rewardDeduction(rewards_declaration)

    # 个人所得税 = 综合所得税+年终奖所得税：
    total_income_tax = comprehensive_income_tax + reward_income_tax

    print(f'For reward_cal_asSalary = {reward_cal_asSalary}, Your total income tax: {total_income_tax}')






