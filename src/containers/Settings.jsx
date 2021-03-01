import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import { GlobalContext } from "../context/GlobalContext";
import { useLocation } from "react-router-dom";
import Income from "../components/settings/Income";
import Budget from "../components/settings/Budget";
import Expenditure from "../components/settings/Expenditure";

const Dashboard = () => {
  const { currentBudget } = useContext(GlobalContext);
  //const budgets = currentBudget.data.budgets;
  const location = useLocation();
  const subMenu = location.pathname.split("/")[3];

  return (
    <StyledDash>
      <div className="left">
        <Sidebar id={currentBudget.id} />
      </div>
      <div className="main">
        {subMenu === "income" && <Income />}
        {subMenu === "budget" && <Budget />}
        {subMenu === "expenditure" && <Expenditure />}
      </div>
      <div className="right"></div>
    </StyledDash>
  );
};

const StyledDash = styled(motion.div)`
  margin: 1rem;
  display: grid;
  grid-template-columns: 15vw auto 10vw;
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
