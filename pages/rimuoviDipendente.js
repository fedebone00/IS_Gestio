import React, { useEffect, useState } from "react";
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
  const [email, setUsername] = useState("");
  const [jwt, setJwt] = useState("");
  const [rt, setRt] = useState("");
  const [set, setSet] = useState(1);
  const [base, setBase] = useState(
    //"https://gestio-is.herokuapp.com/api/v1/dipendente"
    "http://localhost:8080/api/v1/dipendente"
  );
  const [slash, setSlash] = useState("/");
  const [id, setId] = useState("");
  const [error, setError] = useState(false);
  const [token, setToken] = useState("");
  const [variabileProva, setVariabileProva] = useState("")

  

  async function handleRemove(e) {
    e.preventDefault();


    



    try {
      const axios = require("axios");

      let response = await axios({
        method: "DELETE",
        url: base,
        headers: {
          "x-access-token": jwt,
        },
        data: {
          email,
        },
      }).then(function (response) {
        let token = response.data;
        console.log("RESPONSE-->", token);
      });
    } catch (error) {
      if (error.response) {
      } else if (error.request) {
      } else {
      }
    } finally {
      //setVariabileProva("Rimosso con successo")
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if(set == 1){
      setJwt(localStorage.getItem("jwt"));
      setRt(localStorage.getItem("rt"));
      console.log("JWT-->", jwt);
      setSet(0);}
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
          <form onSubmit={handleRemove}>
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
                className="relative  py-2 inline-block px-6 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out"
              >
                Rimuovi
              </button>
              <h1 dangerouslySetInnerHTML={{ __html: variabileProva }} /> 
            </div>
          </form>
        </div>
      );
    } else if (parseJwt(jwt).role == "AA" && error != false) {
      <div>
        <SidebarAA />
        <TopBar />
        <form onSubmit={handleRemove}>
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
              className="relative  py-2 inline-block px-6 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out"
            >
              Rimuovi
            </button>
          </div>
        </form>
      </div>;
    } else {
      return (
        <div>
          <h1>ERROR!!</h1>
        </div>
      );
    }
  }
}