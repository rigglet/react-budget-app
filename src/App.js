//context
import { GlobalProvider } from "./context/GlobalContext";

//containers
import Budget from "./containers/Budget";
import Summary from "./containers/Settings";
import Income from "./components/settings/Income";

//components
import Nav from "./components/Nav";

//navigation
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <BrowserRouter>
          <Nav />
          <Route exact path="/">
            <Income />
          </Route>
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
    </div>
  );
}

export default App;
