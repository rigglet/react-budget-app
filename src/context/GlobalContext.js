import { createContext, useReducer } from "react";
import { reducer } from "./Reducer";

//intialState
const initialState = {
  budgets: [],
  currentBudget: {},
  isBudgetLoaded: false,
};

//create context
export const GlobalContext = createContext(initialState);

//provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //Actions
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
  const addCurrentBudget = (budget) => {
    dispatch({
      type: "ADD_CURRENT_BUDGET",
      payload: budget,
    });
  };
  const removeCurrentBudget = (budget) => {
    dispatch({
      type: "REMOVE_CURRENT_BUDGET",
      payload: budget,
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

  return (
    <GlobalContext.Provider
      value={{
        budgets: state.budgets,
        isBudgetLoaded: state.isBudgetLoaded,
        currentBudget: state.currentBudget,
        deleteBudget,
        addBudget,
        updateBudget,
        loadBudgets,
        addCurrentBudget,
        removeCurrentBudget,
        updateCurrentBudget,
        updateBudgetLoaded,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
