import { useState } from "react";
import Image from "next/image";
import Router from "next/router";

function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
}

export function storicoPresenze(){

    async function handleStorico(e){
        
        


    }

}