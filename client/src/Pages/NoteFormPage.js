import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/joy";
import NoteForm from "../components/NoteForm";
import { useUser } from "../context/UserContext"; 

function NoteFormPage({ coffees }) {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { user, setUser, fetchUser } = useUser(); 
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
  // update user with new coffees/notes
  const updatedCoffees = user.coffees.map((coffee) => {
    if (coffee.id === newNote.coffee_id) {
      const existingNotes = coffee.notes || [];
      const updatedNotes = isEditing
        ? existingNotes.map((note) => (note.id === newNote.id ? newNote : note))
        : [...existingNotes, newNote];
      return { ...coffee, notes: updatedNotes };
    }
    return coffee;
  });

  setUser({ ...user, coffees: updatedCoffees });
  fetchUser();
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
