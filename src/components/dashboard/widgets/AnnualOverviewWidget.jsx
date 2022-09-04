import styled from "styled-components";
import { motion } from "framer-motion";
import { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import Xarrow from "react-xarrows";

import {
  formatNumber,
  getYearlyAllocated,
  filterTransactionsByDateRange,
} from "../../../utilities";

const AnnualOverviewWidget = () => {
  const { currencySymbol, currentBudget, dateRange } = useContext(
    GlobalContext
  );

  const budgetItems = currentBudget.data.budgetItems;
  const transactions = currentBudget.data.transactions;

  const { yearlyNet } = currentBudget.data.income;
  const budgetAmount = getYearlyAllocated(budgetItems);
  const spentAmount = filterTransactionsByDateRange(
    transactions,
    dateRange
  ).reduce((acc, current) => {
    return (
      Number(acc) +
      (current.type === "deposit"
        ? -Math.abs(Number(current.amount))
        : Number(current.amount))
    );
  }, []);
  const salaryDifference = yearlyNet - spentAmount;
  const budgetDifference = budgetAmount - spentAmount;

  const arrowStyle = {
    curveness: Number(0.6),
    strokeWidth: Number(2),
    dashness: false,
    path: "smooth",
  };
  const salArrowStyle = {
    ...arrowStyle,
    startAnchor: "auto",
    endAnchor: { position: "auto", offset: { bottomness: -15 } },
    color: salaryDifference < 0 ? "#e2725d" : "#2ba874",
  };
  const budgetArrowStyle = {
    ...arrowStyle,
    startAnchor: "auto",
    endAnchor: { position: "auto", offset: { bottomness: 15 } },
    color: budgetDifference < 0 ? "#e2725d" : "#2ba874",
  };
  const salDiffArrowStyle = {
    ...arrowStyle,
    startAnchor: { position: "auto", offset: { bottomness: -15 } },
    endAnchor: "auto",
    color: salaryDifference < 0 ? "#e2725d" : "#2ba874",
  };
  const budgetDiffArrowStyle = {
    ...arrowStyle,
    startAnchor: { position: "auto", offset: { bottomness: 15 } },
    endAnchor: "auto",
    color: budgetDifference < 0 ? "#e2725d" : "#2ba874",
  };

  return (
    <StyledAnnualOverviewWidget>
      <Xarrow start="salary" end="annualSpent" {...salArrowStyle} />
      <Xarrow start="budget" end="annualSpent" {...budgetArrowStyle} />
      <Xarrow start="annualSpent" end="salDiff" {...salDiffArrowStyle} />
      <Xarrow start="annualSpent" end="budDiff" {...budgetDiffArrowStyle} />

      <h4>Annual Overview</h4>
      <div className="data">
        <div className="left">
          <div className="featureNumber" id="salary">
            <h5>Annual (Net) salary</h5>
            <div className="item">
              <span className="symbol">{currencySymbol} </span>
              <span className={yearlyNet < 0 ? "negative" : "positive"}>
                {formatNumber(yearlyNet)}
              </span>
            </div>
          </div>
          <div className="featureNumber" id="budget">
            <h5>Budgeted amount</h5>
            <div className="item">
              <span className="symbol">{currencySymbol} </span>
              <span className={budgetAmount < 0 ? "negative" : "positive"}>
                {formatNumber(budgetAmount)}
              </span>
            </div>
          </div>
        </div>
        <div className="middle">
          <div className="featureNumber" id="annualSpent">
            <h5>Spent</h5>
            <div className="item">
              <span className="symbol">{currencySymbol} </span>
              <span className="spent">{formatNumber(spentAmount)}</span>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="featureNumber" id="salDiff">
            <h5>Salary difference</h5>
            <div className="item">
              <span className="symbol">{currencySymbol} </span>
              <span className={salaryDifference < 0 ? "negative" : "positive"}>
                {formatNumber(salaryDifference)}
              </span>
            </div>
          </div>
          <div className="featureNumber" id="budDiff">
            <h5>Budget difference</h5>
            <div className="item">
              <span className="symbol">{currencySymbol} </span>
              <span className={budgetDifference < 0 ? "negative" : "positive"}>
                {formatNumber(budgetDifference)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </StyledAnnualOverviewWidget>
  );
};

const StyledAnnualOverviewWidget = styled(motion.div)`
  min-width: 100%;
  background-color: #39393c;
  color: #848586;
  border-radius: 4px;
  padding: 1rem;
  h4 {
    color: white;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  .data {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .middle,
    .left,
    .right {
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-around;
      gap: 1rem;
    }
  }
  .featureNumber {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #303030;
    padding: 0.5rem;
    border-radius: 4px;
    min-width: 40%;
    //font-size: 14pt;
    font-weight: 700;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .spent {
    color: #e69a07;
  }
`;

export default AnnualOverviewWidget;
