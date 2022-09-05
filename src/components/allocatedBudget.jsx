import styled from "styled-components";
import { motion } from "framer-motion";
//import { updateBudgetLocally} from "../util";
import Progressbar from "./Progressbar";

const AllocatedBudget = ({income, allocatedFundsTotal}) => {
  
  const percentage = allocatedFundsTotal / income * 100;
  return (
    <StyledAllocatedBudget>
      <div className="titlebar">
        <h4>Allocated budget / income</h4>
        <div className="percentage">{Number(percentage).toFixed()} %</div>  
        <div className="total"><span className="allocated-color">${Number(allocatedFundsTotal/100).toFixed(2)}</span> / <span className="income-color">${Number(income/100).toFixed(2)}</span></div>  
      </div>
      <Progressbar percentage={percentage}/>
      
    </StyledAllocatedBudget>
  );
};

const StyledAllocatedBudget = styled(motion.div)`
  /* display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 1;
  padding: 1rem;
  border-radius: 4px;
  background-color: #39393c;
  color: #848586;
    
  .titlebar{
    display: flex;
    justify-content: space-between;
    align-items: center;

    h4 {
    color: white;
    font-weight: 500;
    margin-bottom: 1rem;
    }
    .total, .percentage {
      //color: whitesmoke;
    }
  } */
  
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 1;
  padding: 1rem;
  border-radius: 4px;
  background-color: #39393c;
  row-gap: 1rem;
    
  .titlebar{
    display: flex;
    column-gap: 1rem;
    justify-content: space-evenly;
    align-items: center;
    color: whitesmoke;

    h4 {
    //color: white;
    font-weight: 500;
    }
  }
`;

export default AllocatedBudget;
