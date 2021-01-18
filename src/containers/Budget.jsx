import styled from "styled-components";
import { motion } from "framer-motion";
import BudgetList from "../components/budget/BudgetList";
import AddBudgetForm from "../components/budget/AddBudgetForm";

const Budget = () => {
  return (
    <StyledBudgetContainer>
      <div className="left"></div>
      <div className="main">
        <h2>Budgets</h2>
        <AddBudgetForm />
        <BudgetList />
      </div>
      <div className="right"></div>
    </StyledBudgetContainer>
  );
};

const StyledBudgetContainer = styled(motion.div)`
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
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .right {
    grid-area: right;
  }
  h2 {
    color: white;
    font-weight: 600;
    margin-bottom: 1rem;
  }
`;

export default Budget;
