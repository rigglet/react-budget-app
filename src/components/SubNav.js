import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { RiDashboard3Fill } from "react-icons/ri";
import { BsFileSpreadsheet } from "react-icons/bs";

const SubNav = () => {
  return (
    <StyledNav>
      <StyledLink to="/budgets">
        <BsFileSpreadsheet className="navIcon" />
        <h4>Budgets</h4>
      </StyledLink>
      <StyledLink to="dashboard">
        <RiDashboard3Fill className="navIcon" />
        <h4>Dashboard</h4>
      </StyledLink>
    </StyledNav>
  );
};

const StyledNav = styled(motion.div)`
  min-height: 10vh;
  width: 100vw;
  background-color: #252629;
  color: #848586;
  display: flex;
  align-items: center;
  padding: 0 17vw;
  box-shadow: 0 10px #000000;
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
export default SubNav;
