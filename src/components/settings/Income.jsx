import { useState, useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { updateBudgetLocally } from "../../util";
//number input
//import NumericInput from "react-numeric-input";
//import { BsFileText } from "react-icons/bs";
//import { useHistory } from "react-router-dom";
//context
import { GlobalContext } from "../../context/GlobalContext";
//import Budget from "../budget/Budget";

const Income = ({ currentBudget }) => {
  const { updateBudget, budgets } = useContext(GlobalContext);

  const [formIncome, setFormIncome] = useState({
    ...currentBudget.data.income,
  });
  //console.log({ ...currentBudget.data.income });

  const handleChange = (e) => {
    setFormIncome(() => ({
      ...formIncome,
      [e.target.name]: Number(e.target.value),
    }));
  };

  //let totalDeductions = (formIncome.ni + formIncome.tax).toFixed(2);
  let taxable = (formIncome.annual - formIncome.allowance).toFixed(2);

  //let yearlyNet = (formIncome.annual - totalDeductions).toFixed(2);
  let monthlyNet = (formIncome.yearlyNet / 12).toFixed(2);
  let weeklyNet = (formIncome.yearlyNet / 52).toFixed(2);

  const handleSaveBudget = () => {
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
          taxable: taxable,
        },
      },
    });
  };

  return (
    <StyledIncome>
      <h3>Income</h3>
      <div className="container">
        <form>
          {/* <div className="row">
          <label htmlFor="annual">Annual Salary (Gross)</label>
          <NumericInput
          className="form-control"
            min={0}
            max={1000000}
            format={(o) => `$ ${o}`}
            step={1}
            precision={2}
            inputmode="numeric"
            strict
            noStyle
            name="annual"
            id="annual"
            value={formIncome.annual}
            onChange={handleChange}
            />
        </div> */}
          <div className="row">
            <label htmlFor="annual">Annual Salary (Gross)</label>
            <input
              type="number"
              name="annual"
              id="annual"
              value={formIncome.annual || ""}
              onChange={handleChange}
              // onBlur={() => handleFormat}
            />
          </div>
          <div className="row">
            <label htmlFor="allowance">Tax Free Allowance</label>
            <input
              min="0"
              type="text"
              name="allowance"
              id="allowance"
              step="10"
              value={formIncome.allowance || ""}
              onChange={handleChange}
            />
          </div>
          <div className="row">
            <label htmlFor="taxable">Taxable Income</label>
            <input
              min="0"
              type="number"
              name="taxable"
              id="taxable"
              step="10"
              //value={formIncome.taxable.toFixed(2)}
              value={taxable || ""}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div className="line"></div>
          <div className="row">
            <label htmlFor="tax">Income Tax</label>
            <input
              min="0"
              type="number"
              name="tax"
              id="tax"
              step="10"
              value={formIncome.tax || ""}
              onChange={handleChange}
            />
          </div>
          <div className="row">
            <label htmlFor="ni">National Insurance</label>
            <input
              min="0"
              type="number"
              name="ni"
              id="ni"
              step="10"
              value={formIncome.ni || ""}
              onChange={handleChange}
            />
          </div>
          <div className="row">
            <label htmlFor="contributions">Total deductions</label>
            <input
              min="0"
              type="number"
              name="contributions"
              id="contributions"
              step="10"
              value={formIncome.contributions || ""}
              //value={totalDeductions}
              onChange={handleChange}
              //readOnly
            />
          </div>
          <div className="line"></div>
          <div className="row">
            <label htmlFor="weeklyNet">Weekly Net Salary</label>
            <input
              min="0"
              type="number"
              name="weeklyNet"
              id="weeklyNet"
              //value={formIncome.weeklyNet.toFixed(2)}
              value={weeklyNet || ""}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div className="row">
            <label htmlFor="monthlyNet">Monthly Net Salary</label>
            <input
              min="0"
              type="number"
              name="monthlyNet"
              id="monthlyNet"
              //value={formIncome.monthlyNet.toFixed(2)}
              value={monthlyNet || ""}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div className="row">
            <label htmlFor="yearlyNet">Yearly Net Salary</label>
            <input
              min="0"
              type="number"
              name="yearlyNet"
              id="yearlyNet"
              value={formIncome.yearlyNet || ""}
              //value={yearlyNet}
              onChange={handleChange}
              //readOnly
            />
          </div>
        </form>

        <button onClick={() => handleSaveBudget()}>SAVE</button>
      </div>
    </StyledIncome>
  );
};

const StyledIncome = styled(motion.div)`
  h3 {
    color: white;
    //font-weight: 500;
    margin-bottom: 1rem;
  }
  .container {
    width: 100%;
    margin-bottom: 1rem;
    padding: 3rem;
    border-radius: 4px;
    background-color: #39393c;
    color: #848586;
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
    input {
      padding: 0.25rem;
      font-size: 1rem;
      outline: solid #848586 2px;
      background-color: #39393c;
      border-radius: 4px;
      border: transparent solid 2px;
      color: #848586;
      &:hover,
      &:active,
      &:focus {
        outline: #00b4ee solid 2px;
        color: white;
      }
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

export default Income;
