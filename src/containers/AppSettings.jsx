import styled from "styled-components";
import { motion } from "framer-motion";
import ApplicationSettings from "../components/appSettings/ApplicationSettings";

const AppSettings = () => {
  return (
    <StyledAppSettings>
      <div className="left"></div>
      <div className="main">
        <h3>Application Settings</h3>
        <ApplicationSettings />
      </div>
      <div className="right"></div>
    </StyledAppSettings>
  );
};

const StyledAppSettings = styled(motion.div)`
  margin: 1rem;
  width: 100vw;
  //height: 80vh;
  background-color: #1f2023;
  color: #848586;
  display: grid;
  grid-template-columns: 15vw auto 10vw;
  grid-template-rows: auto;
  grid-template-areas: "left main right";
  grid-column-gap: 2rem;
  .left {
    grid-area: left;
  }
  .main {
    grid-area: main;
    display: flex;
    flex-direction: column;
    //align-items: center;

    h3 {
      margin-bottom: 1rem;
      color: white;
    }
  }
  .right {
    grid-area: right;
  }
`;

export default AppSettings;
