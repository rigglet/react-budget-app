import { createContext, useReducer } from "react";
import { reducer } from "./Reducer";
//import { getWidgets } from "../data";
import moment from "moment";

//TODO: this could be an application setting
// Set Monday as first day of the week.
moment.updateLocale("en", {
  week: {
    dow: 1,
  },
});

//intialState
const initialState = {
  budgets: [],
  currentBudgetId: "",
  currentBudget: {},
  isBudgetLoaded: false,
  includeMandatory: false,
  includeDisposableOnly: false,
  currencySymbol: "£",
  dateRange: {
    from: moment().startOf("month"),
    to: moment().endOf("month"),
  },
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
  const updateCurrentBudget = (budget) => {
    dispatch({
      type: "UPDATE_CURRENT_BUDGET",
      payload: budget,
    });
  };

  const updateBudgetLoaded = (loaded) => {
    dispatch({
      type: "UPDATE_ISLOADED",
      payload: loaded,
    });
  };
  const updateIncludeMandatory = (include) => {
    dispatch({
      type: "UPDATE_INCLUDE_MANDATORY",
      payload: include,
    });
  };
  const updateIncludeDisposableOnly = (include) => {
    dispatch({
      type: "UPDATE_DISPOSABLE",
      payload: include,
    });
  };

  const updateDateRange = (range) => {
    dispatch({
      type: "UPDATE_RANGE",
      payload: range,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        budgets: state.budgets,
        currentBudgetId: state.currentBudgetId,
        currentBudget: state.currentBudget,
        isBudgetLoaded: state.isBudgetLoaded,
        includeMandatory: state.includeMandatory,
        includeDisposableOnly: state.includeDisposableOnly,
        currencySymbol: state.currencySymbol,
        dateRange: state.dateRange,
        loadBudgets,
        addBudget,
        deleteBudget,
        updateBudget,
        deleteBudgetItem,
        addBudgetItem,
        updateCurrentBudgetId,
        updateCurrentBudget,
        updateBudgetLoaded,
        updateDateRange,
        updateIncludeMandatory,
        updateIncludeDisposableOnly,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
