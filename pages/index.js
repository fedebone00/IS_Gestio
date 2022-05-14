import { LoginForm } from "../components/Login";

const styles = {
  marginTop: 30,
  textAlign: "center",
};
export default function Login() {
  return (
    <div>
      <LoginForm />
      <br></br>
      <br></br>
      <h1>Da togliere perchè gestito on the fly</h1>
      <a href="areaAmministratoreAziendale">
        <h3 className="   text-gray-400 inline-flex items-center justify-center">Area Amministratore Aziendale</h3>
      </a>
      <a href="areaDipendente">
        <h3 className="   text-gray-400 inline-flex items-center justify-center">Area Dipendente</h3>
      </a>
    </div> 
  );
}
