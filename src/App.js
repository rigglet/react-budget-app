//context
import { GlobalProvider } from "./context/GlobalContext";

//containers
import Budget from "./containers/Budget";
import Dashboard from "./containers/Dashboard";

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
