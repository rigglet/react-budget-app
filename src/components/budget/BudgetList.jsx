import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Budget from "./Budget";
import { GlobalContext } from "../../context/GlobalContext";

const BudgetList = () => {
  const { budgets } = useContext(GlobalContext);

  return (
    <StyledBudgetList>
      {budgets.map((budget) => (
        <Budget budget={budget} key={budget.id} />
      ))}
    </StyledBudgetList>
  );
};

const StyledBudgetList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default BudgetList;
