const calculatorTitle = document.querySelector(".calculatorResult h1");
const buttons = document.querySelectorAll("button");
const resetBtn = document.getElementById("resetBtn");

let isWaiting = false;
let operatorValue = "";
let initialValue = 0;

function setNumber(value) {
  if (isWaiting) {
    calculatorTitle.textContent = value;
    isWaiting = false;
  } else {
    const calculatorValue = calculatorTitle.textContent;
    calculatorTitle.textContent =
      calculatorValue === "0" ? value : calculatorValue + value;
  }
}

const addPoint = () => {
  if (!calculatorTitle.textContent.includes(".")) {
    calculatorTitle.textContent = `${calculatorTitle.textContent}.`;
  }
};

function getOperator(operator){
    const currentValue = Number(calculatorTitle.textContent);

    if(operatorValue && isWaiting){
        operatorValue = operator;
        return;
    }
    if(!initialValue){
        initialValue = currentValue;
    }
    else {
        const calculationResult = calculation[operatorValue](initialValue,currentValue);
        calculatorTitle.textContent = calculationResult;
    initialValue = calculationResult;
    }

    isWaiting = true;
    operatorValue = operator;

}

const calculation = {
    "+":(firstNumber,secondNumber)=> firstNumber + secondNumber,
    "-":(firstNumber,secondNumber)=> firstNumber - secondNumber,
    "/":(firstNumber,secondNumber)=> firstNumber / secondNumber,
    "*":(firstNumber,secondNumber)=> firstNumber * secondNumber,
    "=":(firstNumber,secondNumber)=> secondNumber,
}



buttons.forEach((button) => {
  if (button.classList.length === 0) {
    button.addEventListener("click", () => setNumber(button.value));
  } else if (button.classList.contains("operator")) {
  button.addEventListener("click",()=> getOperator(button.value))
  } else if (button.classList.contains("point")) {
    button.addEventListener("click", () => addPoint());
  }
});

resetBtn.addEventListener("click", () => {
  calculatorTitle.textContent = "0";
  isWaiting = false;
  operatorValue = "";
  initialValue = 0;
});
