let time = null;
const notesWrap = document.querySelector('.notes-wrap');
const textBlock = document.querySelector('[data-notes-text-block]');

const btnSaveNotes = document.querySelector('[data-save-text]');
btnSaveNotes.addEventListener('click', () => localStorage.setItem('notes-text', textBlock.innerHTML))

const btnReloadNotesTags = document.querySelector('.reload-all-notes-tags');
btnReloadNotesTags.addEventListener('click', reloadNotes);

function reloadNotes() {
  textBlock.innerHTML = textBlock.innerHTML.replace(/<\/?mark>/g, '');
  searchWordsInNotes.value = '';
  localStorage.setItem('notes-text', textBlock.innerHTML);
}

const searchWordsInNotes = document.querySelector('.search-text-in-notes');
searchWordsInNotes.addEventListener('focusin', () => btnSaveNotes.click());
searchWordsInNotes.addEventListener('focusout', reloadNotes);

searchWordsInNotes.addEventListener('input', e => {
  const search = e.target.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if(!search.length) return textBlock.innerHTML = localStorage.getItem('notes-text');

  textBlock.innerHTML = localStorage.getItem('notes-text')
  .replace(new RegExp(`(?<!<[^>]{0,10})${search}(?![^<]{0,10}>)`, 'gi'), '<mark>$&</mark>');
});

document.querySelector('.btn-up')
.addEventListener('click', () => textBlock.scrollTop = 0);
document.querySelector('.btn-down')
.addEventListener('click', () => textBlock.scrollTop = textBlock.scrollHeight);