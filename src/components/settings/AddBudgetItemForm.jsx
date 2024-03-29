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

const AddBudgetItemForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    item: "",
    frequency: "weekly",
    amount: 0.0,
  });
  const {
    updateBudget,
    budgets,
    currentBudget,
    updateCurrentBudget,
  } = useContext(GlobalContext);

  const freqOptions = [
    { name: "Daily", value: "daily" },
    { name: "Weekly", value: "weekly" },
    { name: "Monthly", value: "monthly" },
    { name: "Annually", value: "annually" },
  ];

  const notify = (type) => {
    switch (type) {
      case "ADDED":
        toast.dark("Budget Item Added");
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
    //console.log(`${e.target.name}: ${e.target.value}`);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (handleValidation(formData)) {
      //const date = new Date(Date.now());
      //const sd = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      const newBudgetItem = {
        id: uuidv4(),
        category: formData.category.toLowerCase(),
        item: formData.item.toLowerCase(),
        frequency: formData.frequency,
        amount: Number(formData.amount),
        mandatory: false,
        paid: false,
      };

      //add budget to app context
      const budgetItems = currentBudget.data.budgetItems;
      updateBudget({
        ...currentBudget,
        data: {
          ...currentBudget.data,
          budgetItems: [...budgetItems, newBudgetItem],
        },
      });

      //save budget to local storage
      updateBudgetLocally(budgets, {
        ...currentBudget,
        data: {
          ...currentBudget.data,
          budgetItems: [...budgetItems, newBudgetItem],
        },
      });

      //update current budget
      updateCurrentBudget({
        ...currentBudget,
        data: {
          ...currentBudget.data,
          budgetItems: [...budgetItems, newBudgetItem],
        },
      });

      //reset form
      setFormData({
        category: "",
        item: "",
        frequency: "weekly",
        amount: "0.00",
      });
      notify("ADDED");
    } else {
      notify("INVALID");
    }
  };

  return (
    <StyledAddbudgetItemForm>
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

      <h4>New Budget Item</h4>
      <form>
        <label>Category:</label>
        <input
          className="activeInput"
          name="category"
          type="text"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category..."
        />
        <label>Item:</label>
        <input
          className="activeInput"
          name="item"
          type="text"
          value={formData.item}
          onChange={handleChange}
          placeholder="item..."
        />
        <label>Frequency:</label>
        <select
          onChange={handleChange}
          value={formData.frequency}
          name="frequency"
        >
          {freqOptions.map((opt) => (
            <option value={opt.value} key={opt.name}>
              {opt.name}
            </option>
          ))}
        </select>
        <label>Amount:</label>
        <input
          className="activeInput"
          name="amount"
          type="number"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter amount..."
        />
        <button className="button" onClick={onSubmit} id="addBudgetButton">
          Add Budget
        </button>
      </form>
    </StyledAddbudgetItemForm>
  );
};

const StyledAddbudgetItemForm = styled(motion.div)`
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
    //outline: none;
    margin-right: 1rem;
  }
`;

export default AddBudgetItemForm;
