import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Button, Box, Select, Option } from "@mui/joy";

const formSchema = yup.object().shape({
    name: yup.string().required("Must enter coffee's name").max(30, "Name should be less than 30 characters"),
    price: yup.number().required("Must enter coffee's price").positive("Price must be positive"),
    roast: yup.string().required("Must select roast level"),
})

function CoffeeForm({ cafeId, setCoffees, onCancel }) {
    const formik = useFormik({
        initialValues: {
            name: "",
            price: "",
            roast: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            const coffeeData = {
                ...values,
                cafe_id: cafeId,
                price: parseFloat(values.price)
            };
            
            fetch("/coffees", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(coffeeData),
            })
            .then((response) => {
                console.log("Response status: ", response.status);
                if (response.ok) {
                    response.json().then((newCoffee) => {
                        console.log("New Coffee:", newCoffee);
                        setCoffees(newCoffee);
                        formik.resetForm();
                    });
                } else {
                    console.error("Failed to submit the coffee form, response not ok");
                }
            })
            .catch((error) => {
                console.error("Error occurred during the fetch:", error);
            });
        },
    });

    return (
        <Box sx={{ p: 3, bgcolor: 'background.surface', borderRadius: 'md', border: '1px solid', borderColor: 'divider' }}>
            <Typography level="h5" sx={{ mb: 2 }}>Add New Coffee</Typography>
            <form onSubmit={formik.handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Coffee Name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        placeholder="Enter coffee name"
                    />
                    <TextField
                        label="Price"
                        name="price"
                        type="number"
                        step="0.01"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.price && Boolean(formik.errors.price)}
                        helperText={formik.touched.price && formik.errors.price}
                        placeholder="Enter price"
                        startDecorator="$"
                    />
                    <Select
                        placeholder="Select roast level"
                        name="roast"
                        value={formik.values.roast}
                        onChange={(event, value) => formik.setFieldValue('roast', value)}
                        onBlur={formik.handleBlur}
                        error={formik.touched.roast && Boolean(formik.errors.roast)}
                    >
                        <Option value="light">Light Roast</Option>
                        <Option value="medium">Medium Roast</Option>
                        <Option value="dark">Dark Roast</Option>
                        <Option value="espresso">Espresso</Option>
                    </Select>
                    {formik.touched.roast && formik.errors.roast && (
                        <Box sx={{ color: 'danger.main', fontSize: 'sm' }}>
                            {formik.errors.roast}
                        </Box>
                    )}
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button 
                            type="submit" 
                            variant="solid" 
                            color="primary"
                            disabled={formik.isSubmitting}
                            sx={{ flex: 1 }}
                        >
                            Add Coffee
                        </Button>
                        {onCancel && (
                            <Button 
                                type="button" 
                                variant="outlined" 
                                color="neutral"
                                onClick={onCancel}
                                sx={{ flex: 1 }}
                            >
                                Cancel
                            </Button>
                        )}
                    </Box>
                </Box>
            </form>
        </Box>
    );
}

export default CoffeeForm;