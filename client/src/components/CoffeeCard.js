// CoffeeCard.js
import React from "react";
import { Card, Typography, Box, IconButton } from "@mui/joy";
import { Trash2 } from "lucide-react";

function CoffeeCard({ coffee, onDelete }) {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${coffee.name}"?`)) {
      onDelete(coffee.id);
    }
  };

  return (
    <Card
      variant="soft"
      sx={{
        p: 2,
        bgcolor: {
          xs: "neutral.softBg", // adapts light/dark mode
          md: "rgba(255, 255, 255, 0.05)", // subtle transparency in dark
        },
        borderColor: "divider",
        boxShadow: "sm",
        "&:hover": {
          bgcolor: {
            xs: "neutral.plainHoverBg",
            md: "rgba(255, 255, 255, 0.1)",
          },
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography level="title-md" sx={{ color: "text.primary", fontWeight: "lg" }}>
          {coffee.name}
        </Typography>
        <IconButton
          size="sm"
          variant="soft"
          color="danger"
          onClick={handleDelete}
          sx={{
            minWidth: "auto",
            "&:hover": {
              bgcolor: "danger.softHoverBg",
            },
          }}
        >
          <Trash2 size={14} />
        </IconButton>
      </Box>
      <Typography
        level="body-sm"
        sx={{
          wordWrap: "break-word",
          overflowWrap: "break-word",
          whiteSpace: "normal",
          color: "text.secondary",
        }}
      >
        {coffee.description}
      </Typography>
    </Card>
  );
}

export default CoffeeCard;