import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FcCalculator } from "react-icons/fc";
import { BsFileSpreadsheet } from "react-icons/bs";
import { IoFileTrayStackedSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";
import { RiDashboard3Fill } from "react-icons/ri";

const Nav = () => {
  const { currentBudgetId, budgets, isBudgetLoaded } = useContext(
    GlobalContext
  );
  const currentBudget = budgets.filter((b) => b.id === currentBudgetId);
  //console.log(`isBudgetLoaded:  ${isBudgetLoaded}`);
  //console.log(currentBudget);
  return (
    <StyledNav>
      <div className="links">
        <div className="brand">
          <FcCalculator className="logo" />
          <StyledLink to="/">
            <h4>BudgetApp</h4>
          </StyledLink>
        </div>
        <StyledLink
          to={{
            pathname: `/budgets`,
          }}
        >
          <IoFileTrayStackedSharp className="navIcon" />
          <h4>Budgets</h4>
        </StyledLink>
        {isBudgetLoaded && (
          <>
            <StyledLink
              to={{
                pathname: `/settings/${currentBudgetId}/income`,
              }}
            >
              <IoMdSettings className="navIcon" />
              <h4>Settings</h4>
            </StyledLink>
            <StyledLink
              to={{
                pathname: `/dashboard/${currentBudgetId}`,
              }}
            >
              <RiDashboard3Fill className="navIcon" />
              <h4>Dashboard</h4>
            </StyledLink>
          </>
        )}
      </div>
      <div className="info">
        {isBudgetLoaded && (
          <>
            <p>{currentBudget[0].saveName}</p>
            <BsFileSpreadsheet className="navIcon" />
          </>
        )}
      </div>
    </StyledNav>
  );
};

const StyledNav = styled(motion.div)`
  min-height: 10vh;
  width: 100vw;
  background-color: #1f2023;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15.5vw;
  .brand {
    display: flex;
    align-items: center;
    margin-right: 2rem;
    h4 {
      font-family: "Comfortaa", cursive;
      font-weight: bold;
      font-size: 1.5rem;
      color: white;
    }
    .logo {
      width: 5vw;
      height: 5vh;
    }
  }
  .links {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .info {
    display: flex;
    align-items: center;
    p {
      font-size: 12pt;
      margin-right: 0.5rem;
    }
    .navIcon {
      color: white;
      height: 25px;
      width: 25px;
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  padding-right: 2rem;
  h4 {
    color: #848586;
    font-weight: 600;
    padding: 0.25rem;
  }
  .navIcon {
    color: #848586;
    height: 30px;
    width: 30px;
  }
`;

export default Nav;
