import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import styled from "styled-components";
import { motion } from "framer-motion";
import Progressbar from "./Progressbar";
import { formatNumber } from "../utilities";

const UncategorizedBudget = ({uncategorisedTotal, netIncome}) => {
  
  const { currencySymbol } = useContext(GlobalContext);
  
  //uncategorised funds as percentage of annual net figure
  let percentage = 0;
  if (uncategorisedTotal > 0 && netIncome > 0) {
    percentage = uncategorisedTotal / netIncome * 100;
  }
  
  return (
    <StyledUncategorizedBudget>
      <div className="titlebar">
        <h4>Unallocated funds / income</h4>
        {/* <div className="percentage">{Number(percentage).toFixed()} %</div>   */}
        <div className="total"><span className="unallocated-color">{currencySymbol}{formatNumber(Number(uncategorisedTotal).toFixed(2))}</span> / <span className="income-color">${formatNumber(Number(netIncome).toFixed(2))}</span></div>  
      </div>

      <Progressbar percentage={percentage}/>
      
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
    justify-content: space-between;
    align-items: center;
    color: whitesmoke;

    h4 {
    //color: white;
    font-weight: 500;
    }
  }
`;

export default UncategorizedBudget;
