import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { GlobalContext } from "../context/GlobalContext";
import { ImExit } from "react-icons/im";
const Logout = () => {
  const { updateBudgetLoaded } = useContext(GlobalContext);

  return (
    <StyledLogout>
      <div className="close" onClick={() => updateBudgetLoaded(false)}>
        <ImExit className="icon" />
        <p>CLOSE</p>
      </div>
    </StyledLogout>
  );
};

const StyledLogout = styled(motion.div)`
  color: #848586;
  display: flex;

  align-items: center;
  justify-self: flex-end;
  .close {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.5rem;
    color: orange;
    cursor: pointer;
    font-size: 11pt;
    .icon {
      width: 20px;
      height: 20px;
    }
  }
`;

export default Logout;
