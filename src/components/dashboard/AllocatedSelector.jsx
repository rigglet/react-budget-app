import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  formatNumber,
  getNetIncomeForPeriod,
  getAllocatedPerPeriod,
} from "../../util";

const AllocatedSelector = ({ period, handlePeriodChange }) => {
  const { currencySymbol, currentBudget } = useContext(GlobalContext);
  let subTotal = getAllocatedPerPeriod(currentBudget, period);
  let selectedPeriod = getNetIncomeForPeriod(currentBudget, period);
  const remaining = (selectedPeriod - subTotal).toFixed(2);

  return (
    <StyledAllocatedSelector>
      <div className="drop">
        <label htmlFor="period">Period:</label>
        <select
          name="period"
          onChange={(e) => handlePeriodChange(e.target.value)}
        >
          <option value="weekly" key="weekly">
            Weekly
          </option>
          <option value="monthly" key="monthly">
            Monthly
          </option>
          <option value="annually" key="annually">
            Annually
          </option>
        </select>
      </div>

      <div className="figures">
        <div className="item">
          <h5>Allocated</h5>
          <span className={subTotal < 0 ? "negative" : "positive"}>
            <p className="tableItem">
              <span className="symbol">{currencySymbol} </span>
              {formatNumber(subTotal)}
            </p>
          </span>
        </div>
        <div className="item">
          <h5>Remaining</h5>
          <span className={remaining < 0 ? "negative" : "positive"}>
            <p className="tableItem">
              <span className="symbol">{currencySymbol} </span>
              {formatNumber(remaining)}
            </p>
          </span>
        </div>
        <div className="item">
          <h5>Total</h5>
          <span
            id="total"
            className={selectedPeriod < 0 ? "negative" : "positive"}
          >
            <p className="tableItem">
              <span className="symbol">{currencySymbol} </span>
              {formatNumber(selectedPeriod)}
            </p>
          </span>
        </div>
      </div>
    </StyledAllocatedSelector>
  );
};

const StyledAllocatedSelector = styled(motion.div)`
  .drop {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.25rem;
    label {
      margin-right: 0.25rem;
    }
  }
  .figures {
    display: flex;
    gap: 1rem;
    justify-content: center;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
`;

export default AllocatedSelector;
