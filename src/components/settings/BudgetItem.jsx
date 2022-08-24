import { useContext } from "react";
//styling
import styled from "styled-components";
import { motion } from "framer-motion";
//context
import { GlobalContext } from "../../context/GlobalContext";
//icons
import { FaCheckSquare, FaTimesCircle, FaTrashAlt } from "react-icons/fa";
//FaGrin, FaFrown,
//format numbers
import { formatNumber } from "../../util";

const BudgetItem = ({
  budgetItem,
  deleteBudgetItem,
  togglePaidStatus,
  toggleMandatoryStatus,
}) => {
  const { id, category, item, frequency, amount, paid, mandatory } = budgetItem;
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
          {paid ? (
            <FaCheckSquare
              className="check"
              onClick={() => togglePaidStatus(budgetItem)}
            />
          ) : (
            <FaTimesCircle
              className="cross"
              onClick={() => togglePaidStatus(budgetItem)}
            />
          )}
        </p>
      </td>
      <td>
        <p className="mandatory">
          {mandatory ? (
            <FaCheckSquare
              className="check"
              onClick={() => toggleMandatoryStatus(budgetItem)}
            />
          ) : (
            <FaTimesCircle
              className="cross"
              onClick={() => toggleMandatoryStatus(budgetItem)}
            />
          )}
        </p>
      </td>
      <td>
        <p>
          <FaTrashAlt
            onClick={() => deleteBudgetItem(id)}
            className="del icon"
          />
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
  .paid,
  .mandatory {
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
