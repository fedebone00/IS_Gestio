import React, { useEffect, useState } from "react";
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

export default function rimuoviDipendente() {
  const [email, setUsername] = useState("");
  const [jwt, setJwt] = useState("");
  const [rt, setRt] = useState("");
  const [set, setSet] = useState(1);
  const [error, setError] = useState(false);
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [data, setData] = useState("");
  const [livello, setLivello] = useState("");
  const [id, setId] = useState("");
  const [rimuovi, setRimuovi] = useState("");

  async function handleGet(e) {
    e.preventDefault();

    setNome("");
    setCognome("");
    setLivello("");
    setData("");
    setId("");

    try {
      const axios = require("axios");

      let response = await axios({
        method: "GET",
        url: "https://gestio-is.herokuapp.com/api/v1/dipendente/byemail",
        headers: {
          "x-access-token": jwt,
          email: email,
        },
      }).then(function (response) {
        let risposta = response.data;
        console.log("RESPONSE-->", risposta);
        setNome(risposta.nome);
        setCognome(risposta.cognome);
        setLivello(risposta.livello);
        setData(risposta.data);
        setId(risposta._id);
        setRimuovi("Rimuovi il dipendente selezionato");
      });
    } catch (error) {
      setRimuovi("Errore nella ricerca!!");
    } finally {
    }
  }

  async function handleRimuovi(e) {
    e.preventDefault();
    let url = "https://gestio-is.herokuapp.com/api/v1/dipendente/" + id;
    try {
      const axios = require("axios");

      let response = await axios({
        method: "DELETE",
        url: url,
        headers: {
          "x-access-token": jwt,
        },
      }).then(function (response) {
        let risposta = response.data;
        console.log("RESPONSE-->", risposta);
        setRimuovi("Rimosso con successo!");
      });
    } catch (error) {
      setRimuovi("Errore nella rimozione!!");
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
      Router.push("/index");
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
                placeholder="Username Dipendente"
                onChange={(e) => setUsername(e.target.value)}
              />

              <button
                type="submit"
                className="relative  py-2 inline-block px-6 bg-yellow-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg transition duration-150 ease-in-out"
              >
                Cerca
              </button>

              <h1>Nome</h1>
              <div className="border  rounded p-2">{nome}</div>
              <h1>Cognome</h1>
              <div className="border  rounded p-2">{cognome}</div>
              <h1>Livello</h1>
              <div className="border  rounded p-2">{livello}</div>
              <h1>Email</h1>
              <div className="border  rounded p-2">{email}</div>
              <button
                className="relative  py-2 inline-block px-6 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out"
                onClick={handleRimuovi}
              >
                {rimuovi}
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
