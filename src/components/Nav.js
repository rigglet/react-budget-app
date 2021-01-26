import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { FcCalculator } from "react-icons/fc";
import { BsFileSpreadsheet } from "react-icons/bs";
import { IoFileTrayStackedSharp } from "react-icons/io5";
//import { IoMdSettings } from "react-icons/io";
import { VscSettings } from "react-icons/vsc";
import { RiDashboard3Fill } from "react-icons/ri";
//react router
import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const { currentBudgetId, budgets, isBudgetLoaded } = useContext(
    GlobalContext
  );
  const currentBudget = budgets.filter((b) => b.id === currentBudgetId);

  const location = useLocation();
  const path = location.pathname.split("/")[1];
  //console.log({ path });
  return (
    <StyledNav>
      <div className="brand">
        <FcCalculator className="logo" />
        <Link to="/">
          <h4>BudgetApp</h4>
        </Link>
      </div>

      <div className="header-info">
        <ul>
          <li>
            <Link
              to={{
                pathname: `/budgets`,
              }}
            >
              <IoFileTrayStackedSharp
                className={path === "budgets" ? "navIconSelected" : "navIcon"}
              />
              <p className={path === "budgets" ? "selected" : ""}>Budgets</p>
            </Link>
            <Line
              transition={{ duration: 0.75 }}
              initial={{ width: "0%" }}
              animate={{ width: path === "budgets" ? "90%" : "0%" }}
            />
          </li>

          {isBudgetLoaded && (
            <>
              <li>
                <Link
                  to={{
                    pathname: `/settings/${currentBudgetId}/income`,
                  }}
                >
                  <VscSettings
                    className={
                      path === "settings" ? "navIconSelected" : "navIcon"
                    }
                  />
                  <p className={path === "settings" ? "selected" : ""}>
                    Configuration
                  </p>
                </Link>
                <Line
                  transition={{ duration: 0.75 }}
                  initial={{ width: "0%" }}
                  animate={{ width: path === "settings" ? "90%" : "0%" }}
                />
              </li>
              <li>
                <Link
                  to={{
                    pathname: `/dashboard/${currentBudgetId}/view`,
                  }}
                >
                  <RiDashboard3Fill
                    className={
                      path === "dashboard" ? "navIconSelected" : "navIcon"
                    }
                  />
                  <p className={path === "dashboard" ? "selected" : ""}>
                    Dashboard
                  </p>
                </Link>
                <Line
                  transition={{ duration: 0.75 }}
                  initial={{ width: "0%" }}
                  animate={{ width: path === "dashboard" ? "90%" : "0%" }}
                />
              </li>
            </>
          )}
        </ul>

        <div className="info">
          {isBudgetLoaded && (
            <>
              <p>{currentBudget[0].saveName}</p>
              <BsFileSpreadsheet className="navIcon" />
            </>
          )}
        </div>
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
  padding: 0 15.5vw;
  //app name (far left)
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 2rem;
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
    width: 100%;
  }
  //links (middle)
  ul {
    display: flex;
    list-style: none;
    text-decoration: none;
    li {
      margin-right: 1rem;
      text-decoration: none;
      position: relative;
      a {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #848586;
        text-decoration: none;
        font-weight: bolder;
        margin-right: 1rem;
      }

      .selected {
        color: white;
      }
      .navIcon {
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

  //budget name (far right)
  .info {
    display: flex;
    align-items: center;
    p {
      font-size: 12pt;
      margin-right: 0.5rem;
    }
    .navIcon {
      height: 25px;
      width: 25px;
    }
  }
`;

const Line = styled(motion.div)`
  height: 0.15rem;
  background: #00b4ee;
  //width: 0%;
  position: absolute;
  bottom: -25%;
  @media (max-width: 1300px) {
    left: 0%;
  }
`;

export default Nav;
