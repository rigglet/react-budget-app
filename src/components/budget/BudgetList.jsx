import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Budget from "./Budget";
import { getData } from "../../data";
import Spinner from "../Spinner";
import { GlobalContext } from "../../context/GlobalContext";

const BudgetList = () => {
  const [isLoading, setLoading] = useState(true);
  const [showBudgets, setShowBudgets] = useState(false);
  const { budgets, loadBudgets, currentBudgetId } = useContext(GlobalContext);
  //console.log(currentBudgetId);

  useEffect(() => {
    getData().then(
      (response) => {
        loadBudgets(response);
        setLoading(false);
        setShowBudgets(true);
      },
      (reject) => {
        console.log(reject);
        setLoading(false);
        setShowBudgets(false);
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
        <StyledSpin>
          <Spinner />
        </StyledSpin>
      )}
    </>
  );
};

const StyledBudgetList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const StyledSpin = styled(motion.div)`
  align-self: center;
`;

export default BudgetList;
