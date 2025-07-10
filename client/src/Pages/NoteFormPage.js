// Pages/NoteFormPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/joy";
import NoteForm from "../components/NoteForm";
import { useUser } from "../context/UserContext"; // ✅ custom hook instead of raw context

function NoteFormPage({ coffees }) {
  const { id } = useParams(); // note id if editing
  const navigate = useNavigate();
  const { user, setUser } = useUser(); // ✅ useUser() hook here
  const [existingNote, setExistingNote] = useState(null);
  const isEditing = !!id;

  useEffect(() => {
    if (isEditing) {
      fetch(`/notes/${id}`, { credentials: "same-origin" })
        .then((res) => res.json())
        .then((noteData) => {
          setExistingNote(noteData);
        });
    }
  }, [id, isEditing]);

  const handleNoteAdded = (newNote) => {
    const updatedNotes = isEditing
      ? user.notes.map((note) => (note.id === newNote.id ? newNote : note))
      : [...user.notes, newNote];

    setUser({ ...user, notes: updatedNotes });
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography level="h3" sx={{ mb: 2 }}>
        {isEditing ? "Edit Note" : "Add New Note"}
      </Typography>
      <NoteForm
        coffees={coffees}
        existingNote={existingNote}
        onNoteAdded={handleNoteAdded}
        onCancel={handleCancel}
      />
    </Box>
  );
}

export default NoteFormPage;
