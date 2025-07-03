import React from "react";
import { Card, Typography, Box, Divider } from "@mui/joy";
import CafeForm from "../components/CafeForm";

function Cafes({ cafes, setCafes }) {
    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
            <Typography level="h1" sx={{ mb: 3, textAlign: 'center' }}>
                Cafe Directory
            </Typography>
            
            {/* Cafe Form */}
            <CafeForm setCafes={setCafes} />
            
            <Divider sx={{ my: 4 }} />
            
            {/* Cafes List */}
            <Typography level="h2" sx={{ mb: 3 }}>
                All Cafes ({cafes.length})
            </Typography>
            
            {cafes.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography level="body-lg" color="neutral">
                        No cafes added yet. Add the first one above!
                    </Typography>
                </Box>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {cafes.map((cafe) => (
                        <Card key={cafe.id} variant="outlined" sx={{ p: 3 }}>
                            <Typography level="h4" sx={{ mb: 1 }}>
                                {cafe.name}
                            </Typography>
                            <Typography level="body-md" color="neutral">
                                📍 {cafe.location}
                            </Typography>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    );
}

export default Cafes;