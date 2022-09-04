import { useState, useContext } from "react";
//style
import styled from "styled-components";
import { motion } from "framer-motion";
import {FaChevronDown, FaChevronUp} from "react-icons/fa"
//message components
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateBudgetLocally } from "../../utilities";
//context
import { GlobalContext } from "../../context/GlobalContext";
//UUID inique ID generator
import { v4 as uuidv4 } from "uuid";

const AddBudgetCategoryItemForm = ( {budgetCategory, showForm, toggleShowForm}) => {
  const [formData, setFormData] = useState({
    item: "",
    amount: "",
  });

  //const [showForm, toggleShowForm] = useState(false);

  const {
    updateBudget,
    budgets,
    currentBudget,
    updateCurrentBudget,
    currencySymbol
  } = useContext(GlobalContext);

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

  const handleBlur = (e) => {
    //check if component mounted
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value).toFixed(2)
      //[e.target.name]: Number(e.target.value).toFixed(2),
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (handleValidation(formData)) {
      //const date = new Date(Date.now());
      //const sd = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      
      const newBudgetItem = {
        id: uuidv4(),
        item: formData.item.toLowerCase() || "Item",
        amount: Number(formData.amount),
      };

      const budgetCategories = currentBudget.data.budgetCategories;
      const updatedBudget = {
        ...currentBudget,
        data: {
          ...currentBudget.data,
          budgetCategories: [...budgetCategories.filter((category) => category.id !== budgetCategory.id),
          { ...budgetCategory, items: [...budgetCategory.items, newBudgetItem] }],
        },
      }
      
      //add budget to app context
      updateBudget(updatedBudget);

      //save budget to local storage
      updateBudgetLocally(budgets, updatedBudget);

      //update current budget
      updateCurrentBudget(updatedBudget);

      //reset form
      setFormData({
        item: "",
        amount: "",
      });
      notify("ADDED");
    } else {
      notify("INVALID");
    }
  };

  return (
    <StyledAddBudgetCategoryForm showForm={showForm}>
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

      {showForm ? (
        <>
          <div className="show-header">
            <FaChevronDown
            className="icon toggle-icon"
            onClick={() => toggleShowForm(!showForm)}
            />
            <h4>New Item</h4>
          </div>
          
          <form>
            <label>Item:</label>
            <input
              className="active-input"
              name="item"
              type="text"
              value={formData.item}
              onChange={handleChange}
              placeholder="Item..."
            />
            
            <label>Amount:</label>
            <div className="currency-input">
              {currencySymbol}
              <input
                className="active-input"
                name="amount"
                type="text"
                value={formData.amount}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="0.00"
              />
            </div>
            <button className="button" onClick={onSubmit} id="AddItemButton">
              Add Item
            </button>
          </form>
            </>
      ) : (
          <div className="show-header">
            <FaChevronUp
            className="icon toggle-icon"
            onClick={() => toggleShowForm(!showForm)}
            />
            <h4>New Item</h4>
          </div>
      )}
      
    </StyledAddBudgetCategoryForm>
  );
};

const StyledAddBudgetCategoryForm = styled(motion.div)`
  //display: ${({ showForm }) => (showForm ? "flex" : "none")};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex-grow: 1;
  row-gap: 0.5rem;
  border-radius: 4px;
  background-color: ${({showForm}) => (showForm ? "#39393c": "transparent")};
  color: #848586;
  //position: relative;
  transition: 0.3s ease-in all;
  
  .show-header{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    column-gap: 1rem;
    top: 0;
    left: 0;
    z-index: 2;
  }

  .toggle-icon {
    width: 2rem;
    height: 2rem;
    aspect-ratio: 1;
    background-color: #39393c;
    color: #848586;
    border: 2px solid #00b4ee;
    border-radius: 50%;
    padding: 0.25rem;
    //align-self: center;
  }
  
  h4 {
    color: white;
    font-weight: 500;
  }
  
  form {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    column-gap: 1rem;
    width: 100%;
  }
  label {
    margin-right: 0.25rem;
  }
  input{
    padding: 0.25rem;
  }
  .currency-input{
    display: flex;
    align-items: center;
    column-gap: 0.25rem;
  }
`;

export default AddBudgetCategoryItemForm;
