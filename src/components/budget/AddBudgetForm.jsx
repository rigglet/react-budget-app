import { useState, useContext } from "react";
//style
import styled from "styled-components";
import { motion } from "framer-motion";
//message components
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveBudgetLocally } from "../../util";
//context
import { GlobalContext } from "../../context/GlobalContext";
//UUID inique ID generator
import { v4 as uuidv4 } from "uuid";
import { getWidgets } from "../../data";

const AddBudgetForm = () => {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const { addBudget, budgets } = useContext(GlobalContext);

  const notify = (type) => {
    const toastStyle = {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: "0.. 1",
    };
    switch (type) {
      case "ADDED":
        toast.dark("Budget Added", toastStyle);
        break;
      case "INVALID":
        toast.warn(
          "Please enter a name and description longer than 5 characters",
          { color: "black", ...toastStyle }
        );
        break;
      default:
        toast.dark("Nothing to report", toastStyle);
    }
  };

  //   const CloseButton = ({ closeToast }) => (
  //     <FaWindowClose className="toastClose" onClick={closeToast} />
  //   );

  const handleValidation = (formData) => {
    let valid = true;
    //console.log(formData.name.length);
    if (formData.name.length < 5 || formData.description.length < 5) {
      valid = false;
    }
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
    //console.log(handleValidation(formData));

    if (handleValidation(formData)) {
      const date = new Date(Date.now());
      //const sd = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
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
          budgetItems: new Array(),
          income: {
            annual: "",
            allowance: "",
            taxable: "",
            tax: "",
            ni: "",
            contributions: "",
            yearlyNet: "",
            monthlyNet: "",
            weeklyNet: "",
          },
        },
        widgets: getWidgets(),
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
          //closeButton={CloseButton}
          closeButton={false}
          transition={Zoom}
          position="bottom-center"
          //autoClose={2000}
          hideProgressBar
          newestOnTop={true}
          closeOnClick
          rtl={false}
          //pauseOnFocusLoss
          draggable={false}
          pauseOnHover
        />

        <h4>New Budget</h4>
        <form>
          <label>Name:</label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name..."
          />
          <label>Description:</label>
          <input
            name="description"
            type="text"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description..."
          />
          <button onClick={onSubmit} id="addBudgetButton">
            Add Budget
          </button>
        </form>
      </StyledAddbudgetForm>
    </div>
  );
};

const StyledAddbudgetForm = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  //justify-content: space-between;
  margin-bottom: 2rem;
  padding: 1rem 1.5rem;
  min-width: 100%;
  min-height: 8vh;
  border-radius: 4px;
  background-color: #39393c;
  border-left: transparent 0.25rem solid;
  color: #848586;
  h4 {
    color: white;
    font-weight: 500;
    margin-bottom: 1rem;
  }
  form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 10pt;
    width: 100%;
  }
  label {
    margin-right: 0.25rem;
  }
  input {
    padding: 0.25rem;
    outline: none;
    margin-right: 1rem;
  }
`;

export default AddBudgetForm;
