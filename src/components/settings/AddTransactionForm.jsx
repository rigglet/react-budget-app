import { useState, useContext } from "react";
//style
import styled from "styled-components";
import { motion } from "framer-motion";
//message components
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateBudgetLocally, getToday } from "../../util";
//context
import { GlobalContext } from "../../context/GlobalContext";
//UUID inique ID generator
import { v4 as uuidv4 } from "uuid";

//TODO: Add dropdown to select whether transaction comes from d/w/m/y budget
const AddTransactionForm = () => {
  const {
    updateBudget,
    currentBudget,
    updateCurrentBudget,
    budgets,
  } = useContext(GlobalContext);

  const date = getToday();

  const [formData, setFormData] = useState({
    category: "",
    item: "",
    date: date,
    amount: 0.0,
    type: "withdrawal",
  });

  const notify = (type) => {
    switch (type) {
      case "ADDED":
        toast.dark("Transaction Added");
        break;
      case "INVALID":
        toast.warn(
          "Please enter a name and description longer than 5 characters",
          { color: "black" }
        );
        break;
      default:
        toast.dark("Nothing to report");
    }
  };

  const handleValidation = (formData) => {
    let valid = true;
    //console.log(formData.name.length);
    // if (formData.name.length < 5 || formData.description.length < 5) {
    //   valid = false;
    // }
    return valid;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // const signedAmount = 0;
    // signedAmount =
    //   formData.amount > 0
    //     ? (signedAmount = Number(formData.amount))
    //     : (signedAmount = Number(-Math.abs(formData.amount)));

    if (handleValidation(formData)) {
      const newTransaction = {
        id: uuidv4(),
        category: formData.category,
        item: formData.item,
        date: formData.date,
        type: formData.type,
        amount: formData.amount,
      };

      const transactions = currentBudget.data.transactions;

      //add budget to app context
      updateBudget({
        ...currentBudget,
        data: {
          ...currentBudget.data,
          transactions: [...transactions, newTransaction],
        },
      });

      //update current budget
      updateCurrentBudget({
        ...currentBudget,
        data: {
          ...currentBudget.data,
          transactions: [...transactions, newTransaction],
        },
      });

      //save budget to local storage
      updateBudgetLocally(budgets, {
        ...currentBudget,
        data: {
          ...currentBudget.data,
          transactions: [...transactions, newTransaction],
        },
      });

      //reset form
      setFormData({
        category: "",
        item: "",
        date: date,
        amount: "0.00",
        type: "withdrawal",
      });
      notify("ADDED");
    } else {
      notify("INVALID");
    }
  };

  const typeOptions = [
    { name: "Deposit", value: "deposit" },
    { name: "Withdrawal", value: "withdrawal" },
  ];

  return (
    <StyledAddTransactionForm>
      <ToastContainer
        closeButton={false}
        transition={Zoom}
        position="bottom-center"
        draggable={false}
        pauseOnHover
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
      />

      <h4>New Transaction</h4>
      <form>
        <fieldset>
          <label>Date:</label>
          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
          />
          <label>Type:</label>
          <select onChange={handleChange} value={formData.type} name="type">
            {typeOptions.map((opt) => (
              <option value={opt.value} key={opt.name}>
                {opt.name}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset>
          <label>Category:</label>
          <input
            name="category"
            type="text"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category..."
          />
          <label>Item:</label>
          <input
            name="item"
            type="text"
            value={formData.item}
            onChange={handleChange}
            placeholder="item..."
          />
          <label>Amount:</label>

          <input
            name="amount"
            type="number"
            min="0"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount..."
          />
          <button className="button" onClick={onSubmit}>
            Add
          </button>
        </fieldset>
      </form>
    </StyledAddTransactionForm>
  );
};

const StyledAddTransactionForm = styled(motion.div)`
  padding: 1rem;
  width: 100%;
  border-radius: 4px;
  background-color: #39393c;
  color: #848586;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  //margin-top: 1rem;
  fieldset {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    border-radius: 4px;
    //justify-content: space-between;
  }
  fieldset:nth-of-type(2) {
    width: 100%;
    border: 0;
    margin-top: 0.5rem;
    justify-content: space-between;
  }
  fieldset:nth-of-type(1) {
    align-self: flex-end;
  }
  h4 {
    color: white;
    font-weight: 500;
    margin-bottom: 1rem;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    font-size: 10pt;
    width: 100%;
  }
  label {
    margin-right: 0.25rem;
  }
  input,
  select {
    margin-right: 1rem;
  }
`;

export default AddTransactionForm;
