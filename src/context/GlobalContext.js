import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  //   const [budgets, setBudgets] = useState([
  //     {
  //       id: 1,
  //       saveName: "Julie",
  //       saveDate: "02/10/2020",
  //       description: "Julie salary budget",
  //       data: {
  //         budgetItems: [
  //           {
  //             id: 1,
  //             category: "accommodation",
  //             item: "rent",
  //             frequency: "weekly",
  //             amount: 288.0,
  //           },
  //           {
  //             id: 2,
  //             category: "bills",
  //             item: "phone",
  //             frequency: "monthly",
  //             amount: 51.57,
  //           },
  //           {
  //             id: 3,
  //             category: "bills",
  //             item: "council tax",
  //             frequency: "monthly",
  //             amount: 11.39,
  //           },
  //           {
  //             id: 4,
  //             category: "car",
  //             item: "tax",
  //             frequency: "annually",
  //             amount: 150.0,
  //           },
  //           {
  //             id: 5,
  //             category: "car",
  //             item: "insurance",
  //             frequency: "annually",
  //             amount: 353.17,
  //           },
  //         ],
  //         income: {
  //           annual: "63000.00",
  //           allowance: "12509.00",
  //           taxable: "50491.00",
  //           tax: "12698.20",
  //           ni: "5120.00",
  //           contributions: "21802.08",
  //           yearlyNet: "41197.92",
  //           monthlyNet: "3433.16",
  //           weeklyNet: "792.27",
  //         },
  //       },
  //     },
  //     {
  //       id: 2,
  //       saveName: "Neil",
  //       saveDate: "02/10/2020",
  //       description: "Neil salary budget",
  //       data: {
  //         budgetItems: [
  //           {
  //             id: 1,
  //             category: "accommodation",
  //             item: "rent",
  //             frequency: "weekly",
  //             amount: 10.0,
  //           },
  //           {
  //             id: 2,
  //             category: "bills",
  //             item: "phone",
  //             frequency: "monthly",
  //             amount: 10.0,
  //           },
  //           {
  //             id: 3,
  //             category: "bills",
  //             item: "council tax",
  //             frequency: "monthly",
  //             amount: 0.0,
  //           },
  //           {
  //             id: 4,
  //             category: "car",
  //             item: "tax",
  //             frequency: "annually",
  //             amount: 40.0,
  //           },
  //           {
  //             id: 5,
  //             category: "car",
  //             item: "insurance",
  //             frequency: "annually",
  //             amount: 0.17,
  //           },
  //         ],
  //         income: {
  //           annual: "15000.00",
  //           allowance: "0.00",
  //           taxable: "0.00",
  //           tax: "0.20",
  //           ni: "0.00",
  //           contributions: "0.00",
  //           yearlyNet: "150000.00",
  //           monthlyNet: "0.00",
  //           weeklyNet: "0.00",
  //         },
  //       },
  //     },
  //   ]);

  const [budgets, setBudgets] = useState([]);

  return (
    <GlobalContext.Provider value={[budgets, setBudgets]}>
      {props.children}
    </GlobalContext.Provider>
  );
};
