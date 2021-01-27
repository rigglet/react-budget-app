import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import { GlobalContext } from "../context/GlobalContext";
import { useLocation } from "react-router-dom";
import Income from "../components/settings/Income";
import Budget from "../components/settings/Budget";
import Tracker from "../components/settings/Tracker";
import Overview from "../components/settings/Overview";

const Dashboard = () => {
  const { currentBudgetId, budgets } = useContext(GlobalContext);
  const currentBudget = budgets.filter(
    (budget) => budget.id === currentBudgetId
  )[0];

  const location = useLocation();
  const subMenu = location.pathname.split("/")[3];
  //console.log(subMenu);
  return (
    <StyledDash>
      <div className="left">
        <Sidebar id={currentBudget.id} />
      </div>
      <div className="main">
        {subMenu === "income" && <Income currentBudget={currentBudget} />}
        {subMenu === "budget" && <Budget currentBudget={currentBudget} />}
        {subMenu === "tracker" && <Tracker currentBudget={currentBudget} />}
        {subMenu === "overview" && <Overview currentBudget={currentBudget} />}
      </div>
      <div className="right"></div>
    </StyledDash>
  );
};

const StyledDash = styled(motion.div)`
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 15vw auto 15vw;
  grid-template-rows: auto;
  grid-template-areas: "left main right";
  grid-column-gap: 2rem;
  .left {
    grid-area: left;
  }
  .main {
    grid-area: main;
  }
  .right {
    grid-area: right;
  }
`;

export default Dashboard;
