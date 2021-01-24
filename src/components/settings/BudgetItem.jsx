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
      <form>
        <input type="checkbox" name="paid" id="paid" />
      </form>

      <button onClick={() => deleteBudgetItem(id)}>Delete</button>
    </StyledItem>
  );
};

const StyledItem = styled(motion.div)`
  display: flex;
  align-items: center;
  min-height: 7vh;
  width: 100%;
  justify-content: space-around;
  p {
    flex: 1;
    min-width: 16%;
  }
  form {
    display: inline-flex;
    flex: 1;
  }
`;

export default BudgetItem;
