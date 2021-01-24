import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import styled from "styled-components";
import { motion } from "framer-motion";

const Salary = () => {
  const { budgets, currentBudgetId, updateBudget } = useContext(GlobalContext);
  const currentBudget = budgets.filter(
    (budget) => budget.id === currentBudgetId
  )[0];
  const budgetItems = currentBudget.data.budgetItems;
  const {
    annual,
    weeklyNet,
    monthlyNet,
    yearlyNet,
  } = currentBudget.data.income;
  //console.log(income);

  return (
    <StyledSalary>
      <h4>Salary gross and net breakdown</h4>
      <div className="data">
        <div className="gross">
          <div className="item">
            <h5>Annual (Gross)</h5>
            <p>
              <span className="currencySign">£</span>
              {annual.toFixed(2)}
            </p>
          </div>
          <div className="item">
            <h5>Monthly (Gross)</h5>
            <p>
              <span className="currencySign">£</span>
              {(annual / 12).toFixed(2)}
            </p>
          </div>
          <div className="item">
            <h5>Weekly (Gross)</h5>
            <p>
              <span className="currencySign">£</span>
              {(annual / 52).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="net">
          <div className="item">
            <h5>Annual (Net)</h5>
            <p>
              <span className="currencySign">£</span>
              {yearlyNet.toFixed(2)}
            </p>
          </div>
          <div className="item">
            <h5>Monthly (Net)</h5>
            <p>
              <span className="currencySign">£</span>
              {monthlyNet.toFixed(2)}
            </p>
          </div>
          <div className="item">
            <h5>Weekly (Net)</h5>
            <p>
              <span className="currencySign">£</span>
              {weeklyNet.toFixed(2)}
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
  .currencySign {
    //font-weight: bolder;
    margin-right: 0.25rem;
  }
  .data {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    //width: 100%;
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

export default Salary;
