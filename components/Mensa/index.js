import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

export function Mensa(props) {


  try {
    const axios = require("axios");

    let response =  axios({
      method: "GET",
      url: "https://gestio-is.herokuapp.com/api/v1/menu",
      headers: {
        "x-access-token": jwt,
      },
    }).then(function (response) {
      let token = response.data;
      console.log("RESPONSE-->", token);
    });
  } catch (error) {
    console.log(error);
  } finally {
  }




  return (
    <div className="absolute top-40 left-72 flex flex-col gap">
      <h1 className=" font-semibold text-lg py-3">Menù del giorno</h1>
      <div className=" border border-gray-200 shadow-md text-gray-700   rounded bg-white p-3 ">
        <h2 className="font-medium py-2">primo: </h2>

        <h2 className="font-medium py-2">secondo: </h2>

      </div>
    </div>
  );
}
