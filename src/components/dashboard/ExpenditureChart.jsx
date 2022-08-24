import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Doughnut } from "react-chartjs-2";
import { GlobalContext } from "../../context/GlobalContext";
// import { getYearlyAllocated, filterTransactionsByDateRange } from "../../util";

const ExpenditureChart = ({
  spentAmountGraph,
  remainingSalaryGraph,
  remainingBudgetGraph,
}) => {
  const { currencySymbol } = useContext(GlobalContext);
  // console.log(spentAmountGraph);
  // console.log(remainingBudgetGraph);
  // console.log(remainingSalaryGraph);

  //Chart data
  const d = [
    Number(spentAmountGraph).toFixed(2),
    Number(remainingBudgetGraph).toFixed(2),
    Number(remainingSalaryGraph).toFixed(2),
  ];
  const data = {
    labels: [
      `Spent ${currencySymbol}`,
      `Budget Remaining ${currencySymbol}`,
      `Salary Excess ${currencySymbol}`,
    ],
    datasets: [
      {
        backgroundColor: ["#e69a07", "#193e4c", "#656b74"],
        borderColor: ["#00b4ee", "#00b4ee", "#00b4ee"],
        label: "Spent / Budget / Salary",
        fill: false,
        lineTension: 0.1,
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
    <StyledExpenditureChart>
      <div className="chart">
        <Doughnut data={data} />
      </div>
    </StyledExpenditureChart>
  );
};

const StyledExpenditureChart = styled(motion.div)``;

export default ExpenditureChart;
