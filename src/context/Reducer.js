export const reducer = (state, action) => {
  const ACTIONS = {
    deleteBudget: "DELETE_BUDGET",
    addBudget: "ADD_BUDGET",
    updateBudget: "UPDATE_BUDGET",
    loadBudgets: "LOAD_BUDGETS",
    addCurrentBudget: "ADD_CURRENT_BUDGET",
    deleteCurrentBudget: "DELETE_CURRENT_BUDGET",
    updateCurrentBudget: "UPDATE_CURRENT_BUDGET",
    updateBudgetLoaded: "UDATE_ISLOADED",
  };

  switch (action.type) {
    //BUDGETS ACTIONS
    case ACTIONS.deleteBudget:
      return {
        ...state,
        budgets: state.budgets.filter((item) => item.id !== action.payload),
      };
    case ACTIONS.addBudget:
      return {
        ...state,
        budgets: [action.payload, ...state.budgets],
      };
    case ACTIONS.updateBudget:
      const bi = state.budgets.filter((item) => item.id !== action.payload.id);
      return {
        ...state,
        budgets: [action.payload, ...bi],
      };
    case ACTIONS.loadBudgets:
      return {
        ...state,
        budgets: [...action.payload],
      };
    case ACTIONS.addCurrentBudget:
      return {
        ...state,
        currentBudget: action.payload,
      };
    case ACTIONS.deleteCurrentBudget:
      return {
        ...state,
        currentBudget: [],
      };
    case ACTIONS.updateCurrentBudget:
      return {
        ...state,
        currentBudget: [...state.currentBudget],
      };
    case ACTIONS.updateBudgetLoaded:
      return {
        ...state,
        isBudgetLoaded: action.payload,
      };
    default:
      return state;
  }
};
