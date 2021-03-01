import styled from "styled-components";
import { motion } from "framer-motion";
import AnnualOverviewWidget from "../dashboard/widgets/AnnualOverviewWidget";
import TrackerBudgetList from "./TrackerBudgetList";

const Tracker = () => {
  return (
    <StyledTracker>
      <h3>Tracker</h3>
      <div className="info">
        <AnnualOverviewWidget />
        <div className="lists">
          <TrackerBudgetList />
        </div>
      </div>
    </StyledTracker>
  );
};

const StyledTracker = styled(motion.div)`
  display: flex;
  flex-direction: column;
  h3 {
    color: white;
  }
  .info {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    .lists {
      display: flex;
      row-gap: 1rem;
      column-gap: 1rem;
    }
  }
`;

export default Tracker;
