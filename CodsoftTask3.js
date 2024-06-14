document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    let firstOperand = '';
    let secondOperand = '';
    let currentOperation = null;
    let shouldClearDisplay = false;
  
    function updateDisplay(value) {
      if (shouldClearDisplay) {
        display.textContent = value;
        shouldClearDisplay = false;
      } else {
        display.textContent += value;
      }
    }
  
    document.querySelectorAll('.number').forEach(number => {
      number.addEventListener('click', function() {
        updateDisplay(number.textContent);
      });
    });
  
    document.querySelectorAll('.operator').forEach(operator => {
      operator.addEventListener('click', function() {
        if (operator.textContent === 'C') {
          display.textContent = '0';
          firstOperand = '';
          secondOperand = '';
          currentOperation = null;
          shouldClearDisplay = false;
          return;
        }
  
        if (operator.textContent === '=') {
          secondOperand = display.textContent;
          display.textContent = operate(firstOperand, secondOperand, currentOperation);
          firstOperand = display.textContent;
          secondOperand = '';
          currentOperation = null;
          shouldClearDisplay = true;
          return;
        }
  
        if (currentOperation !== null) {
          secondOperand = display.textContent;
          display.textContent = operate(firstOperand, secondOperand, currentOperation);
          firstOperand = display.textContent;
          secondOperand = '';
        }
  
        firstOperand = display.textContent;
        currentOperation = operator.textContent;
        shouldClearDisplay = true;
      });
    });
  
    function operate(a, b, operation) {
      a = parseFloat(a);
      b = parseFloat(b);
      switch(operation) {
        case '+':
          return (a + b).toString();
        case '-':
          return (a - b).toString();
        case '*':
          return (a * b).toString();
        case '/':
          if (b === 0) return 'Error';
          return (a / b).toString();
        default:
          return 'Error';
      }
    }
  });
  