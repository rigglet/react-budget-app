import { createContext, useReducer } from "react";
import { reducer } from "./Reducer";
//import { getWidgets } from "../data";
//intialState
const initialState = {
  budgets: [],
  currentBudgetId: "",
  isBudgetLoaded: false,
  currencySymbol: "£",
};

//create context
export const GlobalContext = createContext(initialState);

//provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //BUDGET Actions
  const loadBudgets = (budgets) => {
    dispatch({
      type: "LOAD_BUDGETS",
      payload: budgets,
    });
  };
  const deleteBudget = (id) => {
    dispatch({
      type: "DELETE_BUDGET",
      payload: id,
    });
  };
  const addBudget = (budget) => {
    dispatch({
      type: "ADD_BUDGET",
      payload: budget,
    });
  };
  const updateBudget = (budget) => {
    dispatch({
      type: "UPDATE_BUDGET",
      payload: budget,
    });
  };
  //BUDGET ITEM ACTIONS
  const addBudgetItem = (budget) => {
    dispatch({
      type: "ADD_BUDGET_ITEM",
      payload: budget,
    });
  };
  const deleteBudgetItem = (id) => {
    dispatch({
      type: "DELETE_BUDGET_ITEM",
      payload: id,
    });
  };

  const updateCurrentBudgetId = (id) => {
    dispatch({
      type: "UPDATE_CURRENT_BUDGET_ID",
      payload: id,
    });
  };

  const updateBudgetLoaded = (loaded) => {
    dispatch({
      type: "UPDATE_ISLOADED",
      payload: loaded,
    });
  };
  // const updateWidgets = (widgets) => {
  //   dispatch({
  //     type: "UPDATE_WIDGETS",
  //     payload: widgets,
  //   });
  // };

  return (
    <GlobalContext.Provider
      value={{
        budgets: state.budgets,
        currentBudgetId: state.currentBudgetId,
        isBudgetLoaded: state.isBudgetLoaded,
        currencySymbol: state.currencySymbol,
        //widgets: state.widgets,
        loadBudgets,
        addBudget,
        deleteBudget,
        updateBudget,
        deleteBudgetItem,
        addBudgetItem,
        updateCurrentBudgetId,
        updateBudgetLoaded,
        //updateWidgets,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
