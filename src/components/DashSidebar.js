import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { GlobalContext } from "../context/GlobalContext";
import { Link, useLocation } from "react-router-dom";

//icons
import { IoMdSettings } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
//import { VscSettings } from "react-icons/vsc";

const DashSidebar = () => {
  const { currentBudget } = useContext(GlobalContext);
  const location = useLocation();
  const path = location.pathname.split("/")[3];
  return (
    <StyledSide>
      <ul>
        <li>
          <Link
            to={{
              pathname: `/dashboard/${currentBudget.id}/view`,
            }}
          >
            <MdDashboard
              className={path === "view" ? "navIconSelected" : "navIcon"}
            />
            <p className={path === "view" ? "selected" : ""}>Dashboard</p>
          </Link>
          <Line
            transition={{ duration: 0.75 }}
            initial={{ width: "0%" }}
            animate={{ width: path === "view" ? "70%" : "0%" }}
          />
        </li>
        <li>
          <Link
            to={{
              pathname: `/dashboard/${currentBudget.id}/settings`,
            }}
          >
            <IoMdSettings
              className={path === "settings" ? "navIconSelected" : "navIcon"}
            />
            <p className={path === "settings" ? "selected" : ""}>Settings</p>
          </Link>
          <Line
            transition={{ duration: 0.75 }}
            initial={{ width: "0%" }}
            animate={{ width: path === "settings" ? "70%" : "0%" }}
          />
        </li>
      </ul>
    </StyledSide>
  );
};

const StyledSide = styled(motion.div)`
  width: 15vw;
  border-radius: 4px;
  background-color: #39393c;
  color: #848586;
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 1rem;

  ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    text-decoration: none;
    li {
      margin-right: 1rem;
      text-decoration: none;
      position: relative;
      a {
        display: flex;
        align-items: center;
        color: #848586;
        text-decoration: none;
        font-weight: bolder;
        padding: 0.5rem 0;
        font-size: 12pt;
        font-variant-caps: all-small-caps;
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
`;

const Line = styled(motion.div)`
  height: 0.15rem;
  //background: #00b4ee;
  background: #e69a07;
  //width: 100%;
  position: absolute;
  bottom: -1%;
`;

export default DashSidebar;
