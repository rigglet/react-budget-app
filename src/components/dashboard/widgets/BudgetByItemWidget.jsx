import { useContext, useState } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import styled from "styled-components";
import { motion } from "framer-motion";
import { formatNumber } from "../../../util";
import AllocatedSelector from "../AllocatedSelector";
import { getNetIncomeForPeriod, getAllocatedPerPeriod } from "../../../util";
import { v4 as uuidv4 } from "uuid";
//icons
import { AiOutlineTable } from "react-icons/ai";
import { GoGraph } from "react-icons/go";
//chart
import { Pie } from "react-chartjs-2";

const BudgetByItemWidget = () => {
  const [toggleTable, setToggleTable] = useState(false);
  const [period, setPeriod] = useState("daily");
  const { currencySymbol, currentBudget } = useContext(GlobalContext);
  const budgetItems = currentBudget.data.budgetItems;
  let netIncomeForPeriod = getNetIncomeForPeriod(currentBudget, period);
  let totalAllocatedForPeriod = getAllocatedPerPeriod(currentBudget, period);

  //let subTotal = getAllocatedPerPeriod(currentBudget, period);
  //let selectedPeriod = getNetIncomeForPeriod(currentBudget, period);
  const remaining = (netIncomeForPeriod - totalAllocatedForPeriod).toFixed(2);

  const handlePeriodChange = (v) => {
    setPeriod(v);
  };

  //toggle beteen chart and table
  const handleChangeView = () => {
    setToggleTable(!toggleTable);
  };

  const getItemAmountPerYear = (amount, frequency) => {
    switch (frequency) {
      case "daily":
        return amount * 365;
      case "weekly":
        return amount * 52;
      case "monthly":
        return amount * 12;
      case "annually":
        return amount;
      default:
        return amount;
    }
  };

  //pass in YEARLY AMOUNT
  //selected period comes from period hook
  const getItemAmountPerPeriod = (yearlyAmount) => {
    switch (period) {
      case "daily":
        return yearlyAmount / 365;
      case "weekly":
        return yearlyAmount / 52;
      case "monthly":
        return yearlyAmount / 12;
      case "annually":
        return yearlyAmount;
      default:
        return yearlyAmount;
    }
  };

  //TABLE DATA
  const rows = budgetItems.map((item) => {
    return [
      item.category,
      item.item,
      getItemAmountPerPeriod(getItemAmountPerYear(item.amount, item.frequency)),
      (100 / totalAllocatedForPeriod) *
        getItemAmountPerPeriod(
          getItemAmountPerYear(item.amount, item.frequency)
        ),
      (100 / netIncomeForPeriod) *
        getItemAmountPerPeriod(
          getItemAmountPerYear(item.amount, item.frequency)
        ),
    ];
  });

  //CHART DATA
  const d = rows.map((item) => {
    return item[4].toFixed(2);
  });
  const l = budgetItems.map((item) => item.item);

  const options = {
    title: {
      display: true,
      text: `Budget breakdown by category (${currencySymbol})`,
      position: "bottom",
      fontSize: 16,
      fontStyle: "bold",
    },
  };

  const data = {
    labels: l,
    datasets: [
      {
        borderColor: ["#00b4ee", "#00b4ee"],
        label: "Allocated / Remaining",
        fill: true,
        lineTension: 0.1,
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 0.5,
        pointHoverRadius: 1,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 1,
        pointRadius: 1,
        pointHitRadius: 1,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
        ],
        hoverBackgroundColor: ["#628bb4"],
        data: d,
      },
    ],
  };

  return (
    <StyledBreakdown>
      <div className="heading">
        <h4>Budget breakdown by item</h4>
        {currentBudget.data.income.yearlyNet > 0 &&
          currentBudget.data.budgetItems.length > 0 && (
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
      //TODO: Chart not displaying data correctly
      {currentBudget.data.income.yearlyNet > 0 &&
      currentBudget.data.budgetItems.length > 0 ? (
        <div className="data">
          {toggleTable ? (
            <div className="chart">
              <Pie data={data} options={options} />
            </div>
          ) : (
            <div className="info">
              <AllocatedSelector
                period={period}
                handlePeriodChange={handlePeriodChange}
                subTotal={totalAllocatedForPeriod}
                remaining={remaining}
                selectedPeriod={netIncomeForPeriod}
              />
              <div className="table">
                <table>
                  <thead>
                    <tr>
                      <th>
                        <h5>Category</h5>
                      </th>
                      <th>
                        <h5>Item</h5>
                      </th>
                      <th>
                        <h5>Item sub-total</h5>
                      </th>
                      <th>
                        <h5>% of allocated</h5>
                      </th>
                      <th>
                        <h5>% of total</h5>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows
                      .sort((a, b) => (a[2] < b[2] ? 1 : -1))
                      .map((budgetItem, i) => (
                        <tr key={uuidv4()}>
                          <td>
                            <p className="tableItem">{budgetItem[0]}</p>
                          </td>
                          <td>
                            <p className="tableItem">{budgetItem[1]}</p>
                          </td>
                          <td>
                            <p className="tableItem">
                              <span className="symbol">{currencySymbol} </span>
                              {formatNumber(budgetItem[2])}
                            </p>
                          </td>
                          <td>
                            <p className="tableItem">
                              {formatNumber(budgetItem[3])} %
                            </p>
                          </td>
                          <td>
                            <p className="tableItem">
                              {formatNumber(budgetItem[4])} %
                            </p>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
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
  padding: 1rem;
  border-radius: 4px;
  background-color: #39393c;
  color: #848586;
  width: 100%;
  .info,
  .chart {
    width: 100%;
  }
  .heading {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .icon {
      width: 25px;
      height: 25px;
      color: white;
      cursor: pointer;
    }
  }

  h4 {
    color: white;
    font-weight: 500;
    margin-bottom: 1rem;
  }
  .data {
    display: flex;
    flex-direction: column;
    align-items: center;
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
  table {
    width: 100%;
    .tableItem {
      text-transform: capitalize;
    }
    th {
      text-align: center;
    }
    td {
      text-align: center;
      //min-width: 30%;
    }
  }
`;

export default BudgetByItemWidget;
