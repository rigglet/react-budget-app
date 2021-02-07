import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { GlobalContext } from "../../context/GlobalContext";
import BudgetItem from "./BudgetItem";
import { updateBudgetLocally } from "../../util";

const BudgetList = () => {
  const {
    budgets,
    currentBudget,
    updateBudget,
    updateCurrentBudget,
  } = useContext(GlobalContext);

  const budgetItems = currentBudget.data.budgetItems;

  const deleteBudgetItem = (id) => {
    const newBudget = {
      ...currentBudget,
      data: {
        ...currentBudget.data,
        budgetItems: budgetItems.filter((item) => item.id !== id),
      },
    };

    //update global context
    updateBudget(newBudget);

    //update local storage
    updateBudgetLocally(budgets, newBudget);

    //updatecurrentBudget
    updateCurrentBudget(newBudget);
  };

  return (
    <StyledBudgetList>
      <h4>Budget items</h4>
      <table>
        <thead>
          <tr>
            <th>
              <h5>Category</h5>
            </th>
            <th>
              <h5>Item</h5>
            </th>
            <th>
              <h5>Frequency</h5>
            </th>
            <th>
              <h5>Amount</h5>
            </th>
            <th>
              <h5>Paid?</h5>
            </th>
            <th>
              <h5>Actions</h5>
            </th>
          </tr>
        </thead>
        <tbody>
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
                paid={item.paid}
                deleteBudgetItem={deleteBudgetItem}
              />
            ))}
        </tbody>
      </table>
    </StyledBudgetList>
  );
};

const StyledBudgetList = styled(motion.div)`
  padding: 1rem;
  border-radius: 4px;
  background-color: #39393c;
  color: #848586;

  table {
    width: 100%;
  }
  h4 {
    color: white;
    font-weight: 500;
    margin-bottom: 1rem;
  }
  h5 {
    color: #848586;
  }
`;

export default BudgetList;
