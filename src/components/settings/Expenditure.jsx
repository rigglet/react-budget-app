import styled from "styled-components";
import { motion } from "framer-motion";
import AddTransactionForm from "./AddTransactionForm";
import TransactionList from "./TransactionList";
import ExpenditureWidget from "../dashboard/widgets/ExpenditureWidget";

const Expenditure = ({ currentBudget }) => {
  return (
    <StyledExpenditure>
      <h3>Expenditure</h3>
      <div className="charts">
        <ExpenditureWidget />
      </div>
      <AddTransactionForm />
      <TransactionList />
    </StyledExpenditure>
  );
};

const StyledExpenditure = styled(motion.div)`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  .charts {
    display: flex;
    row-gap: 1rem;
    column-gap: 1rem;
  }
  h3 {
    //margin-bottom: 1rem;
    color: white;
  }
`;

export default Expenditure;
