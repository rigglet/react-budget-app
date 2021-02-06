import { useContext, useState } from "react";
//styling
import styled from "styled-components";
import { motion } from "framer-motion";
//context
import { GlobalContext } from "../../context/GlobalContext";
//icons
import { FaCheckSquare, FaTimesCircle } from "react-icons/fa";
//FaGrin, FaFrown,
//format numbers
import { formatNumber } from "../../util";

const BudgetItem = ({
  id,
  category,
  item,
  frequency,
  amount,
  paid,
  deleteBudgetItem,
}) => {
  const [paidStatus, setPaidStatus] = useState(paid);

  const handleChangePaid = () => {
    setPaidStatus(!paidStatus);
  };
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
        <p>
          <span className="symbol">{currencySymbol}</span>
          {formatNumber(amount)}
        </p>
      </td>
      <td>
        <p className="paid">
          {paidStatus ? (
            <FaCheckSquare
              className="check"
              onClick={() => handleChangePaid()}
            />
          ) : (
            <FaTimesCircle
              className="cross"
              onClick={() => handleChangePaid()}
            />
          )}
        </p>
      </td>
      <td>
        <p>
          <button onClick={() => deleteBudgetItem(id)}>Delete</button>
        </p>
      </td>
    </StyledItem>
  );
};

const StyledItem = styled(motion.tr)`
  width: 100%;
  p {
    text-align: center;
    text-transform: capitalize;
    .symbol {
      margin-right: 0.25rem;
    }
  }
  .paid {
    cursor: pointer;
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
