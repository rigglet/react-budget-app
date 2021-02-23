//import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//import { GlobalContext } from "../context/GlobalContext";
import { Link, useLocation } from "react-router-dom";
import { GiPayMoney } from "react-icons/gi";
import { FaWallet, FaRegMoneyBillAlt } from "react-icons/fa";
import { BiAbacus } from "react-icons/bi";
//FaChartBar

const Sidebar = ({ id }) => {
  //const { currentBudgetId } = useContext(GlobalContext);
  const location = useLocation();
  const path = location.pathname.split("/")[3];
  //console.log({ path });
  return (
    <StyledSide>
      <ul>
        <li>
          <Link
            to={{
              pathname: `/settings/${id}/income`,
            }}
          >
            <FaRegMoneyBillAlt
              className={path === "income" ? "navIconSelected" : "navIcon"}
            />
            <p className={path === "income" ? "selected" : ""}>Income</p>
          </Link>
          <Line
            transition={{ duration: 0.75 }}
            initial={{ width: "0%" }}
            animate={{ width: path === "income" ? "70%" : "0%" }}
          />
        </li>
        <li>
          <Link
            to={{
              pathname: `/settings/${id}/budget`,
            }}
          >
            <FaWallet
              className={path === "budget" ? "navIconSelected" : "navIcon"}
            />
            <p className={path === "budget" ? "selected" : ""}>Budget</p>
          </Link>
          <Line
            transition={{ duration: 0.75 }}
            initial={{ width: "0%" }}
            animate={{ width: path === "budget" ? "70%" : "0%" }}
          />
        </li>
        <li>
          <Link
            to={{
              pathname: `/settings/${id}/expenditure`,
            }}
          >
            <GiPayMoney
              className={path === "expenditure" ? "navIconSelected" : "navIcon"}
            />
            <p className={path === "expenditure" ? "selected" : ""}>
              Expenditure
            </p>
          </Link>
          <Line
            transition={{ duration: 0.75 }}
            initial={{ width: "0%" }}
            animate={{ width: path === "expenditure" ? "70%" : "0%" }}
          />
        </li>
        <li>
          <Link
            to={{
              pathname: `/settings/${id}/tracker`,
            }}
          >
            <BiAbacus
              className={path === "tracker" ? "navIconSelected" : "navIcon"}
            />
            <p className={path === "tracker" ? "selected" : ""}>Tracker</p>
          </Link>
          <Line
            transition={{ duration: 0.75 }}
            initial={{ width: "0%" }}
            animate={{ width: path === "tracker" ? "70%" : "0%" }}
          />
        </li>
      </ul>
    </StyledSide>
  );
};

const StyledSide = styled(motion.div)`
  width: 15vw;
  border-radius: 4px;
  background-color: #39393c;
  color: #848586;
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 1rem;

  ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    text-decoration: none;
    li {
      margin-right: 1rem;
      text-decoration: none;
      position: relative;
      a {
        display: flex;
        align-items: center;
        color: #848586;
        text-decoration: none;
        font-weight: bolder;
        padding: 0.5rem 0;
        font-size: 12pt;
        font-variant-caps: all-small-caps;
      }

      .selected {
        color: white;
      }
      .navIcon {
        margin-right: 0.5rem;
        color: #848586;
        min-height: 25px;
        min-width: 25px;
      }
      .navIconSelected {
        margin-right: 0.5rem;
        color: white;
        height: 25px;
        width: 25px;
      }
    }
  }
`;

const Line = styled(motion.div)`
  z-index: 99;
  height: 0.15rem;
  //background: #00b4ee;
  background: #e69a07;
  //width: 100%;
  position: absolute;
  bottom: -1%;
`;

export default Sidebar;
