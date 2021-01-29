export const saveBudgetLocally = (budgets, newBudget) => {
  window.localStorage.setItem(
    "EXPENSE-APP",
    JSON.stringify([...budgets, newBudget])
  );
};

export const updateBudgetLocally = (budgets, updateBudget) => {
  // console.log({ updateBudget });
  // console.log(updateBudget.id);

  //const subSet = budgets.map((b) => console.log(b.id));
  const subSet = budgets.filter((b) => b.id !== updateBudget.id);
  //console.log({ subSet });
  window.localStorage.setItem(
    "EXPENSE-APP",
    JSON.stringify([...subSet, updateBudget])
  );
};
export const updateWidgetsLocally = (widgets) => {
  window.localStorage.setItem(
    "EXPENSE-APP-SETTINGS",
    JSON.stringify([...widgets])
  );
};
