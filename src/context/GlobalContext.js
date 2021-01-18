import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  const [budgets, setBudgets] = useState([]);

  return (
    <GlobalContext.Provider value={[budgets, setBudgets]}>
      {props.children}
    </GlobalContext.Provider>
  );
};
