import React, { Component, useEffect, useState } from 'react';
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
  const [jwt, setJwt] = useState("");
  const [rt, setRt] = useState("");
  const [set, setSet] = useState(1);
  const [error, setError] = useState(false);
  const [logo, setLogo] = useState("logo");
  const [contatto, setContatto] = useState("contatto");
  const [partitaiva, setPartitaiva] = useState("partitaiva");
  const [id, setId] = useState("");
  const [rimuovi, setRimuovi] = useState("");
  const [newpartitaiva, setNewpartitaiva] = useState("");

  async function handleGet(e) {
    e.preventDefault();

    setLogo("");
    setPartitaiva("");
    setContatto("");
    setId("");

    try {
      const axios = require("axios");

      let response = await axios({
        method: "GET",
        url: "https://gestio-is.herokuapp.com/api/v1/infoazienda/bypiva",
        headers: {
          "x-access-token": jwt,
          partitaiva,
        },
      }).then(function (response) {
        let risposta = response.data;
        console.log("RESPONSE-->", risposta);
        setContatto(risposta.contatto);
        setId(risposta._id);
        console.log("ID-->",id);
        setRimuovi("Aggiorna l'azienda selezionata");
      });
    } catch (error) {
      console.log("ERRORONE-->", error);
      setRimuovi("Errore nella ricerca!!");
    } finally {
    }
  }

  async function handleModifica(e) {
    e.preventDefault();
    let url = "https://gestio-is.herokuapp.com/api/v1/infoazienda/" + id;
    console.log(url);
    console.log("partitaiva", partitaiva)
    console.log("Newpartitaiva", newpartitaiva)
    try {
      const axios = require("axios");

      let response = await axios({
        method: "PATCH",
        url: url,
        headers: {
          "x-access-token": jwt,
        },
        data: {
          "partitaiva": newpartitaiva,
          "logo": logo,
          "contatto":contatto,
        },
      }).then(function (response) {
        let risposta = response.data;
        console.log("RESPONSE-->", risposta);
        setRimuovi("Aggiornato con successo!");
      });
    } catch (error) {
      setRimuovi("Errore nell'aggiornamento!!");
    } finally {
      
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (set == 1) {
        setJwt(localStorage.getItem("jwt"));
        setRt(localStorage.getItem("rt"));
        console.log("JWT-->", jwt);
        setSet(0);
      }
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
          <form onSubmit={handleGet}>
            <div className="  flex flex-col gap-5 justify-center items-center">
              <input
                className="border  rounded p-2"
                type="text"
                id="usernameInput"
                placeholder="Partita IVA"
                onChange={(e) => setPartitaiva(e.target.value)}
              />

              <button
                type="submit"
                className="relative  py-2 inline-block px-6 bg-yellow-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg transition duration-150 ease-in-out"
              >
                Cerca
              </button>

              <h1>Logo</h1>
              <input
                className="border  rounded p-2"
                type="text"
                id="usernameInput"
                placeholder={logo}
                onChange={(e) => setLogo(e.target.value)}
              />
              <h1>P.IVA</h1>
              <input
                className="border  rounded p-2"
                type="text"
                id="usernameInput"
                placeholder={partitaiva}
                onChange={(e) => setNewpartitaiva(e.target.value)}
              />
              <h1>Contatto</h1>
              <input
                className="border  rounded p-2"
                type="text"
                id="usernameInput"
                placeholder={contatto}
                onChange={(e) => setContatto(e.target.value)}
              />
              <button
                className="relative  py-2 inline-block px-6 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out"
                onClick={handleModifica}
              >
                {rimuovi}
              </button>
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <h1>ERROR!!</h1>
        </div>
      );
    }
  }
}
