import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import UncategorizedBudget from "../components/UncategorizedBudget";
import { GlobalContext } from "../context/GlobalContext";

const Summary = () => {
    const {currentBudget} = useContext(GlobalContext);
    
    const expenditureTotal = currentBudget.data.budgetCategories.map((category) => {
      return category.items.map(i => i.amount).reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    }).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  
      const allocatedFundsTotal = currentBudget.data.budgetCategories.map((category) => {
          return category.items.map(i => i.amount).reduce((previousValue, currentValue) => previousValue + currentValue, 0)
      }).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  
    //annual net income
    const uncategorisedBudgetTotal = currentBudget.data.income.annualNet / 100;
    //annual net income minus total allocated funds
    const uncategorisedTotal = uncategorisedBudgetTotal - allocatedFundsTotal;
    //uncategorised funds as percentage of annual net figure
    const uncategorisedPercentage = uncategorisedTotal / uncategorisedBudgetTotal * 100;
    

  return (
    <StyledSummary>
      <div className="heading">
        <div className="item">
          <h3>Income:</h3>
          <p>${Number(currentBudget.data.income.annualNet/100).toFixed(2)}</p>
        </div>
        <div className="item">
          <h3>Expenditure:</h3>
          <p>${Number(allocatedFundsTotal).toFixed(2)}</p>
        </div>
        <div className="item">
          <h3>Balance:</h3>
          <p>${Number(currentBudget.data.income.annualNet/100-allocatedFundsTotal).toFixed(2)}</p>
        </div>
      </div>

      
      <div className="charts">
        <h3 className="">Summary</h3>

        <UncategorizedBudget
            uncategorisedTotal={uncategorisedTotal}
            uncategorisedBudgetTotal={uncategorisedBudgetTotal}
            uncategorisedPercentage={uncategorisedPercentage}
        />
      </div>
    </StyledSummary>
  );
};

const StyledSummary = styled(motion.div)`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 1rem;
  
  .heading {
    width: 70vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    
    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      column-gap: 1rem;
      
      h3 {
        font-size: 1.5rem; 
      }

      p {
        color: #00b4ee;
        font-size: 1.5rem;
        font-weight: bold;
      }
    }
  }
  
  .title {
    align-self: flex-start;
    padding-left: 15vw;
  }

  .charts {
    display: flex;
    flex-direction: column;
    width: 70vw;
    gap: 2rem;
  }
`;

export default Summary;
