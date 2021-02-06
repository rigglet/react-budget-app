import styled from "styled-components";
import { motion } from "framer-motion";
import { Doughnut } from "react-chartjs-2";

const AllocatedChart = ({ selectedPeriod, subTotal }) => {
  const remaining = (selectedPeriod - subTotal).toFixed(2);

  //Chart data
  const d = [subTotal, remaining];
  const data = {
    labels: ["Allocated", "Remaining"],
    datasets: [
      {
        backgroundColor: ["#e69a07", "#656b74"],
        borderColor: ["#00b4ee", "#00b4ee"],
        label: "Allocated / Remaining",
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
    <StyledAllocated>
      <div className="chart">
        <Doughnut data={data} />
      </div>
    </StyledAllocated>
  );
};

const StyledAllocated = styled(motion.div)``;

export default AllocatedChart;
