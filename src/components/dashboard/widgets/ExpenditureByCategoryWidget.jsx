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
  const [period, setPeriod] = useState("daily");
  const { currencySymbol, currentBudget } = useContext(GlobalContext);

  console.log(currentBudget)

  // const budgetCategories = currentBudget.data.budgetCategories;
  // //let subTotal = getAllocatedPerPeriod(currentBudget, period);
  // //let selectedPeriod = getNetIncomeForPeriod(currentBudget, period);
  let subTotal = 100;
  let selectedPeriod = currentBudget.data.income.annualNet;
  // const remaining = (selectedPeriod - subTotal).toFixed(2);
  let maxYRange = 0;

  // //let accumulatedSubTotals = getAccumulatedSubTotals(currentBudget);
  let accumulatedSubTotals = [10, 20, 30, 40, 50];

  const handlePeriodChange = (v) => {
    setPeriod(v);
  };

  //toggle between chart and table
  const handleChangeView = () => {
    setToggleTable(!toggleTable);
  };

  // //Chart data
  // const filteredCategories = [
  //   ...new Set(budgetCategories.map((b) => b.category.toLowerCase())),
  // ];
  
  // //CREATE ARRAY DATA FROM YEARLY ACCUMULATED TOTALS
  let dataArray = [];
  dataArray = [1,2,3,4,5]
  // switch (period) {
  //   case "daily":
  //     dataArray = accumulatedSubTotals.map((category) => category.amount / 365);
  //     break;
  //   case "weekly":
  //     dataArray = accumulatedSubTotals.map((category) => category.amount / 52);
  //     break;
  //   case "monthly":
  //     dataArray = accumulatedSubTotals.map((category) => category.amount / 12);
  //     break;
  //   case "annually":
  //     dataArray = accumulatedSubTotals.map((category) => category.amount);
  //     break;
  //   default:
  //     dataArray = accumulatedSubTotals.map((category) => category.amount / 52);
  // }

  // //set upper ranage of y axis to highest number plus 10%
  //maxYRange = Math.max(...dataArray) * 1.1;
  maxYRange = 100;

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
    //labels: filteredCategories,
    labels: ["a","b","c","d","e"],
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

  const headerRow = [
    "Category",
    "Category sub-total",
    "% of allocated",
    "% of total",
  ];

  // const rows = accumulatedSubTotals.map((item) => {
  //   return [
  //     item.category,
  //     item.amount,
  //     (100 / subTotal) * item.amount,
  //     (100 / selectedPeriod) * item.amount,
  //   ];
  // });
  const rows = [["cat", 1, 1, 2]]

  const getTableData = (headerRow, dataRows) => {
    let arr2D = [];
    arr2D = [headerRow, dataRows];
    return arr2D;
  };

  const arrData = getTableData(headerRow, rows);
  // console.log(arrData);

  return (
    <StyledBreakdown>
      <div className="heading">
        <h4>Budget breakdown by category</h4>
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
            <Table
                arrData={arrData}
                accumulatedSubTotals={accumulatedSubTotals}
                data={dataArray}
                allocated={subTotal}
                total={selectedPeriod}
              />
          {/* <AllocatedSelector
            period={period}
            handlePeriodChange={handlePeriodChange}
            subTotal={subTotal}
            remaining={remaining}
            selectedPeriod={selectedPeriod}
          /> */}
          {/* <div className="data">
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
                arrData={arrData}
                accumulatedSubTotals={accumulatedSubTotals}
                data={dataArray}
                allocated={subTotal}
                total={selectedPeriod}
              />
            )}
          </div>
        */}
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
  &:hover {
    //transform: scaleX(0.6) rotate(10deg);
    /* -webkit-perspective: 1000px;
    transform-style: preserve-3d;
    transform: rotateX(45deg); */
    transition: transform 1s ease;
  }
  padding: 1rem;
  min-width: 50%;
  flex-grow: stretch;
  //min-height: 50vh;
  //max-height: 40vh;
  border-radius: 4px;
  background-color: #39393c;
  color: #848586;
  width: 100%;
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
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
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
