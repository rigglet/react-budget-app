import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import UncategorizedBudget from "../components/UncategorizedBudget";
import AllocatedBudget from "../components/AllocatedBudget";
import ItemTotal from "../components/ItemTotal";
import { GlobalContext } from "../context/GlobalContext";

const Summary = () => {
  const {currentBudget, allocatedFundsTotal} = useContext(GlobalContext);
    
    const expenditureTotal = currentBudget.data.budgetCategories.map((category) => {
      return category.items.map(i => i.amount).reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    }).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    
    // const allocatedTotal = currentBudget.data.budgetCategories.map((category) => {
    //   return category.items.map(i => i.amount).reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    // }).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  
    //annual net income
    const uncategorisedBudgetTotal = currentBudget.data.income.annualNet / 100;
    //annual net income minus total allocated funds
    const uncategorisedTotal = uncategorisedBudgetTotal - allocatedFundsTotal / 100;
    //uncategorised funds as percentage of annual net figure
    const uncategorisedPercentage = uncategorisedTotal / uncategorisedBudgetTotal * 100;
    

  return (
    <StyledSummary>
      <div className="heading">
        <div className="item">
          <h3>Income:</h3>
          <p className="income-color">${Number(currentBudget.data.income.annualNet/100).toFixed(2)}</p>
        </div>
        <div className="item">
          <h3>Allocated:</h3>
          <p className="allocated-color">${Number(allocatedFundsTotal / 100).toFixed(2)}</p>
        </div>
        <div className="item">
          <h3>Balance:</h3>
          <p className="balance-color">${Number(currentBudget.data.income.annualNet/100-allocatedFundsTotal/100).toFixed(2)}</p>
        </div>
      </div>

      
      <div className="charts">
        <div className="title">
          <h3 className="">Summary</h3>
        </div>
        <div className="content">
          
          <UncategorizedBudget
              uncategorisedTotal={uncategorisedTotal}
              uncategorisedBudgetTotal={uncategorisedBudgetTotal}
              uncategorisedPercentage={uncategorisedPercentage}
              />
          <AllocatedBudget income={currentBudget.data.income.annualNet} allocatedFundsTotal={allocatedFundsTotal} />
          <ItemTotal expenditureTotal={expenditureTotal} allocatedFundsTotal={allocatedFundsTotal}/>
        </div>
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
  row-gap: 2rem;
  
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
    gap: 2rem;
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
