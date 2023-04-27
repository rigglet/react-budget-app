import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import UncategorizedBudget from "../components/UncategorizedBudget";
import AllocatedBudget from "../components/AllocatedBudget";
import ExpenditureByIncomeWidget from "../components/ExpeditureByIncomeWidget";
import ItemTotal from "../components/ItemTotal";
import { GlobalContext } from "../context/GlobalContext";
import ExpenditureByCategoryWidget from "../components/ExpenditureByCategoryWidget";
import BudgetFundsSummary from "../components/summary/BudgetFundsSummary";
import SummaryKey from "../components/SummaryKey";

const Summary = () => {
   const { currentBudget, allocatedFundsTotal } = useContext(GlobalContext);

   const expenditureTotal = currentBudget.data.budgetCategories
      .map((category) => {
         return category.items
            .map((i) => i.amount)
            .reduce(
               (previousValue, currentValue) => previousValue + currentValue,
               0
            );
      })
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

   //annual net income
   const netIncome = currentBudget.data.income.annualNet / 100;
   //annual net income minus total allocated funds
   const uncategorisedTotal = netIncome - allocatedFundsTotal / 100;

   return (
      <StyledSummary>
         <BudgetFundsSummary />

         <div className="charts">
            <SummaryKey />

            <div className="title">
               <h3 className="">Summary</h3>
            </div>

            <div className="content">
               <UncategorizedBudget
                  uncategorisedTotal={uncategorisedTotal}
                  netIncome={netIncome}
               />
               <AllocatedBudget
                  income={currentBudget.data.income.annualNet}
                  allocatedFundsTotal={allocatedFundsTotal}
               />
               <ExpenditureByIncomeWidget
                  expenditureTotal={expenditureTotal}
                  income={currentBudget.data.income.annualNet}
               />
               <ItemTotal
                  expenditureTotal={expenditureTotal}
                  allocatedFundsTotal={allocatedFundsTotal}
               />
               {/* <AllocatedWidget income={currentBudget.data.income.annualNet} allocatedFundsTotal={allocatedFundsTotal}/> */}
               <ExpenditureByCategoryWidget
                  income={currentBudget.data.income.annualNet}
                  allocatedFundsTotal={allocatedFundsTotal}
               />
            </div>
         </div>
      </StyledSummary>
   );
};

const StyledSummary = styled(motion.div)`
   padding: 1rem 0;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   row-gap: 2rem;

   .heading {
      width: 70vw;
      display: flex;
      align-items: center;
      justify-content: center;
      column-gap: 3rem;
      flex-wrap: wrap;

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
      display: flex;
      flex-direction: column;
      width: 70vw;
   }

   .charts {
      display: flex;
      flex-direction: column;
      width: 70vw;
      gap: 1rem;
   }

   .content {
      width: 100%;
      display: flex;
      flex-grow: 1;
      flex-wrap: wrap;
      gap: 1rem;
   }
`;

export default Summary;
