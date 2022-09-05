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
    
    console.log(expenditureTotal) 
  
    //annual net income
    const netIncome = currentBudget.data.income.annualNet / 100;
    //annual net income minus total allocated funds
    const uncategorisedTotal = netIncome - allocatedFundsTotal / 100;
    

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
        
        <div className="key">
          <div className="element">
            <div className="color background-income-color"></div>
            <h5 className="legend">Income</h5>
          </div>
          <div className="element">
            <div className="color background-allocated-color"></div>
            <h5 className="legend">Allocated</h5>
          </div>
          <div className="element">
            <div className="color background-unallocated-color"></div>
            <h5 className="legend">Unallocated</h5>
          </div>
          <div className="element">
            <div className="color background-expenditure-color"></div>
            <h5 className="legend">Expenditure</h5>
          </div>
          <div className="element">
            <div className="color background-balance-color"></div>
            <h5 className="legend">Balance</h5>
          </div>
        </div>
        <div className="content">  
          <UncategorizedBudget
            uncategorisedTotal={uncategorisedTotal}
            netIncome={netIncome}
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

  .key {
    width: 100%;
    display: flex;
    column-gap: 0.25rem;
    justify-content: space-between;
    
    .element {
      display: flex;
      align-items: center;
      column-gap: 0.25rem;
      flex-shrink: 1;
      
      .color {
        width: 25px;
        height: 25px;
        border-radius: 4px;
      }
      .legend {
        color: whitesmoke;
      }
    }

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
