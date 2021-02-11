import React, { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import styled from "styled-components";
import { motion } from "framer-motion";
//format numbers
import { formatNumber } from "../../../util";

const SalaryWidget = () => {
  const { budgets, currentBudgetId, currencySymbol } = useContext(
    GlobalContext
  );
  const currentBudget = budgets.filter(
    (budget) => budget.id === currentBudgetId
  )[0];

  const {
    annual,
    weeklyNet,
    monthlyNet,
    yearlyNet,
  } = currentBudget.data.income;

  return (
    <StyledSalary>
      <h4>Salary gross and net breakdown</h4>
      {yearlyNet > 0 ? (
        <div className="data">
          <div className="gross">
            <div className="item">
              <h5>Annual (Gross)</h5>
              <p>
                <span className="symbol">{currencySymbol}</span>
                <span className={annual < 0 ? "negative" : "positive"}>
                  {formatNumber(annual)}
                </span>
              </p>
            </div>
            <div className="item">
              <h5>Monthly (Gross)</h5>
              <p>
                <span className="symbol">{currencySymbol}</span>
                <span className={annual / 12 < 0 ? "negative" : "positive"}>
                  {formatNumber(annual / 12)}
                </span>
              </p>
            </div>
            <div className="item">
              <h5>Weekly (Gross)</h5>
              <p>
                <span className="symbol">{currencySymbol}</span>
                <span className={annual / 52 < 0 ? "negative" : "positive"}>
                  {formatNumber(annual / 52)}
                </span>
              </p>
            </div>
          </div>

          <div className="net">
            <div className="item">
              <h5>Annual (Net)</h5>
              <p>
                <span className="symbol">{currencySymbol}</span>
                <span className={yearlyNet < 0 ? "negative" : "positive"}>
                  {formatNumber(yearlyNet)}
                </span>
              </p>
            </div>
            <div className="item">
              <h5>Monthly (Net)</h5>
              <p>
                <span className="symbol">{currencySymbol}</span>
                <span className={monthlyNet < 0 ? "negative" : "positive"}>
                  {formatNumber(monthlyNet)}
                </span>
              </p>
            </div>
            <div className="item">
              <h5>Weekly (Net)</h5>
              <p>
                <span className="symbol">{currencySymbol}</span>
                <span className={weeklyNet < 0 ? "negative" : "positive"}>
                  {formatNumber(weeklyNet)}
                </span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p>No data to display.</p>
      )}
    </StyledSalary>
  );
};

const StyledSalary = styled(motion.div)`
  padding: 1rem;
  width: 50%;
  border-radius: 4px;
  background-color: #39393c;
  color: #848586;

  h4 {
    color: white;
    font-weight: 500;
    margin-bottom: 1rem;
  }
  .data {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    //width: 100%;
    .symbol {
      margin-right: 0.25rem;
    }
  }
  .gross,
  .net {
    display: flex;
    justify-content: space-around;
  }

  @media screen and (max-width: 1100px) {
    .gross,
    .net {
      display: flex;
      flex-direction: column;
      align-items: center;
      //justify-content: center;
    }
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      //justify-content: center;
    }
  }
`;

export default SalaryWidget;
