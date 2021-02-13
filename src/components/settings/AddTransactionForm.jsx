import { useState, useContext } from "react";
//style
import styled from "styled-components";
import { motion } from "framer-motion";
//message components
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateBudgetLocally } from "../../util";
//context
import { GlobalContext } from "../../context/GlobalContext";
//UUID inique ID generator
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

const AddTransactionForm = () => {
  const {
    updateBudget,
    currentBudget,
    updateCurrentBudget,
    budgets,
  } = useContext(GlobalContext);

  const date = new Date(Date.now());
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  if (month < 10) month = `0${month}`;
  const sd = year + "-" + month + "-" + day;

  const [formData, setFormData] = useState({
    category: "",
    item: "",
    date: sd,
    amount: 0.0,
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

    if (handleValidation(formData)) {
      const newTransaction = {
        id: uuidv4(),
        category: formData.category,
        item: formData.item,
        date: formData.date,
        amount: Number(formData.amount),
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

      console.log({
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
        date: sd,
        amount: "0.00",
      });
      notify("ADDED");
    } else {
      notify("INVALID");
    }
  };

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
        <label>Date:</label>
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
        />
        <label>Amount:</label>
        <input
          name="amount"
          type="number"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter amount..."
        />
        <button onClick={onSubmit}>Add</button>
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
  h4 {
    color: white;
    font-weight: 500;
    margin-bottom: 1rem;
  }
  form {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 10pt;
    width: 100%;
  }
  label {
    margin-right: 0.25rem;
  }
  input,
  select {
    padding: 0.25rem;
    outline: none;
    margin-right: 1rem;
  }
`;

export default AddTransactionForm;
