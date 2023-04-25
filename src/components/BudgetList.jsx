import { useContext, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { GlobalContext } from "../context/GlobalContext";
import { updateBudgetLocally, calculateFundsTotal } from "../utilities";
//import CategorizedBudget from "./CategorizedBudget";
import BudgetListSummary from "./BudgetListSummary";
import { formatNumber } from "../utilities";
import { FaTrashAlt } from "react-icons/fa";
import { v4 } from "uuid";

const BudgetList = () => {
   const {
      budgets,
      currentBudget,
      updateBudget,
      updateCurrentBudget,
      updateAllocatedFunds,
      currencySymbol,
   } = useContext(GlobalContext);

   const budgetCategories = currentBudget.data.budgetCategories;

   const income = currentBudget.data.income.annualNet / 100;

   const budgetTotal =
      currentBudget.data.budgetCategories.reduce(
         (previousValue, currentValue) => previousValue + currentValue.amount,
         0
      ) / 100;

   const budgetPercentages = currentBudget.data.budgetCategories.map(
      (category) => {
         return {
            category: category.category,
            percentage: (100 / income) * (category.amount / 100),
         };
      }
   );

   const deleteBudgetCategory = (id) => {
      const newBudget = {
         ...currentBudget,
         data: {
            ...currentBudget.data,
            budgetCategories: budgetCategories.filter((item) => item.id !== id),
         },
      };

      updateAllocatedFunds(calculateFundsTotal(newBudget));

      //update global context
      updateBudget(newBudget);

      //update local storage
      updateBudgetLocally(budgets, newBudget);

      //updatecurrentBudget
      updateCurrentBudget(newBudget);
   };

   return (
      <StyledBudgetList>
         <BudgetListSummary
            budgetTotal={budgetTotal}
            income={income}
            budgetPercentages={budgetPercentages}
         />

         <div className="budget-category-list">
            {budgetCategories
               .sort((a, b) => (a.category > b.category ? 1 : -1))
               .map((category) => (
                  <div
                     className="category-item"
                     key={v4()}
                  >
                     <h4 className="category-name">{category.category}</h4>
                     <h5 className="category-percentage">
                        <span className="number">
                           {Number(
                              Number(100 / income) *
                                 Number(category.amount / 100)
                           ).toFixed()}
                           %
                        </span>
                     </h5>
                     <div className="category-total">
                        {currencySymbol}
                        {formatNumber(Number(category.amount / 100).toFixed(2))}
                     </div>

                     <div
                        className="actions"
                        onClick={() => deleteBudgetCategory(category.id)}
                     >
                        <FaTrashAlt className="delete-icon" />
                     </div>
                  </div>
               ))}
         </div>
      </StyledBudgetList>
   );
};

// <CategorizedBudget
//    key={category.id}
//    budgetCategory={category}
//    deleteBudgetCategory={deleteBudgetCategory}
// />

const StyledBudgetList = styled(motion.div)`
   display: flex;
   flex-direction: column;
   row-gap: 1rem;
   color: #848586;

   .list-container {
      display: flex;
      flex-direction: column;
      //align-items: center;
      justify-content: center;
      width: 100%;
      row-gap: 0.75rem;
   }
   .no-data-message {
      width: 100%;
      text-align: center;
   }
   .budget-category-list {
      //display: flex;
      //flex-direction: column;
      //gap: 0.5rem;
      //position: relative;

      display: flex;
      align-self: center;
      justify-content: center;

      flex-wrap: wrap;
      flex-grow: 1;
      width: 100%;
      padding: 1rem;
      border-radius: 4px;
      background-color: #39393c;
      color: #848586;
      transition: 0.3s ease all;
      flex-direction: column;
      row-gap: 0.5rem;

      .category-item {
         margin: 0 auto;
         display: flex;

         //grid-auto-columns: 1fr 1fr 1fr;
         align-items: center;
         justify-content: space-between;
         flex-grow: 1;
         border: 1px solid grey;
         border-radius: 8px;
         padding: 0.5rem;
         min-width: 150px;
         position: relative;
         width: 70%;

         &:hover .actions {
            width: 100px;
         }

         .category-name {
            font-variant-caps: all-small-caps;
            font-size: 1.2rem;
            font-weight: bold;
         }

         .category-total {
            color: whitesmoke;
            background-color: #39393c;
            //flex-grow: 1;
         }

         .category-percentage {
            position: absolute;
            width: 98%;
            display: flex;
            justify-content: center;
         }
      }
   }

   .actions {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      bottom: 0;
      right: 0;
      height: 100%;
      width: 0px;
      background-color: #b87272;
      border-radius: 8px;
      transition: 0.3s ease all;
      //pointer-events: none;
      cursor: pointer;

      .delete-icon {
         height: 50%;
         width: 50%;
         border-radius: 4px;
         background-color: #b87272;
         pointer: cursor;
         color: whitesmoke;
      }
   }
`;

export default BudgetList;
