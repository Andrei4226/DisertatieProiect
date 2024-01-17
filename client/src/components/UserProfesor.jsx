// UserProfile.js
import React, { useEffect, useState } from 'react';
import '../styleProfilProfesor.css';
import { useLocation } from 'react-router-dom';

const UserProfesor = () => {
  const location = useLocation();
  const userData = location.state?.user;

  const [numeProfesor, setNumeProfesor] = useState('');
  const [prenumeProfesor, setPrenumeProfesor] = useState('');
  const [emailProfesor, setEmailProfesor] = useState('');
  const [parolaProfesor, setParolaProfesor] = useState('');

  useEffect(() => {
    // Verificare pentru a evita eroarea în cazul în care userData este null sau undefined
    if (userData) {
      setNumeProfesor(userData.Nume);
      setPrenumeProfesor(userData.Prenume);
      setEmailProfesor(userData.Email);
      setParolaProfesor(userData.Parola);
    }
  }, [userData]); // Este dependent de userData

  console.log(userData);

  //useState= hook si creeaza o stare locala
  //showPassword = variabila de stare
  //setShowPassword = functie 
  //starea initiala, parola nu este afisata
  const[showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("123456"); 
  // const[messageTitle, setMessageTitle] = useState('');

  const handleChangePassword = (event) =>{
    event.preventDefault();
    setShowPassword(!showPassword);
  }
  // const handleChangeMessage = event => {
  //   setMessageTitle(event.target.value);
  // }

  return (
    <>
    {/* Required meta tags */}
    <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        {/* bootstrap css */}
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" />
        {/* titlu */}
      <div className="user-profile-modal">
      <nav>
          <a className="navbar-brand d-flex justify-content-center text-center"> Profil - Utilizator </a>
        </nav>

        <nav className="navbar navbar-light bg-light d-flex justify-content-center align-items-center">
          <a className="navbar-brand text-center">
            <h3>Bun venit, </h3>
            <input type="text" id="numeTitluProfesorProfil" disabled value={numeProfesor} />
            <br></br>
            <br></br>
            <img src="/images/profesor.jpg" width="200" height="200" className="d-inline-block align-top" alt="gif" />
          </a>
        </nav>
        <br />

        <h3 className="text-center">Informatii personale</h3>

        <form action="" id="informatiiProfesori">
          <div className="containerInformatii d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column align-items-center mr-3">
              <p className="mb-0 mt-3">Nume:</p>
              <input type="text" className="mr-0" id="nume" disabled value={numeProfesor} />
              <p className="mb-0 mt-3">Prenume:</p>
              <input type="text" id="prenume" className="readonlyM" disabled value={prenumeProfesor} />
            </div>
          </div>
          <div className="d-flex flex-column align-items-center mr-3 mt-3">
            <p className="mb-0 mt-3">Email:</p>
            <input type="text" id="emailProfil" className="mr-0 readonlyM" disabled value={emailProfesor} />
            <p className="mb-0">Parola:</p>
            <input type={showPassword ? "text" : "password"} id="parolaProfil" disabled className="mr-0 mb-2 readonlyM" value={parolaProfesor}  />
            <button onClick={handleChangePassword}>
              {showPassword ? 'Ascunde parola' : 'Vezi parola'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserProfesor;
