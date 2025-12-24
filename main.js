document.addEventListener('keydown', e => {
  if(e.key === 'Enter') {
    if(todoWrap.classList.contains('show')) todoAddBtn.click();
    else if(calculatorWrap.classList.contains('show')) allCalcBtnsObj['='].click();
  }
  else if(calculatorWrap.classList.contains('show')) {
    let button = e.key;
    if(button === 'Backspace') return delCalcSymbolBtn.click();
    if(button === '=') button = '+';
    if(allCalcBtnsObj[button]) allCalcBtnsObj[button].click();
  }
})

/* Theme switcher */
const todoSwitchTheme = document.querySelector('[data-theme-switcher]');
todoSwitchTheme.addEventListener('click', () => setTodoTheme())
function setTodoTheme() {
  const theme = localStorage.getItem('todo-theme');
  if(theme === 'dark') {
    localStorage.setItem('todo-theme', 'light');
    document.documentElement.classList.remove('dark-theme');
    todoSwitchTheme.textContent = '☀️';
  }
  else {
    localStorage.setItem('todo-theme', 'dark');
    document.documentElement.classList.add('dark-theme');
    todoSwitchTheme.textContent = '🌑';
  }
}

if(localStorage.getItem('todo-theme') === 'dark') {
  document.documentElement.classList.add('dark-theme');
  todoSwitchTheme.textContent = '🌑';
}
else todoSwitchTheme.textContent = '☀️';

/* All opened btns */
document.querySelector('.open-todo-wrap')
.addEventListener('click', () => todoWrap.classList.add('show'));

document.querySelector('.open-notes-wrap')
.addEventListener('click', () => {
  textBlock.textContent = (localStorage.getItem('notes-text') || '');
  notesWrap.classList.add('show');
})

document.querySelector('.open-calc-wrap')
.addEventListener('click', () => {calculatorWrap.classList.add('show'); calculatorText.textContent = '';});

/* All closed btns */
document.querySelector('[data-close-todo-wrap]')
.addEventListener('click', () => todoWrap.classList.remove('show'));

document.querySelector('[data-close-notes-wrap]')
.addEventListener('click', () => {
  notesWrap.classList.remove('show');
  textBlock.textContent = (localStorage.getItem('notes-text') || '');
});

document.querySelector('.close-calc-wrap')
.addEventListener('click', () => calculatorWrap.classList.remove('show'));