import { useContext, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//context
import { GlobalContext } from "../context/GlobalContext";
import AddBudgetForm from "../components/AddBudgetForm";
import BudgetList from "../components/BudgetFileList";
import Spinner from "../components/Spinner";
import { getLocalData } from "../utilities";

const Budgets = () => {

  const [isLoading, setLoading] = useState(true);
  const { loadBudgets } = useContext(GlobalContext);
  let budgets = []
  
  const fetchProduct = useRef(async () => {
    budgets =  await getLocalData().then(
      (response) => {
        console.log("Load budgets");
        //set loading flag to false
        setLoading(false);
        return response
      },
      (err) => {
        //on reject log error
        console.log(err);
        //set loading flag to false
        setLoading(false);
      }
    )
    //safe data to local contenxt
    loadBudgets(budgets);
  }, []);

  useEffect(() => {
    fetchProduct.current()
  }, [fetchProduct])


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
