import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import styled from "styled-components";
import { motion } from "framer-motion";
import Table from "./Table";
//chart
import { Bar } from "react-chartjs-2";
//icons
import { AiOutlineTable } from "react-icons/ai";
import { GoGraph } from "react-icons/go";
import AllocatedSelector from "./AllocatedSelector";
import {
  getAllocatedPerPeriod,
  getNetIncomeForPeriod,
  getAccumulatedSubTotals,
} from "../utilities";

const BudgetByCategoryWidget = () => {
  const [toggleTable, setToggleTable] = useState(false);
  const [period, setPeriod] = useState("annually");
  const { currencySymbol, currentBudget, allocatedFundsTotal } = useContext(GlobalContext);

  const budgetCategories = currentBudget.data.budgetCategories;
  
  let allocatedTotalForPeriod = getAllocatedPerPeriod(allocatedFundsTotal / 100, period);
  let netIncomeForPeriod = getNetIncomeForPeriod(currentBudget, period) / 100;
  const remaining = (netIncomeForPeriod - allocatedTotalForPeriod).toFixed(2);
  let maxYRange = 0;
  let accumulatedSubTotals = getAccumulatedSubTotals(currentBudget, period);
  
  const handlePeriodChange = (v) => {
    setPeriod(v);
  };

  //toggle between chart and table
  const handleChangeView = () => {
    setToggleTable(!toggleTable);
  };

  //Chart data
  const filteredCategories = [
    ...new Set(budgetCategories.map((category) => category.category.toUpperCase()).sort()),
  ];
  
  //CREATE ARRAY DATA FROM ALLOCATED CATEGORY AMOUNTS
  //creates array of amounts from array of objects
  let budgetDataArray = accumulatedSubTotals.map((category) => (Number(category.categoryTotal).toFixed(2)));
  let expenditureDataArray = accumulatedSubTotals.map((category) => (Number(category.itemTotal).toFixed(2)));

  //set upper ranage of y axis to highest number plus 10%
  maxYRange = Math.max(...budgetDataArray) * 1.05;
  
  const options = {
    //maintainAspectRatio: false,
    
    scales: {
      yAxes: [
        {
          display: true,
          drawTicks: false,
          ticks: {
            drawTicks: false,
            beginAtZero: true,
            max: maxYRange,
          },
        },
      ],
    },

    title: {
      display: true,
      text: `Budget allocated by category (${currencySymbol})`,
      position: "bottom",
      fontSize: 16,
      fontStyle: "bold",
    },
    layout: {
      padding: {
        left: 50,
        right: 50,
        top: 0,
        bottom: 0,
      },
    },
    responsive: true,
    responsiveAnimationDuration: 300,
    aspectRatio: 1,
  };

  const data = {
    labels: filteredCategories,
    datasets: [
      {
        label: `Allocated budget per category ${currencySymbol}`,
        backgroundColor: "#9f5f90",
        borderColor: "#00b4ee",
        borderWidth: 2,
        hoverBackgroundColor: "#9f5f90",
        hoverBorderColor: "#00b4ee",
        barPercentage: 10,
        barThickness: 40,
        maxBarThickness: 50,
        minBarLength: 0,
        data: budgetDataArray,
      },
      {
        label: `Expenditure per category ${currencySymbol}`,
        backgroundColor: "#e52424",
        borderColor: "#00b4ee",
        borderWidth: 2,
        hoverBackgroundColor: "#e52424",
        hoverBorderColor: "#00b4ee",
        barPercentage: 10,
        barThickness: 50,
        maxBarThickness: 40,
        minBarLength: 0,
        data: expenditureDataArray,
      },
    ],
  };

  const headings = [
    "Category (C)",
    "Allocated (A) sub-total",
    "Expenditure (E) sub-total",
    "E as % of A",
    "E as % of income",
  ];

  return (
    <StyledBreakdown>
      <div className="heading">
        <h4>Budget breakdown by category by period</h4>
        {currentBudget.data.income.annualNet > 0 &&
          currentBudget.data.budgetCategories.length > 0 && (
            <div className="iconSelect">
              {toggleTable ? (
                <AiOutlineTable
                  className="icon"
                  onClick={() => handleChangeView()}
                />
              ) : (
                <GoGraph className="icon" onClick={() => handleChangeView()} />
              )}
            </div>
          )}
      </div>

      {currentBudget.data.income.annualNet > 0 &&
      currentBudget.data.budgetCategories.length > 0 ? (
          <>
          <div className="data">
          <AllocatedSelector
            period={period}
            handlePeriodChange={handlePeriodChange}
            allocatedTotalForPeriod={allocatedTotalForPeriod}
            remaining={remaining}
            netIncomeForPeriod={netIncomeForPeriod}
          />
            {toggleTable ? (
              <div className="chart">
                <Bar
                  data={data}
                  options={options}
                />
              </div>
            ) : (
              <Table
                headings={headings}
                accumulatedSubTotals={accumulatedSubTotals}
                netIncomeForPeriod={netIncomeForPeriod}
              />
            )}
          </div>
       
        </> 
      ) : (
        <>
          <p>No data to display.</p>
          <p>Please enter income figures and budget.</p>
        </>
      )}
    </StyledBreakdown>
  );
};

const StyledBreakdown = styled(motion.div)`
  position: relative;
  padding: 1rem;
  border-radius: 4px 25px 4px 4px;
  background-color: #39393c;
  color: #848586;
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  flex-shrink: 1;

  table {
    width: 100%;
    .tableItem {
      text-transform: capitalize;
    }
  }
  .heading {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .iconSelect {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0.9rem 0.9rem 0.7rem 0.9rem;
      background-color: #848586;
      border-radius: 50%;
      border-radius: 4px 25px 4px 4px;
    }
    .iconSelect:hover .icon{
      transition: all 0.3s ease;
      color: var(--highlight-color);
    }
    .icon {
      width: 20px;
      height: 20px;
      color: white;
      cursor: pointer;
    }
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
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    row-gap: 0.5rem;

    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-bottom: 1rem;
      .drop {
        margin-bottom: 0.25rem;
        label {
          margin-right: 0.25rem;
        }
      }
      .figures {
        display: flex;
        gap: 1rem;
      }
    }
    .chart {
      //height: 60%;
      width: 100%;
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

export default BudgetByCategoryWidget;
