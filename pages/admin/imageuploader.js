import { Grid, ImageList, ImageListItem } from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
import Product from "../../models/Product";
import mongoose from "mongoose";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=22x`,
  };
}

const ImageUploader = ({ products }) => {
  return (
    <ThemeProvider theme={theme}>
      <FullLayout>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <BaseCard title="Grid Image (right click to copy the image address)">
              <ImageList
                sx={{ height: "full" }}
                variant="quilted"
                cols={4}
                rowHeight={200}
              >
                {products.map((item) => (
                  <ImageListItem key={item.img} cols={1} rows={2}>
                    <img
                      {...srcset(item.img, 200, 1, 1)}
                      alt={item.title}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </BaseCard>
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  );
};

export default ImageUploader;
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find();

  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
}
