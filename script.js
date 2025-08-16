// --- Load profile ---
fetch('profile.json')
    .then(response => response.json())
    .then(profile => {
        document.getElementById('user-name').textContent = profile.username;
        document.getElementById('user-bio').textContent = profile.bio;
    });

// --- Notes CRUD ---
let notes = JSON.parse(localStorage.getItem('notes')) || [];
let deletedNotes = JSON.parse(localStorage.getItem('deletedNotes')) || [];

const notesList = document.getElementById('notes-list');
const deletedNotesList = document.getElementById('deleted-notes-list');

function renderNotes() {
    notesList.innerHTML = '';
    notes.forEach((note, index) => {
        const div = document.createElement('div');
        div.className = 'note';

        const textSpan = document.createElement('span');
        textSpan.textContent = note;

        const btnContainer = document.createElement('div');

        const copyBtn = document.createElement('button');
        copyBtn.textContent = 'Copy';
        copyBtn.onclick = () => navigator.clipboard.writeText(note);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteNote(index);

        btnContainer.appendChild(copyBtn);
        btnContainer.appendChild(deleteBtn);

        div.appendChild(textSpan);
        div.appendChild(btnContainer);

        notesList.appendChild(div);
    });

    // Deleted notes
    deletedNotesList.innerHTML = '';
    deletedNotes.forEach(note => {
        const div = document.createElement('div');
        div.className = 'deleted-note';
        div.textContent = note;
        deletedNotesList.appendChild(div);
    });
}

function addNote() {
    const note = prompt('Write your note:');
    if(note) {
        notes.push(note);
        saveNotes();
        renderNotes();
    }
}

function deleteNote(index) {
    deletedNotes.push(notes[index]);
    notes.splice(index, 1);
    saveNotes();
    renderNotes();
}

function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('deletedNotes', JSON.stringify(deletedNotes));
}

document.getElementById('add-note').addEventListener('click', addNote);

renderNotes();function addNote() {
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
