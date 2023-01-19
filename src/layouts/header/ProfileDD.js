import React, { useEffect, useState } from "react";
import Image from "next/image";
import userimg from "../../../assets/images/users/user2.jpg";
import FeatherIcon from "feather-icons-react";
import Link from "next/link";

import {
  Box,
  Menu,
  Typography,
  ListItemButton,
  List,
  ListItemText,
  Button,
  Divider,
} from "@mui/material";

const ProfileDD = ({ logout }) => {
  const [anchorEl4, setAnchorEl4] = useState(null);
  const [name, setName] = useState("");
  const [user, setUser] = useState({ value: null });

  const emojis = [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "😂",
    "🤣",
    "😊",
    "😇",
    "🙂",
    "🙃",
    "😉",
    "😌",
    "😍",
    "😘",
    "😗",
    "😙",
    "😚",
    "😋",
    "😛",
    "😝",
    "😜",
    "🤪",
    "🤨",
    "🧐",
    "🤓",
    "😎",
    "🤩",
    "😏",
    "🙂",
    "😔",
    "😕",
    "😲",
    "😷",
    "🤕",
    "🤢",
    "🤮",
    "😵",
    "🤒",
    "🤧",
    "🤕",
    "🤑",
    "🤠",
    "🤡",
    "🤥",
    "🤫",
    "🤭",
    "🧐",
    "🤓",
    "😈",
    "👿",
    "👹",
    "👺",
    "💀",
    "👻",
    "👽",
    "🤖",
    "💩",
    "😺",
    "😸",
    "😹",
    "😻",
    "😼",
    "😽",
    "🙀",
    "😿",
    "😾",
    "🙈",
    "🙉",
    "🙊",
    "💋",
    "💘",
    "💓",
    "💔",
    "💕",
    "💖",
    "💗",
    "💙",
    "💚",
    "💛",
    "💜",
    "💝",
    "💞",
    "💟",
    "💠",
    "💡",
    "💢",
    "💣",
    "💤",
    "💥",
    "💦",
    "💧",
    "💨",
    "💩",
    "💪",
    "💫",
    "💬",
    "💭",
    "💮",
    "💯",
    "🕳️",
    "🕶️",
    "🕷️",
    "🕸️",
    "🕹️",
    "🕺",
    "🖤",
    "🗣️",
    "🗨️",
    "🗯️",
    "🛐",
    "🛑",
    "🛒",
    "🛕",
  ];

  // Generate a random index
  const randomIndex = Math.floor(Math.random(1) * emojis.length);

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    if (!myuser) {
      router.push("/");
    }
    if (myuser && myuser.token) {
      setUser(myuser);
      fetchData(myuser.token);
    }
  }, []);

  const fetchData = async (token) => {
    let data = { token: token };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await a.json();

    setName(res.name);
  };

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };
  return (
    <>
      <Button
        aria-label="menu"
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick4}
      >
        <Box display="flex" alignItems="center">
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
              alignItems: "center",
            }}
          >
            <Typography
              color="textSecondary"
              variant="h5"
              fontWeight="400"
              sx={{ ml: 1 }}
            >
              {emojis[randomIndex]} Hi,
            </Typography>
            <Typography
              variant="h5"
              fontWeight="700"
              sx={{
                ml: 1,
              }}
            >
              {name}
            </Typography>
            <FeatherIcon icon="chevron-down" width="20" height="20" />
          </Box>
        </Box>
      </Button>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl4}
        keepMounted
        open={Boolean(anchorEl4)}
        onClose={handleClose4}
        sx={{
          "& .MuiMenu-paper": {
            width: "385px",
          },
        }}
      >
        <Box>
          <Box p={2} pt={0}>
            <List
              component="nav"
              aria-label="secondary mailbox folder"
              onClick={handleClose4}
            >
              <Link href="../myaccount">
                <ListItemButton>
                  <ListItemText primary="Edit Profile" />
                </ListItemButton>
              </Link>
            </List>
          </Box>
          <Divider />
          <Box p={2}>
            <Link href="/">
              <Button
                onClick={logout}
                fullWidth
                variant="container"
                color="error"
              >
                Logout
              </Button>
            </Link>
          </Box>
        </Box>
      </Menu>
    </>
  );
};

export default ProfileDD;
