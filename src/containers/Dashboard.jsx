import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { GlobalContext } from "../context/GlobalContext";
import { useLocation } from "react-router-dom";
import { getWidget } from "../util";
import ConfigureDash from "../components/dashboard/ConfigureDash";
import DashSidebar from "../components/DashSidebar";

const Dashboard = () => {
  //TODO: drag and drop widgets
  const location = useLocation();
  const subMenu = location.pathname.split("/")[3];
  const { currentBudget } = useContext(GlobalContext);
  const widgets = currentBudget.widgets;

  const checkForSelectedWidgets = (widgetSet) => {
    let bln = false;
    widgetSet.forEach((item) => (item.selected ? (bln = true) : (bln = false)));
    return bln;
  };

  let [blnDisplayingWidgets, setDisplayingWidgets] = useState(false);

  useEffect(() => {
    if (
      checkForSelectedWidgets(widgets.incomeWidgets) ||
      checkForSelectedWidgets(widgets.budgetWidgets) ||
      checkForSelectedWidgets(widgets.expenditureWidgets) ||
      checkForSelectedWidgets(widgets.trackerWidgets)
    ) {
      //console.log("UE");
      setDisplayingWidgets(true);
    } else {
      setDisplayingWidgets(false);
    }
  }, [widgets]);

  return (
    <StyledDashboard>
      <div className="left">
        <DashSidebar />
      </div>
      <div className="main">
        {subMenu === "view" && (
          <>
            <h3>Dashboard</h3>
            <div className="widgets">
              {blnDisplayingWidgets ? (
                <>
                  <div className="income">
                    {
                      //INCOME WIDGETS
                      widgets.incomeWidgets
                        .sort((a, b) => (a.name > b.name ? 1 : -1))
                        .map((item) => {
                          if (item.selected) {
                            return getWidget(item.name);
                          }
                          return undefined;
                        })
                    }
                  </div>
                  <div className="budgets">
                    {
                      //BUDGET WIDGETS
                      widgets.budgetWidgets
                        .sort((a, b) => (a.name > b.name ? 1 : -1))
                        .map((item) => {
                          if (item.selected) {
                            return getWidget(item.name);
                          }
                          return undefined;
                        })
                    }
                  </div>
                  <div className="expenditure">
                    {
                      //EXPENDITURE WIDGETS
                      widgets.expenditureWidgets
                        .sort((a, b) => (a.name > b.name ? 1 : -1))
                        .map((item) => {
                          if (item.selected) {
                            return getWidget(item.name);
                          }
                          return undefined;
                        })
                    }
                  </div>
                  <div className="tracker">
                    {
                      //TRACKER WIDGETS
                      widgets.trackerWidgets
                        .sort((a, b) => (a.name > b.name ? 1 : -1))
                        .map((item) => {
                          if (item.selected) {
                            return getWidget(item.name);
                          }
                          return undefined;
                        })
                    }
                  </div>
                </>
              ) : (
                <div className="noDataMsg">
                  <h1>No widgets selected</h1>
                  <p>Please click settings to select widgets</p>
                </div>
              )}
            </div>
          </>
        )}
        {subMenu === "settings" && (
          <>
            <h3>Settings</h3>
            <div className="widgets">
              <ConfigureDash />
            </div>
          </>
        )}
      </div>
      <div className="right"></div>
    </StyledDashboard>
  );
};

const StyledDashboard = styled(motion.div)`
  margin: 1rem;
  width: 100vw;
  height: 80vh;
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
    h3 {
      margin-bottom: 1rem;
      color: white;
    }
    .widgets {
      grid-area: main;
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      flex-direction: column;
      margin-bottom: 1rem;
      .income,
      .budgets,
      .expenditure,
      .tracker {
        width: 100%;
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        //flex-direction: column;
      }
    }
  }
  .right {
    grid-area: right;
  }
`;

export default Dashboard;
