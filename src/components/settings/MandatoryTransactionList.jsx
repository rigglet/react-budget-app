import { useContext, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { GlobalContext } from "../../context/GlobalContext";
import {
  sortByCategoryThenByItem,
  formatNumber,
  getItemAmountForRange,
} from "../../util";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

const MandatoryTransactionList = () => {
  const { currentBudget, dateRange, currencySymbol } = useContext(
    GlobalContext
  );

  const [mandatoryTransactions, toggleMandatoryTransactions] = useState(true);

  const budgetItems = currentBudget.data.budgetItems;

  // const getItemAmountForRange = (frequency, amount) => {
  //   //add one day to difference to figure is inclusive of the day (otherwise 1 day = 0)
  //   const numOfDays = dateRange.to.diff(dateRange.from, "days") + 1;

  //   if (frequency === "daily") {
  //     return amount * numOfDays;
  //   }
  //   if (frequency === "weekly") {
  //     return ((amount * 52) / 365) * numOfDays;
  //   }
  //   if (frequency === "monthly") {
  //     return ((amount * 12) / 365) * numOfDays;
  //   }
  //   if (frequency === "annually") {
  //     return (amount / 365) * numOfDays;
  //   }
  // };

  return (
    <StyledMandatoryTransactionList>
      <div className="heading">
        <h4>Transactions (Mandatory)</h4>
        {mandatoryTransactions ? (
          <FaChevronDown
            className="icon"
            onClick={() => toggleMandatoryTransactions(!mandatoryTransactions)}
          />
        ) : (
          <FaChevronUp
            className="icon"
            onClick={() => toggleMandatoryTransactions(!mandatoryTransactions)}
          />
        )}
      </div>
      {mandatoryTransactions ? (
        <table>
          <thead>
            <tr>
              <th>
                <h5>Date Range</h5>
              </th>
              <th>
                <h5>Category</h5>
              </th>
              <th>
                <h5>Item</h5>
              </th>
              {/* <th>
                <h5>Frequency</h5>
              </th>
              <th>
                <h5>Amount</h5>
              </th> */}
              <th>
                <h5>Amount per period</h5>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortByCategoryThenByItem(budgetItems)
              .filter((item) => item.mandatory === true && !item.paid)
              .map((item) => (
                <tr key={uuidv4()}>
                  <td className="dateRange">
                    <p>{moment(dateRange.from).format("DD-MM-YYYY")}</p>
                    <span>
                      <BsArrowRight className="rangeSeparatorIcon" />
                    </span>
                    <p>{moment(dateRange.to).format("DD-MM-YYYY")}</p>
                  </td>
                  <td>
                    <p>{item.category}</p>
                  </td>
                  <td>
                    <p>{item.item}</p>
                  </td>
                  {/* <td>
                    <p>{item.frequency}</p>
                  </td>
                  <td>
                    <p>
                      <span className="symbol">{currencySymbol}</span>
                      {formatNumber(item.amount)}
                    </p>
                  </td> */}
                  <td>
                    <p>
                      <span className="withdrawal">
                        <span className="sign">-</span>
                        <span className="symbol">{currencySymbol}</span>
                        {formatNumber(
                          getItemAmountForRange(
                            item.frequency,
                            item.amount,
                            dateRange
                          )
                        )}
                      </span>
                    </p>
                    {/* <p>
                      <span className="symbol">{currencySymbol}</span>
                      {formatNumber(
                        getItemAmountForRange(item.frequency, item.amount)
                      )}
                    </p> */}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        ""
      )}
    </StyledMandatoryTransactionList>
  );
};

const StyledMandatoryTransactionList = styled(motion.div)`
  padding: 1rem;
  border-radius: 4px;
  background-color: #39393c;
  color: #848586;
  width: 100%;

  table {
    width: 100%;
  }
  td {
    text-align: center;
  }
  .rangeSeparatorIcon {
    margin: 0 1rem;
    width: 25px;
    height: 25px;
  }
  .dateRange {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  p {
    text-transform: capitalize;
  }
  h5 {
    color: #848586;
    font-variant-caps: all-small-caps;
  }
  .heading {
    padding: 0;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    h4 {
      color: white;
      font-weight: 500;
      margin-bottom: 1rem;
    }
    .icon {
      width: 20px;
      height: 20px;
      color: white;
      cursor: pointer;
    }
  }
`;

export default MandatoryTransactionList;
