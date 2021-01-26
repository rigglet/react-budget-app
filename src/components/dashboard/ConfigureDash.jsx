import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//number input
//import NumericInput from "react-numeric-input";
//import { BsFileText } from "react-icons/bs";
//RiEyeCloseLine
//RiEye2Line
//import { useHistory } from "react-router-dom";
//context
import { GlobalContext } from "../../context/GlobalContext";
//import Budget from "../budget/Budget";

const ConfigureDash = () => {
  //const { updateDashboardConfig } = useContext(GlobalContext);

  // const [formIncome, setFormIncome] = useState({
  //   ...currentBudget.data.income,
  // });

  const handleSaveConfig = (e) => {
    // setFormIncome(() => ({
    //   [e.target.name]: Number(e.target.value),
    // }));
  };

  return (
    <StyledIncome>
      <h4>Configure Dashboard</h4>
      <div className="container">
        <h5>Income widgets</h5>
        <div className="line"></div>
        <h5>Budget widgets</h5>
        <p>Budget breakdown by category in currency </p>
        <p>Budget breakdown by item in currency </p>
        <p>Budget breakdown by category in % </p>
        <p>Budget breakdown by item in % </p>
        <p>Budget items extrapolated over d/w/m/y </p>
        <div className="line"></div>
        <button onClick={() => handleSaveConfig()}>SAVE</button>
      </div>
    </StyledIncome>
  );
};

const StyledIncome = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 4px;
  background-color: #39393c;
  color: #848586;
  h4 {
    color: white;
    font-weight: 500;
    margin-bottom: 1rem;
  }
  h3 {
    //margin-bottom: 1rem;
    //color: white;
  }
  .container {
    width: 100%;
    margin-bottom: 1rem;
    padding: 3rem;
    border-radius: 4px;
    background-color: #39393c;
    color: #848586;
    .line {
      width: 100%;
      margin: 0.5rem;
      background-color: #848586;
      height: 1px;
    }
    h4 {
      color: white;
      font-weight: 500;
      margin-bottom: 1rem;
    }
  }
  button {
    margin-top: 1rem;
  }

  p {
    color: #848586;
    //color: white;
    //padding-left: 1rem;
    //font-size: 10pt;
  }
`;

export default ConfigureDash;
