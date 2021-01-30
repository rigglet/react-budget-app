import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { GlobalContext } from "../../context/GlobalContext";
import BudgetItem from "./BudgetItem";
import { updateBudgetLocally } from "../../util";

const BudgetList = () => {
  const { budgets, currentBudgetId, updateBudget } = useContext(GlobalContext);
  const currentBudget = budgets.filter(
    (budget) => budget.id === currentBudgetId
  )[0];
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
  };

  return (
    <StyledBudgetList>
      <h4>Budget items</h4>
      <table>
        <tbody>
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
        </tbody>

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
      </table>
    </StyledBudgetList>
  );
};

const StyledBudgetList = styled(motion.div)`
  //display: flex;
  //flex-direction: column;
  //align-items: flex-start;
  //justify-content: space-evenly;
  //width: 100%;
  //margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 4px;
  background-color: #39393c;
  color: #848586;
  //row-gap: 0.5rem;
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
