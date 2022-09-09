import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { BsFileText } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { FaTrashAlt, FaFolderOpen } from "react-icons/fa";
import { calculateFundsTotal, deleteBudgetLocally } from "../../utilities";
//context
import { GlobalContext } from "../../context/GlobalContext";

const Budget = ({ budget }) => {
  let history = useHistory();

  const {
    updateCurrentBudgetId,
    updateCurrentBudget,
    updateBudgetLoaded,
    deleteBudget,
    currentBudgetId,
    budgets,
    updateAllocatedFunds,
  } = useContext(GlobalContext);

  const handleBudgetDelete = () => {
    if (budget.id === currentBudgetId) {
      updateCurrentBudgetId("");
      updateCurrentBudget({});
      updateBudgetLoaded(false);
    }
    deleteBudgetLocally(budgets, budget.id);
    deleteBudget(budget.id);
  };

  const handleBudgetOpen = () => {
    updateCurrentBudgetId(budget.id);
    updateCurrentBudget(budget);
    updateAllocatedFunds(calculateFundsTotal(budget));
    updateBudgetLoaded(true);

    history.push(`/income`);
  };

  // whileHover={{ scale: 1.01 }}
  //       style={{ originX: 0.8 }}
  //       initial={{ opacity: 0, width: 0 }}
  //       animate={{ opacity: 1, width: 800, transition: { duration: 2 } }}
  // const budgetAnim = {
  //   start: { opacity: 0, y: -50 },
  //   end: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  // };

  return (
    <StyledBudget>
      <div className="info">
        <BsFileText className="file icon" />
        <p>{budget.saveName}</p>
        <p>[ {budget.description} ]</p>
      </div>
      <div className="actions">
        <FaTrashAlt onClick={() => handleBudgetDelete()} className="del icon" />
        <FaFolderOpen
          onClick={() => handleBudgetOpen()}
          className="open icon"
        />
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
  /* &:hover {
    background-color: rgba(57, 57, 60, 75%);
  } */
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

  .file {
    color: #00b4ee;
  }
  .open {
    color: #00b4ee;
    &:hover {
      color: rgba(0, 180, 238, 75%);
    }
  }

  p {
    color: white;
    /* padding-left: 1rem; */
    font-size: 10pt;
  }
`;

export default Budget;
