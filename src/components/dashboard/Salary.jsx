import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import styled from "styled-components";
import { motion } from "framer-motion";

const Salary = () => {
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

  console.log({ currentBudget });
  return (
    <StyledSalary>
      <h4>Salary gross and net breakdown</h4>
      <div className="data">
        <div className="gross">
          <div className="item">
            <h5>Annual (Gross)</h5>
            <p>
              <span className="symbol">{currencySymbol}</span>
              <span className={annual < 0 ? "negative" : "positive"}>
                {Number(annual).toFixed(2) || 0}
              </span>
            </p>
          </div>
          <div className="item">
            <h5>Monthly (Gross)</h5>
            <p>
              <span className="symbol">{currencySymbol}</span>
              <span className={annual / 12 < 0 ? "negative" : "positive"}>
                {Number(annual / 12).toFixed(2)}
              </span>
            </p>
          </div>
          <div className="item">
            <h5>Weekly (Gross)</h5>
            <p>
              <span className="symbol">{currencySymbol}</span>
              <span className={annual / 52 < 0 ? "negative" : "positive"}>
                {Number(annual / 52).toFixed(2)}
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
                {Number(yearlyNet).toFixed(2)}
              </span>
            </p>
          </div>
          <div className="item">
            <h5>Monthly (Net)</h5>
            <p>
              <span className="symbol">{currencySymbol}</span>
              <span className={monthlyNet < 0 ? "negative" : "positive"}>
                {Number(monthlyNet).toFixed(2)}
              </span>
            </p>
          </div>
          <div className="item">
            <h5>Weekly (Net)</h5>
            <p>
              <span className="symbol">{currencySymbol}</span>
              <span className={weeklyNet < 0 ? "negative" : "positive"}>
                {Number(weeklyNet).toFixed(2)}
              </span>
            </p>
          </div>
        </div>
      </div>
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
  /* .currencySign {
    //font-weight: bolder;
    margin-right: 0.25rem;
  } */

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

export default Salary;
