import styled from "styled-components";
import { motion } from "framer-motion";
//import { updateBudgetLocally} from "../util";
import Progressbar from "./Progressbar";

const UncategorizedBudget = ({uncategorisedPercentage, uncategorisedTotal, uncategorisedBudgetTotal}) => {
  
  return (
    <StyledUncategorizedBudget>
      <div className="titlebar">
        <h4>Unallocated funds</h4>
        <div className="percentage">{Number(uncategorisedPercentage).toFixed()} %</div>  
        <div className="total">${Number(uncategorisedTotal).toFixed(2)} / ${Number(uncategorisedBudgetTotal).toFixed(2)}</div>  
      </div>
      <Progressbar percentage={uncategorisedPercentage}/>
      
    </StyledUncategorizedBudget>
  );
};

const StyledUncategorizedBudget = styled(motion.div)`
  /* padding: 1rem;
  width: 100%;
  border-radius: 4px;
  background-color: #39393c;
  color: #848586;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  */
  
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
      color: whitesmoke;
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

export default UncategorizedBudget;