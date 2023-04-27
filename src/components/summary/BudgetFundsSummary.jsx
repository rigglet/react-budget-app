import { useContext } from "react";
import { formatNumber } from "../../utilities";
import styled from "styled-components";
import { motion } from "framer-motion";
import { GlobalContext } from "../../context/GlobalContext";

const BudgetFundsSummary = () => {
   const { currentBudget, allocatedFundsTotal } = useContext(GlobalContext);
   let balance = Number(
      currentBudget.data.income.annualNet / 100 - allocatedFundsTotal / 100
   );

   return (
      <StyledBudgetFundsSummary>
         <div className="item">
            <h3>Income:</h3>
            <p className="income-color">
               $
               {formatNumber(
                  Number(currentBudget.data.income.annualNet / 100).toFixed(2)
               )}
            </p>
         </div>
         <div className="item">
            <h3>Allocated:</h3>
            <p className="allocated-color">
               ${formatNumber(Number(allocatedFundsTotal / 100).toFixed(2))}
            </p>
         </div>
         <div className="item">
            <h3>Remaining:</h3>
            <p className="balance-color">
               ${formatNumber(Number(balance).toFixed(2))}
            </p>
         </div>
      </StyledBudgetFundsSummary>
   );
};

const StyledBudgetFundsSummary = styled(motion.div)`
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
`;

export default BudgetFundsSummary;
