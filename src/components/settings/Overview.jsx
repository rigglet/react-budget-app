//import { useState, useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//number input
//import NumericInput from "react-numeric-input";
//import { BsFileText } from "react-icons/bs";
//import { useHistory } from "react-router-dom";
//context
//import { GlobalContext } from "../../context/GlobalContext";
//import Budget from "../budget/Budget";

const Overview = ({ currentBudget }) => {
  //const { updateBudget } = useContext(GlobalContext);

  return (
    <StyledOverview>
      <h3>Overview</h3>
    </StyledOverview>
  );
};

const StyledOverview = styled(motion.div)`
  h3 {
    color: white;
    margin-bottom: 1rem;
  }
`;

export default Overview;
