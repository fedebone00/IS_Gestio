import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

function parseJwt(token) {
  if (!token) { return; }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

export function Mensa(props) {
  const [jwt, setJwt] = useState("");
  const [rt, setRt] = useState("");
  const [set, setSet] = useState(1);


  async function handlePrenota(e) {
    e.preventDefault();

    console.log("Prenota");

    const id = parseJwt(jwt).id;

    try {
      const axios = require("axios");

      let response = await axios({
        method: "POST",
        url: "https://gestio-is.herokuapp.com/api/v1/prenotamensa",
        headers: {
          "x-access-token": jwt,
        },
        data: {
          "user_id" : id,
        },
      }).then(function (response) {
        let token = response.data;
        console.log("RESPONSE-->", token);
      });
    } catch (error) {
      console.log(log);
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
    try {
      const axios = require("axios");

      let response = axios({
        method: "GET",
        url: "https://gestio-is.herokuapp.com/api/v1/menu/",
        headers: {
          "x-access-token": jwt,
        },
      }).then(function (response) {
        let token = response.data;
        console.log(token);
        console.log("CIAO");
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  }, []);

  return (
    <div className="absolute top-40 left-72 flex flex-col gap">
      <h1 className=" font-semibold text-lg py-3">Menù del giorno</h1>
      <div className=" border border-gray-200 shadow-md text-gray-700   rounded bg-white p-3 ">
        <h2 className="font-medium py-2">primo: </h2>

        <h2 className="font-medium py-2">secondo: </h2>
      </div>
      <button
        onClick={handlePrenota}
        className="flex py-2 inline-block px-28 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md  hover:bg-gray-400 hover:shadow-lg focus:bg-gray-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
      >
        PRENOTA MENSA
      </button>
    </div>
  );
}
