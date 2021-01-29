import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { GlobalContext } from "../context/GlobalContext";
import { useLocation } from "react-router-dom";
import Allocated from "../components/dashboard/Allocated";
import BudgetBreakdown from "../components/dashboard/BudgetBreakdown";
import ConfigureDash from "../components/dashboard/ConfigureDash";
import Salary from "../components/dashboard/Salary";
import DashSidebar from "../components/DashSidebar";

const Dashboard = () => {
  const location = useLocation();
  const subMenu = location.pathname.split("/")[3];

  const { budgets, currentBudgetId } = useContext(GlobalContext);

  const widgets = budgets.filter((budget) => budget.id === currentBudgetId)[0]
    .widgets;
  //console.log(widgets);
  return (
    <StyledDashboard>
      <div className="left">
        <DashSidebar />
      </div>
      <div className="main">
        {subMenu === "view" && (
          <>
            <h3>Dashboard</h3>
            <div className="widgets">
              {widgets
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((item) => (item.selected ? item.widget : ""))}
              {/* <Salary />
              <Allocated />
              <BudgetBreakdown /> */}
            </div>
          </>
        )}
        {subMenu === "settings" && (
          <>
            <h3>Settings</h3>
            <div className="widgets">
              <ConfigureDash />
            </div>
          </>
        )}
      </div>
      <div className="right"></div>
    </StyledDashboard>
  );
};

const StyledDashboard = styled(motion.div)`
  padding: 1.5rem;
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
