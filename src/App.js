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
      <BrowserRouter>
        <Nav />
        <SubNav />
        <Route exact path="/dashboard/:id">
          <Dashboard />
        </Route>
        <Route exact path="/budgets">
          <Budget />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
