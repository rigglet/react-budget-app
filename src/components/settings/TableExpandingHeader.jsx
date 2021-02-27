import { useContext, useState } from "react";
import moment from "moment";
//styling
import styled from "styled-components";
import { motion } from "framer-motion";
//context
import { GlobalContext } from "../../context/GlobalContext";
//util
import {
  sortByCategoryThenByItem,
  getYearlyAllocatedPerDay,
  filterTransactionsByDateRange,
  filterTransactionsByDateRangeAndReturnTotal,
  formatNumber,
} from "../../util";
//arrows
import Xarrow from "react-xarrows";
//icons
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { HiOutlineEmojiHappy, HiOutlineEmojiSad } from "react-icons/hi";
import { FaGrin, FaFrown } from "react-icons/fa";

//FaGrin, FaFrown,
//components
import TrackerBudgetItem from "./TrackerBudgetItem";
//unique id
//import { v4 as uuidv4 } from "uuid";

const TableExpandingHeader = ({ title, uniqueid }) => {
  const { currentBudget, currencySymbol } = useContext(GlobalContext);
  const budgetItems = currentBudget.data.budgetItems;
  const [toggleMandatory, setToggleMandatory] = useState(false);
  const daysInMonth = moment(title, "MMMM").daysInMonth();

  const actualBudgetForMonth =
    getYearlyAllocatedPerDay(budgetItems) * daysInMonth;

  const transactions = currentBudget.data.transactions;

  const { yearlyNet } = currentBudget.data.income;
  const actualSalaryForMonth = (yearlyNet / 365) * daysInMonth;

  const range = {
    from: moment(title, "MMMM").startOf("month"),
    to: moment(title, "MMMM").endOf("month"),
  };

  //
  const monthlyTransactions = filterTransactionsByDateRange(
    transactions,
    range
  );
  console.log(monthlyTransactions);
  //calculate amount spent for supplied mmonth
  const spentAmount = filterTransactionsByDateRangeAndReturnTotal(
    transactions,
    range
  );
  //console.log(spentAmount);
  const salaryDifference = actualSalaryForMonth - spentAmount;
  const budgetDifference = actualBudgetForMonth - spentAmount;

  //ARROWS
  const arrowStyle = {
    curveness: Number(0.6),
    strokeWidth: Number(2),
    dashness: false,
    path: "smooth",
  };
  const salToBudgetStyle = {
    ...arrowStyle,
    startAnchor: "auto",
    endAnchor: "auto",
    color: actualBudgetForMonth < actualSalaryForMonth ? "#2ba874" : "#e2725d",
  };
  const budgetToSpentStyle = {
    ...arrowStyle,
    startAnchor: "auto",
    endAnchor: "auto",
    color: spentAmount < actualBudgetForMonth ? "#2ba874" : "#e2725d",
  };
  const spentToBudgetDiffStyle = {
    ...arrowStyle,
    startAnchor: "auto",
    endAnchor: "auto",
    color: budgetDifference > 0 ? "#2ba874" : "#e2725d",
  };
  const budgetDiffToSalaryDiffStyle = {
    ...arrowStyle,
    startAnchor: "auto",
    endAnchor: "auto",
    color: salaryDifference > 0 ? "#2ba874" : "#e2725d",
  };

  return (
    <StyledItem>
      <div className="header">
        <p className="month">{title}</p>
        <div className="toggle">
          {toggleMandatory ? (
            <FaChevronDown
              className="icon"
              onClick={() => setToggleMandatory(!toggleMandatory)}
            />
          ) : (
            <FaChevronUp
              className="icon"
              onClick={() => setToggleMandatory(!toggleMandatory)}
            />
          )}
        </div>
      </div>

      <div className="monthlyAllocated">
        <Xarrow
          start={`${uniqueid} + salary`}
          end={`${uniqueid} + budget`}
          {...salToBudgetStyle}
        />
        <Xarrow
          start={`${uniqueid} + budget`}
          end={`${uniqueid} + spent`}
          {...budgetToSpentStyle}
        />
        <Xarrow
          start={`${uniqueid} + spent`}
          end={`${uniqueid} + budDiff`}
          {...spentToBudgetDiffStyle}
        />
        <Xarrow
          start={`${uniqueid} + budDiff`}
          end={`${uniqueid} + salDiff`}
          {...budgetDiffToSalaryDiffStyle}
        />
        <div className="data">
          {actualSalaryForMonth > 0 &&
          actualBudgetForMonth < actualSalaryForMonth &&
          budgetDifference > 0 &&
          salaryDifference > 0 ? (
            <FaGrin className="icon happy" />
          ) : (
            <FaFrown className="icon sad" />
          )}

          <div className="featureNumber" id={`${uniqueid} + salary`}>
            <h5>(Net) salary</h5>
            <div className="item">
              <span className="symbol">{currencySymbol} </span>
              <span
                className={actualSalaryForMonth > 0 ? "positive" : "negative"}
              >
                {formatNumber(actualSalaryForMonth)}
              </span>
            </div>
          </div>
          <div className="featureNumber" id={`${uniqueid} + budget`}>
            <h5>Budgeted amount</h5>
            <div className="item">
              <span className="symbol">{currencySymbol} </span>
              <span
                className={
                  actualBudgetForMonth < actualSalaryForMonth
                    ? "positive"
                    : "negative"
                }
              >
                {formatNumber(actualBudgetForMonth)}
              </span>
            </div>
          </div>

          <div className="featureNumber" id={`${uniqueid} + spent`}>
            <h5>Spent</h5>
            <div className="item">
              <span className="symbol">{currencySymbol} </span>
              <span className="spent">{formatNumber(spentAmount)}</span>
            </div>
          </div>

          <div className="featureNumber" id={`${uniqueid} + budDiff`}>
            <h5>Budget difference</h5>
            <div className="item">
              <span className="symbol">{currencySymbol} </span>
              <span className={budgetDifference > 0 ? "positive" : "negative"}>
                {formatNumber(budgetDifference)}
              </span>
            </div>
          </div>
          <div className="featureNumber" id={`${uniqueid} + salDiff`}>
            <h5>Salary difference</h5>
            <div className="item">
              <span className="symbol">{currencySymbol} </span>
              <span className={salaryDifference > 0 ? "positive" : "negative"}>
                {formatNumber(salaryDifference)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="table">
        {toggleMandatory ? (
          <>
            <table>
              <thead>
                <tr>
                  <th>
                    <h5>Category</h5>
                  </th>
                  <th>
                    <h5>% of allocated</h5>
                  </th>
                  <th>
                    <h5>% of total</h5>
                  </th>
                  <th>
                    <h5>Category sub-total</h5>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortByCategoryThenByItem(monthlyTransactions).map((item) => (
                  <TrackerBudgetItem key={item.id} budgetItem={item} />
                ))}
              </tbody>
            </table>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="line"></div>
    </StyledItem>
  );
};

const StyledItem = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-between;
  margin-bottom: 0.25rem;
  .header,
  .monthlyAllocated {
    margin: 0.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .month {
      color: white;
    }
    .symbol {
      margin-right: 0.25rem;
    }
    .data {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .icon {
        height: 30px;
        width: 30px;
      }
      .happy {
        color: #2ba874;
      }
      .sad {
        color: #e2725d;
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
      min-width: 10%;
      //font-size: 14pt;
      font-weight: 700;
      h5 {
        margin-bottom: 0.5rem;
      }
    }
    .spent {
      color: #e69a07;
    }
  }
  .toggle {
    padding: 0.25rem;
    background-color: #303030;
    color: #848586;
    border-radius: 4px;
  }
  .table {
    background-color: #39393c;
  }
  p {
    text-align: center;
    text-transform: capitalize;
  }
`;

export default TableExpandingHeader;
// import { useContext, useState } from "react";
// import moment from "moment";
// //styling
// import styled from "styled-components";
// import { motion } from "framer-motion";
// //context
// import { GlobalContext } from "../../context/GlobalContext";
// //util
// import {
//   sortByCategoryThenByItem,
//   getYearlyAllocatedPerDay,
//   filterTransactionsByDateRange,
//   filterTransactionsByDateRangeAndReturnTotal,
//   formatNumber,
// } from "../../util";
// //arrows
// import Xarrow from "react-xarrows";
// //icons
// import { FaChevronUp, FaChevronDown } from "react-icons/fa";
// //FaGrin, FaFrown,
// //components
// import TrackerBudgetItem from "./TrackerBudgetItem";
// //unique id
// //import { v4 as uuidv4 } from "uuid";

// const TableExpandingHeader = ({ title, uniqueid }) => {
//   const { currentBudget, currencySymbol } = useContext(GlobalContext);
//   const budgetItems = currentBudget.data.budgetItems;
//   const [toggleMandatory, setToggleMandatory] = useState(false);
//   const daysInMonth = moment(title, "MMMM").daysInMonth();

//   const actualBudgetPerMonth =
//     getYearlyAllocatedPerDay(budgetItems) * daysInMonth;

//   const transactions = currentBudget.data.transactions;

//   const { yearlyNet } = currentBudget.data.income;
//   const actualSalaryForMonth = (yearlyNet / 365) * daysInMonth;

//   const range = {
//     from: moment(title, "MMMM").startOf("month"),
//     to: moment(title, "MMMM").endOf("month"),
//   };

//   //
//   const monthlyTransactions = filterTransactionsByDateRange(
//     transactions,
//     range
//   );
//   console.log(monthlyTransactions);
//   //calculate amount spent for supplied mmonth
//   const spentAmount = filterTransactionsByDateRangeAndReturnTotal(
//     transactions,
//     range
//   );
//   //console.log(spentAmount);
//   const salaryDifference = actualSalaryForMonth - spentAmount;
//   const budgetDifference = actualBudgetPerMonth - spentAmount;

//   //ARROWS
//   const arrowStyle = {
//     curveness: Number(0.6),
//     strokeWidth: Number(2),
//     dashness: false,
//     path: "smooth",
//   };
//   const salArrowStyle = {
//     ...arrowStyle,
//     startAnchor: "auto",
//     endAnchor: { position: "auto", offset: { bottomness: -15 } },
//     color: salaryDifference < 0 ? "#e2725d" : "#2ba874",
//   };
//   const budgetArrowStyle = {
//     ...arrowStyle,
//     startAnchor: "auto",
//     endAnchor: { position: "auto", offset: { bottomness: 15 } },
//     color: budgetDifference < 0 ? "#e2725d" : "#2ba874",
//   };
//   const salDiffArrowStyle = {
//     ...arrowStyle,
//     startAnchor: { position: "auto", offset: { bottomness: -15 } },
//     endAnchor: "auto",
//     color: salaryDifference < 0 ? "#e2725d" : "#2ba874",
//   };
//   const budgetDiffArrowStyle = {
//     ...arrowStyle,
//     startAnchor: { position: "auto", offset: { bottomness: 15 } },
//     endAnchor: "auto",
//     color: budgetDifference < 0 ? "#e2725d" : "#2ba874",
//   };

//   return (
//     <StyledItem>
//       <div className="header">
//         <p className="month">{title}</p>
//         <div className="toggle">
//           {toggleMandatory ? (
//             <FaChevronDown
//               className="icon"
//               onClick={() => setToggleMandatory(!toggleMandatory)}
//             />
//           ) : (
//             <FaChevronUp
//               className="icon"
//               onClick={() => setToggleMandatory(!toggleMandatory)}
//             />
//           )}
//         </div>
//       </div>
//       <div className="monthlyAllocated">
//         <Xarrow
//           start={`${uniqueid} + salary`}
//           end={`${uniqueid} + spent`}
//           {...salArrowStyle}
//         />
//         <Xarrow
//           start={`${uniqueid} + budget`}
//           end={`${uniqueid} + spent`}
//           {...budgetArrowStyle}
//         />
//         <Xarrow
//           start={`${uniqueid} + spent`}
//           end={`${uniqueid} + salDiff`}
//           {...salDiffArrowStyle}
//         />
//         <Xarrow
//           start={`${uniqueid} + spent`}
//           end={`${uniqueid} + budDiff`}
//           {...budgetDiffArrowStyle}
//         />

//         <div className="data">
//           <div className="left">
//             <div className="featureNumber" id={`${uniqueid} + salary`}>
//               <h5>(Net) salary</h5>
//               <div className="item">
//                 <span className="symbol">{currencySymbol} </span>
//                 <span
//                   className={actualSalaryForMonth < 0 ? "negative" : "positive"}
//                 >
//                   {formatNumber(actualSalaryForMonth)}
//                 </span>
//               </div>
//             </div>
//             <div className="featureNumber" id={`${uniqueid} + budget`}>
//               <h5>Budgeted amount</h5>
//               <div className="item">
//                 <span className="symbol">{currencySymbol} </span>
//                 <span
//                   className={actualBudgetPerMonth < 0 ? "negative" : "positive"}
//                 >
//                   {formatNumber(actualBudgetPerMonth)}
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="middle">
//             <div className="featureNumber" id={`${uniqueid} + spent`}>
//               <h5>Spent</h5>
//               <div className="item">
//                 <span className="symbol">{currencySymbol} </span>
//                 <span className="spent">{formatNumber(spentAmount)}</span>
//               </div>
//             </div>
//           </div>
//           <div className="right">
//             <div className="featureNumber" id={`${uniqueid} + salDiff`}>
//               <h5>Salary difference</h5>
//               <div className="item">
//                 <span className="symbol">{currencySymbol} </span>
//                 <span
//                   className={salaryDifference < 0 ? "negative" : "positive"}
//                 >
//                   {formatNumber(salaryDifference)}
//                 </span>
//               </div>
//             </div>
//             <div className="featureNumber" id={`${uniqueid} + budDiff`}>
//               <h5>Budget difference</h5>
//               <div className="item">
//                 <span className="symbol">{currencySymbol} </span>
//                 <span
//                   className={budgetDifference < 0 ? "negative" : "positive"}
//                 >
//                   {formatNumber(budgetDifference)}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="table">
//         {toggleMandatory ? (
//           <>
//             <table>
//               <thead>
//                 <tr>
//                   <th>
//                     <h5>Category</h5>
//                   </th>
//                   <th>
//                     <h5>% of allocated</h5>
//                   </th>
//                   <th>
//                     <h5>% of total</h5>
//                   </th>
//                   <th>
//                     <h5>Category sub-total</h5>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {sortByCategoryThenByItem(monthlyTransactions).map((item) => (
//                   <TrackerBudgetItem key={item.id} budgetItem={item} />
//                 ))}
//               </tbody>
//             </table>
//           </>
//         ) : (
//           ""
//         )}
//       </div>
//       <div className="line"></div>
//     </StyledItem>
//   );
// };

// const StyledItem = styled(motion.div)`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: space-between;
//   margin-bottom: 0.25rem;
//   .header,
//   .monthlyAllocated {
//     margin: 0.25rem;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     .month {
//       color: white;
//     }
//     .symbol {
//       margin-right: 0.25rem;
//     }
//     .data {
//       min-width: 100%;

//       display: flex;
//       align-items: center;
//       justify-content: space-between;
//       .middle,
//       .left,
//       .right {
//         width: 100%;
//         display: flex;
//         align-items: center;
//         flex-direction: column;
//         justify-content: space-around;
//         gap: 1rem;
//       }
//     }
//     .featureNumber {
//       display: flex;
//       flex-direction: column;
//       justify-content: center;
//       align-items: center;
//       background-color: #303030;
//       padding: 0.5rem;
//       border-radius: 4px;
//       min-width: 40%;
//       //font-size: 14pt;
//       font-weight: 700;
//       h5 {
//         margin-bottom: 0.5rem;
//       }
//     }
//     .spent {
//       color: #e69a07;
//     }
//   }
//   .toggle {
//     padding: 0.25rem;
//     background-color: #303030;
//     color: #848586;
//     border-radius: 4px;
//   }
//   .table {
//     background-color: #39393c;
//   }
//   p {
//     text-align: center;
//     text-transform: capitalize;
//   }
// `;

// export default TableExpandingHeader;
