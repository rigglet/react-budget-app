import styled from "styled-components";
import { motion } from "framer-motion";
//import { updateBudgetLocally} from "../util";
import Progressbar from "./Progressbar";

const ItemTotal = ({expenditureTotal, allocatedFundsTotal}) => {
 
  const percentage = expenditureTotal / (allocatedFundsTotal/100) * 100;

  return (
    <StyledItemTotal>
      <div className="titlebar">
        <h4>Expenditure total / allocated budget</h4>
        <div className="percentage">{Number(percentage).toFixed()} %</div>  
        <div className="total"><span className="expenditure-color">${Number(expenditureTotal).toFixed(2)}</span> / <span className="allocated-color">${Number(allocatedFundsTotal/100).toFixed(2)}</span></div>  
      </div>
      <Progressbar percentage={percentage}/>
      
    </StyledItemTotal>
  );
};

const StyledItemTotal = styled(motion.div)`
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
    justify-content: space-between;
    align-items: center;
    color: whitesmoke;

    h4 {
    font-weight: 500;
    }
  }
`;

export default ItemTotal;
