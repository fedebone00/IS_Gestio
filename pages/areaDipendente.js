import React, { Component, useEffect, useState } from 'react';
import { SidebarDip } from '../components/sidebarDip'
import TopBar from '../components/topBar'
import DatePicker from 'sassy-datepicker'
import { Mensa } from '../components/Mensa'


function parseJwt(token) {
  if (!token) { return; }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}


export default function areaDipendente() {
  const [jwt, setJwt] = useState("");
  const [rt, setRt] = useState("");
  const [set, setSet] = useState(1);

  //const [jwt, setJwt] = useState("");

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
      return (
        <div>
          <h1>Devi prima effettuare il login!</h1>
          <a href='/'>Vai alla pagina di login</a>
        </div>
      );
    }

    else if (parseJwt(jwt).role == "DIP0" || parseJwt(jwt).role == "DIP1") {
      //delete localStorage.jwt;
      return (
        <div>
          <SidebarDip/>
          <TopBar title="A colpo d'occhio"/>
      
          <DatePicker className='absolute bottom-40 left-72'/>
          <Mensa/>
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
