import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { v4 } from "uuid";

const BarSection = ({ width, progressColor, children, name }) => {
   const [tooltipShow, setTooltipShow] = useState(false);
   return (
      <StyledBarSection
         progressColor={progressColor}
         width={width}
         children={children}
         onMouseOver={() => setTooltipShow(true)}
         onMouseLeave={() => setTooltipShow(false)}
      >
         {tooltipShow && (
            <div className="tooltip">
               <p>{name}</p>
               <p>{Number(width).toFixed(2)}%</p>
            </div>
         )}

         {children}
      </StyledBarSection>
   );
};

const MultipartProgressbar = ({ percentages }) => {
   const arrBarSections = percentages.map((section) => {
      return (
         <BarSection
            name={section.category}
            width={section.percentage}
            progressColor={section.color}
            key={v4()}
         ></BarSection>
      );
   });

   return (
      <StyledMultipartProgressbar>{arrBarSections}</StyledMultipartProgressbar>
   );
};

const StyledBarSection = styled.div`
   display: inline-block;
   height: 100%;
   border-radius: 4px;
   //background: pink;
   width: ${({ width }) => width}%;
   background: ${({ progressColor }) => progressColor};
   //border-right: 1px solid black;
   border: 1px solid black;
   position: relative;

   .tooltip {
      border: 2px solid white;
      border-radius: 0 4px 4px 4px;
      position: absolute;
      top: 10px;
      left: 10px;
      background: #313131;
      z-index: 10;
      padding: 0.25rem;
      text-transform: uppercase;
      display: flex;
      flex-direction: column;
      align-items: center;
   }
   p {
      color: whitesmoke;
      text-align: center;
   }
`;

const StyledMultipartProgressbar = styled(motion.div)`
   position: relative;
   width: 100%;
   height: 20px;
   background-color: #aeaeae;
   border-radius: 4px;

   .section {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      border-radius: 4px;
      width: ${({ width }) => width}%;
      background-color: ${({ progressColor }) => progressColor};
      border-right: 1px solid black;
      border: 1px solid red;
   }
   .percentage {
      border: 1px solid black;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      .number {
         color: #313131;
      }
   }
`;

export default MultipartProgressbar;
