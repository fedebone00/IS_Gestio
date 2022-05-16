import { useState, useEffect } from "react";
import Image from 'next/image'
import axios from 'axios'


export function LoginForm() {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");



  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsLoading(true);
      const qs = require('qs')
      const axios = require('axios')


     /*FUNZIONA
      axios({
        method: 'POST',
        url: 'http://localhost:8080/users',
        data: 
            {
              email
            },
      })*/

      axios({
        method: 'POST',
        url: 'http://localhost:8080/users',
        data: 
            {
              email
            },
      })



      console.log("Username --> ", email);
      console.log("Password --> ", password);

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
      <fieldset className="  relative z-1  p-3 flex flex-col space-y-3 justify-center items-center  h-screen" >
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
        {errorMessage && (
          <div role="alert">
            {errorMessage}
          </div>
        )}
        <button type="submit" disabled={isLoading} className="py-2 inline-block px-6 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md  hover:bg-gray-400 hover:shadow-lg focus:bg-gray-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out">
          LOGIN
        </button>
      </fieldset>
    </form>
    </div>
  );
}
