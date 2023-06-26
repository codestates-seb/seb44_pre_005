import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store/store";
import { login, logout } from "../store/loginSlice";
import tw from "tailwind-styled-components";
import { BsSearch } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { BsFillInboxFill, BsFillTrophyFill, BsMenuUp } from "react-icons/bs";
import { GiHelp } from "react-icons/gi";
import { Button } from "@mui/material";

export default function Header() {
  const [product, setProduct] = useState(false);
  const [outMenu, setOutMenu] = useState(false);
  const logIn = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  const logOutMenu: React.MouseEventHandler<SVGElement> = () => {
    setOutMenu(!outMenu);
  };

  const deleteCookie = (name: string) => {
    document.cookie =
      name +
      "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost;";
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const cookie = document.cookie;
      if (cookie) {
        dispatch(login());
      } else {
        dispatch(logout());
      }
    };

    checkLoginStatus();
  }, [dispatch]);

  const logOutHandler = () => {
    setOutMenu(false);
    deleteCookie("refresh");
    deleteCookie("authorization");
    location.reload();
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
            <Positionobx>
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
            </Positionobx>
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
              <Link to="/login">
                <Button
                  variant="outlined"
                  size="small"
                  style={{ width: "100px", height: "30px" }}
                >
                  Log in
                </Button>
              </Link>
              <Link to="/join">
                <Button
                  variant="contained"
                  size="small"
                  style={{ width: "100px", height: "30px" }}
                >
                  Sign up
                </Button>
              </Link>
            </>
          ) : (
            <StyledIcon>
              {outMenu ? (
                <Positionobx>
                  <FaUser></FaUser>
                  <LogoutMenu>
                    <StyledIcon>
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/Stack_Overflow_icon-icons.com_66761.png"
                        }
                        alt="logo"
                        style={{ width: "20px" }}
                      />
                      <p>Stack Overflow</p>
                      <p>help</p>
                      <div onClick={logOutHandler}>logout</div>
                    </StyledIcon>
                  </LogoutMenu>
                </Positionobx>
              ) : (
                <FaUser></FaUser>
              )}
              <BsFillInboxFill></BsFillInboxFill>
              <BsFillTrophyFill></BsFillTrophyFill>
              <GiHelp></GiHelp>
              <BsMenuUp onClick={logOutMenu}></BsMenuUp>
            </StyledIcon>
          )}
        </LogoContainer>
      </Navbar>
    </nav>
  );
}
const Positionobx = tw.div`
relative
`;
const Menubox = tw.div`
border-2
p-2
w-44
absolute
z-10
bg-white
top-[30px]
left-[-130px]
`;

const LogoutMenu = tw(Menubox)`
w-[270px]
absoulte
top-[25px]
`;

const Navbar = tw.div`
flex
fixed
top-0
bg-white
w-full
h-[50px]
z-[1]
justify-around
py-4
border-b-[1px]
border-[#E0E2E5]
`;

const Description = tw.li`
text-gray-400
text-xs
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
