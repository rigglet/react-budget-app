import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
//styling
import styled from "styled-components";
import { motion } from "framer-motion";
//util functions
import { formatNumber } from "../../util";
//icons
import { FaCheckSquare, FaTimesCircle } from "react-icons/fa";
//import { BsArrowRight } from "react-icons/bs";

const ExpeditureFigures = ({
  spentAmount,
  remainingBudget,
  excessSalary,
  budgetForRange,
  salaryForRange,
  mandatoryBudgetAmount,
}) => {
  const {
    currencySymbol,
    includeMandatory,
    updateIncludeMandatory,
    includeDisposableOnly,
    updateIncludeDisposableOnly,
  } = useContext(GlobalContext);

  return (
    <StyledExpeditureFigures>
      <div className="top">
        <div className="options">
          {!includeDisposableOnly ? (
            <div className="mandatory">
              <h5>Include mandatory budget items as transactions?</h5>
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
          ) : (
            ""
          )}
          <div className="disposable">
            <h5>View disposable income only?</h5>
            <div className="icon">
              {includeDisposableOnly ? (
                <FaCheckSquare
                  className="check"
                  onClick={() =>
                    updateIncludeDisposableOnly(!includeDisposableOnly)
                  }
                />
              ) : (
                <FaTimesCircle
                  className="cross"
                  onClick={() =>
                    updateIncludeDisposableOnly(!includeDisposableOnly)
                  }
                />
              )}
            </div>
          </div>
        </div>

        <div className="spentbox">
          <div className="spent">
            <div className="spentItem">
              <h5>Disposable Spend</h5>
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
          {includeMandatory && !includeDisposableOnly ? (
            <>
              <div id="plus">+</div>
              <div className="spent">
                <div className="spentItem">
                  <h5>Mandatory Spend</h5>
                  <div className="item">
                    <span className="symbol">{currencySymbol} </span>
                    <span
                      id="spent"
                      className={
                        mandatoryBudgetAmount < 0 ? "negative" : "positive"
                      }
                    >
                      {formatNumber(mandatoryBudgetAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="bottom">
        <div className="salaryFigures">
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
            <h5>Excess salary</h5>
            <div className="item">
              <span className="symbol">{currencySymbol} </span>
              <span className={excessSalary < 0.01 ? "negative" : "positive"}>
                {formatNumber(excessSalary)}
              </span>
            </div>
          </div>
        </div>

        <div className="budgetFigures">
          <div className="tableItem">
            <h5>Budget allocated for period</h5>
            <div className="item">
              <span className="symbol">{currencySymbol} </span>
              <span className={budgetForRange < 0 ? "negative" : "positive"}>
                {formatNumber(budgetForRange)}
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
    </StyledExpeditureFigures>
  );
};

const StyledExpeditureFigures = styled(motion.div)`
  display: flex;
  flex-direction: column;
  column-gap: 1rem;
  row-gap: 1.5rem;

  .top {
    display: flex;
    gap: 1rem;
    .options {
      display: flex;
      flex-direction: column;
      row-gap: 0.5rem;
      border-radius: 4px;
      border: 2px solid #848586;
      padding: 0.25rem;
      .mandatory,
      .disposable {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        .icon {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .check,
      .cross {
        width: 20px;
        height: 20px;
      }
      .check {
        color: #00b4ee;
      }
    }
    .spentbox {
      display: flex;
      column-gap: 0.25rem;
      #plus {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #e69a07;
        font-size: 16pt;
        font-weight: 700;
      }
      .spent {
        background-color: #303030;
        padding: 0.5rem;
        border-radius: 4px;
        .spentItem {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        #spent {
          color: #e69a07;
          font-family: "Source Sans Pro", sans-serif;
          /* text-align: center; */
          font-variant-numeric: tabular-nums;
          font-size: 14pt;
          font-weight: 700;
        }
      }
    }
  }

  .bottom {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;

    .salaryFigures,
    .budgetFigures,
    .mandatoryFigures {
      display: flex;
      gap: 1rem;
      .tableItem {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
      }
    }
  }
`;

export default ExpeditureFigures;
