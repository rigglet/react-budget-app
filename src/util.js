import Allocated from "./components/dashboard/widgets/AllocatedWidget";
import BudgetByCategoryWidget from "./components/dashboard/widgets/BudgetByCategoryWidget";
import BudgetByItemWidget from "./components/dashboard/widgets/BudgetByItemWidget";
import Salary from "./components/dashboard/widgets/SalaryWidget";
import { v4 as uuidv4 } from "uuid";

export const getAccumulatedSubTotals = (currentBudget) => {
  return currentBudget.data.budgetItems.reduce(
    (acc, obj, currentIndex, array) => {
      let found = false;
      let pointer = 0;

      for (let i = 0; i < acc.length; i++) {
        if (acc[i].category === array[currentIndex].category) {
          pointer = i;
          found = true;
        }
      }
      if (!found) {
        let yearlyAmount = 0;
        switch (array[currentIndex].frequency) {
          case "daily":
            yearlyAmount = Number(array[currentIndex].amount * 365);
            break;
          case "weekly":
            yearlyAmount = Number(array[currentIndex].amount * 52);
            break;
          case "monthly":
            yearlyAmount = Number(array[currentIndex].amount * 12);
            break;
          case "annually":
            yearlyAmount = Number(array[currentIndex].amount);
            break;
          default:
            yearlyAmount = Number(array[currentIndex].amount * 12);
        }
        acc.push({
          category: array[currentIndex].category,
          amount: yearlyAmount,
        });
      } else {
        acc[pointer] = {
          ...acc[pointer],
          amount: acc[pointer].amount + array[currentIndex].amount,
        };
      }
      return acc;
    },
    []
  );
};

export const getNetIncomeForPeriod = (currentBudget, period) => {
  switch (period) {
    case "daily":
      return currentBudget.data.income.weeklyNet / 7;
    case "weekly":
      return currentBudget.data.income.weeklyNet;
    case "monthly":
      return currentBudget.data.income.monthlyNet;
    case "annually":
      return currentBudget.data.income.yearlyNet;
    default:
      return 0;
  }
};

export const getAllocatedPerPeriod = (currentBudget, period) => {
  switch (period) {
    case "daily":
      return Number(
        getYearlyAllocated(currentBudget.data.budgetItems) / 365
      ).toFixed(2);
    case "weekly":
      return Number(
        getYearlyAllocated(currentBudget.data.budgetItems) / 52
      ).toFixed(2);
    case "monthly":
      return Number(
        getYearlyAllocated(currentBudget.data.budgetItems) / 12
      ).toFixed(2);
    case "annually":
      return Number(getYearlyAllocated(currentBudget.data.budgetItems)).toFixed(
        2
      );

    default:
      return Number(0).toFixed(2);
  }
};

export const formatNumber = (number) => {
  let formattedWholeNumber = null;
  let formattedDecimalNumber = null;
  if (number > 0) {
    formattedWholeNumber = Math.floor(Number(number).toFixed(2));
    formattedDecimalNumber = (Number(number) % 1).toFixed(2).substring(1);
  } else {
    formattedWholeNumber = Number(number).toFixed(2);
    formattedDecimalNumber = "";
  }

  return (
    <>
      <span className="whole">{formattedWholeNumber}</span>
      <span className="decimal">{formattedDecimalNumber}</span>
    </>
  );
};

export const saveBudgetLocally = (budgets, newBudget) => {
  window.localStorage.setItem(
    "EXPENSE-APP",
    JSON.stringify([...budgets, newBudget])
  );
};

export const updateBudgetLocally = (budgets, updateBudget) => {
  const subSet = budgets.filter((b) => b.id !== updateBudget.id);
  window.localStorage.setItem(
    "EXPENSE-APP",
    JSON.stringify([...subSet, updateBudget])
  );
};

export const deleteBudgetLocally = (budgets, id) => {
  const newBudgets = budgets.filter((b) => b.id !== id);
  window.localStorage.setItem("EXPENSE-APP", JSON.stringify([...newBudgets]));
};

export const getWidget = (name) => {
  switch (name) {
    //INCOME
    case "Budget allocated / remaining":
      return <Allocated key="allocated" />;
    case "Salary gross and net breakdown":
      return <Salary key={uuidv4()} />;
    //BUDGET
    case "Budget breakdown by category":
      return <BudgetByCategoryWidget key={uuidv4()} />;
    case "Budget breakdown by item":
      return <BudgetByItemWidget key={uuidv4()} />;

    case "Budget breakdown by category in %":
      return <BudgetByItemWidget key={uuidv4()} />;

    case "Budget breakdown by item in %":
      return <BudgetByItemWidget key={uuidv4()} />;

    case "Budget items extrapolated over d/w/m/y":
      return <BudgetByItemWidget key={uuidv4()} />;

    default:
      return <Salary key={uuidv4()} />;
  }
};

export const getYearlyAllocated = (budgetItems) => {
  if (typeof budgetItems !== undefined || !budgetItems.length === 0) {
    return budgetItems
      .map((item) => {
        if (item.frequency === "daily") {
          return item.amount * 365;
        }
        if (item.frequency === "weekly") {
          return item.amount * 52;
        }
        if (item.frequency === "monthly") {
          return item.amount * 12;
        }
        if (item.frequency === "annually") {
          return item.amount;
        }
        return item.amount;
      })
      .reduce((acc, current) => acc + current);
  } else {
    return [];
  }
};
