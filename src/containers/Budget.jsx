import styled from "styled-components";
import { motion } from "framer-motion";
import AddBudgetForm from "../components/budget/AddBudgetForm";
import BudgetList from "../components/budget/BudgetList";

const Budget = () => {
  return (
    <StyledBudgetContainer>
      <div className="left"></div>
      <div className="main">
        <h3>Budgets</h3>
        <AddBudgetForm />
        <BudgetList />
      </div>
      <div className="right"></div>
    </StyledBudgetContainer>
  );
};

const StyledBudgetContainer = styled(motion.div)`
  margin: 1rem;
  width: 100vw;
  background-color: #1f2023;
  color: #848586;
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
    display: flex;
    flex-direction: column;

    //align-items: center;

    h3 {
      margin-bottom: 1rem;
      color: white;
    }
  }
  .right {
    grid-area: right;
  }
`;

export default Budget;
