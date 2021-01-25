//import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";
//import { RiFundsBoxLine } from "react-icons/ri";
import { FaWallet, FaChartBar, FaRegMoneyBillAlt } from "react-icons/fa";
import { BiAbacus } from "react-icons/bi";

const Sidebar = ({ id }) => {
  //const { currentBudget } = useContext(GlobalContext);
  //console.log(`sidebar: ${id}`);
  return (
    <StyledSide>
      <StyledLink
        to={{
          pathname: `/settings/${id}/income`,
        }}
      >
        <FaRegMoneyBillAlt className="navIcon" />
        <h4>Income</h4>
      </StyledLink>
      <StyledLink
        to={{
          pathname: `/settings/${id}/budget`,
        }}
      >
        <FaWallet className="navIcon" />
        <h4>Budget</h4>
      </StyledLink>
      <StyledLink
        to={{
          pathname: `/settings/${id}/tracker`,
        }}
      >
        <BiAbacus className="navIcon" />
        <h4>Tracker</h4>
      </StyledLink>
      <StyledLink
        to={{
          pathname: `/settings/${id}/overview`,
        }}
      >
        <FaChartBar className="navIcon" />
        <h4>Overview</h4>
      </StyledLink>
    </StyledSide>
  );
};
const StyledSide = styled(motion.div)`
  //position: absolute;
  //margin: 1rem;
  width: 15vw;
  gap: 1rem;
  border-radius: 4px;
  background-color: #39393c;
  color: #848586;
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 1rem;
  flex-shrink: 1;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  .navIcon {
    height: 25px;
    width: 25px;
    color: #848586;
  }
  h4 {
    padding: 0;
    color: #848586;
    font-weight: 400;
    padding: 0.5rem;
  }
`;

export default Sidebar;
