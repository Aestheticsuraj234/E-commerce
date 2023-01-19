import React, { useState } from "react";
import User from "../../models/User";
import mongoose from "mongoose";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Select,
  MenuItem,
  Button,
  Chip,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import BaseCard from "../../src/components/baseCard/BaseCard";

const UserList = ({ users }) => {
  const [updatedUsers, setUpdatedUsers] = useState(users);

  const handleRoleChange = async (email, role) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/updateUserRole`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, role }),
        }
      );
      if (!res.ok) {
        throw new Error("An error occurred while updating user role");
      }
      const updatedUsers = users.map((user) =>
        user.email === email ? { ...user, role } : user
      );
      setUpdatedUsers(updatedUsers);
      toast.success("User role updated successfully");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <FullLayout>

          <ToastContainer />
          <BaseCard title="Current User Role">
            <Table className="w-full table-auto  rounded-lg">
              <TableHead className="bg-[#03c9d7] text-white">
                <TableRow>
                  <TableCell className="px-4 py-2  text-white font-bold ">
                    Name
                  </TableCell>
                  <TableCell className="px-4 py-2 text-white font-bold ">
                    Email
                  </TableCell>
                  <TableCell className="px-4 py-2 text-white font-bold ">
                    Role
                  </TableCell>
                  <TableCell className="px-4 py-2 text-white font-bold ">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {updatedUsers.map((user) => (
                  <TableRow key={user._id} className="bg-white">
                    <TableCell className="px-4 py-2 font-bold ">
                      {user.name}
                    </TableCell>
                    <TableCell className="px-4 py-2 font-bold">
                      {user.email}
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      <Select
                        className="bg-white border border-gray-500 rounded-md py-1 px-2 text-gray-700"
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(user.email, e.target.value)
                        }
                      >
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      <div className="flex flex-col">
                        <Button
                          className="bg-[#fb9678] text-white rounded-md py-2 px-4 shadow-lg hover:bg-[#03c9d7]"
                          variant="contained"
                          color="primary"
                          onClick={() => handleRoleChange(user.email, "admin")}
                        >
                          Make Admin
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </BaseCard>
        
      </FullLayout>
    </ThemeProvider>
  );
};

export default UserList;

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO_URI);
  }

  const users = await User.find();
  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
    },
  };
}
