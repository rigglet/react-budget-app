import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const budgetSelected = true;
  return (
    <StyledSide>
      {budgetSelected && (
        <div>
          <StyledLink to="">
            <h4>Income</h4>
          </StyledLink>
          <StyledLink to="">
            <h4>Budget</h4>
          </StyledLink>
          <StyledLink to="">
            <h4>Tracker</h4>
          </StyledLink>
          <StyledLink to="">
            <h4>Overview</h4>
          </StyledLink>
        </div>
      )}
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
