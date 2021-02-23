import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import SplashFlowchartWidget from "../SplashFlowchartWidget";
//context
import { GlobalContext } from "../context/GlobalContext";
//getData
import { getData } from "../data";
//spinner
import Spinner from "../components/Spinner";

const Budget = () => {
  const { loadBudgets } = useContext(GlobalContext);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getData().then(
      (response) => {
        loadBudgets(response);
        setLoading(false);
      },
      (reject) => {
        console.log(reject);
        setLoading(false);
      }
    );
  }, []);

  return (
    <StyledBudgetContainer>
      <div className="left"></div>
      <div className="main">
        {!isLoading ? (
          <SplashFlowchartWidget />
        ) : (
          <StyledSpin>
            <Spinner />
          </StyledSpin>
        )}
      </div>
      <div className="right"></div>
    </StyledBudgetContainer>
  );
};

const StyledSpin = styled(motion.div)`
  align-self: center;
`;

const StyledBudgetContainer = styled(motion.div)`
  margin: 1rem;
  width: 100vw;
  //height: 80vh;
  background-color: #1f2023;
  color: #848586;
  display: grid;
  grid-template-columns: 15vw auto 10vw;
  grid-template-rows: auto;
  grid-template-areas: "left main right";
  grid-column-gap: 2rem;
  .left {
    grid-area: left;
  }
  .main {
    grid-area: main;
    display: flex;
    flex-direction: column;
    //align-items: center;

    /* h3 {
      margin-bottom: 1rem;
      color: white;
    } */
  }
  .right {
    grid-area: right;
  }
`;

export default Budget;
