const notesWrap = document.querySelector('.notes-wrap');
const textBlock = document.querySelector('[data-notes-text-block]');

const btnSaveNotes = document.querySelector('[data-save-text]');
btnSaveNotes.addEventListener('click', () => localStorage.setItem('notes-text', textBlock.innerHTML))

const searchWordsInNotes = document.querySelector('.search-text-in-notes');
searchWordsInNotes.addEventListener('focus', () => btnSaveNotes.click())
searchWordsInNotes.addEventListener('input', () => {
  const search = searchWordsInNotes.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(search, 'gi');
  textBlock.innerHTML = localStorage.getItem('notes-text')
  .replace(regex, '<mark>$&</mark>');
  if(!searchWordsInNotes.value.length) textBlock.innerHTML = localStorage.getItem('notes-text');
})