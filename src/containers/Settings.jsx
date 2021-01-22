import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import { GlobalContext } from "../context/GlobalContext";
import { useLocation } from "react-router-dom";
import Income from "../components/settings/Income";

const Dashboard = () => {
  const { currentBudget } = useContext(GlobalContext);

  const location = useLocation();
  const subMenu = location.pathname.split("/")[3];
  //console.log(currentBudget.data.income);
  return (
    <StyledDash>
      <div className="left">
        <Sidebar id={currentBudget.id} />
      </div>
      <div className="main">
        <Income currentBudget={currentBudget} />
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
