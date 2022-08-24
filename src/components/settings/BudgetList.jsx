import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { GlobalContext } from "../../context/GlobalContext";
import BudgetItem from "./BudgetItem";
import { updateBudgetLocally, sortByCategoryThenByItem } from "../../util";

const BudgetList = () => {
  const {
    budgets,
    currentBudget,
    updateBudget,
    updateCurrentBudget,
  } = useContext(GlobalContext);

  const budgetItems = currentBudget.data.budgetItems;

  const toggleMandatoryStatus = (budgetItem) => {
    const newBudget = {
      ...currentBudget,
      data: {
        ...currentBudget.data,
        budgetItems: [
          ...budgetItems.filter((item) => item.id !== budgetItem.id),
          { ...budgetItem, mandatory: !budgetItem.mandatory },
        ],
      },
    };

    //update global context
    updateBudget(newBudget);

    //update local storage
    updateBudgetLocally(budgets, newBudget);

    //updatecurrentBudget
    updateCurrentBudget(newBudget);
  };

  const togglePaidStatus = (budgetItem) => {
    const newBudget = {
      ...currentBudget,
      data: {
        ...currentBudget.data,
        budgetItems: [
          ...budgetItems.filter((item) => item.id !== budgetItem.id),
          { ...budgetItem, paid: !budgetItem.paid },
        ],
      },
    };

    //update global context
    updateBudget(newBudget);

    //update local storage
    updateBudgetLocally(budgets, newBudget);

    //updatecurrentBudget
    updateCurrentBudget(newBudget);
  };

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

  console.log(sortByCategoryThenByItem(budgetItems));

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
              <h5>Mandatory?</h5>
            </th>
            <th>
              <h5>Actions</h5>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortByCategoryThenByItem(budgetItems).map((item) => (
            <BudgetItem
              key={item.id}
              budgetItem={item}
              togglePaidStatus={togglePaidStatus}
              toggleMandatoryStatus={toggleMandatoryStatus}
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
    font-variant-caps: all-small-caps;
  }
`;

export default BudgetList;
