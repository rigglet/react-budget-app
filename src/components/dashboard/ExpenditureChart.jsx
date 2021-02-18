import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Doughnut } from "react-chartjs-2";
import { GlobalContext } from "../../context/GlobalContext";
import { getYearlyAllocated, filterByDateRange } from "../../util";

const ExpenditureChart = () => {
  const { dateRange, currentBudget, includeMandatory } = useContext(
    GlobalContext
  );
  const { yearlyNet } = currentBudget.data.income;
  const transactions = currentBudget.data.transactions;
  const dailyNet = yearlyNet / 365;
  const budgetItems = currentBudget.data.budgetItems;
  const filteredBudgetItems = includeMandatory
    ? budgetItems
    : budgetItems.filter((item) => item.mandatory === false);

  const numOfDays = dateRange.to.diff(dateRange.from, "days") + 1;
  const salaryForRange = numOfDays * dailyNet;
  const budgetForRange =
    (numOfDays * getYearlyAllocated(filteredBudgetItems)) / 365;
  const spentAmount = filterByDateRange(transactions, dateRange).reduce(
    (acc, current) => {
      return (
        Number(acc) +
        (current.type === "deposit"
          ? -Math.abs(Number(current.amount))
          : Number(current.amount))
      );
    },
    []
  );

  let remainingBudget = 0;
  budgetForRange - spentAmount < 0
    ? (remainingBudget = 0)
    : (remainingBudget = budgetForRange - spentAmount);

  const remainingSalary = salaryForRange - remainingBudget - spentAmount;

  //Chart data
  const d = [
    Number(spentAmount).toFixed(2),
    Number(remainingBudget).toFixed(2),
    Number(remainingSalary).toFixed(2),
  ];
  const data = {
    labels: ["Spent", "Budget Remaining", "Salary Remaining"],
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
