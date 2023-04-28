import styled from "styled-components";
import { motion } from "framer-motion";

const Progressbar = ({ percentage }) => {
   let totalBarLength = 100;
   let markerPosition = 100;
   let indicatorBarWidth = percentage;

   if (percentage > 100) {
      indicatorBarWidth = 100;
      markerPosition = (100 / percentage) * 100;
   }

   const progressColor =
      percentage < 33 ? "#7eb47f" : percentage < 66 ? "#bc9373" : "#c07676";

   return (
      <StyledProgressBar
         markerPosition={markerPosition}
         totalBarLength={totalBarLength}
         indicatorBarWidth={indicatorBarWidth}
         progressColor={progressColor}
      >
         <h5 className="indicator-bar">
            <span className="number">{Number(percentage).toFixed()}%</span>
         </h5>
         <div className="marker"></div>
         <h5 className="container-bar"></h5>
      </StyledProgressBar>
   );
};

const StyledProgressBar = styled(motion.div)`
   position: relative;
   width: 100%;
   height: 20px;
   background-color: #aeaeae;
   border-radius: 4px;

   .marker {
      z-index: 10;
      position: absolute;
      top: 0;
      left: ${({ markerPosition }) => markerPosition}%;
      transform: translateX(-50%);
      height: 100%;
      border-radius: 4px;
      width: 5px;
      background-color: #b40505;
      border-right: 1px solid black;
   }
   .indicator-bar {
      z-index: 5;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      border-radius: 4px;
      width: ${({ indicatorBarWidth }) => indicatorBarWidth}%;
      background-color: ${({ progressColor }) => progressColor};
      border-right: 1px solid black;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 0.5rem;
   }
   .container-bar {
      border: 1px solid black;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      border-radius: 4px;
   }
   .number {
      color: black;
      //${({ markerPosition }) => markerPosition}%;
      transform: translateX(
         ${({ indicatorBarWidth }) => (indicatorBarWidth < 5 ? "200%" : "0px")}
      );
      //border: 1px solid red;
   }
`;

export default Progressbar;
