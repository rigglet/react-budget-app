//import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//import { GlobalContext } from "../context/GlobalContext";
import Allocated from "../components/dashboard/Allocated";
import BudgetBreakdown from "../components/dashboard/BudgetBreakdown";
import Salary from "../components/dashboard/Salary";

const Dashboard = () => {
  return (
    <StyledDashboard>
      <div className="left"></div>
      <div className="main">
        <h3>Dashboard</h3>
        <div className="widgets">
          <Salary />
          <Allocated />
          <BudgetBreakdown />
        </div>
      </div>
      <div className="right"></div>
    </StyledDashboard>
  );
};

const StyledDashboard = styled(motion.div)`
  padding: 1.5rem;
  width: 100vw;
  background-color: #1f2023;
  color: #848586;
  display: grid;
  grid-template-columns: 15vw auto 15vw;
  grid-template-rows: auto;
  grid-template-areas: "left main right";
  .left {
    grid-area: left;
  }
  .main {
    h3 {
      margin-bottom: 1rem;
      color: white;
    }
    .widgets {
      grid-area: main;
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      flex-direction: column;
    }
  }
  .right {
    grid-area: right;
  }
`;

export default Dashboard;
