import Allocated from "./components/dashboard/Allocated";
import BudgetBreakdown from "./components/dashboard/BudgetBreakdown";
import Salary from "./components/dashboard/Salary";

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
  //console.log(name);
  switch (name) {
    //INCOME
    case "Budget allocated / remaining":
      return <Allocated />;
    case "Salary gross and net breakdown":
      return <Salary />;
    //BUDGET
    case "Budget breakdown by category in currency":
      return <BudgetBreakdown />;
    case "Budget breakdown by item in currency":
      return <BudgetBreakdown />;

    case "Budget breakdown by category in %":
      return <BudgetBreakdown />;

    case "Budget breakdown by item in %":
      return <BudgetBreakdown />;

    case "Budget items extrapolated over d/w/m/y":
      return <BudgetBreakdown />;

    default:
      return <Salary />;
  }
};
