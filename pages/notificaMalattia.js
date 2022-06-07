import React, { Component, useState, useEffect } from "react";
import { SidebarDip } from "../components/sidebarDip";
import TopBar from "../components/topBar";
import Router from "next/router";


function parseJwt(token) {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

export default function notificaMalattia() {
  const [jwt, setJwt] = useState("");
  const [rt, setRt] = useState("");
  const [set, setSet] = useState(1);
  const [certificato, setMotivazione] = useState("");
  const [dateInizio, setDateInizio] = useState("");
  const [dateFine, setDateFine] = useState("");
  const [risposta, setRisposta] = useState("");

  async function handleAdd(e) {
    e.preventDefault();

    /*var certificato = new FileReader(),
      file = $("#resume")[0];

      if (!file.files.length) {
        alert('no file uploaded');
        return false;
    }*/

    try {
      const qs = require("qs");
      const axios = require("axios");

      axios({
        method: "POST",
        url: "https://gestio-is.herokuapp.com/api/v1/malattia",
        headers: {
          "x-access-token": jwt,
        },
        data: {
          certificato,
          dataInizio,
          dataFine,
        },
      }).then(function (response) {
        let token = response.data;
        console.log(response.data);

        localStorage.setItem("Token", JSON.stringify(token));
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

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

    }

    if (parseJwt(jwt).role == "DIP0") {

      try {
        const axios = require(`axios`);
        
        axios({
          method: "GET",
          url: "https://gestio-is.herokuapp.com/api/v1/malattia",
          headers: {
            "x-access-token": jwt,
          }
        }).then(function (response) {
          // console.log(response.data)
          let token = response.data
          // let ostia = JSON.stringify(token)
          // console.log(ostia.match("data"))
           setRisposta(token)
          // setOra(token.ora)
          // console.log(ora)
        });
      } catch(error){
        console.log(error)
      }

      return (
        <div>
          <TopBar />
          <SidebarDip />
          <div className="px-10 py-10 text-xl leading-tigh"> 
            <table>
              <tr>
                <th>STORICO MALATTIA</th>
              </tr>
              <tr>
                  <div className="px-80 py-0 font-medium "> 
                    {risposta ? risposta.map((elemento) =>{
                      return ((<tr><td>{elemento.dataInizio}{" "}{elemento.dataFine}{" "}</td></tr>)
                    )}) : ""}
                  </div>
              </tr>
            </table> 
          </div>
          
          <form onSubmit={handleAdd}>
            <fieldset className="  relative z-1  p-3 flex flex-col space-y-3 justify-center items-center ml-40">
              <div className=" p-2 border  rounded flex flex-row  justify-center items-center">
                <input type="file" name="file" id="certificato"></input>
              </div>
              <div className="border p-2 rounded flex flex-row  justify-center items-center ">
                <input
                  type="text"
                  id="dateInput"
                  placeholder="Date Inizio"
                  onChange={(e) => setDateInizio(e.target.value)}
                />
              </div>
              <div className="border p-2 rounded flex flex-row  justify-center items-center ">
                <input
                  type="text"
                  id="dateInput"
                  placeholder="Date Fine"
                  onChange={(e) => setDateFine(e.target.value)}
                />
              </div>
              <div className="flex flex-col justify-between gap-4">
                <button
                  type="submit"
                  className="relative  py-2 inline-block px-6 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Aggiungi
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      );
    } else if (parseJwt(jwt).role == "DIP1") {
      try {
        const axios = require(`axios`);
        
        axios({
          method: "GET",
          url: "https://gestio-is.herokuapp.com/api/v1/malattia",
          headers: {
            "x-access-token": jwt,
          }
        }).then(function (response) {
          // console.log(response.data)
          let token = response.data
          // let ostia = JSON.stringify(token)
          // console.log(ostia.match("data"))
           setRisposta(token)
          // setOra(token.ora)
          // console.log(ora)
        });
      } catch(error){
        console.log(error)
      }
      return (
        <div>
          <TopBar />
          <SidebarDip />
          <div className="px-10 py-10 text-xl leading-tigh"> 
            <table>
              <tr>
                <th>STORICO MALATTIA</th>
              </tr>
              <tr>
                <div className="px-80 py-0 font-medium "> 
                  {risposta ? risposta.map((elemento) =>{
                    return ((<tr><td>{elemento.dataInizio}{" "}{elemento.dataFine}{" "}</td></tr>)
                  )}) : ""}
                </div>
              </tr>
            </table> 
          </div>
        </div>
      );
    } else {
      Router.push("/404");

    }
  }
}
