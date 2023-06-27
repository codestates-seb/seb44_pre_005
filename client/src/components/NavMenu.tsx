import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import tw from "tailwind-styled-components";
import { IoEarth } from "react-icons/io5";
import { MdStars } from "react-icons/md";
import { FaLock } from "react-icons/fa";

const NavMenu: React.FC = () => {
  const location = useLocation().pathname;

  return (
    <Container>
      <ContentOl>
        <OriginLi>
          <Link to="/">
            <Category>Home</Category>
          </Link>
        </OriginLi>
        <OriginLi>
          <Title>PUBLIC</Title>
        </OriginLi>
        <Innerli>
          <ContentOl>
            <OriginLi>
              {location === "/" || location.indexOf("/detail") === 0 ? (
                <Selected></Selected>
              ) : (
                ""
              )}
              <Link to="/">
                <Category>
                  <EarthIcon>
                    <IoEarth />
                  </EarthIcon>
                  Question
                </Category>
              </Link>
            </OriginLi>
            <Tabli>
              <a href="https://stackoverflow.com/tags">
                <Category>Tags</Category>
              </a>
            </Tabli>
            <Tabli>
              {location === "/user" ? <Selected></Selected> : ""}
              <Link to="/user">
                <Category>Users</Category>
              </Link>
            </Tabli>
            <Tabli>
              <a href="https://stackoverflow.com/jobs/companies">
                <Category>Companies</Category>
              </a>
            </Tabli>
          </ContentOl>
        </Innerli>
        <OriginLi>
          <Title>COLLECTIVES</Title>
        </OriginLi>
        <OriginLi>
          <a href="https://stackoverflow.com/collectives">
            <Category>
              <StarIcon>
                <MdStars />
              </StarIcon>
              Explore Collectives
            </Category>
          </a>
        </OriginLi>
        <OriginLi>
          <Title>Teams</Title>
        </OriginLi>
        <OriginLi>
          <a href="https://stackoverflowteams.com/teams/create/free?utm_source=so-owned&utm_medium=side-bar&utm_campaign=campaign-38&utm_content=cta">
            <Category>
              <LockIcon>
                <FaLock />
              </LockIcon>
              Create free Team
            </Category>
          </a>
        </OriginLi>
        <OriginLi>
          <ColorDiv>Looking for your Teams?</ColorDiv>
        </OriginLi>
      </ContentOl>
    </Container>
  );
};

export default NavMenu;

const Container = tw.div`
min-h-full
min-w-[160px]
w-40
pt-6
pb-2
`;
const ContentOl = tw.ol`
flex
flex-col
`;
const Innerli = tw.li`
relative
inline-block
`;
const OriginLi = tw.li`
relative
p-2
inline-block
`;
const Tabli = tw.li`
relative
p-2
pl-8
inline-block
`;
const Selected = tw.div`
absolute
left-0
top-0
bg-[#F1F2F3]
border-r-2
border-[#F48225]
z-[-1]
w-full
h-full
`;

const Title = tw.div`
text-[11px]
text-[#6A737C]
`;
const Category = tw.div`
text-[13px]
text-[#0C0D0E]
leading-4
flex
`;
const EarthIcon = tw.div`
text-[16px]
mr-[6px]
`;
const ColorDiv = tw.div`
p-2
rounded
text-[11px]
text-[#0063BF]
bg-[#F0F8FF]
`;
const StarIcon = tw.div`
text-[#F48225]
text-[18px]
mr-[6px]
`;
const LockIcon = tw.div`
bg-[#F48225]
p-[3px]
text-white
text-[10px]
rounded
mr-[6px]
`;
