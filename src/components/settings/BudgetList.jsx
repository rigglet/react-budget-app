import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { GlobalContext } from "../../context/GlobalContext";
import { updateBudgetLocally, sortByCategoryThenByItem, calculateFundsTotal } from "../../utilities";
import CategorizedBudget from "../../components/CategorizedBudget"

const BudgetList = () => {

  const {
    budgets,
    currentBudget,
    updateBudget,
    updateCurrentBudget,
    updateAllocatedFunds,
  } = useContext(GlobalContext);

  const budgetCategories = currentBudget.data.budgetCategories;
  
  const deleteBudgetCategory = (id) => {
    const newBudget = {
      ...currentBudget,
      data: {
        ...currentBudget.data,
        budgetCategories: budgetCategories.filter((item) => item.id !== id),
       },
    };

    updateAllocatedFunds(calculateFundsTotal(newBudget));

    //update global context
    updateBudget(newBudget);

    //update local storage
    updateBudgetLocally(budgets, newBudget);

    //updatecurrentBudget
    updateCurrentBudget(newBudget);
  };

  //console.log(sortByCategoryThenByItem(budgetCategories));

  return (
    <StyledBudgetList>
        
      {
        budgetCategories
          .sort((a, b) => (a.category > b.category ? 1 : -1))
          .map((category) => (
          <CategorizedBudget
            key={category.id}
            budgetCategory={category}
            deleteBudgetCategory={deleteBudgetCategory}
          />
        ))
        }
      
    </StyledBudgetList>
  );
};

const StyledBudgetList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  color: #848586;
`;

export default BudgetList;
