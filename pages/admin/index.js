import { Grid } from "@mui/material";
import BlogCard from "../../src/components/dashboard/BlogCard";
import SalesOverview from "../../src/components/dashboard/SalesOverview";
import DailyActivity from "../../src/components/dashboard/DailyActivity";
import AllProducts from "../../src/components/dashboard/AllProducts";
import { ThemeProvider } from "@mui/material/styles";
import Product from "../../models/Product";
import mongoose from "mongoose";
import { useEffect } from "react";
import { useRouter } from "next/router";

import theme from "../../src/theme/theme";

import FullLayout from "../../src/layouts/FullLayout";
import { Router } from "next/router";

export default function Index({products}) {
  const router  = useRouter()
  useEffect(() => {
    if(!localStorage.getItem("myuser")){
      router.push('/admin/login')
    }
  
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <style jsx global>{`
        footer {
          display: none;
        }
      `}</style>
      <FullLayout>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <SalesOverview />
          </Grid>
          {/* ------------------------- row 1 ------------------------- */}
          <Grid item xs={12} lg={4}>
            <DailyActivity />
          </Grid>
          <Grid item xs={12} lg={8}>
            <AllProducts  products={products} />
          </Grid>
          <Grid item xs={12} lg={12}>
            <BlogCard />
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  );
}


export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find();

  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
}
