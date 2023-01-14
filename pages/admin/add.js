import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Grid,
  Stack,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  FormControl,
  Button,
} from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";

const Add = () => {
  const [form, setForm] = useState({});
  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form };

    try {
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addProducts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      let response = await res.json();
      if (!res.ok) {
        throw new Error(response.error);
      }
      console.log(response);
      setForm({}); // resetting the form
      toast.success("Product added successfully", {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
      toast.error("Error adding product", {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <FullLayout>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <h1 className="text-2xl text-gray-600 text-center font-bold">
          Add Your Product from Here
        </h1>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <BaseCard title="Add Products">
              <Stack spacing={3}>
                <TextField
                  onChange={onChange}
                  value={form.title ? form.title : ""}
                  name="title"
                  label="Title"
                  variant="outlined"
                />
                <TextField
                  onChange={onChange}
                  value={form.slug ? form.slug : ""}
                  name="slug"
                  label="Slug"
                  variant="outlined"
                />
                <TextField
                  onChange={onChange}
                  value={form.threads ? form.threads : ""}
                  name="threads"
                  label="Threads"
                  variant="outlined"
                />
                <TextField
                  onChange={onChange}
                  value={form.reeds ? form.reeds : ""}
                  name="reeds"
                  label="Reeds"
                  variant="outlined"
                />
                <TextField
                  onChange={onChange}
                  value={form.color ? form.color : ""}
                  name="color"
                  label="Color in (Hex)"
                  variant="outlined"
                />
                <TextField
                  onChange={onChange}
                  value={form.category ? form.category : ""}
                  name="category"
                  label="Category (Carpets) "
                  variant="outlined"
                />
                <TextField
                  onChange={onChange}
                  value={form.img ? form.img : ""}
                  name="img"
                  label="Image link"
                  variant="outlined"
                />
                <TextField
                  onChange={onChange}
                  value={form.madeIn ? form.madeIn : ""}
                  name="madeIn"
                  label="Made-In"
                  variant="outlined"
                />
                <TextField
                  onChange={onChange}
                  value={form.density ? form.density : ""}
                  name="density"
                  label="Density"
                  variant="outlined"
                />

                <TextField
                  onChange={onChange}
                  value={form.price ? form.price : ""}
                  name="price"
                  label="Price"
                  variant="outlined"
                />
                <TextField
                  onChange={onChange}
                  value={form.availableQty ? form.availableQty : ""}
                  name="availableQty"
                  label="Available-Quantity"
                  variant="outlined"
                />

                <TextField
                  onChange={onChange}
                  value={form.description ? form.description : ""}
                  name="description"
                  label="Description"
                  multiline
                  rows={4}
                />
              </Stack>
              <br />
              <Button onClick={handleSubmit} variant="outlined" mt={2}>
                Submit
              </Button>
            </BaseCard>
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  );
};

export default Add;
