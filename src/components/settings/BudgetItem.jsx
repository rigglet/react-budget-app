import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { GlobalContext } from "../../context/GlobalContext";
import { FaCheckSquare, FaTimesCircle } from "react-icons/fa";
//FaGrin, FaFrown,
const BudgetItem = ({
  id,
  category,
  item,
  frequency,
  amount,
  paid,
  deleteBudgetItem,
}) => {
  const { currencySymbol } = useContext(GlobalContext);
  return (
    <StyledItem>
      <p>{category}</p>
      <p>{item}</p>
      <p>{frequency}</p>
      <p>
        <span>{currencySymbol}</span>
        {amount.toFixed(2)}
      </p>
      <p>
        {paid ? (
          <FaCheckSquare className="check" />
        ) : (
          <FaTimesCircle className="cross" />
        )}
      </p>
      <p>
        <button onClick={() => deleteBudgetItem(id)}>Delete</button>
      </p>
    </StyledItem>
  );
};

const StyledItem = styled(motion.div)`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  p {
    justify-self: flex-start;
  }
  .check,
  .cross {
    width: 20px;
    height: 20px;
  }
  .check {
    color: #00b4ee;
  }
  .cross {
    //color: red;
  }
  p {
    //min-width: 16%;
    padding: 0;
  }
  form {
    display: inline-flex;
  }
`;

export default BudgetItem;
