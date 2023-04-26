import { useState, useContext } from "react";
//style
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
//message components
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
   updateBudgetLocally,
   calculateFundsTotal,
   getColor,
} from "../utilities";
//context
import { GlobalContext } from "../context/GlobalContext";
//UUID inique ID generator
import { v4 as uuidv4 } from "uuid";

const AddBudgetCategoryForm = ({ balance }) => {
   const [formData, setFormData] = useState({
      category: "",
      amount: "",
   });

   const [showForm, toggleShowForm] = useState(false);

   const {
      updateBudget,
      budgets,
      currentBudget,
      updateCurrentBudget,
      currencySymbol,
      updateAllocatedFunds,
   } = useContext(GlobalContext);

   const notify = (type) => {
      switch (type) {
         case "INVALID":
            toast.dark("Please enter positive numbers only");
            break;
         case "ADDED":
            toast.dark("Budget Category Added");
            break;
         case "CAT_LENGTH":
            toast.dark("Please enter a category name");
            break;
         case "AMOUNT":
            toast.dark("Please enter an amount greater than 0");
            break;
         case "BALANCE":
            toast.dark(
               "Please enter an amount less than the available balance"
            );
            break;
         case "UNIQUE":
            toast.dark("Please enter a unique category name");
            break;
         default:
            toast.dark("Nothing to report");
      }
   };

   //VALIDATION
   //FORMAT
   const handleFormatValidation = (value) => {
      const reg = /^[0-9]*(?:\.?)[0-9]*$/;
      return value.match(reg);
   };

   const handleUniqueValue = () => {
      let valid = false;
      if (
         currentBudget.data.budgetCategories
            .map((category) => category.category.toLowerCase())
            .includes(formData.category.toLowerCase())
      ) {
         notify("UNIQUE");
         document.getElementById("category").focus();
      } else {
         valid = true;
      }
      return valid;
   };
   const checkAvailableCredit = () => {
      let valid = false;
      if (Number(formData.amount) > balance) {
         notify("BALANCE");
         document.getElementById("amount").focus();
      } else {
         valid = true;
      }
      return valid;
   };
   const handleAmountValidation = () => {
      let valid = false;
      if (!Number(formData.amount) > 0) {
         notify("AMOUNT");
         document.getElementById("amount").focus();
      } else {
         valid = true;
      }
      return valid;
   };

   const handleCategoryValidation = () => {
      let valid = false;
      if (formData.category.length < 1) {
         notify("CAT_LENGTH");
         document.getElementById("category").focus();
      } else {
         valid = true;
      }
      return valid;
   };

   const handleChange = (e) => {
      if (e.target.name === "amount") {
         if (handleFormatValidation(e.target.value)) {
            setFormData({
               ...formData,
               [e.target.name]: e.target.value,
            });
         } else {
            notify("INVALID");
         }
      } else {
         setFormData({
            ...formData,
            [e.target.name]: e.target.value,
         });
      }
   };

   const handleBlur = (e) => {
      //check if component mounted
      setFormData({
         ...formData,
         [e.target.name]: Number(e.target.value).toFixed(2),
      });
   };

   const onSubmit = (e) => {
      e.preventDefault();
      if (
         handleCategoryValidation() &&
         handleAmountValidation() &&
         checkAvailableCredit() &&
         handleUniqueValue()
      ) {
         const newBudgetCategory = {
            id: uuidv4(),
            category: formData.category.toLowerCase(),
            amount: Number(formData.amount) * 100,
            items: [],
            color: getColor(),
         };

         const updatedBudget = {
            ...currentBudget,
            data: {
               ...currentBudget.data,
               budgetCategories: [
                  ...currentBudget.data.budgetCategories,
                  newBudgetCategory,
               ],
            },
         };

         updateAllocatedFunds(calculateFundsTotal(updatedBudget));

         //add budget to app context
         updateBudget(updatedBudget);

         //save budget to local storage
         updateBudgetLocally(budgets, updatedBudget);

         //update current budget
         updateCurrentBudget(updatedBudget);

         //reset form
         setFormData({
            category: "",
            amount: "",
         });
         notify("ADDED");
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
                  <div className="fields">
                     <div className="item">
                        <label>Category:</label>
                        <input
                           className="active-input"
                           id="category"
                           name="category"
                           type="text"
                           value={formData.category}
                           onChange={handleChange}
                           placeholder="Category..."
                        />
                     </div>
                     <div className="item">
                        <label>Allocation:</label>
                        <div className="currency-input">
                           {currencySymbol}
                           <input
                              className="active-input"
                              id="amount"
                              name="amount"
                              type="text"
                              value={formData.amount}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="0.00"
                           />
                        </div>
                     </div>
                  </div>

                  <div className="">
                     <button
                        className="button"
                        onClick={onSubmit}
                        id="addBudgetButton"
                     >
                        Add Category
                     </button>
                  </div>
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
   padding: ${({ showForm }) => (showForm ? "1rem" : "0.25rem")};
   display: ${({ showForm }) => (showForm ? "flex" : "none")};
   border-radius: 4px;
   background-color: ${({ showForm }) =>
      showForm ? "#39393c" : "transparent"};
   color: #848586;
   display: flex;
   flex-direction: column;
   padding-top: 3rem;
   align-items: ${({ showForm }) => (showForm ? "flex-start" : "flex-start")};
   justify-content: center;
   position: relative;
   transition: 0.3s ease-in all;

   .show-header {
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
   }

   form {
      display: flex;
      flex-grow: 1;
      flex-wrap: wrap;
      row-gap: 1rem;
      column-gap: 2rem;
      width: 100%;

      .fields {
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

   .currency-input {
      display: flex;
      align-items: center;
      column-gap: 0.25rem;
      flex-grow: 1;
   }
`;

export default AddBudgetCategoryForm;
