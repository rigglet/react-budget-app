export const reducer = (state, action) => {
  const ACTIONS = {
    loadBudgets: "LOAD_BUDGETS",
    addBudget: "ADD_BUDGET",
    deleteBudget: "DELETE_BUDGET",
    updateBudget: "UPDATE_BUDGET",
    addBudgetItem: "ADD_BUDGET_ITEM",
    deleteBudgetItem: "DELETE_BUDGET_ITEM",
    updateCurrentBudgetId: "UPDATE_CURRENT_BUDGET_ID",
    updateCurrentBudget: "UPDATE_CURRENT_BUDGET",
    updateBudgetLoaded: "UPDATE_ISLOADED",
    updateDateRange: "UPDATE_RANGE",

    //updateWidgets: "UPDATE_WIDGETS",
  };

  switch (action.type) {
    //BUDGETS ACTIONS
    case ACTIONS.loadBudgets:
      return {
        ...state,
        budgets: [...action.payload],
      };
    case ACTIONS.addBudget:
      return {
        ...state,
        budgets: [action.payload, ...state.budgets],
      };
    case ACTIONS.deleteBudget:
      return {
        ...state,
        budgets: state.budgets.filter((item) => item.id !== action.payload),
      };
    case ACTIONS.updateBudget:
      //const bi = state.budgets.filter((item) => item.id !== action.payload.id);
      return {
        ...state,
        budgets: [
          ...state.budgets.filter((budget) => budget.id !== action.payload.id),
          action.payload,
        ],
      };

    //OTHER
    case ACTIONS.updateCurrentBudgetId:
      return {
        ...state,
        currentBudgetId: action.payload,
      };
    case ACTIONS.updateCurrentBudget:
      return {
        ...state,
        currentBudget: action.payload,
      };
    case ACTIONS.updateBudgetLoaded:
      return {
        ...state,
        isBudgetLoaded: action.payload,
      };
    case ACTIONS.updateDateRange:
      return {
        ...state,
        range: action.payload,
      };

    default:
      return state;
  }
};
