import styled from "styled-components";
import { motion } from "framer-motion";
//import { updateBudgetLocally} from "../util";
import Progressbar from "./Progressbar";

const UncategorizedBudget = ({uncategorisedPercentage, uncategorisedTotal, uncategorisedBudgetTotal}) => {
  
  return (
    <StyledUncategorizedBudget>
      <div className="titlebar">
        <h4>Unallocated funds / income</h4>
        <div className="percentage">{Number(uncategorisedPercentage).toFixed()} %</div>  
        <div className="total"><span className="unallocated-color">${Number(uncategorisedTotal).toFixed(2)}</span> / <span className="income-color">${Number(uncategorisedBudgetTotal).toFixed(2)}</span></div>  
      </div>

      <Progressbar percentage={uncategorisedPercentage}/>
      
    </StyledUncategorizedBudget>
  );
};

const StyledUncategorizedBudget = styled(motion.div)`
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

export default UncategorizedBudget;
