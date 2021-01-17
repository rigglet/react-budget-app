import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Budget from "./Budget";
import { getData } from "../../data";
import Spinner from "../Spinner";

const BudgetList = () => {
  const [budgetData, setBudgetData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getData().then(
      (response) => {
        setBudgetData(response);
        setLoading(false);
        //console.log(response);
      },
      (reject) => {
        console.log("NO RESULT");
      }
    );
  }, [setLoading]);

  return (
    <>
      {!isLoading ? (
        <StyledBudgetList>
          {budgetData.map((budget) => (
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
