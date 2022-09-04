import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//context
import { GlobalContext } from "../context/GlobalContext";
import AddBudgetForm from "../components/budget/AddBudgetForm";
import BudgetList from "../components/budget/BudgetList";
import Spinner from "../components/Spinner";
import { seedData } from "../seedData";

const Budgets = () => {

  const { loadBudgets } = useContext(GlobalContext);
  const [isLoading, setLoading] = useState(true);

  const data = seedData();
  //setData
  //data.setData()
  //console.log(data)
  
  //get seed data
  useEffect(() => {
    data.getLocalData().then(
      (response) => {
        //save returned data to global context
        loadBudgets(response);
        //set loading flag to false
        setLoading(false);
      },
      (reject) => {
        //on reject log error
        console.log(reject);
        //set loading flag to false
        setLoading(false);
      }
    );
  }, []);

  return (
    <StyledBudgetContainer>
        <h3>Budgets</h3>
      <div className="main">
        {!isLoading ? (
          <>
            <AddBudgetForm />
            <BudgetList />
          </>
        ) : (
            <Spinner />
        )}
      </div>
    </StyledBudgetContainer>
  );
};

const StyledBudgetContainer = styled(motion.div)`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  h3{
    align-self: flex-start;
    padding-left: 15vw;
  }
  
  .main {
    width: 70vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 1rem;
    margin-top: 1rem;
  }
`;

export default Budgets;
