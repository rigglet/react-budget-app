import { useContext } from "react";
import { useLocation } from "react-router-dom";
//styling
import styled from "styled-components";
import { motion } from "framer-motion";
//components
import DateFilter from "./settings/DateFilter";
import Logout from "./Logout";
//context
import { GlobalContext } from "../context/GlobalContext";
//icons
import { BsFileSpreadsheet } from "react-icons/bs";

const SubNav = () => {
  const location = useLocation();
  const subMenu = location.pathname.split("/")[3];
  const { isBudgetLoaded, currentBudget } = useContext(GlobalContext);

  return (
    <StyledNav>
      <div className="left"></div>
      <div className="main">
        <div className="date">
          {subMenu === "expenditure" && <DateFilter />}
        </div>
        <div className="budgetInfo">
          {isBudgetLoaded && (
            <div className="budgetName">
              <p>{currentBudget.saveName}</p>
              <BsFileSpreadsheet className="navIcon" />
            </div>
          )}
        </div>
      </div>
      <div className="right">
        <div className="logout">{isBudgetLoaded && <Logout />}</div>
      </div>
    </StyledNav>
  );
};

const StyledNav = styled(motion.div)`
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 15vw auto 10vw;
  grid-template-rows: auto;
  grid-template-areas: "left main right";
  min-height: 10vh;
  width: 100%;
  background-color: #252629;
  color: #848586;
  border-top: 1px solid black;
  border-bottom: 1px solid black;

  .left {
    grid-area: left;
    //padding: 0 1rem;
  }

  .main {
    grid-area: main;
    display: flex;
    align-items: center;
    justify-content: space-between;
    //padding: 0 1rem;
    .budgetInfo {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      .budgetName {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        color: white;
        p {
          font-size: 12pt;
        }
        .navIcon {
          height: 20px;
          width: 20px;
        }
      }
    }
  }

  .right {
    grid-area: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    //gap: 1rem;
    .logout {
    }
  }

  /*display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 17vw;
  //box-shadow: 0 3px 5px 5px rgba(0, 0, 0, 0.75);
  .budgetInfo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    .budgetName {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      color: white;
      p {
        font-size: 12pt;
      }
      .navIcon {
        height: 20px;
        width: 20px;
      }
    }
  } */
`;

export default SubNav;
// import { useContext } from "react";
// import { useLocation } from "react-router-dom";
// //styling
// import styled from "styled-components";
// import { motion } from "framer-motion";
// //components
// import DateFilter from "./settings/DateFilter";
// import Logout from "./Logout";
// //context
// import { GlobalContext } from "../context/GlobalContext";
// //icons
// import { BsFileSpreadsheet } from "react-icons/bs";

// const SubNav = () => {
//   const location = useLocation();
//   const subMenu = location.pathname.split("/")[3];
//   const { isBudgetLoaded, currentBudget } = useContext(GlobalContext);

//   return (
//     <StyledNav>
//       <div className="date">
//         {(subMenu === "expenditure" || subMenu === "tracker") && <DateFilter />}
//       </div>
//       <div className="budgetInfo">
//         <div className="logout">{isBudgetLoaded && <Logout />}</div>
//         {isBudgetLoaded && (
//           <div className="budgetName">
//             <p>{currentBudget.saveName}</p>

//             <BsFileSpreadsheet className="navIcon" />
//           </div>
//         )}
//       </div>
//     </StyledNav>
//   );
// };

// const StyledNav = styled(motion.div)`
//   min-height: 10vh;
//   width: 100vw;
//   background-color: #252629;
//   color: #848586;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 0 17vw;
//   border-top: 1px solid black;
//   border-bottom: 1px solid black;
//   //box-shadow: 0 3px 5px 5px rgba(0, 0, 0, 0.75);
//   .budgetInfo {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 1rem;
//     .budgetName {
//       display: flex;
//       gap: 0.5rem;
//       align-items: center;
//       color: white;
//       p {
//         font-size: 12pt;
//       }
//       .navIcon {
//         height: 20px;
//         width: 20px;
//       }
//     }
//   }
// `;

// export default SubNav;
