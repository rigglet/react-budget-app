//context
import { GlobalProvider } from "./context/GlobalContext";

//containers
import Income from "./components/settings/Income";
import Budget from "./components/settings/Budget";
import Summary from "./containers/Settings";
import Budgets from "./containers/Budget";

//components
import Nav from "./components/Nav";

//navigation
import { BrowserRouter, Route } from "react-router-dom";

//styling 
import styled from "styled-components";
import { motion } from "framer-motion";


function App() {
  return (
    <StyledApp>
      <GlobalProvider>
        <BrowserRouter>
          <Nav />
          <Route exact path="/">
            <Budgets />
          </Route>
          
          <Route exact path="/home">
            <Budgets />
          </Route>
          
          {/* <Route exact path="/">
            <Income />
          </Route> */}
          <Route exact path="/income">
            <Income />
          </Route>
          <Route exact path="/budget">
            <Budget />
          </Route>
          <Route path="/summary">
            <Summary />
          </Route>
        </BrowserRouter>
      </GlobalProvider>
    </StyledApp>
  );
}

const StyledApp = styled(motion.div)`
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  `;

export default App;
