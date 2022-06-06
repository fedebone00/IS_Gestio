import React, { Component, useEffect, useState } from "react";
import { SidebarDip } from "../components/sidebarDip";
import TopBar from "../components/topBar";
import DatePicker from "sassy-datepicker";
import Router from "next/router";


function parseJwt(token) {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

export default function areaDipendente() {
  const [jwt, setJwt] = useState("");
  const [rt, setRt] = useState("");
  const [primo, setPrimo] = useState("");
  const [secondo, setSecondo] = useState("");
  const [set, setSet] = useState(1);
  var [user_id, setUser_id] = useState("");

  async function handlePrenota(e) {
    e.preventDefault();

    console.log("PARSED TOKEN", parseJwt(jwt));

    setUser_id(parseJwt(jwt).user_id);
    console.log("ID-->", user_id);

    try {
      const axios = require("axios");

      console.log("ID------->", parseJwt(jwt).user_id);

      let response = await axios({
        method: "POST",
        url: "https://gestio-is.herokuapp.com/api/v2/prenotamensa",
        headers: {
          "x-access-token": jwt,
        },
        data: {
          user_id: parseJwt(jwt).user_id,
        },
      }).then(function (response) {
        let token = response.data;
        console.log("RESPONSE-->", token);
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
      console.log("2JWT-->", jwt);
      setSet(0);
    }, 50);
  }, []);

  if (set) {
    return <div></div>;
  } else {
    console.log("1JWT-->", jwt);

    if (jwt == undefined) {
      Router.push("/index");
    } else if (parseJwt(jwt).role == "DIP0" || parseJwt(jwt).role == "DIP1") {
      //delete localStorage.jwt;

      //console.log(parseJwt(jwt))

      try {
        const axios = require("axios");

        var datona = new Date();
        var dd = String(datona.getDate()).padStart(2, "0");
        var mm = String(datona.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = datona.getFullYear();
        var data = yyyy + "/" + mm + "/" + dd;
        console.log(data);

        let response = axios(
          {
            method: "GET",
            url: "https://gestio-is.herokuapp.com/api/v1/menu/",
            headers: {
              "x-access-token": jwt,
              data: data,
            },
            body: {
              data: data,
            },
          },
          {},
          { data: data }
        ).then(function (response) {
          console.log(response);
          let token = response.data;
          console.log("TOKENNNNNNN", token);
          setPrimo(token.primo);
          setSecondo(token.secondo);
        });
      } catch (error) {
        console.log(error);
      } finally {
      }

      return (
        <div>
          <SidebarDip />
          <TopBar title="A colpo d'occhio" />
          <div className="absolute top-40 left-72 flex flex-col gap">
            <h1 className=" font-semibold text-lg py-3">Menù del giorno</h1>
            <div className=" border border-gray-200 shadow-md text-gray-700   rounded bg-white p-3 ">
              <h2 className="font-medium py-2">Primo: </h2>
              <h1>{primo}</h1>
              <h2 className="font-medium py-2">Secondo: </h2>
              <h1>{secondo}</h1>
            </div>
            <button
              onClick={handlePrenota}
              className="flex py-2 inline-block px-28 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md  hover:bg-gray-400 hover:shadow-lg focus:bg-gray-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
            >
              PRENOTA MENSA
            </button>
          </div>
          <DatePicker className="absolute bottom-40 left-72" />
        </div>
      );
    } else {
      Router.push("/404");
    }
  }
}
