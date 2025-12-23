const calculatorWrap = document.querySelector('.calc-wrap');
const calculatorText = document.querySelector('.header-panel p');

const operators = ['+', '-', '/', '*']

isAnswer = false;

calculatorWrap.addEventListener('click', e => {
  const b = e.target;
  const l = calculatorText.textContent[calculatorText.textContent.length - 1];
  if(b.tagName === 'BUTTON') if(isAnswer) {calculatorText.textContent = ''; isAnswer = false};
  if(b.dataset?.value === '=') {

    if(operators.includes(l) || l === '.') return;
    calculatorText.textContent = eval(
      calculatorText
      .textContent
      .replaceAll('×', '*')
      .replaceAll('÷', '/')
    )
    isAnswer = true;
  }

  else if(/\d/.test(b.dataset?.value)) { calculatorText.textContent += b.dataset?.value; }

  else if(operators.includes(b.dataset?.value)) {
    if(b.dataset.value === '-') {if(/\d/.test(l) || !l) {calculatorText.textContent += '-'; console.log('- 100%')}}
    else if(/\d/.test(l)) calculatorText.textContent += b.textContent;
  }

  else if(b.dataset?.value === '.') { if(/\d/.test(l)) calculatorText.textContent += '.'; }
})