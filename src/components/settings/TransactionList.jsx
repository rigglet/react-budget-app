import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { GlobalContext } from "../../context/GlobalContext";
import Transaction from "./Transaction";
import { filterBydateRange, updateBudgetLocally } from "../../util";

const TransactionList = () => {
  const {
    budgets,
    currentBudget,
    updateBudget,
    updateCurrentBudget,
  } = useContext(GlobalContext);

  const transactions = currentBudget.data.transactions;
  //const filteredTransactions = filterBydateRange(transactions);
  const filteredTransactions = transactions;

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
      <h4>Transactions</h4>
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
              <h5>Date</h5>
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
            .sort((a, b) => (a.category > b.category ? 1 : -1))
            //.sort((a, b) => (a.item > b.item ? 1 : -1))
            .map((item) => (
              <Transaction
                key={item.id}
                id={item.id}
                category={item.category}
                item={item.item}
                date={item.date}
                type={item.type}
                amount={item.amount}
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
