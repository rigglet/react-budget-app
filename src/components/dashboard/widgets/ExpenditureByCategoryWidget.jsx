import { useContext, useState } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import styled from "styled-components";
import { motion } from "framer-motion";
import Table from "../Table";
//chart
import { Bar } from "react-chartjs-2";
//icons
import { AiOutlineTable } from "react-icons/ai";
import { GoGraph } from "react-icons/go";
import AllocatedSelector from "../AllocatedSelector";
import {
  getAllocatedPerPeriod,
  getNetIncomeForPeriod,
  getAccumulatedSubTotals,
} from "../../../utilities";

const BudgetByCategoryWidget = () => {
  const [toggleTable, setToggleTable] = useState(false);
  const [period, setPeriod] = useState("annually");
  const { currencySymbol, currentBudget, allocatedFundsTotal } = useContext(GlobalContext);

  //console.log(currentBudget)

  const budgetCategories = currentBudget.data.budgetCategories;
  
  let allocatedTotalForPeriod = getAllocatedPerPeriod(allocatedFundsTotal / 100, period);
  let netIncomeForPeriod = getNetIncomeForPeriod(currentBudget, period)/100;
  const remaining = (netIncomeForPeriod - allocatedTotalForPeriod).toFixed(2);
  let maxYRange = 0;

  let accumulatedSubTotals = getAccumulatedSubTotals(currentBudget, period);
  
  console.log(accumulatedSubTotals);
  
  const handlePeriodChange = (v) => {
    setPeriod(v);
  };

  //toggle between chart and table
  const handleChangeView = () => {
    setToggleTable(!toggleTable);
  };

  //Chart data
  const filteredCategories = [
    ...new Set(budgetCategories.map((category) => category.category.toLowerCase())),
  ];
  
  //CREATE ARRAY DATA FROM ALLOCATED CATEGORY AMOUNTS
  //creates array of amounts from array of objects
  let dataArray = [];
  
  switch (period) {
    case "daily":
      dataArray = accumulatedSubTotals.map((category) => (category.categoryTotal /100) / 365);
      break;
    case "weekly":
      dataArray = accumulatedSubTotals.map((category) => (category.categoryTotal /100) / 52);
      break;
    case "monthly":
      dataArray = accumulatedSubTotals.map((category) => (category.categoryTotal /100) / 12);
      break;
    case "annually":
      dataArray = accumulatedSubTotals.map((category) => (category.categoryTotal /100));
      break;
    default:
      dataArray = accumulatedSubTotals.map((category) => (category.categoryTotal /100) / 52);
  }

  //set upper ranage of y axis to highest number plus 10%
  maxYRange = Math.max(...dataArray) * 1.1;
  
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
      text: `Budget breakdown by category (${currencySymbol})`,
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
        //#e69a07
        //#656b74
        //#00b4ee
        //rgba(75,192,192,1)
        //rgba(220,220,220,1)

        label: "Budget breakdown",
        backgroundColor: "#e69a07",
        borderColor: "#00b4ee",
        borderWidth: 2,
        hoverBackgroundColor: "#e69a07",
        hoverBorderColor: "#00b4ee",
        barPercentage: 5,
        barThickness: 50,
        maxBarThickness: 50,
        minBarLength: 0,
        data: dataArray,
      },
    ],
  };

  const headings = [
    "Category (C)",
    "Allocated (A) sub-total",
    "Expenditure (E) sub-total",
    "E as % of A",
    "E as % of total A",
  ];

  // const rows = accumulatedSubTotals.map((item) => {
  //   return [
  //     item.category,
  //     item.amount,
  //     (100 / allocatedTotalForPeriod) * item.amount,
  //     (100 / netIncomeForPeriod) * item.amount,
  //   ];
  // });

  // const getTableData = (headerRow, dataRows) => {
  //   let arr2D = [];
  //   arr2D = [headerRow, dataRows];
  //   return arr2D;
  // };

  // const arrData = getTableData(headerRow, rows);

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
                  //width={100}
                  //height={200}
                  options={options}
                />
              </div>
            ) : (
              <Table
                // arrData={arrData}
                headings={headings}
                accumulatedSubTotals={accumulatedSubTotals}
                dataArray={dataArray}
                //allocatedTotalForPeriod={allocatedTotalForPeriod}
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
      padding: 0.7rem 0.7rem 0.5rem 0.7rem;
      background-color: #848586;
      border-radius: 50%;
    }
    .iconSelect:hover {
      transition: transform 1s ease;
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
