import styled from "styled-components";
import { motion } from "framer-motion";
//message components
import "react-toastify/dist/ReactToastify.css";
import IncomeWidget from "../dashboard/widgets/IncomeWidget";
import IncomeForm from "../settings/IncomeForm";

const Income = () => {
  return (
    <StyledIncome>
      <h3>Income</h3>
      <div className="widgets">
        <IncomeWidget />
        <IncomeForm />
      </div>
    </StyledIncome>
  );
};

const StyledIncome = styled(motion.div)`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  /* border: 1px solid yellow; */
  align-items: center;
  justify-content: center;
  row-gap: 1rem;
  
  h3{
    align-self: flex-start;
    padding-left: 15vw;
  }
  .widgets {
    width: 70vw;
    /* height: 100%; */
    /* border: 1px solid red; */
    display: flex;
    gap: 2rem;
    /* flex-direction: column;  */
    /* column-gap: 1rem; */
  }
  `;

export default Income;
