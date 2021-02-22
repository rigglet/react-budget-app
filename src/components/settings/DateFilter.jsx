import { useContext, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import moment from "moment";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
//context
import { GlobalContext } from "../../context/GlobalContext";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

//TODO: REFACTOR to remove useState where global state should be used
const DateFilter = () => {
  const { updateDateRange, dateRange } = useContext(GlobalContext);
  const date = moment(new Date(Date.now()));
  const [datePick, setDatePick] = useState(false);
  const [selectedDate, setSelectedDate] = useState("to");

  const toggleDatePick = (selected) => {
    switch (selected) {
      case "to":
        setSelectedDate("to");
        break;
      case "from":
        setSelectedDate("from");
        break;
      default:
        break;
    }
    setDatePick(!datePick);
  };

  const handleDayPick = (value) => {
    updateDateRange({
      ...dateRange,
      [selectedDate]: moment(value),
    });
    setDatePick(!datePick);
  };

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
      //TODO: Add week number
      //TODO: Add filter by week / month etc
      // case "WEEK-LEFT":
      //   updateDateRange({
      //     ...dateRange,
      //     to: moment(dateRange.to).subtract(1, "d"),
      //   });
      //   break;
      // case "WEEK-RIGHT":
      //   updateDateRange({
      //     ...dateRange,
      //     to: moment(dateRange.to).add(1, "d"),
      //   });
      //   break;
      default:
        updateDateRange({ from: date, to: date });
    }
  };

  return (
    <StyledDateFilter>
      {datePick && (
        <div className="datePicker">
          <Calendar
            // showWeekNumbers={true}
            onClickDay={(value) => handleDayPick(value)}
          />
        </div>
      )}
      <div className="from">
        <h5>From:</h5>
        <div className="dateBlock">
          <FaChevronLeft
            className="icon"
            onClick={() => handleChange("FROM-LEFT")}
          />
          <p id="from" onClick={() => toggleDatePick("from")}>
            {moment(dateRange.from).format("DD-MM-YYYY")}
          </p>

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
          <p id="to" onClick={() => toggleDatePick("to")}>
            {moment(dateRange.to).format("DD-MM-YYYY")}
          </p>

          <FaChevronRight
            className="icon"
            onClick={() => handleChange("TO-RIGHT")}
          />
        </div>
      </div>
      {/* <div className="week">
        <h5>Week No:</h5>
        <div className="dateBlock">
          <FaChevronLeft
            className="icon"
            onClick={() => handleChange("WEEK-LEFT")}
          />
          <p id="week" onClick={() => toggleDatePick("week")}>
            {moment(dateRange.to).format("DD-MM-YYYY")}
          </p>

          <FaChevronRight
            className="icon"
            onClick={() => handleChange("WEEK-RIGHT")}
          />
        </div>
      </div> */}
    </StyledDateFilter>
  );
};

const StyledDateFilter = styled(motion.div)`
  display: flex;
  align-items: center;
  font-size: 12pt;
  font-weight: 600;
  color: #8995a1;
  position: relative;

  .datePicker {
    border-radius: 4px;
    z-index: 99;
    top: 50px;
    left: 0px;
    position: absolute;
  }
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
  #week,
  #from,
  #to {
    &:hover {
      color: #00b4ee;
      cursor: pointer;
    }
  }
  .week,
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
