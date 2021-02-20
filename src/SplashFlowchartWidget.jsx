import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { GlobalContext } from "./context/GlobalContext";
//react router
import { Link, useLocation } from "react-router-dom";
//arrows
import Xarrow from "react-xarrows";
//icons
import { FaCheckSquare, FaTimesCircle } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { IoFileTrayStackedSharp } from "react-icons/io5";
import { VscSettings } from "react-icons/vsc";
import { RiDashboard3Fill } from "react-icons/ri";
import { BsFileSpreadsheet } from "react-icons/bs";
import { GiPayMoney } from "react-icons/gi";
import { FaWallet, FaRegMoneyBillAlt } from "react-icons/fa";
import { BiAbacus } from "react-icons/bi";

const SplashFlowchartWidget = () => {
  const { budgets, isBudgetLoaded, currentBudget } = useContext(GlobalContext);

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
      <Xarrow start="budgets" end="open" {...taxToDeductStyle} />
      <Xarrow start="open" end="config" {...taxToDeductStyle} />
      <Xarrow start="config" end="income" {...taxToDeductStyle} />
      <Xarrow start="income" end="budget" {...taxToDeductStyle} />
      <Xarrow start="budget" end="expenses" {...taxToDeductStyle} />
      <Xarrow start="expenses" end="tracker" {...taxToDeductStyle} />
      <Xarrow start="open" end="dashboard" {...taxToDeductStyle} />

      <h4>Budget status flowchart</h4>
      <p className="instruction">
        Click element to jump to settings. Click <AiFillHome /> Home to return
        here.
      </p>
      <div className="data">
        <div className="featureNumber" id="budgets">
          <div className="location">
            <IoFileTrayStackedSharp className="icon" />
            <Link to={{ pathname: `/budgets` }}>
              <h5>Budgets</h5>
            </Link>
          </div>
          <p>
            {budgets.length > 0 ? (
              <FaCheckSquare className="check" />
            ) : (
              <FaTimesCircle className="cross" />
            )}
          </p>
        </div>

        <div className="featureNumber" id="open">
          <div className="location">
            <BsFileSpreadsheet className="icon" />
            <Link to={{ pathname: `/budgets` }}>
              <h5>Open budget...</h5>
            </Link>
          </div>
          <p>
            {isBudgetLoaded ? (
              <FaCheckSquare className="check" />
            ) : (
              <FaTimesCircle className="cross" />
            )}
          </p>
        </div>

        <div className="featureNumber" id="config">
          <div className="location">
            <VscSettings className="icon" />
            <Link to={{ pathname: `/settings/${currentBudget.id}/income` }}>
              <h5>Configuration</h5>
            </Link>
          </div>
          <p>
            {isBudgetLoaded ? (
              <FaCheckSquare className="check" />
            ) : (
              <FaTimesCircle className="cross" />
            )}
          </p>
        </div>

        <div className="featureNumber" id="income">
          <div className="location">
            <FaRegMoneyBillAlt className="icon" />
            <Link to={{ pathname: `/settings/${currentBudget.id}/income` }}>
              <h5>Income</h5>
            </Link>
          </div>
          <p>
            {isBudgetLoaded ? (
              <FaCheckSquare className="check" />
            ) : (
              <FaTimesCircle className="cross" />
            )}
          </p>
        </div>

        <div className="featureNumber" id="budget">
          <div className="location">
            <FaWallet className="icon" />
            <Link to={{ pathname: `/settings/${currentBudget.id}/budget` }}>
              <h5>Budget</h5>
            </Link>
          </div>
          <p>
            {isBudgetLoaded ? (
              <FaCheckSquare className="check" />
            ) : (
              <FaTimesCircle className="cross" />
            )}
          </p>
        </div>

        <div className="featureNumber" id="expenses">
          <div className="location">
            <GiPayMoney className="icon" />
            <Link
              to={{ pathname: `/settings/${currentBudget.id}/expenditure` }}
            >
              <h5>Expenses</h5>
            </Link>
          </div>
          <p>
            {isBudgetLoaded ? (
              <FaCheckSquare className="check" />
            ) : (
              <FaTimesCircle className="cross" />
            )}
          </p>
        </div>

        <div className="featureNumber" id="tracker">
          <div className="location">
            <BiAbacus className="icon" />
            <Link to={{ pathname: `/settings/${currentBudget.id}/tracker` }}>
              <h5>Tracker</h5>
            </Link>
          </div>
          <p>
            {isBudgetLoaded ? (
              <FaCheckSquare className="check" />
            ) : (
              <FaTimesCircle className="cross" />
            )}
          </p>
        </div>

        <div className="featureNumber" id="dashboard">
          <div className="location">
            <RiDashboard3Fill className="icon" />
            <Link to={{ pathname: `/dashboard/${currentBudget.id}/settings` }}>
              <h5>Dashboard s / v </h5>
            </Link>
          </div>
          <p>
            {isBudgetLoaded ? (
              <FaCheckSquare className="check" />
            ) : (
              <FaTimesCircle className="cross" />
            )}
          </p>
        </div>
      </div>
      <div className="key">
        <div className="item">
          <FaCheckSquare className="check" />
          <h5>Has minimum required data / configuration</h5>
        </div>
        <div className="item">
          <FaTimesCircle className="cross" />

          <h5>Needs data / configuration</h5>
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
  .instruction {
    color: white;
    font-weight: 400;
    font-size: 10pt;
    margin-bottom: 1rem;
  }
  .icon,
  .check,
  .cross {
    width: 20px;
    height: 20px;
  }
  .icon {
    width: 30px;
    height: 30px;
  }
  .check {
    color: #00b4ee;
  }
  .cross {
    //color: red;
  }
  /* .incoming {
    color: #2ba874;
  }
  .outgoing {
    color: #e2725d;
  } */
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
    #open {
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
  .key {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    //justify-content: space-between;
    .item {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      justify-content: space-between;
    }
  }
  .featureNumber {
    display: flex;
    //flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: #303030;
    padding: 0.5rem;
    border-radius: 4px;
    min-width: 40%;
    font-weight: 700;
    .location {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      .icon {
      }
      a {
        color: #848586;
        text-decoration: none;
        font-weight: bolder;
        margin-right: 1rem;
      }
      h5 {
        margin-bottom: 0.25rem;
        &:hover {
          color: white;
        }
      }
    }
  }
  /* .spent {
    color: #e69a07;
  } */
`;

export default SplashFlowchartWidget;
