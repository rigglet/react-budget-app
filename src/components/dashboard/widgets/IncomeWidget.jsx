import styled from "styled-components";
import { motion } from "framer-motion";
import { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import Xarrow, {useXarrow, Xwrapper} from 'react-xarrows';

const IncomeWidget = () => {
  const { currencySymbol } = useContext(GlobalContext);

  const incomingStyle = {
    curveness: Number(0.6),
    strokeWidth: Number(2),
    path: "smooth",
    dashness: { animation: 2 },
    startAnchor: "auto",
    endAnchor: "auto",
    color: "#2ba874",
  };

  const outgoingStyle = {
    curveness: Number(0.6),
    strokeWidth: Number(2),
    path: "smooth",
    dashness: { animation: 2 },
    startAnchor: "auto",
    endAnchor: "auto",
    color: "#e2725d",
  };

  const taxToDeductStyle = {
    ...outgoingStyle,
    startAnchor: "auto",
    endAnchor: { position: "auto", offset: { bottomness: 5 } },
  };

  const niInStyle = {
    ...outgoingStyle,
    startAnchor: { position: "auto", offset: { bottomness: -5 } },
    endAnchor: "auto",
  };

  const incomeTaxInStyle = {
    ...outgoingStyle,
    startAnchor: "auto",
    endAnchor: "auto",
  };

  const taxableInStyle = {
    ...incomingStyle,
    startAnchor: "auto",
    endAnchor: { position: "auto", offset: { bottomness: -5 } },
  };

  const taxableOutStyle = {
    ...incomingStyle,
    startAnchor: { position: "auto", offset: { bottomness: 5 } },
    endAnchor: { position: "auto", offset: { bottomness: -5 } },
  };

  const yearlyNetOutStyle = {
    ...incomingStyle,
    startAnchor: { position: "auto", offset: { bottomness: 5 } },
    endAnchor: "auto",
  };

  const updateXarrow = useXarrow();

  return (
    <StyledIncomeWidget onChange={updateXarrow} onScroll={updateXarrow}>

      <Xarrow start="annualGross" end="taxable" {...taxableInStyle} />
      <Xarrow start="annualGross" end="taxfree" {...incomingStyle} />
      <Xarrow start="taxfree" end="yearlyNet" {...incomingStyle} />
      <Xarrow start="taxable" end="totalDeductions" {...taxToDeductStyle} />
      <Xarrow start="taxable" end="yearlyNet" {...taxableOutStyle} />
      <Xarrow start="totalDeductions" end="incomeTax" {...incomeTaxInStyle} />
      <Xarrow start="totalDeductions" end="ni" {...niInStyle} />
      <Xarrow start="yearlyNet" end="monthlyNet" {...yearlyNetOutStyle} />
      <Xarrow start="monthlyNet" end="weeklyNet" {...incomingStyle} />

      <h4>Income Flowchart</h4>
      <div className="data">
        <div className="feature-number" id="annualGross">
          <h5>Annual (Gross) salary</h5>
          <div className="item">
            <span className="incoming">
              <span className="symbol">{currencySymbol} </span>
            </span>
          </div>
        </div>

        <div className="feature-number" id="taxfree">
          <h5>Tax Free Allowance</h5>
          <div className="item">
            <span className="incoming">
              <span className="symbol">{currencySymbol} </span>
            </span>
          </div>
        </div>

        <div className="feature-number" id="taxable">
          <h5>Taxable</h5>
          <div className="item">
            <span className="incoming">
              <span className="symbol">{currencySymbol} </span>
            </span>
          </div>
        </div>

        <div className="feature-number" id="ni">
          <h5>National Insurance</h5>
          <div className="item">
            <span className="outgoing">
              <span className="symbol">{currencySymbol} </span>
            </span>
          </div>
        </div>
        <div className="feature-number" id="incomeTax">
          <h5>Income Tax</h5>
          <div className="item">
            <span className="outgoing">
              <span className="symbol">{currencySymbol} </span>
            </span>
          </div>
        </div>
        <div className="feature-number" id="totalDeductions">
          <h5>Total Deductions</h5>
          <div className="item">
            <span className="outgoing">
              <span className="symbol">{currencySymbol} </span>
            </span>
          </div>
        </div>

        <div className="feature-number" id="yearlyNet">
          <h5>Annual Salary (Net)</h5>
          <div className="item">
            <span className="incoming">
              <span className="symbol">{currencySymbol} </span>
            </span>
          </div>
        </div>

        <div className="feature-number" id="monthlyNet">
          <h5>Monthly Salary (Net)</h5>
          <div className="item">
            <span className="incoming">
              <span className="symbol">{currencySymbol} </span>
            </span>
          </div>
        </div>

        <div className="feature-number" id="weeklyNet">
          <h5>Weekly Salary (Net)</h5>
          <div className="item">
            <span className="incoming">
              <span className="symbol">{currencySymbol} </span>
            </span>
          </div>
        </div>
      </div>

    </StyledIncomeWidget>
  );
};

const StyledIncomeWidget = styled(motion.div)`
  width: 50%;
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
    grid-row-gap: 2rem;
    #annualGross {
      grid-column: 1 / span 1;
      grid-row: 1 / span 1;
    }
    #taxfree {
      grid-column: 1 / span 1;
      grid-row: 2 / span 1;
    }
    #taxable {
      grid-column: 2 / span 1;
      grid-row: 2 / span 1;
    }
    #ni {
      grid-column: 2 / span 1;
      grid-row: 1 / span 1;
    }
    #incomeTax {
      grid-column: 3 / span 1;
      grid-row: 1 / span 1;
    }
    #totalDeductions {
      grid-column: 3 / span 1;
      grid-row: 2 / span 1;
    }
    #yearlyNet {
      grid-column: 1 / span 1;
      grid-row: 3 / span 1;
    }
    #monthlyNet {
      grid-column: 2 / span 1;
      grid-row: 3 / span 1;
    }
    #weeklyNet {
      grid-column: 3 / span 1;
      grid-row: 3 / span 1;
    }
  }
  .feature-number {
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

export default IncomeWidget;
