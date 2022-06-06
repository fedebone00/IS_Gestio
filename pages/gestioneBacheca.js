import React, { Component, useEffect, useState } from 'react';
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



export default function gestioneBacheca() {
  const [testoAnnuncio , setTesto] = useState("");
  const [scadenzaAnnuncio , setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [jwt, setJwt] = useState("");
  const [rt, setRt] = useState("");
  const [set, setSet] = useState(1);
  const [risposta , setRisposta] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsLoading(true);
      const qs = require("qs");
      const axios = require("axios");

      axios({
        method: "POST",
        url: "https://gestio-is.herokuapp.com/api/v1/bacheca",
        headers:{
          "x-access-token":jwt,
        },
        data: {
          testoAnnuncio,
          scadenzaAnnuncio,
        },
      }).then(function (response) {
        let token = response.data;
        localStorage.setItem("jwt", token.jwt);
        localStorage.setItem("rt", token.rt);



      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setRisposta("<h1>azione eseguita con successo!</h1>")
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setJwt(localStorage.getItem('jwt'));
      setRt(localStorage.getItem('rt'));
      console.log("JWT-->", jwt);
      setSet(0);
    }, 50);
  }, []);

  if (set) {
    return (
      <div>
      </div>
    );
  }

  else {
    console.log("JWT-->", jwt);

    if (jwt == undefined) {
      Router.push("/index");

    }

    if (parseJwt(jwt).role == "AA") {
      return (
        <div>
          <SidebarAA />
          <TopBar />
          <form onSubmit={handleSubmit}>
        <fieldset className="  relative z-1  p-3 flex flex-col space-y-3 justify-center items-center  h-screen">
          <div className="  border  rounded flex flex-row  ">
            <input
              type="text"
              className='p-10'
              placeholder="Testo Annuncio"
              onChange={(e) => setTesto(e.target.value)}
            />
          </div>
          <div className="border  rounded flex flex-row    ">
            <input
            className='px-10 py-5'
              type="text"
              placeholder="Data Annuncio"
              onChange={(e) => setData(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-between gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex py-2 inline-block px-28 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md  hover:bg-gray-400 hover:shadow-lg focus:bg-gray-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
            >
              Carica Annuncio
            </button>
            <h1 className='text-green-700 text-center' dangerouslySetInnerHTML={{ __html: risposta }} />
          </div>
        </fieldset>
      </form>
        </div>
      );
    }

    else {
      Router.push("/404");
    }
  }
}