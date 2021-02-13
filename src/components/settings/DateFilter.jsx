import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import moment from "moment";

const DateFilter = () => {
  const location = useLocation();
  const subMenu = location.pathname.split("/")[3];

  const [formData, setFormData] = useState({
    from: "",
    to: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <StyledDateFilter>
      <form>
        <label>From:</label>
        <input
          name="from"
          type="date"
          value={formData.date}
          onChange={handleChange}
        />
        <label>To:</label>
        <input
          name="to"
          type="date"
          value={formData.date}
          onChange={handleChange}
        />
      </form>
      {/* <p>{moment(date).format("DD-MM-YYYY")}</p> */}
    </StyledDateFilter>
  );
};

const StyledDateFilter = styled(motion.div)`
  color: white;
`;

export default DateFilter;
