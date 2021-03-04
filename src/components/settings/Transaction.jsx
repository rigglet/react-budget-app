import { useContext } from "react";
//styling
import styled from "styled-components";
import { motion } from "framer-motion";
//context
import { GlobalContext } from "../../context/GlobalContext";
//format numbers
import { formatNumber } from "../../util";
import moment from "moment";

const Transaction = ({ transaction, deleteTransaction }) => {
  const { currencySymbol } = useContext(GlobalContext);
  const { id, category, item, date, type, amount } = transaction;

  return (
    <StyledTransaction>
      <td>
        <p>{moment(date).format("DD-MM-YYYY")}</p>
      </td>
      <td>
        <p>{category}</p>
      </td>
      <td>
        <p>{item}</p>
      </td>
      <td>
        <p>
          <span className={type === "deposit" ? "deposit" : "withdrawal"}>
            <span className="sign">{type === "deposit" ? "+" : "-"}</span>
            <span className="symbol">{currencySymbol}</span>
            {formatNumber(amount)}
          </span>
        </p>
      </td>
      <td>
        <p>
          <button className="button" onClick={() => deleteTransaction(id)}>
            Delete
          </button>
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
  }

  form {
    display: inline-flex;
  }
`;

export default Transaction;
