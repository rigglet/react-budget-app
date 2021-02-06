import { useContext, useState } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import styled from "styled-components";
import { motion } from "framer-motion";

import { getYearlyAllocated } from "../../../util";
import AllocatedSelector from "../AllocatedSelector";
import AllocatedChart from "../AllocatedChart";

const AllocatedWidget = () => {
  const [period, setPeriod] = useState("weekly");
  const { currentBudget } = useContext(GlobalContext);

  const budgetItems = currentBudget.data.budgetItems;
  const income = currentBudget.data.income;

  let yearlyAllocated = getYearlyAllocated(budgetItems);
  let subTotal = 0;

  // weekly / monthly /yearly total
  let selectedPeriod = 0;
  switch (period) {
    case "daily":
      selectedPeriod = income.weeklyNet / 7;
      subTotal = Number(yearlyAllocated / 365).toFixed(2);
      break;
    case "weekly":
      selectedPeriod = income.weeklyNet;
      subTotal = Number(yearlyAllocated / 52).toFixed(2);
      break;
    case "monthly":
      selectedPeriod = income.monthlyNet;
      subTotal = Number(yearlyAllocated / 12).toFixed(2);
      break;
    case "annually":
      selectedPeriod = income.yearlyNet;
      subTotal = Number(yearlyAllocated).toFixed(2);
      break;
    default:
      selectedPeriod = income.weeklyNet;
  }

  const remaining = (selectedPeriod - subTotal).toFixed(2);

  const handlePeriodChange = (e) => {
    //setPeriod(e.target.value);
    setPeriod(e);
  };

  return (
    <StyledAllocated>
      <h4>Budget allocated / remaining</h4>
      <AllocatedSelector
        period={period}
        handlePeriodChange={handlePeriodChange}
      />
      <div className="data">
        <div className="chart">
          {remaining > 0 && (
            <AllocatedChart
              selectedPeriod={selectedPeriod}
              subTotal={subTotal}
            />
          )}
        </div>
      </div>
    </StyledAllocated>
  );
};

const StyledAllocated = styled(motion.div)`
  padding: 1rem;
  width: 50%;
  border-radius: 4px;
  background-color: #39393c;
  color: #848586;

  #total {
    font-weight: bolder;
  }
  h4 {
    color: white;
    font-weight: 500;
    margin-bottom: 1rem;
  }
  .data {
    display: flex;
    justify-content: space-around;
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .drop {
        label {
          margin-right: 0.25rem;
        }
      }
      .figures {
        display: flex;
        gap: 1rem;
        .item {
          .symbol {
            margin-right: 0.25rem;
          }
        }
      }
    }
  }
  @media screen and (max-width: 1300px) {
    .data {
      display: flex;
      flex-direction: column;
      row-gap: 1rem;
      //justify-content: center;
      align-items: center;
      .info {
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
        //justify-content: space-around;
      }
    }
  }
`;

export default AllocatedWidget;
