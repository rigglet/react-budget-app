import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import moment from "moment";
//import { getTodayDDMMYYY } from "../../util";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const DateFilter = () => {
  const date = moment(new Date(Date.now()));

  console.log(date);
  const [formData, setFormData] = useState({
    from: date,
    to: date,
  });

  //console.log(formData);

  const handleChange = (value) => {
    switch (value) {
      case "FROM-LEFT":
        setFormData({
          ...formData,
          from: moment(formData.from).subtract(1, "d"),
        });
        break;
      case "FROM-RIGHT":
        setFormData({
          ...formData,
          from: moment(formData.from).add(1, "d"),
        });
        break;
      case "TO-LEFT":
        setFormData({
          ...formData,
          to: moment(formData.to).subtract(1, "d"),
        });
        break;
      case "TO-RIGHT":
        setFormData({
          ...formData,
          to: moment(formData.to).add(1, "d"),
        });
        break;
      default:
        setFormData({ from: date, to: date });
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
          <p id="from">{moment(formData.from).format("DD-MM-YYYY")}</p>
          {/* <p id="from">{formData.from}</p> */}
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
          <p id="to">{moment(formData.to).format("DD-MM-YYYY")}</p>
          {/* <p id="to">{formData.to}</p> */}
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
  h5 {
    color: white;
    font-weight: 500;
  }
  p {
    width: 85px;
    text-align: center;
    font-variant-numeric: tabular-nums;
    font-weight: 400;
    font-size: 10pt;
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
