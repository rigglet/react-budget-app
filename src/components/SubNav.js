import styled from "styled-components";
import { motion } from "framer-motion";
//import { Link } from "react-router-dom";

const SubNav = () => {
  return <StyledNav></StyledNav>;
};

const StyledNav = styled(motion.div)`
  min-height: 10vh;
  width: 100vw;
  background-color: #252629;
  color: #848586;
  display: flex;
  align-items: center;
  padding: 0 17vw;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  //box-shadow: 0 3px 5px 5px rgba(0, 0, 0, 0.75);
`;

// const StyledLink = styled(Link)`
//   text-decoration: none;
//   display: flex;
//   align-items: center;
//   padding-right: 2rem;
//   h4 {
//     color: #848586;
//     font-weight: 600;
//     padding: 0.25rem;
//   }
//   .navIcon {
//     color: #848586;
//     height: 30px;
//     width: 30px;
//   }
// `;
export default SubNav;
