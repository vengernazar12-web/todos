document.addEventListener('keydown', e => {
  if(e.key === '<' || e.key === '>') e.preventDefault();
  if(e.key === 'Enter') {
    if(todoWrap.classList.contains('show')) todoAddBtn.click();
    else if(calculatorWrap.classList.contains('show')) {
      allCalcBtnsObj['='].click();
      allCalcBtnsObj['='].classList.add('btn-active');
    }
    else if(saveUrlsWrap.classList.contains('show')) saveUrlBtn.click();
  }
  else if(calculatorWrap.classList.contains('show')) {
    let button = e.key;
    if(button === 'Backspace') {
      delCalcSymbolBtn.click();
      return delCalcSymbolBtn.classList.add('btn-active');
    };
    if(button === '=') button = '+';
    if(allCalcBtnsObj[button]) {
      allCalcBtnsObj[button].click();
      allCalcBtnsObj[button].classList.add('btn-active');
    };
  }
})
document.addEventListener('keyup', () => {
  if(calculatorWrap.classList.contains('show')) {
    allNavBtns.forEach(v => v.classList.remove('btn-active'));
    delCalcSymbolBtn.classList.remove('btn-active');
  }
})

const allStatsWrap = document.querySelector('.all-stats-wrap');
const todosNumberStats = allStatsWrap.querySelector('.todos-number-stats');
const notesSymbolsNumber = allStatsWrap.querySelector('.notes-symbols-number');
const savedUrlsNumber = allStatsWrap.querySelector('.saved-urls-number');
document.querySelector('.show-all-dashboard-stats')
.addEventListener('click', () => {
  renderTodos();
  todosNumberStats.textContent = `You have "${todosContainer.children.length}" todos`;

  notesSymbolsNumber.textContent = `You have "${(localStorage.getItem('notes-text') || '').replace(/<[^<>]+>/g, '').length}" notes symbols`;

  renderAllUrls();
  savedUrlsNumber.textContent = `You have "${allUrlsContainer.children.length}" saved urls`;

  allStatsWrap.classList.toggle('show');
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
.addEventListener('click', () => { renderTodos(); todoWrap.classList.add('show')});

document.querySelector('.open-notes-wrap')
.addEventListener('click', () => {
  textBlock.innerHTML = (localStorage.getItem('notes-text') || '');
  reloadNotes();
  notesWrap.classList.add('show');
})

document.querySelector('.open-calc-wrap')
.addEventListener('click', () => {
  calculatorWrap.classList.add('show');
  allCalcBtnsObj['='].click();
});

document.querySelector('.open-save-urls-wrap')
.addEventListener('click', () => { renderAllUrls(); saveUrlsWrap.classList.add('show')});

/* All closed btns */
document.querySelector('[data-close-todo-wrap]')
.addEventListener('click', () => todoWrap.classList.remove('show'));

document.querySelector('[data-close-notes-wrap]')
.addEventListener('click', () => {
  notesWrap.classList.remove('show');
  localStorage.setItem('notes-text', textBlock.innerHTML);
  reloadNotes();
});

document.querySelector('.close-calc-wrap')
.addEventListener('click', () => calculatorWrap.classList.remove('show'));

document.querySelector('.close-save-urls-wrap')
.addEventListener('click', () => saveUrlsWrap.classList.remove('show'))