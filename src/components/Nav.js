import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { FcCalculator } from "react-icons/fc";
import { AiFillHome } from "react-icons/ai";
import { IoFileTrayStackedSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { VscSettings } from "react-icons/vsc";
import { RiDashboard3Fill } from "react-icons/ri";
//import { BsFileSpreadsheet } from "react-icons/bs";

//react router
import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const { isBudgetLoaded, currentBudget } = useContext(GlobalContext);

  const location = useLocation();
  const path = location.pathname.split("/")[1];

  return (
    <StyledNav>
      <div className="brand">
        <FcCalculator className="logo" />
        <Link to="/home">
          <h4>BudgetApp</h4>
        </Link>
      </div>
      <div className="header-info">
        <ul>
          <li>
            <Link
              to={{
                pathname: `/home`,
              }}
            >
              <AiFillHome
                className={path === "home" ? "navIconSelected" : "navIcon"}
              />
              <p className={path === "home" ? "selected" : ""}>Home</p>
            </Link>
            <Line
              transition={{ duration: 0.75 }}
              initial={{ width: "0%" }}
              animate={{ width: path === "home" ? "90%" : "0%" }}
            />
          </li>
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
                    pathname: `/settings/${currentBudget.id}/income`,
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
                    pathname: `/dashboard/${currentBudget.id}/view`,
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
        <div className="settings">
          <ul>
            <li>
              <Link
                to={{
                  pathname: `/appSettings`,
                }}
              >
                <IoMdSettings
                  className={
                    path === "appSettings" ? "navIconSelected" : "navIcon"
                  }
                />
                <p className={path === "appSettings" ? "selected" : ""}>
                  Settings
                </p>
              </Link>
              <Line
                transition={{ duration: 0.75 }}
                initial={{ width: "0%" }}
                animate={{ width: path === "appSettings" ? "90%" : "0%" }}
              />
            </li>
          </ul>
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
        color: #848586;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        font-weight: bolder;
        margin-right: 1rem;
        font-variant-caps: all-small-caps;
        font-size: 14pt;
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
  .settings {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    color: white;
    ul {
      display: flex;
      align-items: center;
      li {
        padding: 0;
        margin: 0;
      }
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
