import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { GlobalContext } from "../../context/GlobalContext";
import { updateBudgetLocally, sortByCategoryThenByItem } from "../../util";
import UncategorizedBudget from "../../components/UncategorizedBudget"
import CategorizedBudget from "../../components/CategorizedBudget"

const BudgetList = () => {

  const {
    budgets,
    currentBudget,
    updateBudget,
    updateCurrentBudget,
  } = useContext(GlobalContext);

  const budgetCategories = currentBudget.data.budgetCategories;
  
  const itemTotal = currentBudget.data.budgetCategories.map((category)=>{console.log(category);});
  const uncategorisedItemTotal = 25;
  const uncategorisedBudgetTotal = 100;
  console.log(currentBudget);
  
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
        
      <UncategorizedBudget uncategorisedItemTotal={uncategorisedItemTotal} uncategorisedBudgetTotal={uncategorisedBudgetTotal}/>
      {
        budgetCategories.map((category) => (
          <CategorizedBudget
            key={category.id}
            budgetCategory={category}
            deleteBudgetCategory={deleteBudgetCategory}
          />
        ))
        }
          {/* {sortByCategoryThenByItem(budgetCategories).map((item) => (
            <BudgetCategory />
            <BudgetItem
              togglePaidStatus={togglePaidStatus}
              toggleMandatoryStatus={toggleMandatoryStatus}
            />
          ))} */}
      
    </StyledBudgetList>
  );
};

const StyledBudgetList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  //padding: 1rem;
  //border-radius: 4px;
  //background-color: #39393c;
  color: #848586;
`;

export default BudgetList;
