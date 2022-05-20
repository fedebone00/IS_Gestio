import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import home from '../public/home-outline.png'
import React, { Component, useEffect, useState } from 'react';
import { SidebarAA } from "../components/sidebarAA";
import { TopBar } from "../components/topBar";



function parseJwt(token) {
  if (!token) { return; }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}


export default function areaAmministratoreAziendale() {

  const [jwt, setJwt] = useState("");
  const [rt, setRt] = useState("");
  const [set, setSet] = useState(1);

  //const [jwt, setJwt] = useState("");

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