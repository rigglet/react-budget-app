import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaTrashAlt} from "react-icons/fa";
import Progressbar from "./Progressbar";
import AddBudgetCategoryItemForm from "../components/settings/AddBudgetCategoryItemForm";
import { updateBudgetLocally, formatNumber, calculateFundsTotal} from "../utilities";

const CategorizedBudget = ({budgetCategory, deleteBudgetCategory}) => {
  
  const {
    budgets,
    currentBudget,
    updateBudget,
    updateCurrentBudget,
    currencySymbol,
    updateAllocatedFunds,
  } = useContext(GlobalContext);

  const [showForm, toggleShowForm] = useState(false);
  const [viewItems, toggleViewItems] = useState(false);

  const deleteCategoryItem = (id) => {
    const updatedBudget = {
        ...currentBudget,
        data: {
          ...currentBudget.data,
          budgetCategories: [...currentBudget.data.budgetCategories.filter((category) => category.id !== budgetCategory.id), {...budgetCategory, items: [...budgetCategory.items.filter((item)=>item.id !== id)]}],
        },
      }

    updateAllocatedFunds(calculateFundsTotal(updatedBudget));

    //update global context
    updateBudget(updatedBudget);

    //update local storage
    updateBudgetLocally(budgets, updatedBudget);

    //updatecurrentBudget
    updateCurrentBudget(updatedBudget);
  };

  let itemTotal = budgetCategory?.items?.map(i => i.amount).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  const budgetTotal = budgetCategory?.amount / 100;
  
  let categorisedPercentage = 0;

  if (itemTotal > 0 && budgetTotal > 0) {
    categorisedPercentage = itemTotal / budgetTotal * 100;
  };

  itemTotal = formatNumber(Number(itemTotal));

  return (
    <StyledCategorizedBudget>
      {viewItems ? (
        <div className="list-container">
          <h4>{`"${budgetCategory?.category}" expense items`}</h4>
          <div className="expense-list">
          {budgetCategory?.items.map((item) => (
            <div className="expense" key={item.id}>
              <p>{item.item}</p>
              <p>${item.amount}</p>
              <div className="item-actions" onClick={() => deleteCategoryItem(item.id)}>
                <FaTrashAlt className="item-delete-icon" />
              </div>
            </div>
          ))}
          </div>
          <div className="item-buttons">
              <button className="button" onClick={() => toggleViewItems(!viewItems)}>Exit</button>
          </div>
        </div>) : (<>
          {!showForm && (
            <div className="add-buttons">
              <button className="button" onClick={() => toggleViewItems(!viewItems)}>View items</button>
            </div>
            )}
          <AddBudgetCategoryItemForm budgetCategory={budgetCategory} showForm={showForm} toggleShowForm={toggleShowForm} />

          <div className="titlebar">
            <h4>{budgetCategory?.category}</h4>
            {/* <div className="percentage">{Number(categorisedPercentage).toFixed()} %</div> */}
            <div className="total">{currencySymbol}{itemTotal} / {currencySymbol}{formatNumber(Number(budgetTotal).toFixed(2))}</div>
          </div>
          
          <Progressbar percentage={categorisedPercentage}/>
          
          <div className="actions" onClick={() => deleteBudgetCategory(budgetCategory.id)}>
          <FaTrashAlt className="delete-icon" />
          </div>
        </>)}
        </StyledCategorizedBudget>
        )}
        
const StyledCategorizedBudget = styled(motion.div)`
  position: relative;
  padding: 1rem;
  border-radius: 4px;
  background-color: #39393c;
  color: #848586;
  transition: 0.3s ease all;
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  
  &:hover .actions{
    width: 100px;
  }
  
  .item-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 0px;
    background-color: #b87272;
    transition: 0.3s ease all;
    cursor: pointer;
    
    .item-delete-icon{
      height: 50%;
      width: 50%;
      border-radius: 4px;
      background-color: #b87272;
      pointer: cursor;
      color: whitesmoke;
    }
  }
  .actions {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    right: 0;
    height: 3rem;
    width: 0px;
    background-color: #b87272;
    border-radius: 4px;
    transition: 0.3s ease all;
    //pointer-events: none;
    cursor: pointer;
    
    .delete-icon{
      height: 50%;
      width: 50%;
      border-radius: 4px;
      background-color: #b87272;
      pointer: cursor;
      color: whitesmoke;
    }
  }
  
  .list-container{
    display: flex;
    flex-direction: column;
    //align-items: center;
    justify-content: center;
    width: 100%;
    row-gap: 0.5rem;
  }
  
  .expense-list {
    display: flex;
    flex-direction: column;
    row-gap: 0.25rem;
    width: 70%;
    align-self: center;
    
    .expense{
      &:hover .item-actions {
        width: 100px;
        //color: rgba(184, 114, 114, 75%);
        .item-actions{
          width: 3rem;
        }
      }

      border: 1px solid #00b4ee;
      display:flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.25rem;
      position: relative;
      p{
        color: whitesmoke;
        background-color: #39393c;
      }
    }
  }
   
  h4 {
    color: white;
    font-weight: 500;
    //margin-bottom: 1rem;
  }
  .titlebar{
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: whitesmoke;
  }
  .item-buttons{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    //width: 100%;
    //padding: 0rem;
    //column-gap: 2rem;
  }
  .add-buttons{
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    padding: 0rem;
    column-gap: 2rem;
  }
  `;

export default CategorizedBudget;
