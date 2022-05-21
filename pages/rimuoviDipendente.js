import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import home from '../public/home-outline.png'
import React, { Component, useEffect, useState } from 'react';
import { SidebarAA } from "../components/sidebarAA";
import { TopBar } from "../components/topBar";
import axios from 'axios';


function parseJwt(token) {
  if (!token) { return; }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}


export default function rimuoviDipendente() {

  const [email, setUsername] = useState("");
  const [jwt, setJwt] = useState("");
  const [rt, setRt] = useState("");
  const [set, setSet] = useState(1);
  const [base, setBase] = useState("http://localhost:8080/users");
  const [slash, setSlash] = useState("/");
  const [id, setId] = useState("");
  const [error, setError] = useState(false);
  const [token, setToken] = useState("")

  async function handleRemove(e) {
    e.preventDefault();
    try {
      const qs = require('qs')
      const axios = require('axios')

      axios({
        method: "POST",
        url: "http://localhost:8080/refresh",
        headers:
        {
          "x-access-token": jwt,
        },
        data: {
          rt,
        },
      })
        .then(function (response) {
          setToken(response.data);

          sessionStorage.setItem("jwt", token.jwt);
          sessionStorage.setItem("rt", token.rt);
          //setJwt(token.jwt);
          //setRt(token.rt);
          console.log("JWT-->", jwt);
          console.log("RT-->", rt);
          console.log("ROLE-->", (parseJwt(jwt).role))


          try {
            const qs = require("qs");
            const axios = require("axios");

            axios({
              method: 'GET',
              url: base,
              headers:
              {
                "x-access-token": sessionStorage.getItem('jwt'),
              },
            }).then(function (response) {
              let data = response.data;
              var found = data.filter(function (item) { return item.email === email; });
              console.log('found', found[0]);
              if (found !== undefined) {
                setId(found[0]._id);
                let result = base.concat(slash);
                result = result.concat(id);
                console.log("ID-->", result);

                try {
                  const qs = require("qs");
                  const axios = require("axios");

                  axios({
                    method: 'DELETE',
                    url: result,
                    headers:
                    {
                      "x-access-token": sessionStorage.getItem('jwt'),
                    },
                  }).then(function (response) {
                    let result = response.data;
                    console.log(result);

                  });
                } catch (error) {
                  console.log(error);
                } finally {
                }
              }
              else{
                console.log("Utente non trovato!");
                setError(true);
                
              }
            });
          } catch (error) {
            console.log(error);
          } finally {
          }


        }

        );


    } catch (error) {
      //console.log(error);
      console.log("RIFAI IL LOGIN!!")
    } finally {
    }
  }


  useEffect(() => {
    setTimeout(() => {
      setJwt(sessionStorage.getItem('jwt'));
      setRt(sessionStorage.getItem('rt'));
      //console.log("JWT-->", jwt);
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
    //console.log("JWT-->", jwt);

    if (jwt == undefined) {
      return (
        <div>
          <h1>Devi prima effettuare il login!</h1>
          <a href='/'>Vai alla pagina di login</a>
        </div>
      );
    }

    else if ((parseJwt(jwt).role == "AA") && (error == false)) {
      return (
        <div>
          <SidebarAA />
          <TopBar />
          <form onSubmit={handleRemove}>
            <div className=" p-2 border  rounded flex flex-row  justify-center items-center">
              <input
                type="text"
                id="usernameInput"
                placeholder="Username Dipendente"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <button type="submit" className="py-2 inline-block px-6 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md  hover:bg-gray-400 hover:shadow-lg focus:bg-gray-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out">
              Rimuovi!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            </button>
          </form>
        </div>
      );
    }

    else if ((parseJwt(jwt).role == "AA") && (error != false)){
      <div>
          <SidebarAA />
          <TopBar />
          <form onSubmit={handleRemove}>
            <div className=" p-2 border  rounded flex flex-row  justify-center items-center">
              <input
                type="text"
                id="usernameInput"
                placeholder="Username Dipendente"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <button type="submit" className="py-2 inline-block px-6 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md  hover:bg-gray-400 hover:shadow-lg focus:bg-gray-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out">
              Rimuovi!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            </button>
          </form>
          <h1>ERRORE NELLA RIMOZIONE, L'UTENTE NON ESISTE!!AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</h1>
        </div>
    }

    else {
      return (
        <div>
          <h1>ERROR!!</h1>
        </div>
      );
    }
  }
}