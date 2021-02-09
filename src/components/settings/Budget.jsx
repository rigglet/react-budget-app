import styled from "styled-components";
import { motion } from "framer-motion";
import Allocated from "../dashboard/widgets/AllocatedWidget";
import BudgetList from "./BudgetList";
import AddBudgetItemForm from "./AddBudgetItemForm";
import Salary from "../dashboard/widgets/SalaryWidget";

const Budget = () => {
  return (
    <StyledBudget>
      <h3>Budget</h3>
      <div className="charts">
        <Salary />
        <Allocated />
      </div>
      <AddBudgetItemForm />
      <BudgetList />
    </StyledBudget>
  );
};

const StyledBudget = styled(motion.div)`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  .charts {
    display: flex;
    row-gap: 1rem;
    column-gap: 1rem;
  }
  h3 {
    //margin-bottom: 1rem;
    color: white;
  }
`;

export default Budget;
