import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { Grid } from "@mui/material";
import mongoose from "mongoose";
import Order from "../../models/Order";
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
import BaseCard from "../../src/components/baseCard/BaseCard";
import AllProducts from "../../src/components/dashboard/AllProducts";

const Allorders = ({ order }) => {
  console.log(order);
  return (
    <ThemeProvider theme={theme}>
      <FullLayout>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <BaseCard title="Current Order Status">
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
                        Order Id
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        Email
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        Product
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        Status
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textSecondary"
                        variant="h6"
                      ></Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography color="textSecondary" variant="h6">
                        Price
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography color="textSecondary" variant="h6">
                        Delivery Status
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.map((item) => (
                    <TableRow key={item.orderId}>
                      <TableCell>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontWeight: "500",
                          }}
                        >
                          {item.orderId}
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
                              {item.email}
                            </Typography>
                            <Typography
                              color="textSecondary"
                              sx={{
                                fontSize: "13px",
                              }}
                            ></Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">
                        {Object.keys(item.products)[0].slice(0, 20)}...
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
                          {item.Status}
                        </Typography>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell align="right">
                        <Typography variant="h6">${item.amount}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="h6">
                          {item.deliveryStatus}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </BaseCard>
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
  let order = await Order.find();

  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    },
  };
}
