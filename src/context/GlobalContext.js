import { createContext, useReducer } from "react";
import { reducer } from "./Reducer";

//intialState
const initialState = {
  budgets: [],
  currentBudget: {
    data: {
      income: {
        annualGross: 0,
        taxFreeAllowance: 0,
        taxable: 0,
        incomeTax: 0,
        nationalInsurance: 0,
        totalDeductions: 0,
        annualNet: 0,
        monthlyNet: 0,
        weeklyNet: 0,
      },
      budgetCategories: 
        [
          {
            name: "uncategorised",
            total: 0,
          }
        ]
    },
  },
  
  currentBudgetId: "",
  isBudgetLoaded: false,
  includeMandatory: false,
  includeDisposableOnly: false,
  currencySymbol: "£",
  allocatedFundsTotal: 0,
};

//create context
export const GlobalContext = createContext(initialState);

//provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //BUDGET Actions
  const updateAllocatedFunds = (allocated) => {
    dispatch({
      type: "UPDATE_ALLOCATED",
      payload: allocated,
    });
  };
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
        income: state.income,
        budgets: state.budgets,
        currentBudgetId: state.currentBudgetId,
        currentBudget: state.currentBudget,
        isBudgetLoaded: state.isBudgetLoaded,
        includeMandatory: state.includeMandatory,
        includeDisposableOnly: state.includeDisposableOnly,
        currencySymbol: state.currencySymbol,
        dateRange: state.dateRange,
        allocatedFundsTotal: state.allocatedFundsTotal,
        updateAllocatedFunds,
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
