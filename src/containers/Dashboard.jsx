import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import { GlobalContext } from "../context/GlobalContext";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const { isBudgetLoaded, currentBudget } = useContext(GlobalContext);

  console.log(`isBL: ${isBudgetLoaded}`);
  const location = useLocation();
  console.log(`location: ${location.pathname}`);
  console.log(`current budget: ${currentBudget.saveName}`);

  // useEffect(() => {
  //   { currentBudget } = useContext(GlobalContext);
  // }, []);

  return (
    <StyledDash>
      <div className="left">
        <Sidebar id={currentBudget.id} />
      </div>
      <div className="main">
        <h1>Dashboard</h1>
        <p>{currentBudget.saveName}</p>
        <p>{currentBudget.saveDate}</p>
        <p>{currentBudget.description}</p>
        {/* {currentBudget.data.budgetItems.map((item) => (
          <div key={item.id}>
            <p>{item.item}</p>
            <p>{item.category}</p>
            <p>{item.frequency}</p>
            <p>{item.amount}</p>
          </div>
        ))} */}
        {/* <p>{currentBudget.data.income.map((income) => income)}</p> */}
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
