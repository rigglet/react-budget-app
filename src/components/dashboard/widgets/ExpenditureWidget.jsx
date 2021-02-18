import styled from "styled-components";
import { motion } from "framer-motion";

import ExpenditureChart from "../ExpenditureChart";
import ExpenditureFigures from "../ExpenditureFigures";

const ExpenditureWidget = ({ includeMandatory, setIncludeMandatory }) => {
  return (
    <StyledExpenditure>
      <h4>Net salary vs Budget vs Expediture</h4>
      <div className="data">
        <div className="info">
          <ExpenditureFigures
            includeMandatory={includeMandatory}
            setIncludeMandatory={setIncludeMandatory}
          />
        </div>

        <div className="chart">
          <ExpenditureChart includeMandatory={includeMandatory} />
        </div>
      </div>
    </StyledExpenditure>
  );
};

const StyledExpenditure = styled(motion.div)`
  padding: 1rem;
  width: 100%;
  border-radius: 4px;
  background-color: #39393c;
  color: #848586;
  .mandatory {
    cursor: pointer;
  }
  .check,
  .cross {
    width: 20px;
    height: 20px;
  }
  .check {
    color: #00b4ee;
  }
  .cross {
    //color: red;
  }
  #total {
    font-weight: bolder;
  }
  h4 {
    color: white;
    font-weight: 500;
    margin-bottom: 1rem;
  }
  .data {
    display: flex;
    align-items: center;

    justify-content: space-around;
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .figures {
        display: flex;
        gap: 1rem;
        .item {
          .symbol {
            margin-right: 0.25rem;
          }
        }
      }
    }
  }
  @media screen and (max-width: 1300px) {
    .data {
      display: flex;
      flex-direction: column;
      row-gap: 1rem;
      //justify-content: center;
      align-items: center;
      .info {
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
        //justify-content: space-around;
      }
    }
  }
`;

export default ExpenditureWidget;
