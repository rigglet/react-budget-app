//import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

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
        <h4>Income</h4>
      </StyledLink>
      <StyledLink
        to={{
          pathname: `/settings/${id}/budget`,
        }}
      >
        <h4>Budget</h4>
      </StyledLink>
      <StyledLink
        to={{
          pathname: `/settings/${id}/tracker`,
        }}
      >
        <h4>Tracker</h4>
      </StyledLink>
      <StyledLink
        to={{
          pathname: `/settings/${id}/overview`,
        }}
      >
        <h4>Overview</h4>
      </StyledLink>
    </StyledSide>
  );
};

const StyledSide = styled(motion.div)`
  //position: absolute;
  //margin: 1rem;
  width: 15vw;
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
  h4 {
    color: #848586;
    font-weight: 400;
    padding: 1rem;
  }
`;

export default Sidebar;
