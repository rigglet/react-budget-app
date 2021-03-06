import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { GlobalContext } from "../../context/GlobalContext";
import Transaction from "./Transaction";
import { filterTransactionsByDateRange, updateBudgetLocally } from "../../util";

const TransactionList = () => {
  const {
    budgets,
    currentBudget,
    updateBudget,
    updateCurrentBudget,
    dateRange,
  } = useContext(GlobalContext);

  const transactions = currentBudget.data.transactions;
  const filteredTransactions = filterTransactionsByDateRange(
    transactions,
    dateRange
  );

  const deleteTransaction = (id) => {
    const newBudget = {
      ...currentBudget,
      data: {
        ...currentBudget.data,
        transactions: transactions.filter(
          (transaction) => transaction.id !== id
        ),
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
    <StyledTransactionList>
      <h4>Transactions (Disposable)</h4>
      <table>
        <thead>
          <tr>
            <th>
              <h5>Date</h5>
            </th>
            <th>
              <h5>Category</h5>
            </th>
            <th>
              <h5>Item</h5>
            </th>
            <th>
              <h5>Amount</h5>
            </th>
            <th>
              <h5>Actions</h5>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions
            .sort((a, b) => (a.date > b.date ? 1 : -1))
            .map((item) => (
              <Transaction
                key={item.id}
                transaction={item}
                deleteTransaction={deleteTransaction}
              />
            ))}
        </tbody>
      </table>
    </StyledTransactionList>
  );
};

const StyledTransactionList = styled(motion.div)`
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

export default TransactionList;
