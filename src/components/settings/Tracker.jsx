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

const Tracker = ({ currentBudget }) => {
  //const { updateBudget } = useContext(GlobalContext);

  return (
    <StyledTracker>
      <h3>Tracker</h3>
    </StyledTracker>
  );
};

const StyledTracker = styled(motion.div)`
  h3 {
    color: white;
    margin-bottom: 1rem;
  }
`;

export default Tracker;
