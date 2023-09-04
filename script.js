// Get the calculator display element and buttons
const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

// Object containing functions for basic arithmetic operations
const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "=": (secondNumber) => secondNumber,
};

// Initialize variables for calculations
let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

// Function to handle appending numbers to the display
function sendNumberValue(n) {
  if (awaitingNextValue) {
    calculatorDisplay.textContent = n;
    awaitingNextValue = false;
  } else {
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === "0" ? n : displayValue + n;
  }
}

// Function to add a decimal point
function addDecimal() {
  if (awaitingNextValue) return;
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

// Function to handle operator buttons
function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  if (operator && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  awaitingNextValue = true;
  operatorValue = operator;
}

// Function to reset the calculator
function resetAll() {
  calculatorDisplay.textContent = "0";
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
}

// Add event listeners for numbers, operators & decimal button
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    // Numbers
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    // Operators
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    // Decimal point
    inputBtn.addEventListener("click", () => addDecimal());
  }
});

// Add event listener to the clear button
clearBtn.addEventListener("click", resetAll);
