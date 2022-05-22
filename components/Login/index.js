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

export function LoginForm() {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsLoading(true);
      const qs = require("qs");
      const axios = require("axios");

      axios({
        method: "POST",
        url: "http://localhost:8080/login",
        data: {
          email,
          password,
        },
      }).then(function (response) {
        let token = response.data;
        //console.log(response.data);

        //cookieCutter.get('myCookieName')
        //cookieCutter.set('jwt', token.jwt);
        //cookieCutter.set('rt', token.rt);
        sessionStorage.setItem("jwt", token.jwt);
        sessionStorage.setItem("rt", token.rt);

        // console.log("JWT-->", cookieCutter.get('jwt'));
        //console.log("RT-->", cookieCutter.get('rt'));

        // localStorage.setItem('Token', JSON.stringify(token));

        if (parseJwt(token.jwt).role == "AA") {
          console.log("Entrato nella condizione AA");
          Router.push("/areaAmministratoreAziendale");
        }

        if (
          parseJwt(token.jwt).role == "DIP0" ||
          parseJwt(token.jwt).role == "DIP1"
        ) {
          console.log("Entrato nella condizione DIP");
          Router.push("/areaDipendente");
        }

        //console.log("TOKEN-->",token.jwt)
        //console.log("REFRESH-->",token.rt)
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

    console.log("email:", email);
    console.log("Password: ", password);
  }

  return (
    <div>
      <Image
        layout="fill"
        className="object-center object-cover pointer-events-none"
        src="/../public/bg.png"
        alt="title"
      />
      <form onSubmit={handleSubmit}>
        <fieldset className="  relative z-1  p-3 flex flex-col space-y-3 justify-center items-center  h-screen">
          <Image
            src="/../public/logo1.png"
            alt="GESTIO"
            width={155}
            height={130}
          />
          <div className=" p-2 border  rounded flex flex-row  justify-center items-center">
            <input
              type="text"
              id="usernameInput"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="border p-2 rounded flex flex-row  justify-center items-center ">
            <input
              type="password"
              id="passwordInput"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage && <div role="alert">{errorMessage}</div>}
          <div className="flex flex-col justify-between gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex py-2 inline-block px-28 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md  hover:bg-gray-400 hover:shadow-lg focus:bg-gray-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
            >
              LOGIN
            </button>
            <a href="/recuperoCredenziali">
            <h6 className="text-right">Password dimenticata?</h6>
            </a>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
