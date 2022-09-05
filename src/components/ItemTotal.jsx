import styled from "styled-components";
import { motion } from "framer-motion";
//import { updateBudgetLocally} from "../util";
import Progressbar from "./Progressbar";

const ItemTotal = ({expenditureTotal, allocatedFundsTotal}) => {
  
  const percentage = expenditureTotal / allocatedFundsTotal * 100;

  return (
    <StyledItemTotal>
      <div className="titlebar">
        <h4>Expenditure total / allocated</h4>
        <div className="percentage">{Number(percentage).toFixed()} %</div>  
        <div className="total"><span className="allocated-color">${Number(allocatedFundsTotal/100).toFixed(2)}</span> / <span className="income-color">${Number(56/100).toFixed(2)}</span></div>  
      </div>
      <Progressbar percentage={percentage}/>
      
    </StyledItemTotal>
  );
};

const StyledItemTotal = styled(motion.div)`
  /* padding: 1rem;
  width: 100%;
  border-radius: 4px;
  background-color: #39393c;
  color: #848586;
  align-items: flex-start;
  */
  display: flex;
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
  }
  
  .buttons{
    padding: 0.5rem 0rem;
    display: flex;
    align-items: center;
    justify-contents: flex-start;
    column-gap: 1rem;
  }
`;

export default ItemTotal;
