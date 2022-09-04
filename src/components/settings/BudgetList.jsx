import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { GlobalContext } from "../../context/GlobalContext";
import { updateBudgetLocally, sortByCategoryThenByItem } from "../../utilities";
//import UncategorizedBudget from "../../components/UncategorizedBudget"
import CategorizedBudget from "../../components/CategorizedBudget"

const BudgetList = () => {

  const {
    budgets,
    currentBudget,
    updateBudget,
    updateCurrentBudget,
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
        
      {/* <UncategorizedBudget
        uncategorisedTotal={uncategorisedTotal}
        uncategorisedBudgetTotal={uncategorisedBudgetTotal}
        uncategorisedPercentage={uncategorisedPercentage}
      /> */}
      
      {
        budgetCategories.map((category) => (
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
