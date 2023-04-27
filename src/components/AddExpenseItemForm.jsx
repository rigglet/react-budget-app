import { useState, useContext } from "react";
//style
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
//message components
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateBudgetLocally } from "../utilities";
//context
import { GlobalContext } from "../context/GlobalContext";
//UUID inique ID generator
import { v4 as uuidv4 } from "uuid";

const AddExpenseItemForm = ({ showForm, toggleShowForm, itemTotal }) => {
   const {
      updateBudget,
      budgets,
      currentBudget,
      updateCurrentBudget,
      currencySymbol,
   } = useContext(GlobalContext);

   const [formData, setFormData] = useState({
      item: "",
      amount: "",
      category: currentBudget.data.budgetCategories.sort()[0].category || "",
   });

   const budgetCategory = currentBudget.data.budgetCategories.filter(
      (category) => {
         return (
            category.category.toLowerCase() ===
            formData?.category?.toLowerCase()
         );
      }
   )[0];

   const balance = Number(10000 / 100) - Number(itemTotal);
   const budgetCategories = currentBudget.data.budgetCategories;

   const notify = (type) => {
      switch (type) {
         case "ADDED":
            toast.dark("Budget Item Added");
            break;
         case "INVALID":
            toast.dark("Please enter positive numbers only");
            break;
         case "ITEM_LENGTH":
            toast.dark("Please enter an item name");
            break;
         case "AMOUNT":
            toast.dark("Please enter an amount greater than 0");
            break;
         case "BALANCE":
            toast.dark("Please enter an amount less than the available budget");
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

   const handleItemValidation = () => {
      let valid = false;
      if (formData.item.length < 1) {
         notify("ITEM_LENGTH");
         document.getElementById("item").focus();
      } else {
         valid = true;
      }
      return valid;
   };

   const handleChange = (e) => {
      console.log(e.target.value);
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
         handleItemValidation() &&
         handleAmountValidation() &&
         checkAvailableCredit()
      ) {
         const newBudgetItem = {
            id: uuidv4(),
            item: formData.item.toLowerCase() || "Item",
            amount: Number(formData.amount),
         };

         const updatedBudget = {
            ...currentBudget,
            data: {
               ...currentBudget.data,
               budgetCategories: [
                  ...budgetCategories.filter(
                     (category) => category.id !== budgetCategory.id
                  ),
                  {
                     ...budgetCategory,
                     items: [...budgetCategory.items, newBudgetItem],
                  },
               ],
            },
         };

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
      }
   };

   return (
      <StyledAddExpenseItemForm
         showForm={showForm}
         selectedColor={budgetCategory.color}
      >
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
                  <div className="fields">
                     <div className="item">
                        <label htmlFor="category">
                           Select from ({budgetCategories.length}) categories:
                        </label>
                        <div className="category-color"> </div>
                        <select
                           name="category"
                           placeholder={formData.category}
                           value={formData.category}
                           onChange={handleChange}
                        >
                           {budgetCategories.map((category) => {
                              return (
                                 <>
                                    <option
                                       key={category.category}
                                       value={category.category}
                                    >
                                       {category.category}
                                    </option>
                                 </>
                              );
                           })}
                        </select>
                     </div>

                     <div className="item">
                        <label>Item:</label>
                        <input
                           className="active-input"
                           id="item"
                           name="item"
                           type="text"
                           value={formData.item}
                           onChange={handleChange}
                           placeholder="Item..."
                        />
                     </div>

                     <div className="item">
                        <label>Amount:</label>
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

                  <div>
                     <button
                        className="button"
                        onClick={onSubmit}
                        id="AddItemButton"
                     >
                        Add Item
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
               <h4>New Item</h4>
            </div>
         )}
      </StyledAddExpenseItemForm>
   );
};

const StyledAddExpenseItemForm = styled(motion.div)`
   //display: ${({ showForm }) => (showForm ? "flex" : "none")};
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   justify-content: center;
   flex-grow: 1;
   row-gap: 0.5rem;
   border-radius: 4px;
   background-color: ${({ showForm }) =>
      showForm ? "#39393c" : "transparent"};
   color: #848586;
   transition: 0.3s ease-in all;
   padding: 0.5rem;

   .show-header {
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
      flex-grow: 1;
      flex-wrap: wrap;
      row-gap: 1rem;
      column-gap: 2rem;
      width: 100%;

      p {
         text-align: right;
         width: 100%;
      }
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
            input,
            select {
               flex-grow: 1;
               padding: 0.25rem;
               outline: none;
            }
            .category-color {
               width: 25px;
               height: 25px;
               border-radius: 4px;
               border: 2px solid #848586;
               background: ${({ selectedColor }) => selectedColor};
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

export default AddExpenseItemForm;
