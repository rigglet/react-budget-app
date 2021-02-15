import Allocated from "./components/dashboard/widgets/AllocatedWidget";
import BudgetByCategoryWidget from "./components/dashboard/widgets/BudgetByCategoryWidget";
import BudgetByItemWidget from "./components/dashboard/widgets/BudgetByItemWidget";
import Salary from "./components/dashboard/widgets/SalaryWidget";
import ExpenditureWidget from "./components/dashboard/widgets/ExpenditureWidget";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

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
      return Number(getYearlyAllocated(currentBudget.data.budgetItems) / 365);
    case "weekly":
      return Number(getYearlyAllocated(currentBudget.data.budgetItems) / 52);
    case "monthly":
      return Number(getYearlyAllocated(currentBudget.data.budgetItems) / 12);
    case "annually":
      return Number(getYearlyAllocated(currentBudget.data.budgetItems));

    default:
      return Number(0);
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
    case "Expenditure":
      return <ExpenditureWidget key={uuidv4()} />;
    // case "Tracker":
    //   return <TrackerWidget key={uuidv4()} />;

    default:
      return <Salary key={uuidv4()} />;
  }
};

//returns an total figure of all budgets items for the year
//eg:  $1 per week = $52
//    $1 per month = $12
//    yearly total = $64
export const getYearlyAllocated = (budgetItems) => {
  return budgetItems
    .map((item) => {
      if (!item.paid) {
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
      }
      return 0;
    })
    .reduce((acc, current) => Number(acc) + Number(current), []);
};

// custom sort function to sort by category
// then by item inside that category
// builds new array with sorted results
// Quite proud of this!
export const sortByCategoryThenByItem = (arr) => {
  let arrSortedByItem = [];

  //ceate set of unique category names
  let uniqueSet = new Set();
  arr.map((item) => uniqueSet.add(item.category));

  uniqueSet.forEach((category) => {
    arrSortedByItem.push(
      ...arr
        .sort((a, b) => (a.category > b.category ? 1 : -1))
        .filter((item) => item.category === category)
        .sort((a, b) => (a.item > b.item ? 1 : -1))
    );
  });

  return arrSortedByItem;
};

// export const sortByCategoryThenByItem = (arr) => {
//   let uniqueSet = new Set();
//   let sortedByCat = [];
//   let sortedByItem = [];
//   sortedByCat = arr.sort((a, b) => (a.category > b.category ? 1 : -1));
//   arr.map((item) => uniqueSet.add(item.category));
//   uniqueSet.forEach((category) => {
//     sortedByItem.push(
//       ...sortedByCat
//         .filter((item) => item.category === category)
//         .sort((a, b) => (a.item > b.item ? 1 : -1))
//     );
//   });
//   return sortedByItem;
// };

export const getToday = () => {
  const date = new Date(Date.now());
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  if (month < 10) month = `0${month}`;
  return year + "-" + month + "-" + day;
};

export const getTodayDDMMYYY = () => {
  const date = new Date(Date.now());
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  if (month < 10) month = `0${month}`;
  return day + "-" + month + "-" + year;
};

//isBetween is exclusive by default, so to make inclusive of shown date
//so subtract  by 1 day from 'from'
//add 1 day to 'to'
export const filterBydateRange = (transactions, range) => {
  return transactions.filter((transaction) => {
    return moment(transaction.date).isBetween(
      moment(range.from).subtract(1, "d"),
      moment(range.to).add(1, "d"),
      "day"
    );
  }, []);
};
