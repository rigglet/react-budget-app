import { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import styled from "styled-components";
import { motion } from "framer-motion";
import ExpenditureChart from "../ExpenditureChart";
import ExpenditureFigures from "../ExpenditureFigures";
//util functions
import {
  getYearlyAllocated,
  filterTransactionsByDateRange,
  getItemAmountForRange,
} from "../../../utilities";

const ExpenditureWidget = () => {
  const {
    currentBudget,
    dateRange,
    includeMandatory,
    includeDisposableOnly,
  } = useContext(GlobalContext);

  const { budgetItems, transactions } = currentBudget.data;
  const { dailyNet } = currentBudget.data.income;

  //mandatory budget items
  const mandatoryBudgetItems = budgetItems.filter(
    (item) => item.mandatory === true && !item.paid
  );
  //all other budget items
  const optionalBudgetItems = budgetItems.filter(
    (item) => item.mandatory === false && !item.paid
  );

  //add one day to difference to figure is inclusive of the day (otherwise 1 day = 0)
  const numOfDaysInRange = dateRange.to.diff(dateRange.from, "days") + 1;

  //Displayed figures
  let salaryForRange = 0;
  let budgetForRange = 0;
  let excessSalary = 0;
  let remainingBudget = 0;
  let spentAmount = 0;

  //Graph figures
  let spentAmountGraph = 0;
  let remainingBudgetGraph = 0;
  let remainingSalaryGraph = 0;

  //Net salary for range
  salaryForRange = numOfDaysInRange * dailyNet;

  //Total of all budget items for range
  budgetForRange =
    numOfDaysInRange *
    (getYearlyAllocated([...mandatoryBudgetItems, ...optionalBudgetItems]) /
      365);

  //Amount of mandatory budget items for range
  const mandatoryBudgetAmount = mandatoryBudgetItems
    .map((item) => {
      return getItemAmountForRange(item.frequency, item.amount, dateRange);
    })
    .reduce((acc, current) => Number(acc) + Number(current), []);

  //console.log(mandatoryBudgetAmount);

  //spend amount
  const transactionsSpentAmount = filterTransactionsByDateRange(
    transactions,
    dateRange
  ).reduce((acc, current) => {
    return (
      Number(acc) +
      (current.type === "deposit"
        ? -Math.abs(Number(current.amount))
        : Number(current.amount))
    );
  }, []);

  //TODO: perfect opportunity to learn and use testing! Jasmine?
  //INCLUDE EXCLUDE DATA ACCORDING TO SELECTED OPTIONS
  //DEFAULT: NOTHING SELECTED: not including mandatory transactions
  if (!includeMandatory) {
    //figures and graph
    spentAmount = spentAmountGraph = transactionsSpentAmount; //ok
    remainingBudget = remainingBudgetGraph = budgetForRange - spentAmount; //ok
    remainingBudget > 0
      ? (excessSalary = remainingSalaryGraph =
          salaryForRange - spentAmount - remainingBudget)
      : (excessSalary = remainingSalaryGraph = salaryForRange - spentAmount); //ok
  } else {
    //MANDATORY SELECTED: including mandatory transactions
    //figures and graph
    spentAmount = transactionsSpentAmount; //ok
    spentAmountGraph = transactionsSpentAmount + Number(mandatoryBudgetAmount); //ok

    remainingBudget = remainingBudgetGraph = budgetForRange - spentAmountGraph; //ok
    remainingBudget > 0
      ? (excessSalary = remainingSalaryGraph =
          salaryForRange - spentAmountGraph - remainingBudget)
      : (excessSalary = remainingSalaryGraph =
          salaryForRange - spentAmountGraph);
  }

  //view disposable income only
  if (includeDisposableOnly) {
    salaryForRange = salaryForRange - Number(mandatoryBudgetAmount);
    budgetForRange = budgetForRange - Number(mandatoryBudgetAmount);

    spentAmount = spentAmountGraph = transactionsSpentAmount; //ok

    remainingBudget = remainingBudgetGraph = budgetForRange - spentAmount; //ok
    remainingBudget > 0
      ? (excessSalary = remainingSalaryGraph =
          salaryForRange - spentAmount - remainingBudget)
      : (excessSalary = remainingSalaryGraph = salaryForRange - spentAmount); //ok
  }
  // else { //nothing for now -  whatever includeMandatory dictates}

  //negative numbers are shown on graph as positive numbers
  // set to 0 if negative
  if (remainingSalaryGraph < 0) remainingSalaryGraph = 0;
  if (remainingBudgetGraph < 0) remainingBudgetGraph = 0;

  return (
    <StyledExpenditure>
      <h4>Net salary vs Budget vs Expediture</h4>
      <div className="data">
        <ExpenditureFigures
          spentAmount={spentAmount}
          remainingBudget={remainingBudget}
          excessSalary={excessSalary}
          budgetForRange={budgetForRange}
          salaryForRange={salaryForRange}
          mandatoryBudgetAmount={mandatoryBudgetAmount}
        />
        <ExpenditureChart
          spentAmountGraph={spentAmountGraph}
          remainingBudgetGraph={remainingBudgetGraph}
          remainingSalaryGraph={remainingSalaryGraph}
        />
      </div>
    </StyledExpenditure>
  );
};

const StyledExpenditure = styled(motion.div)`
  padding: 1rem;
  width: 100%;
  border-radius: 4px;
  background-color: #39393c;
  color: #848586;

  h4 {
    color: white;
    font-weight: 500;
    margin-bottom: 1rem;
  }
  .data {
    display: flex;
    justify-content: space-between;
  }
  @media screen and (max-width: 1300px) {
    .data {
      display: flex;
      flex-direction: column;
      row-gap: 1rem;
      align-items: center;
    }
  }
`;

export default ExpenditureWidget;
