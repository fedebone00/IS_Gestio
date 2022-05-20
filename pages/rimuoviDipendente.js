import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import home from '../public/home-outline.png'
import React, { Component, useEffect, useState } from 'react';
import { SidebarAA } from "../components/sidebarAA";
import { TopBar } from "../components/topBar";
import cookieCutter from 'cookie-cutter'
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

  //const [jwt, setJwt] = useState("");


  async function handleRemove(e) {
    e.preventDefault();

    try {
      const qs = require('qs')
      const axios = require('axios')

      let base = "http://localhost:8080/users";
      let id = "/628365d140db118623c8a37d";
      let result = base.concat(id);

      axios({
        method: 'GET',
        url: base,
        data:
        {
          jwt,
        },
      })
        .then(function (response) {
          let token = response.data;
          console.log(response.status);

        }

        );


    } catch (error) {
      console.log(error);
    } finally {
    }
  }



  useEffect(() => {
    setTimeout(() => {
      setJwt(sessionStorage.getItem('jwt'));
      setRt(sessionStorage.getItem('rt'));
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
      return (
        <div>
          <h1>Devi prima effettuare il login!</h1>
          <a href='/'>Vai alla pagina di login</a>
        </div>
      );
    }

    else if (parseJwt(jwt).role == "AA") {
      //delete sessionStorage.jwt;
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

    else {
      return (
        <div>
          <h1>ERROR!!</h1>
        </div>
      );
    }
  }
}