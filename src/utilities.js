// import Allocated from "./components/dashboard/widgets/AllocatedWidget";
// import BudgetByCategoryWidget from "./components/dashboard/widgets/BudgetByCategoryWidget";
// import BudgetByItemWidget from "./components/dashboard/widgets/BudgetByItemWidget";
// import Salary from "./components/dashboard/widgets/SalaryWidget";
// import ExpenditureWidget from "./components/dashboard/widgets/ExpenditureWidget";
// import AnnualOverviewWidget from "./components/dashboard/widgets/AnnualOverviewWidget";
//import { v4 as uuidv4 } from "uuid";
//import moment from "moment";

export const getColor = () => {
   var letters = "0123456789ABCDEF";
   var color = "#";
   for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
   }
   return color;
};

export const getLocalData = (localName = "EXPENSE-APP") => {
   //return data "EXPENSE-APP"
   const localData = JSON.parse(window.localStorage.getItem(localName));

   return new Promise((resolve, reject) => {
      if (localData !== undefined && localData !== null) {
         setTimeout(() => {
            resolve(localData);
         }, 500);
      } else {
         reject(Error("Error: No local data returned"));
      }
   });
};

export const divideValues = (o) => {
   let newobj = {};
   for (const key in o) {
      newobj = { ...newobj, [key]: o[key] / 100 };
   }
   return newobj;
};

export const multiplyValues = (o) => {
   let newobj = {};
   for (const key in o) {
      newobj = { ...newobj, [key]: o[key] * 100 };
   }
   return newobj;
};

export const convertToNumbers = (o) => {
   let newobj = {};
   for (const key in o) {
      newobj = { ...newobj, [key]: Number(o[key]) };
   }
   return newobj;
};

export const formatStrings = (o) => {
   let newobj = {};
   for (const key in o) {
      newobj = { ...newobj, [key]: Number(o[key]).toFixed(2) };
   }
   return newobj;
};

export const calculateFundsTotal = (currentBudget) => {
   return currentBudget?.data?.budgetCategories
      .map((category) => category?.amount)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
};

// //returns an array of budget subtotals per category
// export const getAccumulatedSubTotals = (currentBudget) => {
//   console.log(currentBudget)
//   return currentBudget?.data?.budgetItems.reduce(
//     (acc, obj, currentIndex, array) => {
//       let found = false;
//       let pointer = 0;

//       for (let i = 0; i < acc.length; i++) {
//         if (acc[i].category === array[currentIndex].category) {
//           pointer = i;
//           found = true;
//         }
//       }
//       if (!found) {
//         let yearlyAmount = 0;
//         switch (array[currentIndex].frequency) {
//           case "daily":
//             yearlyAmount = Number(array[currentIndex].amount * 365);
//             break;
//           case "weekly":
//             yearlyAmount = Number(array[currentIndex].amount * 52);
//             break;
//           case "monthly":
//             yearlyAmount = Number(array[currentIndex].amount * 12);
//             break;
//           case "annually":
//             yearlyAmount = Number(array[currentIndex].amount);
//             break;
//           default:
//             yearlyAmount = Number(array[currentIndex].amount * 12);
//         }
//         acc.push({
//           category: array[currentIndex].category,
//           amount: yearlyAmount,
//         });
//       } else {
//         acc[pointer] = {
//           ...acc[pointer],
//           amount: acc[pointer].amount + array[currentIndex].amount,
//         };
//       }
//       return acc;
//     },
//     []
//   );
// };

// //returns an array of budget subtotals per category
// export const getAccumulatedSubTotals = (currentBudget) => {
//   //console.log(currentBudget)

//   return currentBudget?.data?.budgetCategories.reduce(
//     (acc, obj, currentIndex, array) => {
//       let found = false;
//       let pointer = 0;

//       for (let i = 0; i < acc.length; i++) {
//         if (acc[i].category === array[currentIndex].category) {
//           pointer = i;
//           found = true;
//         }
//       }
//       if (!found) {
//         let yearlyAmount = 0;
//         switch (array[currentIndex].frequency) {
//           case "daily":
//             yearlyAmount = Number(array[currentIndex].amount * 365);
//             break;
//           case "weekly":
//             yearlyAmount = Number(array[currentIndex].amount * 52);
//             break;
//           case "monthly":
//             yearlyAmount = Number(array[currentIndex].amount * 12);
//             break;
//           case "annually":
//             yearlyAmount = Number(array[currentIndex].amount);
//             break;
//           default:
//             yearlyAmount = Number(array[currentIndex].amount * 12);
//         }
//         acc.push({
//           category: array[currentIndex].category,
//           amount: yearlyAmount,
//         });
//       } else {
//         acc[pointer] = {
//           ...acc[pointer],
//           amount: acc[pointer].amount + array[currentIndex].amount,
//         };
//       }
//       return acc;
//     },
//     []
//   );
// };

