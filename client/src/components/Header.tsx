import React from "react";
import tw from "tailwind-styled-components";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import { Button } from "@mui/material";
import { FaUser } from "react-icons/fa";
import { BsFillInboxFill, BsFillTrophyFill, BsMenuUp } from "react-icons/bs";
import { GiHelp } from "react-icons/gi";

export default function Header() {
  const [product, setProduct] = useState(false);
  const [logIn, setlogIn] = useState(false);
  const [outMenu, setOutMenu] = useState(false);
  const logOutMenu: React.MouseEventHandler<SVGElement> = () => {
    setOutMenu(!outMenu);
  };

  return (
    <nav>
      <Navbar className="navbar">
        <LogoContainer>
          <Link to="/">
            <LogoImage
              src={process.env.PUBLIC_URL + "/stackoverflow.PNG"}
              alt="logo"
            />
          </Link>
          {!logIn && (
            <StyledLink href="https://stackoverflow.co/">About</StyledLink>
          )}
          {product ? (
            <div>
              <ActiveLink onClick={() => setProduct(false)}>
                Products
              </ActiveLink>
              <Menubox>
                <ul>
                  <li>Stack Overflow</li>
                  <Description>Public questions & answers</Description>
                  <li>Stack Overflow for Teams</li>
                  <Description>Where developers & technologists</Description>
                  <Description>Share private knowledge with</Description>
                  <Description>coworkers</Description>
                  <li>Talent</li>
                  <Description>Build your employer brand</Description>
                  <li>Advertising</li>
                  <Description>Reach developers & technologists</Description>
                  <Description>world wide</Description>
                  <Description>About the company</Description>
                </ul>
              </Menubox>
            </div>
          ) : (
            <StyledLink onClick={() => setProduct(true)}>Products</StyledLink>
          )}

          {!logIn && (
            <StyledLink href="https://stackoverflow.co/teams/">
              For Teams
            </StyledLink>
          )}

          <SearchContainer>
            <BsSearch />
            <input
              type="text"
              placeholder="Search..."
              style={logIn ? { width: "980px" } : { width: "800px" }}
            />
          </SearchContainer>
          {!logIn ? (
            <>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setlogIn(true)}
              >
                Log in
              </Button>
              <Button variant="contained" size="small">
                Sign up
              </Button>
            </>
          ) : (
            <StyledIcon>
              <FaUser></FaUser>
              <BsFillInboxFill></BsFillInboxFill>
              <BsFillTrophyFill></BsFillTrophyFill>
              <GiHelp></GiHelp>
              <BsMenuUp onClick={logOutMenu}></BsMenuUp>
            </StyledIcon>
          )}
        </LogoContainer>
      </Navbar>
      {outMenu && <LogoutModal />}
    </nav>
  );
}

const LogoutModal = () => {
  return (
    <LogoutMenu>
      <img
        src={
          process.env.PUBLIC_URL + "/Stack_Overflow_icon-icons.com_66761.png"
        }
        alt="logo"
        style={{ width: "20px" }}
      />
      <StyledIcon>
        <p>Stack Overflow</p>
        <p>help</p>
        <div>logout</div>
      </StyledIcon>
    </LogoutMenu>
  );
};

const Menubox = tw.div`
border-2
p-2
w-44
absolute
left-80
z-10
bg-white
top-[50px]
`;

const Description = tw.li`
text-gray-400
text-xs
`;

const Navbar = tw.div`
  flex items-center justify-evenly
  fixed
  right-[30px]
  relative 
`;

const LogoContainer = tw.div`
  flex items-center space-x-4
`;

const LogoImage = tw.img`
  mr-2
`;

const SearchContainer = tw.div`
  flex items-center space-x-2
`;

const StyledLink = tw.a`
  text-decoration: none;
  hover:bg-gray-200
  rounded-xl
  p-1
  cursor-pointer
  relative
  
`;

const ActiveLink = tw.a`
bg-orange-500
text-white
rounded-xl
  p-1
  cursor-pointer
  relative
`;

const StyledIcon = tw.div`
  flex
  gap-[15px]
`;

const LogoutMenu = tw(StyledIcon)`
border-2
w-[270px]
absolute
left-[1370px]
top-[50px]
z-10
`;
