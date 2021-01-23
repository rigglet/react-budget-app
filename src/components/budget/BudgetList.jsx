import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Budget from "./Budget";
import { getData } from "../../data";
import Spinner from "../Spinner";
import { GlobalContext } from "../../context/GlobalContext";

const BudgetList = () => {
  const [isLoading, setLoading] = useState(true);
  const { budgets, loadBudgets, currentBudgetId } = useContext(GlobalContext);

  console.log(currentBudgetId);

  useEffect(() => {
    getData().then(
      (response) => {
        loadBudgets(response);
        setLoading(false);
      },
      (reject) => {
        console.log("NO RESULT");
      }
    );
  }, []);

  return (
    <>
      {!isLoading ? (
        <StyledBudgetList>
          {budgets.map((budget) => (
            <Budget budget={budget} key={budget.id} />
          ))}
        </StyledBudgetList>
      ) : (
        <Spinner />
      )}
    </>
  );
};

const StyledBudgetList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default BudgetList;
