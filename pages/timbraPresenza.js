import React, { Component, useEffect, useState } from "react";
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

export default function Home() {
  const [jwt, setJwt] = useState("");
  const [rt, setRt] = useState("");
  const [data, setData] = useState("");
  const [set, setSet] = useState(1);
  const [smartworking, setSmartworking] = useState(false);
  var [errore, setErrore] = useState("");

  async function handleCheckbox(e) {
    e.preventDefault();
    let isChecked = e.target.checked;
    console.log("CHECKED-->", isChecked);
    setSmartworking(isChecked);
  }

  async function handleStorico(e) {
    e.preventDefault();
    console.log("Storico");

    try {
      const axios = require(`axios`);
      
      let response = await axios({
        method: "GET",
        url: "https://gestio-is.herokuapp.com/api/v1/timbratura",
        headers: {
          "x-access-token": jwt,
        }
      }).then(function (response) {
        console.log(response.data)
        // localStorage.setItem("data",response.data);
        setData(response.data);
      });
    } catch(error){
      console.log(error)
    }
  }

  async function handleTimbraPresenza(e) {
    e.preventDefault();

    console.log("Timbra");

    var data = new Date();
    var dd = String(data.getDate()).padStart(2, "0");
    var mm = String(data.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = data.getFullYear();
    var ora = data.getHours() + ":" + data.getMinutes();
    data = mm + "/" + dd + "/" + yyyy;

    try {
      const axios = require("axios");

      let response = await axios({
        method: "POST",
        url: "https://gestio-is.herokuapp.com/api/v1/timbratura",
        headers: {
          "x-access-token": jwt,
        },
        data: {
          data,
          ora,
          tipo: "ingresso",
          smartworking,
        },
      }).then(function (response) {
        let token = response.data;
        console.log("RESPONSE-->", token);
      });
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        console.log("RESPONSE");
        //console.log("NAME-->",error.response.name);
        //console.log(error.response.status);
        //setErrore(error.response.status);
        errore = error.response.status;
        console.log(errore);
        //console.log(error.response.headers);
      } else if (error.request) {
        errore = 400;
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    } finally {
    }

    if (errore == 400) {
      errore = 0;

      try {
        const axios = require("axios");

        let response = await axios({
          method: "POST",
          url: "https://gestio-is.herokuapp.com/api/v1/refresh",
          headers: {
            "x-access-token": jwt,
          },
          data: {
            rt,
          },
        }).then(function (response) {
          let token = response.data;
          console.log("RESPONSE-->", token);
          localStorage.setItem("jwt", token.jwt);
          localStorage.setItem("rt", token.rt);
          setJwt(token.jwt);
          setRt(token.rt);
          console.log("JWT-->", jwt);
          console.log("RT-->", rt);
        });
      } catch (error) {
        if (error.response) {
          //console.log(error.response.data);
          errore = error.response.data;
          console.log(errore);
          //errore = error.response.status;
          //console.log(errore);
          //console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      } finally {
      }
    }

    if (errore == "Refresh token expired, please log in again") {
      Router.push("/");
    }
  }


  async function handleTimbraUscita(e) {
    e.preventDefault();

    console.log("Timbra");

    var data = new Date();
    var dd = String(data.getDate()).padStart(2, "0");
    var mm = String(data.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = data.getFullYear();
    var ora = data.getHours() + ":" + data.getMinutes();
    data = mm + "/" + dd + "/" + yyyy;

    try {
      const axios = require("axios");

      let response = await axios({
        method: "POST",
        url: "https://gestio-is.herokuapp.com/api/v1/timbratura",
        headers: {
          "x-access-token": jwt,
        },
        data: {
          data,
          ora,
          tipo: "uscita",
          smartworking,
        },
      }).then(function (response) {
        let token = response.data;
        console.log("RESPONSE-->", token);
      });
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        console.log("RESPONSE");
        //console.log("NAME-->",error.response.name);
        //console.log(error.response.status);
        //setErrore(error.response.status);
        errore = error.response.status;
        console.log(errore);
        //console.log(error.response.headers);
      } else if (error.request) {
        errore = 400;
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    } finally {
    }

    if (errore == 400) {
      errore = 0;

      try {
        const axios = require("axios");

        let response = await axios({
          method: "POST",
          url: "https://gestio-is.herokuapp.com/api/v1/refresh",
          headers: {
            "x-access-token": jwt,
          },
          data: {
            rt,
          },
        }).then(function (response) {
          let token = response.data;
          console.log("RESPONSE-->", token);
          localStorage.setItem("jwt", token.jwt);
          localStorage.setItem("rt", token.rt);
          setJwt(token.jwt);
          setRt(token.rt);
          console.log("JWT-->", jwt);
          console.log("RT-->", rt);
        });
      } catch (error) {
        if (error.response) {
          //console.log(error.response.data);
          errore = error.response.data;
          console.log(errore);
          //errore = error.response.status;
          //console.log(errore);
          //console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      } finally {
      }
    }

    if (errore == "Refresh token expired, please log in again") {
      Router.push("/");
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setJwt(localStorage.getItem("jwt"));
      setRt(localStorage.getItem("rt"));
      setSet(0);
    }, 50);
  }, [])

  if (set) {
    return <div>
      
    </div>;
  } else {
    console.log("JWT-->", jwt);

    if (jwt == undefined) {
      return (
        <div>
          <h1>Devi prima effettuare il login!</h1>
          <a href="/">Vai alla pagina di login</a>
        </div>
      );
    } else if (parseJwt(jwt).role == "DIP0" || parseJwt(jwt).role == "DIP1") {
      //delete localStorage.jwt;
      return (
        <div>
          <SidebarDip />
          <TopBar />
          <div className=" flex flex-row px-96 h-20   justify-between ">
            <button
              className="flex px-4  items-center bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md  hover:bg-gray-400 hover:shadow-lg focus:bg-gray-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
              onClick={handleTimbraPresenza}
            >
              timbra presenza
            </button>

            <button
              className="flex px-4   items-center bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md  hover:bg-gray-400 hover:shadow-lg focus:bg-gray-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
              onClick={handleTimbraUscita}
            >
              timbra uscita
            </button>
            <div className="form-check">
              <input
                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                value=""
                id="Smart-working"
                onChange={handleCheckbox}
              />
              <label className="form-check-label inline-block text-gray-800">
                Smart-Working
              </label>
            </div>
          </div>
          <div className=" flex px-80 py-20"> 
            <h1 className="border  rounded  flex-row  justify-center items-center px-80 py-20"
                onClick={handleStorico} 
                dangerouslySetInnerHTML={{ __html: data }}
                >
            </h1>
          </div>
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