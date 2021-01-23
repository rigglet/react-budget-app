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
    //console.log(`${budget.id} ${currentBudgetId}`)
    //budget.id === currentBudgetId
  )[0];
  //console.log(currentBudget);

  const location = useLocation();
  const subMenu = location.pathname.split("/")[3];
  console.log(subMenu);
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
  //padding-left: 15vw;
  width: 100vw;
  height: 80vh;
  background-color: #1f2023;
  color: #848586;
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
  /* align-items: left; */
`;

// const StyledLink = styled(Link)`
//   text-decoration: none;
//   h4 {
//     color: #848586;
//     font-weight: 400;
//     padding: 1rem;
//   }
// `;

export default Dashboard;
