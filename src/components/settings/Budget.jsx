import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import BudgetList from "./BudgetList";
import AddBudgetCategoryForm from "./AddBudgetCategoryForm";
import { GlobalContext } from "../../context/GlobalContext";

const Budget = () => {
  
  const {currentBudget} = useContext(GlobalContext);
  
  return (
    <StyledBudget>
      <div className="heading">
        <div className="item">
          <h3>Income:</h3>
          <p>${Number(currentBudget.data.income.annualNet/100).toFixed(2)}</p>
        </div>
        <div className="item">
          <h3>Balance:</h3>
          <p>${Number(currentBudget.data.income.annualNet/100).toFixed(2)}</p>
        </div>
      </div>

      
      <div className="charts">
        <AddBudgetCategoryForm />
        <h3 className="">Budgets by category</h3>
        <BudgetList />
      </div>
    </StyledBudget>
  );
};

const StyledBudget = styled(motion.div)`
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

export default Budget;
