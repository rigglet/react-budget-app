import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { formatStrings, divideValues, multiplyValues, updateBudgetLocally } from "../../utilities";
//context
import { GlobalContext } from "../../context/GlobalContext";
//message components
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//todo: unnecessary file cleanup
//todo: branch to new repository?

const IncomeForm = () => {
  //global context
  const {
    updateBudget,
    budgets,
    updateCurrentBudget,
    currentBudget,
    currencySymbol,
  } = useContext(GlobalContext);

  //divide values by 100
  const initialData = divideValues(currentBudget?.data?.income)
  //form data hook
  const [incomeData, setIncomeData] = useState(initialData);

    //let annualGross = currentBudget?.data?.income.annualGross;
    //taxFreeAllowance
    let taxable = Number(incomeData.annualGross - incomeData.taxFreeAllowance).toFixed(2);
    
    //incomeTax
    //nationalInsurance
    let totalDeductions = Number(incomeData.nationalInsurance) + Number(incomeData.incomeTax);
    
    let annualNet = incomeData.annualGross - totalDeductions;
    let monthlyNet = Number(annualNet / 12).toFixed(2);
    let weeklyNet = Number(annualNet / 52).toFixed(2);
    //let dailyNet = Number(annualNet / 365).toFixed(2);
    
  annualNet = Number(annualNet).toFixed(2);
  totalDeductions = Number(totalDeductions).toFixed(2);

  
  useEffect(() => {
    //Format to string to Numbers
    setIncomeData(()=>(formatStrings(incomeData)))
  },[])
    
  //TOAST MESSAGE
  const notify = (type) => {
    switch (type) {
      case "UPDATED":
        toast.dark("Income updated");
        break;
      case "INVALID":
        toast.dark("Please enter positive numbers only");
        break;
      case "INVALID ANNUAL":
          toast.dark(
            "Please ensure Annual (Net) figure is lower than Annual (gross)"
        );
        break;
      case "INVALID ALLOWANCE":
        toast.dark(
          "Please ensure Allowance is less than Annual (gross) figure"
          );
        break;
      case "INVALID DEDUCTIONS":
        toast.dark(
          "Please ensure Total Deductions are less than Annual (gross) figure"
        );
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

  const validateAllowance = () => {
    let isValid = false;
    if (Number(incomeData.taxFreeAllowance) < Number(incomeData.annualGross)) {
      isValid = true;
    } else {
      notify("INVALID ALLOWANCE");
      document.getElementById("taxFreeAllowance").focus();
    }
    return isValid;
  };

  const validateDeductions = () => {
    let isValid = false;
    if (Number(totalDeductions) < Number(incomeData.annualGross)) {
      isValid = true;
    } else {
      notify("INVALID DEDUCTIONS");
      document.getElementById("totalDeductions").focus();
    }
    return isValid;
  };

  //handle form data change
  const handleChange = (e) => {
    if (handleFormatValidation(e.target.value)) {
      setIncomeData(() => ({
        ...incomeData,
        [e.target.name]: e.target.value,
      }));
    } else {
      notify("INVALID");
    }
  };

  const handleBlur = (e) => {
    //check if component mounted
    setIncomeData({
      ...incomeData,
      [e.target.name]: Number(e.target.value).toFixed(2)
    });
  };

  let updatedBudget = {
    ...currentBudget,
    data: {
      ...currentBudget.data,
      // implicit type conversion to number
      // (by multiplying by 100)
      // and stores number without decimal for increased accuracy later
      income: multiplyValues({
        ...incomeData,
        annualGross: incomeData.annualGross,
        taxFreeAllowance: incomeData.taxFreeAllowance,
        taxable: taxable,
        incomeTax: incomeData.incomeTax,
        nationalInsurance: incomeData.nationalInsurance,
        totalDeductions: incomeData.totalDeductions,
        annualNet: annualNet,
        monthlyNet: monthlyNet,
        weeklyNet: weeklyNet,
      }),
    },
  }
  
  //handle form submit
  const handleSaveBudget = () => {
    if (
      validateAllowance() === true &&
      validateDeductions() === true
    ) {
      //update global provider
      updateBudget(updatedBudget);
      // update local storage
      updateBudgetLocally(budgets, updatedBudget);
      // update current budget
      updateCurrentBudget(updatedBudget);
      
      //toast message
      notify("UPDATED");
    }
  };

  //handle form reset
  const handleResetChanges = () => {
    for (const key in initialData) {
      initialData[key] = Number(initialData[key]).toFixed(2);
    }
    setIncomeData(initialData)
  };

  return (
    <StyledIncomeForm>
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
      <h4>Income Information</h4>
      
      <div className="container">
        <form>
          <div className="row">
            <label htmlFor="annualGross">Annual Salary (Gross)</label>
            <div className="currency-input">
              {currencySymbol}
              <input
                className="active-input"
                type="text"
                name="annualGross"
                id="annualGross"
                value={incomeData.annualGross}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="row">
            <label htmlFor="taxFreeAllowance">Tax Free Allowance</label>
            <div className="currency-input">
              {currencySymbol}
              <input
                className="active-input"
                type="text"
                name="taxFreeAllowance"
                id="taxFreeAllowance"
                value={incomeData.taxFreeAllowance}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="row">
            <label htmlFor="taxable">Taxable Income</label>
            <div className="currency-input">
              {currencySymbol}
              <input
                className="inactive-input"
                type="text"
                name="taxable"
                id="taxable"
                value={taxable}
                onChange={handleChange}
                readOnly
              />
            </div>
          </div>
          <div className="line"></div>
          <div className="row">
            <label htmlFor="incomeTax">Income Tax</label>
            <div className="currency-input">
              {currencySymbol}
              <input
                className="active-input"
                type="text"
                name="incomeTax"
                id="incomeTax"
                value={incomeData.incomeTax}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="row">
            <label htmlFor="nationalInsurance">National Insurance</label>
            <div className="currency-input">
              {currencySymbol}
              <input
                className="active-input"
                type="text"
                name="nationalInsurance"
                id="nationalInsurance"
                value={incomeData.nationalInsurance}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="row">
            <label htmlFor="totalDeductions">Total deductions</label>
            <div className="currency-input">
              {currencySymbol}
              <input
                className="inactive-input"
                type="text"
                name="totalDeductions"
                id="totalDeductions"
                value={totalDeductions}
                onChange={handleChange}
                onBlur={handleBlur}
                readOnly
              />
            </div>
          </div>
          <div className="line"></div>
          <div className="row">
            <label htmlFor="annualNet">Annual Salary (Net)</label>
            <div className="currency-input">
              {currencySymbol}
              <input
                className="inactive-input"
                type="text"
                name="annualNet"
                id="annualNet"
                value={annualNet}
                onChange={handleChange}
                onBlur={handleBlur}
                readOnly
              />
            </div>
          </div>
          <div className="row">
            <label htmlFor="monthlyNet">Monthly Salary (Net)</label>
            <div className="currency-input">
              {currencySymbol}
              <input
                className="inactive-input"
                type="text"
                name="monthlyNet"
                id="monthlyNet"
                value={monthlyNet}
                onChange={handleChange}
                readOnly
              />
            </div>
          </div>
          <div className="row">
            <label htmlFor="weeklyNet">Weekly Salary (Net)</label>
            <div className="currency-input">
              {currencySymbol}
              <input
                className="inactive-input"
                type="text"
                name="weeklyNet"
                id="weeklyNet"
                value={weeklyNet}
                onChange={handleChange}
                readOnly
              />
            </div>
          </div>
        </form>

        <div className="buttons">
          <button className="button" onClick={() => handleSaveBudget()}>SAVE</button>
          <button className="button" onClick={() => handleResetChanges()}>RESET</button>
        </div>
      </div>
    </StyledIncomeForm>
  );
};

const StyledIncomeForm = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1;
  padding: 1rem;
  border-radius: 4px;
  background-color: #39393c;
  color: #848586;

  h4 {
    color: white;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
    row-gap: 1rem;
  }

  
  form {
    display: flex;
    flex-direction: column;
    row-gap: 0.75rem;
    
    .row {
      display: flex;
      justify-content: space-between;
      flex-grow: 1;
    }
    .currency-input {
      display: flex;
      align-items: center;
      column-gap: 0.5rem;
    }
    .line {
      width: 90%;
      background-color: #848586;
      height: 0.2rem;
      border-radius: 4px;
      margin: 0.5rem 0;
      align-self: center;
    }
  }
  
  .buttons {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    column-gap: 1rem;
  }

  p {
    color: white;
    padding-left: 1rem;
    font-size: 10pt;
  }
`;

export default IncomeForm;
