let time = null;
const notesWrap = document.querySelector('.notes-wrap');
const textBlock = document.querySelector('[data-notes-text-block]');

const btnSaveNotes = document.querySelector('[data-save-text]');
btnSaveNotes.addEventListener('click', () => localStorage.setItem('notes-text', textBlock.innerHTML))

const btnReloadNotesTags = document.querySelector('.reload-all-notes-tags');
btnReloadNotesTags.addEventListener('click', reloadNotes)
function reloadNotes() {
  textBlock.innerHTML = textBlock.innerHTML
  .replace(/#([^#]+)#/g, (all, match) => {
    if(match.includes('<br>') || match.includes('<div>')) return all;
    return `<span>${match}</span>`
  }).replace(/<\/?mark>/g, '');
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
  .replace(new RegExp(`(?<!<[^>]{0,5})${search}(?![^<]{0,5}>)`, 'gi'), '<mark>$&</mark>');
});