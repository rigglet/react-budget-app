import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import BudgetList from "../components/BudgetList";
import FundsSummary from "../components/FundsSummary";
import AddBudgetCategoryForm from "../components/AddBudgetCategoryForm";
import { GlobalContext } from "../context/GlobalContext";

const Budget = () => {
   const { currentBudget, allocatedFundsTotal } = useContext(GlobalContext);
   let balance = Number(
      currentBudget.data.income.annualNet / 100 - allocatedFundsTotal / 100
   );

   return (
      <StyledBudget>
         <FundsSummary />

         <div className="content">
            {balance > 0 && <AddBudgetCategoryForm balance={balance} />}
            <h3>Annual budgets by category</h3>
            {currentBudget.data.budgetCategories.length > 0 ? (
               <BudgetList />
            ) : (
               <>
                  <p>No budget categories to display</p>
                  <p>
                     Please ensure that income data has been entered then create
                     a budget category above
                  </p>
               </>
            )}
         </div>
      </StyledBudget>
   );
};

const StyledBudget = styled(motion.div)`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   margin-top: 1rem;

   .heading {
      width: 70vw;
      display: flex;
      align-items: center;
      justify-content: center;
      column-gap: 2rem;
      padding: 1rem;
      flex-wrap: wrap;
      flex-grow: 1;

      .item {
         display: flex;
         align-items: center;
         justify-content: center;
         column-gap: 1rem;

         h3 {
            font-size: 1.5rem;
         }

         p {
            font-size: 1.5rem;
            font-weight: bold;
         }
      }
   }

   .title {
      align-self: flex-start;
      padding-left: 15vw;
   }

   .content {
      display: flex;
      flex-direction: column;
      width: 70vw;
      row-gap: 1rem;
   }
`;

export default Budget;
