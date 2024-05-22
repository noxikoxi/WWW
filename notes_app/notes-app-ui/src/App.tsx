import "./App.css";
import React, {useEffect, useState} from "react";

type Note = {
    id: number,
    title: string,
    content: string
};

const App = () => {

    const [notes, setNotes] = useState<Note[]>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    const resetForm = () => {
        setTitle("");
        setContent("");
        setSelectedNote(null);
    }

    const handleNoteClicked = (note: Note) => {
        setSelectedNote(note);
        setTitle(note.title);
        setContent(note.content);
    };

    const handleUpdateNote = async (event : React.FormEvent) => {
        event.preventDefault();

        if(!selectedNote){
            return;
        }

        try{
            const response = await fetch(`http://localhost:5000/api/notes/${selectedNote.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title,
                        content
                    })

                })

            if(response.ok){
                const updatedNote: Note = await response.json();
                const updatedNotesList = notes.map((note) => (
                    note.id === selectedNote.id ? updatedNote : note
                ))

                setNotes(updatedNotesList);
                resetForm();
            }
        }catch (e){
            console.log(e);
        }
    }

    const handleCancel = () =>
    {
        resetForm();
    }

    const handleDeleteNote = async (event : React.FormEvent, noteId : number) => {
        event.stopPropagation();

        try{
            await fetch(`http://localhost:5000/api/notes/${noteId}`,
                {
                    method: "DELETE"
                })
        }catch(e){
            console.log(e);
        }


        setNotes(notes.filter((note) => note.id !== noteId))
        setSelectedNote(null);
    }

    const handleAddNote = async (event: React.FormEvent) => {
        event.preventDefault()
        try {
            const response = await fetch("http://localhost:5000/api/notes",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title,
                        content
                    })
                })

            if(response.ok){
                const newNote: Note = await response.json();
                setNotes([newNote, ...notes]);
                resetForm();
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const fetchNotes = async() => {
            try{
                const response = await fetch("http://localhost:5000/api/notes");

                if(response.ok){
                    const notes: Note[] = await response.json();
                    setNotes(notes);
                }

            }catch (e){
                console.log(e)
            }
        }

        fetchNotes();
    }, []);

    return (
        <div className="app-container">
            <form className="note-form"  onSubmit={(event) =>
                selectedNote ? handleUpdateNote(event) : handleAddNote(event)}
            >
                <input placeholder="Title" value={title} required onChange={(event) => setTitle(event.target.value)}>
                </input>
                <textarea
                    value = {content}
                    placeholder="Content"
                    rows={10}
                    required
                    onChange={(event) => setContent(event.target.value)}
                >
                </textarea>
                {selectedNote ? (
                    <div className="edit-buttons">
                        <button type="submit">Save</button>
                        <button onClick={handleCancel} className="cancel-button">Cancel</button>
                    </div>
                ): (
                    <button type="submit">
                        Add Note
                    </button>
                )}
            </form>
            <div className="notes-grid">
                {notes.map((note) => (
                    <div className="notes-item" key={note.id} onClick={() => handleNoteClicked(note) }>
                        <div className="notes-header">
                            <button onClick={(event) => handleDeleteNote(event, note.id)}>x</button>
                        </div>
                        <h2>{note.title}</h2>
                        <p>{note.content}</p>
                    </div>
                    )
                )}
            </div>
        </div>
    )
}

export default App;