import React, { Component, useEffect, useState } from "react";
import { SidebarAA } from "../components/sidebarAA";
import { TopBar } from "../components/topBar";
import Router from "next/router";


function parseJwt(token) {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

export default function areaAmministratoreAziendale() {
  const [jwt, setJwt] = useState("");
  const [rt, setRt] = useState("");
  const [set, setSet] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      setJwt(localStorage.getItem("jwt"));
      setRt(localStorage.getItem("rt"));
      console.log("JWT-->", jwt);
      setSet(0);
    }, 50);
  }, []);

  if (set) {
    return <div></div>;
  } else {
    console.log("JWT-->", jwt);

    if (jwt == undefined) {
      Router.push("/index");
    } else if (parseJwt(jwt).role == "AA") {
      return (
        <div>
          <SidebarAA />
          <TopBar />
        </div>
      );
    } else {
      Router.push("/404");
    }
  }
}
