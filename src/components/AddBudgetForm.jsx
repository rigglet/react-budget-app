import { useState, useContext } from "react";
//style
import styled from "styled-components";
import { motion } from "framer-motion";
//message components
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveBudgetLocally } from "../utilities";
//context
import { GlobalContext } from "../context/GlobalContext";
//UUID inique ID generator
import { v4 as uuidv4 } from "uuid";

const AddBudgetForm = () => {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const { addBudget, budgets } = useContext(GlobalContext);

  const notify = (type) => {
    switch (type) {
      case "ADDED":
        toast.dark("Budget Added");
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
    if (formData.name.length < 5 || formData.description.length < 5) {
      valid = false;
    }
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
      const date = new Date(Date.now());
      const newBudget = {
        id: uuidv4(),
        saveName: formData.name,
        description: formData.description,
        saveDate:
          date.getDate() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getFullYear(),
        data: {
          budgetCategories: [{name: "UncategorizedBudget", total: 0}],
          income: {
            annualGross: 0,
            taxFreeAllowance: 0,
            taxable: 0,
            incomeTax: 0,
            nationalInsurance: 0,
            totalDeductions: 0,
            annualNet: 0,
            monthlyNet: 0,
            weeklyNet: 0,
          },
        }
      };

      //add budget to app context
      addBudget(newBudget);
      //save budget to local storage
      saveBudgetLocally(budgets, newBudget);
      //reset form
      setFormData({ name: "", description: "" });
      notify("ADDED");
    } else {
      notify("INVALID");
    }
  };

  return (
    <div>
      <StyledAddbudgetForm>
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
        
        <h4>New Budget</h4>
        
        <form>
          <div className="fields">
            <div className="item">
              <label>Name:</label>
              <input
                className="active-input"
                // size="40"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name..."
              />
            </div>

            <div className="item">
              <label>Description:</label>
              <input
                className="active-input"
                // size="40"
                name="description"
                type="text"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description..."
              />
            </div>
          </div>
          
          <div>
            <button className="button" onClick={onSubmit} id="addBudgetButton">
            Add Budget
          </button>
          </div>
        </form>
      </StyledAddbudgetForm>
    </div>
  );
};

const StyledAddbudgetForm = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem;
  border-radius: 4px;
  background-color: #39393c;
  color: #848586;
  width: 70vw;

  h4 {
    color: white;
    font-weight: 500;
    margin-bottom: 1rem;
  }
  form {
    display: flex;
    flex-wrap: wrap;
    row-gap: 1rem; 
    column-gap: 2rem;
    
    .fields{
      display: flex;
      flex-grow: 1;
      flex-wrap: wrap;
      row-gap: 1rem;
      column-gap: 2rem;

      .item {
        display: flex;
        flex-grow: 1;
        align-items: center;
        justify-content: center;
        column-gap: 0.5rem;
        
        input {
          flex-grow: 1;
          padding: 0.25rem;
          outline: none;
        }
      }
    }
  }
`;

export default AddBudgetForm;
