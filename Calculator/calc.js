let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');
let string = '';
let history = [];

let arr = Array.from(buttons);
arr.forEach((button) => {
  button.addEventListener('click', (e) => {
    if(e.target.innerHTML == '=') {
    try {
      let result = eval(string);
      if (typeof result !== 'number' || isNaN(result) || !isFinite(result)) {
        input.value = 'Error';
      } else {
      input.value = result;
      history.push({ expression: string, result });
      updateHistoryDisplay();
  }
} 
  catch (error) {
    input.value = 'Error';
  }
      string = '';
    } else if (e.target.innerHTML == 'AC') {
      string = '';
      input.value = string;
    } else if (e.target.innerHTML == 'DEL') {
      string = string.substring(0, string.length - 1);
      input.value = string;
    } else {
      string += e.target.innerHTML;
      input.value = string;
    }
  });
});

const themeToggleBtn = document.querySelector('.theme-toggler');
const calculator = document.querySelector('.calculator');
const toggleIcon = document.querySelector('.toggler-icon');
let isDark = true;
themeToggleBtn.onclick = () => {
  calculator.classList.toggle('dark');
  themeToggleBtn.classList.toggle('active');
  isDark = !isDark;
};

function updateHistoryDisplay() {
  let historyDisplay = document.getElementById('history');
  let historyHTML = '<h3>History</h3>';
  for (let entry of history) {
    historyHTML += `<p>${entry.expression}=${entry.result}</p>`;
  }
  historyDisplay.innerHTML = historyHTML;
}
