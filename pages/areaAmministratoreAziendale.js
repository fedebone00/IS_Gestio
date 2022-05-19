import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import home from '../public/home-outline.png'
import React, { Component, useEffect, useState } from 'react';
import { SidebarAA } from "../components/sidebarAA";
import { TopBar } from "../components/topBar";
import cookieCutter from 'cookie-cutter'


function parseJwt(token) {
  if (!token) { return; }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}


export default function Home() {

  const [jwt, setJwt] = useState("");
  const [rt, setRt] = useState("");
  const [set, setSet] = useState(1);


  const onChange = (date) => {
    console.log(date.toString());
  }


  //const [jwt, setJwt] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setJwt(cookieCutter.get('jwt'));
      setJwt(cookieCutter.get('rt'));
      setSet(0);
    }, 2);
  }, []);

  if (set) {
    return (
      <div>
      </div>
    );
  }
  else {
    if (parseJwt(jwt).role == "AA") {
      
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
















  /*
  useEffect(() => {
    setJwt(cookieCutter.get('jwt'));
    setRt(cookieCutter.get('rt'));

    console.log("JWT-->", cookieCutter.get('jwt'));
    console.log("RT-->", cookieCutter.get('rt'));



    return () => {
      
    }
  });
*/


  /*useEffect(() => {

    console.log("JWT-->", cookieCutter.get('jwt'));
    console.log("RT-->", cookieCutter.get('rt'));

    setJwt(cookieCutter.get('jwt'));
    setRt(cookieCutter.get('rt'));
    //console.log(parseJwt(jwt).role);

    return (
      <h1>WAITING...</h1>
    );

    //console.log("JWT-->", sessionStorage.getItem('jwt'));
    //console.log("RT-->", sessionStorage.getItem('rt'));
    //jwt = sessionStorage.getItem('jwt');
    setJwt(sessionStorage.getItem('jwt'));
    setRt(sessionStorage.getItem('rt'));
    console.log("JWT-->", jwt);
    console.log("RT-->", rt);


  });*/

  /*if (parseJwt(jwt).role == "AA") {*/

  /*}
  else {
    return (<h1>Non sei autorizzato!</h1>);
  }*/
  return (<h1>WAITING...</h1>)

}
