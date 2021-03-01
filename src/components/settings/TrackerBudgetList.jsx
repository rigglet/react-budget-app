import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { GlobalContext } from "../../context/GlobalContext";
import TableExpandingHeader from "./TableExpandingHeader";
import { v4 as uuidv4 } from "uuid";

const TrackerBudgetList = () => {
  const { currentBudget } = useContext(GlobalContext);

  //const budgetItems = currentBudget.data.budgetItems;

  //get set containing month names between a certain date range
  const allMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <StyledTrackerBudgetList>
      <h4>Budget allocated vs spent per month</h4>
      {allMonths.map((m) => (
        <TableExpandingHeader key={uuidv4()} uniqueid={uuidv4()} title={m} />
      ))}
    </StyledTrackerBudgetList>
  );
};

const StyledTrackerBudgetList = styled(motion.div)`
  width: 100%;
  padding: 1rem;
  border-radius: 4px;
  background-color: #39393c;
  color: #848586;
  table {
    width: 100%;
  }
  h4 {
    color: white;
    font-weight: 500;
    margin-bottom: 1rem;
  }
  h5 {
    color: #848586;
    font-variant-caps: all-small-caps;
  }
`;

export default TrackerBudgetList;
