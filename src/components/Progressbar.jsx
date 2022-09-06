import styled from "styled-components";
import { motion } from "framer-motion";

const Progressbar = ({ percentage }) => {
    if (percentage > 100) percentage = 100;
    const progressColor = percentage < 33 ? "#5ab55b" : percentage < 66 ? "#bd8154" : "#c75454";
    
    return (
    <StyledProgressBar width={percentage} progressColor={progressColor}>
            <div className="value"></div>
            <h5 className="percentage"><span className="number">{Number(percentage).toFixed()}%</span></h5>
    </StyledProgressBar>
  )
}

const StyledProgressBar = styled(motion.div)`
    position: relative;
    width: 100%;
    height: 20px;
    background-color: #aeaeae;
    border-radius: 4px;

    .value{
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        border-radius: 4px;
        width: ${({ width }) => (width)}%;
        background-color: ${({ progressColor }) => (progressColor)};
    }
    .percentage{
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        .number{
            color: #313131;
        }
    }

`;

export default Progressbar;