//returns an array of budget subtotals per category
export const getAccumulatedSubTotals = (currentBudget, period) => {
   return currentBudget?.data?.budgetCategories.map((category) => {
      let itemTotal = category.items.reduce(
         (acc, obj, currentIndex, array) => acc + array[currentIndex].amount,
         0
      );
      let categoryTotal = 0;

      switch (period) {
         case "daily":
            categoryTotal = Number(category.amount / 100 / 365);
            itemTotal = Number(itemTotal / 365);
            break;
         case "weekly":
            categoryTotal = Number(category.amount / 100 / 52);
            itemTotal = Number(itemTotal / 52);
            break;
         case "monthly":
            categoryTotal = Number(category.amount / 100 / 12);
            itemTotal = Number(itemTotal / 12);
            break;
         case "annually":
            categoryTotal = Number(category.amount / 100);
            itemTotal = Number(itemTotal);
            break;
         default:
            categoryTotal = Number(category.amount / 100 / 12);
            itemTotal = Number(itemTotal / 12);
      }

      return {
         category: category.category,
         categoryTotal: categoryTotal,
         itemTotal: itemTotal,
      };
   });

   // return currentBudget?.data?.budgetCategories.reduce(
   //   (acc, obj, currentIndex, array) => {
   //     let found = false;
   //     let pointer = 0;

   //     for (let i = 0; i < acc.length; i++) {
   //       if (acc[i].category === array[currentIndex].category) {
   //         pointer = i;
   //         found = true;
   //       }
   //     }
   //     if (!found) {
   //       let yearlyAmount = 0;
   //       switch (array[currentIndex].frequency) {
   //         case "daily":
   //           yearlyAmount = Number(array[currentIndex].amount * 365);
   //           break;
   //         case "weekly":
   //           yearlyAmount = Number(array[currentIndex].amount * 52);
   //           break;
   //         case "monthly":
   //           yearlyAmount = Number(array[currentIndex].amount * 12);
   //           break;
   //         case "annually":
   //           yearlyAmount = Number(array[currentIndex].amount);
   //           break;
   //         default:
   //           yearlyAmount = Number(array[currentIndex].amount * 12);
   //       }
   //       acc.push({
   //         category: array[currentIndex].category,
   //         amount: yearlyAmount,
   //       });
   //     } else {
   //       acc[pointer] = {
   //         ...acc[pointer],
   //         amount: acc[pointer].amount + array[currentIndex].amount,
   //       };
   //     }
   //     return acc;
   //   },
   //   []
   // );
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
         return currentBudget.data.income.annualNet;
      default:
         return 0;
   }
};

// export const getAllocatedPerPeriod = (currentBudget, period) => {
//   switch (period) {
//     case "daily":
//       return Number(getYearlyAllocated(currentBudget.data.budgetItems) / 365);
//     case "weekly":
//       return Number(getYearlyAllocated(currentBudget.data.budgetItems) / 52);
//     case "monthly":
//       return Number(getYearlyAllocated(currentBudget.data.budgetItems) / 12);
//     case "annually":
//       return Number(getYearlyAllocated(currentBudget.data.budgetItems));

//     default:
//       return Number(0);
//   }
// };

export const getAllocatedPerPeriod = (allocated, period) => {
   switch (period) {
      case "daily":
         return Number(allocated / 365);
      case "weekly":
         return Number(allocated / 52);
      case "monthly":
         return Number(allocated / 12);
      case "annually":
         return Number(allocated);

      default:
         return Number(0);
   }
};

export const formatNumber = (number) => {
   let formattedWholeNumber = null;
   let formattedDecimalNumber = null;
   formattedWholeNumber = Math.floor(Number(number).toFixed(2));
   formattedDecimalNumber = (Number(number) % 1).toFixed(2).substring(1);
   // if (number >= 0) {
   //    formattedWholeNumber = Math.floor(Number(number).toFixed(2));
   //    formattedDecimalNumber = (Number(number) % 1).toFixed(2).substring(1);
   // } else {
   //    formattedWholeNumber = Number(number).toFixed(2);
   //    formattedDecimalNumber = "";
   // }

   return (
      <>
         <span className="whole">{formattedWholeNumber}</span>
         <span className="decimal">{formattedDecimalNumber}</span>
      </>
   );
};

// export const saveBudgetLocally = (newBudget) => {
//   window.localStorage.setItem(
//     "EXPENSE-APP",
//     JSON.stringify(newBudget)
//   );
// };

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

