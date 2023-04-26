import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { GlobalContext } from "../context/GlobalContext";
import BudgetList from "../components/BudgetList";
import AddBudgetCategoryForm from "../components/AddBudgetCategoryForm";
import FundsSummary from "../components/FundsSummary";

const Expenditure = () => {
   const { currentBudget, allocatedFundsTotal } = useContext(GlobalContext);
   let balance = Number(
      currentBudget.data.income.annualNet / 100 - allocatedFundsTotal / 100
   );

   return (
      <StyledExpenditure>
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
      </StyledExpenditure>
   );
};

const StyledExpenditure = styled(motion.div)`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   margin-top: 1rem;

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

export default Expenditure;
