import { useContext, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { GlobalContext } from "../../context/GlobalContext";
import BudgetItem from "./BudgetItem";

const BudgetList = () => {
  const { budgets, currentBudgetId, updateBudget } = useContext(GlobalContext);
  // const [currentBudget, setCurrentBudget] = useState(
  //   budgets.filter((budget) => budget.id === currentBudgetId)[0]
  // );
  const currentBudget = budgets.filter(
    (budget) => budget.id === currentBudgetId
  )[0];
  const budgetItems = currentBudget.data.budgetItems;
  //console.log(currentBudget);

  const deleteBudgetItem = (id) => {
    const newBudget = {
      ...currentBudget,
      data: {
        //income: currentBudget.data.income,
        ...currentBudget.data,
        budgetItems: budgetItems.filter((item) => item.id !== id),
      },
    };
    //setCurrentBudget(newBudget);
    updateBudget(newBudget);
    //console.log(newBudget);
  };
  return (
    <StyledBudgetList>
      <div className="header">
        <h4>Category</h4>
        <h4>Item</h4>
        <h4>Frequency</h4>
        <h4>Amount</h4>
        <h4>Paid?</h4>
        <h4>Actions</h4>
      </div>

      {budgetItems
        .sort((a, b) => (a.category > b.category ? 1 : -1))
        //.sort((a, b) => (a.item > b.item ? 1 : -1))
        .map((item) => (
          <BudgetItem
            key={item.id}
            id={item.id}
            category={item.category}
            item={item.item}
            frequency={item.frequency}
            amount={item.amount}
            deleteBudgetItem={deleteBudgetItem}
          />
        ))}
    </StyledBudgetList>
  );
};

const StyledBudgetList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  width: 100%;

  .header {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
    flex: 1;
    h4 {
      flex: 1;
      padding: 0rem;
    }
  }
  button {
    flex: 1;
  }
`;

export default BudgetList;
