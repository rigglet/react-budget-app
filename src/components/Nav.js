import styled from "styled-components";
import { motion } from "framer-motion";
import { FcCalculator } from "react-icons/fc";

const Nav = () => {
  return (
    <StyledNav>
      <FcCalculator className="logo" />
      <h4>Budget McBudgetFace</h4>
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
  padding: 0 15.5vw;
  h4 {
    font-weight: bold;
  }
  .logo {
    width: 5vw;
    height: 5vh;
  }
`;
export default Nav;
