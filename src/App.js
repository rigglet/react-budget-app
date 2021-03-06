//context
import { GlobalProvider } from "./context/GlobalContext";

//containers
import Budget from "./containers/Budget";
import Dashboard from "./containers/Dashboard";
import Settings from "./containers/Settings";
import Splash from "./containers/Splash";
import AppSettings from "./containers/AppSettings";
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
          <Route exact path="/home">
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
          <Route exact path="/appSettings">
            <AppSettings />
          </Route>
        </BrowserRouter>
      </GlobalProvider>
    </div>
  );
}

export default App;
