export const reducer = (state, action) => {
  const ACTIONS = {
    loadBudgets: "LOAD_BUDGETS",
    addBudget: "ADD_BUDGET",
    deleteBudget: "DELETE_BUDGET",
    updateBudget: "UPDATE_BUDGET",
    addBudgetItem: "ADD_BUDGET_ITEM",
    deleteBudgetItem: "DELETE_BUDGET_ITEM",
    updateCurrentBudgetId: "UPDATE_CURRENT_BUDGET_ID",
    updateBudgetLoaded: "UPDATE_ISLOADED",
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
    //BUDGET ITEM
    // case ACTIONS.addBudgetItem:
    //   return {
    //     ...state,
    //     data: { income: { ...formIncome } },
    //     budgetItems: {state.budgets.filter((item) => item.id === state.currentBudgetId)},
    //   };
    // case ACTIONS.deleteBudgetItem:
    //   return {
    //     ...state,
    //     budgetId: action.payload,
    //   };
    //OTHER
    case ACTIONS.updateCurrentBudgetId:
      return {
        ...state,
        currentBudgetId: action.payload,
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
