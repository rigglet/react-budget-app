import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { BsFileText } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { deleteBudgetLocally } from "../../util";
//context
import { GlobalContext } from "../../context/GlobalContext";

const Budget = ({ budget }) => {
  const { budgets } = useContext(GlobalContext);
  let history = useHistory();

  const {
    updateCurrentBudgetId,
    updateBudgetLoaded,
    deleteBudget,
    currentBudgetId,
  } = useContext(GlobalContext);

  const handleBudgetDelete = () => {
    if (budget.id === currentBudgetId) {
      updateCurrentBudgetId("");
      updateBudgetLoaded(false);
    }
    deleteBudgetLocally(budgets, budget.id);
    deleteBudget(budget.id);
  };

  const handleBudgetOpen = () => {
    updateCurrentBudgetId(budget.id);
    updateBudgetLoaded(true);
    history.push(`/settings/${budget.id}/income`);
  };

  return (
    <StyledBudget>
      <div className="info">
        <BsFileText className="navIcon" />
        <p>{budget.saveName}</p>
        <p>[ {budget.description} ]</p>
      </div>
      <div className="actions">
        <FaTrashAlt onClick={() => handleBudgetDelete()} className="delIcon" />
        <button onClick={() => handleBudgetOpen()}>OPEN</button>
      </div>
    </StyledBudget>
  );
};

const StyledBudget = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 1rem 1.5rem;
  width: 100%;
  //height: 8vh;
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

  .info,
  .actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .navIcon {
    color: #00b4ee;
    height: 30px;
    width: 30px;
  }
  .delIcon {
    color: #b87272;
    height: 20px;
    width: 20px;
    cursor: pointer;
  }
  p {
    color: white;
    /* padding-left: 1rem; */
    font-size: 10pt;
  }
`;

export default Budget;
