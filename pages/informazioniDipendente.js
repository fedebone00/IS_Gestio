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

export default function informazioniDipendente() {
  const [jwt, setJwt] = useState("");
  const [rt, setRt] = useState("");
  const [set, setSet] = useState(1);
  const [nome, setNome] = useState("Nome");
  const [cognome, setCognome] = useState("Cognome");
  const [email, setEmail] = useState("Email");
  const [id, setId] = useState("");
  const [rimuovi, setRimuovi] = useState("");

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

    } else if (parseJwt(jwt).role == "DIP0" || parseJwt(jwt).role == "DIP1") {
      try {
        const axios = require("axios");

        let response = axios({
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
          console.log(nome);
          setCognome(risposta.cognome);
          setLivello(risposta.livello);
          setData(risposta.data);
          setId(risposta._id);
          console.log("ID-->", id);
          setRimuovi("Aggiorna il dipendente selezionato");
        });
      } catch (error) {
        setRimuovi("Errore nella ricerca!!");
      } finally {
      }

      return (
        <div>
          <SidebarAA />
          <TopBar />
          <div className="  flex flex-col gap-5 justify-center items-center">
            <h1 className="font-bold text-3xl">{nome}</h1>
            <h1 className="font-bold text-3xl">{cognome}</h1>
            <h1 className="font-bold text-3xl">{email}</h1>
          </div>
        </div>
      );
    } else {
      Router.push("/404");
    }
  }
}
