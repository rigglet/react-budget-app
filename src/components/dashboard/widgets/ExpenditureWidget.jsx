import { useContext, useState } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import styled from "styled-components";
import { motion } from "framer-motion";

import {
  //getYearlyAllocated,
  getAllocatedPerPeriod,
  getNetIncomeForPeriod,
} from "../../../util";
import AllocatedSelector from "../AllocatedSelector";
import AllocatedChart from "../AllocatedChart";

const ExpenditureWidget = () => {
  const [period, setPeriod] = useState("daily");
  const { currentBudget } = useContext(GlobalContext);

  let subTotal = getAllocatedPerPeriod(currentBudget, period);
  let selectedPeriod = getNetIncomeForPeriod(currentBudget, period);
  const remaining = (selectedPeriod - subTotal).toFixed(2);

  console.log(subTotal);

  const handlePeriodChange = (e) => {
    //setPeriod(e.target.value);
    setPeriod(e);
  };

  return (
    <StyledExpenditure>
      <h4>Expenditure vs budget</h4>
      <AllocatedSelector
        period={period}
        handlePeriodChange={handlePeriodChange}
        selectedPeriod={selectedPeriod}
        subTotal={subTotal}
        remaining={remaining}
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
    </StyledExpenditure>
  );
};

const StyledExpenditure = styled(motion.div)`
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

export default ExpenditureWidget;
