import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import styled from "styled-components";
import { motion } from "framer-motion";
import MultipartProgressbar from "./MultipartProgressbar";
import { formatNumber } from "../utilities";

const BudgetListSummary = ({ budgetTotal, income, budgetPercentages }) => {
   const { currencySymbol } = useContext(GlobalContext);
   const totalPercentage = (100 / income) * budgetTotal;

   return (
      <StyledBudgetListSummary>
         <div className="titlebar">
            <h4 className="category-name">Budget allocated</h4>
            <h5 className="percentage">
               <span className="number">
                  {Number(totalPercentage).toFixed()}%
               </span>
            </h5>
            <div className="total">
               {currencySymbol}
               {formatNumber(Number(budgetTotal).toFixed(2))} / {currencySymbol}
               {formatNumber(Number(income).toFixed(2))}
            </div>
         </div>

         <MultipartProgressbar percentages={budgetPercentages} />
      </StyledBudgetListSummary>
   );
};

const StyledBudgetListSummary = styled(motion.div)`
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
      //flex-direction: column;
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

   h4 {
      color: white;
      font-weight: 500;
      //margin-bottom: 1rem;
   }
   .titlebar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: whitesmoke;
   }
   .item-buttons {
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
   }
`;

export default BudgetListSummary;
