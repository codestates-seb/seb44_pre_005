import React from "react";
import tw from "tailwind-styled-components";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav>
      <div className="navbar">
        <Link to="/">hi</Link>
      </div>
    </nav>
  );
}
