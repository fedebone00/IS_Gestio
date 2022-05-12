import { useState, useEffect } from "react";
//import { NomeFunziona } from "CARTELLA IN CUI ABBIAMO LE API"; //API

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsLoading(true);

      fetch('http://localhost:8080/users', {
        mode:'no-cors',
        method: 'POST',
        body: 'email={ (username) }'
      })

      console.log("Username --> ", username);
      console.log("Password --> ", password);

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>GESTIO</legend>
        <div>
          <input
            type="text"
            id="usernameInput"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
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
        <button type="submit" disabled={isLoading}>
          LOGIN
        </button>
      </fieldset>
    </form>
  );
}
