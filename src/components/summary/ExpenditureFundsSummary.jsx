import { useContext } from "react";
import { formatNumber } from "../../utilities";
import styled from "styled-components";
import { motion } from "framer-motion";
import { GlobalContext } from "../../context/GlobalContext";

const ExpenditureFundsSummary = () => {
   const { currentBudget, allocatedFundsTotal } = useContext(GlobalContext);

   //get total expediture for currentbudget
   let expenditure = Math.floor(
      currentBudget.data.budgetCategories.reduce((accumulator, category) => {
         return accumulator + category.items.reduce((a, c) => a + c.amount, 0);
      }, 0) * 100
   );
   console.log(expenditure);

   let income = currentBudget.data.income.annualNet / 100;
   let incomeBalance = Number(income - expenditure / 100);

   let allocatedBalance = Number((allocatedFundsTotal - expenditure) / 100);

   return (
      <StyledExpenditureFundsSummary>
         <div className="groups">
            <div className="group">
               <div className="item">
                  <h3>Income:</h3>
                  <p className="income-color">
                     $
                     {formatNumber(
                        Number(
                           currentBudget.data.income.annualNet / 100
                        ).toFixed(2)
                     )}
                  </p>
               </div>
               <h3>&nbsp;/&nbsp;</h3>
               <div className="item">
                  <p className="balance-color">
                     ${formatNumber(Number(incomeBalance).toFixed(2))}
                  </p>
                  <h3>Remaining</h3>
               </div>
            </div>

            <div className="group">
               <div className="item">
                  <h3>Allocated:</h3>
                  <p className="allocated-color">
                     $
                     {formatNumber(
                        Number(allocatedFundsTotal / 100).toFixed(2)
                     )}
                  </p>
               </div>
               <h3>&nbsp;/&nbsp;</h3>
               <div className="item">
                  <p className="balance-color">
                     ${formatNumber(Number(allocatedBalance).toFixed(2))}
                  </p>
                  <h3>Remaining</h3>
               </div>
            </div>
         </div>
         <div className="item">
            <h3>Expenditure:</h3>
            <p className="expenditure-color">
               ${formatNumber(Number(expenditure / 100).toFixed(2))}
            </p>
         </div>
      </StyledExpenditureFundsSummary>
   );
};

const StyledExpenditureFundsSummary = styled(motion.div)`
   width: 70vw;
   display: flex;
   align-items: center;
   justify-content: center;
   column-gap: 2rem;
   padding: 1rem;
   flex-wrap: wrap;
   flex-grow: 1;
   .groups {
      display: flex;
      flex-direction: column;
      .group {
         display: flex;
         //flex-direction: column;
         align-items: center;
      }
   }
   .item {
      display: flex;
      align-items: center;
      justify-content: center;
      column-gap: 1rem;

      h3 {
         font-size: 1.2rem;
      }

      p {
         font-size: 1.5rem;
         font-weight: bold;
      }
   }
`;

export default ExpenditureFundsSummary;
