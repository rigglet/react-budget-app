//context
import { GlobalProvider } from "./context/GlobalContext";

//containers
import Budget from "./containers/Budget";
import Dashboard from "./containers/Dashboard";
import Settings from "./containers/Settings";
import Splash from "./containers/Splash";

//components
import Nav from "./components/Nav";
import SubNav from "./components/SubNav";
//navigation
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <BrowserRouter>
          <Nav />
          <SubNav />
          <Route exact path="/">
            <Splash />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/budgets">
            <Budget />
          </Route>
        </BrowserRouter>
      </GlobalProvider>
    </div>
  );
}

export default App;
