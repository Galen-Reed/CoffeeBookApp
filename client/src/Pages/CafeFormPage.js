// Pages/CafeFormPage.jsx
import React from "react";
import { Box } from "@mui/joy";
import CafeForm from "../components/CafeForm";
import { useNavigate } from "react-router-dom";

function CafeFormPage({ setCafes }) {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 3 }}>
      <CafeForm
        setCafes={setCafes}
        onCancel={() => navigate("/cafes")}
      />
    </Box>
  );
}

export default CafeFormPage;
