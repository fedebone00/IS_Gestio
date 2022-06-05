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
  const [slash, setSlash] = useState("/");
  const [error, setError] = useState(false);
  const [token, setToken] = useState("");
  const [nome, setNome] = useState("Nome");
  const [cognome, setCognome] = useState("Cognome");
  const [data, setData] = useState("Data di nascita");
  const [livello, setLivello] = useState("Livello");
  const [email, setEmail] = useState("Email");
  const [id, setId] = useState("");
  const [rimuovi, setRimuovi] = useState("");
  const [newEmail, setNewEmail] = useState("");

  async function handleGet(e) {
    e.preventDefault();
    try {
      const axios = require("axios");

      let response = await axios({
        method: "GET",
        url: "http://localhost:8080/api/v2/dipendentespecifico",
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
        console.log("ID-->",id);
        setRimuovi("Aggiorna il dipendente selezionato");
      });
    } catch (error) {
      setRimuovi("Errore nella ricerca!!");
    } finally {
    }
  }

  async function handleModifica(e) {
    e.preventDefault();
    let url = "http://localhost:8080/api/v1/dipendente/" + id;
    console.log(url);
    console.log("Email", email)
    console.log("NewEmail", newEmail)
    try {
      const axios = require("axios");

      let response = await axios({
        method: "PATCH",
        url: url,
        headers: {
          "x-access-token": jwt,
        },
        data: {
          "email": newEmail,
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
                placeholder="Username Dipendente"
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                type="submit"
                className="relative  py-2 inline-block px-6 bg-yellow-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg transition duration-150 ease-in-out"
              >
                Cerca
              </button>

              <h1>Nome</h1>
              <input
                className="border  rounded p-2"
                type="text"
                id="usernameInput"
                placeholder={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <h1>Cognome</h1>
              <input
                className="border  rounded p-2"
                type="text"
                id="usernameInput"
                placeholder={cognome}
                onChange={(e) => setCognome(e.target.value)}
              />
              <h1>Livello</h1>
              <input
                className="border  rounded p-2"
                type="text"
                id="usernameInput"
                placeholder={livello}
                onChange={(e) => setLivello(e.target.value)}
              />
              <h1>Email</h1>
              <input
                className="border  rounded p-2"
                type="text"
                id="usernameInput"
                placeholder={email}
                onChange={(e) => setNewEmail(e.target.value)}
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
