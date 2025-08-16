// Load profile
fetch('profile.json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('profile-data').textContent = JSON.stringify(data, null, 2);
    });

// Notes CRUD
let notes = JSON.parse(localStorage.getItem('notes')) || [];
let deletedNotes = JSON.parse(localStorage.getItem('deletedNotes')) || [];

const notesList = document.getElementById('notes-list');
const deletedNotesList = document.getElementById('deleted-notes-list');

function renderNotes() {
    notesList.innerHTML = '';
    notes.forEach((note, index) => {
        const div = document.createElement('div');
        div.className = 'note';
        div.textContent = note;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteNote(index);
        div.appendChild(deleteBtn);
        notesList.appendChild(div);
    });

    deletedNotesList.innerHTML = '';
    deletedNotes.forEach(note => {
        const div = document.createElement('div');
        div.className = 'deleted-note';
        div.textContent = note;
        deletedNotesList.appendChild(div);
    });
}

function addNote() {
    const note = prompt('Write a new note:');
    if(note) {
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
    }
}

function deleteNote(index) {
    deletedNotes.push(notes[index]);
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('deletedNotes', JSON.stringify(deletedNotes));
    renderNotes();
}

document.getElementById('add-note').addEventListener('click', addNote);

renderNotes();
