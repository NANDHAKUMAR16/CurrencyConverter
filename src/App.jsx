import React, { useEffect, useState } from 'react';
import './App.css';
import { Button } from '@material-ui/core';
import CountryCode from "./Components/countryCode";

function App() {
  const [unicode, setUniCode] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [totalAmount, setTotalAmount] = useState(null);

  const settingUniCode = async () => {
    try {
      const response = await fetch("https://api.frankfurter.app/currencies");
      const unicodes = await response.json();
      setUniCode(Object.keys(unicodes));
    } catch (error) {
      console.error('Error fetching currency codes:', error);
    }
  }

  useEffect(() => {
    settingUniCode();
  }, []);

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  }

  const calculateAmount = async () => {
    try {
      const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const finalAmount = await response.json();
      setTotalAmount(Object.values(finalAmount.rates)[0]);
    } catch (error) {
      console.error('Error calculating amount:', error);
      setTotalAmount(null);
    }
  }

  return (
    <div className="container">
      <div className="box">
        <h3 style={{ textAlign: "center", padding: "10px 0px" }}>Currency Converter</h3>
        <div className="main">
          <div className="from">
            <CountryCode
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              label="From"
              options={unicode.map((countryCode, index) => ({ value: countryCode, label: countryCode }))}
            />
          </div>
          <span className="material-symbols-outlined" onClick={handleSwap} style={{ cursor: "pointer" }}>
            swap_horiz
          </span>
          <div className="to">
            <CountryCode
              value={to}
              onChange={(e) => setTo(e.target.value)}
              label="To"
              options={unicode.map((countryCode) => ({ value: countryCode, label: countryCode }))}
            />
          </div>
        </div>
        <div className="totalAmount">
          <input type="text" className='inputTotal' onKeyUp={(e) => e.key == "Enter" ? calculateAmount() : ""} onChange={(e) => setAmount(e.target.value)} value={amount} />
        </div>
        <div className="btn">
          <Button variant="contained" style={{ backgroundColor: "royalblue", color: "#fff" }} onClick={calculateAmount}>Convert</Button>
        </div>
        <div className="ShowingAmount" style={{ textAlign: "right", marginTop: "10px" }}>
          {totalAmount !== null && (
            <p style={{ color: "royalblue" }}>Converting Amount: {totalAmount}{" "}{to}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
