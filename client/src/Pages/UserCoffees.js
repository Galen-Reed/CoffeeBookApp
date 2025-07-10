import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Divider,
  Stack,
} from "@mui/joy";
import { Star, Edit, Delete, Plus, Coffee } from "lucide-react";
import { useUser } from "../context/UserContext";

function UserCoffees() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const userNotes = user?.notes || [];

  const handleDeleteNote = (noteId) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      fetch(`/notes/${noteId}`, {
        method: "DELETE",
        credentials: "same-origin",
      })
        .then((response) => {
          if (response.ok) {
            const updatedNotes = user.notes.filter((note) => note.id !== noteId);
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

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < rating ? "currentColor" : "none"}
        color={i < rating ? "#fbbf24" : "#d1d5db"}
      />
    ));

  const getUniqueUserCoffees = () => {
    if (!userNotes || userNotes.length === 0) return [];

    const grouped = {};

    userNotes.forEach((note) => {
      const coffee = note.coffee;
      if (!coffee) return;

      if (!grouped[coffee.id]) {
        grouped[coffee.id] = {
          ...coffee,
          notes: [],
          averageRating: 0,
          totalNotes: 0,
        };
      }

      grouped[coffee.id].notes.push(note);
    });

    Object.values(grouped).forEach((coffee) => {
      const total = coffee.notes.reduce((sum, n) => sum + n.rating, 0);
      coffee.totalNotes = coffee.notes.length;
      coffee.averageRating = total / coffee.totalNotes;
    });

    return Object.values(grouped);
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
          onClick={() => navigate("/notes/new")}
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
              onClick={() => navigate("/notes/new")}
            >
              Add Your First Note
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: 3,
          }}
        >
          {userCoffees.map((coffee) => (
            <Card key={coffee.id} variant="outlined" sx={{ height: "fit-content" }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                  <Box>
                    <Typography level="h6" sx={{ mb: 1 }}>
                      {coffee.name}
                    </Typography>
                    <Typography level="body-sm" color="neutral" sx={{ mb: 1 }}>
                      {coffee.cafe?.name} • {coffee.cafe?.location}
                    </Typography>
                  </Box>
                </Box>

                <Typography level="body-sm" sx={{ mb: 2 }}>
                  Description:
                </Typography>
                <Typography level="body-sm" color="neutral" sx={{ mb: 2 }}>
                  {coffee.description}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Stack spacing={2}>
                  <Typography level="title-sm">Your Notes:</Typography>
                  {coffee.notes.map((note) => (
                    <Card key={note.id} variant="soft" size="sm">
                      <CardContent>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Box sx={{ display: "flex", gap: 0.5 }}>{renderStars(note.rating)}</Box>
                            <Typography level="body-sm">{note.rating}/5</Typography>
                          </Box>
                          <Box sx={{ display: "flex", gap: 0.5 }}>
                            <IconButton
                              size="sm"
                              variant="plain"
                              color="neutral"
                              onClick={() => navigate(`/notes/${note.id}/edit`)}
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
                        <Typography level="body-sm">{note.comment}</Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default UserCoffees;