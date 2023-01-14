import React from "react";
import { Link } from "@mui/material";
import Image from "next/image";
import LogoDark from "../../../assets/images/logos/logo-dark.svg";

const LogoIcon = () => {
  return (
    <Link className="no-underline" href="/admin">
      {/* <Image src={LogoDark} alt={LogoDark} /> */}
   <h3 className="text-xl font-bold text-cyan-500 no-underline ">ADMIN</h3>   
    </Link>
  );
};

export default LogoIcon;
