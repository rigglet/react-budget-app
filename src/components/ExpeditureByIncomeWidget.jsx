import { useContext} from "react";
import { GlobalContext } from "../context/GlobalContext";
import styled from "styled-components";
import { motion } from "framer-motion";
import { formatNumber } from "../utilities";
import Progressbar from "./Progressbar";

const ExpenditureByIncomeWidget = ({expenditureTotal, income}) => {
 
  const { currencySymbol } = useContext(GlobalContext);

  const percentage = expenditureTotal / (income/100) * 100;

  return (
    <StyledExpenditureByIncomeWidget>
      <div className="titlebar">
        <h4>Expenditure total / Income</h4>
        {/* <div className="percentage">{Number(percentage).toFixed()} %</div>   */}
        <div className="total"><span className="expenditure-color">{currencySymbol}{formatNumber(Number(expenditureTotal).toFixed(2))}</span> / <span className="income-color">{currencySymbol}{formatNumber(Number(income/100).toFixed(2))}</span></div>  
      </div>
      <Progressbar percentage={percentage}/>
      
    </StyledExpenditureByIncomeWidget>
  );
};

const StyledExpenditureByIncomeWidget = styled(motion.div)`
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

export default ExpenditureByIncomeWidget;
