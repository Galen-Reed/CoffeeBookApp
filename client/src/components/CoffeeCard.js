import React from "react";
import { Card, Typography, Box} from "@mui/joy";

function CoffeeCard({ coffee }) {

  return (
    <Card
      variant="soft"
      sx={{
        p: 2,
        bgcolor: {
          xs: "neutral.softBg", 
          md: "rgba(255, 255, 255, 0.05)", 
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