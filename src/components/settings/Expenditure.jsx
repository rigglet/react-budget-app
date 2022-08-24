import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import AddTransactionForm from "./AddTransactionForm";
import TransactionList from "./TransactionList";
import MandatoryTransactionList from "./MandatoryTransactionList";
import ExpenditureWidget from "../dashboard/widgets/ExpenditureWidget";
import { GlobalContext } from "../../context/GlobalContext";

const Expenditure = () => {
  const { includeMandatory, includeDisposableOnly } = useContext(GlobalContext);

  return (
    <StyledExpenditure>
      <h3>Expenditure</h3>
      <ExpenditureWidget />
      <AddTransactionForm />
      {includeMandatory && !includeDisposableOnly ? (
        <MandatoryTransactionList />
      ) : (
        ""
      )}
      <TransactionList />
    </StyledExpenditure>
  );
};

const StyledExpenditure = styled(motion.div)`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  h3 {
    color: white;
  }
`;

export default Expenditure;
