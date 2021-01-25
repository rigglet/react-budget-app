import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import styled from "styled-components";
import { motion } from "framer-motion";
//chart
import { Doughnut } from "react-chartjs-2";

const AllocatedRemaining = () => {
  const [period, setPeriod] = useState("weekly");
  const { budgets, currentBudgetId, currencySymbol } = useContext(
    GlobalContext
  );
  const currentBudget = budgets.filter(
    (budget) => budget.id === currentBudgetId
  )[0];
  const budgetItems = currentBudget.data.budgetItems;
  const income = currentBudget.data.income;
  let yearlyAllocated = "";

  //allocated total as a yearly figure
  if (budgetItems.length > 0) {
    yearlyAllocated = budgetItems
      .map((item) => {
        if (item.frequency === "weekly") {
          return item.amount * 52;
        }
        if (item.frequency === "monthly") {
          return item.amount * 12;
        }
        if (item.frequency === "annually") {
          return item.amount;
        }
        return item.amount;
      })
      .reduce((acc, current) => acc + current);
  }

  let subTotal = 0;

  //weekly / monthly /yearly total
  let selectedPeriod = 0;
  switch (period) {
    case "weekly":
      selectedPeriod = income.weeklyNet;
      subTotal = (yearlyAllocated / 52).toFixed(2);
      break;
    case "monthly":
      selectedPeriod = income.monthlyNet;
      subTotal = (yearlyAllocated / 12).toFixed(2);
      break;
    case "annually":
      selectedPeriod = income.yearlyNet;
      subTotal = yearlyAllocated.toFixed(2);
      break;
    default:
      selectedPeriod = income.weeklyNet;
  }

  const remaining = (selectedPeriod - subTotal).toFixed(2);

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };

  //Chart data
  const d = [subTotal, remaining];
  const options = { maintainAspectRatio: true };
  const data = {
    labels: ["Allocated", "Remaining"],
    datasets: [
      {
        backgroundColor: ["#e69a07", "#656b74"],
        borderColor: ["#00b4ee", "#00b4ee"],
        label: "Allocated / Remaining",
        fill: false,
        lineTension: 0.1,
        //backgroundColor: "rgba(75,192,192,0.4)",
        //borderColor: "#e69a07",
        //borderCapStyle: "butt",
        //borderDash: [],
        //borderDashOffset: 0.1,
        //borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: d,
      },
    ],
  };

  return (
    <StyledAllocated>
      <h4>Budget allocated / remaining</h4>
      <div className="data">
        <div className="info">
          <div className="drop">
            <label htmlFor="period">Period:</label>
            <select name="period" onChange={handlePeriodChange}>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="annually">Annually</option>
            </select>
          </div>
          <div className="figures">
            <div className="item">
              <h5>Allocated</h5>
              <span className={subTotal < 0 ? "negative" : "positive"}>
                <span>{currencySymbol}</span>
                {subTotal}
              </span>
            </div>
            <div className="item">
              <h5>Remaining</h5>
              <span className={remaining < 0 ? "negative" : "positive"}>
                <span>{currencySymbol}</span>
                {remaining}
              </span>
            </div>
            <div className="item">
              <h5>Total</h5>
              <span
                id="total"
                className={selectedPeriod < 0 ? "negative" : "positive"}
              >
                <span>{currencySymbol}</span>
                {selectedPeriod}
              </span>
            </div>
          </div>
        </div>
        <div className="chart">
          {remaining > 0 && <Doughnut data={data} options={options} />}
        </div>
      </div>
    </StyledAllocated>
  );
};

const StyledAllocated = styled(motion.div)`
  padding: 1rem;
  width: 100%;
  border-radius: 4px;
  background-color: #39393c;
  color: #848586;

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
    justify-content: space-around;
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .drop {
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

export default AllocatedRemaining;
