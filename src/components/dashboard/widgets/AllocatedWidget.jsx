import { useContext, useState } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import styled from "styled-components";
import { motion } from "framer-motion";

import {
  //getYearlyAllocated,
  getAllocatedPerPeriod,
  getNetIncomeForPeriod,
} from "../../../utilities";
import AllocatedSelector from "../AllocatedSelector";
import AllocatedChart from "../AllocatedChart";

const AllocatedWidget = ({income, allocatedFundsTotal}) => {
  const [period, setPeriod] = useState("daily");
  const { currentBudget } = useContext(GlobalContext);

  // let subTotal = getAllocatedPerPeriod(currentBudget, period);
  // let selectedPeriod = getNetIncomeForPeriod(currentBudget, period);
  // const remaining = Number(selectedPeriod) - Number(subTotal);
  
  let subTotal = allocatedFundsTotal/100;
  let selectedPeriod = income/100;
  const remaining = Number(selectedPeriod) - Number(subTotal);

  // console.log(subTotal)
  // console.log(selectedPeriod)
  // console.log(remaining)
  // console.log(currentBudget)

  const handlePeriodChange = (value) => {
    setPeriod(value);
  };

  return (
    <StyledAllocated>
      <h4>Budget allocated / remaining</h4>
      {currentBudget.data.income.annualNet > 0 ? (
        <>
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
        </>
      ) : (
        <>
          <p>No data to display.</p>
          <p>Please enter income figures and budget.</p>
        </>
      )}
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
