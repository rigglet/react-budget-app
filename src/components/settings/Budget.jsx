//import { useState, useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//number input
//import NumericInput from "react-numeric-input";
//import { BsFileText } from "react-icons/bs";
//import { useHistory } from "react-router-dom";
//context
//import { GlobalContext } from "../../context/GlobalContext";
import Allocated from "../dashboard/Allocated";
import BudgetList from "./BudgetList";
import AddBudgetItemForm from "./AddBudgetItemForm";
import BudgetBreakdown from "../dashboard/BudgetBreakdown";
import Salary from "../dashboard/Salary";

const Budget = ({ currentBudget }) => {
  //const { updateBudget } = useContext(GlobalContext);

  // const [formIncome, setFormIncome] = useState({
  //   ...currentBudget.data.income,
  // });

  // const handleSaveBudget = () => {
  //   updateBudget({
  //     ...currentBudget,
  //     data: { income: { ...formIncome } },
  //   });
  // };

  return (
    <StyledBudget>
      <h3>Budget</h3>
      <div className="charts">
        {/* <BudgetBreakdown /> */}
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
