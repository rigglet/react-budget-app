import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import styled from "styled-components";
import { motion } from "framer-motion";
//chart
import { Doughnut } from "react-chartjs-2";

const AllocatedRemaining = () => {
  const { budgets, currentBudgetId, updateBudget } = useContext(GlobalContext);
  const currentBudget = budgets.filter(
    (budget) => budget.id === currentBudgetId
  )[0];
  const budgetItems = currentBudget.data.budgetItems;
  const income = currentBudget.data.income;
  const allocated = budgetItems.map((item) => item.amount);
  let subTotal = 0;

  if (allocated.length > 0) {
    subTotal = allocated.reduce((acc, current) => acc + current).toFixed(2);
  }

  const remaining = (income.monthlyNet - subTotal).toFixed(2);
  // const remaining = 0;
  // const allocated = 0;
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
      <div className="figures">
        <h4>Allocated</h4>
        <h4>Remaining</h4>
        <span className="figures" id="allocated">
          £{subTotal}
        </span>
        <span className={remaining < 0 ? "negative" : "figures"} id="remaining">
          £{remaining}
        </span>
      </div>
      <div className="chart">
        <Doughnut data={data} options={options} />
      </div>
    </StyledAllocated>
  );
};

const StyledAllocated = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  width: 100%;
  padding: 1rem;
  width: 50%;
  border-radius: 4px;
  background-color: #39393c;
  color: #848586;
  .figures {
    display: grid;
  }
  /* .header {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
    flex: 1;
    h4 {
      flex: 1;
      padding: 0rem;
    }
  }
  button {
    flex: 1;
  } */
`;

export default AllocatedRemaining;