// export const updateBudgetLocally = (updateBudget) => {
//   //const subSet = budgets.filter((b) => b.id !== updateBudget.id);
//   window.localStorage.setItem(
//     "EXPENSE-APP",
//     JSON.stringify(updateBudget)
//   );
// };

export const deleteBudgetLocally = (budgets, id) => {
   const newBudgets = budgets.filter((b) => b.id !== id);
   window.localStorage.setItem("EXPENSE-APP", JSON.stringify([...newBudgets]));
};

// export const getWidget = (name) => {
//   switch (name) {
//     //INCOME
//     case "Budget allocated / remaining":
//       return <Allocated key="allocated" />;
//     case "Salary gross and net breakdown":
//       return <Salary key={uuidv4()} />;
//     //BUDGET
//     case "Budget breakdown by category":
//       return <BudgetByCategoryWidget key={uuidv4()} />;
//     case "Budget breakdown by item":
//       return <BudgetByItemWidget key={uuidv4()} />;
//     case "Expenditure":
//       return <ExpenditureWidget key={uuidv4()} />;
//     case "Tracker":
//       return <AnnualOverviewWidget key={uuidv4()} />;

//     default:
//       return <Salary key={uuidv4()} />;
//   }
// };

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

//returns an total figure of all budgets items for the year averaged to a daily figure
export const getYearlyAllocatedPerDay = (budgetItems) => {
   return (
      budgetItems
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
         .reduce((acc, current) => Number(acc) + Number(current), []) / 365
   );
};

// custom sort function to sort by category
// then by item inside that category
// builds new array with sorted results
// Quite proud of this!
export const sortByCategoryThenByItem = (arr) => {
   let arrSortedByItem = [];

   //ceate set of unique category names
   let uniqueSet = new Set();
   arr?.map((item) => uniqueSet.add(item.category));

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

// export const getToday = () => {
//   const date = new Date(Date.now());
//   let day = date.getDate();
//   let month = date.getMonth() + 1;
//   let year = date.getFullYear();
//   if (month < 10) month = `0${month}`;
//   return year + "-" + month + "-" + day;
// };

// export const getTodayDDMMYYY = () => {
//   const date = new Date(Date.now());
//   let day = date.getDate();
//   let month = date.getMonth() + 1;
//   let year = date.getFullYear();
//   if (month < 10) month = `0${month}`;
//   return day + "-" + month + "-" + year;
// };

//isBetween is exclusive by default, so to make inclusive of shown date
//so subtract  by 1 day from 'from'
//add 1 day to 'to'
// export const filterTransactionsByDateRange = (transactions, range) => {
//   return transactions.filter((transaction) => {
//     return moment(transaction.date).isBetween(
//       moment(range.from).subtract(1, "M"),
//       moment(range.to).add(1, "M"),
//       "month"
//     );
//   }, []);
// };

// export const filterTransactionsByDateRangeAndReturnTotal = (
//   transactions,
//   range
// ) => {
//   return transactions
//     .filter((transaction) => {
//       if (
//         moment(transaction.date).isBetween(
//           moment(range.from).subtract(1, "M"),
//           moment(range.to).add(1, "M"),
//           "month"
//         )
//       ) {
//         return transaction;
//       }
//       else {
//         return null;
//       }
//     }, [])
//     .map((transaction) => transaction.amount)
//     .reduce((acc, current) => Number(acc) + Number(current), []);
// };

// //getAllocatedFilteredByMonth
// export const getAllocatedFilteredByMonth = (transactions, month) => {
//   return transactions.filter((transaction) => {
//     return moment(transaction.date).isBetween(
//       moment(range.from).subtract(1, "d"),
//       moment(range.to).add(1, "d"),
//       "day"
//     );
//   }, []);
// };

// const spentAmount = filterByDateRange(transactions, dateRange).reduce(
//   (acc, current) => {
//     return (
//       Number(acc) +
//       (current.type === "deposit"
//         ? -Math.abs(Number(current.amount))
//         : Number(current.amount))
//     );
//   },
//   []
// );

export const getItemAmountForRange = (frequency, amount, dateRange) => {
   //add one day to difference to figure is inclusive of the day (otherwise 1 day = 0)
   const numOfDays = dateRange.to.diff(dateRange.from, "days") + 1;

   if (frequency === "daily") {
      return amount * numOfDays;
   }
   if (frequency === "weekly") {
      return ((amount * 52) / 365) * numOfDays;
   }
   if (frequency === "monthly") {
      return ((amount * 12) / 365) * numOfDays;
   }
   if (frequency === "annually") {
      return (amount / 365) * numOfDays;
   }
};
