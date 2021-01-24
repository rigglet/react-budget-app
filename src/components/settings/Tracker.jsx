import { useState, useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//number input
//import NumericInput from "react-numeric-input";
//import { BsFileText } from "react-icons/bs";
//import { useHistory } from "react-router-dom";
//context
import { GlobalContext } from "../../context/GlobalContext";
//import Budget from "../budget/Budget";

const Tracker = ({ currentBudget }) => {
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
      <h1>Tracker</h1>
    </StyledIncome>
  );
};

const StyledIncome = styled(motion.div)``;

export default Tracker;
