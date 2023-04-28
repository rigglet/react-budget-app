import { useContext, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { GlobalContext } from "../context/GlobalContext";
import ExpenseList from "../components/ExpenseList";
import AddExpenseItemForm from "../components/AddExpenseItemForm";
import ExpenditureFundsSummary from "../components/summary/ExpenditureFundsSummary";

const Expenditure = () => {
   const [showForm, toggleShowForm] = useState(false);
   const { currentBudget, allocatedFundsTotal } = useContext(GlobalContext);

   // const budgetCategory = currentBudget.data.budgetCategories[0];

   // let itemTotal = budgetCategory?.items
   //    ?.map((i) => i.amount)
   //    .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
   //const budgetTotal = budgetCategory?.amount / 100;

   // if (itemTotal > 0 && budgetTotal > 0) {
   //    categorisedPercentage = (itemTotal / budgetTotal) * 100;
   // }

   //itemTotal = formatNumber(Number(itemTotal));

   let balance = Number(
      currentBudget.data.income.annualNet / 100 - allocatedFundsTotal / 100
   );

   return (
      <StyledExpenditure>
         <ExpenditureFundsSummary />

         <div className="content">
            <AddExpenseItemForm
               balance={balance}
               showForm={showForm}
               toggleShowForm={toggleShowForm}
            />

            <h3>Expenditure</h3>
            {currentBudget.data.budgetCategories.length > 0 ? (
               <ExpenseList />
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
