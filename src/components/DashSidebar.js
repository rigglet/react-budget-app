import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";
//icons
import { IoMdSettings } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
//import { VscSettings } from "react-icons/vsc";

const DashSidebar = () => {
  const { currentBudgetId } = useContext(GlobalContext);
  //console.log(`sidebar: ${id}`);
  return (
    <StyledSide>
      <StyledLink
        to={{
          pathname: `/dashboard/${currentBudgetId}/view`,
        }}
      >
        <MdDashboard className="navIcon" />
        <h4>View Dashboard</h4>
      </StyledLink>
      <StyledLink
        to={{
          pathname: `/dashboard/${currentBudgetId}/settings`,
        }}
      >
        <IoMdSettings className="navIcon" />
        <h4>Settings</h4>
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

export default DashSidebar;
