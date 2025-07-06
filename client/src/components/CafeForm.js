import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, Input, FormControl, FormLabel, FormHelperText, Typography } from "@mui/joy";

const formSchema = yup.object().shape({
  name: yup
    .string()
    .required("Must enter cafe's name")
    .max(30, "Name should be less than 30 characters"),
  location: yup.string().required("Must enter cafe's location"),
});

function CafeForm({ setCafes }) {
  const formik = useFormik({
    initialValues: {
      name: "",
      location: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/cafes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((newCafe) => {
              setCafes((prev) => [...prev, newCafe]);
              formik.resetForm();
            });
          } else {
            console.error("Failed to submit the form, response not ok");
          }
        })
        .catch((error) => {
          console.error("Error occurred during the fetch:", error);
        });
    },
  });

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        p: 3,
        bgcolor: "background.surface",
        borderRadius: 2,
        boxShadow: 'md',
      }}
    >
      <Typography
        level="h3"
        component="h2"
        sx={{ mb: 3, color: "text.primary", fontWeight: 'lg' }}
      >
        Add New Cafe
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <FormControl error={formik.touched.name && Boolean(formik.errors.name)}>
            <FormLabel>Cafe Name</FormLabel>
            <Input
              name="name"
              placeholder="Enter cafe name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              variant="outlined"
              size="md"
            />
            {formik.touched.name && formik.errors.name && (
              <FormHelperText>{formik.errors.name}</FormHelperText>
            )}
          </FormControl>

          <FormControl error={formik.touched.location && Boolean(formik.errors.location)}>
            <FormLabel>Location</FormLabel>
            <Input
              name="location"
              placeholder="Enter cafe location"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              variant="outlined"
              size="md"
            />
            {formik.touched.location && formik.errors.location && (
              <FormHelperText>{formik.errors.location}</FormHelperText>
            )}
          </FormControl>

          <Button
            type="submit"
            variant="solid"
            color="primary"
            disabled={formik.isSubmitting}
            sx={{ mt: 1 }}
          >
            Add Cafe
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default CafeForm;
