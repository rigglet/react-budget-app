import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Budget from "./Budget";
import { getData } from "../../data";
import Spinner from "../Spinner";
import { GlobalContext } from "../../context/GlobalContext";

const BudgetList = () => {
  const [isLoading, setLoading] = useState(true);
  const [budgets, setBudgets] = useContext(GlobalContext);

  //console.log(budgets);
  useEffect(() => {
    getData().then(
      (response) => {
        setBudgets(response);
        setLoading(false);
        //console.log(response);
      },
      (reject) => {
        console.log("NO RESULT");
      }
    );
  }, [setLoading, setBudgets]);

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
