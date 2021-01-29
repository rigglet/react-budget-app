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
      <td>
        <p>{category}</p>
      </td>
      <td>
        <p>{item}</p>
      </td>
      <td>
        <p>{frequency}</p>
      </td>
      <td>
        <p>{amount}</p>
      </td>
      <td>
        <p>
          {paid ? (
            <FaCheckSquare className="check" />
          ) : (
            <FaTimesCircle className="cross" />
          )}
        </p>
      </td>
      <td>
        <p>
          <button onClick={() => deleteBudgetItem(id)}>Delete</button>
        </p>
      </td>

      {/* <p>{category}</p>
      <p>{item}</p>
      <p>{frequency}</p>
      <p>
      <span>{currencySymbol}</span>
        {amount}
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
      </p> */}
    </StyledItem>
  );
};

const StyledItem = styled(motion.tr)`
  width: 100%;
  p {
    text-align: center;
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
  form {
    display: inline-flex;
  }
`;

export default BudgetItem;
