import { useState } from "react";
import Image from "next/image";
import Router from "next/router";
function recuperoCredenziali() {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  async function handleSubmit(e) {}
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset className="  relative z-1  p-3 flex flex-col space-y-3 justify-center items-center  h-full">
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
          {errorMessage && <div role="alert">{errorMessage}</div>}
          <div className="flex flex-col justify-between gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex py-2 inline-block px-28 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md  hover:bg-gray-400 hover:shadow-lg focus:bg-gray-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
            >
              Reset
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default recuperoCredenziali;
