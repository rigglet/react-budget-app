import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaTrashAlt } from "react-icons/fa";
import Progressbar from "./Progressbar";

import {
   updateBudgetLocally,
   formatNumber,
   calculateFundsTotal,
} from "../utilities";

const ExpenseCategory = ({ budgetCategory }) => {
   const {
      budgets,
      currentBudget,
      updateBudget,
      updateCurrentBudget,
      currencySymbol,
      updateAllocatedFunds,
   } = useContext(GlobalContext);

   const deleteCategoryItem = (id) => {
      const updatedBudget = {
         ...currentBudget,
         data: {
            ...currentBudget.data,
            budgetCategories: [
               ...currentBudget.data.budgetCategories.filter(
                  (category) => category.id !== budgetCategory.id
               ),
               {
                  ...budgetCategory,
                  items: [
                     ...budgetCategory.items.filter((item) => item.id !== id),
                  ],
               },
            ],
         },
      };

      updateAllocatedFunds(calculateFundsTotal(updatedBudget));

      //update global context
      updateBudget(updatedBudget);

      //update local storage
      updateBudgetLocally(budgets, updatedBudget);

      //updatecurrentBudget
      updateCurrentBudget(updatedBudget);
   };

   let itemTotal = budgetCategory?.items
      ?.map((i) => i.amount)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
   const budgetTotal = budgetCategory?.amount / 100;
   //const preformatedItemtotal = itemTotal;
   let categorisedPercentage = 0;

   if (itemTotal > 0 && budgetTotal > 0) {
      categorisedPercentage = (itemTotal / budgetTotal) * 100;
   }

   itemTotal = formatNumber(Number(itemTotal));

   return (
      <StyledExpenseCategory selectedColor={budgetCategory.color}>
         <div className="list-container">
            <>
               <div className="titlebar">
                  <h4>
                     <div className="category-color"></div>
                     <span className="category-name">
                        {budgetCategory?.category}
                     </span>
                     &nbsp;expense items
                  </h4>
                  <div className="total">
                     {currencySymbol}
                     {itemTotal} / {currencySymbol}
                     {formatNumber(Number(budgetTotal).toFixed(2))}
                  </div>
               </div>

               <Progressbar percentage={categorisedPercentage} />
            </>

            {budgetCategory?.items?.length > 0 ? (
               <>
                  {/* <div className="key">
                     <div className="element">
                        <div className="color key-deposit"></div>
                        <h5 className="legend">Deposit</h5>
                     </div>
                     <div className="element">
                        <div className="color key-withdrawal"></div>
                        <h5 className="legend">Withdrawal</h5>
                     </div>
                  </div> */}
                  <div className="expense-list">
                     {budgetCategory?.items
                        .sort((a, b) => (a.item > b.item ? 1 : -1))
                        .map((item) => (
                           <div
                              className="expense"
                              key={item.id}
                           >
                              <p
                                 className={
                                    item.amount > 0
                                       ? "expense-name withdrawal"
                                       : "expense-name deposit"
                                 }
                              >
                                 {item.item}
                              </p>
                              {/* <p className={item.amount > 0 ? "withdrawal" : "deposit"}>{item.amount > 0 ? "Withdrawal" : "Deposit"}</p> */}
                              <p
                                 className={
                                    item.amount > 0 ? "withdrawal" : "deposit"
                                 }
                              >
                                 ${item.amount}
                              </p>
                              <div
                                 className="item-actions"
                                 onClick={() => deleteCategoryItem(item.id)}
                              >
                                 <FaTrashAlt className="item-delete-icon" />
                              </div>
                           </div>
                        ))}
                  </div>
               </>
            ) : (
               <p className="no-data-message">No data to display</p>
            )}
         </div>
      </StyledExpenseCategory>
   );
};

const StyledExpenseCategory = styled(motion.div)`
   position: relative;
   padding: 1rem;
   border-radius: 4px;
   background-color: #39393c;
   color: #848586;
   transition: 0.3s ease all;
   display: flex;
   flex-direction: column;
   row-gap: 0.5rem;

   .category-name {
      font-variant-caps: all-small-caps;
      font-size: 1.2rem;
      font-weight: bold;
      color: var(--highlight-color);
   }

   &:hover .actions {
      width: 100px;
   }

   .item-actions {
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      bottom: 0;
      right: 0;
      height: 100%;
      width: 0px;
      background-color: #b87272;
      transition: 0.3s ease all;
      cursor: pointer;

      .item-delete-icon {
         height: 50%;
         width: 50%;
         border-radius: 4px;
         background-color: #b87272;
         pointer: cursor;
         color: whitesmoke;
      }
   }
   .actions {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      bottom: 0;
      right: 0;
      height: 3rem;
      width: 0px;
      background-color: #b87272;
      border-radius: 4px;
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
   .expense-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 70%;
      align-self: center;
      flex-wrap: wrap;
      flex-grow: 1;

      .expense {
         display: flex;
         align-items: center;
         justify-content: space-around;
         flex-grow: 1;
         border: 1px solid grey;
         border-radius: 8px;
         padding: 0.5rem;
         min-width: 150px;
         position: relative;

         &:hover .item-actions {
            width: 100px;
         }

         .expense-name {
            font-variant-caps: all-small-caps;
            font-size: 1.2rem;
            font-weight: bold;
         }
         p {
            color: whitesmoke;
            background-color: #39393c;
            //flex-grow: 1;
         }
      }
   }

   .titlebar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: whitesmoke;
      h4 {
         display: flex;
         justify-content: flex-start;
         align-items: center;
         column-gap: 1rem;
         color: white;
         font-weight: 500;
         //margin-bottom: 1rem;
      }
      .category-color {
         width: 25px;
         height: 25px;
         border-radius: 4px;
         border: 2px solid #848586;
         background: ${({ selectedColor }) => selectedColor};
      }
   }
   /* .item-buttons {
      display: flex;
      align-items: center;
      justify-content: flex-end;
   }
   .add-buttons {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 100%;
      padding: 0rem;
      column-gap: 2rem;
   } */
`;

export default ExpenseCategory;
