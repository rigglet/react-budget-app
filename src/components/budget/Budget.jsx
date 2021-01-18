import styled from "styled-components";
import { motion } from "framer-motion";
import { BsFileText } from "react-icons/bs";
import { useHistory } from "react-router-dom";

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
  border-right: transparent 0.25rem solid;
  color: #848586;
  &:hover,
  &:active {
    border-left: #00b4ee 0.25rem solid;
    //background-color: rgba(57, 57, 60, 0.6);
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
