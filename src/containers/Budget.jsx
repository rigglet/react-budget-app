import styled from "styled-components";
import { motion } from "framer-motion";
//import { Link } from "react-router-dom";

const Budget = () => {
  return (
    <StyledBudget>
      <div className="left"></div>
      <div className="main">
        <h1>Budgets</h1>
      </div>
      <div className="right"></div>
    </StyledBudget>
  );
};

const StyledBudget = styled(motion.div)`
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
    grid-area: main;
  }
  .right {
    grid-area: right;
  }
`;

// const StyledLink = styled(Link)`
//   text-decoration: none;
//   h4 {
//     color: #848586;
//     font-weight: 400;
//     padding: 1rem;
//   }
// `;

export default Budget;
