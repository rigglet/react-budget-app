import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import moment from "moment";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
//context
import { GlobalContext } from "../../context/GlobalContext";

//TODO: REFACTOR to remove useState where global state should be used
const DateFilter = () => {
  const { updateDateRange, dateRange } = useContext(GlobalContext);
  const date = moment(new Date(Date.now()));

  const handleChange = (value) => {
    switch (value) {
      case "FROM-LEFT":
        updateDateRange({
          ...dateRange,
          from: moment(dateRange.from).subtract(1, "d"),
        });
        break;
      case "FROM-RIGHT":
        updateDateRange({
          ...dateRange,
          from: moment(dateRange.from).add(1, "d"),
        });
        break;
      case "TO-LEFT":
        updateDateRange({
          ...dateRange,
          to: moment(dateRange.to).subtract(1, "d"),
        });
        break;
      case "TO-RIGHT":
        updateDateRange({
          ...dateRange,
          to: moment(dateRange.to).add(1, "d"),
        });
        break;
      default:
        updateDateRange({ from: date, to: date });
    }
  };

  return (
    <StyledDateFilter>
      <div className="from">
        <h5>From:</h5>
        <div className="dateBlock">
          <FaChevronLeft
            className="icon"
            onClick={() => handleChange("FROM-LEFT")}
          />
          <p id="from">{moment(dateRange.from).format("DD-MM-YYYY")}</p>

          <FaChevronRight
            className="icon"
            onClick={() => handleChange("FROM-RIGHT")}
          />
        </div>
      </div>

      <div className="to">
        <h5>To:</h5>
        <div className="dateBlock">
          <FaChevronLeft
            className="icon"
            onClick={() => handleChange("TO-LEFT")}
          />
          <p id="to">{moment(dateRange.to).format("DD-MM-YYYY")}</p>

          <FaChevronRight
            className="icon"
            onClick={() => handleChange("TO-RIGHT")}
          />
        </div>
      </div>
    </StyledDateFilter>
  );
};

const StyledDateFilter = styled(motion.div)`
  display: flex;
  align-items: center;
  font-size: 12pt;
  font-weight: 600;
  color: #8995a1;
  input[type="time"] {
    color: #8995a1;
    color: red;
  }
  h5 {
    color: white;
    font-weight: 500;
  }
  p {
    font-family: "Source Sans Pro", sans-serif;
    text-align: center;
    font-variant-numeric: tabular-nums;
    font-weight: 400;
    font-size: 11pt;
  }
  .dateBlock {
    display: flex;
    align-items: center;
  }

  .from,
  .to {
    display: flex;
    flex-direction: column;
    align-items: center;
    //margin: 0 1rem;
  }
  .icon {
    margin: 0 0.5rem;
    width: 20px;
    height: 20px;
    font-weight: bold;
    &:hover {
      color: #00b4ee;
      cursor: pointer;
    }
  }
`;

export default DateFilter;
// import { useState, useContext } from "react";
// import styled from "styled-components";
// import { motion } from "framer-motion";
// import moment from "moment";
// //import { getTodayDDMMYYY } from "../../util";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// //context
// import { GlobalContext } from "../../context/GlobalContext";

// const DateFilter = () => {
//   const { updateDateRange, dateRange } = useContext(GlobalContext);
//   //const date = moment(new Date(Date.now()));

//   //console.log(date);
//   // const [formData, setFormData] = useState({
//   //   from: date,
//   //   to: date,
//   // });

//   //console.log(formData);

//   const handleChange = (value) => {
//     switch (value) {
//       case "FROM-LEFT":
//         updateDateRange({
//           ...formData,
//           from: moment(formData.from).subtract(1, "d"),
//         });
//         break;
//       case "FROM-RIGHT":
//         updateDateRange({
//           ...formData,
//           from: moment(formData.from).add(1, "d"),
//         });
//         break;
//       case "TO-LEFT":
//         updateDateRange({
//           ...formData,
//           to: moment(formData.to).subtract(1, "d"),
//         });
//         break;
//       case "TO-RIGHT":
//         updateDateRange({
//           ...formData,
//           to: moment(formData.to).add(1, "d"),
//         });
//         break;
//       default:
//         updateDateRange({ from: date, to: date });
//     }
//   };

//   return (
//     <StyledDateFilter>
//       <div className="from">
//         <h5>From:</h5>
//         <div className="dateBlock">
//           <FaChevronLeft
//             className="icon"
//             onClick={() => handleChange("FROM-LEFT")}
//           />
//           <p id="from">{moment(formData.from).format("DD-MM-YYYY")}</p>
//           {/* <p id="from">{formData.from}</p> */}
//           <FaChevronRight
//             className="icon"
//             onClick={() => handleChange("FROM-RIGHT")}
//           />
//         </div>
//       </div>

//       <div className="to">
//         <h5>To:</h5>
//         <div className="dateBlock">
//           <FaChevronLeft
//             className="icon"
//             onClick={() => handleChange("TO-LEFT")}
//           />
//           <p id="to">{moment(formData.to).format("DD-MM-YYYY")}</p>
//           {/* <p id="to">{formData.to}</p> */}
//           <FaChevronRight
//             className="icon"
//             onClick={() => handleChange("TO-RIGHT")}
//           />
//         </div>
//       </div>
//     </StyledDateFilter>
//   );
// };

// const StyledDateFilter = styled(motion.div)`
//   display: flex;
//   align-items: center;
//   font-size: 12pt;
//   font-weight: 600;
//   color: #8995a1;
//   input[type="time"] {
//     color: #8995a1;
//     color: red;
//   }
//   h5 {
//     color: white;
//     font-weight: 500;
//   }
//   p {
//     font-family: "Source Sans Pro", sans-serif;
//     text-align: center;
//     font-variant-numeric: tabular-nums;
//     font-weight: 400;
//     font-size: 11pt;
//   }
//   .dateBlock {
//     display: flex;
//     align-items: center;
//   }

//   .from,
//   .to {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     //margin: 0 1rem;
//   }
//   .icon {
//     margin: 0 0.5rem;
//     width: 20px;
//     height: 20px;
//     font-weight: bold;
//     &:hover {
//       color: #00b4ee;
//       cursor: pointer;
//     }
//   }
// `;

// export default DateFilter;
