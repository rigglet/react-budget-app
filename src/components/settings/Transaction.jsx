import { useContext } from "react";
//styling
import styled from "styled-components";
import { motion } from "framer-motion";
//context
import { GlobalContext } from "../../context/GlobalContext";
//format numbers
import { formatNumber } from "../../util";

const Transaction = ({
  id,
  category,
  item,
  date,
  amount,
  deleteTransaction,
}) => {
  const { currencySymbol } = useContext(GlobalContext);

  return (
    <StyledTransaction>
      <td>
        <p>{category}</p>
      </td>
      <td>
        <p>{item}</p>
      </td>
      <td>
        <p>{date}</p>
      </td>
      <td>
        <p>
          <span className="symbol">{currencySymbol}</span>
          {formatNumber(amount)}
        </p>
      </td>
      <td>
        <p>
          <button onClick={() => deleteTransaction(id)}>Delete</button>
        </p>
      </td>
    </StyledTransaction>
  );
};

const StyledTransaction = styled(motion.tr)`
  width: 100%;
  p {
    text-align: center;
    text-transform: capitalize;
    .symbol {
      margin-right: 0.25rem;
    }
  }

  form {
    display: inline-flex;
  }
`;

export default Transaction;
