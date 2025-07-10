import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Typography,
  Box,
  Divider,
  Button,
} from "@mui/joy";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import CoffeeForm from "../components/CoffeeForm";
import CoffeeCard from "../components/CoffeeCard";

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

const Cafes = ({ cafes, setCafes, coffees, setCoffees }) => {
  const navigate = useNavigate();
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

  const deleteCoffee = async (coffeeId) => {
    try {
      const response = await fetch(`/coffees/${coffeeId}`, {
        method: "DELETE",
        credentials: "same-origin",
      });

      if (response.ok) {
        // Update local state by removing the coffee from the cafe
        setCafes((prevCafes) =>
          prevCafes.map((cafe) => ({
            ...cafe,
            coffees: cafe.coffees?.filter((coffee) => coffee.id !== coffeeId) || [],
          }))
        );

        // Also update the global coffees state if it exists
        if (setCoffees) {
          setCoffees((prevCoffees) =>
            prevCoffees.filter((coffee) => coffee.id !== coffeeId)
          );
        }
      } else {
        console.error("Failed to delete coffee");
        alert("Failed to delete coffee. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting coffee:", error);
      alert("Error deleting coffee. Please try again.");
    }
  };

  const handleCoffeeAdded = (newCoffee) => {
  if (setCoffees) {
    setCoffees((prevCoffees) => [...prevCoffees, newCoffee]);
  }
};

  return (
    <Box
      sx={{
        px: 2,
        py: 3,
        minHeight: "100vh",
        width: "100%",
        bgcolor: "background.body",
      }}
    >
      <Typography
        level="h1"
        sx={{
          mb: 3,
          textAlign: "center",
          color: "text.primary",
        }}
      >
        Cafe Directory
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <Button
          variant="solid"
          color="primary"
          onClick={() => navigate("/cafes/new")}
        >
          Add New Cafe
        </Button>
      </Box>

      <Divider sx={{ my: 4, borderColor: "divider" }} />

      <Typography
        level="h2"
        sx={{
          mb: 3,
          color: "text.primary",
        }}
      >
        All Cafes ({cafes.length})
      </Typography>

      {cafes.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography level="body-lg" sx={{ color: "text.secondary" }}>
            No cafes added yet. Add the first one above!
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {cafes.map((cafe) => (
            <Card
              key={cafe.id}
              variant="outlined"
              sx={{
                p: 0,
                overflow: "hidden",
                bgcolor: "background.surface",
                borderColor: "divider",
                "&:hover": {
                  borderColor: "primary.500",
                },
              }}
            >
              <Box
                sx={{
                  p: 3,
                  cursor: "pointer",
                  "&:hover": { bgcolor: "background.level1" },
                }}
                onClick={() => toggleCafeExpansion(cafe.id)}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      level="h4"
                      sx={{
                        mb: 1,
                        color: "text.primary",
                      }}
                    >
                      {cafe.name}
                    </Typography>
                    <Typography level="body-md" sx={{ color: "text.secondary" }}>
                      📍 {cafe.location}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography level="body-sm" sx={{ color: "text.secondary" }}>
                      {expandedCafes.has(cafe.id) ? "Hide" : "View"} Coffees
                    </Typography>
                    <Box sx={{ color: "text.secondary" }}>
                      {expandedCafes.has(cafe.id) ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Collapse in={expandedCafes.has(cafe.id)}>
                <Divider sx={{ borderColor: "divider" }} />
                <Box
                  sx={{
                    p: 3,
                    bgcolor: "background.level1",
                    borderTop: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Typography
                    level="h5"
                    sx={{
                      mb: 2,
                      color: "text.primary",
                    }}
                  >
                    Our Coffees ({cafe.coffees?.length || 0})
                  </Typography>

                  {cafe.coffees?.length > 0 ? (
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                        gap: 2,
                        mb: 3,
                      }}
                    >
                      {cafe.coffees.map((coffee) => (
                        <CoffeeCard 
                          key={coffee.id} 
                          coffee={coffee} 
                          onDelete={deleteCoffee}
                        />
                      ))}
                    </Box>
                  ) : (
                    <Typography sx={{ mb: 3, color: "text.secondary" }}>
                      No coffees added yet
                    </Typography>
                  )}

                  <Collapse in={showAddCoffeeForm.has(cafe.id)}>
                    <Box sx={{ mb: 2 }}>
                      <CoffeeForm
                        cafeId={cafe.id}
                        setCoffees={(newCoffee) => updateCafeCoffees(cafe.id, newCoffee)}
                        onCancel={() => toggleAddCoffeeForm(cafe.id)}
                        onCoffeeAdded={handleCoffeeAdded}
                      />
                    </Box>
                  </Collapse>

                  <Button
                    variant="outlined"
                    color="primary"
                    startDecorator={<Plus size={16} />}
                    onClick={() => toggleAddCoffeeForm(cafe.id)}
                    sx={{
                      alignSelf: "flex-start",
                      borderColor: "primary.500",
                      color: "primary.500",
                      "&:hover": {
                        bgcolor: "primary.50",
                        borderColor: "primary.600",
                      },
                    }}
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