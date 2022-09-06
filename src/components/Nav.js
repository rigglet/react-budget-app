//react
import { useContext } from "react";

//global context
import { GlobalContext } from "../context/GlobalContext";

//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

//icons
import { FcCalculator } from "react-icons/fc";
import { FaRegMoneyBillAlt, FaHome } from "react-icons/fa";
import { BsFileSpreadsheet } from "react-icons/bs";
import { BiAbacus } from "react-icons/bi";
import { ImExit } from "react-icons/im";

//react router
import { Link, useLocation, useHistory } from "react-router-dom";

const Nav = () => {

  const {isBudgetLoaded, currentBudget, updateBudgetLoaded, updateCurrentBudget, updateCurrentBudgetId} = useContext(GlobalContext);
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const history = useHistory();

  const handleBudgetClose = () => {
    updateCurrentBudgetId(null);
    updateCurrentBudget({});
    updateBudgetLoaded(false);
    history.push(`/home`);
  }

  return (
    
    <StyledNav>      
      <div className="header-info">
        <div className="brand">
          <FcCalculator className="logo" />
          <Link to="/">
            <h4>BudgetApp</h4>
          </Link>
        </div>

        <ul>
          <li>
            <Link
              to={{
                pathname: `/home`,
              }}
            >
              <FaHome
                className={path === "home" || path === "" ? "navIconSelected" : "navIcon"}
              />
              <p className={path === "home" || path === "" ? "selected" : ""}>Home</p>
            </Link>
            <Line
              transition={{ duration: 0.75 }}
              initial={{ width: "0%" }}
              animate={{ width: path === "home" || path === "" ? "90%" : "0%" }}
            />
          </li>
          {isBudgetLoaded && (
            <li className="exit" onClick={() => handleBudgetClose()}>
              <ImExit className="icon"/>
              <p>{currentBudget.saveName}</p>
            </li>
            
          )}
        </ul>
       
        <ul>
          {isBudgetLoaded && (
            <>
            <li>
            <Link
              to={{
                pathname: `/income`,
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
              animate={{ width: path === "income" ? "90%" : "0%" }}
            />
          </li>
          <li>
            <Link
              to={{
                pathname: `/budget`,
              }}
            >
              <BsFileSpreadsheet
                className={path === "budget" ? "navIconSelected" : "navIcon"}
              />
              <p className={path === "budget" ? "selected" : ""}>Budget</p>
            </Link>
            <Line
              transition={{ duration: 0.75 }}
              initial={{ width: "0%" }}
              animate={{ width: path === "budget" ? "90%" : "0%" }}
            />
          </li>
          <li>
            <Link
              to={{
                pathname: `/summary`,
              }}
            >
              <BiAbacus
                className={path === "summary" ? "navIconSelected" : "navIcon"}
              />
              <p className={path === "summary" ? "selected" : ""}>Summary</p>
            </Link>
            <Line
              transition={{ duration: 0.75 }}
              initial={{ width: "0%" }}
              animate={{ width: path === "summary" ? "90%" : "0%" }}
            />
          </li>
        </>
          )}
        </ul>
      </div>
    </StyledNav>
  );
};

const StyledNav = styled(motion.div)`
  min-height: 10vh;
  width: 100vw;
  background-color: #1f2023;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12vw;
  flex-wrap: wrap;
  
  //app name and icon (far left)
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    .logo {
      width: 5vw;
      height: 5vh;
    }
    a {
      text-decoration: none;
      h4 {
        font-family: "Comfortaa", cursive;
        font-weight: bold;
        font-size: 1.5rem;
        color: white;
      }
    }
  }
  //needed to separate links from budget name
  .header-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  //links (middle)
  ul {
    //flex-wrap: wrap;
    display: flex;
    align-items: center;
    list-style: none;
    text-decoration: none;
    flex-grow: 1;
    .exit {
      display: flex;
      align-items: center;
      justify-content: center;
      p{
        color: #00b4ee;
        margin-left: 0.5rem;
        cursor: pointer;
        font-weight: normal;
        font-size: 12pt;
      }
    }
    li {
      margin-left: 2rem;
      text-decoration: none;
      position: relative;
      a {
        color: #848586;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        font-weight: bolder;
        margin-right: 1rem;
        font-variant-caps: all-small-caps;
        font-size: 15pt;
      }

      .selected {
        color: white;
      }
      .navIcon {
        color: inherit;
        margin-right: 0.5rem;
        color: #848586;
        height: 25px;
        width: 25px;
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
  height: 0.15rem;
  background: #00b4ee;
  position: absolute;
  bottom: -25%;
  @media (max-width: 1300px) {
    left: 0%;
  }
`;

export default Nav;
