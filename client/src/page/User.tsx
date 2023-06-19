import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import tw from "tailwind-styled-components";
import NavMenu from "../components/NavMenu";

const User: React.FC = () => {
  const location = useLocation().pathname;
  return (
    <>
      <NavMenu />
    </>
  );
};

export default User;
