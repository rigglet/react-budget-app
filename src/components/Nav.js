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

  const {isBudgetLoaded, updateBudgetLoaded, updateCurrentBudget, updateCurrentBudgetId} = useContext(GlobalContext);
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
              animate={{ width: path === "home" || path === "" ? "100%" : "0%" }}
            />
          </li>
            
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
              animate={{ width: path === "income" ? "100%" : "0%" }}
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
              animate={{ width: path === "budget" ? "100%" : "0%" }}
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
              animate={{ width: path === "summary" ? "100%" : "0%" }}
            />
          </li>
          <li className="exit" onClick={() => handleBudgetClose()}>
            <ImExit className="icon"/>
            <p>Exit</p>
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
  column-gap: 1rem;
  
  //app name and icon (far left)
  .brand {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 1rem;
    
    .logo {
      width: auto;
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
    row-gap: 0.5rem;
    column-gap: 2rem;
    flex-wrap: wrap;
  }
  
  ul: nth-of-type(1) {
    justify-content: space-around;
    flex-grow: 0;
  }

  ul {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    list-style: none;
    text-decoration: none;
    flex-grow: 1;
    column-gap: 3rem;

    li {
      text-decoration: none;
      position: relative;
      align-items: center;
      display: flex;
      a {
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        column-gap: 0.5rem;
        font-weight: bolder;
        font-variant-caps: all-small-caps;
        font-size: 15pt;
        color: #848586;
      }
      
      .selected {
        color: white;
      }
      
      .navIcon {
        color: inherit;
        color: #848586;
        height: 25px;
        width: 25px;
      }
      .navIconSelected {
        color: white;
        height: 25px;
        width: 25px;
      }
    }

    .exit {
      display: flex;
      column-gap: 0.5rem;
      cursor: pointer;
      
      p {
        color: #00b4ee;
        font-weight: bold;
        font-size: 15pt;
        font-variant-caps: all-small-caps;
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
