import React, { useState } from "react";
import {
  Card,
  Typography,
  Box,
  Divider,
  Button,
  Chip,
} from "@mui/joy";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import CafeForm from "../components/CafeForm";
import CoffeeForm from "../components/CoffeeForm";

const Collapse = ({ in: isOpen, children }) => (
  <Box
    sx={{
      maxHeight: isOpen ? "1000px" : 0,
      overflow: "hidden",
      transition: "max-height 0.3s ease-in-out",
    }}
  >
    {children}
  </Box>
);

const Cafes = ({ cafes, setCafes }) => {
  const [expandedCafes, setExpandedCafes] = useState(new Set());
  const [showAddCoffeeForm, setShowAddCoffeeForm] = useState(new Set());

  const toggleCafeExpansion = (cafeId) => {
    const newExpanded = new Set(expandedCafes);
    newExpanded.has(cafeId) ? newExpanded.delete(cafeId) : newExpanded.add(cafeId);
    setExpandedCafes(newExpanded);
  };

  const toggleAddCoffeeForm = (cafeId) => {
    const newSet = new Set(showAddCoffeeForm);
    newSet.has(cafeId) ? newSet.delete(cafeId) : newSet.add(cafeId);
    setShowAddCoffeeForm(newSet);
  };

  const updateCafeCoffees = (cafeId, newCoffee) => {
    setCafes((prevCafes) =>
      prevCafes.map((cafe) =>
        cafe.id === cafeId
          ? { ...cafe, coffees: [...(cafe.coffees || []), newCoffee] }
          : cafe
      )
    );
    toggleAddCoffeeForm(cafeId);
  };

  const getRoastColor = (roast) => {
    switch (roast) {
      case "light":
        return "warning";
      case "medium":
        return "neutral";
      case "dark":
        return "danger";
      case "espresso":
        return "primary";
      default:
        return "neutral";
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Typography level="h1" sx={{ mb: 3, textAlign: "center" }}>
        Cafe Directory
      </Typography>

      <CafeForm setCafes={setCafes} />

      <Divider sx={{ my: 4 }} />

      <Typography level="h2" sx={{ mb: 3 }}>
        All Cafes ({cafes.length})
      </Typography>

      {cafes.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography level="body-lg" color="neutral">
            No cafes added yet. Add the first one above!
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {cafes.map((cafe) => (
            <Card key={cafe.id} variant="outlined" sx={{ p: 0, overflow: "hidden" }}>
              <Box
                sx={{
                  p: 3,
                  cursor: "pointer",
                  "&:hover": { bgcolor: "background.level1" },
                }}
                onClick={() => toggleCafeExpansion(cafe.id)}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box>
                    <Typography level="h4" sx={{ mb: 1 }}>
                      {cafe.name}
                    </Typography>
                    <Typography level="body-md" color="neutral">
                      📍 {cafe.location}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography level="body-sm" color="neutral">
                      {expandedCafes.has(cafe.id) ? "Hide" : "View"} Coffees
                    </Typography>
                    {expandedCafes.has(cafe.id) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </Box>
                </Box>
              </Box>

              <Collapse in={expandedCafes.has(cafe.id)}>
                <Divider />
                <Box sx={{ p: 3, bgcolor: "background.level1" }}>
                  <Typography level="h5" sx={{ mb: 2 }}>
                    Our Coffees ({cafe.coffees?.length || 0})
                  </Typography>

                  {cafe.coffees?.length > 0 ? (
                    <Box sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                      gap: 2,
                      mb: 3,
                    }}>
                      {cafe.coffees.map((coffee) => (
                        <Card key={coffee.id} variant="soft" sx={{ p: 2 }}>
                          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                            <Typography level="title-md">{coffee.name}</Typography>
                          </Box>
                          <Chip
                            variant="soft"
                            size="sm"
                            text="wrap"
                          >
                            {coffee.description}
                          </Chip>
                        </Card>
                      ))}
                    </Box>
                  ) : (
                    <Typography color="neutral" sx={{ mb: 3 }}>
                      No coffees added yet
                    </Typography>
                  )}

                  <Collapse in={showAddCoffeeForm.has(cafe.id)}>
                    <Box sx={{ mb: 2 }}>
                      <CoffeeForm
                        cafeId={cafe.id}
                        setCoffees={(newCoffee) => updateCafeCoffees(cafe.id, newCoffee)}
                        onCancel={() => toggleAddCoffeeForm(cafe.id)}
                      />
                    </Box>
                  </Collapse>

                  <Button
                    variant="outlined"
                    color="primary"
                    startDecorator={<Plus size={16} />}
                    onClick={() => toggleAddCoffeeForm(cafe.id)}
                    sx={{ alignSelf: "flex-start" }}
                  >
                    {showAddCoffeeForm.has(cafe.id) ? "Cancel" : "Add Coffee"}
                  </Button>
                </Box>
              </Collapse>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Cafes;
