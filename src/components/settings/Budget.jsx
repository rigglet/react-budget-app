import { useState, useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//number input
//import NumericInput from "react-numeric-input";
//import { BsFileText } from "react-icons/bs";
//import { useHistory } from "react-router-dom";
//context
import { GlobalContext } from "../../context/GlobalContext";
import Allocated from "./Allocated";
import BudgetList from "./BudgetList";
//import Budget from "../budget/Budget";

const Budget = ({ currentBudget }) => {
  const { updateBudget } = useContext(GlobalContext);

  const [formIncome, setFormIncome] = useState({
    ...currentBudget.data.income,
  });

  const handleSaveBudget = () => {
    updateBudget({
      ...currentBudget,
      data: { income: { ...formIncome } },
    });
    // console.log({
    //   ...currentBudget,
    //   data: { income: { ...formIncome } },
    // });
  };

  const handleChange = (e) => {
    setFormIncome(() => ({
      ...formIncome,
      [e.target.name]: Number(e.target.value),
    }));
  };

  //let totalDeductions = (formIncome.ni + formIncome.tax).toFixed(2);
  let taxable = (formIncome.annual - formIncome.allowance).toFixed(2);

  //let yearlyNet = (formIncome.annual - totalDeductions).toFixed(2);
  let monthlyNet = (formIncome.yearlyNet / 12).toFixed(2);
  let weeklyNet = (formIncome.yearlyNet / 52).toFixed(2);

  return (
    <StyledIncome>
      <h1>Budget</h1>
      <Allocated />
      <BudgetList />
      <button onClick={() => handleSaveBudget()}>SAVE</button>
    </StyledIncome>
  );
};

const StyledIncome = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 3rem;
  width: 100%;
  border-radius: 4px;
  background-color: #39393c;
  color: #848586;
  .line {
    width: 100%;
    margin: 0.5rem;
    background-color: #848586;
    height: 1px;
  }
  h1 {
    margin-bottom: 1rem;
    color: white;
  }
  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    .row {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0rem;
    }
    label {
      margin-right: 1rem;
    }
    input {
      padding: 0.25rem;
      font-size: 1rem;
      outline: solid #848586 2px;
      background-color: #39393c;
      border-radius: 4px;
      border: transparent solid 2px;
      color: #848586;
      &:hover,
      &:active {
        outline: #00b4ee solid 2px;
        color: white;
      }
    }
  }
  button {
    margin-top: 1rem;
  }

  p {
    color: white;
    padding-left: 1rem;
    font-size: 10pt;
  }
`;

export default Budget;
