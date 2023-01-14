import React, { useEffect } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";

const AllProducts = ({ products }) => {
  useEffect(() => {
    console.log(products);
  }, []);

  return (
    <BaseCard title="Product Perfomance">
      <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: "nowrap",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Title
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Slug
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Images
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
              Color / Reeds
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
               
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="textSecondary" variant="h6">
                Price
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.slug}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {product.title}
                </Typography>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                      {product.slug}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "13px",
                      }}
                    >
                      
                    </Typography>
                  </Box>
                     
                </Box>
              </TableCell>
              <TableCell>
              <img src={product.img} className="h-12 w-12 mx-2"  />
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                 <Chip                   sx={{
                    pl: "4px",
                    pr: "6px",
                    backgroundColor:product.color,
                    color: "#fff",
                  }}
                  size="small"
                  label={product.color}></Chip> / {product.reeds}
                </Typography>
              </TableCell>
              <TableCell>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">${product.price}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BaseCard>
  );
};

export default AllProducts;
