import React from "react";
import NavMenu from "../components/NavMenu";
import preApi from "../api/preApi";

export default function Detail() {
  const getData = async () => {
    const response = await preApi.getSomething();
    const json = await response.json();
    // console.log(json.results);
  };

  return (
    <>
      <NavMenu />
    </>
  );
}
