import { useContext, useState } from "react";
//styling
import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { RiEyeCloseLine, RiEye2Line } from "react-icons/ri";
//context
import { GlobalContext } from "../../context/GlobalContext";
import { updateBudgetLocally } from "../../util";

const ApplicationSettings = () => {
  const {
    budgets,
    currentBudget,
    updateBudget,
    updateCurrentBudget,
    currencySymbol,
  } = useContext(GlobalContext);
  const [widgets, setWidgets] = useState(currentBudget.widgets);

  const handleSaveConfig = () => {
    updateBudgetLocally(budgets, currentBudget);
  };

  const handleChangeSetting = (name, index, arr, arrayName) => {
    // setWidgets({
    //   ...widgets,
    //   [arrayName]: [
    //     ...arr.filter((item) => item.name !== name),
    //     { name, selected: !arr[index].selected },
    //   ],
    // });
    // //update current budget
    // updateCurrentBudget({
    //   ...currentBudget,
    //   widgets: {
    //     ...widgets,
    //     [arrayName]: [
    //       ...arr.filter((item) => item.name !== name),
    //       { name, selected: !arr[index].selected },
    //     ],
    //   },
    // });
    // //update global context
    // updateBudget({
    //   ...currentBudget,
    //   widgets: {
    //     ...widgets,
    //     [arrayName]: [
    //       ...arr.filter((item) => item.name !== name),
    //       { name, selected: !arr[index].selected },
    //     ],
    //   },
    // });
  };

  return (
    <StyledApplicationSettings>
      <h4>Configure Application Settings</h4>
      <div className="container">
        <h5>Displayed Currency</h5>
        <div className="currency">
          <div className="selection">
            <p>Currency name</p>
            <p>GBP</p>
          </div>
          <div className="selection">
            <p>Currency Symbol</p>
            <p>{currencySymbol}</p>
          </div>
        </div>
        <div className="line"></div>
        <h5>Start of year</h5>
        <div className="SOY">
          <div className="selection">
            <p>Calendar</p>
            <p>01/01</p>
          </div>
          <div className="selection">
            <p>Financial</p>
            <p>01/04</p>
          </div>
        </div>
        <div className="line"></div>
        <h5>Pay day</h5>
        <div className="payday">
          <div className="selection">
            <p>Frequency</p>
            <p>Monthly</p>
          </div>
          <div className="selection">
            <p>Date</p>
            <p>01/04</p>
          </div>
        </div>
        <div className="line"></div>

        <button className="button" onClick={() => handleSaveConfig()}>
          SAVE
        </button>
      </div>
    </StyledApplicationSettings>
  );
};

const StyledApplicationSettings = styled(motion.div)`
  width: 50%;
  padding: 1rem;
  border-radius: 4px;
  background-color: #39393c;
  //color: #848586;
  h4 {
    color: white;
    font-weight: 500;
    margin-bottom: 1rem;
  }
  .selection {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5rem;
  }
  .line {
    width: 100%;
    margin: 1rem 0;
    background-color: #848586;
    height: 1px;
  }
  .icon {
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
  .open {
    color: white;
  }
  h5 {
    margin-bottom: 0.5rem;
  }
  p {
    padding-bottom: 0.25rem;
    font-size: 12pt;
  }
`;

export default ApplicationSettings;
