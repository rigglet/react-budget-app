import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaTrashAlt, FaFolderOpen } from "react-icons/fa";
import { GlobalContext } from "../context/GlobalContext";

//import { updateBudgetLocally} from "../util";

const CategorizedBudget = ({budgetCategory, deleteBudgetCategory, itemTotal}) => {
  
  const {
    budgets,
    currentBudget,
    updateBudget,
    updateCurrentBudget,
  } = useContext(GlobalContext);

  //const itemTotal = budgetCategory?.items?.reduce((item) => { }) || 0;
  //currentBudget.data.income.annualNet 
  const budgetTotal = currentBudget.data.income.annualNet - budgetCategory?.amount;
  //   const budgetCategories = currentBudget.data.budgetCategories;

  //   console.log(budgetCategories)

  const addItem = () => {
    console.log("Add")
  }
  const viewItems = () => {
    console.log("View")  
  }

  //console.log(budgetCategory)

  return (
      <StyledUncategorizedBudget>
        <div className="titlebar">
        <h4>{budgetCategory?.category}</h4>
          <div className="total">${itemTotal} / ${budgetTotal}</div>  
        </div>
      
        <progress value={itemTotal} max={budgetTotal} />
      
        <div className="buttons">
          <button className="button" onClick={addItem}>Add Item</button>
          <button className="button" onClick={viewItems}>View</button>
        </div>

        <div className="actions" onClick={() => deleteBudgetCategory(budgetCategory.id)}>
          <FaTrashAlt className="delete-icon" />
        </div>
    </StyledUncategorizedBudget>
  );
};
//del icon

const StyledUncategorizedBudget = styled(motion.div)`
  position: relative;
  padding: 1rem;
  border-radius: 4px;
  background-color: #39393c;
  color: #848586;
  
  &:hover .actions{
    width: 100px;
    //color: rgba(184, 114, 114, 75%);
    .actions{
      width: 3rem;
    }
  }
  
  .actions {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    right: 0;
    height: 3rem;
    width: 0px;
    background-color: #b87272;
    border-radius: 4px;
    transition: 0.3s ease all;
    //pointer-events: none;
    cursor: pointer;
    
    .delete-icon{
      height: 50%;
      width: 50%;
      border-radius: 4px;
      background-color: #b87272;
      pointer: cursor;
      color: whitesmoke;
    }
  }

  
  .titlebar{
    display: flex;
    justify-content: space-between;
    align-items: center;

    h4 {
      color: white;
      font-weight: 500;
      margin-bottom: 1rem;
    }
    .total {
      color: whitesmoke;
    }
  }
  progress {
    width: 100%;
  }
  .buttons{
    padding: 0.5rem 0rem;
    display: flex;
    align-items: center;
    justify-contents: flex-start;
    column-gap: 1rem;
  }
  `;

export default CategorizedBudget;
