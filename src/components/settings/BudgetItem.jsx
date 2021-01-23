import styled from "styled-components";
import { motion } from "framer-motion";

const BudgetItem = ({
  id,
  category,
  item,
  frequency,
  amount,
  deleteBudgetItem,
}) => {
  return (
    <StyledItem>
      <p>{category}</p>
      <p>{item}</p>
      <p>{frequency}</p>
      <p className="figures">£{amount.toFixed(2)}</p>

      <button onClick={() => deleteBudgetItem(id)}>Delete</button>
    </StyledItem>
  );
};

const StyledItem = styled(motion.div)`
  display: flex;
  align-items: center;
  min-height: 10vh;
  width: 100%;
  justify-content: space-around;
  p {
    flex: 1;
  }
`;

export default BudgetItem;
