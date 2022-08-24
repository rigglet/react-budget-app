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
        {/* <IncomeWidget /> */}
        {/* <IncomeForm /> */}
      </div>
    </StyledIncome>
  );
};

const StyledIncome = styled(motion.div)`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  .widgets {
    display: flex;
    //flex-direction: column;
    column-gap: 1rem;
  }
`;

export default Income;
