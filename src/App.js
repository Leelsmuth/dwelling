import React, { useState } from "react";

import './App.css';

import Logo from './logo.svg';

function App() {

  const [errorMessage, setErrorMessage] = useState('');
  const [showFormMessage, setShowFormMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [amount, setAmount] = useState(0);

  const validateCreditCard = (event) => {
    setShowFormMessage(false);
    setShowErrorMessage(false);
    event.preventDefault();

    // Get value and remove spaces
    let value = event.target[0].value.replace(/\s+/g, '');

    let cardArray = value.split('').map(card => parseInt(card));
    let cardAmount = 0;
    setShowFormMessage(true);
    if (value.length !== 16) {
      setShowErrorMessage(true);
      setErrorMessage('Invalid number');
    } else {
      if (cardArray[15] === 5 || cardArray[15] === 2) {
        cardAmount += cardArray.splice(0, 12).reduce((acc, i) => acc + i, 0);
        setAmount(cardAmount);
      } else {
        setAmount(0);
      }
    }
  };

  function formatCreditCardOnKey(event) {
    //on keyup, check for backspace to skip processing
    const code = (event.which) ? event.which : event.keyCode;
    if (code !== 8) {
      formatCreditCard();
    }
    else {
      return;
    }

  }

  function formatCreditCard() {
    const cardNumber = document.getElementById("card-number");
    //remove all non-numeric characters
    const cardNumberFormatted = cardNumber.value.replace(/\D/g, '');
    let newNumber = "";
    for (let x = 1; x <= cardNumberFormatted.length; x++) {
      //make sure input is a digit
      if (isNumeric(cardNumberFormatted.charAt(x - 1)))
        newNumber += cardNumberFormatted.charAt(x - 1);
      //add space every 4 numeric digits
      if (x % 4 === 0 && x > 0 && x < 15)
        newNumber += " ";
    }
    cardNumber.value = newNumber;
  }

  function isNumeric(char) {
    return ('0123456789'.indexOf(char) !== -1);
  }

  const clearState = () => {
    setAmount(0);
    setErrorMessage('');
    setShowFormMessage(false);
    setShowErrorMessage(false);
  };

  return (
    <div className="app">
      <div className="app-screen">
        <form onSubmit={validateCreditCard}>
          <div className="app-form--box">
            <div className="app-form--instruction">
              <header className="app-header">
                <h1>Balance Checker</h1>
                <img src={Logo} alt="Dwelling icon" />
              </header>
              <p>Enter your card number to check its balance.</p>
            </div>
            <div className="app-form--input">
              <input id="card-number" type="text" maxLength="19" className={`form-control ${showErrorMessage ? 'form-error' : ''}`} onKeyUp={formatCreditCardOnKey} onBlur={formatCreditCard} onFocus={formatCreditCard} aria-label="Enter Credit Card information" placeholder="xxxx xxxx xxxx xxxx" />
              <input type="reset" value="&times;" className="button--reset" onClick={clearState} />
            </div>
            {showFormMessage && (
              <>
                {!showErrorMessage && <p className="app-form-message app-form-balance">Your balance is ${amount}</p>}
                {showErrorMessage && <p className="app-form-message app-form-error">{errorMessage}</p>}
              </>)}
          </div>
          <button type="submit" className="button button--submit">Check</button>
        </form>
      </div>
    </div>
  );
}

export default App;
