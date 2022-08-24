import { useContext } from "react";
//styling
import styled from "styled-components";
import { motion } from "framer-motion";
//context
import { GlobalContext } from "../../context/GlobalContext";
//format numbers
import { formatNumber } from "../../util";
//icons
import { FaGrin, FaFrown } from "react-icons/fa";

const TrackerBudgetItem = ({ budgetItem }) => {
  const {
    category,

    budgetAmount,

    transAmount,
  } = budgetItem;

  //console.log(budgetItem);
  const { currencySymbol } = useContext(GlobalContext);

  return (
    <StyledItem>
      <td>
        <p>
          {Number(budgetAmount) >= Number(transAmount) ? (
            <FaGrin className="icon happy" />
          ) : (
            <FaFrown className="icon sad" />
          )}
        </p>
      </td>
      <td>
        <p>{category}</p>
      </td>
      <td>
        <p>
          {budgetAmount > 0 ? (
            <>
              <span className="symbol">{currencySymbol}</span>
              {formatNumber(budgetAmount)}
            </>
          ) : (
            ""
          )}
        </p>
      </td>

      <td>
        <p>
          {transAmount > 0 ? (
            <>
              <span className="symbol">{currencySymbol}</span>
              {formatNumber(transAmount)}
            </>
          ) : (
            ""
          )}
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
  .icon {
    height: 20px;
    width: 20px;
  }
  .happy {
    color: #2ba874;
  }
  .sad {
    color: #e2725d;
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

export default TrackerBudgetItem;
