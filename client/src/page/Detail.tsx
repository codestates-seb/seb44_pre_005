import React from "react";
import NavMenu from "../components/NavMenu";
import preApi from "../api/preApi";
import SideMenu from "../components/SideMenu";
import tw from "tailwind-styled-components";

export default function Detail() {
  const getData = async () => {
    const response = await preApi.getSomething();
    const json = await response.json();
    // console.log(json.results);
  };

  return (
    <Container>
      <NavMenu />
      <>Content</>
      <SideMenu />
    </Container>
  );
}

const Container = tw.div`
flex
`;
