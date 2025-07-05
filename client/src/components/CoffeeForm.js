import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  Box,
  Typography,
  Input,
  FormLabel,
  FormControl,
  FormHelperText,
  Textarea
} from "@mui/joy";

const formSchema = yup.object().shape({
  name: yup
    .string()
    .required("Must enter coffee's name")
    .max(30, "Name should be less than 30 characters"),
  description: yup
    .string()
    .required("Must enter coffee's description")
    .max(500, "Description should be less than 500 characters")
});

function CoffeeForm({ cafeId, setCoffees, onCancel }) {
  const formik = useFormik({
    initialValues: {
      name: "",
      description: ""
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      const coffeeData = {
        ...values,
        cafe_id: cafeId
      };

      fetch("/coffees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(coffeeData)
      })
        .then((response) => {
          console.log("Response status: ", response.status);
          if (response.ok) {
            response.json().then((newCoffee) => {
              console.log("New Coffee:", newCoffee);
              setCoffees(newCoffee);
              formik.resetForm();
              // Hide the form after successful submission
              if (onCancel) {
                onCancel();
              }
            });
          } else {
            console.error(
              "Failed to submit the coffee form, response not ok"
            );
          }
        })
        .catch((error) => {
          console.error("Error occurred during the fetch:", error);
        });
    }
  });

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "background.surface",
        borderRadius: "md",
        border: "1px solid",
        borderColor: "divider"
      }}
    >
      <Typography level="h5" sx={{ mb: 2 }}>
        Add New Coffee
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Name */}
          <FormControl error={formik.touched.name && Boolean(formik.errors.name)}>
            <FormLabel>Coffee Name</FormLabel>
            <Input
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter coffee name"
            />
            {formik.touched.name && formik.errors.name && (
              <FormHelperText>{formik.errors.name}</FormHelperText>
            )}
          </FormControl>

          {/* Description */}
          <FormControl error={formik.touched.description && Boolean(formik.errors.description)}>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter coffee description"
              minRows={3}
              maxRows={6}
            />
            {formik.touched.description && formik.errors.description && (
              <FormHelperText>{formik.errors.description}</FormHelperText>
            )}
          </FormControl>

          <Box sx={{ display: "flex", gap: 2 }}>
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