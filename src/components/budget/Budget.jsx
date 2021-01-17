import styled from "styled-components";
import { motion } from "framer-motion";
import { BsFileText } from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";

const Budget = ({ budget }) => {
  let history = useHistory();
  const handleBudgetOpen = (id) => {
    //<Link to={`/budgets/${id}`} />;
    //console.log(`/budgets/${id}`);
    history.push(`/dashboard/${id}`);
  };

  return (
    <StyledBudget>
      <div className="info">
        <BsFileText className="navIcon" />
        <p>{budget.saveName}</p>
        <p>[ {budget.description} ]</p>
      </div>
      <button onClick={() => handleBudgetOpen(budget.id)}>OPEN</button>
    </StyledBudget>
  );
};

const StyledBudget = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 1.5rem;
  width: 100%;
  height: 8vh;
  border-radius: 4px;
  background-color: #39393c;
  border-left: transparent 0.25rem solid;
  color: #848586;
  &:hover,
  &:active {
    border-left: #00b4ee 0.25rem solid;
  }
  button {
    cursor: pointer;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    border: none;
    background-color: #00b4ee;
    transition: all 0.3s ease;
    outline-style: none;
    &:active {
      transform: translateY(1px);
      transition: none;
    }
    &:hover,
    &:active {
      box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.3);
      background: rgb(0, 180, 238, 0.5);
    }
  }
  .info {
    display: flex;
    align-items: center;
  }
  .navIcon {
    color: #00b4ee;
    height: 30px;
    width: 30px;
  }
  p {
    color: white;
    padding-left: 1rem;
    font-size: 10pt;
  }
`;

export default Budget;
