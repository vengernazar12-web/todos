const notesWrap = document.querySelector('.notes-wrap');
const textBlock = document.querySelector('[data-notes-text-block]');

document.querySelector('[data-save-text]')
.addEventListener('click', () => localStorage.setItem('notes-text', textBlock.textContent))