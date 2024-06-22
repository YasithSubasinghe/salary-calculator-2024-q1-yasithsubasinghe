import React, { useState } from "react";
import "../App.css";
import calculateSalary from "../cal";

function Page() {
  const [basicSalary, setBasicSalary] = useState(0);
  const [earnings, setEarnings] = useState([
    { type: "earning", name: "", amount: 0, epf: false },
  ]);
  const [deductions, setDeductions] = useState([
    { type: "deduction", name: "", amount: 0, epf: false },
  ]);

  const handleBasicSalaryChange = (event) => {
    setBasicSalary(parseInt(event.target.value, 10));
  };

  const addEarning = () => {
    setEarnings([
      ...earnings,
      { type: "earning", name: "", amount: 0, epf: false },
    ]);
  };

  const handleEarningChange = (index, field, value) => {
    setEarnings(
      earnings.map((earning, i) => {
        if (i === index) {
          return { ...earning, [field]: value };
        } else {
          return earning;
        }
      })
    );
  };

  const deleteEarning = (index) => {
    setEarnings(earnings.filter((_, i) => i !== index));
  };

  const addDeduction = () => {
    setDeductions([
      ...deductions,
      { type: "deduction", name: "", amount: 0, epf: false },
    ]);
  };

  const handleDeductionChange = (index, field, value) => {
    setDeductions(
      deductions.map((deduction, i) => {
        if (i === index) {
          return { ...deduction, [field]: value };
        } else {
          return deduction;
        }
      })
    );
  };

  const deleteDeduction = (index) => {
    setDeductions(deductions.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setBasicSalary(0);
    setEarnings([{ type: "earning", name: "", amount: 0, epf: false }]);
    setDeductions([{ type: "deduction", name: "", amount: 0, epf: false }]);
  };

  const {
    grossEarnings,
    grossDeductions,
    netSalary,
    employerEPF,
    employerETF,
    grossSalaryForEPF,
  } = calculateSalary(basicSalary, earnings, deductions);

  return (
    <div className="container">
      {/* Calculate your salary Card */}
      <div
        className="card"
        style={{
          width: "680px",
          height: "616px",
          position: "absolute",
          top: "142px",
          left: "128px",
          border: "0.5px solid black",
        }}
      >
        <h1 style={{ marginLeft: "40px" }}>Calculate Your Salary</h1>
        <div className="form-group">
          <label htmlFor="basicSalary" style={{ marginLeft: "40px" }}>
            Basic Salary
          </label>
          <br />
          <br />
          <input
            type="number"
            id="basicSalary"
            value={basicSalary}
            onChange={handleBasicSalaryChange}
            style={{
              marginLeft: "40px",
              height: "30px",
              width: "400px",
            }}
          />
        </div>
        <div className="form-group">
          <h2 style={{ marginLeft: "40px" }}>Earnings</h2>
          <p style={{ fontSize: "14px", color: "#aaa", marginLeft: "40px" }}>
            Allowance,Fixed Allowance,Bonus and etc.
          </p>
          <ul>
            {earnings.map((earning, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                <input
                  type="text"
                  placeholder="Earning Name"
                  value={earning.name}
                  onChange={(event) =>
                    handleEarningChange(index, "name", event.target.value)
                  }
                  style={{
                    height: "30px",
                    width: "250px",
                    marginRight: "10px",
                  }}
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={earning.amount}
                  onChange={(event) =>
                    handleEarningChange(index, "amount", event.target.value)
                  }
                  style={{
                    height: "30px",
                    width: "130px",
                  }}
                />
                <button
                  onClick={() => deleteEarning(index)}
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    padding: "0 10px",
                    verticalAlign: "middle",
                  }}
                >
                  <img
                    src={require("../images/d.png")}
                    alt="Delete"
                    style={{ height: "20px", width: "20px" }}
                  />
                </button>
                <input
                  type="checkbox"
                  checked={earning.epf}
                  onChange={(event) =>
                    handleEarningChange(index, "epf", event.target.checked)
                  }
                />
                <label htmlFor="epf">EPF/ETF</label>
              </li>
            ))}
          </ul>
          <button
            style={{ border: "none", backgroundColor: "transparent" }}
            onClick={addEarning}
          >
            <span style={{ color: "blue", marginLeft: "40px" }}>
              +Add New Allowance
            </span>
          </button>
        </div>
        <div className="form-group">
          <h2 style={{ marginLeft: "40px" }}>Deductions</h2>
          <p style={{ fontSize: "14px", color: "#aaa", marginLeft: "40px" }}>
            Salary Advances,Loan Deduction and all.
          </p>
          <ul>
            {deductions.map((deduction, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                <input
                  type="text"
                  placeholder="Deduction Name"
                  value={deduction.name}
                  onChange={(event) =>
                    handleDeductionChange(index, "name", event.target.value)
                  }
                  style={{
                    height: "30px",
                    width: "250px",
                    marginRight: "10px",
                  }}
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={deduction.amount}
                  onChange={(event) =>
                    handleDeductionChange(index, "amount", event.target.value)
                  }
                  style={{
                    height: "30px",
                    width: "130px",
                  }}
                />
                <button
                  onClick={() => deleteDeduction(index)}
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    padding: "0 10px",
                    verticalAlign: "middle",
                  }}
                >
                  <img
                    src={require("../images/d.png")}
                    alt="Delete"
                    style={{ height: "20px", width: "20px" }}
                  />
                </button>
                <input
                  type="checkbox"
                  checked={deduction.epf}
                  onChange={(event) =>
                    handleDeductionChange(index, "epf", event.target.checked)
                  }
                />
                <label htmlFor="epf">EPF/ETF</label>
              </li>
            ))}
          </ul>
          <button
            style={{ border: "none", backgroundColor: "transparent" }}
            onClick={addDeduction}
          >
            <span style={{ color: "blue", marginLeft: "40px" }}>
              +Add New Deduction
            </span>
          </button>
        </div>
        {/* Reset Button */}
        <button
          className="reset-button"
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            border: "none",
            backgroundColor: "transparent",
            color: "blue",
            display: "flex",
            alignItems: "center",
          }}
          onClick={resetForm}
        >
          <img
            src={require("../images/r.png")}
            alt="Reset"
            style={{ height: "20px", marginRight: "2px" }}
          />
          <span style={{ fontSize: "17px" }}>Reset</span>
        </button>
      </div>
      {/* Your Salary Section */}
      <div
        className="card"
        style={{
          width: "480px",
          height: "614px",
          position: "absolute",
          top: "142px",
          left: "832px",
          border: "0.5px solid black",
        }}
      >
        <h1 style={{ marginLeft: "20px" }}>Your Salary</h1>
        <div className="results" style={{ padding: "20px" }}>
          <h5>
            <span style={{ color: "#aaa" }}>Items</span>
            <span style={{ float: "right", color: "#aaa" }}>Amount</span>
          </h5>
          {[
            { label: "Basic Salary", value: basicSalary },
            { label: "Gross Earnings", value: grossEarnings },
            { label: "Gross Deductions", value: -grossDeductions },
            {
              label: "Employee EPF (8%)",
              value: -(grossSalaryForEPF * 0.08).toFixed(2),
            },
            {
              label: "APIT",
              value: -(grossEarnings * 0.18 - 25500).toFixed(2),
            },
            { label: "Net Salary (Take Home)", value: netSalary, border: true },
          ].map((item, index) => (
            <p
              key={index}
              style={
                item.border ? { border: "1px solid #ccc", padding: "5px" } : {}
              }
            >
              <span>{item.label}</span>
              <span style={{ float: "right" }}>{item.value}</span>
            </p>
          ))}
          <p style={{ color: "#aaa", marginTop: "10px", fontSize: "14px" }}>
            <span>Contribution from the Employer</span>
          </p>
          {[
            {
              label: "Employer EPF (12%)",
              value: (grossSalaryForEPF * 0.12).toFixed(2),
            },
            {
              label: "Employer ETF (3%)",
              value: (grossSalaryForEPF * 0.03).toFixed(2),
            },
            {
              label: "Cost to Company",
              value: (grossEarnings + employerEPF + employerETF).toFixed(2),
            },
          ].map((item, index) => (
            <p key={index} style={{ marginTop: "10px" }}>
              <span>{item.label}</span>
              <span style={{ float: "right" }}>{item.value}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
