import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import home from "../public/home-outline.png";
import React, { Component, useEffect, useState } from "react";
import { SidebarAA } from "../components/sidebarAA";
import { TopBar } from "../components/topBar";

function parseJwt(token) {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

export default function rimuoviDipendente() {
  const [email, setUsername] = useState("");
  const [jwt, setJwt] = useState("");
  const [rt, setRt] = useState("");
  const [set, setSet] = useState(1);
  const [base, setBase] = useState(
    "https://gestio-is.herokuapp.com/api/v1/users"
  );
  const [slash, setSlash] = useState("/");
  const [id, setId] = useState("");
  const [error, setError] = useState(false);
  const [token, setToken] = useState("");

  async function handleRemove(e) {
    e.preventDefault();
    // Default options are marked with *

    const getUsers = await fetch(
      "https://gestio-is.herokuapp.com/api/v1/users",
      {
        method: "GET",

        headers: {
          "x-access-token": jwt,
        },
      }
    )
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log(data);
        var found = data.filter(function (item) {
          return item.email === email;
        });
        console.log("found", found[0]);

        if (found[0] != undefined) {
          let id = found[0]._id;
          //console.log(id);

          let result = base.concat(slash);

          result = result.concat(id);
          //console.log("ID-->", result);

          fetch(result, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            //mode: 'cors', // no-cors, *cors, same-origin
            //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            //credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              "x-access-token": jwt,
            },
            //body: JSON.stringify(data) // body data type must match "Content-Type" header
          }).then(function (response) {
            let result = response.data;
            //console.log(result);
          });
        }
      });
  }

  useEffect(() => {
    setTimeout(() => {
      setJwt(localStorage.getItem("jwt"));
      setRt(localStorage.getItem("rt"));
      //console.log("JWT-->", jwt);
      setSet(0);
    }, 50);
  }, []);

  if (set) {
    return <div></div>;
  } else {
    //console.log("JWT-->", jwt);

    if (jwt == undefined) {
      return (
        <div>
          <h1>Devi prima effettuare il login!</h1>
          <a href="/">Vai alla pagina di login</a>
        </div>
      );
    } else if (parseJwt(jwt).role == "AA" && error == false) {
      return (
        <div>
          <SidebarAA />
          <TopBar />
          <form onSubmit={handleRemove}>
            <div className="  flex flex-col gap-5 justify-center items-center">
              <input
                className="border  rounded p-2"
                type="text"
                id="usernameInput"
                placeholder="Username Dipendente"
                onChange={(e) => setUsername(e.target.value)}
              />
              <button
                type="submit"
                className="relative  py-2 inline-block px-6 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out"
              >
                Rimuovi
              </button>
            </div>
          </form>
        </div>
      );
    } else if (parseJwt(jwt).role == "AA" && error != false) {
      <div>
        <SidebarAA />
        <TopBar />
        <form onSubmit={handleRemove}>
          <div className="  flex flex-col gap-5 justify-center items-center">
            <input
              className="border  rounded p-2"
              type="text"
              id="usernameInput"
              placeholder="Username Dipendente"
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              type="submit"
              className="relative  py-2 inline-block px-6 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out"
            >
              Rimuovi
            </button>
          </div>
        </form>
      </div>;
    } else {
      return (
        <div>
          <h1>ERROR!!</h1>
        </div>
      );
    }
  }
}
