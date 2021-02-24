import styled from "styled-components";
import { motion } from "framer-motion";
import AnnualOverviewWidget from "../dashboard/widgets/AnnualOverviewWidget";
import TrackerBudgetList from "./TrackerBudgetList";

const Tracker = () => {
  return (
    <StyledTracker>
      <h3>Tracker</h3>
      <AnnualOverviewWidget />
      <TrackerBudgetList />
    </StyledTracker>
  );
};

const StyledTracker = styled(motion.div)`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  h3 {
    color: white;
  }
  .charts {
    display: flex;
    row-gap: 1rem;
    column-gap: 1rem;
  }
`;

export default Tracker;
