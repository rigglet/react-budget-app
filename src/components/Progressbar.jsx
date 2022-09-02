import styled from "styled-components";
import { motion } from "framer-motion";

const Progressbar = ({percentage}) => {
    console.log(percentage);
    const progressColor = percentage < 33 ? "#5ab55b" : percentage < 66 ? "#bd8154" : "#c75454";
    
    return (
    <StyledProgressBar width={percentage} progressColor={progressColor}>
          <div className="value"></div>
    </StyledProgressBar>
  )
}

const StyledProgressBar = styled(motion.div)`
    position: relative;
    width: 100%;
    height: 15px;
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
`;

export default Progressbar;