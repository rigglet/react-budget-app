import { useState, useContext } from "react";
//style
import styled from "styled-components";
import { motion } from "framer-motion";
import {FaChevronDown, FaChevronUp} from "react-icons/fa"
//message components
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateBudgetLocally } from "../../util";
//context
import { GlobalContext } from "../../context/GlobalContext";
//UUID inique ID generator
import { v4 as uuidv4 } from "uuid";

const AddBudgetCategoryForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    amount: 0.0,
  });

  const [showForm, toggleShowForm] = useState(false);

  const {
    updateBudget,
    budgets,
    currentBudget,
    updateCurrentBudget,
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

  const onSubmit = (e) => {
    e.preventDefault();

    if (handleValidation(formData)) {
      //const date = new Date(Date.now());
      //const sd = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      
      const newBudgetCategory = {
        id: uuidv4(),
        category: formData.category.toLowerCase() || "Category",
        amount: Number(formData.amount),
        items: []
      };

      //add budget to app context
      const budgetCategories = currentBudget.data.budgetCategories;
      updateBudget({
        ...currentBudget,
        data: {
          ...currentBudget.data,
          budgetCategories: [...budgetCategories, newBudgetCategory],
        },
      });

      console.log({
        ...currentBudget,
        data: {
          ...currentBudget.data,
          budgetCategories: [...budgetCategories, newBudgetCategory],
        },
      })

      //save budget to local storage
      updateBudgetLocally(budgets, {
        ...currentBudget,
        data: {
          ...currentBudget.data,
          budgetCategories: [...budgetCategories, newBudgetCategory],
        },
      });

      //update current budget
      updateCurrentBudget({
        ...currentBudget,
        data: {
          ...currentBudget.data,
          budgetCategories: [...budgetCategories, newBudgetCategory],
        },
      });

      //reset form
      setFormData({
        category: "Category",
        amount: "0",
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
            <h4>New Budget Category</h4>
          </div>
          
          <form>
            <label>Category:</label>
            <input
              className="active-input"
              name="category"
              type="text"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category..."
            />
            
            <label>Amount:</label>
            <input
              className="active-input"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount..."
            />
            <button className="button" onClick={onSubmit} id="addBudgetButton">
              Add Category
            </button>
          </form>
            </>
      ) : (
          <div className="show-header">
            <FaChevronUp
            className="icon toggle-icon"
            onClick={() => toggleShowForm(!showForm)}
            />
            <h4>New Budget Category</h4>
          </div>
          
      )}
      
    </StyledAddBudgetCategoryForm>
  );
};

const StyledAddBudgetCategoryForm = styled(motion.div)`
  padding: ${({showForm}) => (showForm ? "1rem": "0.25rem")};
  display: ${({ showForm }) => (showForm ? "flex" : "none")};
  border-radius: 4px;
  background-color: ${({showForm}) => (showForm ? "#39393c": "transparent")};
  color: #848586;
  display: flex;
  flex-direction: column;
  padding-top: 4rem;
  align-items: ${({showForm}) => (showForm ? "flex-start": "flex-start")};
  justify-content: center;
  position: relative;
  transition: 0.3s ease-in all;

  .show-header{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    column-gap: 1rem;
    position: absolute;
    top: 1rem;
    left: 1rem;
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
  }

  h4 {
    color: white;
    font-weight: 500;
    //margin-bottom: 1rem;
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
  input{
    padding: 0.25rem;
    //outline: none;
    //margin-right: 1rem;
  }
`;

export default AddBudgetCategoryForm;
