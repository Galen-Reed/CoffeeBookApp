import React from "react";
import { useUser } from "../context/UserContext";
import { Box } from "@mui/joy";
import CafeForm from "../components/CafeForm";
import { useNavigate } from "react-router-dom";

function CafeFormPage() {

  const { setCafes } = useUser();
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
