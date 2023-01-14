import React from "react";
import { ThemeProvider } from "@mui/material/styles";

import theme from "../../src/theme/theme";

import FullLayout from "../../src/layouts/FullLayout";
import { Grid } from "@mui/material";
import AllProducts from "../../src/components/dashboard/AllProducts";
import Product from "../../models/Product";
import mongoose from "mongoose";

const Allorders = ({ products }) => {
  return (
    <ThemeProvider theme={theme}>
      <FullLayout>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <AllProducts products={products} />
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  );
};

export default Allorders;


export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find();

  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
}