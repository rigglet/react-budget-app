import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Xarrow from "react-xarrows";
import { GlobalContext } from "./context/GlobalContext";

const SplashFlowchartWidget = () => {
  const { currencySymbol } = useContext(GlobalContext);

  const arrowStyle = {
    curveness: Number(0.6),
    strokeWidth: Number(2),
    dashness: false,
    path: "smooth",
    startAnchor: "auto",
    endAnchor: "auto",
    color: "#e69a07",
  };

  const taxToDeductStyle = {
    ...arrowStyle,
    startAnchor: "auto",
    endAnchor: { position: "auto", offset: { bottomness: 0 } },
  };

  return (
    <StyledIncomeWidget>
      <Xarrow start="budgets" end="new" {...taxToDeductStyle} />
      <Xarrow start="new" end="config" {...taxToDeductStyle} />
      <Xarrow start="config" end="income" {...taxToDeductStyle} />
      <Xarrow start="income" end="budget" {...taxToDeductStyle} />
      <Xarrow start="budget" end="expenses" {...taxToDeductStyle} />
      <Xarrow start="expenses" end="tracker" {...taxToDeductStyle} />
      <Xarrow start="new" end="dashboard" {...taxToDeductStyle} />

      <h4>BudgetApp Flowchart</h4>
      <div className="data">
        <div className="featureNumber" id="budgets">
          <h5>Budgets</h5>
        </div>

        <div className="featureNumber" id="new">
          <h5>New budget...</h5>
        </div>

        <div className="featureNumber" id="income">
          <h5>Income</h5>
        </div>

        <div className="featureNumber" id="config">
          <h5>Configuration</h5>
        </div>

        <div className="featureNumber" id="budget">
          <h5>Budget</h5>
        </div>

        <div className="featureNumber" id="dashboard">
          <h5>Dashboard</h5>
        </div>

        <div className="featureNumber" id="tracker">
          <h5>Tracker</h5>
        </div>

        <div className="featureNumber" id="expenses">
          <h5>Expenses</h5>
        </div>
      </div>
    </StyledIncomeWidget>
  );
};

const StyledIncomeWidget = styled(motion.div)`
  width: 100%;
  background-color: #39393c;
  color: #848586;
  border-radius: 4px;
  padding: 1rem;
  h4 {
    color: white;
    font-weight: 500;
    margin-bottom: 1rem;
  }
  .incoming {
    color: #2ba874;
  }
  .outgoing {
    color: #e2725d;
  }
  .data {
    width: 100%;
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto;
    grid-column-gap: 4rem;
    grid-row-gap: 4rem;
    #budgets {
      grid-column: 1 / span 1;
      grid-row: 1 / span 1;
    }
    #new {
      grid-column: 1 / span 1;
      grid-row: 2 / span 1;
    }
    #income {
      grid-column: 2 / span 1;
      grid-row: 2 / span 1;
    }
    #config {
      grid-column: 2 / span 1;
      grid-row: 1 / span 1;
    }

    #budget {
      grid-column: 3 / span 1;
      grid-row: 2 / span 1;
    }
    #dashboard {
      grid-column: 1 / span 1;
      grid-row: 3 / span 1;
    }
    #tracker {
      grid-column: 2 / span 1;
      grid-row: 3 / span 1;
    }
    #expenses {
      grid-column: 3 / span 1;
      grid-row: 3 / span 1;
    }
  }
  .featureNumber {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #303030;
    padding: 0.25rem;
    border-radius: 4px;
    min-width: 40%;
    font-weight: 700;
    h5 {
      margin-bottom: 0.25rem;
    }
  }
  /* .spent {
    color: #e69a07;
  } */
`;

export default SplashFlowchartWidget;
