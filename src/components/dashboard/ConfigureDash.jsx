import { useContext, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { RiEyeCloseLine, RiEye2Line } from "react-icons/ri";

//context
import { GlobalContext } from "../../context/GlobalContext";
import { updateBudgetLocally } from "../../util";

const ConfigureDash = () => {
  const { budgets, currentBudgetId, updateBudget } = useContext(GlobalContext);
  const currentBudget = budgets.filter(
    (budget) => budget.id === currentBudgetId
  )[0];

  //const widgets = budgets.filter((budget) => budget.id === currentBudgetId)[0].widgets;
  const [widgets, setWidgets] = useState(
    budgets.filter((budget) => budget.id === currentBudgetId)[0].widgets
  );

  //update global context with local data

  const handleSaveConfig = () => {
    //updateWidgets(widgets);
    //updateBudget(newBudget);
    updateBudgetLocally(budgets, currentBudget);
  };

  const handleChangeSetting = (name, index) => {
    setWidgets([
      ...widgets.filter((item) => item.name !== name),
      { name, selected: !widgets[index].selected },
    ]);

    updateBudget({
      ...currentBudget,
      widgets: [
        ...widgets.filter((item) => item.name !== name),
        { name, selected: !widgets[index].selected },
      ],
    });

    //updateBudget(newBudget);
    // console.log({
    //   ...currentBudget,
    //   widgets: [
    //     ...widgets.filter((item) => item.name !== name),
    //     { name, selected: !widgets[index].selected },
    //   ],
    // });
  };

  return (
    <StyledIncome>
      <h4>Configure Dashboard</h4>
      <div className="container">
        <h5>Income widgets</h5>
        <div className="line"></div>
        <h5>Budget widgets</h5>

        {widgets
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map((item, index) => (
            <div className="selection" key={item.name}>
              <p>{item.name} </p>
              <div className="iconSelect">
                {item.selected ? (
                  <RiEye2Line
                    className="icon open"
                    onClick={() => handleChangeSetting(item.name, index)}
                  />
                ) : (
                  <RiEyeCloseLine
                    className="icon"
                    onClick={() => handleChangeSetting(item.name, index)}
                  />
                )}
              </div>
            </div>
          ))}

        <div className="line"></div>
        <button onClick={() => handleSaveConfig()}>SAVE</button>
      </div>
    </StyledIncome>
  );
};

const StyledIncome = styled(motion.div)`
  padding: 1rem;
  border-radius: 4px;
  background-color: #39393c;
  //color: #848586;
  input[type="checkbox"] {
    opacity: 0;
  }
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
  .iconSelect {
    /* display: flex;
    align-items: center;
    justify-content: space-between; */
  }
  .line {
    width: 100%;
    margin: 1rem 0;
    //margin: 0.5rem;
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
  .container {
    //width: 100%;
    //margin-bottom: 1rem;
    //padding: 3rem;
    //border-radius: 4px;
    //background-color: #39393c;
    //color: #848586;
  }
  button {
    //margin-top: 1rem;
  }

  p {
    //color: #848586;
    //color: white;
    padding-bottom: 0.25rem;
    font-size: 12pt;
  }
`;

export default ConfigureDash;
