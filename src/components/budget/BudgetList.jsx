import { useContext } from "react";
import styled from "styled-components";
import { motion, frame } from "framer-motion";
import Budget from "./Budget";
import { GlobalContext } from "../../context/GlobalContext";

const BudgetList = () => {
  const { budgets } = useContext(GlobalContext);

  const budgetListAnim = {
    start: { opacity: 0 },
    end: {
      opacity: 1,
      transition: { when: "beforeChildren", duration: 1, staggerChildren: 1 },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const budgetAnim = {
    start: { opacity: 0, y: -50 },
    end: {
      opacity: 1,
      y: 0,
      transition: { duration: 2, ease: "easeOut" },
    },
  };

  const arrBudgets = budgets.map((budget) => (
    <Budget budget={budget} key={budget.id} variants={budgetAnim} />
  ));

  // const items = array.map((item) => {
  //   return (
  //     <Frame
  //       custom={item}
  //       key={item}
  //       y={-500}
  //       opacity={0}
  //       animate={"popUp"}
  //       variants={variants}
  //     >
  //       {item}
  //     </Frame>
  //   );
  // });
  // return <Frame style={containerStyle}>{items}</Frame>;

  return (
    <StyledBudgetList
      variants={budgetListAnim}
      initial="start"
      animate="end"
      exit="exit"
    >
      {
        /* {budgets.map((budget) => (
        <Budget budget={budget} key={budget.id} variants={budgetAnim} />
      ))} */
        arrBudgets
      }
    </StyledBudgetList>
  );
};

const StyledBudgetList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default BudgetList;
