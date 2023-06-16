import React from "react";
import tw from "tailwind-styled-components";
import { Link } from "react-router-dom";

import logo from "./stackoverflow.PNG";

export default function Header() {
  return (
    <nav>
      <div className="navbar">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
    </nav>
  );
}
