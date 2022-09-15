import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { formatNumber } from "../utilities";
import styled from "styled-components";
import { motion } from "framer-motion";

const AllocatedSelector = ({
  handlePeriodChange,
  netIncomeForPeriod,
  allocatedTotalForPeriod,
  remaining,
}) => {

  const { currencySymbol } = useContext(GlobalContext);

  return (
    <StyledAllocatedSelector>
      <div className="drop">
        <label htmlFor="period">Period:</label>
        <select
          name="period"
          onChange={(e) => handlePeriodChange(e.target.value)}
        >
          <option value="annually" key="annually">
            Annually
          </option>
          <option value="monthly" key="monthly">
            Monthly
          </option>
          <option value="weekly" key="weekly">
            Weekly
          </option>
          <option value="daily" key="daily">
            Daily
          </option>
        </select>
      </div>

      <div className="figures">
        <div className="item">
          <h5>Allocated</h5>
          <span className={allocatedTotalForPeriod < 0 ? "negative" : "positive"}>
            <p className="tableItem">
              <span className="symbol">{currencySymbol} </span>
              {formatNumber(allocatedTotalForPeriod)}
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
            className={netIncomeForPeriod < 0 ? "negative" : "positive"}
          >
            <p className="tableItem">
              <span className="symbol">{currencySymbol} </span>
              {formatNumber(netIncomeForPeriod)}
            </p>
          </span>
        </div>
      </div>
    </StyledAllocatedSelector>
  );
};

const StyledAllocatedSelector = styled(motion.div)`
  border: 2px solid var(--highlight-color);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  padding: 0.5rem;
  
  .drop {
    display: flex;
    align-items: center;
    justify-content: center;
    
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
