import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  formatNumber,
  getYearlyAllocated,
  filterTransactionsByDateRange,
} from "../../util";
//icons
import { FaCheckSquare, FaTimesCircle } from "react-icons/fa";

const ExpeditureFigures = () => {
  const {
    currencySymbol,
    currentBudget,
    dateRange,
    includeMandatory,
    updateIncludeMandatory,
  } = useContext(GlobalContext);

  const budgetItems = currentBudget.data.budgetItems;
  const filteredBudgetItems = includeMandatory
    ? budgetItems
    : budgetItems.filter((item) => item.mandatory === false);

  //console.log(filteredBudgetItems);
  const transactions = currentBudget.data.transactions;
  const { yearlyNet } = currentBudget.data.income;
  const dailyNet = yearlyNet / 365;

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

  //add one day to difference to figure is inclusive of the day (otherwise 1 day = 0)
  const numOfDays = dateRange.to.diff(dateRange.from, "days") + 1;
  const salaryForRange = numOfDays * dailyNet;

  const budgetForRange =
    (numOfDays * getYearlyAllocated(filteredBudgetItems)) / 365;

  const remainingSalary = salaryForRange - spentAmount;

  let remainingBudget = 0;
  budgetForRange - spentAmount < 0
    ? (remainingBudget = 0)
    : (remainingBudget = budgetForRange - spentAmount);

  return (
    <StyledExpeditureFigures>
      <div className="box">
        <div className="left">
          <div className="budgetFigures">
            <div className="tableItem">
              <h5>Salary (Net) for period</h5>
              <div className="item">
                <span className="symbol">{currencySymbol} </span>
                <span className={salaryForRange < 0 ? "negative" : "positive"}>
                  {formatNumber(salaryForRange)}
                </span>
              </div>
            </div>
            <div className="tableItem">
              <h5>Budget allocated for period</h5>
              <div className="item">
                <span className="symbol">{currencySymbol} </span>
                <span className={budgetForRange < 0 ? "negative" : "positive"}>
                  {formatNumber(budgetForRange)}
                </span>
              </div>
            </div>
          </div>

          <div className="remainingFigures">
            <div className="tableItem">
              <h5>Remaining salary</h5>
              <div className="item">
                <span className="symbol">{currencySymbol} </span>
                <span
                  className={remainingSalary < 0.01 ? "negative" : "positive"}
                >
                  {formatNumber(remainingSalary)}
                </span>
              </div>
            </div>
            <div className="tableItem">
              <h5>Remaining budget</h5>
              <div className="item">
                <span className="symbol">{currencySymbol} </span>
                <span
                  className={remainingBudget < 0.01 ? "negative" : "positive"}
                >
                  {formatNumber(remainingBudget)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="spent">
          <div className="tableItem">
            <h5>Spent</h5>
            <div className="item">
              <span className="symbol">{currencySymbol} </span>
              <span
                id="spent"
                className={spentAmount < 0 ? "negative" : "positive"}
              >
                {formatNumber(spentAmount)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mandatory">
        <h5>Include Mandatory?</h5>
        <div className="icon">
          {includeMandatory ? (
            <FaCheckSquare
              className="check"
              onClick={() => updateIncludeMandatory(!includeMandatory)}
            />
          ) : (
            <FaTimesCircle
              className="cross"
              onClick={() => updateIncludeMandatory(!includeMandatory)}
            />
          )}
        </div>
      </div>
    </StyledExpeditureFigures>
  );
};

const StyledExpeditureFigures = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;

  .box {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }
  .mandatory {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .remainingFigures {
    margin-top: 1rem;
  }
  .salaryFigures,
  .budgetFigures,
  .remainingFigures {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    border-radius: 4px;

    .tableItem {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  .spent {
    background-color: #303030;
    padding: 1rem;
    border-radius: 4px;
    font-size: 14pt;
    font-weight: 700;
    h5 {
      margin-bottom: 0.5rem;
    }
    #spent {
      color: #e69a07;
    }
  }
`;

export default ExpeditureFigures;
