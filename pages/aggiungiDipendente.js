import React, { Component, useEffect, useState } from "react";
import { SidebarAA } from "../components/sidebarAA";
import { TopBar } from "../components/topBar";
import Router from "next/router";


const people = [
  { id: 1, name: "DIP0", unavailable: false },
  { id: 2, name: "DIP1", unavailable: false },
];

function parseJwt(token) {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

export default function aggiungiDipendente() {
  const [email, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [jwt, setJwt] = useState("");
  const [rt, setRt] = useState("");
  const [set, setSet] = useState(1);
  const [password, setPassword] = useState('password');

  async function handleAdd(e) {
    e.preventDefault();
    try {
      const qs = require("qs");
      const axios = require("axios");

      axios({
        method: "POST",
        url: "https://gestio-is.herokuapp.com/api/v1/users",
        headers: {
          'x-access-token' : jwt,
        },
        data: {
          email,
          role,
          password,
        },
      }).then(function (response) {
        let token = response.data;
        console.log(response.data);

        localStorage.setItem("Token", JSON.stringify(token));

      });
    } catch (error) {
      console.log(error.status);
    } finally {
      
    }
  }

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
      return (
        <div>
          <h1>Devi prima effettuare il login!</h1>
          <a href="/">Vai alla pagina di login</a>
        </div>
      );
    } else if (parseJwt(jwt).role == "AA") {
      return (
        <div>
          <SidebarAA />
          <TopBar />
          <form onSubmit={handleAdd}>
            <div className="  flex flex-col gap-5 justify-center items-center">
              <input
                className="border  rounded p-2"
                type="text"
                id="usernameInput"
                placeholder="Username Dipendente"
                onChange={(e) => setUsername(e.target.value)}
              />
              
              <input
                className="border  rounded p-2"
                type="text"
                id="DipX"
                placeholder="Livello Dipendete"
                onChange={(e) => setRole(e.target.value)}
              />
             
              <button
                type="submit"
                className="relative  py-2 inline-block px-6 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out"
              >
                Aggiungi
              </button>
            </div>
          </form>
        </div>
      );
    } else {
      Router.push("/404");
    }
  }
}
