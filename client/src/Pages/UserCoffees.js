import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Modal,
  ModalDialog,
  ModalClose,
  Divider,
  Stack,
  Badge
} from "@mui/joy";
import { Star, Edit, Delete, Plus, Coffee } from "lucide-react";
import NoteForm from "../components/NoteForm";

function UserCoffees({ coffees, setCoffees, user, setUser }) {
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  // Use notes from user data (from check_session)
  const userNotes = user?.notes || [];

  const handleNoteAdded = (newNote) => {
    if (editingNote) {
      // Update existing note in user data
      const updatedNotes = user.notes.map(note => 
        note.id === editingNote.id ? newNote : note
      );
      setUser({ ...user, notes: updatedNotes });
      setEditingNote(null);
    } else {
      // Add new note to user data
      const updatedNotes = [...user.notes, newNote];
      setUser({ ...user, notes: updatedNotes });
    }
    setShowNoteForm(false);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setShowNoteForm(true);
  };

  const handleDeleteNote = (noteId) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      fetch(`/notes/${noteId}`, {
        method: "DELETE",
        credentials: "same-origin"
      })
        .then((response) => {
          if (response.ok) {
            const updatedNotes = user.notes.filter(note => note.id !== noteId);
            setUser({ ...user, notes: updatedNotes });
          } else {
            throw new Error("Failed to delete note");
          }
        })
        .catch((error) => {
          console.error("Error deleting note:", error);
        });
    }
  };

  const handleCloseForm = () => {
    setShowNoteForm(false);
    setEditingNote(null);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < rating ? "currentColor" : "none"}
        color={i < rating ? "#fbbf24" : "#d1d5db"}
      />
    ));
  };

  const getUniqueUserCoffees = () => {
    const coffeeIds = new Set(userNotes.map(note => note.coffee_id));
    return Array.from(coffeeIds).map(coffeeId => {
      const coffee = coffees.find(c => c.id === coffeeId);
      const coffeeNotes = userNotes.filter(note => note.coffee_id === coffeeId);
      const avgRating = coffeeNotes.reduce((sum, note) => sum + note.rating, 0) / coffeeNotes.length;
      
      return {
        ...coffee,
        notes: coffeeNotes,
        averageRating: avgRating,
        totalNotes: coffeeNotes.length
      };
    });
  };

  if (!user) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  const userCoffees = getUniqueUserCoffees();

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography level="h3" startDecorator={<Coffee />}>
          {user.username}'s Coffee Notes
        </Typography>
        <Button
          variant="solid"
          color="primary"
          startDecorator={<Plus />}
          onClick={() => setShowNoteForm(true)}
        >
          Add New Note
        </Button>
      </Box>

      {userNotes.length === 0 ? (
        <Card variant="soft" sx={{ textAlign: "center", py: 4 }}>
          <CardContent>
            <Typography level="h4" sx={{ mb: 2 }}>
              No coffee notes yet!
            </Typography>
            <Typography sx={{ mb: 3 }}>
              Start your coffee journey by adding your first note about a coffee you've tried.
            </Typography>
            <Button
              variant="solid"
              color="primary"
              startDecorator={<Plus />}
              onClick={() => setShowNoteForm(true)}
            >
              Add Your First Note
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: 3 }}>
          {userCoffees.map((coffee) => (
            <Card key={coffee.id} variant="outlined" sx={{ height: "fit-content" }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                  <Box>
                    <Typography level="h6" sx={{ mb: 1 }}>
                      {coffee.name}
                    </Typography>
                    <Typography level="body-sm" color="neutral" sx={{ mb: 1 }}>
                      {coffee.cafe?.name} • {coffee.cafe?.location}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        {renderStars(Math.round(coffee.averageRating))}
                      </Box>
                      <Typography level="body-sm">
                        {coffee.averageRating.toFixed(1)}
                      </Typography>
                      <Badge color="primary" size="sm">
                        {coffee.totalNotes} note{coffee.totalNotes !== 1 ? 's' : ''}
                      </Badge>
                    </Box>
                  </Box>
                </Box>

                <Typography level="body-sm" color="neutral" sx={{ mb: 2 }}>
                  {coffee.description}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Stack spacing={2}>
                  <Typography level="title-sm">Your Notes:</Typography>
                  {coffee.notes.map((note) => (
                    <Card key={note.id} variant="soft" size="sm">
                      <CardContent>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Box sx={{ display: "flex", gap: 0.5 }}>
                              {renderStars(note.rating)}
                            </Box>
                            <Typography level="body-sm">
                              {note.rating}/5
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", gap: 0.5 }}>
                            <IconButton
                              size="sm"
                              variant="plain"
                              color="neutral"
                              onClick={() => handleEditNote(note)}
                            >
                              <Edit size={14} />
                            </IconButton>
                            <IconButton
                              size="sm"
                              variant="plain"
                              color="danger"
                              onClick={() => handleDeleteNote(note.id)}
                            >
                              <Delete size={14} />
                            </IconButton>
                          </Box>
                        </Box>
                        <Typography level="body-sm">
                          {note.comment}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Note Form Modal */}
      <Modal open={showNoteForm} onClose={handleCloseForm}>
        <ModalDialog size="lg" sx={{ maxWidth: "600px", width: "90vw" }}>
          <ModalClose />
          <NoteForm
            coffees={coffees}
            onNoteAdded={handleNoteAdded}
            onCancel={handleCloseForm}
            existingNote={editingNote}
          />
        </ModalDialog>
      </Modal>
    </Box>
  );
}

export default UserCoffees;