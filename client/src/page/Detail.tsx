import React from "react";
import preApi from "../api/preApi";

export default function Detail() {
  const getData = async () => {
    const response = await preApi.getSomething();
    const json = await response.json();
    // console.log(json.results);
  };

  return <></>;
}
