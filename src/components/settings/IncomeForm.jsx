import { useState, useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { updateBudgetLocally } from "../../util";
//context
import { GlobalContext } from "../../context/GlobalContext";
//message components
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const IncomeForm = () => {
  //global context
  const {
    updateBudget,
    budgets,
    updateCurrentBudget,
    currentBudget,
    currencySymbol,
  } = useContext(GlobalContext);

  //form data hook
  const [formIncome, setFormIncome] = useState({
    ...currentBudget.data.income,
  });

  let totalDeductions = (
    Number(formIncome.ni) + Number(formIncome.tax)
  ).toFixed(2);
  //let yearlyNet = (formIncome.annual - totalDeductions).toFixed(2);
  let monthlyNet = (formIncome.yearlyNet / 12).toFixed(2);
  let weeklyNet = (formIncome.yearlyNet / 52).toFixed(2);
  let dailyNet = (formIncome.yearlyNet / 365).toFixed(2);
  let taxable = (formIncome.annual - formIncome.allowance).toFixed(2);

  //TOAST MESSAGE
  const notify = (type) => {
    switch (type) {
      case "UPDATED":
        toast.dark("Income updated");
        break;
      case "INVALID":
        toast.dark("Please enter numbers only");
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

  //NET less than gross annual income
  const validateAnnual = () => {
    let isValid = false;
    if (Number(formIncome.annual) > Number(formIncome.yearlyNet)) {
      isValid = true;
    } else {
      notify("INVALID ANNUAL");
      document.getElementById("yearlyNet").focus();
    }
    return isValid;
  };

  const validateAllowance = () => {
    let isValid = false;
    if (Number(formIncome.allowance) < Number(formIncome.annual)) {
      isValid = true;
    } else {
      notify("INVALID ALLOWANCE");
      document.getElementById("allowance").focus();
    }
    return isValid;
  };

  const validateDeductions = () => {
    let isValid = false;
    if (Number(formIncome.contributions) < Number(formIncome.annual)) {
      isValid = true;
    } else {
      notify("INVALID DEDUCTIONS");
      document.getElementById("contributions").focus();
    }
    return isValid;
  };

  // useEffect(() => {
  //   setFormIncome(() => ({
  //     ...formIncome,
  //     contributions: Number(formIncome.ni) + Number(formIncome.tax),
  //   }));
  // }, [formIncome]);

  //handle form data change
  const handleChange = (e) => {
    if (handleFormatValidation(e.target.value)) {
      setFormIncome(() => ({
        ...formIncome,
        [e.target.name]: e.target.value,
      }));
    } else {
      notify("INVALID");
    }
  };
  const handleBlur = (e) => {
    //console.log(e);
    //check if component mounted
    setFormIncome(() => ({
      ...formIncome,
      [e.target.name]: Number(e.target.value).toFixed(2),
    }));
  };

  //handle form submit
  const handleSaveBudget = () => {
    if (
      // validateAnnual() === true &&
      // validateAllowance() === true &&
      // validateDeductions() === true
      true
    ) {
      //update global provider
      updateBudget({
        ...currentBudget,
        data: {
          ...currentBudget.data,
          income: {
            ...formIncome,
            monthlyNet: monthlyNet,
            weeklyNet: weeklyNet,
            taxable: taxable,
            dailyNet,
          },
        },
      });
      // update local storage
      updateBudgetLocally(budgets, {
        ...currentBudget,
        data: {
          ...currentBudget.data,
          income: {
            ...formIncome,
            monthlyNet: monthlyNet,
            weeklyNet: weeklyNet,
            dailyNet: dailyNet,
            taxable: taxable,
          },
        },
      });
      // update current budget
      updateCurrentBudget({
        ...currentBudget,
        data: {
          ...currentBudget.data,
          income: {
            ...formIncome,
            monthlyNet: monthlyNet,
            weeklyNet: weeklyNet,
            taxable: taxable,
            contributions: totalDeductions,
          },
        },
      });
      //toast message
      notify("UPDATED");
    }
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
      <h4>Income Flowchart</h4>
      <div className="container">
        <form>
          <div className="row">
            <label htmlFor="annual">Annual Salary (Gross)</label>
            <div className="currencyInput">
              {currencySymbol}
              <input
                className="activeInput"
                type="text"
                name="annual"
                id="annual"
                value={formIncome.annual || ""}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="row">
            <label htmlFor="allowance">Tax Free Allowance</label>
            <div className="currencyInput">
              {currencySymbol}
              <input
                className="activeInput"
                type="text"
                name="allowance"
                id="allowance"
                value={formIncome.allowance || ""}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="row">
            <label htmlFor="taxable">Taxable Income</label>
            <div className="currencyInput">
              {currencySymbol}
              <input
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
            <label htmlFor="tax">Income Tax</label>
            <div className="currencyInput">
              {currencySymbol}
              <input
                className="activeInput"
                type="text"
                name="tax"
                id="tax"
                value={formIncome.tax || ""}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="row">
            <label htmlFor="ni">National Insurance</label>
            <div className="currencyInput">
              {currencySymbol}
              <input
                className="activeInput"
                type="text"
                name="ni"
                id="ni"
                value={formIncome.ni || ""}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="row">
            <label htmlFor="contributions">Total deductions</label>
            <div className="currencyInput">
              {currencySymbol}
              <input
                type="text"
                name="contributions"
                id="contributions"
                value={totalDeductions}
                onChange={handleChange}
                onBlur={handleBlur}
                readOnly
              />
            </div>
          </div>
          <div className="line"></div>
          <div className="row">
            <label htmlFor="yearlyNet">Annual Salary (Net)</label>
            <div className="currencyInput">
              {currencySymbol}
              <input
                className="activeInput"
                type="text"
                name="yearlyNet"
                id="yearlyNet"
                value={formIncome.yearlyNet || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                //readOnly
              />
            </div>
          </div>
          <div className="row">
            <label htmlFor="monthlyNet">Monthly Salary (Net)</label>
            <div className="currencyInput">
              {currencySymbol}
              <input
                type="text"
                name="monthlyNet"
                id="monthlyNet"
                value={monthlyNet || ""}
                onChange={handleChange}
                readOnly
              />
            </div>
          </div>
          <div className="row">
            <label htmlFor="weeklyNet">Weekly Salary (Net)</label>
            <div className="currencyInput">
              {currencySymbol}
              <input
                type="text"
                name="weeklyNet"
                id="weeklyNet"
                value={weeklyNet || ""}
                onChange={handleChange}
                readOnly
              />
            </div>
          </div>
        </form>

        <button className="button" onClick={() => handleSaveBudget()}>
          SAVE
        </button>
      </div>
    </StyledIncomeForm>
  );
};

const StyledIncomeForm = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 1rem;
  border-radius: 4px;
  background-color: #39393c;
  color: #848586;
  //row-gap: 1rem;
  h4 {
    color: white;
    font-weight: 500;
    margin-bottom: 1rem;
  }
  .charts {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    column-gap: 1rem;
  }

  .container {
    /* width: 100%;
    margin-bottom: 1rem;
    padding: 3rem;
    border-radius: 4px;
    background-color: #39393c;
    color: #848586; */
  }
  .line {
    width: 100%;
    margin: 0.5rem;
    background-color: #848586;
    height: 1px;
  }
  h3 {
    margin-bottom: 1rem;
    color: white;
  }
  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    .row {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0rem;
    }
    label {
      margin-right: 1rem;
    }
    .currencyInput {
      display: flex;
      align-items: center;
    }
    .activeInput {
      &:hover,
      &:active,
      &:focus {
        outline: #00b4ee solid 2px;
        color: white;
      }
    }
    input {
      margin-left: 0.5rem;
      padding: 0.25rem;
      font-size: 1rem;
      outline: solid #848586 2px;
      background-color: #39393c;
      border-radius: 4px;
      border: transparent solid 2px;
      color: #848586;
    }
  }
  button {
    margin-top: 1rem;
  }

  p {
    color: white;
    padding-left: 1rem;
    font-size: 10pt;
  }
`;

export default IncomeForm;
