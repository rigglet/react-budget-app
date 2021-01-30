import { useContext, useState } from "react";
//styling
import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { RiEyeCloseLine, RiEye2Line } from "react-icons/ri";

//context
import { GlobalContext } from "../../context/GlobalContext";
import { updateBudgetLocally } from "../../util";

const ConfigureDash = () => {
  const { budgets, currentBudgetId, updateBudget } = useContext(GlobalContext);
  const currentBudget = budgets.filter(
    (budget) => budget.id === currentBudgetId
  )[0];

  const [widgets, setWidgets] = useState(currentBudget.widgets);

  const handleSaveConfig = () => {
    updateBudgetLocally(budgets, currentBudget);
  };

  const handleChangeSetting = (name, index, arr, arrayName) => {
    //console.log(currentBudget);
    console.log({
      ...currentBudget,
      widgets: {
        ...widgets,
        [arrayName]: [
          ...arr.filter((item) => item.name !== name),
          { name, selected: !arr[index].selected },
        ],
      },
    });
    //console.log(index);

    setWidgets({
      ...widgets,
      [arrayName]: [
        ...arr.filter((item) => item.name !== name),
        { name, selected: !arr[index].selected },
      ],
    });
    updateBudget({
      ...currentBudget,
      widgets: {
        ...widgets,
        [arrayName]: [
          ...arr.filter((item) => item.name !== name),
          { name, selected: !arr[index].selected },
        ],
      },
    });
  };

  return (
    <StyledIncome>
      <h4>Configure Dashboard</h4>
      <div className="container">
        <h5>Income widgets</h5>
        <div className="incomeWidgets">
          {widgets.incomeWidgets
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((item, index) => (
              <div className="selection" key={item.name}>
                <p>{item.name} </p>
                <div className="iconSelect">
                  {item.selected ? (
                    <RiEye2Line
                      className="icon open"
                      onClick={() =>
                        handleChangeSetting(
                          item.name,
                          index,
                          widgets.incomeWidgets,
                          "incomeWidgets"
                        )
                      }
                    />
                  ) : (
                    <RiEyeCloseLine
                      className="icon"
                      onClick={() =>
                        handleChangeSetting(
                          item.name,
                          index,
                          widgets.incomeWidgets,
                          "incomeWidgets"
                        )
                      }
                    />
                  )}
                </div>
              </div>
            ))}
        </div>
        <div className="line"></div>
        <h5>Budget widgets</h5>
        <div className="budgetWidgets">
          {widgets.budgetWidgets
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((item, index) => (
              <div className="selection" key={item.name}>
                <p>{item.name} </p>
                <div className="iconSelect">
                  {item.selected ? (
                    <RiEye2Line
                      className="icon open"
                      onClick={() =>
                        handleChangeSetting(
                          item.name,
                          index,
                          widgets.budgetWidgets,
                          "budgetWidgets"
                        )
                      }
                    />
                  ) : (
                    <RiEyeCloseLine
                      className="icon"
                      onClick={() =>
                        handleChangeSetting(
                          item.name,
                          index,
                          widgets.budgetWidgets,
                          "budgetWidgets"
                        )
                      }
                    />
                  )}
                </div>
              </div>
            ))}
        </div>

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

export default ConfigureDash;
